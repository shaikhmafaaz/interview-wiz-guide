from flask import Flask, request, jsonify, Response
from database import save_user_answer, get_user_answers
from utils import generate_interview_questions
from openai_utils import get_chatbot_response

def register_routes(app):
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
                '/api/generate-questions',
                '/api/chat'  # New endpoint
            ]
        })
    
    @app.route('/health', methods=['GET'])
    def health_check():
        return jsonify({'status': 'healthy', 'message': 'Python backend is running'})
    
    @app.route('/api/generate-questions', methods=['POST'])
    def generate_questions():
        data = request.json
        
        # Validate input data
        if not data:
            return Response('Error: No data provided', mimetype='text/plain'), 400
        
        topic = data.get('topic')
        difficulty = data.get('difficulty')
        
        if not topic:
            return Response('Error: Topic is required', mimetype='text/plain'), 400
        if not difficulty:
            return Response('Error: Difficulty is required', mimetype='text/plain'), 400
            
        # Generate questions
        questions, topic, difficulty = generate_interview_questions(topic, difficulty)
        
        # Create plain text response
        response_text = f"Topic: {topic}\nDifficulty: {difficulty}\n\nQuestions:\n"
        for i, question in enumerate(questions, 1):
            response_text += f"{i}. {question}\n"
        
        return Response(response_text, mimetype='text/plain')
    
    @app.route('/api/register', methods=['POST'])
    def register():
        # ... keep existing code (user registration logic)
        return jsonify({'status': 'error', 'message': 'Not implemented yet'})
    
    @app.route('/api/login', methods=['POST'])
    def login():
        # ... keep existing code (user login logic)
        return jsonify({'status': 'error', 'message': 'Not implemented yet'})
    
    @app.route('/api/save-answer', methods=['POST'])
    def save_answer():
        data = request.json
        if not data or 'question' not in data or 'answer' not in data:
            return jsonify({'status': 'error', 'message': 'Question and answer required'}), 400
        
        user_id = data.get('user_id', None)  # Optional, for anonymous users
        
        success, message = save_user_answer(user_id, data['question'], data['answer'])
        if success:
            return jsonify({'success': True, 'message': message})
        else:
            return jsonify({'success': False, 'message': message}), 500
    
    @app.route('/api/get-user-answers/<int:user_id>', methods=['GET'])
    def get_user_answers_route(user_id):
        success, result = get_user_answers(user_id)
        if success:
            return jsonify({'success': True, 'answers': result})
        else:
            return jsonify({'success': False, 'message': result}), 500
    
    @app.route('/api/chat', methods=['POST'])
    def chat():
        """
        Endpoint for the chatbot functionality using the OpenAI API
        """
        data = request.json
        
        if not data or 'message' not in data:
            return jsonify({'success': False, 'message': 'Message is required'}), 400
            
        user_message = data['message']
        response = get_chatbot_response(user_message)
        
        return jsonify({
            'success': True, 
            'message': response
        })
    
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
                '/api/generate-questions',
                '/api/chat'
            ]
        }), 404
