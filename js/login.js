function pag() {
    if (!localStorage.getItem("pag")){
        return  "index.html"
    }
    else {
        return localStorage.getItem("pag")
    }
}

if (!localStorage.getItem("users")) {
    localStorage.setItem("users", "[]")
}

function crearUsuario(email) {
    let usuario = {}
    usuario.email = email
    return usuario;
}
  
  


//ingresar usuario a la db
function ingresar(usuario){
    let users = eval(localStorage.getItem('users'));
    let bandera = false
    for (let i = 0; i < users.length; i++) {
        if (usuario.email == users[i].email) {
            bandera = true
            break
        }
    }
    if (!bandera){
        users.push(usuario)
        localStorage.setItem("users", JSON.stringify(users))
    }
}





//decodificar el token
function decodeJwtResponse(token) {
    let base64Url = token.split('.')[1]
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload)
}
//google para ver el payload
let responsePayload;
function handleCredentialResponse(response) {
    // decodeJwtResponse() is a custom function defined by you
    // to decode the credential response.
    responsePayload = decodeJwtResponse(response.credential);

    /*console.log("ID: " + responsePayload.sub);
    console.log('Full Name: ' + responsePayload.name);
    console.log('Given Name: ' + responsePayload.given_name);
    console.log('Family Name: ' + responsePayload.family_name);
    console.log("Image URL: " + responsePayload.picture);
    console.log("Email: " + responsePayload.email);*/
    localStorage.setItem("user", responsePayload.email)
    localStorage.setItem("user_id", "25801")
    ingresar(crearUsuario(responsePayload.email))
    location.href = pag();



}
//login
function login() {
    let mail = document.getElementById("email");
    let contraseña = document.getElementById("password");
    if (!ValidarMail(mail)) {
        mail.addEventListener("keyup", () => { ValidarMail(mail) })
    }
    if (!validarPassword(contraseña)) {
        password.addEventListener("keyup", ()=>{validarPassword(contraseña)})
    }
    if ((ValidarMail(mail)) && validarPassword(contraseña)) {
        localStorage.setItem("user", mail.value)
        ingresar(crearUsuario(mail.value))
        location.href = pag()
        //location.href = "index.html";

    }
}

//validar mail
function ValidarMail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail.value)) {
        mail.classList.add("is-valid")
        mail.classList.remove("is-invalid")
        return (true)
    }
    else {
        mail.classList.remove("is-valid")
        mail.classList.add("is-invalid")
        return (false)
    }

    
}
//validar password
function validarPassword(password){
    if (password.value.length > 0) {
        password.classList.add("is-valid")
        password.classList.remove("is-invalid")
        return (true)
    }
    else {
        password.classList.remove("is-valid")
        password.classList.add("is-invalid")
        return (false)
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
        localStorage.setItem("user_id", "25801")//aca se cambia con el id que trae de la base de datos cuando esta este creada
    })
})
