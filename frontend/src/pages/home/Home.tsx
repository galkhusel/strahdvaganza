
export const Home = () => {
    const userCredentilas = JSON.parse(localStorage.getItem('userCredentials') ?? '');

  return (
    <div>Welcome {userCredentilas.name}</div>
  )
}
