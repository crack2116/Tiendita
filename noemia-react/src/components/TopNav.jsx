import React from 'react';

const items = ['natura days', 'best seller', 'promociones', 'perfumería', 'rostro', 'cabello', 'cuerpo', 'maquillaje', 'regalos', 'casa', 'hombre', 'marcas'];

export default function TopNav() {
  return (
    <div className="bg-panel/80 backdrop-blur border-b border-border">
      <nav className="container overflow-x-auto">
        <ul className="flex gap-6 text-sm py-3 whitespace-nowrap">
          {items.map((it, idx) => (
            <li key={it}>
              <a href="#" className={`px-3 py-1.5 rounded-full ${idx===0 ? 'bg-amber-500/20 text-amber-300' : 'text-zinc-300 hover:text-white'}`}>{it}</a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}


