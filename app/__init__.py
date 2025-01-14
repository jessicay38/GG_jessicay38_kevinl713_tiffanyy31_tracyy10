import os, sys

import urllib.parse  # for URL decoding
import sqlite3
import requests
import datetime # for calendarific dates
import calendar  # for month/calendar operations

from flask import Flask, render_template, request, redirect, url_for, session, flash, jsonify
from dateutil.parser import parse  # import for ISO 8601 parsing (for dates)
from functools import wraps
# from models import User  # import User model from models.py
from calendar import monthrange, day_name

# adding config.py to search path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# flask app initializing
app = Flask(__name__)

import setup_db

# sessions
secret = os.urandom(32)
app.secret_key = secret

@app.route('/', methods=['GET', 'POST'])
def login():
    if 'username' in session:
        return redirect("/home")
    elif request.method == 'POST':
        return redirect("/auth")
    return render_template("login.html")

@app.route('/auth', methods=['GET', 'POST'])
def auth():
    username = request.form.get('username')
    password = request.form.get('password')
    if (setup_db.get_username(username) == None):
        flash("This username does not have an account linked to it. Create an account?", "error")
        return redirect("/")
    print(setup_db.get_password(username))
    if (password == setup_db.get_password(username)):
        session['username'] = username
        return redirect("/home")
    flash("Incorrect password", "error")
    return redirect("/login")
    

@app.route('/home', methods=['GET', 'POST'])
def home():
    if 'username' not in session:
        return redirect("/")
    return render_template("home.html")

@app.route('/register', methods=['GET', 'POST'])
def register():
    return render_template("register.html")

@app.route('/game', methods=['GET', 'POST'])
def game():
    if 'username' not in session:
        return redirect("/")
    return render_template("game.html")

@app.route('/crossyroads', methods=['GET', 'POST'])
def crossyroads():
    return render_template("crossyroads.html")

@app.route('/settings', methods=['GET', 'POST'])
def settings():

    return render_template("settings.html")

@app.route('/store', methods=['GET', 'POST'])
def store():
    return render_template("store.html")
    
@app.route('/logout', methods=['GET', 'POST'])
def logout():
    session.pop("username", None)
    return redirect("/")
    
if __name__ == "__main__":
    app.run(debug=True)
