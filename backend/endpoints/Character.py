from flask import Blueprint, jsonify, request
from db import Character, Character_Classes,Item , db
from werkzeug.utils import secure_filename
import os

# relative path
PDF_FILE_PATH = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'instance', 'PDF'))


# Create a blueprint for characters-related endpoints
characters_bp = Blueprint('characters', __name__)

# @characters_bp.route('/hero/<int:character_id>', methods=['GET'])  # Update the route path to /summoned
# def get_character(character_id):
#     character = Character.query.get(character_id)
#     character_ = {'id': character.ID, 'name': character.Name, 'classID': character.ClassID,'item': character.ItemID,'pdf': character.PDF} 
#     return jsonify(character_)

@characters_bp.route('/hero/<int:character_id>', methods=['GET'])
def get_character(character_id):
    character = Character.query.get(character_id)
    if character:
        character_class = Character_Classes.query.get(character.ClassID)
        if character_class:
            character_ = {
                'id': character.ID,
                'name': character.Name,
                'classID': character.ClassID,
                'class': character_class.Class,
                'item': character.ItemID,
                'pdf': character.PDF
            }
            return jsonify(character_)
    
    return jsonify({'error': 'Character not found'}), 404


def update_character_class(character, class_id):
    if class_id == character.ClassID: return 1
    character_class_new = Character_Classes.query.get(class_id)
    character_class_old = Character_Classes.query.get(character.ClassID)
    if  character_class_old.Class == "Summoned Ghost" or (character_class_new.Slot == 0 and character_class_old.Slot == 1):
        character.ClassID = character_class_new.ID
        character_class_new.Slot = 1
        character_class_old.Slot = 0
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
def update_character_and_upload_pdf(character_id):
    character = Character.query.get(character_id)

    if not character:
        return jsonify({'error': 'Character not found'}), 404

    data = request.form.to_dict()
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

    # Handle PDF upload
    if 'pdf' in request.files:
        pdf_file = request.files['pdf']
        if pdf_file.filename != '':
            # Secure the filename to prevent path traversal attacks
            pdf_filename = secure_filename(pdf_file.filename)
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

    return jsonify({'message': 'character updated'}), 200


@characters_bp.route('/items', methods=['GET'])
def get_magic_items():
    try:
        items = Item.query.all()
        items_list = [{'id': item.ID, 'name': item.Name, 'description': item.Description} for item in items]
        return jsonify(items_list)

    except Exception as e:
        return jsonify({'error': str(e)}), 550
    
@characters_bp.route('/classes/available', methods=['GET'])
def get_available_classes():
    try:
        unused_character_classes = db.session.query(Character_Classes) \
            .outerjoin(Character, Character_Classes.ID == Character.ClassID) \
            .filter(Character.ID.is_(None)) \
            .all()

        result = [{'name': unused_class.Class, 'id': unused_class.ID} for unused_class in unused_character_classes]

        return jsonify(result)


    except Exception as e:
        return jsonify({'error': str(e)}), 550