import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { fetchItems } from '../../api/fetchItems';
import { fetchAvailableClasses } from '../../api/fetchAvailableClasses';
import { updateUserCharacter } from '../../api/updateUserCharacter';
import { Classes } from '../../types/classes';
import { Items } from '../../types/items';
import { useNavigate } from 'react-router-dom';
import { PageSpinner } from '../../assets/common/spiners/pageSpinner';
import { ButtonSpinner } from '../../assets/common/spiners/buttonSpinner';
import { fetchCurrentCharacter } from '../../api/fetchCurrentCharacter';

export const CharacterCreation = () => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState<Classes[]>([]);
  const [items, setItems] = useState<Items[]>([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [PageIsLoading, setPageIsLoading] = useState(false);
  const [uploadingCharacter, setUploadingCharacter] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState('');
  const userCredentials = JSON.parse(localStorage.getItem('userCredentials') ?? '{}');
  const fetchCharacterData = async () => {
    setPageIsLoading(true)
    const itemsResponse = await fetchItems();
    const classesResponse = await fetchAvailableClasses();
    const currentCharacterResponse = await fetchCurrentCharacter(userCredentials?.characterID);
    if(itemsResponse.ok && classesResponse.ok && currentCharacterResponse.ok){
      const fetchCurrentCharacter = await currentCharacterResponse.json();
      setName(fetchCurrentCharacter.name);
      const fetchedItems = await itemsResponse.json();
      setItems(fetchedItems);
      const fetchedClasses = await classesResponse.json();
      setClasses([{id: fetchCurrentCharacter.classID, name: fetchCurrentCharacter.class.class_name}, ...fetchedClasses]);
      setPageIsLoading(false)
    }else{
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
    setUploadingCharacter(true);
    try {
      const response = await updateUserCharacter(classes[Number(selectedClass)].id, items[Number(selectedItem)].id, name, file, userCredentials?.characterID);
  
      if (response.ok) {
        await response.json();
        fetchCharacterData();
        setUploadingCharacter(false);
      } else {
        const errorData = await response.json();
        console.error('updateUserCharacter failed with error: ', errorData.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  return(
    <>
    {(!userCredentials?.name) && navigate("/login")}
    <div className="min-h-screen flex items-center justify-center bg-elegant-black text-white p-4">
      <form className='w-full max-w-sm' onSubmit={handleSubmit}>
       { PageIsLoading ? (<PageSpinner/>) : <>
       
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
              <option key={classItem.name} value={index} selected={index == 0 ? true : false}>
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
        
        {uploadingCharacter ? (<ButtonSpinner/>) : (<button
          type="submit"
          className="bg-blood-red text-white py-2 px-4 rounded hover:bg-opacity-80"
          >
          Create Character
        </button>)}
        </>}
      </form>
    </div>
          </>
  );
};

