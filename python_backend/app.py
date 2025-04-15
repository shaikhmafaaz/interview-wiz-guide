
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({'status': 'healthy', 'message': 'Python backend is running'})

@app.route('/api/example', methods=['POST'])
def example_endpoint():
    data = request.json
    # Process the data here
    return jsonify({
        'status': 'success',
        'message': 'Data received successfully',
        'data': data
    })

if __name__ == '__main__':
    app.run(debug=True)
