import defaultUrl from "../assets/constants";

export const fetchUser = (userMail: string, userPassword: string) => fetch(`${defaultUrl}//ghouls_archives/entourage/login`,
            {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: userMail,
                    password: userPassword
                })
            });
    
