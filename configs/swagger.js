import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Proyecto Bimestral",
            version: "1.0.0",
            description: "API para el sistema COPEREX",
            contact: {
                name: "Ludwin Omar Xocoy Miranda",
                email: "omar.xocoy2007@gmail.com"
            }
        },
        servers: [
            {
                url: "http://localhost:3001/bimestral/v1"
            }
        ]
    },
    apis: [
        "./src/auth/auth.routes.js",
        "./src/usuarios/usuario.routes.js",
        "./src/categorias/categorias.routes.js",
        "./src/productos/productos.routes.js",
        "./src/carrito-de-compras/carrito-de-compras.routes.js"
    ]
};

const swaggerDocs = swaggerJSDoc(options);

export { swaggerDocs, swaggerUi };