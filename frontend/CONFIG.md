# Configuración del Frontend

## Puerto del API

El frontend se conecta al backend a través de la configuración en `js/init.js`.

### Cambiar el puerto del backend

Si cambias el puerto en `backend/.env`, debes actualizar también el frontend:

1. Abre `frontend/js/init.js`
2. Busca la línea:
   ```javascript
   const API_PORT = 3000;
   ```
3. Cambia `3000` por el puerto que configuraste en `backend/.env`

### Ejemplo

Si tu `backend/.env` tiene:
```
PORT=4000
```

Entonces en `frontend/js/init.js` debe ser:
```javascript
const API_PORT = 4000;
```

## URLs del API

Todas las URLs están centralizadas en el objeto `API_URLS` en `init.js`:

```javascript
const API_URLS = {
  CATEGORIES: `${API_BASE_URL}/cats/cat.json`,
  CATEGORY_PRODUCTS: (catId) => `${API_BASE_URL}/cats_products/${catId}.json`,
  PRODUCT: (productId) => `${API_BASE_URL}/products/${productId}.json`,
  PRODUCT_COMMENTS: (productId) => `${API_BASE_URL}/products_comments/${productId}.json`,
  CART: `${API_BASE_URL}/cart/buy.json`,
  USER_CART: (userId) => `${API_BASE_URL}/user_cart/${userId}.json`,
  PUBLISH: `${API_BASE_URL}/sell/publish.json`
};
```

Para usar en otros archivos JS:
```javascript
// Ejemplo en categories.js
const CATEGORIES_URL = API_URLS.CATEGORIES;

// Ejemplo en products.js
const url = API_URLS.CATEGORY_PRODUCTS(catID);
```
