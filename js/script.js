const form = document.getElementById('register-form');

form.onsubmit = () => {
    event.preventDefault();
    if (form.username.value && form.password.value && form.repeatpassword){
        window.location = "index.html";
    }
}