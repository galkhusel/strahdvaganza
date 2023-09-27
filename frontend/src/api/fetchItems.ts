export const fetchItems = () => fetch('https://strahdvaganza-backend.onrender.com//ghouls_archives/spectral_manifestation/items',
    {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
