var prodDict = {}
var commArr = []

function setProdID(id) {
    localStorage.setItem("ProdID", id);
    window.location = "product-info.html"
}

var sonIgualesJson = (obj1, obj2) => {
    keys1 = Object.keys(obj1);
    keys2 = Object.keys(obj2);

    return keys1.length === keys2.length && obj1["id"] == obj2["id"];
}

function comprarProducto() {
    let userid = localStorage.getItem("user_id")
    let resumido = {}
    resumido.id = prodDict.id;
    resumido.name = prodDict.name
    resumido.count = 1
    resumido.unitCost = prodDict.cost
    resumido.currency = prodDict.currency
    resumido.image = prodDict.images[0]
    //console.log(resumido)
    if ((!localStorage.getItem("cart_" + userid))) {
        let strProducto = []
        strProducto.push(resumido)
        strProducto = JSON.stringify(strProducto)
        localStorage.setItem("cart_" + userid, strProducto)
    }
    else {
        let listaCompras = eval(localStorage.getItem("cart_" + userid))
        var iguales = false
        for (let i = 0; i < listaCompras.length; i++) {
            iguales = sonIgualesJson(resumido, listaCompras[i])
            if (iguales) {
                listaCompras[i].count += 1
                break;
            }
        }
        if (!iguales) {
            listaCompras.push(resumido)
        }

        //console.log(cartProd)
        localStorage.setItem("cart_" + userid, JSON.stringify(listaCompras))
    }
    window.location = "cart.html"
}

function agregar_comentario(comentario, puntuacion) {
    let comToAppend = "";
    let estrellas = "";
    let fecha = new Date().toLocaleString('es-UY')/*, {
                                                    hour12: false,
                                                    day: "numeric",

                                                    hour: "numeric",
                                                    minute: "numeric",
                                                    second: "numeric"
                                                    });*/

    for (let i = 0; i < 5; i++) {
        let nro_estrellas = puntuacion - 1;
        if (i <= nro_estrellas) {
            estrellas += `
                        <span class="fa fa-star checked"></span>
                `
        }
        else {
            estrellas += `
                        <span class="fa fa-star"></span>
                `
        }
    }
    comToAppend += `
                <div class="list-group-item ">
                    <div class="row">
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <h8 class="mb-1"><strong>${localStorage.getItem("user")}</strong> - ${fecha} - ${estrellas}</h8>
                            </div>
                            
                            <p>${comentario}</p>
                        </div>
                    </div>
                </div>
        `

    document.getElementById("cat-list-container").innerHTML += comToAppend;

}

function showProductInfo() {
    let htmlContentToAppend = "";
    let comContentToAppend = "";
    let relContentToAppend = "";
    let imagenes = prodDict.images
    let relArr = prodDict.relatedProducts
    //aca se genera todo lo relacionado con el producto
    //tremendamente agarrado con alambres, seria ideal hacer otro contenedor para los comentarios pero bueno
    htmlContentToAppend += `
                    <br>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <h1>${prodDict.name}</h1>
                        </div>
                        <div class="col-md-6 mb-3 position-relative">
                            <button class="btn btn-success position-absolute top-0 end-0" type="button" id="boton de compra" onClick="comprarProducto()">Comprar</button>
                        </div>
                    </div>
                    <br>
                    <hr>
                    <h8><strong>Precio</strong></h8>
                    <p>${prodDict.currency} ${prodDict.cost}</p><br>
                    <h8><strong>Descripción</strong></h5>
                    <p>${prodDict.description}</p><br>
                    <h8><strong>Categoría</strong></h8>
                    <p>${prodDict.category}</p><br>
                    <h8><strong>Cantidad de vendidos</strong></h8>
                    <p>${prodDict.soldCount}</p><br>
                    
                `
    document.getElementById("contenedor-ppal").innerHTML += htmlContentToAppend;

    //se hace un for para integrar las imagenes y con el inner se pone en el lugar correspondiente
    for (let i = 0; i < imagenes.length; i++) {
        imagen = imagenes[i]

        if (i == 0) {
            document.getElementById("carrusel-indicadores").innerHTML += `
        <button type="button" data-bs-target="#contenedor-imagenes" data-bs-slide-to="${i}" class="active" aria-current="true" aria-label="Slide ${i + 1}"></button>
        `
            document.getElementById("carrusel-inner").innerHTML += `
        <div class="carousel-item active">
            <img src=${imagen} class="d-block w-100" alt=${prodDict.name}>
            <div class="carousel-caption d-none d-md-block">
                <h5>${prodDict.name}</h5>
            </div>
        </div>
        `



        }
        else {
            document.getElementById("carrusel-indicadores").innerHTML += `<button type="button" data-bs-target="#contenedor-imagenes" data-bs-slide-to="${i}" aria-label="Slide ${i + 1}"></button>`


            document.getElementById("carrusel-inner").innerHTML += `
            <div class="carousel-item">
            <img src=${imagen} class="d-block w-100" alt=${prodDict.name}>
                <div class="carousel-caption d-none d-md-block">
                    <h5>${prodDict.name}</h5>
                </div>
            </div>`
        }

    }



    //console.log(commArr)
    //misma idea que con las imagenes
    for (let i = 0; i < commArr.length; i++) {
        let comentario = commArr[i]
        let estrellas = "";

        for (let i = 0; i < 5; i++) {
            let nro_estrellas = comentario.score - 1;
            if (i <= nro_estrellas) {
                estrellas += `
                        <span class="fa fa-star checked"></span>
                `
            }
            else {
                estrellas += `
                        <span class="fa fa-star"></span>
                `
            }
        }

        comContentToAppend += `
                <div class="list-group-item ">
                    <div class="row">
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <h8 class="mb-1"><strong>${comentario.user}</strong> - ${comentario.dateTime} - ${estrellas}</h8>
                            </div>
                            
                            <p>${comentario.description}</p>
                        </div>
                    </div>
                </div>
        `

    }

    document.getElementById("cat-list-container").innerHTML += comContentToAppend;


    for (let i = 0; i < relArr.length; i++) {
        let relaciones = relArr[i];

        relContentToAppend += `
            <div OnClick="setProdID(${relaciones.id})" class="card me-md-5 cursor-active" style="width: 18rem;">
                <img class="card-img-top" src="${relaciones.image}" alt="Card image cap">
                    <div class="card-body overflow-auto" style="max-height: 150px;">
                        <h5 class="card-title">${relaciones.name}</h5>
                    </div>
            </div>`

    }

    document.getElementById("contenedor-relaciones").innerHTML += relContentToAppend;


}



document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL + localStorage.getItem("ProdID") + ".json").then(function (resultObj) {//PRODUCTS_INFO_URL en init.js
        if (resultObj.status === "ok") {
            getJSONData(PRODUCT_INFO_COMMENTS_URL + localStorage.getItem("ProdID") + ".json").then(function (result) {
                if (result.status === "ok") {
                    prodDict = resultObj.data;
                    commArr = result.data;
                    //console.log(prodDict)
                    //console.log(commArr)
                    showProductInfo();
                }
            })
        }
    });
    document.getElementById("envio").addEventListener("click", function () {
        comentario = document.getElementById("Description").value;
        puntuacion = document.getElementById("puntuacion").value;
        if (comentario != "" && (puntuacion != "" || puntiacion != "Seleccionar puntuación")) {
            agregar_comentario(comentario, puntuacion);
            document.getElementById("Description").value = "";
            document.getElementById("puntuacion").value = "Seleccionar puntuación";
        }
    });
});