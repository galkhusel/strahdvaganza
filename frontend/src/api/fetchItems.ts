export const fetchItems = () => fetch('http://127.0.0.1:8000//ghouls_archives/spectral_manifestation/items',
    {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
