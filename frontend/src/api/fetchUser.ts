export const fetchUser = (userMail: string, userPassword: string) => fetch('https://strahdvaganza-backend.onrender.com//ghouls_archives/entourage/login',
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
    