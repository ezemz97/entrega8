// Configuración del API
// IMPORTANTE: Si cambias el puerto en backend/.env, actualiza API_PORT aquí
const API_PORT = 3000; // Puerto del backend (debe coincidir con backend/.env PORT)
const API_BASE_URL = `http://localhost:${API_PORT}/api`;

const API_URLS = {
  CATEGORIES: `${API_BASE_URL}/cats/cat.json`,
  CATEGORY_PRODUCTS: (catId) => `${API_BASE_URL}/cats_products/${catId}.json`,
  PRODUCT: (productId) => `${API_BASE_URL}/products/${productId}.json`,
  PRODUCT_COMMENTS: (productId) => `${API_BASE_URL}/products_comments/${productId}.json`,
  CART: `${API_BASE_URL}/cart/buy.json`,
  USER_CART: (userId) => `${API_BASE_URL}/user_cart/${userId}.json`,
  PUBLISH: `${API_BASE_URL}/sell/publish.json`
};

let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function (url) {
  let result = {};
  showSpinner();
  return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(function (response) {
      result.status = 'ok';
      result.data = response;
      hideSpinner();
      return result;
    })
    .catch(function (error) {
      result.status = 'error';
      result.data = error;
      hideSpinner();
      return result;
    });
}