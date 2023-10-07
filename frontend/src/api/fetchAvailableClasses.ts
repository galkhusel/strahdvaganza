import defaultUrl from "../assets/constants";

export const fetchAvailableClasses = () => fetch(`${defaultUrl}//ghouls_archives/spectral_manifestation/classes/available`,
    {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
        }
    });
