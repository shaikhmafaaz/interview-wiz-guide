
from openai import OpenAI
from config import OPENAI_API_KEY

# Initialize the OpenAI client
client = OpenAI(api_key=OPENAI_API_KEY)

def get_chatbot_response(user_message):
    """
    Get a response from the OpenAI API for the chatbot.
    
    Args:
        user_message (str): The message from the user
    
    Returns:
        str: The response from the API
    """
    try:
        if not OPENAI_API_KEY:
            return "API key not configured. Please set the OPENAI_API_KEY environment variable."
            
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful interview preparation assistant. Provide concise, helpful advice on job interviews, technical questions, and career guidance."},
                {"role": "user", "content": user_message}
            ],
            max_tokens=250,
            temperature=0.7
        )
        
        return response.choices[0].message.content.strip()
    except Exception as e:
        return f"I encountered an error: {str(e)}"
