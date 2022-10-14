let compras = []

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
            <td class="w-25"><input type="text" class="form-control w-25" id="cant_${compra.name}_${compra.unitCost}" value="${compra.count}" onKeyup="CantPorPrecio(this.value,'${compra.name}','${compra.currency}','${compra.unitCost}')"></td>
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
    else
        document.getElementById("subtotal_"+nombre).innerText = currency+" "+can
}

document.addEventListener("DOMContentLoaded", function(){
    //no mucho misterio aca, repetimos los que hicimos anteriormente en las otras entregas
    getJSONData(CART_INFO_URL + localStorage.getItem("user_id") + ".json").then(function (resultObj) {//CART_INFO_URL en init.js
        if (resultObj.status === "ok") {
            let array_en_string = resultObj.data.articles
            //localStorage.setItem("items_de_"+localStorage.getItem("user_id"),array_en_string)
            compras = resultObj.data.articles
            let userid = localStorage.getItem("user_id")
            if (localStorage.getItem("cart_"+userid)){
                compras = compras.concat(eval(localStorage.getItem("cart_"+userid)))
            }
            
            //console.log(compras)
            showTable()
        }
    });
});