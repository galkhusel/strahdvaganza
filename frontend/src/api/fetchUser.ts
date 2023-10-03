export const fetchUser = (userMail: string, userPassword: string) => fetch('http://35.203.51.152:10000//ghouls_archives/entourage/login',
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
    
