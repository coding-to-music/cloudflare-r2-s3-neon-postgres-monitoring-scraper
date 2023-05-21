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
