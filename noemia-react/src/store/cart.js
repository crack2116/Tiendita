import { create } from 'zustand';

const persistKey = 'noemia:cart';
const load = () => { try { return JSON.parse(localStorage.getItem(persistKey)) || { items: [] }; } catch { return { items: [] }; } };
const save = (state) => localStorage.setItem(persistKey, JSON.stringify({ items: state.items }));

const useCart = create((set, get) => ({
  isOpen: false,
  items: load().items,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  add: (id, qty = 1) => set(state => {
    const found = state.items.find(i => i.id === id);
    if (found) found.qty += qty; else state.items.push({ id, qty });
    save(state); return { items: state.items };
  }),
  remove: (id) => set(state => { state.items = state.items.filter(i => i.id !== id); save(state); return { items: state.items }; }),
  setQty: (id, qty) => set(state => { const it = state.items.find(i => i.id === id); if (it) it.qty = Math.max(1, qty); save(state); return { items: state.items }; }),
  clear: () => set(state => { state.items = []; save(state); return { items: [] }; }),
  count: 0,
}));

// derive count
useCart.subscribe((state) => {
  const count = state.items.reduce((s, i) => s + i.qty, 0);
  useCart.setState({ count });
});

export default useCart;


