const form = document.querySelector(".form");
const userName = document.querySelector("#name");
const userEmail = document.querySelector("#email");
const userPassword = document.querySelector("#password");

form.addEventListener("submit", (e) => {
    
    e.preventDefault();

    const user = {
        name: userName.value,
        email: userEmail.value,
        password: userPassword.value
    }

    console.log(user);

});