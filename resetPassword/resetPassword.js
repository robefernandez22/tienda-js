const form = document.querySelector(".form");
const newPassword = document.querySelector("#password");

form.addEventListener("submit", (e) => {

    e.preventDefault();

    const valores = window.location.search;
    const urlParams = new URLSearchParams(valores);
    let email = urlParams.get('email');

    let users = JSON.parse(localStorage.getItem("users"));
    const index = users.findIndex((u) => u.email == email);
    users[index].password = newPassword.value;
    localStorage.setItem("users", JSON.stringify(users));

    location.replace("../index.html?passwordChanged");

});
