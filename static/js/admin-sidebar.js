function renderSidebar(activePage) {
  const links = [
    { id: 'dashboard', href: 'dashboard.html', label: 'Dashboard', icon: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>', group: 'Main' },
    { id: 'products', href: 'products.html', label: 'Products', icon: '<path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"/><path d="M16 3H8a2 2 0 00-2 2v2h12V5a2 2 0 00-2-2z"/>', group: 'Main' },
    { id: 'orders', href: 'orders.html', label: 'Orders', icon: '<path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>', badge: true, group: 'Sales' },
    { id: 'invoices', href: 'invoices.html', label: 'Invoices', icon: '<path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>', group: 'Sales' },
    { id: 'customers', href: 'customers.html', label: 'Customers', icon: '<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>', group: 'Sales' },
    { id: 'reports', href: 'reports.html', label: 'Reports', icon: '<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>', group: 'Insights' },
    { id: 'settings', href: 'settings.html', label: 'Settings', icon: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/>', group: 'System' },
  ];

  const orders = JSON.parse(localStorage.getItem('sbs_orders') || '[]');
  const pendingCount = orders.filter(o => o.order_status === 'pending').length;
  const settings = JSON.parse(localStorage.getItem('sbs_settings') || '{}');
  const logoSrc = settings.logo || null;
  const companyName = settings.company_name || 'SBS Advertising';

  const brandLogoEl = logoSrc
    ? `<img src="${logoSrc}" alt="Logo" style="width:40px;height:40px;object-fit:contain;border-radius:8px;background:#fff;">`
    : `<div class="brand-logo">SBS</div>`;

  let groups = {};
  links.forEach(l => { if (!groups[l.group]) groups[l.group] = []; groups[l.group].push(l); });

  let navHTML = '';
  Object.entries(groups).forEach(([group, items]) => {
    navHTML += `<div class="nav-label">${group}</div>`;
    items.forEach(item => {
      const isActive = item.id === activePage;
      const badge = item.badge && pendingCount > 0 ? `<span class="nav-badge">${pendingCount}</span>` : '';
      navHTML += `<a href="${item.href}" class="nav-link ${isActive ? 'active' : ''}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${item.icon}</svg>
        ${item.label}${badge}
      </a>`;
    });
  });

  const html = `
    <div class="sidebar-overlay" id="sidebarOverlay"></div>
    <aside class="sidebar" id="adminSidebar">
      <button class="sidebar-close" id="sidebarClose" aria-label="Close menu">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
      <div class="sidebar-brand">
        ${brandLogoEl}
        <div>
          <div class="brand-name">${companyName}</div>
          <div class="brand-sub">Admin Panel</div>
        </div>
      </div>
      <nav>${navHTML}</nav>
      <div class="sidebar-user">
        <div class="user-avatar">AD</div>
        <div style="flex:1;min-width:0;">
          <div class="user-name">Admin</div>
          <div class="user-role">Administrator</div>
        </div>
      </div>
    </aside>`;
  document.getElementById('sidebar-mount').innerHTML = html;

  // Wire up mobile sidebar toggle
  const sidebar = document.getElementById('adminSidebar');
  const overlay = document.getElementById('sidebarOverlay');
  const closeBtn = document.getElementById('sidebarClose');
  const toggle = document.getElementById('menuToggle');

  function openSidebar() { sidebar.classList.add('open'); overlay.classList.add('open'); }
  function closeSidebar() { sidebar.classList.remove('open'); overlay.classList.remove('open'); }

  if (toggle) toggle.addEventListener('click', openSidebar);
  if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
  if (overlay) overlay.addEventListener('click', closeSidebar);
}
