/* Noemia Storefront - minimal SPA with client-side cart */

const state = {
  products: [],
  filtered: [],
  categories: new Set(),
  cart: loadCart(),
  activeCategory: 'todos',
  sort: 'featured',
};

const els = {
  year: null,
  chips: null,
  grid: null,
  results: null,
  sort: null,
  search: null,
  searchBtn: null,
  cartCount: null,
  cartDrawer: null,
  cartItems: null,
  cartTotal: null,
  openCartBtn: null,
  closeCartBtn: null,
  backdrop: null,
  checkoutBtn: null,
  qv: null,
  qvClose: null,
  qvImage: null,
  qvTitle: null,
  qvDesc: null,
  qvPrice: null,
  qvOld: null,
  qvAdd: null,
};

document.addEventListener('DOMContentLoaded', async () => {
  cacheEls();
  els.year.textContent = new Date().getFullYear();
  bindUI();
  await loadProducts();
  buildCategories();
  applyFilters();
  renderCart();
});

function cacheEls() {
  els.year = document.getElementById('year');
  els.chips = document.getElementById('categoryChips');
  els.grid = document.getElementById('productsGrid');
  els.results = document.getElementById('resultsCount');
  els.sort = document.getElementById('sortSelect');
  els.search = document.getElementById('searchInput');
  els.searchBtn = document.getElementById('searchBtn');
  els.cartCount = document.getElementById('cartCount');
  els.cartDrawer = document.getElementById('cartDrawer');
  els.cartItems = document.getElementById('cartItems');
  els.cartTotal = document.getElementById('cartTotal');
  els.openCartBtn = document.getElementById('openCartBtn');
  els.closeCartBtn = document.getElementById('closeCartBtn');
  els.backdrop = document.getElementById('cartBackdrop');
  els.checkoutBtn = document.getElementById('checkoutBtn');
  els.qv = document.getElementById('quickView');
  els.qvClose = document.getElementById('closeQuickView');
  els.qvImage = document.getElementById('qvImage');
  els.qvTitle = document.getElementById('qvTitle');
  els.qvDesc = document.getElementById('qvDesc');
  els.qvPrice = document.getElementById('qvPrice');
  els.qvOld = document.getElementById('qvOldPrice');
  els.qvAdd = document.getElementById('qvAdd');
}

async function loadProducts() {
  const res = await fetch('src/products.json');
  const data = await res.json();
  state.products = data;
  for (const p of data) state.categories.add(p.category);
}

function buildCategories() {
  const categories = ['todos', ...Array.from(state.categories).sort()];
  els.chips.innerHTML = categories
    .map(cat => `<button class="chip ${cat === state.activeCategory ? 'is-active' : ''}" data-cat="${cat}">${capitalize(cat)}</button>`) 
    .join('');
  els.chips.addEventListener('click', e => {
    const btn = e.target.closest('[data-cat]');
    if (!btn) return;
    state.activeCategory = btn.dataset.cat;
    [...els.chips.children].forEach(c => c.classList.toggle('is-active', c === btn));
    applyFilters();
  });
}

function bindUI() {
  els.sort.addEventListener('change', () => { state.sort = els.sort.value; applyFilters(); });
  els.searchBtn.addEventListener('click', () => applyFilters());
  els.search.addEventListener('keydown', e => { if (e.key === 'Enter') applyFilters(); });
  // Cart drawer
  const open = () => els.cartDrawer.classList.add('is-open');
  const close = () => els.cartDrawer.classList.remove('is-open');
  els.openCartBtn.addEventListener('click', open);
  els.closeCartBtn.addEventListener('click', close);
  els.backdrop.addEventListener('click', close);
  els.checkoutBtn.addEventListener('click', () => {
    alert('Gracias por tu compra en Noemia. Integración de pago pendiente.');
  });
}

function applyFilters() {
  const q = els.search.value.trim().toLowerCase();
  let items = [...state.products];
  if (state.activeCategory !== 'todos') items = items.filter(p => p.category === state.activeCategory);
  if (q) items = items.filter(p => `${p.title} ${p.brand}`.toLowerCase().includes(q));
  items = sortItems(items, state.sort);
  state.filtered = items;
  renderProducts();
}

function sortItems(items, mode) {
  const by = (k, dir = 1) => (a, b) => (a[k] > b[k] ? dir : -dir);
  switch (mode) {
    case 'price_asc': return items.sort(by('price', 1));
    case 'price_desc': return items.sort(by('price', -1));
    case 'rating_desc': return items.sort(by('rating', -1));
    case 'newest': return items.sort(by('createdAt', -1));
    default: return items; // featured
  }
}

function renderProducts() {
  els.results.textContent = state.filtered.length;
  els.grid.innerHTML = state.filtered.map(p => cardTpl(p)).join('');
  els.grid.querySelectorAll('[data-add]')
    .forEach(btn => btn.addEventListener('click', () => addToCart(btn.dataset.add)));
  els.grid.querySelectorAll('[data-qv]')
    .forEach(btn => btn.addEventListener('click', () => openQuickView(btn.dataset.qv)));
}

function cardTpl(p) {
  return `
  <article class="card">
    <div class="card__media"><img src="${p.image}" alt="${escapeHtml(p.title)}" loading="lazy" /></div>
    <div class="card__body">
      <span class="muted">${escapeHtml(p.brand)}</span>
      <h3 class="card__title">${escapeHtml(p.title)}</h3>
      <div class="rating">${'★'.repeat(Math.round(p.rating))}${'☆'.repeat(5 - Math.round(p.rating))}</div>
      <div class="price"><span class="price__current">S/ ${p.price.toFixed(2)}</span>${p.oldPrice ? `<span class="price__old">S/ ${p.oldPrice.toFixed(2)}</span>` : ''}</div>
      <div class="card__actions">
        <button class="btn btn--primary" data-add="${p.id}">Agregar</button>
        <button class="btn btn--ghost" data-qv="${p.id}">Ver</button>
      </div>
    </div>
  </article>`;
}

// Quick View
function openQuickView(id) {
  const p = state.products.find(x => String(x.id) === String(id));
  if (!p) return;
  els.qvImage.src = p.image;
  els.qvTitle.textContent = p.title;
  els.qvDesc.textContent = p.description;
  els.qvPrice.textContent = `S/ ${p.price.toFixed(2)}`;
  els.qvOld.textContent = p.oldPrice ? `S/ ${p.oldPrice.toFixed(2)}` : '';
  els.qvAdd.onclick = () => { addToCart(p.id); els.qv.close(); };
  els.qv.showModal();
}
document.getElementById('closeQuickView').addEventListener('click', () => els.qv.close());

// Cart
function addToCart(id, qty = 1) {
  const item = state.cart.items.find(i => i.id === id);
  if (item) item.qty += qty; else state.cart.items.push({ id, qty });
  saveCart();
  renderCart();
}
function removeFromCart(id) {
  state.cart.items = state.cart.items.filter(i => i.id !== id);
  saveCart();
  renderCart();
}
function setQty(id, qty) {
  const item = state.cart.items.find(i => i.id === id);
  if (!item) return;
  item.qty = Math.max(1, qty);
  saveCart();
  renderCart();
}
function renderCart() {
  const items = state.cart.items.map(i => ({ ...i, product: state.products.find(p => p.id === i.id) })).filter(x => x.product);
  const currency = v => `S/ ${v.toFixed(2)}`;
  els.cartItems.innerHTML = items.length ? items.map(({ id, qty, product }) => `
    <div class="cart-item">
      <div class="cart-item__media"><img src="${product.image}" alt="${escapeHtml(product.title)}" /></div>
      <div>
        <div>${escapeHtml(product.title)}</div>
        <div class="muted">${currency(product.price)} c/u</div>
        <div class="qty">
          <button data-dec="${id}">−</button>
          <input value="${qty}" aria-label="Cantidad" />
          <button data-inc="${id}">+</button>
        </div>
      </div>
      <div>
        <div><strong>${currency(product.price * qty)}</strong></div>
        <button class="icon-btn" data-rm="${id}">Eliminar</button>
      </div>
    </div>
  `).join('') : '<p class="muted">Tu carrito está vacío.</p>';

  els.cartItems.querySelectorAll('[data-inc]').forEach(b => b.addEventListener('click', () => setQty(Number(b.dataset.inc), currentQty(b) + 1)));
  els.cartItems.querySelectorAll('[data-dec]').forEach(b => b.addEventListener('click', () => setQty(Number(b.dataset.dec), currentQty(b) - 1)));
  els.cartItems.querySelectorAll('[data-rm]').forEach(b => b.addEventListener('click', () => removeFromCart(Number(b.dataset.rm))));
  els.cartItems.querySelectorAll('input').forEach(inp => inp.addEventListener('change', () => {
    const id = Number(inp.closest('.cart-item').querySelector('[data-rm]').dataset.rm);
    const v = Number(inp.value) || 1; setQty(id, v);
  }));

  const total = items.reduce((sum, { qty, product }) => sum + product.price * qty, 0);
  els.cartTotal.textContent = currency(total);
  els.cartCount.textContent = String(items.reduce((s, i) => s + i.qty, 0));
}
function currentQty(btn) {
  const input = btn.parentElement.querySelector('input');
  return Number(input.value) || 1;
}

function saveCart() { localStorage.setItem('noemia:cart', JSON.stringify(state.cart)); }
function loadCart() { try { return JSON.parse(localStorage.getItem('noemia:cart')) || { items: [] }; } catch { return { items: [] }; } }

// Utils
function capitalize(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
function escapeHtml(s) { return s.replace(/[&<>"]+/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c])); }


