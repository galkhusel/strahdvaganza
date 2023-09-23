import { useState, useEffect } from 'react';
import { fetchItems } from '../../api/fetchItems';
import { fetchAvailableClasses } from '../../api/fetchAvailableClasses';
import { updateUserCharacter } from '../../api/updateUserCharacter';

export const CharacterCreation = () => {
  const [classes, setClasses] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [file, setFile] = useState(null);
  const [name, setName] = useState('');
  const userCredentilas = JSON.parse(localStorage.getItem('userCredentials') ?? '');
  const fetchCharacterData = async () => {
    const itemsResponse = await fetchItems();
    const classesResponse = await fetchAvailableClasses();
    if(itemsResponse.ok && classesResponse.ok){
      const fetchedItems = await itemsResponse.json();
      setItems(fetchedItems);
      const fetchedClasses = await classesResponse.json();
      setClasses(fetchedClasses);
    }else{
      console.log('itemsResponse: ', itemsResponse.body);
      console.log('classesResponse: ', classesResponse.body);
      throw new Error("Error fetching character data");
    }
  }
  useEffect(() => {
    // Fetch available classes and items from your backend endpoints
    try {
      fetchCharacterData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleClassChange = (event) => {
    setSelectedClass(event.target.value);
  };

  const handleItemChange = (event) => {
    setSelectedItem(event.target.value);
  };

  const handleFileChange = (event) => {
    console.log('files: ', event.target.files[0])
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await updateUserCharacter(classes[Number(selectedClass)].id, items[Number(selectedItem)].id, name, file, userCredentilas?.characterID);
  
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
    <div className="min-h-screen flex items-center justify-center bg-elegant-black text-white p-4">
      <form className='w-full max-w-sm' onSubmit={handleSubmit}>
        <h3 className="text-4xl font-bold mb-4">Spectral Manifestation</h3>
        <div className="mb-4">
        <label htmlFor="name" className="block font-medium">
          Character Name
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
            Select Character Class
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
            Select Item
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
  );
};

