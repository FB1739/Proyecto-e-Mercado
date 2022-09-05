const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

function clearUser() {
  localStorage.removeItem("user");
  window.location = "index.html"
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

if (!localStorage.getItem("user")){
  window.location = "login.html"
}

document.getElementById("navbarNav").innerHTML = `<ul class="navbar-nav w-100 justify-content-between">
<li class="nav-item">
  <a class="nav-link active" href="index.html">Inicio</a>
</li>
<li class="nav-item">
  <a class="nav-link" href="categories.html">Categorías</a>
</li>
<li class="nav-item">
  <a class="nav-link" href="sell.html">Vender</a>
</li>
<li class="nav-item">
  <a class="nav-link">${localStorage.getItem("user")}</a>
</li>
<li class="nav-item">
  <button class="btn btn-primary" type="button" id="clrBtn">Cerrar sesion</button>
</li>
</ul>`


document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("clrBtn").addEventListener("click", () => {
    clearUser();
  })
})