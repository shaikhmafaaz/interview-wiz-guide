
import os
from dotenv import load_dotenv

# Load environment variables from .env file if it exists
load_dotenv()

# Database configuration
DB_PATH = os.path.join(os.path.dirname(__file__), 'interview_prep.db')
DEBUG = True
HOST = '0.0.0.0'
PORT = 5000

# OpenAI API key - should be set as environment variable in production
# For local development, you can set it in .env file or directly here (not recommended for production)
OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY', '')

# If you want to hardcode the API key for testing (NOT RECOMMENDED FOR PRODUCTION):
# OPENAI_API_KEY = "sk-your-api-key-here"  # Replace with your actual API key

