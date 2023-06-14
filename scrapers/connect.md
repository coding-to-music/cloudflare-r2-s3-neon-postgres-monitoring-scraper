```python
import pandas as pd
import datetime as datetime
import pprint
import os
import psycopg2
import requests
import boto3
import dotenv
from requests import get 
from bs4 import BeautifulSoup
from urllib.parse import urlparse, parse_qs, urlunparse
from bson.json_util import dumps
from IPython.display import display, Image
from IPython.display import HTML

# An example of getting current date

currDate = datetime.datetime.now()
 
print(currDate)
```

    2023-06-14 15:30:26.427837



```python
# Load the environment variables from the .env file
dotenv.load_dotenv()

scrape_url = os.getenv('SCRAPE_URL')
# print(scrape_url)

POSTGRES_URL = os.environ.get('POSTGRES_URL')
FINAL_POSTGRES_URL = os.environ.get('FINAL_POSTGRES_URL')

# print(POSTGRES_URL)
# print(FINAL_POSTGRES_URL)

```


```python
import psycopg2
from psycopg2 import OperationalError

def create_connection(url):
    conn = None
    try:
        conn = psycopg2.connect(url)
        print("Connection to PostgreSQL DB successful")
    except OperationalError as e:
        print(f"The error '{e}' occurred")
    return conn

def execute_query(conn, query):
    cursor = conn.cursor()
    try:
        cursor.execute(query)
        result = cursor.fetchone()
        print(f"Query result: {result}")
    except OperationalError as e:
        print(f"The error '{e}' occurred")

if __name__ == "__main__":
    # raise KeyboardInterrupt
    connection_url = FINAL_POSTGRES_URL
    # print(FINAL_POSTGRES_URL)
    connection = create_connection(connection_url)

    if connection:
        current_date_query = "SELECT current_date;"
        execute_query(connection, current_date_query)
        connection.close()
```

    Connection to PostgreSQL DB successful
    Query result: (datetime.date(2023, 6, 14),)

