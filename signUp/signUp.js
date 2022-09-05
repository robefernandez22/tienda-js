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

    if (localStorage.getItem("users") == null) {
        localStorage.setItem("users", JSON.stringify([user]));
        return;
    }

    let users = JSON.parse(localStorage.getItem("users"));
    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    location.replace("../index.html?userCreated");

});