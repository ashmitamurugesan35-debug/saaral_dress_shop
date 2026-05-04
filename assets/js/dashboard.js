// =============================================
//   Saaral Dress Shop - Dashboard JavaScript
// =============================================

// --- Set today's date and greeting ---
var now = new Date();

document.getElementById('todayDate').textContent =
  now.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

var hour = now.getHours();
var greeting = "Good Morning!";
if (hour >= 12 && hour < 17) greeting = "Good Afternoon!";
else if (hour >= 17) greeting = "Good Evening!";
document.getElementById('greetMsg').textContent = greeting;


// --- Inventory Data ---
var inventory = [
  { name: 'Designer Saree',     cat: 'Sarees',              qty: 25, price: 3200 },
  { name: 'Chudi Material',     cat: 'Dress Materials',     qty: 40, price: 1200 },
  { name: 'Fancy Top',          cat: 'Tops',                qty: 12, price: 850  },
  { name: 'Anarkali Suit',      cat: 'Anarkali',            qty: 8,  price: 2500 },
  { name: 'Nighty',             cat: 'Nighties',            qty: 6,  price: 650  },
  { name: 'Blouse Lining',      cat: 'Blouse Materials',    qty: 14, price: 150  },
  { name: 'Gold Plated Bangle', cat: 'Imitation Jewellery', qty: 18, price: 450  },
  { name: 'Silk Dupatta',       cat: 'Sarees',              qty: 9,  price: 900  },
  { name: 'Cotton Kurti',       cat: 'Tops',                qty: 3,  price: 599  },
];


// --- Tailoring Orders Data ---
var tailorOrders = [
  { cust: 'Priya Sharma', phone: '9876543210', type: 'Blouse Stitching', date: '2026-05-03', notes: 'Round neck, sleeveless', advance: 200, status: 'progress'  },
  { cust: 'Meena Devi',   phone: '9123456780', type: 'Falls & Edging',   date: '2026-05-02', notes: '6-yard silk saree',    advance: 100, status: 'pending'   },
  { cust: 'Lakshmi R',    phone: '9988776655', type: 'Frock Stitching',  date: '2026-04-30', notes: 'Baby frock, pink',      advance: 300, status: 'done'      },
  { cust: 'Anita Kumari', phone: '9001122334', type: 'Kurti Alteration', date: '2026-05-05', notes: 'Shorten by 3 inches',  advance: 50,  status: 'delivered' },
  { cust: 'Radha S',      phone: '9445566778', type: 'Lining Work',      date: '2026-05-04', notes: '3 blouses',            advance: 150, status: 'pending'   },
];


// --- Stock Badge Helper ---
function stockBadge(qty) {
  if (qty === 0) return '<span class="badge-out">Out of Stock</span>';
  if (qty < 8)   return '<span class="badge-low">Low Stock</span>';
  return               '<span class="badge-ok">In Stock</span>';
}


// --- Render Inventory Table ---
function renderInventory(data, bodyId, showDelete) {
  var tbody = document.getElementById(bodyId);
  if (!tbody) return;

  if (data.length === 0) {
    tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:16px;color:#aaa;">No items found</td></tr>';
    return;
  }

  var html = '';
  for (var i = 0; i < data.length; i++) {
    var item = data[i];
    var deleteBtn = showDelete
      ? '<td><button onclick="deleteItem(' + i + ')" style="background:none;border:none;color:#c2185b;cursor:pointer;font-size:13px;">Delete</button></td>'
      : '';
    html += '<tr>';
    html += '<td><strong>' + item.name + '</strong></td>';
    html += '<td>' + item.cat + '</td>';
    html += '<td>' + item.qty + '</td>';
    html += '<td>Rs. ' + item.price.toLocaleString('en-IN') + '</td>';
    html += '<td>' + stockBadge(item.qty) + '</td>';
    html += deleteBtn;
    html += '</tr>';
  }
  tbody.innerHTML = html;
}


// --- Update Low Stock KPI ---
function updateLowStockKPI() {
  var count = 0;
  for (var i = 0; i < inventory.length; i++) {
    if (inventory[i].qty < 8) count++;
  }
  var el = document.getElementById('lowStockCount');
  if (el) el.textContent = count + ' items';
}


// --- Refresh All Inventory Views ---
function refreshAll() {
  renderInventory(inventory, 'inventoryBody', false);
  renderInventory(inventory, 'fullInventoryBody', true);
  renderJewellery();
  updateLowStockKPI();
}


// --- Delete Inventory Item ---
function deleteItem(idx) {
  var name = inventory[idx].name;
  inventory.splice(idx, 1);
  refreshAll();
  showToast('"' + name + '" removed from inventory.');
}


// --- Render Jewellery Section ---
function renderJewellery() {
  var tbody = document.getElementById('jewelleryBody');
  if (!tbody) return;

  var html = '';
  for (var i = 0; i < inventory.length; i++) {
    var item = inventory[i];
    if (item.cat === 'Imitation Jewellery') {
      html += '<tr>';
      html += '<td><strong>' + item.name + '</strong></td>';
      html += '<td>' + item.qty + '</td>';
      html += '<td>Rs. ' + item.price.toLocaleString('en-IN') + '</td>';
      html += '<td>' + stockBadge(item.qty) + '</td>';
      html += '</tr>';
    }
  }
  tbody.innerHTML = html || '<tr><td colspan="4" style="text-align:center;color:#aaa;padding:12px;">No jewellery items</td></tr>';
}


// --- Render Tailoring Orders ---
function renderTailorGrid() {
  var grid = document.getElementById('tailorGrid');
  if (!grid) return;

  var html = '';
  for (var i = 0; i < tailorOrders.length; i++) {
    var o = tailorOrders[i];
    html += '<div class="tailor-card">';
    html += '<h4>' + o.cust + '</h4>';
    html += '<p>Phone: ' + o.phone + '</p>';
    html += '<p>Work: ' + o.type + '</p>';
    html += '<p>Due: ' + o.date + '</p>';
    if (o.notes) html += '<p>Notes: ' + o.notes + '</p>';
    html += '<p>Advance: Rs. ' + o.advance + '</p>';
    html += '<select onchange="updateTailorStatus(' + i + ', this.value)">';
    html += '<option value="pending"'   + (o.status === 'pending'   ? ' selected' : '') + '>Pending</option>';
    html += '<option value="progress"'  + (o.status === 'progress'  ? ' selected' : '') + '>In Progress</option>';
    html += '<option value="done"'      + (o.status === 'done'      ? ' selected' : '') + '>Ready</option>';
    html += '<option value="delivered"' + (o.status === 'delivered' ? ' selected' : '') + '>Delivered</option>';
    html += '</select>';
    html += '</div>';
  }

  grid.innerHTML = html;

  // Update pending KPI
  var pending = 0;
  for (var j = 0; j < tailorOrders.length; j++) {
    if (tailorOrders[j].status !== 'delivered') pending++;
  }
  var kpiEl = document.getElementById('kpi-stitch');
  if (kpiEl) kpiEl.textContent = pending;
}


// --- Update Tailor Order Status ---
function updateTailorStatus(idx, val) {
  tailorOrders[idx].status = val;
  renderTailorGrid();
  showToast('Order for ' + tailorOrders[idx].cust + ' updated to "' + val + '".');
}


// --- Add Stock ---
function addStockItem() {
  var name  = document.getElementById('si-name').value.trim();
  var cat   = document.getElementById('si-cat').value;
  var qty   = parseInt(document.getElementById('si-qty').value) || 0;
  var price = parseInt(document.getElementById('si-price').value) || 0;

  if (!name || qty <= 0 || price <= 0) {
    showToast('Please fill all fields correctly.');
    return;
  }

  inventory.push({ name: name, cat: cat, qty: qty, price: price });
  refreshAll();
  closeModal('addStockModal');

  document.getElementById('si-name').value  = '';
  document.getElementById('si-qty').value   = '';
  document.getElementById('si-price').value = '';

  showToast('"' + name + '" added to inventory!');
}


// --- Search Inventory ---
function searchInventory(query) {
  if (!query) {
    renderInventory(inventory, 'inventoryBody', false);
    return;
  }
  var q = query.toLowerCase();
  var filtered = [];
  for (var i = 0; i < inventory.length; i++) {
    if (inventory[i].name.toLowerCase().includes(q) || inventory[i].cat.toLowerCase().includes(q)) {
      filtered.push(inventory[i]);
    }
  }
  renderInventory(filtered, 'inventoryBody', false);
}


// --- Bill Generator ---
function addBillRow() {
  var container = document.getElementById('billItems');
  var row = document.createElement('div');
  row.className = 'bill-row';
  row.innerHTML =
    '<input type="text" placeholder="Item name" class="bill-iname">' +
    '<input type="number" placeholder="Qty" class="bill-iqty" min="1" value="1">' +
    '<input type="number" placeholder="Price Rs." class="bill-iprice">';
  container.appendChild(row);
}

function generateBill() {
  var cust     = document.getElementById('bill-cust').value.trim() || 'Customer';
  var phone    = document.getElementById('bill-phone').value.trim() || '-';
  var discount = parseInt(document.getElementById('bill-discount').value) || 0;
  var rows     = document.querySelectorAll('.bill-row');

  var items = [];
  var total = 0;

  for (var i = 0; i < rows.length; i++) {
    var n = rows[i].querySelector('.bill-iname').value.trim();
    var q = parseInt(rows[i].querySelector('.bill-iqty').value) || 1;
    var p = parseInt(rows[i].querySelector('.bill-iprice').value) || 0;
    if (n && p) {
      items.push({ n: n, q: q, p: p });
      total += q * p;
    }
  }

  if (items.length === 0) {
    showToast('Please add at least one item.');
    return;
  }

  var net    = Math.max(0, total - discount);
  var billNo = 'SFH-' + Math.floor(1000 + Math.random() * 9000);
  var dateStr = now.toLocaleDateString('en-IN');

  var itemRows = '';
  for (var j = 0; j < items.length; j++) {
    itemRows += '<div class="bill-item"><span>' + items[j].n + ' x ' + items[j].q + '</span><span>Rs. ' + (items[j].q * items[j].p).toLocaleString('en-IN') + '</span></div>';
  }

  var discountRow = discount
    ? '<div class="bill-item" style="color:green;"><span>Discount</span><span>- Rs. ' + discount.toLocaleString('en-IN') + '</span></div>'
    : '';

  document.getElementById('billReceiptContent').innerHTML =
    '<h3>Saaral Dress Shop</h3>' +
    '<p style="text-align:center;font-size:12px;margin-bottom:10px;">Bill No: ' + billNo + ' | Date: ' + dateStr + '<br>Customer: ' + cust + ' | Ph: ' + phone + '</p>' +
    '<hr style="border-color:#f0c0d0;margin-bottom:8px;">' +
    itemRows +
    discountRow +
    '<div class="bill-total"><span>Total Payable</span><span>Rs. ' + net.toLocaleString('en-IN') + '</span></div>' +
    '<p style="text-align:center;font-size:11px;color:#888;margin-top:10px;">Thank you for shopping at Saaral!</p>';

  document.getElementById('billFormSection').style.display    = 'none';
  document.getElementById('billReceiptSection').style.display = 'block';

  // Update KPIs
  var salesEl = document.getElementById('kpi-sales');
  if (salesEl) {
    var cur = parseInt(salesEl.textContent.replace(/[^0-9]/g, '')) || 0;
    salesEl.textContent = 'Rs. ' + (cur + net).toLocaleString('en-IN');
  }
  var ordEl = document.getElementById('kpi-orders');
  if (ordEl) ordEl.textContent = parseInt(ordEl.textContent || 0) + 1;

  showToast('Bill ' + billNo + ' generated — Rs. ' + net.toLocaleString('en-IN'));
}

function resetBill() {
  document.getElementById('bill-cust').value     = '';
  document.getElementById('bill-phone').value    = '';
  document.getElementById('bill-discount').value = '0';

  document.getElementById('billItems').innerHTML =
    '<div class="bill-row">' +
    '<input type="text" placeholder="Item name" class="bill-iname">' +
    '<input type="number" placeholder="Qty" class="bill-iqty" min="1" value="1">' +
    '<input type="number" placeholder="Price Rs." class="bill-iprice">' +
    '</div>';

  document.getElementById('billFormSection').style.display    = 'block';
  document.getElementById('billReceiptSection').style.display = 'none';
}


// --- Add Tailoring Order ---
function addTailorOrder() {
  var cust    = document.getElementById('tc-name').value.trim();
  var phone   = document.getElementById('tc-phone').value.trim();
  var type    = document.getElementById('tc-type').value;
  var date    = document.getElementById('tc-date').value;
  var notes   = document.getElementById('tc-notes').value.trim();
  var advance = parseInt(document.getElementById('tc-advance').value) || 0;

  if (!cust || !date) {
    showToast('Please enter name and delivery date.');
    return;
  }

  tailorOrders.unshift({ cust: cust, phone: phone, type: type, date: date, notes: notes, advance: advance, status: 'pending' });
  renderTailorGrid();
  closeModal('tailorModal');

  document.getElementById('tc-name').value    = '';
  document.getElementById('tc-phone').value   = '';
  document.getElementById('tc-date').value    = '';
  document.getElementById('tc-notes').value   = '';
  document.getElementById('tc-advance').value = '';

  showToast('Tailoring order for ' + cust + ' added!');
}


// --- Section Navigation ---
function showSection(name) {
  var sections = ['overview', 'inventory', 'tailoring', 'jewellery', 'reports'];

  for (var i = 0; i < sections.length; i++) {
    var sec = document.getElementById('section-' + sections[i]);
    var nav = document.getElementById('nav-' + sections[i]);
    if (sec) sec.style.display = (sections[i] === name) ? 'block' : 'none';
    if (nav) {
      if (sections[i] === name) nav.classList.add('active');
      else nav.classList.remove('active');
    }
  }

  var titles = {
    overview:  'Overview',
    inventory: 'Inventory',
    tailoring: 'Tailoring Orders',
    jewellery: 'Imitation Jewellery',
    reports:   'Sales Reports'
  };
  document.getElementById('sectionTitle').textContent = titles[name] || name;

  if (name === 'tailoring') renderTailorGrid();
  window.scrollTo(0, 0);

  // Prevent default link behavior
  return false;
}


// --- Modal Open/Close ---
function openModal(id) {
  document.getElementById(id).style.display = 'flex';
}

function closeModal(id) {
  document.getElementById(id).style.display = 'none';
}

// Close modal when clicking outside the box
var overlays = document.querySelectorAll('.modal-overlay');
for (var i = 0; i < overlays.length; i++) {
  overlays[i].addEventListener('click', function(e) {
    if (e.target === this) {
      this.style.display = 'none';
    }
  });
}


// --- Toast Notification ---
function showToast(msg) {
  var area  = document.getElementById('toastArea');
  var toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = '<span style="flex:1">' + msg + '</span><button onclick="this.parentElement.remove()">X</button>';
  area.appendChild(toast);
  setTimeout(function() {
    if (toast.parentElement) toast.remove();
  }, 4000);
}


// --- Init on Page Load ---
refreshAll();


