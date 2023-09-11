from flask import Blueprint, jsonify, request
from db import Character, Character_Classes,Item , db 
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

def update_character_class(character, class_id):
    character_class_new = Character_Classes.query.get(class_id)
    character_class_old = Character_Classes.query.get(character.ClassID)
    if character_class_new and character_class_new.Slot == 1:
        character.ClassID = character_class_new.ID
        character_class_new.Slot = 0
        character_class_old.Slot = 1
        db.session.commit()
        return 1
    return 0

def update_character_item(character, item_id):
    item = Item.query.get(item_id)
    if Item:
        character.ItemId = item.ID
        db.session.commit()
        return 1
    return 0

@characters_bp.route('/hero/<int:character_id>', methods=['PUT'])
def update_character(character_id):
    character = Character.query.get(character_id)
    data = request.get_json()

    if character:
        # Check if we must change the class id
        if 'ClassID' in data:
            result = update_character_class(character, data['ClassID'])
            if result == 0:
                return jsonify({"error": "Class could not be assigned"}), 400
        
        # Check if we must change the item id
        if 'ItemID' in data:
            result = update_character_item(character, data['ItemID'])
            if result == 0:
                return jsonify({"error": "Item could not be assigned"}), 400

        # Update character data based on the incoming JSON data
        character.Name = data['Name']

        # Commit the changes to the database
        db.session.commit()

        # Prepare the updated data response
        return jsonify({'message': 'character updated'}), 200
    else:
        return jsonify({'error': 'Character not found'}), 404


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

@characters_bp.route('/items', methods=['GET'])
def get_magic_items():
    items = Item.query.all()
    items_list = [{'id': item.ID, 'name': item.name, 'description': item.Description} for item in items]
    return jsonify(items_list)
