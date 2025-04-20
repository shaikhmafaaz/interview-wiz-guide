
from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import os
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Database setup
DB_PATH = os.path.join(os.path.dirname(__file__), 'interview_prep.db')

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

# Initialize the database
init_db()

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'message': 'Python backend is running'})

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    if not data or 'email' not in data or 'password' not in data:
        return jsonify({'status': 'error', 'message': 'Email and password required'}), 400
    
    try:
        with sqlite3.connect(DB_PATH) as conn:
            cursor = conn.cursor()
            cursor.execute('INSERT INTO users (email, password) VALUES (?, ?)',
                          (data['email'], data['password']))
            conn.commit()
        return jsonify({'status': 'success', 'message': 'User registered successfully'})
    except sqlite3.IntegrityError:
        return jsonify({'status': 'error', 'message': 'Email already exists'}), 409
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    if not data or 'email' not in data or 'password' not in data:
        return jsonify({'status': 'error', 'message': 'Email and password required'}), 400
    
    try:
        with sqlite3.connect(DB_PATH) as conn:
            cursor = conn.cursor()
            cursor.execute('SELECT id, email FROM users WHERE email = ? AND password = ?',
                          (data['email'], data['password']))
            user = cursor.fetchone()
            
            if user:
                return jsonify({
                    'status': 'success',
                    'message': 'Login successful',
                    'user': {
                        'id': user[0],
                        'email': user[1]
                    }
                })
            else:
                return jsonify({'status': 'error', 'message': 'Invalid credentials'}), 401
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/save-answer', methods=['POST'])
def save_answer():
    data = request.json
    if not data or 'question' not in data or 'answer' not in data:
        return jsonify({'status': 'error', 'message': 'Question and answer required'}), 400
    
    user_id = data.get('user_id', None)  # Optional, for anonymous users
    
    try:
        with sqlite3.connect(DB_PATH) as conn:
            cursor = conn.cursor()
            cursor.execute('INSERT INTO user_answers (user_id, question, answer) VALUES (?, ?, ?)',
                          (user_id, data['question'], data['answer']))
            conn.commit()
        return jsonify({'status': 'success', 'message': 'Answer saved successfully'})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/get-user-answers/<int:user_id>', methods=['GET'])
def get_user_answers(user_id):
    try:
        with sqlite3.connect(DB_PATH) as conn:
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            cursor.execute('SELECT * FROM user_answers WHERE user_id = ? ORDER BY created_at DESC', (user_id,))
            answers = [dict(row) for row in cursor.fetchall()]
        return jsonify({'status': 'success', 'answers': answers})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
