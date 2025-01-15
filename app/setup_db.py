import json  
import sqlite3 
import os  
 
DB_FILE = "GG_database.db" 
 
def create_tables(): 
    db = sqlite3.connect(DB_FILE) 
    c = db.cursor() 
    c.execute(''' 
        CREATE TABLE IF NOT EXISTS users ( 
            username TEXT NOT NULL UNIQUE COLLATE NOCASE, 
            password TEXT NOT NULL, 
            character TEXT NOT NULL,  
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
    c.close() 
 
#USER INFO

def create_user(username, password): 
    db = sqlite3.connect(DB_FILE) 
    c = db.cursor()
    c.execute("INSERT INTO users (username, password, character, unlockedChars, coins, highscore, musicPref) VALUES (?, ?, ?, ?, ?, ?, ?)", (username, password, "", "", 0, 0, ""))  
    c.close() 

def get_username(username): 
    db = sqlite3.connect(DB_FILE) 
    c = db.cursor() 
    username = c.execute("SELECT username FROM users WHERE username = ?", (username,)).fetchall() 
    c.close() 
    return username 

def get_password(username): 
    db = sqlite3.connect(DB_FILE) 
    c = db.cursor() 
    password = c.execute("SELECT password FROM users WHERE username = ?", (username,)).fetchone() 
    c.close() 
    return password 

#COINS

def add_coins(username, coins): 
    db = sqlite3.connect(DB_FILE) 
    c = db.cursor() 
    coins_now = int(c.execute("SELECT coins FROM users WHERE username = ?", (username, )).fetchone()) + coins 
    c.execute("UPDATE users SET coins=? WHERE usernanme =?", (coins_now, username)) 
    c.close() 
 
def remove_coins(username, coins): 
    db = sqlite3.connect(DB_FILE) 
    c = db.cursor() 
    coins_now = int(c.execute("SELECT coins FROM users WHERE username = ?", (username, )).fetchone()) - coins 
    c.execute("UPDATE users SET coins=? WHERE usernanme = ?", (coins_now, username)) 
    c.close() 

def get_coins(username): 
    db = sqlite3.connect(DB_FILE) 
    c = db.cursor() 
    c.execute("SELECT coins FROM users WHERE username = ?", (username,)).fetchone() 
    c.close() 
    return coins 
 
 #POINTS

def add_points(username, points): 
    db = sqlite3.connect(DB_FILE) 
    c = db.cursor() 
    points_now = int(c.execute("SELECT points FROM users WHERE username = ?", (username, )).fetchone()) + points 
    c.execute("UPDATE users SET points=? WHERE usernanme = ?", (points_now, username)) 
    c.close() 
 
def get_points(username): 
    db = sqlite3.connect(DB_FILE) 
    c = db.cursor() 
    c.execute("SELECT points FROM users WHERE usernanme = ?", (username,)).fetchone() 
    c.close() 
    return points 
 
def change_high_score(username, score): 
    db = sqlite3.connect(DB_FILE) 
    c = db.cursor() 
    curent_score = c.execute("SELECT highscore FROM users WHERE username = ?", (username,)).fetchone() 
    if (score > current_score): 
        c.execute("UPDATE users SET highscore=? WHERE username = ?", (score, username)) 
    c.close() 
 
 #OTHER METHODS

def choose_character(username, character): 
    db = sqlite3.connect(DB_FILE) 
    c = db.cursor() 
    c.execute("UPDATE character FROM users WHERE usernanme = ?", (character, username))
    c.close() 

def choose_music(username, music): 
    db = sqlite3.connect(DB_FILE) 
    c = db.cursor() 
    c.execute("UPDATE musicPref FROM users WHERE usernanme = ?", (music, username)) 
    c.close() 
 
def choose_message(username, message): 
    db = sqlite3.connect(DB_FILE) 
    c = db.cursor() 
    c.execute("UPDATE message FROM users WHERE usernanme = ?", (message, username)) 
    c.close() 
 
def leaderboard(): 
    db = sqlite3.connect(DB_FILE) 
    c = db.cursor() 
    points = c.execute("SELECT username, points FROM users ORDER BY points DESC LIMIT 8").fetchall()
    messages = c.execute("SELECT username, message FROM users ORDER by points DESC LIMIT 8").fetchall() 
    c.close() 
    return points, messages 
 
def add_themes(): 
    db = sqlite3.connect(DB_FILE) 
    c = db.cursor() 
    c.execute(""" 
        INSERT INTO themes VALUES  
            ('Normal', 'Green', 'Green'), 
            ('Winter', 'White', 'White') 
    """) 
    db.commit() 
    c.close() 
 
def custom_themes(username, theme, color1, color2): 
    db = sqlite3.connect(DB_FILE) 
    c = db.cursor() 
    c.execute("INSERT INTO themes (username, theme, color1, color2) VALUES (?, ?, ?, ?)", (username, theme, color1, color2)) 
    c.close()

create_tables()
create_user("chicken", "moo")