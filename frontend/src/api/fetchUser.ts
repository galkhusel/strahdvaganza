export const fetchUser = (userMail: string, userPassword: string) => fetch('http://127.0.0.1:8000//ghouls_archives/entourage/login',
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
    