export const fetchItems = () => fetch('http://35.203.51.152:10000//ghouls_archives/spectral_manifestation/items',
    {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
