const form = document.querySelector(".form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

const valores = window.location.search;
const urlParams = new URLSearchParams(valores);

let passwordChanged = urlParams.get("passwordChanged");
if (passwordChanged != null) {
    alert("Contraseña cambiada correctamente. Inicie sesión.");
}

let userCreated = urlParams.get("userCreated");
if (userCreated != null) {
    alert("Usuario creado correctamente. Inicie sesión.")
}

form.addEventListener("submit", (e) => {

    e.preventDefault();

    const users = localStorage.getItem("users");

    if (users == null || JSON.parse(users).length == 0) {
        alert("Su usuario no está registrado");
        return;
    }

    const index = JSON.parse(users).findIndex(
        (u) => u.email == email.value && u.password == password.value
    );

    console.log(index);

    if (index == 0) {
        const userLoged = JSON.parse(users)[index];
        localStorage.setItem("userLogged", JSON.stringify(userLoged));
        location.replace("./main.html");
    } else {
        alert("Credenciales incorrectas.");
    }

});