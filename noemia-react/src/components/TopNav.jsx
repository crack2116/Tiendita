import React from 'react';

const items = ['natura days', 'best seller', 'promociones', 'perfumería', 'rostro', 'cabello', 'cuerpo', 'maquillaje', 'regalos', 'casa', 'hombre', 'marcas'];

export default function TopNav() {
  return (
    <div className="bg-panel/80 backdrop-blur border-b border-border">
      <nav className="container overflow-x-auto">
        <ul className="flex gap-6 text-sm py-3 whitespace-nowrap">
          {items.map((it, idx) => (
            <li key={it}>
              <a href="#" className={`px-3 py-1.5 rounded-full ${idx===0 ? 'bg-blue-100 text-blue-700' : 'text-slate-600 hover:text-slate-900'}`}>{it}</a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}


