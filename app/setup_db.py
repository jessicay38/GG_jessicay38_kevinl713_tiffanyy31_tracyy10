import json 
import sqlite3
import os 

DB_FILE = os.path.join(os.path.dirname(__file__), "../db.db")

def create_tables(db):
    try:
        c = db.cursor()
        c.execute('''
            CREATE TABLE IF NOT EXISTS users (
                username TEXT NOT NULL UNIQUE COLLATE NOCASE,
                password TEXT NOT NULL,
                character TEXT NO NULL UNIQUE, 
                unlockedChars TEXT NO NULL, 
                points INTEGER NO NULL,
                coins INTEGER NO NULL,
                highscore INTEGER NO NULL,
                musicPref TEXT NO NULL,
                message TEXT NO NULL 
            );
            ''')
        c.execute('''
            CREATE TABLE IF NOT EXISTS themes (
                username TEXT NOT NULL UNIQUE COLLATE NOCASE,
                theme TEXT NO NULL UNIQUE,
                color1 TEXT NO NULL,
                color2 TEXT NO NULL 
            );
            ''')
        db.commit()
    except sqlite3.Error as e:
        print(f"create_table: {e}")
    finally:
        c.close()

def setup_db():
    db = sqlite3.connect(DB_FILE)
    drop_tables(db)
    create_tables(db)
    db.commit()
    db.close()

def create_user(username, password):
    db = sqlite3.connect(DB_FILE)
    try:
        c = db.cursor()
        c.execute("INSERT INTO users (username, password, character, unlockedChars, coins, highscore, musicPref) VALUES (?, ?, ?, ?, ?, ?, ?)", 
        (username, password, "", "", 0, 0, ""))
        db.commit()
    except sqlite3.IntegrityError:
        print(f"create_user: {e}")
    finally:
        c.close()

def get_username(username):
    db = sqlite3.connect(DB_FILE)
    try:
        c = db.cursor()
        c.execute("SELECT * FROM users WHERE username = ?", (username,))
        user = c.fetchone()
    except sqlite3.Error as e:
        print(f"fetch_user: {e}")
    finally:
        c.close()
        return username

def add_coins(username, coins):
    db = sqlite3.connect(DB_FILE)
    try:
        c = db.cursor()
        coins_now = int(c.execute("SELECT coins from USERS where username = ?", (username, )).fetchone()) + coins
        c.execute("UPDATE coins FROM users WHERE usernanme = ?", (coins_now, username))
        coins = c.fetchone()
    except sqlite3.Error as e:
        print(f"fetch_user: {e}")
    finally:
        c.close()

def remove_coins(username, coins):
    db = sqlite3.connect(DB_FILE)
    try:
        c = db.cursor()
        coins_now = int(c.execute("SELECT coins from USERS where username = ?", (username, )).fetchone()) - coins
        c.execute("UPDATE coins FROM users WHERE usernanme = ?", (coins_now, username))
    except sqlite3.Error as e:
        print(f"fetch_user: {e}")
    finally:
        c.close()

def add_points(username, points):
    db = sqlite3.connect(DB_FILE)
    try:
        c = db.cursor()
        points_now = int(c.execute("SELECT points from USERS where username = ?", (username, )).fetchone()) + points
        c.execute("UPDATE points FROM users WHERE usernanme = ?", (points_now, username))
        coins = c.fetchone()
    except sqlite3.Error as e:
        print(f"fetch_user: {e}")
    finally:
        c.close()

def get_coins(username):
    db = sqlite3.connect(DB_FILE)
    try:
        c = db.cursor()
        c.execute("SELECT coins FROM users WHERE usernanme = ?", (username,))
        coins = c.fetchone()
    except sqlite3.Error as e:
        print(f"fetch_user: {e}")
    finally:
        c.close()
        return coins

def get_points(username):
    db = sqlite3.connect(DB_FILE)
    try:
        c = db.cursor()
        c.execute("SELECT points FROM users WHERE usernanme = ?", (username,))
        message = c.fetchone()
    except sqlite3.Error as e:
        print(f"fetch_user: {e}")
    finally:
        c.close()
        return points

def choose_music(username, music):
    db = sqlite3.connect(DB_FILE)
    try:
        c = db.cursor()
        c.execute("UPDATE musicPref FROM users WHERE usernanme = ?", (music, username))
        coins = c.fetchone()
    except sqlite3.Error as e:
        print(f"fetch_user: {e}")
    finally:
        c.close()

def choose_message(username, message):
    db = sqlite3.connect(DB_FILE)
    try:
        c = db.cursor()
        c.execute("UPDATE message FROM users WHERE usernanme = ?", (message, username))
        coins = c.fetchone()
    except sqlite3.Error as e:
        print(f"fetch_user: {e}")
    finally:
        c.close()

def get_message(username):
    db = sqlite3.connect(DB_FILE)
    try:
        c = db.cursor()
        c.execute("SELECT message FROM users WHERE usernanme = ?", (username,))
        message = c.fetchone()
    except sqlite3.Error as e:
        print(f"fetch_user: {e}")
    finally:
        c.close()
        return message

def leaderboard():
    db = sqlite3.connect(DB_FILE)
    try:
        c = db.cursor()
        c.execute("SELECT users, points FROM users ORDER BY points DESC")
        points = c.fetchall()
    except sqlite3.Error as e:
        print(f"fetch_user: {e}")
    finally:
        c.close()
        return points
