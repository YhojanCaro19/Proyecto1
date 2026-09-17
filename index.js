const express = require('express');
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

let products = [
  { id: 1, name: 'Teclado mecánico', price: 120000 },
  { id: 2, name: 'Mouse inalámbrico', price: 45000 },
  { id: 3, name: 'Monitor 24"', price: 650000 }
];
let nextId = 4;

// Listar todos
app.get('/products', (req, res) => {
  res.json(products);
});

// Obtener uno
app.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id === Number(req.params.id));
  if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
  res.json(product);
});

// Crear
app.post('/products', (req, res) => {
  const { name, price } = req.body;
  if (!name || price === undefined) {
    return res.status(400).json({ error: 'name y price son obligatorios' });
  }
  const newProduct = { id: nextId++, name, price };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// Actualizar
app.put('/products/:id', (req, res) => {
  const product = products.find(p => p.id === Number(req.params.id));
  if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
  const { name, price } = req.body;
  if (name !== undefined) product.name = name;
  if (price !== undefined) product.price = price;
  res.json(product);
});

// Eliminar
app.delete('/products/:id', (req, res) => {
  const index = products.findIndex(p => p.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Producto no encontrado' });
  products.splice(index, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`API de productos escuchando en el puerto ${PORT}`);
});