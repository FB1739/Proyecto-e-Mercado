let user = localStorage.getItem("user")
let nombre = document.getElementById("nombre").value
let apellido = document.getElementById("apellido").value
let email = document.getElementById("email").value
let nom2 = document.getElementById("nombre2").value
let ap2 = document.getElementById("apellido2").value
let tel = document.getElementById("telefono").value
let imag = document.getElementById("img").value

//vamos a probar las clases en js
class Cuenta {
    constructor(email, nombre, nombre2, apellido, apellido2, tel, img) {
        this.nombre = nombre
        this.nombre2 = nombre2
        this.apellido = apellido
        this.apellido2 = apellido2
        this.email = email
        this.telefono = tel
        this.img = img
    }
}



//obtener el usuario si existe
function obtenerDatos(user) {
    let usuarios = eval(localStorage.getItem("users"))
    //console.log(usuarios)
    for (let i = 0; i < usuarios.length; i++) {
        //console.log(usuarios[i])
        if (usuarios[i].email == user) {
            //console.log("encontre papa")
            return usuarios[i]
        }
    }
    //console.log("no encontre papa")
    return undefined
}

//guardar datos
function guardarCambios() {
    if (nombre != "" && apellido != "" && email != "") {
        var perfil = new Cuenta(email, nombre, nom2, apellido, ap2, tel, imag)
        let usuarios = eval(localStorage.getItem("users"))
        for (let i = 0; i < usuarios.length; i++) {
            if (usuarios[i].email == email) {
                usuarios[i] = perfil
                localStorage.setItem("users", JSON.stringify(usuarios))
                break
            }
        }
    }
    else {
        if (nombre == "") {
            document.getElementById("nombre").addEventListener("keyup", function() {
                
            })
        }
    }


}

document.addEventListener("DOMContentLoaded", function () {

    let usuario = obtenerDatos(user)
    //console.log(usuario)

    if (usuario != undefined) {
        for (let keys in usuario) {
            console.log(usuario[keys])
            console.log(keys)
            document.getElementById(keys).value = usuario[keys]
        }
    }
})