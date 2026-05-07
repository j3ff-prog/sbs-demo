// Auto-seeds demo data on first visit
(function() {
  if (localStorage.getItem('sbs_seeded')) return;

  const products = [
    { id: '1', name: 'Vinyl Banner — Full Colour Print', description: 'High quality PVC vinyl banner with full colour digital print. Weather resistant, suitable for indoor and outdoor use. Custom sizes available.', price: 1500, stock: 50, category: 'Banners', active: true, image: '' },
    { id: '2', name: 'Roll-Up Banner Stand', description: 'Portable pull-up banner stand complete with full colour print. Aluminium base, easy to assemble. Ideal for exhibitions, trade shows and events.', price: 4500, stock: 20, category: 'Banners', active: true, image: '' },
    { id: '3', name: 'Mesh Banner — Outdoor', description: 'Perforated mesh banner for outdoor use. Allows wind to pass through preventing damage. Perfect for building wraps and outdoor events.', price: 2200, stock: 30, category: 'Banners', active: true, image: '' },
    { id: '4', name: 'Custom Neon Sign — Business Logo', description: 'Custom LED neon sign in your brand colours. Energy efficient, long lasting and eye-catching. Perfect for shop fronts, restaurants and events.', price: 18000, stock: 10, category: 'Neon Signs', active: true, image: '' },
    { id: '5', name: 'Neon Open Sign', description: 'Classic OPEN neon sign in bright red and blue. Plug and play, instant attention for your shop front. Available in multiple colour combinations.', price: 8500, stock: 15, category: 'Neon Signs', active: true, image: '' },
    { id: '6', name: 'Custom Neon Word Sign', description: 'Personalised neon word or phrase in your choice of colour. Popular for restaurants, bars, offices and events. Includes remote dimmer.', price: 12000, stock: 8, category: 'Neon Signs', active: true, image: '' },
    { id: '7', name: 'A2 Flyer Printing — 1000 Copies', description: 'Full colour A2 flyer printing on 130gsm gloss paper. Sharp, vibrant print quality. Ideal for promotions, events and marketing campaigns.', price: 5500, stock: 100, category: 'Digital Printing', active: true, image: '' },
    { id: '8', name: 'Business Card Printing — 500 Copies', description: 'Premium business cards on 350gsm matt laminate. Double sided full colour print. Professional finish that makes a lasting impression.', price: 2000, stock: 100, category: 'Digital Printing', active: true, image: '' },
    { id: '9', name: 'Large Format UV Print', description: 'High resolution UV printing on rigid substrates including forex, acrylic and aluminium composite. Scratch resistant and weatherproof.', price: 3500, stock: 40, category: 'Digital Printing', active: true, image: '' },
    { id: '10', name: 'Aluminium Composite Signage', description: 'Durable aluminium composite panel signage with full colour digital print. Lightweight, weatherproof and professional looking. Standard and custom sizes.', price: 6500, stock: 25, category: 'Signage', active: true, image: '' },
    { id: '11', name: '3D Letter Signage — Stainless Steel', description: 'Custom fabricated 3D letters in brushed stainless steel. Premium finish for corporate offices and building fascia. Backlit option available.', price: 35000, stock: 5, category: 'Signage', active: true, image: '' },
    { id: '12', name: 'LED Illuminated Lightbox', description: 'Slim LED lightbox with custom printed graphic. Even illumination, energy efficient. Ideal for retail, restaurants and reception areas.', price: 22000, stock: 7, category: 'Signage', active: true, image: '' },
  ];

  const categories = [
    { id: 'c1', name: 'Banners', slug: 'banners' },
    { id: 'c2', name: 'Neon Signs', slug: 'neon-signs' },
    { id: 'c3', name: 'Digital Printing', slug: 'digital-printing' },
    { id: 'c4', name: 'Signage', slug: 'signage' },
  ];

  const settings = {
    company_name: 'SBS Advertising Ltd',
    email: 'info@sbsadvertising.co.ke',
    phone: '+254 700 000 000',
    address: 'Nairobi, Kenya',
    logo: null
  };

  localStorage.setItem('sbs_products', JSON.stringify(products));
  localStorage.setItem('sbs_categories', JSON.stringify(categories));
  localStorage.setItem('sbs_settings', JSON.stringify(settings));
  localStorage.setItem('sbs_orders', JSON.stringify([]));
  localStorage.setItem('sbs_customers', JSON.stringify([]));
  localStorage.setItem('sbs_seeded', '1');

  console.log('SBS Advertising demo data seeded.');
})();
