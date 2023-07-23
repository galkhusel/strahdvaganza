from flask import Blueprint, jsonify, request
from DB import User, db 
from flask_login import LoginManager, login_required


login_manager = LoginManager()


# Create a blueprint for users-related endpoints
users_bp = Blueprint('users', __name__)

@users_bp.route('/summoned', methods=['GET'])  # Update the route path to /summoned
def get_users():
    user = User.query.get(user_id)
    user = {'id': user.ID, 'name': user.name, 'email': user.email}
    return jsonify(user_list)


@users_bp.route('/summoned_phantasm/<int:user_id>', methods=['GET'])
def get_specific_user(user_id):
    users = User.query.all()
    user_list = [{'id': user.ID, 'name': user.name, 'email': user.email} for user in users]
    return jsonify(user_list)



@users_bp.route('/morphing_summoned/<int:user_id>', methods=['PUT'])
def update_user(user_id):
    data = request.json

    user = User.query.get(user_id)
    if not user:
        return jsonify({'message': 'User not found.'}), 404

    if 'name' in data:
        user.name = data['name']
    if 'email' in data:
        user.email = data['email']
    if 'password' in data:
        user.set_password(data['password'])

    try:
        db.session.add(user)
        db.session.commit()
        return jsonify({'message': 'User updated successfully.'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Failed to update user.'}), 500

# Function to load a user from the database
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Auth endpoint for user login
@users_bp.route('/summoning_ritual', methods=['POST'])
def logging(user_id):

    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'message': 'Invalid credentials'}), 400

    user = User.query.filter_by(username=username).first()

    if user and user.check_password(password):
        login_user(user)
        return jsonify({'message': 'Login successful'}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

# Logout endpoint
@users_bp.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return jsonify({'message': 'Logout successful'}), 200

#@users_bp.route('/morphin_summoning_ritual/<int:user_id>', methods=['PUT'])
#def verify_Credentials(user_id):
