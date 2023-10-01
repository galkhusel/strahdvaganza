import { Navigate } from 'react-router-dom';
export const TreasonOnTheCastle = () => {
  const userCredentials = JSON.parse(localStorage.getItem('userCredentials') ?? "{}");
  
  return (!userCredentials?.name) ? <Navigate to="/login" /> :  (
  <>
    <div>RULESET COMING SOON "14/10/2023"</div>
  </>
)
}

