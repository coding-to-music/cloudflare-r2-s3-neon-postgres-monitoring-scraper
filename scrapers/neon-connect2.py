import os
import psycopg2
from psycopg2 import OperationalError
from dotenv import load_dotenv

# Load .env file
load_dotenv()


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
    connection_url = os.getenv("POSTGRES_URL")
    connection = create_connection(connection_url)

    if connection:
        current_date_query = "SELECT current_date;"
        execute_query(connection, current_date_query)
        connection.close()
