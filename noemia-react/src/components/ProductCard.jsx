import React from 'react';
import useCart from '../store/cart.js';

export default function ProductCard({ product, onQuick }) {
  const add = useCart(s => s.add);
  return (
    <article className="grid grid-rows-[180px_auto] rounded-xl overflow-hidden border border-border bg-panel">
      <div className="grid place-items-center bg-bg">
        <img src={product.image} alt={product.title} className="max-h-full max-w-full object-contain" loading="lazy" />
      </div>
      <div className="p-3 grid gap-2">
        <span className="text-zinc-400 text-sm">{product.brand}</span>
        <h3 className="font-semibold leading-snug">{product.title}</h3>
        <div className="text-amber-300">{'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5-Math.round(product.rating))}</div>
        <div className="flex items-baseline gap-2">
          <span className="font-bold">S/ {product.price.toFixed(2)}</span>
          {product.oldPrice && <span className="text-zinc-400 line-through">S/ {product.oldPrice.toFixed(2)}</span>}
        </div>
        <div className="flex gap-2 mt-1">
          <button className="btn btn-primary" onClick={() => add(product.id)}>Agregar</button>
          <button className="btn btn-ghost" onClick={() => onQuick(product)}>Ver</button>
        </div>
      </div>
    </article>
  );
}


