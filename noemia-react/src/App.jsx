import React, { useMemo, useState } from 'react';
import Header from './components/Header.jsx';
import TopNav from './components/TopNav.jsx';
import Hero from './components/Hero.jsx';
import CategoryChips from './components/CategoryChips.jsx';
import ProductGrid from './components/ProductGrid.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import QuickView from './components/QuickView.jsx';
import products from './data/products.json';

export default function App() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('todos');
  const [sort, setSort] = useState('featured');
  const [quick, setQuick] = useState(null);

  const categories = useMemo(() => ['todos', ...Array.from(new Set(products.map(p => p.category))).sort()], []);

  const filtered = useMemo(() => {
    let items = products.slice();
    if (category !== 'todos') items = items.filter(p => p.category === category);
    if (query) items = items.filter(p => `${p.title} ${p.brand}`.toLowerCase().includes(query.toLowerCase()));
    switch (sort) {
      case 'price_asc': items.sort((a,b) => a.price - b.price); break;
      case 'price_desc': items.sort((a,b) => b.price - a.price); break;
      case 'rating_desc': items.sort((a,b) => b.rating - a.rating); break;
      case 'newest': items.sort((a,b) => b.createdAt - a.createdAt); break;
      default: break;
    }
    return items;
  }, [query, category, sort]);

  return (
    <>
      <Header query={query} onQuery={setQuery} />
      <TopNav />
      <main>
        <Hero />
        <section className="container py-6">
          <h2 className="text-xl font-semibold mb-3">Categorías populares</h2>
          <CategoryChips categories={categories} active={category} onChange={setCategory} />
        </section>

        <section className="container py-4">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="text-sm text-zinc-400">{filtered.length} resultados</div>
            <select className="bg-panel border border-border rounded-md px-3 py-2" value={sort} onChange={e => setSort(e.target.value)}>
              <option value="featured">Destacados</option>
              <option value="price_asc">Precio: bajo a alto</option>
              <option value="price_desc">Precio: alto a bajo</option>
              <option value="rating_desc">Mejor calificados</option>
              <option value="newest">Novedades</option>
            </select>
          </div>
          <ProductGrid products={filtered} onQuick={setQuick} />
        </section>
      </main>
      <CartDrawer />
      <QuickView product={quick} onClose={() => setQuick(null)} />
      <footer className="border-t border-border bg-panel mt-10">
        <div className="container py-6 flex items-center justify-between">
          <div className="font-bold">noemia</div>
          <div className="text-zinc-400">© {new Date().getFullYear()} Noemia</div>
        </div>
      </footer>
    </>
  );
}


