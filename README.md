Noemia Storefront
=================

Noemia es una tienda online moderna hecha con HTML, CSS y JavaScript puros. Incluye catálogo, búsqueda, filtros, carrito con localStorage y vista rápida de producto.

Cómo ejecutar
-------------

Abrir directamente `index.html` funciona en la mayoría de navegadores. Si el navegador bloquea la carga de `products.json`, inicia un servidor estático y visita `http://localhost:5173`.

Powershell:

```powershell
python -m http.server 5173
# o
npx serve -l 5173
```

Estructura
----------

- `index.html`: página principal y contenedores de UI.
- `src/styles.css`: estilos y tema.
- `src/app.js`: lógica de catálogo, filtros y carrito.
- `src/products.json`: datos de ejemplo.
- `assets/logo.svg`: logo y favicon.

Personalización
---------------

- Ajusta colores en `:root` dentro de `src/styles.css`.
- Agrega productos en `src/products.json` con campos: `id`, `title`, `brand`, `category`, `price`, `oldPrice?`, `rating`, `createdAt`, `image`, `description`.
- Reemplaza el `alert()` de "Proceder al pago" por tu pasarela de pago.


