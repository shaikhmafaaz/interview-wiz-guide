
from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3
import os
from datetime import datetime
import random  # Added for question generation

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
    print(f"Database initialized at {DB_PATH}")

# Initialize the database
init_db()

@app.route('/', methods=['GET'])
def index():
    return jsonify({
        'status': 'running',
        'message': 'Interview Prep API is running. Use /health to check status or access specific API endpoints.',
        'available_endpoints': [
            '/health',
            '/api/register',
            '/api/login',
            '/api/save-answer',
            '/api/get-user-answers/<user_id>',
            '/api/generate-questions'
        ]
    })

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'message': 'Python backend is running'})

# New endpoint for generating interview questions
@app.route('/api/generate-questions', methods=['POST'])
def generate_questions():
    data = request.json
    
    # Validate input data
    if not data:
        return jsonify({'status': 'error', 'message': 'No data provided'}), 400
    
    topic = data.get('topic')
    difficulty = data.get('difficulty')
    
    if not topic:
        return jsonify({'status': 'error', 'message': 'Topic is required'}), 400
    if not difficulty:
        return jsonify({'status': 'error', 'message': 'Difficulty is required'}), 400
        
    # Define question templates for different topics
    question_templates = {
        'javascript': [
            'What is the difference between {0} and {1} in JavaScript?',
            'How would you implement {0} using {1}?',
            'Explain how {0} works under the hood.',
            'What are the best practices when working with {0}?',
            'How would you debug an issue with {0}?',
            'Compare {0} and {1} approaches in JavaScript.',
            'When would you use {0} instead of {1}?',
            'Write a function that implements {0}.',
            'What are common pitfalls when using {0}?',
            'How has {0} changed in recent JavaScript versions?'
        ],
        'python': [
            'What is the difference between {0} and {1} in Python?',
            'How would you implement {0} using {1}?',
            'Explain how {0} works in Python.',
            'What are the best practices when working with {0} in Python?',
            'How would you optimize a function that uses {0}?',
            'Compare {0} and {1} approaches in Python.',
            'When should you use {0} instead of {1}?',
            'Write a Python function that implements {0}.',
            'What are common mistakes when using {0} in Python?',
            'How does {0} differ between Python 2 and Python 3?'
        ],
        'react': [
            'How would you implement {0} in a React component?',
            'What is the purpose of {0} in React?',
            'Compare {0} and {1} patterns in React development.',
            'How would you optimize a React component that uses {0}?',
            'Explain the lifecycle methods related to {0}.',
            'What are the best practices when working with {0} in React?',
            'How would you test a React component that uses {0}?',
            'When would you use {0} instead of {1} in React?',
            'How has {0} changed in recent React versions?',
            'What are common mistakes when implementing {0} in React?'
        ],
        'data science': [
            'How would you use {0} for {1} analysis?',
            'What are the limitations of {0} in data processing?',
            'Compare {0} and {1} algorithms for data analysis.',
            'How would you optimize a {0} model for better performance?',
            'Explain how {0} works in the context of machine learning.',
            'What data preprocessing steps are necessary before applying {0}?',
            'When would you choose {0} over {1} for data analysis?',
            'How would you evaluate the performance of a {0} model?',
            'What are common pitfalls when implementing {0} for data analysis?',
            'How has {0} evolved in recent years in data science?'
        ],
        'design': [
            'How would you approach designing a {0} for {1}?',
            'What are the key considerations when creating a {0}?',
            'Compare {0} and {1} design methodologies.',
            'How would you test the usability of a {0} design?',
            'Explain the importance of {0} in user interface design.',
            'What accessibility concerns should be addressed when designing a {0}?',
            'When would you choose {0} over {1} in a design system?',
            'How would you implement {0} in a responsive design?',
            'What are common mistakes when designing {0}?',
            'How have design trends for {0} changed in recent years?'
        ]
    }
    
    # Topic-specific concepts to fill in the templates
    topic_concepts = {
        'javascript': [
            'promises', 'async/await', 'closures', 'prototypes', 
            'event bubbling', 'hoisting', 'the event loop', 'ES6 modules',
            'arrow functions', 'this keyword', 'destructuring', 'const/let',
            'callbacks', 'map/reduce', 'DOM manipulation', 'TypeScript'
        ],
        'python': [
            'generators', 'decorators', 'context managers', 'list comprehensions',
            'virtual environments', 'dictionaries', 'lambdas', 'magic methods',
            'multiple inheritance', 'asyncio', 'type hints', 'unittest/pytest',
            'pandas', 'numpy', 'Django', 'Flask'
        ],
        'react': [
            'hooks', 'context API', 'render props', 'HOCs', 'Redux',
            'virtual DOM', 'memo', 'useEffect', 'useState', 'useReducer',
            'prop drilling', 'JSX', 'styled components', 'Suspense',
            'error boundaries', 'React Router'
        ],
        'data science': [
            'regression', 'classification', 'clustering', 'dimensionality reduction',
            'cross-validation', 'feature engineering', 'ensemble methods', 'neural networks',
            'overfitting', 'bias-variance tradeoff', 'ROC curves', 'hypothesis testing',
            'pandas', 'scikit-learn', 'TensorFlow', 'data visualization'
        ],
        'design': [
            'color theory', 'typography', 'grid systems', 'wireframing',
            'user personas', 'A/B testing', 'accessibility', 'responsive design',
            'design systems', 'UI components', 'usability testing', 'information architecture',
            'prototyping', 'user flows', 'material design', 'atomic design'
        ]
    }
    
    # Default to javascript if topic not found
    if topic.lower() not in topic_concepts:
        topic = 'javascript'
    else:
        topic = topic.lower()
    
    # Choose templates based on difficulty
    if difficulty.lower() == 'easy':
        num_questions = 5
        complexity_factor = 0.3  # Simpler questions
    elif difficulty.lower() == 'medium':
        num_questions = 5
        complexity_factor = 0.6  # Moderate complexity
    else:  # hard
        num_questions = 5
        complexity_factor = 1.0  # Full complexity
    
    questions = []
    templates = question_templates[topic]
    concepts = topic_concepts[topic]
    
    # Generate unique questions
    used_templates = set()
    while len(questions) < num_questions and len(used_templates) < len(templates):
        template_idx = random.randint(0, len(templates) - 1)
        
        # Ensure we don't repeat templates
        if template_idx in used_templates:
            continue
            
        used_templates.add(template_idx)
        template = templates[template_idx]
        
        # Choose random concepts to fill the template
        concept1 = random.choice(concepts)
        concept2 = random.choice([c for c in concepts if c != concept1])
        
        question = template.format(concept1, concept2)
        
        # Add question data
        question_data = {
            "id": len(questions) + 1,
            "question": question,
            "difficulty": difficulty,
            "category": topic,
            "concepts": [concept1, concept2]
        }
        
        questions.append(question_data)
    
    return jsonify({
        'status': 'success',
        'topic': topic,
        'difficulty': difficulty,
        'questions': questions
    })

@app.route('/api/register', methods=['POST'])
def register():
    # ... keep existing code (user registration logic)

@app.route('/api/login', methods=['POST'])
def login():
    # ... keep existing code (user login logic)

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
        return jsonify({'success': True, 'message': 'Answer saved successfully'})
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@app.route('/api/get-user-answers/<int:user_id>', methods=['GET'])
def get_user_answers(user_id):
    # ... keep existing code (get user answers logic)

@app.errorhandler(404)
def not_found(e):
    return jsonify({
        'status': 'error',
        'message': 'Endpoint not found. Please check the URL and try again.',
        'available_endpoints': [
            '/health',
            '/api/register',
            '/api/login',
            '/api/save-answer',
            '/api/get-user-answers/<user_id>',
            '/api/generate-questions'
        ]
    }), 404

if __name__ == '__main__':
    print(f"Starting Flask server on http://localhost:5000")
    print(f"Available endpoints:")
    print(f"  - /")
    print(f"  - /health")
    print(f"  - /api/register")
    print(f"  - /api/login")
    print(f"  - /api/save-answer")
    print(f"  - /api/get-user-answers/<user_id>")
    print(f"  - /api/generate-questions")
    app.run(debug=True, host='0.0.0.0', port=5000)
