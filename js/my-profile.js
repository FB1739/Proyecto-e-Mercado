let user = localStorage.getItem("user")
function nombre() { return document.getElementById("nombre").value}
function apellido() {return document.getElementById("apellido").value}
function email() {return document.getElementById("email").value}
function nom2() {return document.getElementById("nombre2").value}
function ap2() {return document.getElementById("apellido2").value}
function tel() {return document.getElementById("telefono").value}
function imag() {return document.getElementById("img").value}

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
    console.log(nombre())
    console.log(apellido())
    console.log(email())
    if (nombre != "" && apellido != "" && email != "") {
        var perfil = new Cuenta(email(), nombre(), nom2(), apellido(), ap2(), tel(), imag())
        let usuarios = eval(localStorage.getItem("users"))
        console.log(perfil)
        console.log(usuarios)
        for (let i = 0; i < usuarios.length; i++) {
            if (usuarios[i].email == user) {
                usuarios[i] = perfil
                console.log("entro pa")
                console.log(usuarios)
                localStorage.setItem("users", JSON.stringify(usuarios))
                localStorage.setItem("user",email())
                window.location.href = "my-profile.html"
                alert("Cambios guardados con exito!")
                break
            }
        }
    }
    else {
        alert("Hubo un problema X.X")
        if (nombre == ""){
            document.getElementById("nombre").classList.remove("is-valid")
            document.getElementById("nombre").classList.add("is-invalid")
        }
        if (apellido == ""){
            document.getElementById("apellido").classList.remove("is-valid")
            document.getElementById("apellido").classList.add("is-invalid")
        }
        if (email == ""){
            document.getElementById("email").classList.remove("is-valid")
            document.getElementById("email").classList.add("is-invalid")
        }
        
        document.getElementById("nombre").addEventListener("keyup", function() {
            if (nombre == ""){
                document.getElementById("nombre").classList.remove("is-valid")
                document.getElementById("nombre").classList.add("is-invalid")
            }
            else {
                document.getElementById("nombre").classList.add("is-valid")
                document.getElementById("nombre").classList.remove("is-invalid")
            }
        })

        document.getElementById("apellido").addEventListener("keyup", function() {
            if (apellido == ""){
                document.getElementById("apellido").classList.remove("is-valid")
                document.getElementById("apellido").classList.add("is-invalid")
            }
            else {
                document.getElementById("apellido").classList.add("is-valid")
                document.getElementById("apellido").classList.remove("is-invalid")
            }
        })

        document.getElementById("email").addEventListener("keyup", function() {
            if (email == ""){
                document.getElementById("email").classList.remove("is-valid")
                document.getElementById("email").classList.add("is-invalid")
            }
            else {
                document.getElementById("email").classList.add("is-valid")
                document.getElementById("email").classList.remove("is-invalid")
            }
        })
        
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