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
