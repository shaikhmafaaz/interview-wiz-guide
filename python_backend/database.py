
import sqlite3
from datetime import datetime
from config import DB_PATH

def init_db():
    with sqlite3.connect(DB_PATH) as conn:
        cursor = conn.cursor()
        # Create users table
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
        ''')
        
        # Create user_answers table
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS user_answers (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER,
            question TEXT NOT NULL,
            answer TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )
        ''')
        conn.commit()
    print(f"Database initialized at {DB_PATH}")

def save_user_answer(user_id, question, answer):
    try:
        with sqlite3.connect(DB_PATH) as conn:
            cursor = conn.cursor()
            cursor.execute('INSERT INTO user_answers (user_id, question, answer) VALUES (?, ?, ?)',
                          (user_id, question, answer))
            conn.commit()
        return True, "Answer saved successfully"
    except Exception as e:
        return False, str(e)

def get_user_answers(user_id):
    try:
        with sqlite3.connect(DB_PATH) as conn:
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            cursor.execute('SELECT * FROM user_answers WHERE user_id = ? ORDER BY created_at DESC', (user_id,))
            answers = [dict(row) for row in cursor.fetchall()]
            return True, answers
    except Exception as e:
        return False, str(e)
