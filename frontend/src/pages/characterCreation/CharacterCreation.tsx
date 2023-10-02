import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { fetchItems } from '../../api/fetchItems';
import { fetchAvailableClasses } from '../../api/fetchAvailableClasses';
import { updateUserCharacter } from '../../api/updateUserCharacter';
import { getUserCharacter } from '../../api/getUserCharacter';
import { getClassData } from '../../api/getClassData';
import { Classes } from '../../types/classes';
import { Items } from '../../types/items';
import { useNavigate } from 'react-router-dom';

export const CharacterCreation = () => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState<Classes[]>([]);
  const [items, setItems] = useState<Items[]>([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [userCharacterData, getUserCharacter] = useState('');
  const [userClassData, getClassData] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState('');
  const userCredentials = JSON.parse(localStorage.getItem('userCredentials') ?? "{}");
  const fetchCharacterData = async () => {
    const itemsResponse = await fetchItems();
    const classesResponse = await fetchAvailableClasses();
    if(itemsResponse.ok && classesResponse.ok){
      const fetchedItems = await itemsResponse.json();
      setItems(fetchedItems);
      const fetchedClasses = await classesResponse.json();
      setClasses(fetchedClasses);
    }else{
      throw new Error("Error fetching character data");
    }
  }

  const user_character = getUserCharacter(userCredentials?.characterID);
  const class_data = getClassData(user_character?.id);
  

  useEffect(() => {
    // Fetch available classes and items from your backend endpoints
    try {
      fetchCharacterData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleClassChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedClass(event.target.value);
  };

  const handleItemChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedItem(event.target.value);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
     if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    try {
      const response = await updateUserCharacter(classes[Number(selectedClass)].id, items[Number(selectedItem)].id, name, file, userCredentials?.characterID);
  
      if (response.ok) {
        await response.json();
        fetchCharacterData();
      } else {
        const errorData = await response.json();
        console.error('updateUserCharacter failed with error: ', errorData.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <>
    {(!userCredentials?.name) ?
      navigate("/login"):
      console.log(userCredentials?.name)}
    <div className="min-h-screen flex items-center justify-center bg-elegant-black text-white p-4">
      <form className='w-full max-w-sm' onSubmit={handleSubmit}>
        <h3 className="text-4xl font-bold mb-4">Spectral Manifestation</h3>
        <div className="mb-4">
        <label htmlFor="name" className="block font-medium">
          Character Name - selected name {user_character?.name}
        </label>
        <input
          type="text"
          id="name"
          className="w-full text-black ffont-black"
          value={name}
          onChange={(e) => setName(e.target.value)}
          />
      </div>
        <div className="mb-4">
          <label htmlFor="classSelect" className="block font-medium">
            Select Character Class - class selected {class_data?.name}
          </label>
          <select
            id="classSelect"
            className="w-full bg-mysterious-gray cursor-pointer text-white p-2 rounded"
            value={selectedClass}
            onChange={handleClassChange}
            >
            {classes ? classes.map((classItem, index) => (
              <option key={classItem.name} value={index}>
                {classItem.name}
              </option>
            )): (<option value="">No classes available</option>)}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="itemSelect" className="block font-medium">
            Select Item - item selected {user_character?.item}
          </label>
          <select
            id="itemSelect"
            className="w-full bg-mysterious-gray cursor-pointer text-white p-2 rounded"
            value={selectedItem}
            onChange={handleItemChange}
            >
            {classes ? items.map((item, index) => (
              <option key={item.id} value={index}>
              {item.name}
            </option>
            )): (<option value="">No items available</option>)}
          </select>       
        </div>
        <span className='mb-4'>Item discription: {items[Number(selectedItem)]?.description}</span>
        <div className="mt-4 mb-4">
          <div className="flex">
            <input
              id="fileInput"
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="hidden"
              />
            <label
              htmlFor="fileInput"
              className="w-full bg-mysterious-gray text-white py-2 px-4 rounded cursor-pointer hover:bg-opacity-80"
              >
              {file ? (<>Change Character Sheet</>) : (<>Upload Character Sheet (PDF)</>)}
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blood-red text-white py-2 px-4 rounded hover:bg-opacity-80"
          >
          Create Character
        </button>
      </form>
    </div>
          </>
  );
};

