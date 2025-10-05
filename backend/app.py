# DB Imports
from db.models import Base, User, Workouts
from datetime import datetime, timezone

# SQLalchemy Imports
from sqlalchemy import create_engine
from sqlalchemy.orm import Session

# FLASK Imports
from flask import Flask, jsonify, request
from flask_cors import CORS

# JSON Web Token Imports
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager, current_user

# .env Retrieval Imports
from dotenv import load_dotenv
import os

# Password Hashing and Salting Imports
from werkzeug.security import generate_password_hash, check_password_hash

# Turning On the Database Engine
engine = create_engine("sqlite:///db.1repmax")
Base.metadata.create_all(engine)

app = Flask(__name__)
CORS(app) # Allows Flask to Communicate with React

# Loading SUPER_SECRET_KEY from .env file and creating instance of JSON Web Token
load_dotenv()
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
jwt = JWTManager(app) # Allows JSON Web Tokens to Sign-In/Out Securely


# Converts the SQLAlchemy User object into a JSON-safe ID for JWT
@jwt.user_identity_loader
def user_identity_lookup(user):
    return user.id

# Looks up the User object automatically when JWT is verified
@jwt.user_lookup_loader
def user_lookup_callback(_jwt_header, jwt_data):
    identity = jwt_data["sub"]
    with Session(engine) as session:
        return session.get(User, identity)

@app.route("/api/login", methods=["POST"])
def login():
    data = request.get_json(force=True)
    username = data.get("username", None)
    password = data.get("password", None)

    with Session(engine) as session:
        user = session.query(User).filter_by(username=username).first()

        if not user or not check_password_hash(user.password, password):
            return jsonify({"msg":"Invalid Username or Password"}), 401

        access_token = create_access_token(identity=user)
        return jsonify(access_token=access_token)

@app.route("/api/protected", methods=["GET"])
@jwt_required()
def protected():
    return jsonify(id=current_user.id, username=current_user.username)


@app.route("/api/create_account", methods=["POST"])
def create_account():
    data = request.get_json(force=True)

    first_name = data.get("firstName", "")
    last_name = data.get("lastName", "")
    username = data.get("username", "")
    password = data.get("password", "")

    hashed_password = generate_password_hash(password) # Hash + Salt Password

    with Session(engine) as session:
        new_user = User(
            username=username,
            password=hashed_password,
            first_name=first_name,
            last_name=last_name,
            date_created=datetime.now(timezone.utc),
            last_login=datetime.now(timezone.utc)
        )
        session.add(new_user)
        session.commit()

    print("DEBUGGING CREATE ACCOUNT", first_name, last_name, username, password)

    return jsonify(message="Your Account Has Been Created Successfully"), 201


if __name__ == "__main__":
    app.run(port=5000, debug=True)
