
# 📌 API - Proyecto IN6BM Bimestral

## 🚀 Inicio del Proyecto

Para ejecutar este proyecto correctamente, sigue los siguientes pasos:

### 1️⃣ Instalación de dependencias
Asegúrate de tener **Node.js** y **npm** instalados.  
Luego, dentro del proyecto, ejecuta el siguiente comando para instalar las dependencias:

```bash
npm i
```

### 2️⃣ Configuración del entorno
Crea un archivo llamado `.env` en la raíz del proyecto y agrega los siguientes datos:

```env
PORT=3001
URI_MONGO=mongodb://localhost:27017/in6bm-bimestral
KEY=H0L4MUND0
```

⚠️ **Importante**: Verifica que tu servidor de MongoDB esté activo para que la conexión funcione correctamente.

### 3️⃣ Ejecución del proyecto
Para iniciar el servidor en modo desarrollo, usa el siguiente comando:

```bash
npm run dev
```

El servidor se levantará en el puerto 3001 (o el que definas en el archivo `.env`).

---

## 🗂️ Datos cargados en MongoDB

Cuando el proyecto se ejecuta por primera vez, se crean automáticamente los siguientes datos en la base de datos `in6bm-bimestral` si no existen:

### ✅ Usuario Admin Predeterminado

```json
{
  "name": "Admin",
  "surname": "User",
  "username": "admin",
  "email": "admin@example.com",
  "password": "adminpassword",
  "phone": "12345678",
  "role": "ADMIN_ROLE"
}
```

🔐 **Credenciales para login:**
- **Usuario**: admin
- **Contraseña**: adminpassword

### ✅ Categoría Predeterminada

```json
{
  "nombre": "Categoría Predeterminada",
  "descripcion": "Esta es la categoría predeterminada"
}
```

⚠️ **Nota**: Esta categoría es fija y no debe eliminarse del sistema, ya que sirve para asignaciones por defecto.

---

## 📂 Ubicación de la Data de MongoDB

La data que yo utilize para el proyecto se encuentra en:

➡️ **`configs/data`**

Desde ahí se controla la inserción automática de estos datos.

---

## 🛠️ Ubicación de los Endpoints

Todas las rutas (endpoints) de Postman se encuentran en:

➡️ **`configs`**

Ahí puedes revisar, modificar o agregar nuevas rutas relacionadas a los diferentes módulos del sistema.

---

## ⚡ Endpoints

### Auth
- **POST** `/bimestral/v1/auth/register` - Registrar un nuevo usuario
- **POST** `/bimestral/v1/auth/login` - Iniciar sesión

### Usuarios
- **GET** `/bimestral/v1/usuario/findUser/:uid` - Obtener un usuario por ID
- **GET** `/bimestral/v1/usuario` - Obtener todos los usuarios
- **PUT** `/bimestral/v1/usuario/updatePassword/:uid` - Actualizar la contraseña de un usuario
- **PUT** `/bimestral/v1/usuario/updateUser/:uid` - Actualizar un usuario
- **DELETE** `/bimestral/v1/usuario/deleteUser/:uid` - Eliminar un usuario

### Categorías
- **POST** `/bimestral/v1/categorias/createCategory` - Crear una nueva categoría
- **PUT** `/bimestral/v1/categorias/editCategory/:id` - Editar una categoría existente
- **DELETE** `/bimestral/v1/categorias/deleteCategory/:id` - Eliminar una categoría
- **GET** `/bimestral/v1/categorias/getCategories` - Obtener todas las categorías

### Productos
- **POST** `/bimestral/v1/productos/createProduct` - Crear un nuevo producto
- **PUT** `/bimestral/v1/productos/editProduct/:id` - Editar un producto existente
- **DELETE** `/bimestral/v1/productos/deleteProduct/:id` - Eliminar un producto
- **GET** `/bimestral/v1/productos/getProducts` - Obtener todos los productos
- **GET** `/bimestral/v1/productos/topSelling` - Obtener los productos más vendidos
- **GET** `/bimestral/v1/productos/searchByName?/name<Nombre del Producto>` - Buscar productos por nombre
- **GET** `/bimestral/v1/productos/categoria/:categoriaId` - Obtener productos por categoría

### Carrito de Compras
- **POST** `/bimestral/v1/carrito/addProduct` - Añadir un producto al carrito
- **DELETE** `/bimestral/v1/carrito/removeProduct` - Eliminar un producto del carrito
- **GET** `/bimestral/v1/carrito/getCartProducts` - Obtener los productos del carrito
- **POST** `/bimestral/v1/carrito/completePurchase` - Completar la compra
- **GET** `/bimestral/v1/carrito/generate-bill/:purchaseId` - Generar factura de la compra
- **GET** `/bimestral/v1/carrito/bill-history/:userId` - Obtener historial de facturas del usuario

> Asegúrate de reemplazar `:uid`, `:id`, `:categoriaId`, y `:purchaseId` con los valores correspondientes.


