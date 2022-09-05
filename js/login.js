//error
function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
}
//login
function login() {
    let mail = document.getElementById("email").value;
    let contraseña = document.getElementById("password").value;
    if (mail != "" && contraseña.length != "") {
        localStorage.setItem("user",mail)
        location.href = "index.html";

    } else {
        showAlertError();
    }
}


function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}


//se añade la funcion cuando se hace click en el boton
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("regBtn").addEventListener("click", () => {
        login();
    })
})
