
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

4. Configure your OpenAI API key:
   - Option 1: Create a `.env` file in this directory and add:
     ```
     OPENAI_API_KEY=your_openai_api_key_here
     ```
   - Option 2: Set as environment variable:
     - Windows: `set OPENAI_API_KEY=your_openai_api_key_here`
     - macOS/Linux: `export OPENAI_API_KEY=your_openai_api_key_here`

5. Run the application:
   ```
   python app.py
   ```

The server will start at http://0.0.0.0:5000
