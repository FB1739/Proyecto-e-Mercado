let compras = []
let entro_articulos = false
let userid = localStorage.getItem("user_id")
let dolar = 40

//funcion para comparar JSONs, no me sirve por la cant
var sonIgualesJson = (obj1,obj2)=>{
    keys1 = Object.keys(obj1);
    keys2 = Object.keys(obj2);
    //Object.keys(obj1).every(key => console.log(obj1[key]))
    return keys1.length === keys2.length && obj1["id"] == obj2["id"];
}


//me gusta que las imagenes redirigan a la pagina
function setProdID(id) {
    localStorage.setItem("ProdID", id);
    window.location = "product-info.html"
}

//remover producto
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
    var forma_pago = document.getElementById("seleccion")
    var credito = document.getElementById("credito")
    var deposito = document.getElementById("deposito")
    var nro_cuenta = document.getElementById("nro_cuenta")
    var nro_tarjeta = document.getElementById("nro_tarjeta")
    var codigo_seg = document.getElementById("codigo_seg")
    var vencimiento = document.getElementById("vencimiento")
    /*console.log(credito.checked)
    console.log(deposito.checked)
    console.log(nro_tarjeta.value)
    console.log(codigo_seg.value)
    console.log(vencimiento.value)*/
    let bandera = false;
    forma_pago.addEventListener("click", function(){
        
    })

    if (credito.checked) {
        if (vencimiento.value == "" | nro_tarjeta.value == "" | codigo_seg.value == "") {
            bandera = true
            //console.log("paso por if credito checked")
            forma_pago.classList.add("is-valid")
            
        }
        else {
        if (vencimiento.value == "") {
            vencimiento.addEventListener()
        }
    }

    }
    if (deposito.checked & nro_cuenta.value != "") {        
        bandera = true
        //console.log("paso por if deposito checked")
        forma_pago.classList.add("is-valid")
    }
    if (!bandera) {
        forma_pago.classList.add("is-invalid")
    }
    //console.log("bandera:")
    //console.log(bandera)
    return bandera
}



document.addEventListener("DOMContentLoaded", function(){
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
    document.getElementById("credito").addEventListener("click", function () {
        document.getElementById("nro_cuenta").disabled = true;
        document.getElementById("nro_cuenta").value = "";
        document.getElementById("nro_cuenta").required = false;

        document.getElementById("nro_tarjeta").disabled = false;
        document.getElementById("codigo_seg").disabled = false;
        document.getElementById("vencimiento").disabled = false;
        document.getElementById("nro_tarjeta").required = true;
        document.getElementById("codigo_seg").required = true;
        document.getElementById("vencimiento").required = true;
        document.getElementById("seleccion").innerHTML = "Tarjeta de crédito"
    });
    document.getElementById("deposito").addEventListener("click", function () {
        document.getElementById("nro_cuenta").disabled = false;
        document.getElementById("nro_cuenta").required = true;

        document.getElementById("nro_tarjeta").disabled = true;
        document.getElementById("codigo_seg").disabled = true;
        document.getElementById("vencimiento").disabled = true;
        document.getElementById("nro_tarjeta").value = "";
        document.getElementById("codigo_seg").value = "";
        document.getElementById("vencimiento").value = "";
        document.getElementById("nro_tarjeta").required = false;
        document.getElementById("codigo_seg").required = false;
        document.getElementById("vencimiento").required = false;
        document.getElementById("seleccion").innerHTML = "Transferencia bancaria"
    });



});




(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity() | !modal_valido()) {
            event.preventDefault();
            event.stopPropagation();
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()