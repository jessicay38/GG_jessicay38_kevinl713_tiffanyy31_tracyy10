import sqlite3
import os

# Define the database file path
DB_FILE = os.path.join(os.path.dirname(__file__), "db.db")

# Function to create the necessary tables
def create_tables(db):
    try:
        c = db.cursor()
        c.execute('''
            CREATE TABLE IF NOT EXISTS users (
                username TEXT NOT NULL UNIQUE COLLATE NOCASE,
                password TEXT NOT NULL,
                character TEXT NOT NULL UNIQUE,
                unlockedChars TEXT NOT NULL,
                points INTEGER NOT NULL,
                coins INTEGER NOT NULL,
                highscore INTEGER NOT NULL,
                musicPref TEXT NOT NULL,
                message TEXT NOT NULL
            );
        ''')
        c.execute('''
            CREATE TABLE IF NOT EXISTS leaderboard (
                username TEXT NOT NULL UNIQUE COLLATE NOCASE,
                points INTEGER NOT NULL,
                message TEXT NOT NULL
            );
        ''')
        c.execute('''
            CREATE TABLE IF NOT EXISTS themes (
                username TEXT NOT NULL COLLATE NOCASE,
                theme TEXT NOT NULL,
                color1 TEXT NOT NULL,
                color2 TEXT NOT NULL
            );
        ''')
        db.commit()
    except sqlite3.Error as e:
        print(f"Error creating tables: {e}")
    finally:
        c.close()

# Function to set up the database
def setup_db():
    db = sqlite3.connect(DB_FILE)
    try:
        create_tables(db)
    finally:
        db.close()

# Run the setup
if __name__ == "__main__":
    setup_db()
    print(f"Database created and tables set up at {DB_FILE}")
