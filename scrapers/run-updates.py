import os
import psycopg2
import datetime
from psycopg2 import OperationalError
from dotenv import load_dotenv

# Load .env file
# load_dotenv()


### Update departed boolean
import psycopg2

current_datetime = datetime.now()
print(current_datetime)

conn = psycopg2.connect(POSTGRES_URL)

cursor = conn.cursor()

query = """
update scraper_history
set departed = true,
    perm_link = false
where id in (
select id
from  scraper_history
where latest_dt < (
  select max(latest_dt) 
  from scraper_history
  ))
"""
cursor.execute(query)

# where departed = false

# Commit the changes and close the database connection
conn.commit()
cursor.close()
conn.close()

current_datetime = datetime.now()
print(current_datetime)

### Update perm_link boolean
import psycopg2

current_datetime = datetime.now()
print(current_datetime)

conn = psycopg2.connect(POSTGRES_URL)

cursor = conn.cursor()

query = """
update  scraper_history
set     perm_link = TRUE
where id in (
select id
from  scraper_history
where departed = FALSE
and   perm_link = FALSE
and   latest_dt = (
 select max(latest_dt) 
 from scraper_history
 )
and   first_dt = (
 select min(first_dt) 
 from scraper_history
 ))
"""
cursor.execute(query)

# Commit the changes and close the database connection
conn.commit()
cursor.close()
conn.close()

current_datetime = datetime.now()
print(current_datetime)


### Update duration_secs
import psycopg2

current_datetime = datetime.now()
print(current_datetime)

conn = psycopg2.connect(POSTGRES_URL)

cursor = conn.cursor()

query = """
UPDATE scraper_history
SET duration_secs = EXTRACT(EPOCH FROM (latest_dt - first_dt)),
    duration_txt = TO_CHAR(latest_dt - first_dt, 'DD "day(s), " HH24:MI:SS')
"""

# UPDATE scraper_history
# SET duration_secs = EXTRACT(EPOCH FROM (latest_dt - first_dt))


cursor.execute(query)

# Commit the changes and close the database connection
conn.commit()
cursor.close()
conn.close()

current_datetime = datetime.now()
print(current_datetime)

# def create_connection(url):
#     conn = None
#     try:
#         conn = psycopg2.connect(url)
#         print("Connection to PostgreSQL DB successful")
#     except OperationalError as e:
#         print(f"The error '{e}' occurred")
#     return conn


# def execute_query(conn, query):
#     cursor = conn.cursor()
#     try:
#         cursor.execute(query)
#         result = cursor.fetchone()
#         print(f"Query result: {result}")
#     except OperationalError as e:
#         print(f"The error '{e}' occurred")


# if __name__ == "__main__":
#     connection_url = os.getenv("POSTGRES_URL")
#     connection = create_connection(connection_url)

#     if connection:
#         current_date_query = "SELECT current_date;"
#         execute_query(connection, current_date_query)
#         connection.close()
