import defaultUrl from "../assets/constants";

export const fetchItems = () => fetch(`${defaultUrl}//ghouls_archives/spectral_manifestation/items`,
    {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
