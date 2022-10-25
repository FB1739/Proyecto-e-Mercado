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
            <td class="w-25"><input type="text" class="form-control w-25" id="cant_${compra.name}_${compra.unitCost}" value="${compra.count}" onKeyup="CantPorPrecio(this.value,'${compra.name}','${compra.currency}','${compra.unitCost}')" required></td>
            <td><b id="subtotal_${compra.name}">${compra.currency} ${compra.unitCost * compra.count}</b></td>
        </tr>
        `
    }
    document.getElementById("contenido tabla").innerHTML += tabtoappend;
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
        document.getElementById("nro_tarjeta").disabled = false;
        document.getElementById("codigo_seg").disabled = false;
        document.getElementById("vencimiento").disabled = false;
        document.getElementById("nro_cuenta").required = true;
        document.getElementById("nro_tarjeta").required = false;
        document.getElementById("codigo_seg").required = false;
        document.getElementById("vencimiento").required = false;
    });
    document.getElementById("deposito").addEventListener("click", function () {
        document.getElementById("nro_cuenta").disabled = false;
        document.getElementById("nro_tarjeta").disabled = true;
        document.getElementById("codigo_seg").disabled = true;
        document.getElementById("vencimiento").disabled = true;
        document.getElementById("nro_cuenta").required = false;
        document.getElementById("nro_tarjeta").required = true;
        document.getElementById("codigo_seg").required = true;
        document.getElementById("vencimiento").required = true;
    });
});

(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()