# 🛒 Backend eMercado - API REST con Arquitectura MVC

Backend completo para el eCommerce **eMercado** implementado con arquitectura **MVC** (Model-View-Controller), autenticación JWT y persistencia de datos en archivos JSON.

---

## 📋 Tabla de Contenidos

- [Descripción General](#-descripción-general)
- [Características Principales](#-características-principales)
- [Instalación y Configuración](#-instalación-y-configuración)
- [Arquitectura del Sistema](#-arquitectura-del-sistema)
- [¿Cómo Funciona?](#-cómo-funciona)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [API Endpoints](#-api-endpoints)
- [Autenticación JWT](#-autenticación-jwt)
- [Flujo de Datos](#-flujo-de-datos)
- [Almacenamiento de Datos](#-almacenamiento-de-datos)
- [Integración con Frontend](#-integración-con-frontend)
- [Tecnologías Utilizadas](#-tecnologías-utilizadas)

---

## 🎯 Descripción General

Este backend proporciona una **API RESTful** completa para gestionar un eCommerce, permitiendo operaciones como:

- ✅ Autenticación y registro de usuarios
- ✅ Gestión de catálogo de productos y categorías
- ✅ Sistema de comentarios
- ✅ Carritos de compra
- ✅ Publicación de productos

Todo implementado siguiendo el **patrón MVC**, donde cada componente tiene una responsabilidad específica y bien definida.

---

## ✨ Características Principales

### 🏗️ Arquitectura MVC
- **Separación clara de responsabilidades** entre capas
- **Reutilización de código** mediante modelos y controladores
- **Fácil mantenimiento** y escalabilidad

### 🔐 Autenticación Segura
- Tokens JWT con expiración de 24 horas
- Middleware de autenticación reutilizable
- Validación de credenciales

### 📡 API RESTful
- Endpoints consistentes y predecibles
- Respuestas JSON estandarizadas
- Manejo de errores centralizado

### 💾 Persistencia JSON
- Almacenamiento en archivos JSON
- Fácil migración a bases de datos
- Sin dependencias de base de datos

---

## 🚀 Instalación y Configuración

### Requisitos Previos
- Node.js (v14 o superior)
- npm

### Pasos de Instalación

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
# Crear archivo .env en la raíz del backend
```

### Configuración de Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```env
PORT=3000
JWT_SECRET=tu_clave_secreta_muy_segura_aqui
```

**Importante:**
- `PORT`: Puerto donde se ejecutará el servidor (por defecto: 3000)
- `JWT_SECRET`: Clave secreta para firmar los tokens JWT (usa una clave fuerte en producción)

### Iniciar el Servidor

```bash
# Modo producción
npm start

# Modo desarrollo (con auto-reload usando nodemon)
npm run dev
```

El servidor estará disponible en `http://localhost:3000` (o el puerto configurado en `.env`).

---

## 🏗️ Arquitectura del Sistema

### Patrón MVC

El proyecto sigue estrictamente el patrón **Model-View-Controller**:

```
┌─────────────┐
│   Cliente   │ (Frontend/Mobile)
└──────┬──────┘
       │ HTTP Request
       ▼
┌─────────────────────────────────────────┐
│              Express App                │
│  ┌──────────────────────────────────┐   │
│  │         Routes Layer             │   │ ← Define endpoints
│  │    (routes/*.js)                 │   │
│  └────────────┬─────────────────────┘   │
│               │                          │
│  ┌────────────▼─────────────────────┐   │
│  │      Controllers Layer           │   │ ← Lógica de negocio
│  │    (controllers/*.js)            │   │
│  └────────────┬─────────────────────┘   │
│               │                          │
│  ┌────────────▼─────────────────────┐   │
│  │        Models Layer              │   │ ← Acceso a datos
│  │      (models/*.js)               │   │
│  └────────────┬─────────────────────┘   │
└───────────────┼─────────────────────────┘
                │
                ▼
        ┌───────────────┐
        │  JSON Files   │
        │  (data/*.json)│
        └───────────────┘
```

### Responsabilidades de Cada Capa

#### 🔵 **Routes** (Rutas)
- Definen los **endpoints** de la API
- Mapean URLs a métodos de controladores
- Validan parámetros de ruta

**Ejemplo:**
```javascript
// routes/cats.js
router.get('/cat.json', CatsController.getCategories);
```

#### 🟢 **Controllers** (Controladores)
- Contienen la **lógica de negocio**
- Procesan las peticiones HTTP
- Validan datos de entrada
- Invocan a los modelos
- Formatean respuestas

**Ejemplo:**
```javascript
// controllers/catsController.js
static async getCategories(req, res) {
  const data = await CatsModel.getAll();
  res.json(data);
}
```

#### 🟡 **Models** (Modelos)
- Gestionan el **acceso a datos**
- Leen y escriben archivos JSON
- Aíslan la lógica de persistencia

**Ejemplo:**
```javascript
// models/catsModel.js
static async getAll() {
  const filePath = path.join(__dirname, '../data/cats/cat.json');
  const data = await fs.readFile(filePath, 'utf8');
  return JSON.parse(data);
}
```

---

## 🔄 ¿Cómo Funciona?

### Flujo Completo de una Petición

Vamos a seguir el flujo de una petición real paso a paso:

#### Ejemplo: Obtener Categorías

**1. Cliente hace la petición:**
```bash
GET http://localhost:3000/api/cats/cat.json
```

**2. Express recibe la petición (`app.js`):**
```javascript
// app.js registra las rutas
app.use('/api/cats', catsRoutes);
```

**3. Router procesa la URL (`routes/cats.js`):**
```javascript
// La URL '/api/cats/cat.json' coincide con esta ruta
router.get('/cat.json', CatsController.getCategories);
```

**4. Controller ejecuta la lógica (`controllers/catsController.js`):**
```javascript
static async getCategories(req, res) {
  // Llama al modelo para obtener los datos
  const data = await CatsModel.getAll();
  // Responde al cliente
  res.json(data);
}
```

**5. Model accede a los datos (`models/catsModel.js`):**
```javascript
static async getAll() {
  // Lee el archivo JSON
  const filePath = path.join(__dirname, '../data/cats/cat.json');
  const data = await fs.readFile(filePath, 'utf8');
  // Retorna los datos parseados
  return JSON.parse(data);
}
```

**6. La respuesta viaja de vuelta:**
```
Model → Controller → Express → Cliente
```

### Flujo con Autenticación

Para operaciones que requieren autenticación (ejemplo: login):

**1. Cliente envía credenciales:**
```bash
POST http://localhost:3000/login
Body: { "email": "user@example.com", "contrasena": "password123" }
```

**2. El controlador valida y genera token:**
```javascript
// controllers/authController.js
const usuarioValido = await AuthModel.validateCredentials(email, contrasena);
const token = jwt.sign({ email, userId }, JWT_SECRET, { expiresIn: '24h' });
res.json({ status: 'ok', token, user: {...} });
```

**3. Para rutas protegidas:**
```javascript
// El middleware verifica el token antes de permitir acceso
router.post('/protected', authMiddleware, SomeController.action);
```

---

## 📁 Estructura del Proyecto

```
backend/
│
├── 📄 server.js                    # Punto de entrada - Inicia el servidor
├── 📄 app.js                       # Configuración de Express y middleware
├── 📄 package.json                 # Dependencias del proyecto
├── 📄 .env                         # Variables de entorno (no incluido en git)
│
├── 📂 controllers/                 # Lógica de negocio (9 controladores)
│   ├── authController.js          # Login de usuarios
│   ├── registerController.js      # Registro de usuarios
│   ├── catsController.js          # Gestión de categorías
│   ├── catsProductsController.js  # Productos por categoría
│   ├── productsController.js      # Detalles de productos
│   ├── productsCommentsController.js  # Comentarios de productos
│   ├── cartController.js          # Carrito de compra
│   ├── userCartController.js      # Carrito por usuario
│   └── sellController.js          # Publicación de productos
│
├── 📂 models/                      # Acceso a datos (8 modelos)
│   ├── authModel.js               # CRUD de usuarios
│   ├── catsModel.js               # Lectura de categorías
│   ├── catsProductsModel.js       # Productos por categoría
│   ├── productsModel.js           # Detalles de productos
│   ├── productsCommentsModel.js   # Comentarios
│   ├── cartModel.js               # Carritos
│   ├── userCartModel.js           # Carritos de usuario
│   └── sellModel.js               # Publicaciones
│
├── 📂 routes/                      # Definición de endpoints (9 rutas)
│   ├── login.js                   # POST /login
│   ├── register.js                # POST /register
│   ├── cats.js                    # GET /api/cats/cat.json
│   ├── cats_products.js           # GET /api/cats_products/:id.json
│   ├── products.js                # GET /api/products/:id.json
│   ├── products_comments.js       # GET /api/products_comments/:id.json
│   ├── cart.js                    # GET /api/cart/buy.json
│   ├── user_cart.js               # GET /api/user_cart/:id.json
│   └── sell.js                    # GET /api/sell/publish.json
│
├── 📂 middleware/                  # Middleware personalizado
│   └── auth.js                    # Verificación de tokens JWT
│
└── 📂 data/                        # Almacenamiento de datos JSON
    ├── users.json                  # Usuarios registrados
    ├── cats/                       # Categorías
    │   └── cat.json
    ├── cats_products/              # Productos por categoría
    │   ├── 101.json
    │   ├── 102.json
    │   └── ...
    ├── products/                   # Detalles de productos
    │   ├── 50921.json
    │   └── ...
    ├── products_comments/          # Comentarios
    │   └── ...
    ├── cart/                       # Carritos
    │   └── buy.json
    ├── user_cart/                  # Carritos por usuario
    │   └── ...
    └── sell/                       # Publicaciones
        └── publish.json
```

### Descripción de Componentes Principales

#### `server.js`
- Carga las variables de entorno (`.env`)
- Importa la aplicación Express configurada
- Inicia el servidor en el puerto especificado

#### `app.js`
- Configura Express (middleware CORS, JSON parser)
- Registra todas las rutas del sistema
- Maneja errores globalmente

#### Middleware (`middleware/auth.js`)
- Verifica tokens JWT en peticiones protegidas
- Valida formato del header `Authorization: Bearer <token>`
- Decodifica y agrega información del usuario a `req.user`

---

## 📡 API Endpoints

### 🔓 Endpoints Públicos (Sin Autenticación)

#### **Autenticación**

##### `POST /register`
Registra un nuevo usuario en el sistema.

**Request:**
```json
{
  "email": "nuevo@example.com",
  "contrasena": "password123"
}
```

**Validaciones:**
- ✅ Email con formato válido
- ✅ Contraseña mínimo 6 caracteres
- ✅ Email único (no duplicado)

**Response (201):**
```json
{
  "status": "ok",
  "message": "Usuario registrado exitosamente",
  "user": {
    "id": "1234567890",
    "email": "nuevo@example.com"
  }
}
```

**Errores:**
- `400` - Campos faltantes o formato inválido
- `409` - Email ya registrado
- `500` - Error interno del servidor

---

##### `POST /login`
Autentica un usuario y devuelve un token JWT.

**Request:**
```json
{
  "email": "usuario@example.com",
  "contrasena": "password123"
}
```

**Response (200):**
```json
{
  "status": "ok",
  "message": "Login exitoso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "email": "usuario@example.com",
    "id": "1234567890"
  }
}
```

**Errores:**
- `400` - Campos faltantes
- `401` - Credenciales incorrectas
- `500` - Error interno

---

#### **Catálogo de Productos**

| Método | Endpoint | Descripción | Ejemplo |
|--------|----------|-------------|---------|
| GET | `/api/cats/cat.json` | Obtiene todas las categorías | `curl http://localhost:3000/api/cats/cat.json` |
| GET | `/api/cats_products/:id.json` | Productos de una categoría | `curl http://localhost:3000/api/cats_products/101.json` |
| GET | `/api/products/:id.json` | Detalle de un producto | `curl http://localhost:3000/api/products/50921.json` |
| GET | `/api/products_comments/:id.json` | Comentarios de un producto | `curl http://localhost:3000/api/products_comments/50921.json` |
| GET | `/api/cart/buy.json` | Información del carrito | `curl http://localhost:3000/api/cart/buy.json` |
| GET | `/api/user_cart/:id.json` | Carrito de un usuario | `curl http://localhost:3000/api/user_cart/25801.json` |
| GET | `/api/sell/publish.json` | Información de publicación | `curl http://localhost:3000/api/sell/publish.json` |

**Ejemplo de uso con curl:**
```bash
# Obtener todas las categorías
curl http://localhost:3000/api/cats/cat.json

# Obtener productos de la categoría 101
curl http://localhost:3000/api/cats_products/101.json

# Obtener detalles del producto 50921
curl http://localhost:3000/api/products/50921.json
```

**Ejemplo de uso con JavaScript (fetch):**
```javascript
// Obtener categorías
const response = await fetch('http://localhost:3000/api/cats/cat.json');
const categories = await response.json();

// Obtener productos de una categoría
const products = await fetch('http://localhost:3000/api/cats_products/101.json')
  .then(res => res.json());
```

---

## 🔐 Autenticación JWT

### ¿Qué es JWT?

**JSON Web Token** es un estándar para transmitir información de forma segura entre partes. En este proyecto, se usa para autenticar usuarios.

### Componentes del Token

Un token JWT tiene tres partes:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzdWFyaW9AZXhhbXBsZS5jb20iLCJ1c2VySWQiOiIxMjM0NTY3ODkwIiwiaWF0IjoxNzA0MDY3MjAwLCJleHAiOjE3MDQxNTM2MDB9.signature
│──────────────────────────────────────││──────────────────────────────────────────────────────────────││──────────│
            HEADER                                    PAYLOAD                                    SIGNATURE
```

1. **Header**: Algoritmo de encriptación (HS256)
2. **Payload**: Datos del usuario (email, userId) y expiración
3. **Signature**: Firma digital usando `JWT_SECRET`

### Generación del Token

El token se genera durante el login en `authController.js`:

```javascript
const token = jwt.sign(
  { 
    email: usuarioValido.email,
    userId: usuarioValido.id 
  },
  process.env.JWT_SECRET,
  { expiresIn: '24h' }  // Expira en 24 horas
);
```

### Uso del Token en Peticiones

Para acceder a rutas protegidas, incluir el token en el header:

```javascript
fetch('http://localhost:3000/api/protected', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  }
});
```

### Middleware de Autenticación

El middleware `auth.js` verifica automáticamente:

1. ✅ **Presencia del token** - Existe el header `Authorization`
2. ✅ **Formato correcto** - Formato `Bearer <token>`
3. ✅ **Validez** - Token no expirado y firma correcta
4. ✅ **Datos del usuario** - Agrega `req.user` con email e ID

**Ejemplo de ruta protegida:**
```javascript
router.get('/protected', authMiddleware, Controller.method);
```

Si el token es inválido, retorna `401 Unauthorized`.

---

## 🔄 Flujo de Datos

### Flujo de Lectura (GET)

```
1. Cliente → GET /api/cats/cat.json
2. Express → routes/cats.js
3. Router → CatsController.getCategories()
4. Controller → CatsModel.getAll()
5. Model → Lee data/cats/cat.json
6. Model → Retorna datos al Controller
7. Controller → Responde JSON al Cliente
```

### Flujo de Escritura (POST)

```
1. Cliente → POST /register { email, contrasena }
2. Express → routes/register.js
3. Router → RegisterController.register()
4. Controller → Valida datos de entrada
5. Controller → RegisterModel.createUser()
6. Model → Lee data/users.json
7. Model → Agrega nuevo usuario
8. Model → Escribe data/users.json
9. Model → Retorna usuario creado
10. Controller → Responde 201 al Cliente
```

### Flujo con Autenticación

```
1. Cliente → POST /login { email, contrasena }
2. Express → routes/login.js
3. Router → AuthController.login()
4. Controller → AuthModel.validateCredentials()
5. Model → Verifica en data/users.json
6. Controller → Genera token JWT
7. Controller → Responde { token, user }

Para rutas protegidas:
8. Cliente → GET /api/protected
            Header: Authorization: Bearer <token>
9. Express → Middleware auth.js
10. Middleware → Verifica y decodifica token
11. Middleware → Agrega req.user y continúa
12. Controller → Procesa petición
```

---

## 💾 Almacenamiento de Datos

### Estructura de Datos

Todos los datos se almacenan en archivos JSON dentro de la carpeta `data/`.

#### Usuarios (`data/users.json`)

El archivo se crea automáticamente al registrar el primer usuario.

**Estructura:**
```json
[
  {
    "id": "1704067200000",
    "email": "usuario@example.com",
    "contrasena": "password123",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

**⚠️ Nota de Seguridad:** 
En producción, las contraseñas deben hashearse usando bcrypt. La implementación actual es solo para fines educativos.

#### Catálogo de Productos

Los datos del catálogo son estáticos y están organizados por tipo:

- **Categorías**: `data/cats/cat.json` - Lista de todas las categorías
- **Productos por categoría**: `data/cats_products/{id}.json` - Productos de una categoría específica
- **Detalles de productos**: `data/products/{id}.json` - Información completa de un producto
- **Comentarios**: `data/products_comments/{id}.json` - Comentarios de un producto

#### Carritos y Publicaciones

- **Carrito general**: `data/cart/buy.json`
- **Carrito por usuario**: `data/user_cart/{userId}.json`
- **Publicaciones**: `data/sell/publish.json`

### Operaciones de Modelos

Los modelos implementan operaciones CRUD básicas:

**Lectura:**
```javascript
const data = await Model.getAll();
const item = await Model.getById(id);
```

**Escritura:**
```javascript
const newItem = await Model.create(data);
await Model.update(id, data);
await Model.delete(id);
```

---

## 🔗 Integración con Frontend

### Configuración del Frontend

El backend está configurado con **CORS** habilitado, permitiendo peticiones desde cualquier origen durante desarrollo.

**En el frontend, configura la URL base:**

```javascript
// frontend/js/init.js o similar
const API_PORT = 3000;  // Debe coincidir con backend/.env PORT
const API_BASE_URL = `http://localhost:${API_PORT}/api`;
```

### Ejemplo de Uso Completo

```javascript
// 1. Registro de usuario
async function register(email, password) {
  const response = await fetch('http://localhost:3000/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, contrasena: password })
  });
  return await response.json();
}

// 2. Login y guardar token
async function login(email, password) {
  const response = await fetch('http://localhost:3000/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, contrasena: password })
  });
  const data = await response.json();
  
  if (data.token) {
    localStorage.setItem('token', data.token);
  }
  
  return data;
}

// 3. Obtener categorías (público)
async function getCategories() {
  const response = await fetch(`${API_BASE_URL}/cats/cat.json`);
  return await response.json();
}

// 4. Petición autenticada (con token)
async function getProtectedData() {
  const token = localStorage.getItem('token');
  
  const response = await fetch('http://localhost:3000/api/protected', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (response.status === 401) {
    // Token expirado, redirigir a login
    window.location.href = '/login';
    return;
  }
  
  return await response.json();
}
```

---

## 🛠️ Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Node.js** | v14+ | Runtime de JavaScript en el servidor |
| **Express** | ^4.18.2 | Framework web minimalista |
| **jsonwebtoken** | ^9.0.2 | Generación y verificación de tokens JWT |
| **cors** | ^2.8.5 | Manejo de Cross-Origin Resource Sharing |
| **dotenv** | ^16.3.1 | Carga de variables de entorno |
| **nodemon** | ^3.0.1 | Auto-reload en desarrollo (dev dependency) |

---

## 📝 Ventajas de Esta Arquitectura

### ✅ Separación de Responsabilidades
Cada capa tiene una función específica y bien definida, facilitando el mantenimiento.

### ✅ Mantenibilidad
El código está organizado de forma lógica. Para agregar una nueva funcionalidad, solo necesitas:
1. Crear un modelo en `models/`
2. Crear un controlador en `controllers/`
3. Crear una ruta en `routes/`
4. Registrar la ruta en `app.js`

### ✅ Escalabilidad
Fácil agregar nuevos recursos siguiendo el mismo patrón MVC.

### ✅ Testabilidad
Cada componente es independiente y puede testearse por separado.

### ✅ Reutilización
Los modelos y controladores pueden ser reutilizados en diferentes contextos.

### ✅ Claridad
La estructura es predecible y fácil de entender para nuevos desarrolladores.

---

## 🔍 Resumen: ¿Cómo Funciona en Simple?

1. **El cliente** hace una petición HTTP (GET, POST, etc.)
2. **Express** recibe la petición y la dirige a la ruta correspondiente
3. **La ruta** llama al método del controlador apropiado
4. **El controlador** ejecuta la lógica de negocio y llama al modelo
5. **El modelo** lee o escribe en los archivos JSON
6. **Los datos** vuelven por la misma cadena: Model → Controller → Express → Cliente
7. **El cliente** recibe la respuesta JSON

Para autenticación, el middleware verifica el token JWT antes de permitir acceso a rutas protegidas.

---

## 📚 Próximos Pasos (Mejoras Futuras)

- [ ] Implementar hash de contraseñas con bcrypt
- [ ] Agregar validación más robusta con Joi o express-validator
- [ ] Migrar de JSON a base de datos (MongoDB/PostgreSQL)
- [ ] Implementar refresh tokens
- [ ] Agregar rate limiting
- [ ] Implementar logging con Winston
- [ ] Agregar tests unitarios e integración
- [ ] Documentación con Swagger/OpenAPI

---

**Desarrollado con ❤️ para eMercado**
