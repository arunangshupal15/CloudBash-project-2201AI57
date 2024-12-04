# app.py
from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

RECOMMENDATION_API_URL = "https://www.myntra.com/gateway/v2/product/{product_id}/related"

@app.route('/recommendations', methods=['GET'])
def fetch_recommendations():
    try:
        data = request.json  # Expecting a JSON payload from frontend
        response = requests.post(RECOMMENDATION_API_URL, json=data)
        if response.status_code == 200:
            return jsonify(response.json()), 200
        else:
            return jsonify({"error": "Failed to fetch recommendations"}), response.status_code
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
