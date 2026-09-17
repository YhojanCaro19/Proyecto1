# Proyecto 1 — API de Productos con Docker

API REST de productos construida con Node.js y Express, empaquetada en una imagen Docker propia.

## Descripción

Expone 5 endpoints para gestionar productos (datos en memoria):
- `GET /products` — listar todos los productos
- `GET /products/:id` — obtener un producto
- `POST /products` — crear un producto
- `PUT /products/:id` — actualizar un producto
- `DELETE /products/:id` — eliminar un producto

## Requisitos

- Docker instalado y corriendo

## Instrucciones de ejecución

Construir la imagen:

\`\`\`bash
docker build -t proyecto1-api-productos:1.0 .
\`\`\`

Ejecutar el contenedor:

\`\`\`bash
docker run -d --name productos-api -p 3000:3000 proyecto1-api-productos:1.0
\`\`\`

Verificar que está corriendo:

\`\`\`bash
docker ps
\`\`\`

## Pruebas de endpoints

\`\`\`bash
curl http://localhost:3000/products
curl http://localhost:3000/products/1
curl -X POST http://localhost:3000/products -H "Content-Type: application/json" -d '{"name":"Audífonos Bluetooth","price":89000}'
curl -X PUT http://localhost:3000/products/1 -H "Content-Type: application/json" -d '{"price":110000}'
curl -X DELETE http://localhost:3000/products/2 -i
\`\`\`

## Evidencias

Ver capturas en la carpeta `docs/evidencias/` (docker ps, respuestas de los 5 endpoints, logs del contenedor).

## Arquitectura

La API corre en un único contenedor Node.js/Express, expuesto en el puerto 3000. No depende de ninguna base de datos externa: los productos se guardan en un arreglo en memoria, por lo que los datos se reinician cada vez que el contenedor se recrea.