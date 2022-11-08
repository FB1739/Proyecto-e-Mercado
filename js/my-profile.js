let user = localStorage.getItem("user")
let nombre = document.getElementById("nombre")
let apellido = document.getElementById("apellido")
let email = document.getElementById("email")
let nom2 = document.getElementById("segundo_nombre")
let ap2 = document.getElementById("segundo_apellido")
let tel = document.getElementById("telefono")
let imag = document.getElementById("img")

function obtenerDatos(user) {
    let usuarios = eval(localStorage.getItem("users"))
    for (let i = 0; i < usuarios.length; i++) {
        if(usuarios[i].email == user.email){
            return usuarios[i]
        }
    }
    return undefined
}


function guardarCambios() {

}

document.addEventListener("DOMContentLoaded", function(){

})