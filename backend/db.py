import mysql.connector
from flask import g

# 🔹 MySQL config (change password if needed)
DB_CONFIG = {
    "host": "localhost",
    "user": "root",
    "password": "2005",          # 👈 un MySQL password
    "database": "ai_chat_system"
}

def get_db():
    """
    Returns a single DB connection per request
    """
    if "db" not in g:
        g.db = mysql.connector.connect(**DB_CONFIG)
    return g.db


def close_db(e=None):
    """
    Closes DB connection after request
    """
    db = g.pop("db", None)
    if db is not None:
        db.close()
