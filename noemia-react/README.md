Noemia React
============

Stack: React + Vite + Tailwind + Zustand.

Requisitos
----------
- Node.js 18+

Instalación
-----------

```powershell
cd noemia-react
npm install
npm run dev
```

Visita http://localhost:5174

Producción
----------

```powershell
npm run build
npm run preview
```

Estructura
----------

- `src/components/*`: UI modular (Header, Hero, Grid, Drawer, QuickView)
- `src/store/cart.js`: estado global de carrito con persistencia localStorage
- `src/data/products.json`: datos de ejemplo

Personaliza colores en `tailwind.config.js` y estilos en `src/styles.css`.


