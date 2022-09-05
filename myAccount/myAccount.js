const userLogged = JSON.parse(localStorage.getItem("userLogged"));

let userName = document.querySelector("#name");
userName.value = userLogged.name;

let userEmail = document.querySelector("#email");
userEmail.value = userLogged.email;

let userPassword = document.querySelector("#password");
userPassword.value = userLogged.password;

let button = document.querySelector("#button");
const form = document.querySelector(".form");
form.addEventListener("submit", (e) => {

    e.preventDefault();

    if (button.value == "Editar") {
        
        button.value = "Guardar";
        userName.disabled = false;
        userName.autofocus = true;
        userEmail.disabled = false;
        userPassword.disabled = false;
    
    } else {

        let users = JSON.parse(localStorage.getItem("users"));
        const index = users.findIndex((u) => u.email == userLogged.email);
        users[index].name = userName.value;
        users[index].email = userEmail.value;
        users[index].password = userPassword.value;
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("userLogged", JSON.stringify(users[index]));

        button.value = "Editar";
        userName.disabled = true;
        userEmail.disabled = true;
        userPassword.disabled = true;

    }

});