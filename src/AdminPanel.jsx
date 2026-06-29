import { useState, useEffect, useRef, useCallback } from "react";

/* ─── seed data matching SareeStore's PRODUCTS ─── */
const INIT_PRODUCTS = [
  { id: 1,  name: "Kanchi Crimson Kanjivaram",    fabric: "Pure mulberry silk · Kanchipuram",     price: 12499, old: 15999, rating: 4.8, reviews: 124, stock: 14, occasion: "Bridal",  tags: ["Pure silk","Zari border","Bridal"],    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlU5Ui1aSWgF4BnPRMM9mqF3xDEQ9q7un2atwNuUtV4w&s=10" },
  { id: 2,  name: "Banaras Emerald Weave",         fabric: "Katan silk · Varanasi",               price: 15999, old: 19499, rating: 4.7, reviews: 89,  stock: 7,  occasion: "Festive",  tags: ["Handloom","Jacquard","Festive"],        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrJR9-BKBhIb-KjHlWkcCoT9CXzfc422HS7qQelXSB_Q&s=10" },
  { id: 3,  name: "Mysore Royal Blue",             fabric: "Mysore silk · Karnataka",             price: 9499,  old: 11999, rating: 4.6, reviews: 67,  stock: 22, occasion: "Casual",   tags: ["Lightweight","Everyday silk"],          img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVIaUYMIwSKiVcqDQ2tCU7orE-nNslPyITZHSIqFEm0w&s=10" },
  { id: 4,  name: "Chanderi Ivory Blossom",        fabric: "Chanderi cotton-silk · Madhya Pradesh",price: 4299, old: 5499,  rating: 4.5, reviews: 203, stock: 31, occasion: "Casual",   tags: ["Cotton-silk","Block print","Summer"],   img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOpBEOAXSmb0hmrxDklTcvfSWKdVZT5hDGVixduw763A&s" },
  { id: 5,  name: "Patola Sunset Ikat",            fabric: "Double ikat silk · Patan",            price: 18999, old: 23999, rating: 4.9, reviews: 41,  stock: 3,  occasion: "Festive",  tags: ["Double ikat","Heirloom","Limited"],     img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCUBjdi18WFyTpejxpzCC5W7SF-ykOZCtC1CvVp6GX3Q&s=10" },
  { id: 6,  name: "Tussar Earthen Gold",           fabric: "Tussar silk · Bhagalpur",            price: 7799,  old: 9299,  rating: 4.4, reviews: 156, stock: 18, occasion: "Office",   tags: ["Wild silk","Textured","Office wear"],   img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLuoj-3t3DWSbDX3iofOakELXD8rjXrLyQHR0UMjfotA&s=10" },
  { id: 7,  name: "Organza Blush Pearl",           fabric: "Pure organza · Surat",               price: 6499,  old: 7999,  rating: 4.6, reviews: 78,  stock: 9,  occasion: "Party",    tags: ["Sheer drape","Embroidered","Party"],    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQODm1cwEpiB0nOYltpvNOCOXaO99n7z1ud4JqrJ3YemQ&s=10" },
  { id: 8,  name: "Paithani Peacock Teal",         fabric: "Paithani silk · Maharashtra",         price: 16499, old: 20999, rating: 4.8, reviews: 93,  stock: 5,  occasion: "Festive",  tags: ["Peacock motif","Heritage"],             img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNTgKoBmfUYo_HBcmxlIjBpCnyBMuydVV92zkoa3iJQw&s" },
  { id: 9,  name: "Linen Maroon Stripe",           fabric: "Pure linen · Bengal",                price: 3999,  old: 4999,  rating: 4.3, reviews: 312, stock: 44, occasion: "Casual",   tags: ["Pure linen","Breathable","Casual"],     img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF2d9jNHJ5i0ytSmrlDaznCpy00tcKG1PPl4bfjRYVBw&s=10" },
  { id: 10, name: "Soft Silk Coral Bloom",         fabric: "Soft silk · Bangalore",              price: 5999,  old: 7499,  rating: 4.5, reviews: 58,  stock: 12, occasion: "Festive",  tags: ["Soft silk","Lightweight","Festive"],    img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcR3w2dhsjyW0SAnWPP08FS4MroE3oxtYw5KUbX1RRSmhnQ1s2FN-aPoGRDqvD8TdMhqMdnjmjgoIhWgS_CpwsmDKxzgNmn_quu2txuMhyU0Mh0BM1Ghkp-T4Q&usqp=CAc" },
  { id: 11, name: "Georgette Midnight Sapphire",   fabric: "Pure georgette · Surat",             price: 6999,  old: 8999,  rating: 4.6, reviews: 47,  stock: 15, occasion: "Party",    tags: ["Sequin work","Flowy drape","Party"],    img: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRy7s1svpNkFR6vfZh4K04d_vG6XZPp0QWQFqU-h1wfOJp5IETkJvwRjdals3A8pEEA1-hz0Vr8VRBIS--zClVGOhbPzeVLsW2Wdo8Wlxxpns9xJL9jNFGJ&usqp=CAc" },
  { id: 12, name: "Banarasi Rani Pink",            fabric: "Banarasi silk · Varanasi",            price: 13999, old: 17999, rating: 4.8, reviews: 102, stock: 6,  occasion: "Bridal",   tags: ["Zari weave","Heirloom","Bridal"],       img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQ7ENkWIBbgHKx-Lp9k6_LHZRG9Uu7b6jAp8BtUXIHMSbUNXSbnOv5M8NPrAS4dDN9ZPwZ9gL7-HAsvYNi4pkMAAqV7I2ZD5T5HkciQozPx4AIJL_6HazNcaQ&usqp=CAc" },
];

const INIT_ORDERS = [
  { id: "ORD-0041", customer: "Priya Sharma",    product: "Kanchi Crimson Kanjivaram",  amount: 12499, status: "Delivered",  date: "22 Jun 2026" },
  { id: "ORD-0040", customer: "Meena Reddy",     product: "Patola Sunset Ikat",         amount: 18999, status: "Shipped",    date: "23 Jun 2026" },
  { id: "ORD-0039", customer: "Anita Rao",       product: "Banarasi Rani Pink",         amount: 13999, status: "Processing", date: "24 Jun 2026" },
  { id: "ORD-0038", customer: "Kavitha Iyer",    product: "Paithani Peacock Teal",      amount: 16499, status: "Delivered",  date: "21 Jun 2026" },
  { id: "ORD-0037", customer: "Sunita Pillai",   product: "Banaras Emerald Weave",      amount: 15999, status: "Cancelled",  date: "20 Jun 2026" },
  { id: "ORD-0036", customer: "Radha Krishnan",  product: "Organza Blush Pearl",        amount: 6499,  status: "Delivered",  date: "19 Jun 2026" },
  { id: "ORD-0035", customer: "Deepa Nair",      product: "Chanderi Ivory Blossom",     amount: 4299,  status: "Shipped",    date: "24 Jun 2026" },
  { id: "ORD-0034", customer: "Lakshmi Menon",   product: "Kanjivaram Sandal Gold",     amount: 14999, status: "Processing", date: "25 Jun 2026" },
];

const INIT_WEAVERS = [
  { id: 1, name: "Ravi Shankar", region: "Kanchipuram", specialty: "Kanjivaram silk", products: 4, status: "Active",   joined: "Jan 2022" },
  { id: 2, name: "Abdul Karim",  region: "Varanasi",    specialty: "Banarasi weave",  products: 3, status: "Active",   joined: "Mar 2021" },
  { id: 3, name: "Gopal Das",    region: "Patan",       specialty: "Patola ikat",     products: 1, status: "Active",   joined: "Aug 2023" },
  { id: 4, name: "Murugan K.",   region: "Kanchipuram", specialty: "Silk zari",       products: 2, status: "On Leave", joined: "Dec 2020" },
  { id: 5, name: "Fatima Bi",    region: "Bhagalpur",   specialty: "Tussar silk",     products: 2, status: "Active",   joined: "May 2022" },
];

const MONTHLY = [
  { m: "Jan", rev: 142000, orders: 18 }, { m: "Feb", rev: 198000, orders: 24 },
  { m: "Mar", rev: 175000, orders: 21 }, { m: "Apr", rev: 220000, orders: 28 },
  { m: "May", rev: 260000, orders: 33 }, { m: "Jun", rev: 310000, orders: 41 },
];

const fmtMoney = (n) => "₹" + Math.round(n).toLocaleString("en-IN");

/* ── animated count-up hook for rich, realistic number reveals ── */
function useCountUp(target, duration = 1100) {
  const [val, setVal] = useState(0);
  const prevTarget = useRef(target);
  useEffect(() => {
    let raf;
    let startTime = null;
    const from = 0;
    function step(ts) {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setVal(from + (target - from) * eased);
      if (progress < 1) raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    prevTarget.current = target;
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);
  return val;
}

function StatValue({ value, money = false }) {
  const animated = useCountUp(value);
  return <>{money ? fmtMoney(animated) : Math.round(animated).toLocaleString("en-IN")}</>;
}

/* ═══════════════════════════════════════════════════════════ ADMIN PANEL ═══ */
export default function AdminPanel({ onLogout }) {
  const [tab, setTab]           = useState("dashboard");
  const [products, setProducts] = useState(INIT_PRODUCTS);
  const [orders, setOrders]     = useState(INIT_ORDERS);
  const [weavers, setWeavers]   = useState(INIT_WEAVERS);
  const [toast, setToast]       = useState(null);
  const [addOpen, setAddOpen]   = useState(false);
  const [editProd, setEditProd] = useState(null);
  const [delConfirm, setDelConfirm] = useState(null);
  const [search, setSearch]     = useState("");
  const [orderFilter, setOrderFilter] = useState("All");



  function showToast(msg, type = "ok") {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2800);
  }

  /* ── product CRUD ── */
  async function saveProduct(data) {
    if (data.id) {
      // ── EDIT: update locally + call backend PUT ──
      setProducts(ps => ps.map(p => p.id === data.id ? { ...p, ...data } : p));
      try {
        await fetch(`https://weavers-backend.onrender.com/products/${data.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: data.name,
            price: parseInt(data.price),
            image: data.img,
            description: data.desc || "",
            category: data.occasion || "",
          }),
        });
      } catch (err) {
        console.warn("Backend update failed (running locally):", err.message);
      }
      showToast("Product updated successfully!");
    } else {
      // ── ADD: call backend POST /add-product ──
      const newP = { ...data, id: Date.now(), rating: 4.5, reviews: 0, stock: parseInt(data.stock) || 10 };
      setProducts(ps => [...ps, newP]);
      try {
        const res = await fetch("https://weavers-backend.onrender.com/add-product", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: data.name,
            price: parseInt(data.price),
            image: data.img,
            description: data.desc || "",
            category: data.occasion || "",
          }),
        });
        const result = await res.json();
        if (result.success) {
          showToast("✅ Product saved to database!");
        } else {
          showToast("⚠️ Saved locally. DB: " + result.message, "warn");
        }
      } catch (err) {
        console.warn("Backend not reachable (running locally only):", err.message);
        showToast("Product added! (Backend offline)", "warn");
      }
    }
    setAddOpen(false);
    setEditProd(null);
  }

  async function deleteProduct(id) {
    setProducts(ps => ps.filter(p => p.id !== id));
    setDelConfirm(null);
    try {
      await fetch(`https://weavers-backend.onrender.com/products/${id}`, { method: "DELETE" });
    } catch (err) {
      console.warn("Backend delete failed (running locally):", err.message);
    }
    showToast("Product removed.", "warn");
  }

  function updateOrderStatus(id, status) {
    setOrders(os => os.map(o => o.id === id ? { ...o, status } : o));
    showToast(`Order ${id} marked as ${status}.`);
  }

  /* ── derived stats ── */
  const totalRevenue = orders.filter(o => o.status !== "Cancelled").reduce((a, o) => a + o.amount, 0);
  const totalOrders  = orders.length;
  const lowStock     = products.filter(p => p.stock < 6).length;
  const activeW      = weavers.filter(w => w.status === "Active").length;

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.fabric.toLowerCase().includes(search.toLowerCase())
  );
  const filteredOrders = orders.filter(o =>
    orderFilter === "All" || o.status === orderFilter
  );

  const TABS = [
    { key: "dashboard", icon: "⬡", label: "Dashboard" },
    { key: "products",  icon: "◈", label: "Products" },
    { key: "orders",    icon: "◉", label: "Orders" },
    { key: "weavers",   icon: "◎", label: "Weavers" },
    { key: "analytics", icon: "◇", label: "Analytics" },
  ];

  // ── Load products from MongoDB on mount ──
  useEffect(() => {
    fetch("https://weavers-backend.onrender.com/products")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          // Map backend fields to AdminPanel fields
          const mapped = data.map(p => ({
            id: p._id,
            name: p.name,
            fabric: p.category || "Handloom silk",
            price: p.price,
            old: Math.round(p.price * 1.25),
            rating: 4.5,
            reviews: 0,
            stock: 10,
            occasion: p.category || "Festive",
            tags: [],
            img: p.image,
            desc: p.description || "",
          }));
          setProducts(prev => [...INIT_PRODUCTS, ...mapped]);
        }
      })
      .catch(err => console.warn("Backend not reachable, using local data:", err.message));
  }, []);

  const STATUS_COLOR = {
    Delivered:  "#4ade80", Shipped: "#60a5fa",
    Processing: "#fbbf24", Cancelled: "#f87171",
  };

  const maxRev = Math.max(...MONTHLY.map(m => m.rev));

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Inter:wght@300;400;500;600&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .ap-root {
          --gold: #C9A84C;
          --gold-light: #E8C97A;
          --gold-dim: rgba(201,168,76,0.15);
          --crimson: #8B1A1A;
          --bg: #0a0608;
          --surface: rgba(255,255,255,0.03);
          --surface2: rgba(255,255,255,0.06);
          --border: rgba(201,168,76,0.18);
          --text: #f0e8d8;
          --text-dim: rgba(240,232,216,0.5);
          --green: #4ade80;
          --red: #f87171;
          --blue: #60a5fa;
          position: fixed; inset: 0;
          background: #0a0608;
          font-family: 'Inter', sans-serif;
          color: var(--text);
          overflow: hidden;
          display: flex;
        }

        /* static bg */
        .ap-bg { display: none; }

        /* ─── SIDEBAR ─── */
        .ap-sidebar {
          position: relative; z-index: 10;
          width: 220px; flex-shrink: 0;
          background: rgba(10,6,8,0.85);
          border-right: 1px solid var(--border);
          backdrop-filter: blur(20px);
          display: flex; flex-direction: column;
          padding: 28px 0 24px;
          animation: apSideIn 0.6s cubic-bezier(0.16,1,0.3,1) both;
        }
        @keyframes apSideIn { from { transform: translateX(-100%); opacity:0; } to { transform: translateX(0); opacity:1; } }

        .ap-logo {
          padding: 0 24px 28px;
          border-bottom: 1px solid var(--border);
          margin-bottom: 16px;
        }
        .ap-logo-text {
          font-family: 'Playfair Display', serif;
          font-size: 1.4rem; font-weight: 900; letter-spacing: 0.12em;
          background: linear-gradient(135deg, #8B5E1A 0%, #C9A84C 50%, #F0D080 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .ap-logo-badge {
          display: inline-block; margin-top: 4px;
          font-size: 0.62rem; letter-spacing: 0.2em; text-transform: uppercase;
          color: var(--crimson); border: 1px solid rgba(139,26,26,0.4);
          padding: 2px 8px; border-radius: 2px;
        }

        .ap-nav { flex: 1; display: flex; flex-direction: column; gap: 2px; padding: 0 10px; }
        .ap-nav-btn {
          display: flex; align-items: center; gap: 12px;
          padding: 11px 14px; border-radius: 6px;
          border: none; background: none; color: var(--text-dim);
          font-size: 0.85rem; font-family: 'Inter', sans-serif;
          cursor: pointer; text-align: left;
          transition: all 0.25s;
          position: relative; overflow: hidden;
        }
        .ap-nav-btn::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(90deg, var(--gold-dim), transparent);
          opacity: 0; transition: opacity 0.25s;
          border-radius: 6px;
        }
        .ap-nav-btn:hover::before, .ap-nav-btn.active::before { opacity: 1; }
        .ap-nav-btn.active { color: var(--gold-light); }
        .ap-nav-btn.active .ap-nav-icon { color: var(--gold); }
        .ap-nav-btn:hover { color: var(--text); }
        .ap-nav-icon { font-size: 1.1rem; width: 18px; text-align: center; }
        .ap-active-bar {
          position: absolute; left: 0; top: 50%; transform: translateY(-50%);
          width: 3px; height: 60%; background: var(--gold);
          border-radius: 0 2px 2px 0;
        }

        .ap-sidebar-footer {
          padding: 16px 10px 0;
          border-top: 1px solid var(--border);
        }
        .ap-logout {
          display: flex; align-items: center; gap: 10px;
          width: 100%; padding: 10px 14px; border-radius: 6px;
          border: 1px solid rgba(248,113,113,0.2);
          background: rgba(248,113,113,0.05); color: #f87171;
          font-size: 0.82rem; cursor: pointer;
          transition: all 0.2s;
        }
        .ap-logout:hover { background: rgba(248,113,113,0.12); }

        /* ─── MAIN ─── */
        .ap-main {
          position: relative; z-index: 5;
          flex: 1; overflow-y: auto; overflow-x: hidden;
          padding: 32px 36px;
          animation: apMainIn 0.7s cubic-bezier(0.16,1,0.3,1) 0.15s both;
        }
        @keyframes apMainIn { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        .ap-main::-webkit-scrollbar { width: 4px; }
        .ap-main::-webkit-scrollbar-thumb { background: var(--border); border-radius: 2px; }

        .ap-page-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.9rem; font-weight: 700; letter-spacing: 0.04em;
          background: linear-gradient(135deg, #f0e8d8, #C9A84C);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          margin-bottom: 6px;
        }
        .ap-page-sub { font-size: 0.82rem; color: var(--text-dim); margin-bottom: 28px; }

        /* ─── STAT CARDS ─── */
        .ap-stats { display: grid; grid-template-columns: repeat(4,1fr); gap: 16px; margin-bottom: 28px; }
        .ap-stat {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px; padding: 20px 22px;
          position: relative; overflow: hidden;
          backdrop-filter: blur(12px);
          animation: apCardIn 0.5s cubic-bezier(0.16,1,0.3,1) both;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .ap-stat:hover { transform: translateY(-3px); box-shadow: 0 12px 40px rgba(201,168,76,0.12); }
        @keyframes apCardIn { from { opacity:0; transform:scale(0.93) translateY(10px); } to { opacity:1; transform:scale(1) translateY(0); } }
        .ap-stat:nth-child(1){animation-delay:0.05s} .ap-stat:nth-child(2){animation-delay:0.1s}
        .ap-stat:nth-child(3){animation-delay:0.15s} .ap-stat:nth-child(4){animation-delay:0.2s}
        .ap-stat-glow {
          position: absolute; top: -30px; right: -30px; width: 100px; height: 100px;
          border-radius: 50%; filter: blur(40px); opacity: 0.25;
        }
        .ap-stat-icon { font-size: 1.6rem; margin-bottom: 10px; }
        .ap-stat-val {
          font-size: 1.6rem; font-weight: 600; letter-spacing: -0.02em;
          color: var(--gold-light); margin-bottom: 4px;
        }
        .ap-stat-label { font-size: 0.75rem; color: var(--text-dim); letter-spacing: 0.08em; text-transform: uppercase; }
        .ap-stat-delta { font-size: 0.72rem; color: var(--green); margin-top: 6px; }

        /* ─── CARD ─── */
        .ap-card {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 12px; padding: 22px 24px;
          backdrop-filter: blur(12px);
          margin-bottom: 20px;
        }
        .ap-card-title {
          font-size: 0.78rem; letter-spacing: 0.15em; text-transform: uppercase;
          color: var(--gold); margin-bottom: 16px; font-weight: 500;
        }

        /* ─── TABLE ─── */
        .ap-table { width: 100%; border-collapse: collapse; }
        .ap-table th {
          font-size: 0.68rem; letter-spacing: 0.15em; text-transform: uppercase;
          color: var(--text-dim); text-align: left; padding: 0 12px 12px; font-weight: 500;
          border-bottom: 1px solid var(--border);
        }
        .ap-table td {
          padding: 12px; font-size: 0.83rem; color: var(--text);
          border-bottom: 1px solid rgba(201,168,76,0.07);
          vertical-align: middle;
        }
        .ap-table tr:last-child td { border-bottom: none; }
        .ap-table tr:hover td { background: var(--surface2); }
        .ap-table img { width: 44px; height: 44px; object-fit: cover; border-radius: 6px; border: 1px solid var(--border); }

        /* ─── BADGES ─── */
        .ap-badge {
          display: inline-block; padding: 3px 10px; border-radius: 20px;
          font-size: 0.7rem; font-weight: 500; letter-spacing: 0.05em;
        }

        /* ─── BUTTONS ─── */
        .ap-btn {
          padding: 8px 16px; border-radius: 6px; border: none; cursor: pointer;
          font-size: 0.82rem; font-family: 'Inter', sans-serif; font-weight: 500;
          transition: all 0.2s;
        }
        .ap-btn-gold {
          background: linear-gradient(135deg, #8B5E1A, #C9A84C);
          color: #0a0608;
        }
        .ap-btn-gold:hover { filter: brightness(1.1); transform: translateY(-1px); box-shadow: 0 4px 20px rgba(201,168,76,0.3); }
        .ap-btn-ghost {
          background: var(--surface); border: 1px solid var(--border); color: var(--text);
        }
        .ap-btn-ghost:hover { background: var(--surface2); }
        .ap-btn-danger { background: rgba(248,113,113,0.15); border: 1px solid rgba(248,113,113,0.3); color: #f87171; }
        .ap-btn-danger:hover { background: rgba(248,113,113,0.25); }
        .ap-btn-sm { padding: 5px 10px; font-size: 0.75rem; }

        /* ─── TOOLBAR ─── */
        .ap-toolbar {
          display: flex; align-items: center; gap: 12px; margin-bottom: 18px; flex-wrap: wrap;
        }
        .ap-search {
          flex: 1; min-width: 180px; padding: 9px 14px;
          background: var(--surface); border: 1px solid var(--border); border-radius: 6px;
          color: var(--text); font-size: 0.84rem; font-family: 'Inter', sans-serif; outline: none;
        }
        .ap-search:focus { border-color: var(--gold); }
        .ap-search::placeholder { color: var(--text-dim); }

        /* ─── CHART ─── */
        .ap-chart-wrap { display: flex; align-items: flex-end; gap: 10px; height: 160px; }
        .ap-chart-col { flex: 1; display: flex; flex-direction: column; align-items: center; gap: 6px; height: 100%; justify-content: flex-end; }
        .ap-chart-bar {
          width: 100%; border-radius: 4px 4px 0 0;
          background: linear-gradient(180deg, #C9A84C, #8B5E1A);
          transition: height 1s cubic-bezier(0.16,1,0.3,1);
          position: relative; overflow: hidden;
          animation: apBarIn 1s cubic-bezier(0.16,1,0.3,1) both;
        }
        @keyframes apBarIn { from { transform: scaleY(0); transform-origin: bottom; } to { transform: scaleY(1); } }
        .ap-chart-bar::after {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(180deg, rgba(255,255,255,0.15), transparent);
        }
        .ap-chart-label { font-size: 0.68rem; color: var(--text-dim); }
        .ap-chart-val { font-size: 0.68rem; color: var(--gold); font-weight: 600; }

        /* ─── MODAL ─── */
        .ap-modal-bg {
          position: fixed; inset: 0; z-index: 100;
          background: rgba(0,0,0,0.7); backdrop-filter: blur(6px);
          display: flex; align-items: center; justify-content: center;
          animation: apFadeIn 0.2s ease;
        }
        @keyframes apFadeIn { from { opacity:0; } to { opacity:1; } }
        .ap-modal {
          background: linear-gradient(145deg, #07112b 0%, #0d1f4a 60%, #0a1835 100%);
          border: 1px solid rgba(148,186,255,0.25);
          border-radius: 14px; padding: 30px; width: 500px; max-height: 80vh;
          overflow-y: auto; position: relative;
          animation: apModalIn 0.35s cubic-bezier(0.16,1,0.3,1);
          box-shadow: 0 40px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(148,186,255,0.08), inset 0 1px 0 rgba(200,220,255,0.07);
        }
        @keyframes apModalIn { from { opacity:0; transform:scale(0.9) translateY(20px); } to { opacity:1; transform:scale(1) translateY(0); } }
        .ap-modal-title {
          font-family:'Playfair Display',serif; font-size:1.3rem;
          color: var(--gold-light); margin-bottom: 22px;
          display: flex; justify-content: space-between; align-items: center;
        }
        .ap-modal-close { background: none; border: none; color: var(--text-dim); font-size: 1.2rem; cursor: pointer; }
        .ap-modal-close:hover { color: var(--text); }

        .ap-form-row { margin-bottom: 16px; }
        .ap-form-label { display: block; font-size: 0.72rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-dim); margin-bottom: 6px; }
        .ap-form-input {
          width: 100%; padding: 10px 13px;
          background: rgba(255,255,255,0.04); border: 1px solid var(--border);
          border-radius: 6px; color: var(--text); font-size: 0.85rem;
          font-family: 'Inter', sans-serif; outline: none; transition: border-color 0.2s;
        }
        .ap-form-input:focus { border-color: var(--gold); }
        .ap-form-row-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

        /* ─── STOCK badge colors ─── */
        .stock-ok  { color: var(--green); }
        .stock-low { color: #fbbf24; }
        .stock-crit{ color: var(--red); }

        /* ─── DONUT ─── */
        .ap-donut-wrap { display: flex; align-items: center; gap: 24px; }
        .ap-donut-legend { flex: 1; display: flex; flex-direction: column; gap: 10px; }
        .ap-legend-item { display: flex; align-items: center; gap: 8px; font-size: 0.8rem; }
        .ap-legend-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }
        .ap-legend-pct { margin-left: auto; color: var(--gold); font-weight: 600; }

        /* ─── TOAST ─── */
        .ap-toast {
          position: fixed; bottom: 28px; right: 28px; z-index: 200;
          padding: 14px 22px; border-radius: 8px;
          background: rgba(15,10,12,0.95); border: 1px solid var(--gold);
          color: var(--gold-light); font-size: 0.85rem;
          animation: apToastIn 0.3s ease; box-shadow: 0 8px 30px rgba(0,0,0,0.4);
        }
        .ap-toast.warn { border-color: #fbbf24; color: #fbbf24; }
        @keyframes apToastIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }

        /* ─── RECENT ORDERS MINI ─── */
        .ap-order-mini { display: flex; flex-direction: column; gap: 10px; }
        .ap-order-mini-row {
          display: flex; align-items: center; gap: 12px;
          padding: 10px 0; border-bottom: 1px solid rgba(201,168,76,0.07);
        }
        .ap-order-mini-row:last-child { border-bottom: none; }
        .ap-order-mini-id { font-size: 0.75rem; color: var(--gold); font-weight: 600; width: 80px; flex-shrink: 0; }
        .ap-order-mini-name { flex: 1; font-size: 0.82rem; color: var(--text); }
        .ap-order-mini-amt { font-size: 0.82rem; color: var(--text-dim); margin-right: 8px; }

        /* ─── ACTIVITY ─── */
        .ap-activity { display: flex; flex-direction: column; gap: 12px; }
        .ap-activity-item { display: flex; gap: 12px; align-items: flex-start; }
        .ap-activity-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--gold); margin-top: 5px; flex-shrink: 0; }
        .ap-activity-text { font-size: 0.8rem; color: var(--text-dim); line-height: 1.5; }
        .ap-activity-text strong { color: var(--text); }
        .ap-activity-time { font-size: 0.7rem; color: var(--text-dim); margin-top: 2px; }

        /* ─── RICH MOTION LAYER ─── */
        .ap-tab-content { animation: apTabIn 0.45s cubic-bezier(0.16,1,0.3,1) both; }
        @keyframes apTabIn { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:translateY(0); } }

        .ap-row-in { animation: apRowIn 0.5s cubic-bezier(0.16,1,0.3,1) both; }
        @keyframes apRowIn { from { opacity:0; transform:translateX(-8px); } to { opacity:1; transform:translateX(0); } }
        tr.ap-row-in { animation-name: apRowFadeIn; }
        @keyframes apRowFadeIn { from { opacity:0; } to { opacity:1; } }

        .ap-stat-ring {
          position: absolute; top: 18px; left: 20px; width: 30px; height: 30px;
          border-radius: 50%; border: 1px solid; opacity: 0;
          animation: apRingPulse 2.6s ease-out infinite;
        }
        @keyframes apRingPulse {
          0% { transform: scale(0.6); opacity: 0.5; }
          70% { transform: scale(1.8); opacity: 0; }
          100% { opacity: 0; }
        }
        .ap-stat-glow { animation: apGlowDrift 6s ease-in-out infinite, apGlowPulse 3.2s ease-in-out infinite; }
        @keyframes apGlowDrift {
          0%, 100% { transform: translate(0,0); }
          50% { transform: translate(-10px, 8px); }
        }
        @keyframes apGlowPulse { 0%,100% { opacity: 0.25; } 50% { opacity: 0.45; } }

        .ap-stat::after {
          content: ''; position: absolute; top: 0; left: -60%; width: 40%; height: 100%;
          background: linear-gradient(115deg, transparent, rgba(255,255,255,0.07), transparent);
          transform: skewX(-20deg);
          transition: left 0.6s ease;
          pointer-events: none;
        }
        .ap-stat:hover::after { left: 130%; }

        .ap-page-title {
          background-size: 200% auto;
          animation: apTitleShimmer 5s linear infinite;
        }
        @keyframes apTitleShimmer {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }

        .ap-nav-btn.active .ap-active-bar { box-shadow: 0 0 10px 1px var(--gold); animation: apBarGlow 1.8s ease-in-out infinite; }
        @keyframes apBarGlow { 0%,100% { box-shadow: 0 0 6px 0 var(--gold); } 50% { box-shadow: 0 0 12px 2px var(--gold); } }

        .ap-chart-bar { box-shadow: 0 0 0 0 rgba(201,168,76,0); }
        .ap-chart-bar::before {
          content: ''; position: absolute; top: 0; left: -75%; width: 50%; height: 100%;
          background: linear-gradient(115deg, transparent, rgba(255,255,255,0.45), transparent);
          transform: skewX(-20deg);
          animation: apBarShine 2.8s ease-in-out infinite;
        }
        @keyframes apBarShine {
          0%, 25% { left: -75%; }
          70%, 100% { left: 125%; }
        }
        .ap-chart-col:hover .ap-chart-bar { filter: brightness(1.18); box-shadow: 0 0 18px rgba(201,168,76,0.45); }

        .ap-donut-arc { opacity: 0; transform-origin: 18px 18px; animation: apDonutIn 0.7s cubic-bezier(0.16,1,0.3,1) both; }
        @keyframes apDonutIn { from { opacity:0; transform: rotate(-90deg) scale(0.7); } to { opacity:1; transform: rotate(-90deg) scale(1); } }

        .ap-activity-dot { box-shadow: 0 0 0 0 rgba(201,168,76,0.5); animation: apDotPulse 2.4s ease-out infinite; }
        @keyframes apDotPulse {
          0% { box-shadow: 0 0 0 0 rgba(201,168,76,0.45); }
          70% { box-shadow: 0 0 0 6px rgba(201,168,76,0); }
          100% { box-shadow: 0 0 0 0 rgba(201,168,76,0); }
        }

        .ap-low-flag { display: inline-block; animation: apLowFlash 1.4s ease-in-out infinite; }
        @keyframes apLowFlash { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }

        .ap-btn { position: relative; overflow: hidden; }
        .ap-btn-gold::before {
          content: ''; position: absolute; top: 0; left: -60%; width: 30%; height: 100%;
          background: linear-gradient(115deg, transparent, rgba(255,255,255,0.55), transparent);
          transform: skewX(-20deg); transition: left 0.5s ease;
        }
        .ap-btn-gold:hover::before { left: 130%; }

        .ap-toast { animation: apToastIn 0.4s cubic-bezier(0.34,1.56,0.64,1); }

        .ap-logo-text { background-size: 200% auto; animation: apTitleShimmer 6s linear infinite; }

        @media (prefers-reduced-motion: reduce) {
          .ap-tab-content, .ap-row-in, .ap-stat-ring, .ap-stat-glow, .ap-page-title, .ap-logo-text,
          .ap-nav-btn.active .ap-active-bar, .ap-chart-bar::before, .ap-donut-arc, .ap-activity-dot,
          .ap-low-flag, .ap-btn-gold::before, .ap-toast { animation: none !important; }
        }

        /* responsive */
        @media (max-width: 900px) {
          .ap-stats { grid-template-columns: repeat(2,1fr); }
          .ap-main { padding: 20px 18px; }
          .ap-sidebar { width: 180px; }
        }
      `}</style>

      <div className="ap-root">

        {/* ─── SIDEBAR ─── */}
        <aside className="ap-sidebar">
          <div className="ap-logo">
            <div className="ap-logo-text">WEAVERS</div>
            <div className="ap-logo-badge">Admin Portal</div>
          </div>
          <nav className="ap-nav">
            {TABS.map(t => (
              <button key={t.key} className={`ap-nav-btn${tab === t.key ? " active" : ""}`} onClick={() => setTab(t.key)}>
                {tab === t.key && <span className="ap-active-bar" />}
                <span className="ap-nav-icon">{t.icon}</span>
                {t.label}
              </button>
            ))}
          </nav>
          <div className="ap-sidebar-footer">
            <button className="ap-logout" onClick={onLogout}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
              Sign Out
            </button>
          </div>
        </aside>

        {/* ─── MAIN CONTENT ─── */}
        <main className="ap-main">
        <div key={tab} className="ap-tab-content">

          {/* ══ DASHBOARD ══ */}
          {tab === "dashboard" && (
            <>
              <div className="ap-page-title">Dashboard</div>
              <div className="ap-page-sub">Overview · June 2026</div>

              <div className="ap-stats">
                {[
                  { icon: "₹", label: "Total Revenue", raw: totalRevenue, money: true, delta: "+18% from last month", glow: "#C9A84C" },
                  { icon: "📦", label: "Total Orders",   raw: totalOrders,             delta: "+5 this week",        glow: "#60a5fa" },
                  { icon: "🧵", label: "Active Weavers", raw: activeW,                 delta: `${weavers.length} registered`, glow: "#4ade80" },
                  { icon: "⚠", label: "Low Stock Items", raw: lowStock,               delta: "Need restocking",      glow: "#f87171" },
                ].map((s, i) => (
                  <div className="ap-stat" key={i} style={{ animationDelay: `${i * 0.07}s` }}>
                    <div className="ap-stat-glow" style={{ background: s.glow }} />
                    <div className="ap-stat-ring" style={{ borderColor: s.glow }} />
                    <div className="ap-stat-icon">{s.icon}</div>
                    <div className="ap-stat-val"><StatValue value={s.raw} money={s.money} /></div>
                    <div className="ap-stat-label">{s.label}</div>
                    <div className="ap-stat-delta">{s.delta}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div className="ap-card">
                  <div className="ap-card-title">Monthly Revenue</div>
                  <div className="ap-chart-wrap">
                    {MONTHLY.map((m, i) => (
                      <div className="ap-chart-col" key={i} style={{ animationDelay: `${i * 0.08}s` }}>
                        <div className="ap-chart-val">₹{Math.round(m.rev / 1000)}k</div>
                        <div className="ap-chart-bar" style={{ height: `${(m.rev / maxRev) * 100}%`, animationDelay: `${i * 0.08}s` }} />
                        <div className="ap-chart-label">{m.m}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="ap-card">
                  <div className="ap-card-title">Sales by Occasion</div>
                  <div className="ap-donut-wrap">
                    <svg width="100" height="100" viewBox="0 0 36 36">
                      {[
                        { pct: 35, color: "#C9A84C", offset: 0 },
                        { pct: 28, color: "#60a5fa", offset: 35 },
                        { pct: 22, color: "#4ade80", offset: 63 },
                        { pct: 15, color: "#f87171", offset: 85 },
                      ].map((s, i) => (
                        <circle key={i} className="ap-donut-arc" style={{ animationDelay: `${0.3 + i * 0.12}s` }} r="15.9" cx="18" cy="18" fill="transparent"
                          stroke={s.color} strokeWidth="3.8"
                          strokeDasharray={`${s.pct} ${100 - s.pct}`}
                          strokeDashoffset={-s.offset + 25}
                          transform="rotate(-90 18 18)" />
                      ))}
                      <circle r="12" cx="18" cy="18" fill="#0a0608" />
                    </svg>
                    <div className="ap-donut-legend">
                      {[
                        { label: "Bridal",  pct: "35%", color: "#C9A84C" },
                        { label: "Festive", pct: "28%", color: "#60a5fa" },
                        { label: "Casual",  pct: "22%", color: "#4ade80" },
                        { label: "Party",   pct: "15%", color: "#f87171" },
                      ].map((l, i) => (
                        <div className="ap-legend-item" key={i}>
                          <div className="ap-legend-dot" style={{ background: l.color }} />
                          <span style={{ color: "var(--text-dim)" }}>{l.label}</span>
                          <span className="ap-legend-pct">{l.pct}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div className="ap-card">
                  <div className="ap-card-title">Recent Orders</div>
                  <div className="ap-order-mini">
                    {orders.slice(0, 5).map((o, i) => (
                      <div className="ap-order-mini-row ap-row-in" key={o.id} style={{ animationDelay: `${i * 0.06}s` }}>
                        <span className="ap-order-mini-id">{o.id}</span>
                        <span className="ap-order-mini-name">{o.customer}</span>
                        <span className="ap-order-mini-amt">{fmtMoney(o.amount)}</span>
                        <span className="ap-badge" style={{ background: `${STATUS_COLOR[o.status]}22`, color: STATUS_COLOR[o.status], border: `1px solid ${STATUS_COLOR[o.status]}44` }}>{o.status}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="ap-card">
                  <div className="ap-card-title">Recent Activity</div>
                  <div className="ap-activity">
                    {[
                      { text: <><strong>Priya Sharma</strong> placed an order for Kanchi Crimson</>, time: "2 hrs ago" },
                      { text: <><strong>Patola Sunset Ikat</strong> stock updated to 3 units</>, time: "4 hrs ago" },
                      { text: <><strong>New weaver</strong> Murugan K. went on leave</>, time: "Yesterday" },
                      { text: <><strong>SILK10 coupon</strong> used 12 times this week</>, time: "Yesterday" },
                      { text: <><strong>Banarasi Rani Pink</strong> received a 5-star review</>, time: "2 days ago" },
                    ].map((a, i) => (
                      <div className="ap-activity-item ap-row-in" key={i} style={{ animationDelay: `${i * 0.08}s` }}>
                        <div className="ap-activity-dot" />
                        <div>
                          <div className="ap-activity-text">{a.text}</div>
                          <div className="ap-activity-time">{a.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ══ PRODUCTS ══ */}
          {tab === "products" && (
            <>
              <div className="ap-page-title">Products</div>
              <div className="ap-page-sub">Manage your saree catalogue</div>
              <div className="ap-toolbar">
                <input className="ap-search" placeholder="Search by name or fabric…" value={search} onChange={e => setSearch(e.target.value)} />
                <button className="ap-btn ap-btn-gold" onClick={() => { setEditProd(null); setAddOpen(true); }}>
                  + Add Product
                </button>
              </div>
              <div className="ap-card" style={{ padding: 0, overflow: "hidden" }}>
                <table className="ap-table">
                  <thead>
                    <tr>
                      <th style={{ paddingLeft: 24 }}>Product</th>
                      <th>Fabric</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Rating</th>
                      <th>Occasion</th>
                      <th style={{ paddingRight: 24 }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProducts.map((p, i) => (
                      <tr key={p.id} className="ap-row-in" style={{ animationDelay: `${Math.min(i * 0.04, 0.5)}s` }}>
                        <td style={{ paddingLeft: 24 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                            <img src={p.img} alt={p.name} />
                            <span style={{ fontSize: "0.82rem", fontWeight: 500, maxWidth: 160 }}>{p.name}</span>
                          </div>
                        </td>
                        <td style={{ color: "var(--text-dim)", fontSize: "0.78rem", maxWidth: 140 }}>{p.fabric}</td>
                        <td>
                          <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--gold-light)" }}>{fmtMoney(p.price)}</div>
                          <div style={{ fontSize: "0.7rem", color: "var(--text-dim)", textDecoration: "line-through" }}>{fmtMoney(p.old)}</div>
                        </td>
                        <td>
                          <span className={p.stock < 5 ? "stock-crit" : p.stock < 10 ? "stock-low" : "stock-ok"} style={{ fontWeight: 600 }}>
                            {p.stock}
                          </span>
                          {p.stock < 5 && <span className="ap-low-flag" style={{ fontSize: "0.65rem", color: "#f87171", marginLeft: 4 }}>Low!</span>}
                        </td>
                        <td>
                          <span style={{ color: "var(--gold)", fontSize: "0.82rem" }}>★ {p.rating}</span>
                          <span style={{ color: "var(--text-dim)", fontSize: "0.7rem", marginLeft: 4 }}>({p.reviews})</span>
                        </td>
                        <td>
                          <span className="ap-badge" style={{ background: "rgba(201,168,76,0.1)", color: "var(--gold)", border: "1px solid rgba(201,168,76,0.2)", fontSize: "0.7rem" }}>{p.occasion}</span>
                        </td>
                        <td style={{ paddingRight: 24 }}>
                          <div style={{ display: "flex", gap: 6 }}>
                            <button className="ap-btn ap-btn-ghost ap-btn-sm" onClick={() => { setEditProd(p); setAddOpen(true); }}>Edit</button>
                            <button className="ap-btn ap-btn-danger ap-btn-sm" onClick={() => setDelConfirm(p)}>Del</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div style={{ fontSize: "0.76rem", color: "var(--text-dim)", marginTop: 8 }}>
                Showing {filteredProducts.length} of {products.length} products
              </div>
            </>
          )}

          {/* ══ ORDERS ══ */}
          {tab === "orders" && (
            <>
              <div className="ap-page-title">Orders</div>
              <div className="ap-page-sub">Track and manage customer orders</div>
              <div className="ap-toolbar">
                {["All","Processing","Shipped","Delivered","Cancelled"].map(f => (
                  <button key={f} className={`ap-btn ${orderFilter === f ? "ap-btn-gold" : "ap-btn-ghost"} ap-btn-sm`} onClick={() => setOrderFilter(f)}>{f}</button>
                ))}
              </div>
              <div className="ap-card" style={{ padding: 0, overflow: "hidden" }}>
                <table className="ap-table">
                  <thead>
                    <tr>
                      <th style={{ paddingLeft: 24 }}>Order ID</th>
                      <th>Customer</th>
                      <th>Product</th>
                      <th>Amount</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th style={{ paddingRight: 24 }}>Update</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((o, i) => (
                      <tr key={o.id} className="ap-row-in" style={{ animationDelay: `${Math.min(i * 0.04, 0.5)}s` }}>
                        <td style={{ paddingLeft: 24, color: "var(--gold)", fontWeight: 600, fontSize: "0.8rem" }}>{o.id}</td>
                        <td>{o.customer}</td>
                        <td style={{ color: "var(--text-dim)", fontSize: "0.8rem", maxWidth: 160 }}>{o.product}</td>
                        <td style={{ color: "var(--gold-light)", fontWeight: 600 }}>{fmtMoney(o.amount)}</td>
                        <td style={{ color: "var(--text-dim)", fontSize: "0.78rem" }}>{o.date}</td>
                        <td>
                          <span className="ap-badge" style={{ background: `${STATUS_COLOR[o.status]}22`, color: STATUS_COLOR[o.status], border: `1px solid ${STATUS_COLOR[o.status]}44` }}>{o.status}</span>
                        </td>
                        <td style={{ paddingRight: 24 }}>
                          <select
                            value={o.status}
                            onChange={e => updateOrderStatus(o.id, e.target.value)}
                            style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)", borderRadius: 4, padding: "4px 8px", fontSize: "0.75rem", cursor: "pointer" }}
                          >
                            {["Processing","Shipped","Delivered","Cancelled"].map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* ══ WEAVERS ══ */}
          {tab === "weavers" && (
            <>
              <div className="ap-page-title">Weavers</div>
              <div className="ap-page-sub">Artisan network management</div>
              <div className="ap-stats" style={{ gridTemplateColumns: "repeat(3,1fr)" }}>
                {[
                  { label: "Total Weavers",  raw: weavers.length,                                  glow: "#C9A84C" },
                  { label: "Active",         raw: weavers.filter(w=>w.status==="Active").length,    glow: "#4ade80" },
                  { label: "On Leave",       raw: weavers.filter(w=>w.status==="On Leave").length,  glow: "#fbbf24" },
                ].map((s, i) => (
                  <div className="ap-stat" key={i} style={{ animationDelay: `${i * 0.07}s` }}>
                    <div className="ap-stat-glow" style={{ background: s.glow }} />
                    <div className="ap-stat-ring" style={{ borderColor: s.glow }} />
                    <div className="ap-stat-val"><StatValue value={s.raw} /></div>
                    <div className="ap-stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="ap-card" style={{ padding: 0, overflow: "hidden" }}>
                <table className="ap-table">
                  <thead>
                    <tr>
                      <th style={{ paddingLeft: 24 }}>Weaver</th>
                      <th>Region</th>
                      <th>Specialty</th>
                      <th>Products</th>
                      <th>Joined</th>
                      <th style={{ paddingRight: 24 }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {weavers.map((w, i) => (
                      <tr key={w.id} className="ap-row-in" style={{ animationDelay: `${Math.min(i * 0.04, 0.5)}s` }}>
                        <td style={{ paddingLeft: 24 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#8B5E1A,#C9A84C)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem", fontWeight: 700, color: "#0a0608" }}>
                              {w.name[0]}
                            </div>
                            <span style={{ fontWeight: 500 }}>{w.name}</span>
                          </div>
                        </td>
                        <td style={{ color: "var(--text-dim)" }}>{w.region}</td>
                        <td style={{ fontSize: "0.8rem" }}>{w.specialty}</td>
                        <td style={{ color: "var(--gold)", fontWeight: 600 }}>{w.products}</td>
                        <td style={{ color: "var(--text-dim)", fontSize: "0.78rem" }}>{w.joined}</td>
                        <td style={{ paddingRight: 24 }}>
                          <span className="ap-badge" style={{
                            background: w.status === "Active" ? "rgba(74,222,128,0.12)" : "rgba(251,191,36,0.12)",
                            color: w.status === "Active" ? "#4ade80" : "#fbbf24",
                            border: `1px solid ${w.status === "Active" ? "rgba(74,222,128,0.3)" : "rgba(251,191,36,0.3)"}`
                          }}>{w.status}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {/* ══ ANALYTICS ══ */}
          {tab === "analytics" && (
            <>
              <div className="ap-page-title">Analytics</div>
              <div className="ap-page-sub">Sales insights & performance metrics</div>
              <div className="ap-stats">
                {[
                  { label: "Avg. Order Value", raw: Math.round(totalRevenue / totalOrders), money: true, glow: "#C9A84C" },
                  { label: "Conversion Rate",  val: "4.2%",  glow: "#4ade80" },
                  { label: "Return Rate",      val: "1.8%",  glow: "#60a5fa" },
                  { label: "Top Product",      val: "#5 Patola", glow: "#f87171" },
                ].map((s, i) => (
                  <div className="ap-stat" key={i} style={{ animationDelay: `${i * 0.07}s` }}>
                    <div className="ap-stat-glow" style={{ background: s.glow }} />
                    <div className="ap-stat-ring" style={{ borderColor: s.glow }} />
                    <div className="ap-stat-val">{s.raw !== undefined ? <StatValue value={s.raw} money={s.money} /> : s.val}</div>
                    <div className="ap-stat-label">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="ap-card">
                <div className="ap-card-title">Revenue Trend · Jan – Jun 2026</div>
                <div className="ap-chart-wrap" style={{ height: 200 }}>
                  {MONTHLY.map((m, i) => (
                    <div className="ap-chart-col" key={i}>
                      <div className="ap-chart-val">₹{(m.rev / 1000).toFixed(0)}k</div>
                      <div className="ap-chart-bar" style={{ height: `${(m.rev / maxRev) * 100}%`, animationDelay: `${i * 0.1}s` }} />
                      <div className="ap-chart-label">{m.m}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div className="ap-card">
                  <div className="ap-card-title">Top 5 Products by Revenue</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {[
                      { name: "Patola Sunset Ikat",         rev: "₹75,996",  bar: 100 },
                      { name: "Banarasi Rani Pink",          rev: "₹55,996",  bar: 74 },
                      { name: "Paithani Peacock Teal",       rev: "₹49,497",  bar: 65 },
                      { name: "Banaras Emerald Weave",       rev: "₹47,997",  bar: 63 },
                      { name: "Kanchi Crimson Kanjivaram",   rev: "₹37,497",  bar: 49 },
                    ].map((r, i) => (
                      <div key={i} className="ap-row-in" style={{ display: "flex", alignItems: "center", gap: 12, animationDelay: `${i * 0.07}s` }}>
                        <span style={{ color: "var(--gold)", fontWeight: 700, fontSize: "0.75rem", width: 16 }}>{i + 1}</span>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: "0.78rem", marginBottom: 4 }}>{r.name}</div>
                          <div style={{ height: 4, background: "var(--surface2)", borderRadius: 2, overflow: "hidden" }}>
                            <div style={{ height: "100%", width: `${r.bar}%`, background: "linear-gradient(90deg,#8B5E1A,#C9A84C)", borderRadius: 2, transition: "width 1s ease" }} />
                          </div>
                        </div>
                        <span style={{ color: "var(--gold-light)", fontSize: "0.78rem", fontWeight: 600, minWidth: 60, textAlign: "right" }}>{r.rev}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="ap-card">
                  <div className="ap-card-title">Orders by Status</div>
                  <div className="ap-donut-wrap">
                    <svg width="100" height="100" viewBox="0 0 36 36">
                      {(() => {
                        const counts = { Delivered: 0, Shipped: 0, Processing: 0, Cancelled: 0 };
                        orders.forEach(o => counts[o.status]++);
                        const total = orders.length;
                        let offset = 0;
                        return Object.entries(counts).map(([k, v], i) => {
                          const pct = (v / total) * 100;
                          const el = (
                            <circle key={k} className="ap-donut-arc" style={{ animationDelay: `${0.3 + i * 0.12}s` }} r="15.9" cx="18" cy="18" fill="transparent"
                              stroke={STATUS_COLOR[k]} strokeWidth="3.8"
                              strokeDasharray={`${pct} ${100 - pct}`}
                              strokeDashoffset={-offset + 25}
                              transform="rotate(-90 18 18)" />
                          );
                          offset += pct;
                          return el;
                        });
                      })()}
                      <circle r="12" cx="18" cy="18" fill="#0a0608" />
                    </svg>
                    <div className="ap-donut-legend">
                      {["Delivered","Shipped","Processing","Cancelled"].map(s => {
                        const count = orders.filter(o => o.status === s).length;
                        return (
                          <div className="ap-legend-item" key={s}>
                            <div className="ap-legend-dot" style={{ background: STATUS_COLOR[s] }} />
                            <span style={{ color: "var(--text-dim)" }}>{s}</span>
                            <span className="ap-legend-pct">{count}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        </main>
      </div>

      {/* ══ ADD/EDIT PRODUCT MODAL ══ */}
      {addOpen && (
        <ProductModal
          product={editProd}
          onSave={saveProduct}
          onClose={() => { setAddOpen(false); setEditProd(null); }}
        />
      )}

      {/* ══ DELETE CONFIRM ══ */}
      {delConfirm && (
        <div className="ap-modal-bg" onClick={() => setDelConfirm(null)}>
          <div className="ap-modal" style={{ width: 360 }} onClick={e => e.stopPropagation()}>
            <div className="ap-modal-title">
              <span>Remove Product?</span>
              <button className="ap-modal-close" onClick={() => setDelConfirm(null)}>✕</button>
            </div>
            <p style={{ fontSize: "0.85rem", color: "var(--text-dim)", marginBottom: 24 }}>
              This will permanently remove <strong style={{ color: "var(--text)" }}>{delConfirm.name}</strong> from the catalogue.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              <button className="ap-btn ap-btn-ghost" style={{ flex: 1 }} onClick={() => setDelConfirm(null)}>Cancel</button>
              <button className="ap-btn ap-btn-danger" style={{ flex: 1 }} onClick={() => deleteProduct(delConfirm.id)}>Remove</button>
            </div>
          </div>
        </div>
      )}

      {/* ══ TOAST ══ */}
      {toast && <div className={`ap-toast${toast.type === "warn" ? " warn" : ""}`}>{toast.msg}</div>}
    </>
  );
}

/* ─── Product Add / Edit Modal ─── */
function ProductModal({ product, onSave, onClose }) {
  const [form, setForm] = useState({
    name: product?.name || "",
    fabric: product?.fabric || "",
    price: product?.price || "",
    old: product?.old || "",
    stock: product?.stock || "",
    occasion: product?.occasion || "Festive",
    img: product?.img || "",
    tags: product?.tags?.join(", ") || "",
    desc: product?.desc || "",
  });

  function set(k, v) { setForm(f => ({ ...f, [k]: v })); }

  function handleSave() {
    if (!form.name || !form.price) return;
    onSave({
      ...(product ? { id: product.id } : {}),
      ...form,
      price: parseInt(form.price),
      old: parseInt(form.old) || parseInt(form.price),
      stock: parseInt(form.stock) || 10,
      tags: form.tags.split(",").map(t => t.trim()).filter(Boolean),
    });
  }

  const OCCASIONS = ["Bridal","Festive","Casual","Office","Party"];

  return (
    <div className="ap-modal-bg" onClick={onClose}>
      <div className="ap-modal" onClick={e => e.stopPropagation()}>
        <div className="ap-modal-title">
          <span>{product ? "Edit Product" : "Add New Product"}</span>
          <button className="ap-modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="ap-form-row">
          <label className="ap-form-label">Product Name</label>
          <input className="ap-form-input" value={form.name} onChange={e => set("name", e.target.value)} placeholder="e.g. Kanchi Crimson Kanjivaram" />
        </div>
        <div className="ap-form-row">
          <label className="ap-form-label">Fabric · Region</label>
          <input className="ap-form-input" value={form.fabric} onChange={e => set("fabric", e.target.value)} placeholder="e.g. Pure mulberry silk · Kanchipuram" />
        </div>
        <div className="ap-form-row ap-form-row-2">
          <div>
            <label className="ap-form-label">Price (₹)</label>
            <input className="ap-form-input" type="number" value={form.price} onChange={e => set("price", e.target.value)} placeholder="12499" />
          </div>
          <div>
            <label className="ap-form-label">MRP (₹)</label>
            <input className="ap-form-input" type="number" value={form.old} onChange={e => set("old", e.target.value)} placeholder="15999" />
          </div>
        </div>
        <div className="ap-form-row ap-form-row-2">
          <div>
            <label className="ap-form-label">Stock</label>
            <input className="ap-form-input" type="number" value={form.stock} onChange={e => set("stock", e.target.value)} placeholder="10" />
          </div>
          <div>
            <label className="ap-form-label">Occasion</label>
            <select className="ap-form-input" value={form.occasion} onChange={e => set("occasion", e.target.value)}>
              {OCCASIONS.map(o => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
        </div>
        <div className="ap-form-row">
          <label className="ap-form-label">Image URL</label>
          <input className="ap-form-input" value={form.img} onChange={e => set("img", e.target.value)} placeholder="https://…" />
        </div>
        <div className="ap-form-row">
          <label className="ap-form-label">Tags (comma-separated)</label>
          <input className="ap-form-input" value={form.tags} onChange={e => set("tags", e.target.value)} placeholder="Pure silk, Zari border, Bridal" />
        </div>
        <div className="ap-form-row">
          <label className="ap-form-label">Description</label>
          <textarea className="ap-form-input" rows={3} value={form.desc} onChange={e => set("desc", e.target.value)} placeholder="A brief description of the saree…" style={{ resize: "vertical" }} />
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
          <button className="ap-btn ap-btn-ghost" style={{ flex: 1 }} onClick={onClose}>Cancel</button>
          <button className="ap-btn ap-btn-gold" style={{ flex: 1 }} onClick={handleSave}>
            {product ? "Save Changes" : "Add Product"}
          </button>
        </div>
      </div>
    </div>
  );
}