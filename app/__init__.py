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
from config import Config

# adding config.py to search path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# flask app initializing
app = Flask(__name__)
app.config.from_object(Config)


@app.route('/', methods=['GET', 'POST'])
def home():
    #return render_template("base.html")
    return render_template("crossyroads.html")

@app.route('/game', methods=['GET', 'POST'])
def game():
    return render_template("game.html")
@app.route('/crossyroads', methods=['GET', 'POST'])
def crossyroads():
    return render_template("crossyroads.html")
@app.route('/home', methods=['GET', 'POST'])
def dash():
    return render_template("home.html")
@app.route('/login', methods=['GET', 'POST'])
def login():
    return render_template("login.html")
@app.route('/register', methods=['GET', 'POST'])
def register():
    return render_template("register.html")
@app.route('/settings', methods=['GET', 'POST'])
def settings():
    return render_template("settings.html")
@app.route('/store', methods=['GET', 'POST'])
def store():
    return render_template("store.html")
    
if __name__ == "__main__":
    app.run(debug=True)