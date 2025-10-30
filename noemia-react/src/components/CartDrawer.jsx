import React from 'react';
import useCart from '../store/cart.js';
import products from '../data/products.json';

export default function CartDrawer() {
  const isOpen = useCart(s => s.isOpen);
  const close = useCart(s => s.close);
  const items = useCart(s => s.items);
  const setQty = useCart(s => s.setQty);
  const remove = useCart(s => s.remove);

  const rows = items.map(i => ({ ...i, product: products.find(p => p.id === i.id) })).filter(x => x.product);
  const total = rows.reduce((s, r) => s + r.qty * r.product.price, 0);

  return (
    <div className={`fixed inset-0 grid grid-cols-1 pointer-events-none ${isOpen ? '' : ''}`} aria-hidden={!isOpen}>
      <div className={`ml-auto h-full w-full max-w-sm bg-panel border-l border-border grid grid-rows-[auto_1fr_auto] transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'} pointer-events-auto`}>
        <div className="p-4 border-b border-border flex items-center justify-between">
          <h3 className="font-semibold">Tu carrito</h3>
          <button className="border border-border rounded-md px-2 py-1" onClick={close}>✕</button>
        </div>
        <div className="p-3 space-y-2 overflow-auto">
          {rows.length ? rows.map(({ id, qty, product }) => (
            <div key={id} className="grid grid-cols-[64px_1fr_auto] items-center gap-3 border border-border rounded-md p-2">
              <img src={product.image} alt={product.title} className="w-16 h-16 object-contain bg-bg" />
              <div>
                <div className="font-medium leading-snug">{product.title}</div>
                <div className="text-sm text-zinc-400">S/ {product.price.toFixed(2)} c/u</div>
                <div className="inline-flex items-center border border-border rounded-md mt-1">
                  <button className="px-2" onClick={() => setQty(id, Math.max(1, qty-1))}>−</button>
                  <input className="w-10 text-center bg-transparent" value={qty} onChange={e=>setQty(id, Math.max(1, Number(e.target.value)||1))} />
                  <button className="px-2" onClick={() => setQty(id, qty+1)}>+</button>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold">S/ {(product.price * qty).toFixed(2)}</div>
                <button className="text-sm text-red-600 mt-1" onClick={() => remove(id)}>Eliminar</button>
              </div>
            </div>
          )) : <p className="text-zinc-400">Tu carrito está vacío.</p>}
        </div>
        <div className="p-4 border-t border-border grid gap-3">
          <div className="flex items-center justify-between"><span>Total</span><strong>S/ {total.toFixed(2)}</strong></div>
          <button className="btn btn-primary w-full" onClick={()=>alert('Gracias por tu compra en Noemia. Integración de pago pendiente.')}>Proceder al pago</button>
        </div>
      </div>
      <div className={`bg-black/40 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'} pointer-events-auto`} onClick={close} />
    </div>
  );
}


