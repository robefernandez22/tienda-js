const form = document.querySelector(".form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

form.addEventListener("submit", (e) => {

    e.preventDefault();

    const users = localStorage.getItem("users");

    if (users == null || JSON.parse(users).length == 0) {
        alert("Su usuario no está registrado");
        return;
    }

    const findUser = JSON.parse(users).find((u) => u.email == email.value && u.password == password.value);

    if (findUser) {
        location.replace("./main.html");
        localStorage.setItem("userEmail", email.value);
    } else {
        alert("Credenciales incorrectas");
    }

});