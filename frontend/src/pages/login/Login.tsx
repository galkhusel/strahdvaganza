import { MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom"
import { fetchUser } from "../../api/fetchUser";

export const Login = () => {
    const navigate = useNavigate();
    const [userMail, setUserMail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const handleChange = (newState: any, stateSetter: React.Dispatch<React.SetStateAction<string>>) => {
        stateSetter(newState);
    }
    const handleLogin = async (event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) =>{
        event.preventDefault();
        try {
            const response = await fetchUser(userMail, userPassword);
            if(response.ok){
              response.json().then((body)=>{
                localStorage.setItem('userCredentials', JSON.stringify(body));
                navigate('/');
              })
            }

        } catch (error) {
            
        }
    }
  return (
    <div className="min-w-full min-h-screen flex items-center justify-center bg-dark-purple">
      <div className="bg-elegant-black p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-4xl text-center text-white mb-4">Welcome to Castle Ravenloft</h1>
        <form className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-2xl text-white">Guest' s Mail</label>
            <input
                type="text"
                id="username"
                value={userMail}
                name="username"
                className="w-full rounded border bg-transparent p-2 text-white focus:outline-none focus:border-blood-red"
                onChange={(event)=>{handleChange(event.target.value, setUserMail)}}
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-2xl text-white">Signature</label>
            <input
                type="password"
                id="password"
                name="password"
                value={userPassword}
                className="w-full rounded border bg-transparent p-2 text-white focus:outline-none focus:border-blood-red"
                onChange={(event)=>handleChange(event.target.value, setUserPassword)}
            />
          </div>
          <button
            type="submit"
            className="font-bold w-full bg-blood-red text-white py-2 rounded hover:bg-dusty-rose text-3xl"
            onClick={(event) => handleLogin(event)}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  )
}
