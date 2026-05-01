/* ═══════════════════════════════════════════════════
   Saaral Fashion Hub — Dashboard JS
═══════════════════════════════════════════════════ */

// ── MOBILE SIDEBAR DRAWER ──────────────────────────
function toggleSidebar() {
  document.querySelector('.sidebar').classList.toggle('open');
  document.getElementById('sidebarOverlay').classList.toggle('open');
}
function closeSidebar() {
  document.querySelector('.sidebar').classList.remove('open');
  document.getElementById('sidebarOverlay').classList.remove('open');
}

// ── FASHION QUOTES TICKER ──────────────────────────
const fashionQuotes = [
  '👗 "A great saree never goes out of style!"',
  '💖 "Dress like you\'re already famous 🌟"',
  '🥻 "Sarees — where tradition meets grace"',
  '✨ "Your outfit is the first hello 👋"',
  '🌸 "Wear your confidence like a blouse 💪"',
  '💎 "Elegance is the only beauty that never fades"',
  '🎀 "Life is too short to wear boring clothes!"',
  '🌺 "Every saree tells a story — what\'s yours?"',
  '👑 "A woman in a saree is royalty 👸"',
  '🪷 "Fashion is art, and you are the canvas"',
];

function buildTicker() {
  const inner = document.getElementById('tickerInner');
  if (!inner) return;
  // Duplicate for seamless loop
  const all = [...fashionQuotes, ...fashionQuotes];
  inner.innerHTML = all.map(q => `<span>${q}</span>`).join('');
}

// ── DAILY DEAL OFFERS ──────────────────────────────
const allDeals = [
  { emoji:'🥻', name:'Designer Sarees',    desc:'Authentic silk & cotton weaves', off:'25% OFF', orig:'From ₹4,000', new:'₹3,000' },
  { emoji:'✂️', name:'Blouse Stitching',   desc:'Expert tailoring, ready in 3 days', off:'₹100 OFF', orig:'₹600', new:'₹500' },
  { emoji:'💍', name:'Imitation Jewellery',desc:'Gold-plated bangles & necklaces', off:'Buy 2 Get 1', orig:'₹450 each', new:'Free 3rd piece' },
  { emoji:'👚', name:'Fancy Tops & Kurtis',desc:'Latest trendy designs in stock', off:'15% OFF', orig:'From ₹1,000', new:'₹850' },
  { emoji:'🌸', name:'Chudi Material',     desc:'Pure cotton & georgette sets', off:'10% OFF', orig:'₹1,200', new:'₹1,080' },
  { emoji:'🌙', name:'Nighties & Homewear',desc:'Comfortable everyday wear', off:'Buy 2 Get 10%', orig:'₹700', new:'Save ₹140' },
];

// Pick 4 deals rotating by day-of-week
function getDailyDeals() {
  const day = new Date().getDay(); // 0–6
  const start = day % (allDeals.length - 3);
  return allDeals.slice(start, start + 4).concat(allDeals.slice(0, Math.max(0, 4 - (allDeals.length - start))));
}

function buildDailyDeals() {
  const grid = document.getElementById('dailyDealsGrid');
  const dateEl = document.getElementById('dealDate');
  if (!grid) return;
  if (dateEl) dateEl.textContent = '🗓️ Updated: ' + new Date().toLocaleDateString('en-IN', { day:'numeric', month:'short' });
  const deals = getDailyDeals().slice(0, 4);
  grid.innerHTML = deals.map(d => `
    <div class="deal-card">
      <span class="deal-emoji">${d.emoji}</span>
      <div class="deal-name">${d.name}</div>
      <div class="deal-desc">${d.desc}</div>
      <div class="deal-discount-pill">${d.off}</div>
      <div class="deal-original">${d.orig}</div>
    </div>
  `).join('');
}

// ── OFFER COUNTDOWN ────────────────────────────────
function buildCountdown() {
  const el = document.getElementById('offerCountdown');
  if (!el) return;
  const saleEnd = new Date('2026-05-03T23:59:59');
  function update() {
    const diff = saleEnd - new Date();
    if (diff <= 0) { el.innerHTML = '<span style="color:#fff;font-weight:700;">🎉 Sale Ended!</span>'; return; }
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    el.innerHTML = [
      { n: d, l: 'Days' },
      { n: h, l: 'Hrs' },
      { n: m, l: 'Min' },
      { n: s, l: 'Sec' },
    ].map(x => `<div class="countdown-box"><div class="cd-num">${String(x.n).padStart(2,'0')}</div><div class="cd-lbl">${x.l}</div></div>`).join('');
  }
  update();
  setInterval(update, 1000);
}


const now = new Date();
document.getElementById('todayDate').textContent =
  now.toLocaleDateString('en-IN', { weekday:'long', year:'numeric', month:'long', day:'numeric' });

const hour = now.getHours();
let greet = hour < 12 ? 'Good Morning! 🌸' : hour < 17 ? 'Good Afternoon! ☀️' : 'Good Evening! 🌙';
const gEl = document.getElementById('greetMsg');
if (gEl) gEl.textContent = greet;

// ── INVENTORY DATA ─────────────────────────────────
let inventory = [
  { name:'Designer Saree',      cat:'Sarees',              qty:25, price:3200 },
  { name:'Chudi Material',      cat:'Dress Materials',     qty:40, price:1200 },
  { name:'Fancy Top',           cat:'Tops',                qty:12, price:850  },
  { name:'Anarkali Suit',       cat:'Anarkali',            qty:8,  price:2500 },
  { name:'Nighty',              cat:'Nighties',            qty:6,  price:650  },
  { name:'Blouse Lining/Falls', cat:'Blouse Materials',    qty:14, price:150  },
  { name:'Gold Plated Bangle',  cat:'Imitation Jewellery', qty:18, price:450  },
  { name:'Silk Dupatta',        cat:'Sarees',              qty:9,  price:900  },
  { name:'Cotton Kurti',        cat:'Tops',                qty:3,  price:599  },
];

// ── TAILORING DATA ─────────────────────────────────
let tailorOrders = [
  { cust:'Priya Sharma',   phone:'9876543210', type:'Blouse Stitching', date:'2026-05-03', notes:'Round neck, sleeveless', advance:200,  status:'progress'  },
  { cust:'Meena Devi',     phone:'9123456780', type:'Falls & Edging',   date:'2026-05-02', notes:'6-yard silk saree',     advance:100,  status:'pending'   },
  { cust:'Lakshmi R',      phone:'9988776655', type:'Frock Stitching',  date:'2026-04-30', notes:'Baby frock, pink',       advance:300,  status:'done'      },
  { cust:'Anita Kumari',   phone:'9001122334', type:'Kurti Alteration', date:'2026-05-05', notes:'Shorten by 3 inches',   advance:50,   status:'delivered' },
  { cust:'Radha S',        phone:'9445566778', type:'Lining Work',      date:'2026-05-04', notes:'3 blouses',             advance:150,  status:'pending'   },
];

// ── STOCK BADGE ─────────────────────────────────────
function stockBadge(qty) {
  if (qty === 0)  return '<span class="badge-stock badge-out">Out of Stock</span>';
  if (qty < 8)    return '<span class="badge-stock badge-low">Low Stock</span>';
  return              '<span class="badge-stock badge-ok">In Stock</span>';
}

// ── RENDER INVENTORY ────────────────────────────────
function renderInventory(data, bodyId, showAction) {
  const tbody = document.getElementById(bodyId);
  if (!tbody) return;
  tbody.innerHTML = '';
  if (!data.length) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;color:var(--muted);padding:20px;">No items found</td></tr>`;
    return;
  }
  data.forEach((item, idx) => {
    const del = showAction
      ? `<td><button onclick="deleteItem(${idx})" style="background:none;border:none;color:#c2185b;cursor:pointer;font-size:13px;"><i class="fa fa-trash"></i></button></td>`
      : '';
    tbody.innerHTML += `<tr>
      <td><strong>${item.name}</strong></td>
      <td>${item.cat}</td>
      <td>${item.qty}</td>
      <td>₹${item.price.toLocaleString('en-IN')}</td>
      <td>${stockBadge(item.qty)}</td>
      ${del}
    </tr>`;
  });
}

function refreshAllInventory() {
  renderInventory(inventory, 'inventoryBody', false);
  renderInventory(inventory, 'fullInventoryBody', true);
  renderJewellery();
  updateLowStockKPI();
}

function updateLowStockKPI() {
  const low = inventory.filter(i => i.qty < 8).length;
  const el = document.getElementById('lowStockCount');
  if (el) el.textContent = low + ' items';
}

function deleteItem(idx) {
  const item = inventory[idx];
  inventory.splice(idx, 1);
  refreshAllInventory();
  showToast('🗑️', `"${item.name}" removed from inventory.`, 'warning');
}

// ── JEWELLERY ───────────────────────────────────────
function renderJewellery() {
  const tbody = document.getElementById('jewelleryBody');
  if (!tbody) return;
  const jewels = inventory.filter(i => i.cat === 'Imitation Jewellery');
  tbody.innerHTML = jewels.map(j => `<tr>
    <td><strong>${j.name}</strong></td>
    <td>${j.qty}</td>
    <td>₹${j.price.toLocaleString('en-IN')}</td>
    <td>${stockBadge(j.qty)}</td>
  </tr>`).join('');
}

// ── TAILORING TRACKER ───────────────────────────────
function renderTailorGrid() {
  const grid = document.getElementById('tailorGrid');
  if (!grid) return;
  const labels = { pending:'Pending', progress:'In Progress', done:'Ready', delivered:'Delivered' };
  const cls    = { pending:'status-pending', progress:'status-progress', done:'status-done', delivered:'status-delivered' };
  grid.innerHTML = tailorOrders.map((o, i) => `
    <div class="tailor-card">
      <h6>${o.cust}</h6>
      <small><i class="fa fa-phone me-1"></i>${o.phone}</small><br>
      <small><i class="fa fa-cut me-1"></i>${o.type}</small><br>
      <small><i class="fa fa-calendar me-1"></i>Due: ${o.date}</small>
      ${o.notes ? `<p style="font-size:11.5px;color:var(--muted);margin-top:6px;">${o.notes}</p>` : ''}
      <div class="tailor-meta">
        <small style="color:var(--pk);font-weight:600;">Advance: ₹${o.advance}</small>
        <select class="status-badge ${cls[o.status]}" onchange="updateTailorStatus(${i}, this.value)" style="border:none;cursor:pointer;font-family:'Poppins',sans-serif;font-size:11px;">
          <option value="pending"   ${o.status==='pending'   ?'selected':''}>Pending</option>
          <option value="progress"  ${o.status==='progress'  ?'selected':''}>In Progress</option>
          <option value="done"      ${o.status==='done'      ?'selected':''}>Ready</option>
          <option value="delivered" ${o.status==='delivered' ?'selected':''}>Delivered</option>
        </select>
      </div>
    </div>
  `).join('');

  // Update pending KPI
  const pending = tailorOrders.filter(o => o.status !== 'delivered').length;
  const kpiEl = document.getElementById('kpi-stitch');
  if (kpiEl) kpiEl.textContent = pending;
}

function updateTailorStatus(idx, val) {
  tailorOrders[idx].status = val;
  renderTailorGrid();
  showToast('✂️', `Order for ${tailorOrders[idx].cust} marked as "${val}".`);
}

// ── ADD STOCK ───────────────────────────────────────
function addStockItem() {
  const name  = document.getElementById('si-name').value.trim();
  const cat   = document.getElementById('si-cat').value;
  const qty   = parseInt(document.getElementById('si-qty').value) || 0;
  const price = parseInt(document.getElementById('si-price').value) || 0;
  if (!name || qty <= 0 || price <= 0) {
    showToast('⚠️', 'Please fill all fields correctly.', 'warning'); return;
  }
  inventory.push({ name, cat, qty, price });
  refreshAllInventory();
  closeModal('addStockModal');
  document.getElementById('si-name').value = '';
  document.getElementById('si-qty').value  = '';
  document.getElementById('si-price').value = '';
  showToast('✅', `"${name}" added to inventory!`);
}

// ── SEARCH ──────────────────────────────────────────
function searchInventory(q) {
  const filtered = q
    ? inventory.filter(i =>
        i.name.toLowerCase().includes(q.toLowerCase()) ||
        i.cat.toLowerCase().includes(q.toLowerCase()))
    : inventory;
  renderInventory(filtered, 'inventoryBody', false);
}

// ── BILL GENERATOR ──────────────────────────────────
function addBillRow() {
  const row = document.createElement('div');
  row.className = 'form-row bill-item-row';
  row.style.marginBottom = '10px';
  row.innerHTML = `
    <div class="form-group" style="margin:0"><input type="text" placeholder="Item name" class="bill-iname"></div>
    <div class="form-group" style="margin:0"><input type="number" placeholder="Qty" class="bill-iqty" min="1" value="1"></div>
    <div class="form-group" style="margin:0"><input type="number" placeholder="Price ₹" class="bill-iprice"></div>
  `;
  document.getElementById('billItems').appendChild(row);
}

function generateBill() {
  const cust     = document.getElementById('bill-cust').value.trim() || 'Customer';
  const phone    = document.getElementById('bill-phone').value.trim() || '—';
  const discount = parseInt(document.getElementById('bill-discount').value) || 0;
  const rows     = document.querySelectorAll('.bill-item-row');
  let items = [], total = 0;

  rows.forEach(r => {
    const n = r.querySelector('.bill-iname').value.trim();
    const q = parseInt(r.querySelector('.bill-iqty').value) || 1;
    const p = parseInt(r.querySelector('.bill-iprice').value) || 0;
    if (n && p) { items.push({ n, q, p }); total += q * p; }
  });

  if (!items.length) { showToast('⚠️', 'Add at least one item.', 'warning'); return; }

  const net    = Math.max(0, total - discount);
  const billNo = 'SFH-' + Math.floor(1000 + Math.random() * 9000);
  const dateStr = now.toLocaleDateString('en-IN');

  let itemRows = items.map(i =>
    `<div class="bill-item"><span>${i.n} × ${i.q}</span><span>₹${(i.q * i.p).toLocaleString('en-IN')}</span></div>`
  ).join('');

  document.getElementById('billReceiptContent').innerHTML = `
    <div class="bill-header">
      <h3>Saaral Fashion Hub</h3>
      <small>Bill No: ${billNo} &nbsp;|&nbsp; Date: ${dateStr}</small><br>
      <small>Customer: <strong>${cust}</strong> &nbsp;|&nbsp; Ph: ${phone}</small>
    </div>
    ${itemRows}
    ${discount ? `<div class="bill-item" style="color:green;"><span>Discount</span><span>- ₹${discount.toLocaleString('en-IN')}</span></div>` : ''}
    <div class="bill-total"><span>Total Payable</span><span>₹${net.toLocaleString('en-IN')}</span></div>
    <p style="text-align:center;margin-top:12px;font-size:11.5px;color:var(--muted);">Thank you for shopping at Saaral! 🌸</p>
  `;

  document.getElementById('billFormSection').style.display  = 'none';
  document.getElementById('billReceiptSection').style.display = 'block';

  // Update KPIs
  const salesEl = document.getElementById('kpi-sales');
  if (salesEl) {
    const cur = parseInt(salesEl.textContent.replace(/[^\d]/g,'')) || 0;
    salesEl.textContent = '₹' + (cur + net).toLocaleString('en-IN');
  }
  const ordEl = document.getElementById('kpi-orders');
  if (ordEl) ordEl.textContent = parseInt(ordEl.textContent || 0) + 1;

  showToast('🧾', `Bill ${billNo} generated for ₹${net.toLocaleString('en-IN')}`);
}

function resetBill() {
  document.getElementById('bill-cust').value = '';
  document.getElementById('bill-phone').value = '';
  document.getElementById('bill-discount').value = '0';
  const billItems = document.getElementById('billItems');
  billItems.innerHTML = `<div class="form-row bill-item-row" style="margin-bottom:10px;">
    <div class="form-group" style="margin:0"><input type="text" placeholder="Item name" class="bill-iname"></div>
    <div class="form-group" style="margin:0"><input type="number" placeholder="Qty" class="bill-iqty" min="1" value="1"></div>
    <div class="form-group" style="margin:0"><input type="number" placeholder="Price ₹" class="bill-iprice"></div>
  </div>`;
  document.getElementById('billFormSection').style.display   = 'block';
  document.getElementById('billReceiptSection').style.display = 'none';
}

// ── ADD TAILOR ORDER ────────────────────────────────
function addTailorOrder() {
  const cust    = document.getElementById('tc-name').value.trim();
  const phone   = document.getElementById('tc-phone').value.trim();
  const type    = document.getElementById('tc-type').value;
  const date    = document.getElementById('tc-date').value;
  const notes   = document.getElementById('tc-notes').value.trim();
  const advance = parseInt(document.getElementById('tc-advance').value) || 0;
  if (!cust || !date) { showToast('⚠️', 'Please fill name and delivery date.', 'warning'); return; }
  tailorOrders.unshift({ cust, phone, type, date, notes, advance, status:'pending' });
  renderTailorGrid();
  closeModal('tailorModal');
  ['tc-name','tc-phone','tc-date','tc-notes','tc-advance'].forEach(id => document.getElementById(id).value = '');
  showToast('✂️', `Tailoring order for ${cust} added!`);
}

// ── SECTION NAV ─────────────────────────────────────
function showSection(name) {
  ['overview','inventory','tailoring','jewellery','reports'].forEach(s => {
    document.getElementById('section-' + s).style.display = (s === name) ? 'block' : 'none';
    const nav = document.getElementById('nav-' + s);
    if (nav) nav.classList.toggle('active', s === name);
  });
  const titles = { overview:'Overview', inventory:'Inventory', tailoring:'Tailoring Orders', jewellery:'Imitation Jewellery', reports:'Sales Reports' };
  document.getElementById('sectionTitle').textContent = titles[name] || name;
  if (name === 'tailoring') renderTailorGrid();
  if (name === 'reports')   renderReportCharts();
  closeSidebar(); // auto-close on mobile
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ── MODAL HELPERS ───────────────────────────────────
function openModal(id)  { document.getElementById(id).style.display = 'flex'; }
function closeModal(id) { document.getElementById(id).style.display = 'none'; }

// Close modal on overlay click
document.querySelectorAll('.modal-overlay').forEach(el => {
  el.addEventListener('click', e => { if (e.target === el) el.style.display = 'none'; });
});

// ── TOAST ───────────────────────────────────────────
function showToast(icon, msg, type) {
  const area  = document.getElementById('toastArea');
  const toast = document.createElement('div');
  toast.className = 'toast';
  if (type === 'warning') toast.style.borderColor = '#ff9800';
  toast.innerHTML = `<span class="toast-icon">${icon}</span><span style="flex:1">${msg}</span><button class="toast-close" onclick="this.closest('.toast').remove()">✕</button>`;
  area.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('removing');
    setTimeout(() => toast.remove(), 320);
  }, 4000);
}

// ── NOTIFICATIONS ───────────────────────────────────
function buildNotifications() {
  const alerts = [];
  inventory.forEach(i => {
    if (i.qty === 0) alerts.push({ icon:'fa-times-circle', msg:`<strong>${i.name}</strong> is out of stock!` });
    else if (i.qty < 8) alerts.push({ icon:'fa-exclamation-triangle', msg:`<strong>${i.name}</strong> has only ${i.qty} left.` });
  });
  tailorOrders.filter(o => o.status === 'done').forEach(o =>
    alerts.push({ icon:'fa-check-circle', msg:`<strong>${o.cust}'s</strong> ${o.type} is ready for pickup.` })
  );

  const list = document.getElementById('notifList');
  const badge = document.getElementById('notifCount');
  if (!list) return;
  list.innerHTML = alerts.length
    ? alerts.map(a => `<div class="notif-item"><i class="fa ${a.icon}"></i><span>${a.msg}</span></div>`).join('')
    : `<div class="notif-empty">No new notifications 🎉</div>`;
  if (badge) badge.textContent = alerts.length;
}

function toggleNotifPanel() {
  const panel = document.getElementById('notifPanel');
  panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
}

document.addEventListener('click', e => {
  const panel = document.getElementById('notifPanel');
  const btn   = document.getElementById('notifBtn');
  if (panel && !panel.contains(e.target) && btn && !btn.contains(e.target))
    panel.style.display = 'none';
});

// ── CHARTS ──────────────────────────────────────────
function renderMainCharts() {
  const catTotals = {};
  inventory.forEach(i => { catTotals[i.cat] = (catTotals[i.cat] || 0) + i.qty; });
  const cats    = Object.keys(catTotals);
  const qtys    = cats.map(c => catTotals[c]);
  const palette = ['#c2185b','#e91e8c','#f06292','#f48fb1','#fce4ec','#ad1457','#880e4f','#ff80ab'];

  new Chart(document.getElementById('categoryDoughnut'), {
    type: 'doughnut',
    data: { labels: cats, datasets: [{ data: qtys, backgroundColor: palette, hoverOffset: 8, borderRadius: 6 }] },
    options: { plugins: { legend: { position: 'bottom', labels: { font: { family: 'Poppins', size: 11 } } } }, cutout: '62%' }
  });

  const lineGrad = ctx => {
    const g = ctx.chart.ctx.createLinearGradient(0, 0, 0, 220);
    g.addColorStop(0, 'rgba(194,24,91,0.28)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    return g;
  };

  new Chart(document.getElementById('weeklyRevenue'), {
    type: 'line',
    data: {
      labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
      datasets: [{
        label: 'Revenue (₹)',
        data: [5200, 7400, 6800, 9200, 11000, 9800, 45200],
        tension: 0.38, borderColor: '#c2185b',
        backgroundColor: lineGrad, pointRadius: 5,
        pointBackgroundColor: '#c2185b', fill: true
      }]
    },
    options: {
      plugins: { legend: { display: false } },
      scales: { y: { ticks: { callback: v => '₹' + v.toLocaleString('en-IN'), font: { family: 'Poppins' } } } }
    }
  });
}

let reportChartsBuilt = false;
function renderReportCharts() {
  if (reportChartsBuilt) return;
  reportChartsBuilt = true;

  const catTotals = {};
  inventory.forEach(i => { catTotals[i.cat] = (catTotals[i.cat] || 0) + i.qty; });
  const palette = ['#c2185b','#e91e8c','#f06292','#f48fb1','#fce4ec','#ad1457','#880e4f','#ff80ab'];

  new Chart(document.getElementById('reportDoughnut'), {
    type: 'doughnut',
    data: { labels: Object.keys(catTotals), datasets: [{ data: Object.values(catTotals), backgroundColor: palette, borderRadius: 6, hoverOffset: 8 }] },
    options: { plugins: { legend: { position: 'bottom', labels: { font: { family: 'Poppins', size: 11 } } } }, cutout: '60%' }
  });

  new Chart(document.getElementById('monthlyRevenue'), {
    type: 'bar',
    data: {
      labels: ['Nov','Dec','Jan','Feb','Mar','Apr'],
      datasets: [{
        label: 'Revenue (₹)',
        data: [82000, 115000, 97000, 134000, 108000, 142000],
        backgroundColor: palette[0], borderRadius: 8
      }]
    },
    options: {
      plugins: { legend: { display: false } },
      scales: { y: { ticks: { callback: v => '₹' + (v/1000) + 'k', font: { family: 'Poppins' } } } }
    }
  });
}

// ── INIT ────────────────────────────────────────────
(function init() {
  refreshAllInventory();
  renderMainCharts();
  buildNotifications();
  buildTicker();
  buildDailyDeals();
  buildCountdown();

  // Startup toasts
  const lowItems = inventory.filter(i => i.qty < 8);
  if (lowItems.length)
    showToast('⚠️', `${lowItems.length} item(s) running low on stock!`, 'warning');

  const readyOrders = tailorOrders.filter(o => o.status === 'done');
  if (readyOrders.length)
    showToast('✂️', `${readyOrders.length} tailoring order(s) ready for pickup!`);
})();
