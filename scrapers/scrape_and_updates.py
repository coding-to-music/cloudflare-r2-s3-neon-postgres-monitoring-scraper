import os
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

import psycopg2

# # Establish the database connection
# connection = psycopg2.connect(
#     host='your_host',
#     port='your_port',
#     user='your_user',
#     password='your_password',
#     database='your_database'
# )

# # Create a cursor object to execute queries
# cursor = connection.cursor()

# try:
#     # Query 1: Update and capture rows affected
#     query1 = "UPDATE table1 SET column1 = 'new_value' WHERE condition"
#     cursor.execute(query1)
#     rows_affected1 = cursor.rowcount

#     # Insert rows affected into a tracking table
#     tracking_query1 = "INSERT INTO updates_tracking (table_name, rows_affected) VALUES (%s, %s)"
#     cursor.execute(tracking_query1, ('table1', rows_affected1))

#     # Query 2: Update and capture rows affected
#     query2 = "UPDATE table2 SET column2 = 'new_value' WHERE condition"
#     cursor.execute(query2)
#     rows_affected2 = cursor.rowcount

#     # Insert rows affected into a tracking table
#     tracking_query2 = "INSERT INTO updates_tracking (table_name, rows_affected) VALUES (%s, %s)"
#     cursor.execute(tracking_query2, ('table2', rows_affected2))

#     # Query 3: Update and capture rows affected
#     query3 = "UPDATE table3 SET column3 = 'new_value' WHERE condition"
#     cursor.execute(query3)
#     rows_affected3 = cursor.rowcount

#     # Insert rows affected into a tracking table
#     tracking_query3 = "INSERT INTO updates_tracking (table_name, rows_affected) VALUES (%s, %s)"
#     cursor.execute(tracking_query3, ('table3', rows_affected3))

#     # Commit the changes
#     connection.commit()

# finally:
#     # Close the cursor
#     cursor.close()

#     # Close the connection
#     connection.close()
