// ---- CART MANAGEMENT ----
function getCart() { return JSON.parse(localStorage.getItem('sbs_cart') || '[]'); }
function saveCart(cart) { localStorage.setItem('sbs_cart', JSON.stringify(cart)); updateCartCount(); }
function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((s, i) => s + i.quantity, 0);
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  });
}
function addToCart(product, qty = 1) {
  const cart = getCart();
  const existing = cart.find(i => i.product_id === product.id);
  if (existing) { existing.quantity += qty; }
  else { cart.push({ product_id: product.id, name: product.name, price: parseFloat(product.price), quantity: qty, image: product.image || '', category: product.category || '' }); }
  saveCart(cart);
}
function removeFromCart(productId) { saveCart(getCart().filter(i => i.product_id !== productId)); }
function updateCartQty(productId, qty) {
  const cart = getCart();
  const item = cart.find(i => i.product_id === productId);
  if (item) { item.quantity = Math.max(1, qty); saveCart(cart); }
}
function clearCart() { localStorage.removeItem('sbs_cart'); updateCartCount(); }
function cartSubtotal() { return getCart().reduce((s, i) => s + i.price * i.quantity, 0); }

// ---- SESSION ----
function getSession() { return JSON.parse(localStorage.getItem('sbs_session') || 'null'); }
function setSession(user) { localStorage.setItem('sbs_session', JSON.stringify(user)); }
function clearSession() { localStorage.removeItem('sbs_session'); }
function isLoggedIn() { return !!getSession(); }

// ---- FORMAT ----
function fmtAmt(n) { return 'KES ' + Number(n).toLocaleString('en-KE', { minimumFractionDigits: 2 }); }
function fmtDate(iso) { if (!iso) return '—'; return new Date(iso).toLocaleDateString('en-KE', { day: '2-digit', month: 'short', year: 'numeric' }); }

// ---- TOAST ----
function showToast(msg, type = 'success') {
  let toast = document.getElementById('store-toast');
  if (!toast) { toast = document.createElement('div'); toast.id = 'store-toast'; toast.style.cssText = 'position:fixed;bottom:24px;right:24px;padding:12px 20px;border-radius:10px;font-size:13px;font-weight:500;font-family:"DM Sans",sans-serif;z-index:9999;transform:translateY(80px);transition:transform 0.3s;max-width:320px;'; document.body.appendChild(toast); }
  toast.style.background = type === 'success' ? '#1A1A2E' : '#C0291F';
  toast.style.color = '#fff';
  toast.textContent = msg;
  toast.style.transform = 'translateY(0)';
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => { toast.style.transform = 'translateY(80px)'; }, 2800);
}

// ---- NAV RENDER ----
function renderNav(activePage) {
  const session = getSession();
  const cart = getCart();
  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);
  const settings = JSON.parse(localStorage.getItem('sbs_settings') || '{}');
  const logoSrc = settings.logo || null;
  const companyName = settings.company_name || 'SBS Advertising';

  const logoEl = logoSrc
    ? `<img src="${logoSrc}" alt="Logo" style="width:36px;height:36px;object-fit:contain;border-radius:6px;">`
    : `<div class="nav-logo-box">SBS</div>`;

  const pages = [
    { id: 'home', href: 'index.html', label: 'Shop' },
    { id: 'orders', href: 'my-orders.html', label: 'My orders' },
  ];
  const navLinks = pages.map(p => `<a href="${p.href}" class="nav-link ${p.id === activePage ? 'active' : ''}">${p.label}</a>`).join('');
  const authBtns = session
    ? `<span style="font-size:13px;color:rgba(255,255,255,0.7);">Hi, ${session.full_name.split(' ')[0]}</span>
       <button class="nav-btn nav-btn-outline" onclick="clearSession();location.href='index.html'">Logout</button>`
    : `<a href="login.html"><button class="nav-btn nav-btn-outline">Login</button></a>
       <a href="register.html"><button class="nav-btn nav-btn-primary">Register</button></a>`;

  const html = `
    <div class="nav-logo">
      ${logoEl}
      <div><div class="nav-logo-text">${companyName}</div><div class="nav-logo-sub">Systems Ltd</div></div>
    </div>
    <div class="nav-links">${navLinks}</div>
    <div class="nav-spacer"></div>
    <form class="nav-search" onsubmit="event.preventDefault();const q=this.querySelector('input').value.trim();if(q)location.href='index.html?search='+encodeURIComponent(q);">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      <input type="text" placeholder="Search products...">
    </form>
    <div class="nav-actions">
      <a href="cart.html">
        <button class="nav-icon-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>
          <span class="cart-count" style="display:${cartCount > 0 ? 'flex' : 'none'}">${cartCount}</span>
        </button>
      </a>
      ${authBtns}
    </div>`;
  const mount = document.getElementById('nav-mount');
  if (mount) mount.innerHTML = html;
}

// ---- FOOTER RENDER ----
function renderFooter() {
  const html = `
    <div class="footer-inner">
      <div>
        <div class="footer-brand-name">SBS Advertising Ltd</div>
        <div class="footer-brand-desc">Your trusted partner for banners, neon signs, digital printing and signage. Making your brand visible across Kenya.</div>
      </div>
      <div class="footer-col">
        <div class="footer-col-title">Shop</div>
        <a href="index.html">All products</a>
        <a href="index.html?cat=Electronics">Banners</a>
        <a href="index.html?cat=Computers">Neon Signs</a>
        <a href="index.html?cat=Office Supplies">Digital Printing</a>
        <a href="index.html?cat=Accessories">Signage</a>
      </div>
      <div class="footer-col">
        <div class="footer-col-title">Account</div>
        <a href="login.html">Login</a>
        <a href="register.html">Register</a>
        <a href="my-orders.html">My orders</a>
        <a href="cart.html">Cart</a>
      </div>
      <div class="footer-col">
        <div class="footer-col-title">Contact</div>
        <a href="#">info@sbsadvertising.co.ke</a>
        <a href="#">+254 700 000 000</a>
        <a href="#">Nairobi, Kenya</a>
      </div>
    </div>
    <div class="footer-bottom">
      <span>&copy; ${new Date().getFullYear()} SBS Advertising Ltd. All rights reserved.</span>
      <span>Payments secured by Paystack</span>
    </div>`;
  const mount = document.getElementById('footer-mount');
  if (mount) mount.innerHTML = html;
}
