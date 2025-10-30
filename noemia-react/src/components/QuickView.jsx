import React from 'react';
import useCart from '../store/cart.js';

export default function QuickView({ product, onClose }) {
  const add = useCart(s => s.add);
  if (!product) return null;
  return (
    <div className="fixed inset-0 grid place-items-center bg-black/50">
      <div className="relative bg-panel border border-border rounded-xl w-[92%] max-w-4xl p-4 grid md:grid-cols-2 gap-4">
        <button className="absolute right-3 top-3 border border-border rounded-md px-2 py-1" onClick={onClose}>✕</button>
        <img src={product.image} alt={product.title} className="w-full h-80 object-contain bg-bg rounded-md" />
        <div className="grid gap-3">
          <h3 className="text-2xl font-bold">{product.title}</h3>
          <div className="text-zinc-400">{product.description}</div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-extrabold">S/ {product.price.toFixed(2)}</span>
            {product.oldPrice && <span className="text-zinc-400 line-through">S/ {product.oldPrice.toFixed(2)}</span>}
          </div>
          <div className="flex gap-2">
            <button className="btn btn-primary" onClick={()=>{ add(product.id); onClose(); }}>Agregar al carrito</button>
            <button className="btn btn-ghost" onClick={onClose}>Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  );
}


