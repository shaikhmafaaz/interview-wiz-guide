
from flask import Flask
from flask_cors import CORS
from config import DEBUG, HOST, PORT
from database import init_db
from routes import register_routes

# Create and configure the application
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Initialize the database
init_db()

# Register all routes
register_routes(app)

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
    app.run(debug=DEBUG, host=HOST, port=PORT)
