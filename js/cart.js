let compras = []

function showTable(){
    let tabtoappend = ""
    for (let i = 0 ; i < compras.length; i++){
        let compra = compras[i]
        
        tabtoappend += `
        <tr>
            <th scope="row">
                <img src=${compra.image} class="img-fluid img-thumbnail iamg" alt="La imagen, pero no se mostró">
            </th>
            <td>${compra.name}</td>
            <td>${compra.currency} ${compra.unitCost}</td>
            <td class="w-25"><input type="text" class="form-control w-25" id="cant_${compra.name}_${compra.unitCost}" value="${compra.count}" onChange="CantPorPrecio(this.value,'${compra.name}','${compra.currency}','${compra.unitCost}')"></td>
            <td><b id="subtotal_${compra.name}">${compra.currency} ${compra.unitCost * compra.count}</b></td>
        </tr>
        `
    }
    document.getElementById("contenido tabla").innerHTML += tabtoappend;
}

function CantPorPrecio(cantidad,nombre,currency,costo){
    let can = parseInt(costo)*parseInt(cantidad)
    document.getElementById("subtotal_"+nombre).innerText = currency+" "+can
    console.log("subtotal_"+nombre)
}

document.addEventListener("DOMContentLoaded", function(){
    //no mucho misterio aca, repetimos los que hicimos anteriormente en las otras entregas
    getJSONData(CART_INFO_URL + localStorage.getItem("user_id") + ".json").then(function (resultObj) {//CART_INFO_URL en init.js
        if (resultObj.status === "ok") {
            compras = resultObj.data.articles;
            console.log(compras)
            showTable()
        }
    });
});