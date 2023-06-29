# cloudflare-r2-s3-neon-postgres-monitoring-scraper

# 🚀 Scrape data from a website and store the data in a postgres database and images in Cloudflare R2 🚀

https://github.com/coding-to-music/cloudflare-r2-s3-neon-postgres-monitoring-scraper

From / By

## Environment variables:

```java
# see .env-example
```

## user interfaces:

## GitHub

```java
git init
git add .
git remote remove origin
git commit -m "first commit"
git branch -M main
git remote add origin git@github.com:coding-to-music/cloudflare-r2-s3-neon-postgres-monitoring-scraper.git
git push -u origin main
```

## Scraper info is from this other repo

https://github.com/coding-to-music/scraping-craigslist-housing

Which uses examples from these articles:

https://github.com/angelicadietzel/scraping-craigslist-housing

https://betterprogramming.pub/the-only-step-by-step-guide-youll-need-to-build-a-web-scraper-with-python-e79066bd895a

## Table of Contents

- [Objective](#objective)
- [Technologies](#technologies)
- [Data Sets](#data-sets)

## Objective

The purpose of this project is to teach you how to scrape housing data from Craigslist.

## Technologies

- Jupyter Notebook
- pandas
- NumPy
- Python
- BeautifulSoup

## Data Sets

- A [data set](https://github.com/angelicadietzel/scraping-craigslist-housing/blob/main/scraping_craigslist_housing/phx_apts.csv) containing the data that I scraped from Phoenix area housing posts on Craigslist.

## Installing Beautiful Soup

https://www.crummy.com/software/BeautifulSoup/bs4/doc/#installing-beautiful-soup

```java
sudo apt-get update -y

sudo apt-get install python3

sudo apt-get install python3-bs4

sudo apt-get pip

sudo pip install numpy

sudo pip install pandas

pip install ipykernel

sudo apt-get install -y ipython3

```

## Install vscode extensions

```java
python (microsoft)
jupyter (microsoft)
```

## Installing Python Dependencies locally in project

https://stackoverflow.com/questions/53925660/installing-python-dependencies-locally-in-project

The recommended way to do this is by using a virtual environment. You can install virtualenv via pip with

```java
pip install virtualenv
```

Then create a virtual environment in your project directory:

```java
apt install python3.8-venv

python -m venv env

python3 -m venv env # previously: `virtualenv env`
```

Which will create a directory called env (you can call it anything you like though) which will mirror your global python installation. Inside env/ there will be a directory called lib which will contain Python and will store your dependencies.

Then activate the environment with:

```java
source env/bin/activate
```

Then install your dependencies with pip and they will be installed in the virtual environment env/:

```java
pip install -r requirements.txt
```

Then any time you return to the project, run source env/bin/activate again so that the dependencies can be found.

When you deploy your program, if the deployed environment is a physical server, or a virtual machine, you can follow the same process on the production machine. If the deployment environment is one of a few serverless environments (e.g. GCP App Engine), supplying a requirements.txt file will be sufficient. For some other serverless environments (e.g. AWS Lambda) the dependencies will need to be included in the root directory of the project. In that case, you should use

```java
pip install -r requirements.txt -t ./.
```

## Install Jupyter and associated packages

```java
pip install jupyter
```

```java
jupyter --version
```

```java
Selected Jupyter core packages...
IPython          : 8.12.2
ipykernel        : 6.23.2
ipywidgets       : 8.0.6
jupyter_client   : 8.2.0
jupyter_core     : 5.3.0
jupyter_server   : 2.6.0
jupyterlab       : not installed
nbclient         : 0.8.0
nbconvert        : 7.5.0
nbformat         : 5.9.0
notebook         : 6.5.4
qtconsole        : 5.4.3
traitlets        : 5.9.0
```

## Test database connections to postgres

`neon-connect2.py` uses .env value `POSTGRES_URL`

```java
python3 scrapers/neon-connect2.py
```

Output

```java
Connection to PostgreSQL DB successful
Query result: (datetime.date(2023, 6, 14),)
```

`neon-connect.py` uses .env value `POSTGRES_URL`

```java
python3 scrapers/neon-connect.py
```

Output

```java
Current time: 2023-06-14 20:13:14.733108+00:00
PostgreSQL version: PostgreSQL 15.2 on x86_64-pc-linux-gnu, compiled by gcc (Debian 10.2.1-6) 10.2.1 20210110, 64-bit
```

## Run the Jupyter notebook `connect.ipynb` from the command line

`connect.ipynb` uses .env value `FINAL_POSTGRES_URL`

`FINAL_POSTGRES_URL` is `POSTGRES_URL` with `?options=endpoint%3D<endpoint-id>` appended

`<endpoint-id>` is `ep-mute-recipe-123456` in the below URL example:

`postgres://<user>:<password>@ep-mute-recipe-123456.us-east-2.aws.neon.tech/neondb?options=endpoint%3Dep-mute-recipe-123456`

```java
jupyter nbconvert --to markdown --execute scrapers/connect.ipynb
```

Open the markdown output file `scrapers/connect.md` and preview the markdown

```
Connection to PostgreSQL DB successful
Query result: (datetime.date(2023, 6, 14),)
```

## scraper_history table

```sql
DO $$
BEGIN
    IF EXISTS (
        SELECT 1
        FROM information_schema.tables
        WHERE table_schema = 'public'
        AND table_name = 'scraper_history'
    ) THEN
        DROP TABLE scraper_history;
        RAISE NOTICE 'Table scraper_history dropped.';
    ELSE
        RAISE NOTICE 'Table scraper_history does not exist.';
    END IF;
END $$;

CREATE TABLE scraper_history (
  id            SERIAL PRIMARY KEY,
  line_content  VARCHAR(255),
  line_type     VARCHAR(10),
  line_num      NUMERIC,
  line_url      VARCHAR(255),
  first_dt      TIMESTAMP,
  latest_dt     TIMESTAMP,
  duration_secs NUMERIC,
  perm_link     BOOLEAN DEFAULT FALSE,
  departed      BOOLEAN DEFAULT FALSE
);

CREATE UNIQUE INDEX idx_unique_line_content_url ON scraper_history (line_content, line_url)
```

### Revisions:

```sql
  id            Int      @id @default(autoincrement())
  duration_secs NUMERIC,
  perm_link     BOOLEAN DEFAULT FALSE,
  departed      BOOLEAN DEFAULT FALSE,
```

Migration script

```sql
-- Create a new temporary table with the additional columns
CREATE TABLE temp_scraper_history (
  id            SERIAL PRIMARY KEY,
  line_content  VARCHAR(255),
  line_type     VARCHAR(10),
  line_num      NUMERIC,
  line_url      VARCHAR(255),
  first_dt      TIMESTAMP,
  latest_dt     TIMESTAMP,
  duration_secs NUMERIC,
  perm_link     BOOLEAN DEFAULT FALSE,
  departed      BOOLEAN DEFAULT FALSE
);

CREATE UNIQUE INDEX idx_unique_line_content_url ON scraper_history (line_content, line_url)

-- Migrate the existing data to the new table
INSERT INTO temp_scraper_history (line_content, line_type, line_num, line_url, first_dt, latest_dt)
SELECT line_content, line_type, line_num, line_url, first_dt, latest_dt
FROM scraper_history;

-- Drop the old table
DROP TABLE scraper_history;

-- Rename the new table to the original table name
ALTER TABLE temp_scraper_history RENAME TO scraper_history;

-- Update the sequence for the autoincrement column
SELECT setval(pg_get_serial_sequence('scraper_history', 'id'), COALESCE(MAX(id), 0) + 1, false)
FROM scraper_history;
```

### Migration script to add site_name_txt, duration_txt

```sql
-- Create a new temporary table with the additional columns
CREATE TABLE temp_scraper_history (
  id            SERIAL PRIMARY KEY,
  line_content  VARCHAR(255),
  line_type     VARCHAR(10),
  line_num      NUMERIC,
  line_url      VARCHAR(255),
  first_dt      TIMESTAMP,
  latest_dt     TIMESTAMP,
  duration_secs NUMERIC,
  duration_txt  VARCHAR(30),
  site_name_txt VARCHAR(100),
  perm_link     BOOLEAN DEFAULT FALSE,
  departed      BOOLEAN DEFAULT FALSE
);

-- Migrate the existing data to the new table
INSERT INTO temp_scraper_history (line_content, line_type, line_num, line_url, first_dt, latest_dt)
SELECT line_content, line_type, line_num, line_url, first_dt, latest_dt
FROM scraper_history;

-- Drop the old table
DROP TABLE scraper_history;

-- Rename the new table to the original table name
ALTER TABLE temp_scraper_history RENAME TO scraper_history;

-- Update the sequence for the autoincrement column
SELECT setval(pg_get_serial_sequence('scraper_history', 'id'), COALESCE(MAX(id), 0) + 1, false)
FROM scraper_history;

```

### Other possible revisions

```sql
  site_name VARCHAR(255),
  PRIMARY KEY (line_content, site_name)
```

### Other possible columns:

foreign key to site_name table

```
  site_name VARCHAR(255),
  PRIMARY KEY (line_content, site_name)

```

## Neon Onboarding, run this in the Neon sql-editor dashboard

```sql
CREATE TABLE playing_with_neon(id SERIAL PRIMARY KEY, name TEXT NOT NULL, value REAL);
INSERT INTO playing_with_neon(name, value)
SELECT LEFT(md5(i::TEXT), 10), random() FROM generate_series(1, 10) s(i);
SELECT * FROM playing_with_neon;
```

## Authenticate Cli with Neon

```java
psql -h pg.neon.tech
```

```java
select * from playing_with_neon;
```

```java
 id |    name    |   value
----+------------+------------
  1 | c4ca4238a0 |   0.685526
  2 | c81e728d9d | 0.29756433
  3 | eccbc87e4b |  0.1463368
  4 | a87ff679a2 | 0.96024513
  5 | e4da3b7fbb | 0.43399096
  6 | 1679091c5a | 0.80693907
  7 | 8f14e45fce |  0.3784232
  8 | c9f0f895fb |     0.9029
  9 | 45c48cce2e |  0.6668949
 10 | d3d9446802 | 0.44102186
(10 rows)
```

## Prisma schema example

```java
// schema.prisma

// Define the table for storing the scraped data
model ScrapedData {
  id        Int      @id @default(autoincrement())
  link      String
  text      String
  timestamp DateTime @default(now())
  image     Image?   @relation(fields: [imageId], references: [id])

  // Relation to the Image table
  imageId   Int?
}

// Define the table for storing the images
model Image {
  id           Int            @id @default(autoincrement())
  imageUrl     String         @unique
  scrapedData  ScrapedData[]  @relation(fields: [id], references: [imageId])
}
```

## verify can connect from the command line

```
sudo apt install postgresql-client
```

## Install using Debian or Ubuntu's default repositories

Both Ubuntu and Debian provide versions of PostgreSQL server as packages within their default repositories. The PostgreSQL version may be older than those found on the PostgreSQL website, but this is the simplest way to install on these distributions.

To install PostgreSQL server, update your computer's local package cache with the latest set of packages. Afterwards, install the postgresql package:

```java
sudo apt update
sudo apt install postgresql
```

By default, PostgreSQL is configured to use peer authentication, which allows users to log in if their operating system user name matches a PostgreSQL internal name.

The installation process created an operating system user called postgres to match the postgres database administrative account. To log into PostgreSQL with the psql client, use sudo to run the command as the postgres user:

```java
sudo -u postgres psql

or

psql -h localhost -p 5432 -U postgres
```

Once you are connected to your database, run the following command to list all tables in the current schema:

```java
\dt
```

This should display a list of all tables in the current schema, including the tables you have created.

If you want to see more information about a specific table, you can use the \d command followed by the name of the table. For example, if you want to see the details of the ev_locations table, you can run:

```java
\d ev_locations
```

This should display information about the columns, constraints, and indexes defined on the ev_locations table.

You can check the current database and schema in psql by running the following command:

```java
SELECT current_database(), current_schema();
```

To list the different databases in PostgreSQL, you can use the following command in the psql command-line interface:

```java
\list
```

When you are finished, you can exit the psql session by typing:

```java
\quit
```

Try a command, always end with a semicolin;

```
CREATE TABLE IF NOT EXISTS mytable (
  id SERIAL PRIMARY KEY,
  datetime TIMESTAMP NOT NULL
);
```

verify

```
SELECT COUNT(*) FROM mytable;

SELECT COUNT(*) FROM ev_locations;
```

Full example of connecting and executing commands

```
psql -h localhost -p 5432 -U postgres
Password for user postgres:
```

Output

```
psql (12.14 (Ubuntu 12.14-0ubuntu0.20.04.1), server 15.2 (Debian 15.2-1.pgdg110+1))
WARNING: psql major version 12, server major version 15.
         Some psql features might not work.
Type "help" for help.

postgres=# CREATE TABLE IF NOT EXISTS mytable (
postgres(#   id SERIAL PRIMARY KEY,
postgres(#   datetime TIMESTAMP NOT NULL
postgres(# );
CREATE TABLE
postgres=# SELECT COUNT(*) FROM mytable;
 count
-------
     0
(1 row)
```

## Dynamic Text Plugin for Grafana | Markdown, HTML and Handlebars to transform data visualizations

Dynamic Text Plugin for Grafana | Markdown, HTML and Handlebars to transform data visualizations

https://www.youtube.com/watch?v=MpNZ4Yl-p0U&ab_channel=VolkovLabs

All about Markdown https://commonmark.org/help/

### Recipes

https://volkovlabs.io/plugins/volkovlabs-dynamictext-panel/recipes/

Useful snippets that you can use in your templates.

### Initial context

Display the Initial context with which the template was executed.

```json
{{{json @root}}}
```

Take a look at the Documentation for Handlebar variables.

### Iterate through all fields in each record

All Rows should be selected in the Panel options.

```
{{#each data}}
  {{#each this}} {{@key}}: {{this}} {{/each}}
{{/each}}
```

### Conditional content

```
{{#if (eq app "auth")}}
  This is the auth app.
{{else}}
  This is not an auth app.
{{/if}}
```

### Specific row in the data

To address a specific row in the returned data, select All Rows option.

```
{{data.4.title}}
```

### Handlebars variables

```
{{#each data}}
  {{#if (eq @index 3)}}
    {{title}}
  {{/if}}
{{/each}}
```

### Display an image

````
# ```json
{{{json @root}}}
# ```
![{{line_content}}](https://pbs.twimg.com/media/FzVKSwOX0AEy7QL.jpg)
````

### Content

It is the code editor where you can place the parsing commands or, in other words, create a visualization template for your data. To reference the data elements in your template, use double and triple braces.

To display a value from the app field.

```
{{app}}
```

Depending on the All rows/Every row toggle, the template is applied to either every row or to the entire query results.

### Render HTML from data

If you would like to render HTML returned by the data source, you need to use three-brace expressions, {{{htmlValue}}}, otherwise Handlebars escape the HTML content.

```
<ul>
  {{{htmlValue}}}
</ul>
```

where htmlValue is

```

<li>foo</li>
<li>bar</li>
```

### Field name with spaces

Field names with spaces should be displayed as

```
{{[Field Name]}} or {{'Field Name'}}
```

## JSON Root and an Image

```json
{{{json @root}}}
```

![{{line_content}}](https://pbs.twimg.com/media/FzVKSwOX0AEy7QL.jpg)

## Render a Markdown table

```
| Title | Author | Year |
| ----- | ------ | ---- |
{{#each data}}
| Title | Author | Year |
{{/each}}
```

```
| Line Content | Duration | Line Num | Site Name |Line URL |
| ----- | ------ | ---- | ---- | ---- |
{{#each data}}
| {{line_content}} | {{duration_txt}} | {{line_num}} | {{site_name_txt}} | {{line_url}} |
{{/each}}
```

## Render a Markdown table for links

### Data

https://volkovlabs.io/plugins/volkovlabs-dynamictext-panel/data/

You can choose how the retrieved data is passed into the Dynamic Text Panel.

- Every row means that the Content template is applied to every retrieved row.
- All rows, the query results are passed entirely as the data field to the template.

To work with the query results as a whole, you can use #each builtin helper to iterate over the records.

### Every row

If your data source returns the following four columns of data.

```
| app  | description                  | cluster | tier     |
| ---- | ---------------------------- | ------- | -------- |
| auth | Handles user authentication. | prod    | frontend |
```

### Template

Display it using the following template for each row.

```
# {{app}}

> {{description}}

{{#if (eq tier "frontend")}}
Link: <a href="https://{{cluster}}.example.com/{{app}}">https://{{cluster}}.example.com/{{app}}</a>
{{/if}}
```

```
# {{site_name_txt}}

> {{line_num}} {{line_content}} {{duration_txt}}

Link: <a href="{{line_url}}">{{line_content}}</a>
```

### All Rows

```
| Line | Line Content | Duration | Line Num | Site Name |Line URL |
| ----- | ----- | ------ | ---- | ---- | ---- |
{{#each data}}
| {{line_num}} | <a href="{{line_url}}">{{line_content}}</a> | {{duration_txt}} | {{line_num}} | {{site_name_txt}} | {{line_url}} |
{{/each}}
```

```
| Line | Line Content | Duration | Line Num | Site Name |Line URL |
| ----- | ----- | ------ | ---- | ---- | ---- |
{{#each data}}
| {{line_num}} | {{line_content}} | {{duration_txt}} | {{line_num}} | {{site_name_txt}} | {{line_url}} |
{{/each}}
```

### Remove line breaks and replace non-visible whitespace with a space

```
select regexp_replace(line_content, E'\\r\\n|\\r|\\n', ' ', 'g') as line_content
from scraper_history
```

## Apache eCharts - map Data Sources

https://volkovlabs.io/plugins/volkovlabs-echarts-panel/datasources/

Below is a code snippet demonstrating how you can retrieve data from your data source to use in the Apache ECharts visualization panel.

```java
data.series.map((s) => {
  if (s.refId === "logo") {
    images =
      s.fields.find((f) => f.name === "body").values.buffer ||
      s.fields.find((f) => f.name === "body").values;
  } else if (s.refId === "connections") {
    sources =
      s.fields.find((f) => f.name === "source").values.buffer ||
      s.fields.find((f) => f.name === "source").values;
    targets =
      s.fields.find((f) => f.name === "target").values.buffer ||
      s.fields.find((f) => f.name === "target").values;
  } else if (s.refId === "nodes") {
    titles =
      s.fields.find((f) => f.name === "title").values.buffer ||
      s.fields.find((f) => f.name === "title").values;
    descriptions =
      s.fields.find((f) => f.name === "description").values.buffer ||
      s.fields.find((f) => f.name === "description").values;
  }
});
```

- You can use .map() and .find() JavaScript functions,
- refId is the name of the query retrieving data from the data source. By default, the names are A, B and so forth. The code above works with three queries the logo, connections, and nodes.
- name is the data frame column name. The code above references the body, source, target, title, and description columns.
- Supports Grafana 10 and older with values and values.buffer.

### Array of Arrays

Convert one-dimensional arrays into many-dimensional arrays if needed.

- Get values for each field.
- Combine in an array of arrays.
- Use as series[0] to access first query, series[1] to access second query, etc.
- Supports Grafana 10 and older with values and values.buffer.

```
const series = data.series.map((s) => {
  const rates =
    s.fields.find((f) => f.name === "Rate").values.buffer ||
    s.fields.find((f) => f.name === "Rate").values;
  const calls =
    s.fields.find((f) => f.name === "Calls").values.buffer ||
    s.fields.find((f) => f.name === "Calls").values;
  const names =
    s.fields.find((f) => f.name === "Name").values.buffer ||
    s.fields.find((f) => f.name === "Name").values;

  return rates.map((d, i) => [d, calls[i], names[i]]);
})[0];
```

### Pie Chart

We are using the Static Data Source for this example.

```java
const pieData = data.series.map((s) => {
  const models =
    s.fields.find((f) => f.name === "Model").values.buffer ||
    s.fields.find((f) => f.name === "Model").values;
  const values =
    s.fields.find((f) => f.name === "Value").values.buffer ||
    s.fields.find((f) => f.name === "Value").values;

  return values.map((d, i) => {
    return { name: models[i], value: d };
  });
})[0];

return {
  tooltip: {
    trigger: "item",
  },
  legend: {
    top: "5%",
    left: "center",
  },
  series: [
    {
      name: "Pie Chart",
      type: "pie",
      radius: ["40%", "70%"],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: "#fff",
        borderWidth: 2,
      },
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: "40",
          fontWeight: "bold",
        },
      },
      labelLine: {
        show: false,
      },
      data: pieData,
    },
  ],
};
```

## Apache eCharts - Pie Chart - Recent Departed Links per day

```sql
select  DATE(latest_dt)::text AS departed_date,
        count(*) as departed_num
from  scraper_history
where perm_link = false
and departed = TRUE
group by DATE(latest_dt)
order by DATE(latest_dt)
limit 10;
```

Function

```java
const pieData = data.series.map((s) => {
  const modelsField = s.fields.find((f) => f.name === "departed_date");
  const valuesField = s.fields.find((f) => f.name === "departed_num");

  const models = modelsField.values.toArray();
  const values = valuesField.values.toArray();

  return values.map((d, i) => {
    return { name: models[i].toString(), value: d };
  });
})[0];

return {
  tooltip: {
    trigger: "item",
  },
  legend: {
    top: "5%",
    left: "center",
  },
  series: [
    {
      name: "Departed Links per day",
      type: "pie",
      radius: ["40%", "70%"],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: "#fff",
        borderWidth: 2,
      },
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: "40",
          fontWeight: "bold",
        },
      },
      labelLine: {
        show: false,
      },
      data: pieData,
    },
  ],
};
```

## Cloudflare R2 setup

```java
npm install -g wrangler
```

## Authenticate Wrangler with your Cloudflare account

To enable deployments to Cloudflare, you'll need to authenticate by logging into your Cloudflare account via Wrangler.

```java
wrangler login
```

When wrangler automatically opens your browser to display Cloudflare’s consent screen, click the Allow button. This will send an API Token to Wrangler.

## ​​Using wrangler login on a remote machine

### Important - open port 8976

If you are using Wrangler from a remote machine, but run the login flow from your local browser, you will receive the following error message after logging in:This site can't be reached.

To finish the login flow, run wrangler login and go through the login flow in the browser:

```java
wrangler login
```

Output

```java
wrangler login ⛅️ wrangler 2.1.6
-------------------

Attempting to login via OAuth...Opening a link in your default browser:
https://dash.cloudflare.com/oauth2/auth?xyz...
```

The browser login flow will redirect you to a localhost URL on your machine.

Leave the login flow active. Open a second terminal session. In that second terminal session, use curl or an equivalent request library on the remote machine to fetch this localhost URL. Copy and paste the localhost URL that was generated during the wrangler login flow and run:

```java
curl <LOCALHOST_URL>
```

## Create your first bucket

Create and name your new bucket:

```java
wrangler r2 bucket create my-bucket
```

## To check that your bucket was created:

```java
wrangler r2 bucket list
```

To bind your bucket to a Worker, follow the instructions in your command-line to update your .toml file. Your R2 binding should look similar to this:

```java
compatibility_date = "2022-04-18"
name="my-worker"
main = "index.js"

[[r2_buckets]]
binding = "MY_BUCKET"
bucket_name = "my-bucket"
```

## Add and modify your data

To manage your bucket's objects you'll need to modify your Worker:

### PUT

```java
// index.js
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const key = url.pathname.slice(1);

    if (request.method == 'PUT') {
      await env.MY_BUCKET.put(key, request.body);
      return new Response(`Put ${key} successfully!`);
    }
  }
};

```

### GET

```java
// index.js
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const key = url.pathname.slice(1);

    // if (request.method == 'PUT') {...}

    if (request.method == 'GET') {
      const value = await env.MY_BUCKET.get(key);

      if (value === null) {
        return new Response('Object Not Found', { status: 404 });
      }

      return new Response(value.body);
    }

  }
};
```

### DELETE

```java
// index.js
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const key = url.pathname.slice(1);

    // if (request.method == 'PUT') {...}
    // if (request.method == 'GET') {...}

    if (request.method == 'DELETE') {
      await env.MY_BUCKET.delete(key);
      return new Response('Deleted!', { status: 200 });
    }

  }
};
```

## Deploy your bucket

Once your bucket and Worker are ready to go live, deploy to Cloudflare's global network:

```java
wrangler publish
```

That's it! 🎉

You've installed Wrangler and deployed your R2 bucket and Worker to Cloudflare. To support you along your journey developing with R2 here are some resources:

Writing workers https://developers.cloudflare.com/workers/get-started/guide/#5-write-code

Bucket access and privacy https://developers.cloudflare.com/r2/buckets/public-buckets/#managed-public-buckets-through-r2dev

Wrangler commands https://developers.cloudflare.com/workers/wrangler/commands/
