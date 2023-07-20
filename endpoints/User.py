from flask import Blueprint, jsonify
from DB import User

# Create a blueprint for users-related endpoints
users_bp = Blueprint('users', __name__)

@users_bp.route('/summoned', methods=['GET'])  # Update the route path to /summoned
def get_users():
    users = User.query.all()
    user_list = [{'id': user.ID, 'name': user.name, 'email': user.email} for user in users]
    return jsonify(user_list)