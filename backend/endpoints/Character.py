from flask import Blueprint, jsonify, request
from db import Character, db 




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
    
    if request.files:
        print("request.files")
    if not 'file' in request.files or 'pdf' not in request.files:
        return jsonify({"error": "No PDF file provided"}), 400
    
    pdf_file = request.files['pdf']
    
    if pdf_file.filename == '':
        return jsonify({"error": "No selected PDF file"}), 400
    
    # You can save the PDF file using a unique name to avoid overwriting
    pdf_filename = f'character_{character_id}.pdf'
    pdf_path = os.path.join(app.config['UPLOAD_FOLDER'], pdf_filename)
    pdf_file.save(pdf_path)
    
    character.PDF = pdf_path
    db.session.commit()
    
    return jsonify({"message": "PDF uploaded successfully"})
