
import os

# Database configuration
DB_PATH = os.path.join(os.path.dirname(__file__), 'interview_prep.db')
DEBUG = True
HOST = '0.0.0.0'
PORT = 5000

# OpenAI API key - should be set as environment variable in production
OPENAI_API_KEY = os.environ.get('OPENAI_API_KEY', '')
