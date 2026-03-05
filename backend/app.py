from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
import urllib3
from dotenv import load_dotenv

# Ignorar o aviso de conexão insegura
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

load_dotenv()

app = Flask(__name__)
CORS(app)

NASA_API_KEY = os.getenv("NASA_API_KEY")

@app.route('/api/apod', methods=['GET'])
def get_apod():
    date = request.args.get('date')
    if not date:
        return jsonify({"error": "Date parameter is required"}), 400
    
    # NASA API URL
    url = f"https://api.nasa.gov/planetary/apod?api_key={NASA_API_KEY}&date={date}"
    
    try:
        # verify=False desabilita a verificação do certificado SSL pra ambiente local
        response = requests.get(url, verify=False)
        response.raise_for_status()
        data = response.json()
        return jsonify(data)
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)
