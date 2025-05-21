
from flask import Flask
from flask_cors import CORS
from config import DEBUG, HOST, PORT
from database import init_db
from routes import register_routes

# Create and configure the application
app = Flask(__name__)
# Enable CORS for all routes and all origins
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)

# Initialize the database
init_db()

# Register all routes
register_routes(app)

# Health check directly in app.py for clarity
@app.route('/health', methods=['GET'])
def health():
    return {"status": "ok", "message": "Server is running"}, 200

if __name__ == '__main__':
    print(f"Starting Flask server on http://{HOST}:{PORT}")
    print(f"Available endpoints:")
    print(f"  - /")
    print(f"  - /health")
    print(f"  - /api/register")
    print(f"  - /api/login")
    print(f"  - /api/save-answer")
    print(f"  - /api/get-user-answers/<user_id>")
    print(f"  - /api/generate-questions")
    print(f"  - /api/chat")
    # Use 0.0.0.0 to ensure the server is accessible externally
    app.run(debug=DEBUG, host='0.0.0.0', port=PORT)
