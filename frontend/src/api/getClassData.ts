export const getUserCharacter = (ClassId : number) => fetch(`https://strahdvaganza-backend.onrender.com/ghouls_archives/spectral_manifestation/classes/${ClassId}`,
    {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
        }
    });