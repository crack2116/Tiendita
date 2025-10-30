import React from 'react';

export default function Hero() {
  return (
    <section className="border-b border-border bg-[radial-gradient(800px_400px_at_10%_10%,rgba(96,165,250,.25),transparent_55%),radial-gradient(700px_350px_at_90%_0%,rgba(167,139,250,.25),transparent_60%)]">
      <div className="container grid md:grid-cols-2 gap-6 items-center py-12">
        <div>
          <h1 className="text-3xl md:text-5xl font-extrabold leading-tight">¡35% OFF - 60% OFF!</h1>
          <p className="text-slate-600 mt-3">Celebra los Noemia Days con descuentos imperdibles en productos seleccionados.</p>
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


