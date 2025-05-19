
import os
from dotenv import load_dotenv

# Load environment variables from .env file if it exists
load_dotenv()

# Database configuration
DB_PATH = os.path.join(os.path.dirname(__file__), 'interview_prep.db')
DEBUG = True
HOST = '0.0.0.0'
PORT = 5000

# Gemini API key - should be set as environment variable in production
# For local development, you can set it in .env file or directly here (not recommended for production)
GEMINI_API_KEY = os.environ.get('GEMINI_API_KEY', 'AIzaSyDKlE4I4bPiXW04GHjjNoO_ZStJ3d7hPBI')

# If you want to hardcode the API key for testing (NOT RECOMMENDED FOR PRODUCTION):
# GEMINI_API_KEY = "your-gemini-api-key-here"  # Replace with your actual Gemini API key
