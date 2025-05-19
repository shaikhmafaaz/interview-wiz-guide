
# Interview Preparation Assistant Backend

This is the Python backend for the Interview Preparation Assistant application.

## Setup

1. Create a virtual environment (optional but recommended):
   ```
   python -m venv venv
   ```

2. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - macOS/Linux: `source venv/bin/activate`

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Install Google Generative AI library:
   ```
   pip install google-generativeai
   ```

5. Configure your Gemini API key:
   - Option 1: Create a `.env` file in this directory and add:
     ```
     GEMINI_API_KEY=your_gemini_api_key_here
     ```
   - Option 2: Set as environment variable:
     - Windows: `set GEMINI_API_KEY=your_gemini_api_key_here`
     - macOS/Linux: `export GEMINI_API_KEY=your_gemini_api_key_here`
   - Note: The application is currently configured with a default API key for testing purposes.

6. Run the application:
   ```
   python app.py
   ```

The server will start at http://0.0.0.0:5000

## Troubleshooting

If you encounter a "Connection Error" in the frontend:

1. Make sure the Flask server is running. Open a terminal, navigate to the `python_backend` directory, and run:
   ```
   python app.py
   ```

2. Check that the server is running on the expected URL (http://localhost:5000)

3. Verify that your firewall is not blocking connections to port 5000

4. If you've changed the port configuration, update the frontend API URL in `src/components/ChatbotAssistant.tsx`
