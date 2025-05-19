
import google.generativeai as genai
from config import GEMINI_API_KEY

def get_chatbot_response(user_message):
    """
    Get a response from the Gemini API for the chatbot.
    
    Args:
        user_message (str): The message from the user
    
    Returns:
        str: The response from the API
    """
    try:
        if not GEMINI_API_KEY or GEMINI_API_KEY.strip() == '':
            return "API key not configured. Please set the GEMINI_API_KEY environment variable or in the .env file. Check the console for instructions."
        
        # Configure the Gemini API client
        genai.configure(api_key=GEMINI_API_KEY)
        
        # Set up the model
        model = genai.GenerativeModel('gemini-pro')
        
        # Create a system prompt + user message
        chat = model.start_chat(history=[])
        
        # Generate a response using Gemini
        response = chat.send_message(
            "You are a helpful interview preparation assistant. Provide concise, helpful advice on job interviews, technical questions, and career guidance.\n\n" + 
            user_message
        )
        
        return response.text
    
    except Exception as e:
        return f"I encountered an error: {str(e)}"
