from flask import Blueprint, jsonify, request
from db import  Payment, db 
import os

# relative path
JPG_FILE_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'instance', 'JPG'))


# Create a blueprint for payment-related endpoints
payment_bp = Blueprint('payments', __name__)

@payment_bp.route('/<int:payment_id>/eldritch_receipt', methods=['POST'])
def upload_jpg(payment_id):
    User = Payment.query.get(payment_id)

    print(request)
    #print(request.files)

    if 'jpg' not in request.files:
        return jsonify({"error": "No JPG file provided"}), 400
    
    jpg_file = request.files['jpg']
    
    if jpg_file.filename == '':
        return jsonify({"error": "No selected JPG file"}), 400
    
    # Construct the JPG file path using the JPG_FILE_PATH
    jpg_filename = f'payment_{payment_id}.jpg'
    jpg_path = os.path.join(JPG_FILE_PATH, jpg_filename)
    print(jpg_file)
    # Ensure the jpg folder exists, create if not
    os.makedirs(os.path.dirname(jpg_path), exist_ok=True)
    # Before saving the file
    print("jpg_path:", jpg_path)
    jpg_file.save(jpg_path)
    # After saving the file
    print("JPG saved at:", jpg_path)
    User.Receipt = jpg_path
    db.session.commit()
    
    return jsonify({"message": "jpg uploaded successfully"})

