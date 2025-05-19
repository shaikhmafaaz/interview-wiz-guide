
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

