import os, sys

import urllib.parse  # for URL decoding
import sqlite3
import requests
import datetime # for calendarific dates
import calendar  # for month/calendar operations

from flask import Flask, render_template, request, redirect, url_for, session, flash, jsonify
from dateutil.parser import parse  # import for ISO 8601 parsing (for dates)
from functools import wraps
from models import User  # import User model from models.py
from calendar import monthrange, day_name
from config import Config

# adding config.py to search path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

# flask app initializing
app = Flask(__name__)
app.config.from_object(Config)


@app.route('/', methods=['GET', 'POST'])
def home():
    return 0

    
if __name__ == "__main__":
    app.run(debug=True)