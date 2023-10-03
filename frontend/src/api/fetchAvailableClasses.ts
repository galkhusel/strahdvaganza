export const fetchAvailableClasses = () => fetch('http://35.203.51.152:10000//ghouls_archives/spectral_manifestation/classes/available',
    {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
        }
    });
