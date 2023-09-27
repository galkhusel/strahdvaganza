export const fetchAvailableClasses = () => fetch('https://strahdvaganza-backend.onrender.com//ghouls_archives/spectral_manifestation/classes/available',
    {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
        }
    });
