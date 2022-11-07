var productsArray = [];
const ORDER_ASC_BY_PRICE = "Asc.";
const ORDER_DESC_BY_PRICE = "Desc.";
const ORDER_BY_PROD_SOLD = "Sold";
let currentSortCriteria = undefined;
let minCount = undefined;
let maxCount = undefined;

function myFunction() {
    // Declare variables
    var input, filter, ul, h4, a, i;
    input = document.getElementById('search');
    filter = input.value.toUpperCase();
    ul = document.getElementById("cat-list-container");
    row = ul.getElementsByClassName("list-group-item list-group-item-action")
    h4 = ul.getElementsByTagName('h4');
    p = ul.getElementsByTagName('p');


  
    // Loop a traves de todos los items, esconde lo que no cumplen
    for (i = 0; i < h4.length; i++) {
      a = h4[i].innerText;
      b = p[i].innerText;

      /*txtValue = a.textContent || a.innerText;*/
      if (a.toUpperCase().indexOf(filter) > -1 || b.toUpperCase().indexOf(filter) > -1) {
        row[i].style.display = "";
      } else {
        row[i].style.display = "none";
      }
    }
  }

function setProdID(id) {
    localStorage.setItem("ProdID", id);
    window.location = "product-info.html"
}


//Modifico el codigo de esta funcion para que sea un poco más eficiente
function showProductsList() {
    let htmlContentToAppend = "";
    for (let i = 0; i < productsArray.length; i++) {// se puede hacer tambien un for (let prod of array),
        let prod = productsArray[i];            //  pero me gusta mas parecido a c++

        //console.log(prod)
        if (((minCount == undefined) || (minCount != undefined && parseInt(prod.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(prod.cost) <= maxCount))) {

            htmlContentToAppend += `
                <div onclick="setProdID(${prod.id})" class="list-group-item list-group-item-action cursor-active">
                    <div class="row">
                        <div class="col-3">
                            <img src="${prod.image}" alt="${prod.description}" class="img-thumbnail">
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <h4 class="mb-1">${prod.name} - ${prod.currency} ${prod.cost}</h4>
                                <small class="text-muted">${prod.soldCount} vendidos</small>
                            </div>
                            <p>${prod.description}</p>
                        </div>
                    </div>
                </div>
                `
        }
    }
    document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
}

function sortProducts(criteria, array) {
    let result = [];
    if (criteria === ORDER_ASC_BY_PRICE) {
        result = array.sort(function (a, b) {
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_DESC_BY_PRICE) {
        result = array.sort(function (a, b) {
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
    } else if (criteria === ORDER_BY_PROD_SOLD) {
        result = array.sort(function (a, b) {
            let aSold = parseInt(a.soldCount);
            let bSold = parseInt(b.soldCount);

            if (aSold > bSold) { return -1; }
            if (aSold < bSold) { return 1; }
            return 0;
        });
    }

    return result;
}





function sortAndShowProducts(sortCriteria, prodArray) {
    currentSortCriteria = sortCriteria;

    if (prodArray != undefined) {
        productsArray = prodArray;
    }

    productsArray = sortProducts(currentSortCriteria, productsArray);

    //Muestro las categorías ordenadas
    showProductsList();
}

// se cambio el entrada del link en getJSONData para que sea con PRODUCTS_URL con el catID en el localStorage
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL + localStorage.getItem("catID") + ".json").then(function (resultObj) {//PRODUCTS_URL en init.js
        if (resultObj.status === "ok") {
            productsArray = resultObj.data.products;
            showProductsList();
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("sortDesc").addEventListener("click", function () {
        sortAndShowProducts(ORDER_DESC_BY_PRICE);
    });

    document.getElementById("sortByPrice").addEventListener("click", function () {
        sortAndShowProducts(ORDER_BY_PROD_SOLD);
    });

    document.getElementById("clearRangeFilter").addEventListener("click", function () {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function () {
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;


        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
        }
        else {
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        }
        else {
            maxCount = undefined;
        }

        showProductsList();
    });

    document.getElementById("search").addEventListener("keyup", function () {
        myFunction();
    });
});


