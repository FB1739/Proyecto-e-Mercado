var prodDict = {}
var commArr = []

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

function showCategoriesList() {
    let htmlContentToAppend = "";
    let imgContentToAppend = "";
    let comContentToAppend = "";
    let imagenes = prodDict.images
    //aca se genera todo lo relacionado con el producto
    //tremendamente agarrado con alambres, seria ideal hacer otro contenedor para los comentarios pero bueno
    htmlContentToAppend += `
                    <br>
                    <h1>${prodDict.name}</h1><br>
                    <hr>
                    <h8><strong>Precio</strong></h8>
                    <p>${prodDict.currency} ${prodDict.cost}</p><br>
                    <h8><strong>Descripción</strong></h5>
                    <p>${prodDict.description}</p><br>
                    <h8><strong>Categoría</strong></h8>
                    <p>${prodDict.category}</p><br>
                    <h8><strong>Cantidad de vendidos</strong></h8>
                    <p>${prodDict.soldCount}</p><br>
                    <h8><strong>Imágenes ilustrativas</strong></h8><br>
                    <div class="container">
                        <div class="row row-cols-1 row-cols-md-4 g-4" id="contenedor-imagenes"></div>
                    </div><br>
                    <h4>Comentarios</h4>
                    <div class="list-group" id="cat-list-container"></div><br>
                    <h4>Comentar</h4>
                    <h6>Tu opinion</h6>
                    <div class="row">
                        <div class="col-md-12 mb-3">
                            <label for="Description">Descripción</label>
                            <textarea name="Description" class="form-control" id="Description"></textarea>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4 mb-3">
                            <label for="puntuacion">Tu puntuación</label>
                            <select name="puntuacion" class="form-select custom-select d-block w-100" id="puntuacion" required>
                                <option value="" hidden selected>Seleccionar puntuación</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </select>
                            <div class="invalid-feedback">
                                Ingresa una categoría válida.
                            </div>
                        </div>
                    </div>
                    
                `
    document.getElementById("contenedor").innerHTML += htmlContentToAppend;
    
    //se hace un for para integrar las imagenes y con el inner se pone en el lugar correspondiente
    for (let i = 0; i < imagenes.length; i++) {
        imagen = imagenes[i]
        imgContentToAppend += `
                        <div class="card me-md-4" style="width: 18rem;">
                            <img class="card-img-top" src="${imagen}" alt="Card image cap">
                        </div>
        `
    }

    document.getElementById("contenedor-imagenes").innerHTML += imgContentToAppend;

    //console.log(commArr)
    //misma idea que con las imagenes
    for (let i = 0; i < commArr.length; i++){
        let comentario = commArr[i]
        let estrellas = "";

        for (let i = 0; i < 5; i++){
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
                    showCategoriesList();
                }
            })
        }
    });
    document.getElementById("envio").addEventListener("click", function () {
        comentario = document.getElementById("Description").value;
        puntuacion = document.getElementById("puntuacion").value;
        if (comentario != "" && (puntuacion != "" || puntiacion != "Seleccionar puntuación")){
            agregar_comentario(comentario, puntuacion);
            document.getElementById("Description").value = "";
            document.getElementById("puntuacion").value = "Seleccionar puntuación";
        }
    });
});