from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # Allows Flask to Communicate with React

@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json(force=True)
    print(data.get("username", "ERROR"))

    return jsonify(message="Hello from Backend")

if __name__ == "__main__":
    app.run(port=5000, debug=True)
