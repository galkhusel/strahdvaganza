import defaultUrl from "../assets/constants";

export const fetchCurrentCharacter = (userId: string) => fetch(`${defaultUrl}//ghouls_archives/spectral_manifestation/hero/${userId}`,
    {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
        }
    });
