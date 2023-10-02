export const getUserCharacter = (characterId : number) => fetch(`https://strahdvaganza-backend.onrender.com/ghouls_archives/spectral_manifestation/hero/${characterId}`,
    {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
        }
    });