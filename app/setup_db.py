import json 
import sqlite3
import os 
from .auth import password_hash, user_exists 

DB_FILE = os.path.join(os.path.dirname(__file__), "../db.db")

def create_tables(db):
    try:
        c = db.cursor()
        c.execute('''
            CREATE TABLE IF NOT EXISTS users (
                userId INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL UNIQUE COLLATE NOCASE,
                password TEXT NOT NULL,
                character TEXT NO NULL UNIQUE COLLATE, 
                unlockedChars TEXT NO NULL, 
                coins INTEGER NO NULL,
                highscore INTEGER NO NULL,
                musicPref TEXT NO NULL UNIQUE
            );
            ''')
        c.execute('''
            CREATE TABLE IF NOT EXISTS leaderboard (
                userId INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL UNIQUE COLLATE NOCASE,
                points INTEGER NO NULL,
                message TEXT NO NULL UNIQUE
            );
            ''')
        c.execute('''
            CREATE TABLE IF NOT EXISTS themes (
                userId INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL UNIQUE COLLATE NOCASE,
                theme TEXT NO NULL UNIQUE COLLATE,
                color1 TEXT NO NULL,
                color2 TEXT NO NULL 
            );
            ''')
        db.commit()
    except sqlite3.Error as e:
        print(f"create_table: {e}")
    finally:
        c.close()

def drop_tables(db):
    try:
        c = db.cursor()
        c.execute("DROP TABLE IF EXISTS users")
        c.execute("DROP TABLE IF EXISTS leaderboard")
        c.execute("DROP TABLE IF EXISTS themes")
        db.commit()
    except sqlite3.Error as e:
        print(f"drop_tables: {e}")
    finally:
        c.close()

def setup_db():
    db = sqlite3.connect(DB_FILE)
    drop_tables(db)
    create_tables(db)
    db.commit()
    db.close()
