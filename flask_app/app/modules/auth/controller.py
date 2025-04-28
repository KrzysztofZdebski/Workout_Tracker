from flask import jsonify
from app.db.models import User


class AuthController:
    def index(self, request):
        return jsonify({'message':'Hello, World!'})
    
    def login(self, request):
        return jsonify({'message':'Login successful!'})
    
    def register(self, request):
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        email = data.get('email')
        if not username or not password or not email:
            return jsonify({'message':'Missing required fields!'}), 400

        user = User.get_by_username(username=username)
        if user is not None:
            return jsonify({'message':'User already exists!'}), 409
        
        user = User(username=username, email=email)
        user.set_password(password)
        user.save()

        return jsonify({'message':'User registered successfully!'}), 201
    
    def logout(self, request):
        return jsonify({'message':'Logout successful!'})
