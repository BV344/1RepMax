# DB Imports
from db.models import Base, User, Workouts
from datetime import datetime, timezone

# SQLalchemy Imports
from sqlalchemy import create_engine
from sqlalchemy.orm import Session

# FLASK Imports
from flask import Flask, jsonify, request
from flask_cors import CORS


# Turning On the Database Engine
engine = create_engine("sqlite:///db.1repmax")
Base.metadata.create_all(engine)

app = Flask(__name__)
CORS(app) # Allows Flask to Communicate with React


@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json(force=True)
    print(data.get("username", "ERROR"))

    return jsonify(message="Hello from Backend")


@app.route("/api/create_account", methods=["POST"])
def create_account():
    data = request.get_json(force=True)

    first_name = data.get("firstName", "")
    last_name = data.get("lastName", "")
    username = data.get("username", "")
    password = data.get("password", "")

    with Session(engine) as session:
        new_user = User(
            username=username,
            password=password,
            first_name=first_name,
            last_name=last_name,
            date_created=datetime.now(timezone.utc),
            last_login=datetime.now(timezone.utc)
        )
        session.add(new_user)
        session.commit()

    print("DEBUGGING", first_name, last_name, username, password)

    return jsonify(message="Your Account Has Been Created Successfully"), 201


if __name__ == "__main__":
    app.run(port=5000, debug=True)
