import React from 'react';
import ProductCard from './ProductCard.jsx';

export default function ProductGrid({ products, onQuick }) {
  return (
    <div id="catalogo" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 pb-10">
      {products.map(p => <ProductCard key={p.id} product={p} onQuick={onQuick} />)}
    </div>
  );
}


