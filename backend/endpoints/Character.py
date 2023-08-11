from flask import Blueprint, jsonify, request
from db import Character, db 
import os

# relative path
PDF_FILE_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'instance', 'PDF'))


# Create a blueprint for characters-related endpoints
characters_bp = Blueprint('characters', __name__)

@characters_bp.route('/hero/<int:character_id>', methods=['GET'])  # Update the route path to /summoned
def get_character(character_id):
    character = Character.query.get(character_id)
    character_ = {'id': character.ID, 'name': character.Name, 'class': character.ClassID,'item': character.ItemID,'pdf': character.PDF} 
    return jsonify(character_)


@characters_bp.route('/hero/<int:character_id>', methods=['PUT'])
def update_character(character_id):
    character = Character.query.get(character_id)
    # Update character data here (e.g., name, class, item)
    db.session.commit()
    updated_data = {'id': character.ID, 'name': character.Name, 'class': character.ClassID, 'item': character.ItemID}
    return jsonify(updated_data)



@characters_bp.route('/hero/<int:character_id>/sign_blood_covenant', methods=['POST'])
def upload_pdf(character_id):
    character = Character.query.get(character_id)

    if 'pdf' not in request.files:
        return jsonify({"error": "No PDF file provided"}), 400
    
    pdf_file = request.files['pdf']
    
    if pdf_file.filename == '':
        return jsonify({"error": "No selected PDF file"}), 400
    
    # Construct the PDF file path using the PDF_FILE_PATH
    pdf_filename = f'character_{character_id}.pdf'
    pdf_path = os.path.join(PDF_FILE_PATH, pdf_filename)
    print(pdf_file)
    # Ensure the PDF folder exists, create if not
    os.makedirs(os.path.dirname(pdf_path), exist_ok=True)
    # Before saving the file
    print("pdf_path:", pdf_path)
    pdf_file.save(pdf_path)
    # After saving the file
    print("PDF saved at:", pdf_path)
    character.PDF = pdf_path
    db.session.commit()
    
    return jsonify({"message": "PDF uploaded successfully"})