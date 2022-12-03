document.getElementById('login-form').addEventListener('submit', onLogin);
document.getElementById('register-form').addEventListener('submit', onRegister);
document.getElementById('logout').addEventListener('click',onLogout);



async function onLogout(){
    const token = sessionStorage.getItem('accessToken');

    await fetch ('http://localhost:3030/users/logout',{
        method:'post',
        headers:{
            'X-Authorization': token
        }
    });
    sessionStorage.clear();
}
async function onLogin(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const { email, password } = Object.fromEntries(formData.entries());

    const response = await fetch(`http://localhost:3030/users/login`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })

    const data = await response.json();
    sessionStorage.setItem('accessToken', data.accessToken);

}
async function onRegister(event) {
    event.preventDefault();
    try{

    const formData = new FormData(event.target);
    const { email, password, repassword } = Object.fromEntries(formData.entries());

    if(password!==repassword){
        throw new Error('Repeat password error');
    }

    const response = await fetch(`http://localhost:3030/users/register`, {
        method: 'post',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    sessionStorage.setItem('accessToken', data.accessToken);
}
catch(error){
    confirm(error.message);
window.location = 'auth.html';

}
}