import requests
from bs4 import BeautifulSoup
import psycopg2
from datetime import datetime

# Load .env file
load_dotenv()

# Make a request to the webpage
scrape_url = os.getenv("SCRAPE_URL")
# print(scrape_url)
url = scrape_url
response = requests.get(url)

# Create BeautifulSoup object
soup = BeautifulSoup(response.text, "html.parser")

# Find all the lines (within <a> tags) in the webpage
lines = soup.find_all("a")

POSTGRES_URL = os.environ.get("POSTGRES_URL")
conn = psycopg2.connect(POSTGRES_URL)

cursor = conn.cursor()

# Initialize line_num as an integer
line_num = 0

current_datetime = datetime.now()
print(current_datetime)

# Iterate over the lines and insert/update each line into the database
for line in lines:
    line_content = line.get_text()
    line_type = "Link"
    line_url = line.get("href")
    site_name_txt = ""

    # Increment line_num for each line
    line_num += 1

    if line.find("img"):
        line_type = "Image"
        line_content = line.get("src")
        print(f"Line {line_num}: Image found {line_content}")

    if bool(line_content):
        # domain name not available for images
        site_name_txt = urlparse(line_url).netloc

        # Upsert the line into the database
        query = """
            INSERT INTO scraper_history (line_content, line_type, line_num, line_url, site_name_txt, first_dt, latest_dt)
            VALUES (%s, %s, %s, %s, %s, %s, %s)
            ON CONFLICT (line_content, line_url) DO UPDATE
            SET latest_dt = EXCLUDED.latest_dt
            WHERE scraper_history.line_content = EXCLUDED.line_content
            AND scraper_history.line_url = EXCLUDED.line_url
        """
        data = (
            line_content,
            line_type,
            line_num,
            line_url,
            site_name_txt,
            current_datetime,
            current_datetime,
        )
        cursor.execute(query, data)

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
