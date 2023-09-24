from flask import Blueprint, jsonify, request, session
from db import User, db 
from flask_login import LoginManager, logout_user


login_manager = LoginManager()



# Create a blueprint for users-related endpoints
users_bp = Blueprint('users', __name__)

@users_bp.route('/summoned', methods=['GET'])  # Update the route path to /summoned
def get_users():
    users = User.query.all()
    user_list = [{'id': user.ID, 'name': user.name, 'email': user.email} for user in users]
    return jsonify(user_list)


@users_bp.route('/summoned_phantasm/<int:user_id>', methods=['GET'])
def get_specific_user(user_id):
    user = User.query.get(user_id)
    user = {'id': user.ID, 'name': user.name, 'email': user.email}
    return jsonify(user)

@users_bp.route('/', methods=['POST'])
def create_user():
    data = request.json

    # Check if the required data is provided in the request
    if 'name' not in data or 'email' not in data or 'password' not in data:
        return jsonify({'message': 'Incomplete data provided.'}), 400

    # Create a new user
    new_user = User(
        name=data['name'],
        email=data['email']
    )
    new_user.set_password(data['password'])

    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'User created successfully.'}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'message': 'Failed to create user.'}), 500



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

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# Auth endpoint for user login
#@users_bp.route('/login', methods=['POST'], endpoint='summoning_ritual')

@users_bp.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'message': 'Invalid credentials'}), 400

    user = User.query.filter_by(email=email).first()

    if user and user.check_password(password):
        load_user(user.ID)
        session['user_id'] = user.ID
        session.modified = True
        return jsonify({'id': f'{user.ID}', 'name': f'{user.name}', 'characterID': f'{user.characterID}', 'PaymentID': f'{user.PaymentID}'}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401


# Logout endpoint
#@users_bp.route('/logout', methods=['POST'], endpoint='/logout')
@users_bp.route('/logout', methods=['POST'], endpoint='logout')
#@login_required
def logout():
    #login_manager.logout_user()
    logout_user()
    #data = request.json
    #email = data.get('email')
    #user = User.query.filter_by(email=email).first()
    #session.pop(user.ID)
    session.clear()
    return jsonify({'message': 'Logout successful'}), 200

#@users_bp.route('/morphin_summoning_ritual/<int:user_id>', methods=['PUT'])
#def verify_Credentials(user_id):
