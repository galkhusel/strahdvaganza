import { ChangeEvent, FormEvent, useState } from 'react'
import { updatePayment } from '../../api/updatePayment';
import { Navigate } from 'react-router-dom';
import { ButtonSpinner } from '../../assets/common/spiners/buttonSpinner';

export const Payments = () => {
  const [file, setFile] = useState<File | null>(null);
  const [paymentDelivered, setPaymentDelivered] = useState(false);
  const [uploadingCharacter, setUploadingCharacter] = useState(false);
  const userCredentials = JSON.parse(localStorage.getItem('userCredentials') ?? '{}');

  const pageMainStyles = "min-h-screen bg-elegant-black text-white p-4 " + (paymentDelivered ? "" : "flex items-center justify-center");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUploadingCharacter(true);
    if (!file) {
      console.error('No JPG file selected');
      return;
    }
    try {
      const response = await updatePayment(file, userCredentials?.paymentID)
      if (response.ok) {
        setPaymentDelivered(true);
        setUploadingCharacter(false);
      } else {
        const errorData = await response.json();
        console.error('updatePayment failed with Error: ', errorData.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (!userCredentials?.name) ? <Navigate to="/login" /> : (
    <>
    <div className={pageMainStyles}>
      {paymentDelivered ? 
      (<>
      <p className="text-4xl font-bold mb-4">Your Tribute Has Been Delivered.</p>
      <br/>
      <p className="text-4xl font-bold mb-4">Please Wait While Our Ghouls Check It's Worthiness.</p>
      </>) 
      : (<form className="w-full max-w-sm" onSubmit={handleSubmit}>
        <h3 className="text-4xl font-bold mb-4">Please Present Your Tribute</h3>
        <div className="mt-4 mb-4">
          <div className="flex">
            <input
              id="jpgInput"
              type="file"
              accept=".jpg"
              onChange={handleFileChange}
              className="hidden"
              />
            <label
              htmlFor="jpgInput"
              className="w-full bg-mysterious-gray text-white py-2 px-4 rounded cursor-pointer hover:bg-opacity-80"
              >
              {file ? 'Change JPG Receipt' : 'Upload JPG Receipt'}
            </label>
          </div>
        </div>
        {uploadingCharacter ? (<ButtonSpinner/>) : (<button
          type="submit"
          className="bg-blood-red text-white py-2 px-4 rounded hover:bg-opacity-80"
          >
          Pressent Offering
        </button>)}
      </form>)}
    </div>
          </>
  );
}
