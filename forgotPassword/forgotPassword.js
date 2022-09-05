const form = document.querySelector(".form");

form.addEventListener("submit", (e) => {

    e.preventDefault();

    const serviceID = 'default_service';
    const templateID = 'template_wnrbz6l';

    emailjs.sendForm(serviceID, templateID, form)
        .then(() => {
            location.replace("../emailSent.html");
        }, (err) => {
            alert(`Ha ocurrido un error: ${err}`);
        });

});