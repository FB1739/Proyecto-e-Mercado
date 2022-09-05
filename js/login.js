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

function onSignIn(googleUser) {
    // Useful data for your client-side scripts:
    var profile = googleUser.getBasicProfile();
    if (profile) {
        ("ID: " + profile.getId()); // Don't send this directly to your server!
        ('Full Name: ' + profile.getName());
        ('Given Name: ' + profile.getGivenName());
        ('Family Name: ' + profile.getFamilyName());
        ("Image URL: " + profile.getImageUrl());
        ("Email: " + profile.getEmail());
        const usuario = { nombre: profile.getName(), estado: 'conectado', imageUrl: profile.getImageUrl(), getEmail: profile.getEmail(), };


        localStorage.setItem('usuario', JSON.stringify(usuario));
        sessionStorage.setItem('usuario', JSON.stringify(usuario));
        location.href = "/index.html";
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
