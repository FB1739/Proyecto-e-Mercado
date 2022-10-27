let compras = []
let entro_articulos = false
let userid = localStorage.getItem("user_id")
let dolar = 40

var forma_pago = document.getElementById("seleccion")
var credito = document.getElementById("credito")
var deposito = document.getElementById("deposito")
var nro_cuenta = document.getElementById("nro_cuenta")
var nro_tarjeta = document.getElementById("nro_tarjeta")
var codigo_seg = document.getElementById("codigo_seg")
var vencimiento = document.getElementById("vencimiento")
var boton_fp = document.getElementById("botonTerminos")
var alerta_sms = document.getElementById("alert-success")
var alerta = localStorage.getItem("alerta")




//funcion para comparar JSONs
var sonIgualesJson = (obj1,obj2)=>{
    keys1 = Object.keys(obj1);
    keys2 = Object.keys(obj2);
    //Object.keys(obj1).every(key => console.log(obj1[key]))
    return keys1.length === keys2.length && obj1["id"] == obj2["id"];
}

//probando cosas con async y await pero no llegue a lo que queria
const sleep = async (milliseconds) => {
    await new Promise(resolve => {
        return setTimeout(resolve, milliseconds)
    });
};

const testSleep = async () => {
    alerta.classList.add("show")
    await sleep(1000);
    alerta.classList.remove("show")
}


//me gusta que las imagenes redirigan a la pagina
function setProdID(id) {
    localStorage.setItem("ProdID", id);
    window.location = "product-info.html"
}

//remover producto
//no mucho misterio, recorrer el array con antes haber creado una variable auxiliar y que cuando sean iguales los id lo remuevan
//de la lista de productos y actualice la tabla en pantalla
function removerProd(id) {
    //let listaCompras = eval(localStorage.getItem("cart_"+userid))
    let j = 0;
    for (let i = 0; i < compras.length; i++){
        if (compras[i].id == id){
            j = i
            break
        }
    }
    compras.splice(j,1)
    localStorage.setItem("cart_"+userid,JSON.stringify(compras))
    showTable()

}

//showCategoriesList() pero para tablas
function showTable(){
    let tabtoappend = ""
    for (let i = 0 ; i < compras.length; i++){
        let compra = compras[i]
        
        tabtoappend += `
        <tr>
            <th scope="row">
                <img src=${compra.image} class="img-fluid img-thumbnail iamg cursor-active" alt="La imagen, pero no se mostró" onClick="setProdID(${compra.id})">
            </th>
            <td>${compra.name}</td>
            <td>${compra.currency} ${compra.unitCost}</td>
            <td class="w-25"><input type="number" class="form-control w-50" id="cant_${compra.name}_${compra.unitCost}" value="${compra.count}" min=1 onChange="CantPorPrecio(this.value,'${compra.name}','${compra.currency}','${compra.unitCost}')" required></td>
            <td><b id="subtotal_${compra.name}">${compra.currency} ${compra.unitCost * compra.count}</b></td>
            <td><button type="button" class="btn btn-primary" onClick="removerProd(${compra.id})">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
            </svg>
            </button></td>
        </tr>
        `
    }
    document.getElementById("contenido tabla").innerHTML = tabtoappend;
}

//funcion para que me multiplique la cantidad de articulos por el precio
function CantPorPrecio(cantidad,nombre,currency,costo){
    let can = parseInt(costo)*parseInt(cantidad)
    //console.log()
    if (isNaN(can))
        document.getElementById("subtotal_"+nombre).innerText = "Seleccione una cantidad"
    else{
        document.getElementById("subtotal_"+nombre).innerText = currency+" "+can
        //modifico en el array
        let listaCompras = eval(localStorage.getItem("cart_"+userid))
        for (let i = 0; i < listaCompras.length; i++){
            if(listaCompras[i].name == nombre){
                listaCompras[i].count = parseInt(cantidad)
                //console.log(nombre)
                //console.log(listaCompras)
                break
            }
        }
        localStorage.setItem("cart_"+userid,JSON.stringify(listaCompras))
    }
    calcular_totales() 
}

//calcula el subtotal, costo de envio y total de la lista, podria haber usardo compras tambien para hacer lo mismo
function calcular_totales() {
    var subtotal = 0
    var costo_envio = 0
    var total = 0
    var listaCompras = eval(localStorage.getItem("cart_"+userid))
    var envio = document.querySelector('input[name="tipoEnvio"]:checked').value

    for (let i =0; i < listaCompras.length; i++){
        if (listaCompras[i].currency == "USD")
            subtotal += parseInt(listaCompras[i].count)*parseInt(listaCompras[i].unitCost)
        else {
            //pongo el dolar a 40, para que no se vea tan mal la econimía
            subtotal += Math.round(parseInt(listaCompras[i].count)*parseInt(listaCompras[i].unitCost)/dolar)
        }
    }
    costo_envio = Math.round(subtotal*parseInt(envio)/100)
    total = subtotal + costo_envio

    document.getElementById("Subtotal").innerText = "USD "+subtotal
    document.getElementById("Costo").innerText = "USD "+costo_envio
    document.getElementById("Total").innerText = "USD "+total
}

function modal_valido() {
    
    //bandera booleana
    let bandera = false;
    //entrada de escucha de eventos para cada campo del modal
    //la idea es que los campos dependiente de cada checkbox modifiquen al padre
    //siendo asi, con el criterio este, credito tiene que tener los 3 campos llenos para que quede valido
    //Para Numero de tarjeta    
    nro_tarjeta.addEventListener("keyup", function() {
        if (credito.checked && nro_tarjeta.value == "") {
            nro_tarjeta.classList.remove("is-valid")
            nro_tarjeta.classList.add("is-invalid")
        }
        else {
            nro_tarjeta.classList.remove("is-invalid")
            nro_tarjeta.classList.add("is-valid")
        }
        if (credito.checked && (vencimiento.value == "" | nro_tarjeta.value == "" | codigo_seg.value == "")){
            credito.classList.add("is-invalid")
            credito.classList.remove("is-valid")
        }
        if (credito.checked && !(vencimiento.value == "" | nro_tarjeta.value == "" | codigo_seg.value == "")){
            credito.classList.add("is-valid")
            credito.classList.remove("is-invalid")
        }
    })
    //Codigo de seguridad
    codigo_seg.addEventListener("keyup", function() {
        if (credito.checked && codigo_seg.value == "") {
            codigo_seg.classList.remove("is-valid")
            codigo_seg.classList.add("is-invalid")
        }
        else {
            codigo_seg.classList.remove("is-invalid")
            codigo_seg.classList.add("is-valid")
        }
        if (credito.checked && (vencimiento.value == "" | nro_tarjeta.value == "" | codigo_seg.value == "")){
            credito.classList.add("is-invalid")
            credito.classList.remove("is-valid")
        }
        if (credito.checked && !(vencimiento.value == "" | nro_tarjeta.value == "" | codigo_seg.value == "")){
            credito.classList.add("is-valid")
            credito.classList.remove("is-invalid")
        }
    })
    //Vencimiento
    vencimiento.addEventListener("keyup", function() {
        if (credito.checked && vencimiento.value == "") {
            vencimiento.classList.remove("is-valid")
            vencimiento.classList.add("is-invalid")
        }
        else {
            vencimiento.classList.remove("is-invalid")
            vencimiento.classList.add("is-valid")
        }
        if (credito.checked && (vencimiento.value == "" | nro_tarjeta.value == "" | codigo_seg.value == "")){
            credito.classList.add("is-invalid")
            credito.classList.remove("is-valid")
        }
        if (credito.checked && !(vencimiento.value == "" | nro_tarjeta.value == "" | codigo_seg.value == "")){
            credito.classList.add("is-valid")
            credito.classList.remove("is-invalid")
            forma_pago.classList.add("is-valid")
            forma_pago.classList.remove("is-invalid")
        }
    })
    //Numero de cuenta
    nro_cuenta.addEventListener("keyup", function() {
        if (deposito.checked && nro_cuenta.value == "") {
            nro_cuenta.classList.remove("is-valid")
            nro_cuenta.classList.add("is-invalid")
            deposito.classList.add("is-invalid")
            deposito.classList.remove("is-valid")
        }
        else {
            nro_cuenta.classList.remove("is-invalid")
            nro_cuenta.classList.add("is-valid")
            deposito.classList.remove("is-invalid")
            deposito.classList.add("is-valid")
            forma_pago.classList.add("is-valid")
            forma_pago.classList.remove("is-invalid")
        }
    })
    //Parte para los checkboxes
    //Deposito
    /*
    deposito.addEventListener("click", function() {
        if (deposito.checked && (nro_cuenta.value == "")){
            deposito.classList.add("is-invalid")
            deposito.classList.remove("is-valid")
            credito.classList.remove("is-valid")
            credito.classList.remove("is-invalid")
        }
        else {
            deposito.classList.remove("is-invalid")
            deposito.classList.add("is-valid")
            credito.classList.remove("is-valid")
            credito.classList.remove("is-invalid")
        }
    })
    //Credito
    credito.addEventListener("click",function(){
        if(credito.checked && (vencimiento.value == "" | nro_tarjeta.value == "" | codigo_seg.value == "")){
            credito.classList.add("is-invalid")
            credito.classList.remove("is-valid")
            deposito.classList.remove("is-valid")
            deposito.classList.remove("is-invalid")
        }
        if(credito.checked && !(vencimiento.value == "" | nro_tarjeta.value == "" | codigo_seg.value == "")) {
            credito.classList.add("is-valid")
            credito.classList.remove("is-invalid")
            deposito.classList.remove("is-valid")
            deposito.classList.remove("is-invalid")
        }
    })*/

    boton_fp.addEventListener("click", function(){
        //Si credito esta checkeado y alguno de los campos esta vacios O si deposito esta checkeado y el nro de cuenta esta vacio
        if ((credito.checked && !(vencimiento.value == "" | nro_tarjeta.value == "" | codigo_seg.value == "")) || (deposito.checked & nro_cuenta.value != "")){
            forma_pago.classList.add("is-valid")
            forma_pago.classList.remove("is-invalid")
            bandera = true
        }
        else {
            forma_pago.classList.add("is-invalid")
            forma_pago.classList.remove("is-valid")
            bandera = false
        }

    })
    
    
    if (credito.checked) {
        if (!(vencimiento.value == "" | nro_tarjeta.value == "" | codigo_seg.value == "")) {
            bandera = true
            //console.log("paso por if credito checked")
            forma_pago.classList.add("is-valid")
            forma_pago.classList.remove("is-invalid")
            credito.classList.add("is-valid")
            credito.classList.remove("is-invalid")
            
        }
    }


    if (deposito.checked & nro_cuenta.value != "") {        
        bandera = true
        //console.log("paso por if deposito checked")
        forma_pago.classList.add("is-valid")
        forma_pago.classList.remove("is-invalid")
        deposito.classList.add("is-valid")
        deposito.classList.remove("is-invalid")
        
    }
    if (!bandera) {
        forma_pago.classList.add("is-invalid")
        forma_pago.classList.remove("is-valid")
    }
    //console.log("bandera:")
    //console.log(bandera)*/
    return bandera
}



document.addEventListener("DOMContentLoaded", function(){
    var forma_pago = document.getElementById("seleccion")
    var credito = document.getElementById("credito")
    var deposito = document.getElementById("deposito")
    var nro_cuenta = document.getElementById("nro_cuenta")
    var nro_tarjeta = document.getElementById("nro_tarjeta")
    var codigo_seg = document.getElementById("codigo_seg")
    var vencimiento = document.getElementById("vencimiento")
    var boton_fp = document.getElementById("botonTerminos")
    //no mucho misterio aca, repetimos los que hicimos anteriormente en las otras entregas
    getJSONData(CART_INFO_URL + localStorage.getItem("user_id") + ".json").then(function (resultObj) {//CART_INFO_URL en init.js
        if (resultObj.status === "ok") {
            let array_en_string = resultObj.data.articles
            //localStorage.setItem("items_de_"+localStorage.getItem("user_id"),array_en_string)
            compras = resultObj.data.articles
            if (!localStorage.getItem("cart_"+userid)){
                //si no existe en la memoria una lista con los articulos de compra
                //entonces creo esa lista y le meto el peugot
                //y lo guardo en el localStorage con el cart_userid con stringify
                //let listaCompras = []
                //listaCompras.concat(compras)
                localStorage.setItem("cart_"+userid,JSON.stringify(compras))
                entro_articulos = true
                
            }
            else {
                //esta asquerosidad queda O(n*m) pero es la unica manera de chequear que no queden cosas repetidas (WIP)
                //esto sobre escribe lo que hay en el localStorage por lo que viene del server.
                let listaCompras = eval(localStorage.getItem("cart_"+userid))
                for (let i = 0; i < listaCompras.length; i++ ){
                    var iguales = false
                    for (let j = 0; i < compras.length; j++){
                        iguales = sonIgualesJson(compras[j],listaCompras[i])
                        if(iguales){
                            
                            break;
                        }
                    }
                    if(!iguales){
                        compras.push(listaCompras[i])
                    }
                }

                localStorage.setItem("cart_"+userid, JSON.stringify(compras))
            }
            
            //console.log(compras)
            showTable()
            calcular_totales()
        }
    });
    //si se checkea uno se borra lo del otro y sus campos hijas
    //capaz hay una mejor forma de hacerlo en vez de esta chanchada pero bue
    document.getElementById("credito").addEventListener("click", function () {
        
        nro_cuenta.disabled = true;
        nro_cuenta.value = "";
        nro_cuenta.required = false;
        deposito.classList.remove("is-valid")
        deposito.classList.remove("is-invalid")
        nro_cuenta.classList.remove("is-valid")
        nro_cuenta.classList.remove("is-invalid")

        nro_tarjeta.disabled = false;
        codigo_seg.disabled = false;
        vencimiento.disabled = false;
        nro_tarjeta.required = true;
        codigo_seg.required = true;
        vencimiento.required = true;
        forma_pago.innerHTML = "Tarjeta de crédito"
    });
    document.getElementById("deposito").addEventListener("click", function () {
        nro_cuenta.disabled = false;
        nro_cuenta.required = true;
        
        
        credito.classList.remove("is-valid")
        credito.classList.remove("is-invalid")
        nro_tarjeta.classList.remove("is-valid")
        nro_tarjeta.classList.remove("is-invalid")
        codigo_seg.classList.remove("is-valid")
        codigo_seg.classList.remove("is-invalid")
        vencimiento.classList.remove("is-valid")
        vencimiento.classList.remove("is-invalid")
        nro_tarjeta.disabled = true;
        codigo_seg.disabled = true;
        vencimiento.disabled = true;
        nro_tarjeta.value = "";
        codigo_seg.value = "";
        vencimiento.value = "";
        nro_tarjeta.required = false;
        codigo_seg.required = false;
        vencimiento.required = false;
        forma_pago.innerHTML = "Transferencia bancaria"
    });



});


//mostrar alerta e inicializar la nueva alerta del carrito 
if(alerta == "true"){
    alerta_sms.classList.add("show")
    localStorage.setItem("alerta","false")
}
localStorage.setItem("alerta","false");

//cosa de bootstrap
(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        modal_valido()
        if (!form.checkValidity() | !modal_valido()) {
            event.preventDefault();
            event.stopPropagation();
        }
        else{
            localStorage.setItem("alerta","true")
            //console.log("paso por aca")
        }
        //alerta.classList.remove("show")
        form.classList.add('was-validated')
      }, false)
    })
  })()