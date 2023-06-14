import os
import psycopg2
from dotenv import load_dotenv

# Load .env file
load_dotenv()

# Get the connection string from the environment variable
connection_string = os.getenv('POSTGRES_URL')

# Connect to the PostgreSQL database
conn = psycopg2.connect(connection_string)

# Create a cursor object
cur = conn.cursor()

# Execute SQL commands to retrieve the current time and version from PostgreSQL
cur.execute('SELECT NOW();')
time = cur.fetchone()[0]

cur.execute('SELECT version();')
version = cur.fetchone()[0]

# Close the cursor and connection
cur.close()
conn.close()

# Print the results
print('Current time:', time)
print('PostgreSQL version:', version)