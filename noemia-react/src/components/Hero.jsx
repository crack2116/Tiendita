import React from 'react';

export default function Hero() {
  return (
    <section className="border-b border-border bg-[radial-gradient(800px_400px_at_10%_10%,rgba(124,77,255,.25),transparent_55%),radial-gradient(700px_350px_at_90%_0%,rgba(34,211,238,.2),transparent_60%)]">
      <div className="container grid md:grid-cols-2 gap-6 items-center py-12">
        <div>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">Todo para tu día a día, en un solo lugar</h1>
          <p className="text-zinc-400 mt-3">Explora miles de productos con ofertas dinámicas, envío rápido y una experiencia de compra cuidada al detalle.</p>
          <div className="flex gap-3 mt-5">
            <a href="#catalogo" className="btn btn-primary">Ver catálogo</a>
            <a href="#" className="btn btn-ghost">Categorías</a>
          </div>
        </div>
        <div className="min-h-[260px] rounded-xl border border-border bg-panel" />
      </div>
    </section>
  );
}


