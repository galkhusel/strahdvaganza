import { Link, useLocation } from 'react-router-dom';

export const Header = () => {
  const location = useLocation();

  // Conditionally render the header except on the /login route
  if (location.pathname === '/login') {
    return null;
  }

  return (
    <header className='bg-dark-purple py-4 w-full flex justify-between items-center sm:px-8 border-b'>
      <Link to={'/character-creation'} className='text-white hover:text-dusty-rose text-lg'>
        SPECTRAL MANIFESTATION
      </Link>
      <Link to={'/'} className='text-white hover:text-dusty-rose text-lg'>
        INVOCATION RING
      </Link>         
      <Link to={'/payment'} className='text-white hover:text-dusty-rose text-lg'>
        ELDRITCH ACCOUNTABILITY
      </Link>                
      <Link to={'/treason-on-the-castle'} className='text-white hover:text-dusty-rose text-lg'>
        TREASON ON CASTLE RAVENLOFT
      </Link>                   
    </header>
  );
};
