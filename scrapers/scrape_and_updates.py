import os
import psycopg2
from psycopg2 import OperationalError
from dotenv import load_dotenv
from datetime import datetime
from queries import queries
from query_results import query_results

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

def create_queries_table(conn):
    # Code for creating the queries table

def create_query_results_table(conn):
    # Code for creating the query_results table

def execute_query(conn, query, title, query_id):
    # Code for executing a query

def store_query_result(conn, query_id, row_count, datetime_now, error):
    # Code for storing a query result

def get_active_queries(conn):
    # Code for getting active queries

if __name__ == "__main__":
    connection_url = os.getenv("POSTGRES_URL")
    connection = create_connection(connection_url)

    if connection:
        create_queries_table(connection)
        create_query_results_table(connection)

        # Store queries in the database
        cursor = connection.cursor()
        insert_query = "INSERT INTO queries (query, title, active, summary, execution_order) VALUES (%s, %s, %s, %s, %s);"
        for query_info in queries:
            query_values = (
                query_info["query"],
                query_info["title"],
                query_info["active"],
                query_info["summary"],
                query_info["execution_order"]
            )
            cursor.execute(insert_query, query_values)

        connection.commit()
        print("Queries inserted successfully.")

        active_queries = get_active_queries(connection)
        for query_info in active_queries:
            query = query_info[1]
            title = query_info[2]
            query_id = query_info[0]

            print(f"\nExecuting query: {title}")
            execute_query(connection, query, title, query_id)

        connection.close()


# import os
# import psycopg2
# from psycopg2 import OperationalError
# from dotenv import load_dotenv
# from datetime import datetime

# # Load .env file
# load_dotenv()


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
#         row_count = cursor.rowcount
#         store_query_result(conn, query, row_count, datetime.now(), None)
#     except OperationalError as e:
#         print(f"The error '{e}' occurred")
#         store_query_result(conn, query, None, datetime.now(), str(e))


# def store_query_result(conn, query, row_count, datetime_now, error):
#     cursor = conn.cursor()
#     insert_query = "INSERT INTO query_results (query, row_count, datetime, error) VALUES (%s, %s, %s, %s);"
#     cursor.execute(insert_query, (query, row_count, datetime_now, error))
#     conn.commit()
#     print("Query result stored successfully.")


# if __name__ == "__main__":
#     connection_url = os.getenv("POSTGRES_URL")
#     connection = create_connection(connection_url)

#     if connection:
#         queries = [
#             "SELECT current_date;",
#             "SELECT * FROM users;",
#             "INSERT INTO products (name, price) VALUES ('Phone', 999);",
#             # Add more queries here
#         ]

#         for query in queries[:10]:
#             execute_query(connection, query)

#         connection.close()


# import os
# import psycopg2
# from psycopg2 import OperationalError
# from dotenv import load_dotenv

# # Load .env file
# load_dotenv()


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

# import psycopg2

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
