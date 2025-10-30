import React from 'react';
import useCart from '../store/cart.js';

export default function Header({ query, onQuery }) {
  const open = useCart(s => s.open);
  const count = useCart(s => s.count);
  return (
    <header className="sticky top-0 z-40 backdrop-blur bg-bg/70 border-b border-border">
      <div className="container flex items-center gap-3 py-3">
        <a className="font-extrabold tracking-wide lowercase" href="#">noemia</a>
        <div className="ml-auto flex items-center gap-2">
          <input value={query} onChange={e => onQuery(e.target.value)} placeholder="Buscar productos, marcas y más" className="w-[56vw] max-w-[560px] bg-panel border border-border rounded-lg px-3 py-2" />
          <button className="btn btn-primary">Buscar</button>
          <button onClick={open} aria-label="Carrito" className="border border-border bg-panel rounded-lg px-3 py-2">🛒 <span className="ml-1 text-xs bg-brand text-black rounded-full px-2 py-0.5 align-middle">{count}</span></button>
        </div>
      </div>
    </header>
  );
}


