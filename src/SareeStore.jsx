import { useState, useMemo, useEffect, useRef, useCallback } from "react";

const SEED_PRODUCTS = [
  { id: 1, name: "Kanchi Crimson Kanjivaram", fabric: "Pure mulberry silk · Kanchipuram", price: 12499, old: 15999, rating: 4.8, reviews: 124, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlU5Ui1aSWgF4BnPRMM9mqF3xDEQ9q7un2atwNuUtV4w&s=10", desc: "A temple-bordered Kanjivaram in deep crimson, threaded with 22-karat zari motifs along the pallu. Woven over twelve days by a single weaver family.", tags: ["Pure silk", "Zari border", "Bridal"], sizes: ["5.5m", "6m", "6.5m"], colors: ["Crimson", "Maroon", "Deep Red"], blouse: true, occasion: "Bridal", },
  { id: 2, name: "Banaras Emerald Weave", fabric: "Katan silk · Varanasi", price: 15999, old: 19499, rating: 4.7, reviews: 89, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrJR9-BKBhIb-KjHlWkcCoT9CXzfc422HS7qQelXSB_Q&s=10", desc: "Hand-loomed on a jacquard pit-loom, this emerald Banarasi carries the classic mughal buta motif in fine gold thread across its body.", tags: ["Handloom", "Jacquard", "Festive"], sizes: ["5.5m", "6m"], colors: ["Emerald", "Forest Green"], blouse: true, occasion: "Festive", },
  { id: 3, name: "Mysore Royal Blue", fabric: "Mysore silk · Karnataka", price: 9499, old: 11999, rating: 4.6, reviews: 67, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVIaUYMIwSKiVcqDQ2tCU7orE-nNslPyITZHSIqFEm0w&s=10", desc: "Lightweight Mysore silk in royal blue with a slim gold zari border — soft drape, ideal for daylong wear at office or temple visits.", tags: ["Lightweight", "Everyday silk"], sizes: ["5.5m", "6m", "6.5m"], colors: ["Royal Blue", "Navy"], blouse: false, occasion: "Casual", },
  { id: 4, name: "Chanderi Ivory Blossom", fabric: "Chanderi cotton-silk · Madhya Pradesh", price: 4299, old: 5499, rating: 4.5, reviews: 203, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOpBEOAXSmb0hmrxDklTcvfSWKdVZT5hDGVixduw763A&s", desc: "A featherlight Chanderi in ivory, scattered with hand-block floral buttis. Breathable weave, perfect for summer afternoons.", tags: ["Cotton-silk", "Block print", "Summer"], sizes: ["5.5m", "6m"], colors: ["Ivory", "Off-White", "Cream"], blouse: false, occasion: "Casual", },
  { id: 5, name: "Patola Sunset Ikat", fabric: "Double ikat silk · Patan", price: 18999, old: 23999, rating: 4.9, reviews: 41, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCUBjdi18WFyTpejxpzCC5W7SF-ykOZCtC1CvVp6GX3Q&s=10", desc: "True double-ikat Patola in graduated sunset tones — each thread dyed and aligned by hand before weaving, a craft now held by very few families.", tags: ["Double ikat", "Heirloom", "Limited"], sizes: ["6m"], colors: ["Sunset Orange", "Gold"], blouse: true, occasion: "Festive", },
  { id: 6, name: "Tussar Earthen Gold", fabric: "Tussar silk · Bhagalpur", price: 7799, old: 9299, rating: 4.4, reviews: 156, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLuoj-3t3DWSbDX3iofOakELXD8rjXrLyQHR0UMjfotA&s=10", desc: "Raw-textured Tussar in earthen gold with a contrast tussar border, carrying the natural sheen this wild silk is known for.", tags: ["Wild silk", "Textured", "Office wear"], sizes: ["5.5m", "6m", "6.5m"], colors: ["Earthen Gold", "Mustard"], blouse: false, occasion: "Office", },
  { id: 7, name: "Organza Blush Pearl", fabric: "Pure organza · Surat", price: 6499, old: 7999, rating: 4.6, reviews: 78, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQODm1cwEpiB0nOYltpvNOCOXaO99n7z1ud4JqrJ3YemQ&s=10", desc: "Sheer, fluid organza in blush pearl, finished with delicate sequin embroidery along the border — built for evening gatherings.", tags: ["Sheer drape", "Embroidered", "Party"], sizes: ["5.5m", "6m"], colors: ["Blush", "Pearl White", "Rose Gold"], blouse: true, occasion: "Party", },
  { id: 8, name: "Paithani Peacock Teal", fabric: "Paithani silk · Maharashtra", price: 16499, old: 20999, rating: 4.8, reviews: 93, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNTgKoBmfUYo_HBcmxlIjBpCnyBMuydVV92zkoa3iJQw&s", desc: "Peacock-teal Paithani with the signature woven peacock pallu motif and a kaleidoscope border, made on a traditional tilt loom.", tags: ["Peacock motif", "Tilt loom", "Heritage"], sizes: ["5.5m", "6m", "6.5m"], colors: ["Peacock Teal", "Teal", "Dark Green"], blouse: true, occasion: "Festive", },
  { id: 9, name: "Linen Maroon Stripe", fabric: "Pure linen · Bengal", price: 3999, old: 4999, rating: 4.3, reviews: 312, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF2d9jNHJ5i0ytSmrlDaznCpy00tcKG1PPl4bfjRYVBw&s=10", desc: "Crisp Bengal linen in maroon stripe, naturally cooling against the skin — a quiet, everyday staple for warm weather.", tags: ["Pure linen", "Breathable", "Casual"], sizes: ["5.5m", "6m", "6.5m", "7m"], colors: ["Maroon", "Wine", "Burgundy"], blouse: false, occasion: "Casual", },
  { id: 10, name: "Soft Silk Coral Bloom", fabric: "Soft silk · Bangalore", price: 5999, old: 7499, rating: 4.5, reviews: 58, img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcR3w2dhsjyW0SAnWPP08FS4MroE3oxtYw5KUbX1RRSmhnQ1s2FN-aPoGRDqvD8TdMhqMdnjmjgoIhWgS_CpwsmDKxzgNmn_quu2txuMhyU0Mh0BM1Ghkp-T4Q&usqp=CAc", desc: "A breezy soft-silk saree in coral bloom, with a delicate self-woven border that drapes beautifully for both day and evening wear.", tags: ["Soft silk", "Lightweight", "Festive"], sizes: ["5.5m", "6m"], colors: ["Coral", "Peach"], blouse: true, occasion: "Festive", },
  { id: 11, name: "Georgette Midnight Sapphire", fabric: "Pure georgette · Surat", price: 6999, old: 8999, rating: 4.6, reviews: 47, img: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRy7s1svpNkFR6vfZh4K04d_vG6XZPp0QWQFqU-h1wfOJp5IETkJvwRjdals3A8pEEA1-hz0Vr8VRBIS--zClVGOhbPzeVLsW2Wdo8Wlxxpns9xJL9jNFGJ&usqp=CAc", desc: "A flowing georgette in midnight sapphire, finished with delicate sequin scatter work that catches the light with every drape.", tags: ["Sequin work", "Flowy drape", "Party"], sizes: ["5.5m", "6m"], colors: ["Sapphire Blue", "Navy"], blouse: true, occasion: "Party", },
  { id: 12, name: "Banarasi Rani Pink", fabric: "Banarasi silk · Varanasi", price: 13999, old: 17999, rating: 4.8, reviews: 102, img: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcQ7ENkWIBbgHKx-Lp9k6_LHZRG9Uu7b6jAp8BtUXIHMSbUNXSbnOv5M8NPrAS4dDN9ZPwZ9gL7-HAsvYNi4pkMAAqV7I2ZD5T5HkciQozPx4AIJL_6HazNcaQ&usqp=CAc", desc: "A regal rani-pink Banarasi woven with intricate gold zari florals, designed to anchor any festive or bridal trousseau.", tags: ["Zari weave", "Heirloom", "Bridal"], sizes: ["5.5m", "6m", "6.5m"], colors: ["Rani Pink", "Magenta"], blouse: true, occasion: "Bridal", },
  { id: 13, name: "Cotton Handloom Sky Check", fabric: "Pure cotton handloom · Pochampally", price: 2999, old: 3799, rating: 4.4, reviews: 134, img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRic_FuBM8gPPzNuLm2xoLgGk0BdSGZ1LbsJ_WANtTBygqvIUlN84YrqVJ14E4wyfTfHmyqZCUt3zNOmLs0Xmib1K4fxRAPa1DOJjOdYZOYG78RkAbxept6u1o&usqp=CAc", desc: "A crisp handloom cotton in a soft sky-blue check, woven on a traditional pit loom — an easy everyday saree for office or errands.", tags: ["Handloom cotton", "Check weave", "Office wear"], sizes: ["5.5m", "6m"], colors: ["Sky Blue", "Powder Blue"], blouse: false, occasion: "Office", },
  { id: 14, name: "Chiffon Lilac Mist", fabric: "Pure chiffon · Surat", price: 4799, old: 5999, rating: 4.3, reviews: 71, img: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQErcwcdGSlcOFv4TbuDTqgcG5zNQ6E8Tr_gc-PATL-JIu7GSKULFm7_RmT8-7t_6zall94HBaTHyXnJiSGIYsf5qiNXP2eFuoiMrEPzXv0QZ2Wfa7swGQo&usqp=CAc", desc: "An airy chiffon in lilac mist with a fine printed border — soft, fluid, and effortless for warm-weather gatherings.", tags: ["Chiffon", "Printed border", "Summer"], sizes: ["5.5m", "6m"], colors: ["Lilac", "Lavender"], blouse: false, occasion: "Casual", },
  { id: 15, name: "Kanjivaram Sandal Gold", fabric: "Pure mulberry silk · Kanchipuram", price: 14999, old: 18999, rating: 4.9, reviews: 86, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMfe2xCvZWD0H25VVE134Jl9KFc2mndpPeHZH7AfVTYQ&s=10", desc: "A sandalwood-gold Kanjivaram with a wide contrast zari border, woven for occasions that call for timeless, understated grandeur.", tags: ["Pure silk", "Wide border", "Bridal"], sizes: ["6m", "6.5m"], colors: ["Sandal Gold", "Beige"], blouse: true, occasion: "Bridal", },
  { id: 16, name: "Tussar Olive Weave", fabric: "Tussar silk · Bhagalpur", price: 8299, old: 9999, rating: 4.5, reviews: 63, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnkRhVNXUGabskldV_2BX_7qcwMRwOYaS-svK76r3Nag&s=10", desc: "An earthy olive tussar with a fine ghicha texture and a subtle tone-on-tone border, suited for relaxed festive wear.", tags: ["Wild silk", "Tone-on-tone", "Festive"], sizes: ["5.5m", "6m", "6.5m"], colors: ["Olive", "Moss Green"], blouse: false, occasion: "Festive", },
  { id: 17, name: "Linen Charcoal Weave", fabric: "Pure linen · Bengal", price: 4399, old: 5499, rating: 4.4, reviews: 97, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTALBLAZ_cOtpqOFpJhckHE5Xpy9dwvENx49JUw3o_AhQ&s=10", desc: "A refined charcoal linen with a fine satin border, naturally breathable and built for long, busy workdays.", tags: ["Pure linen", "Satin border", "Office wear"], sizes: ["5.5m", "6m", "6.5m"], colors: ["Charcoal", "Graphite"], blouse: false, occasion: "Office", },
  { id: 18, name: "Organza Champagne Shimmer", fabric: "Pure organza · Surat", price: 7299, old: 8999, rating: 4.6, reviews: 54, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM_X7pv_ifaYokJ8tnN_SX3gWlSzhHNQqXboBah4U1-Q&s=10", desc: "A luminous champagne organza dusted with fine shimmer work along the pallu, made for evening soirées and receptions.", tags: ["Shimmer work", "Sheer drape", "Party"], sizes: ["5.5m", "6m"], colors: ["Champagne", "Gold"], blouse: true, occasion: "Party", },
];

const FABRICS = [
  { label: "Silk",    bg: "#6B1E2B", fg: "#E9D7A8", match: (p) => p.fabric.toLowerCase().includes("silk") },
  { label: "Zari",   bg: "#C9A24B", fg: "#43101C", match: (p) => p.tags.some(t => t.toLowerCase().includes("zari")) },
  { label: "Ikat",   bg: "#1F4747", fg: "#E9D7A8", match: (p) => p.fabric.toLowerCase().includes("ikat") },
  { label: "Linen",  bg: "#E7C3B9", fg: "#43101C", match: (p) => p.fabric.toLowerCase().includes("linen") },
  { label: "Cotton", bg: "#EFE5D2", fg: "#6B1E2B", match: (p) => p.fabric.toLowerCase().includes("cotton") },
  { label: "Organza",bg: "#43101C", fg: "#E9D7A8", match: (p) => p.fabric.toLowerCase().includes("organza") },
];

const COUPONS = { "SILK10": 10, "WEAVERS20": 20, "FIRST15": 15 };

const SAMPLE_REVIEWS = [
  { name: "Priya S.", rating: 5, text: "Absolutely stunning quality. The zari work is exquisite!", date: "12 Jun 2026" },
  { name: "Meena R.", rating: 4, text: "Beautiful drape, fast delivery. Very happy with the purchase.", date: "5 Jun 2026" },
  { name: "Kavitha L.", rating: 5, text: "Exactly as described. My mother loved it as a gift!", date: "28 May 2026" },
];

// Cinematic chapters for the VISITE-style scroll homepage
const CHAPTERS = [
  {
    id: "silk",
    label: "Silk",
    title: "SILK",
    subtitle: "Kanchipuram · Varanasi · Mysore",
    desc: "Woven on pit looms across South India for over four centuries. Each thread carries the weight of tradition and the shimmer of pure mulberry.",
    color: "#6B1E2B",
    accent: "#C9A24B",
    bg: "linear-gradient(135deg, #1a0a0f 0%, #3d1020 40%, #6B1E2B 100%)",
    overlayText: "Six yards · Endless grace",
    filter: "Silk",
  },
  {
    id: "zari",
    label: "Zari",
    title: "ZARI",
    subtitle: "22-karat gold thread · Handwoven",
    desc: "Real zari — gold wire wrapped around a silk core — catches light at every angle. It is the language weavers use to write in gold.",
    color: "#2a1a00",
    accent: "#E9D7A8",
    bg: "linear-gradient(135deg, #1a1000 0%, #3d2800 40%, #7a5500 100%)",
    overlayText: "Thread by thread · Woven in gold",
    filter: "Zari",
  },
  {
    id: "ikat",
    label: "Ikat",
    title: "IKAT",
    subtitle: "Double ikat · Patan · Pochampally",
    desc: "In double-ikat, both warp and weft are resist-dyed before weaving. The pattern emerges only on the loom — a craft held by fewer than a hundred families.",
    color: "#0d2020",
    accent: "#5ecfb0",
    bg: "linear-gradient(135deg, #061414 0%, #0f2e2e 50%, #1F4747 100%)",
    overlayText: "Resist-dyed · Born from the loom",
    filter: "Ikat",
  },
  {
    id: "organza",
    label: "Organza",
    title: "ORGANZA",
    subtitle: "Sheer silk organza · Surat",
    desc: "Organza breathes and floats. Its sheer body catches evening light like gossamer, making it the favoured canvas for embroidery and shimmer.",
    color: "#1a0a14",
    accent: "#e7c3b9",
    bg: "linear-gradient(135deg, #150a10 0%, #2d1020 50%, #4a1830 100%)",
    overlayText: "Light as breath · Luminous as dusk",
    filter: "Organza",
  },
  {
    id: "linen",
    label: "Linen",
    title: "LINEN",
    subtitle: "Bengal handloom · Breathable · Everyday",
    desc: "Bengali weavers have grown linen weaving into an art form — crisp, cooling, and deeply personal. The fabric that lets you move through the day.",
    color: "#1a1410",
    accent: "#c8b89a",
    bg: "linear-gradient(135deg, #12100a 0%, #2a2018 50%, #3d3020 100%)",
    overlayText: "Natural · Pure · Enduring",
    filter: "Linen",
  },
  {
    id: "cotton",
    label: "Cotton",
    title: "COTTON",
    subtitle: "Handloom cotton · Chanderi · Pochampally",
    desc: "Woven on wooden handlooms by artisan cooperatives, handloom cotton sarees are India's most democratic and ecological textile — beautiful every day.",
    color: "#12181a",
    accent: "#a8cfc0",
    bg: "linear-gradient(135deg, #0a1010 0%, #182020 50%, #243030 100%)",
    overlayText: "Honest cloth · Artisan hands",
    filter: "Cotton",
  },
];

const fmtDate = (d) => d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
const fmtMoney = (n) => "₹" + n.toLocaleString("en-IN");
const Stars = ({ rating, small }) => {
  const size = small ? 12 : 14;
  return (
    <span style={{ display: "inline-flex", gap: 1 }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24" fill={i <= Math.round(rating) ? "#C9A24B" : "#ddd"}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ))}
    </span>
  );
};

// Letter-by-letter animated text component
function LetterByLetter({ text, delay = 0, className = "", style = {} }) {
  return (
    <span className={className} style={{ display:"inline-block", ...style }}>
      {text.split("").map((ch, i) => (
        <span key={i} style={{
          display:"inline-block",
          animation:`letterDrop .04s ease both`,
          animationDelay:`${delay + i * 0.022}s`,
          opacity:0,
        }}>{ch === " " ? "\u00A0" : ch}</span>
      ))}
    </span>
  );
}

export default function SareeStore({ onGoToHome }) {
  const [page, setPage] = useState("home");
  const [PRODUCTS, setPRODUCTS] = useState(SEED_PRODUCTS);

  // ── Load products from MongoDB backend on mount ──
  useEffect(() => {
    fetch("https://weavers-backend.onrender.com/products")
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map((p, i) => ({
            id: p._id,
            name: p.name,
            fabric: p.category || "Handloom silk",
            price: p.price,
            old: Math.round(p.price * 1.25),
            rating: 4.5,
            reviews: 0,
            img: p.image,
            desc: p.description || "A beautiful handwoven saree from our collection.",
            tags: p.category ? [p.category] : ["New Arrival"],
            sizes: ["5.5m", "6m", "6.5m"],
            colors: ["As shown"],
            blouse: true,
            occasion: p.category || "Festive",
          }));
          // Combine: backend products first, then seed catalogue
          setPRODUCTS([...mapped, ...SEED_PRODUCTS]);
        }
      })
      .catch(err => console.warn("Backend not reachable, showing local catalogue:", err.message));
  }, []);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [step, setStep] = useState("detail");
  const [orders, setOrders] = useState([]);
  const [pausedChips, setPausedChips] = useState({});
  const [activeFilter, setActiveFilter] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [blouseIncluded, setBlouseIncluded] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");
  const [priceRange, setPriceRange] = useState([0, 25000]);
  const [occasionFilter, setOccasionFilter] = useState("");
  const [activeTab, setActiveTab] = useState("desc");
  const [toast, setToast] = useState(null);
  const [compareList, setCompareList] = useState([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const [viewMode, setViewMode] = useState("grid");
  const [form, setForm] = useState({ name:"", phone:"", address:"", city:"", pin:"", card:"", exp:"", cvv:"", upi:"" });
  const [payMethod, setPayMethod] = useState("upi");
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [activeChapter, setActiveChapter] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [activeProductPanel, setActiveProductPanel] = useState(null);
  const chaptersRef = useRef([]);
  const heroRef = useRef(null);
  const snapContainerRef = useRef(null);
  const storeSnapRef = useRef(null);

  // Parallax scroll for cinematic homepage
  useEffect(() => {
    if (page !== "home") return;
    const container = snapContainerRef.current;
    if (!container) return;
    const handleScroll = () => setScrollY(container.scrollTop);
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [page]);

  // Active chapter detection
  useEffect(() => {
    if (page !== "home") return;
    const container = snapContainerRef.current;
    if (!container) return;
    const handleScroll = () => {
      const vh = window.innerHeight;
      // Hero is index 0; chapters start at index 1
      const heroEl = heroRef.current;
      if (heroEl) {
        const rect = heroEl.getBoundingClientRect();
        if (rect.top <= vh * 0.5 && rect.bottom >= vh * 0.5) { setActiveChapter(0); return; }
      }
      chaptersRef.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= vh * 0.5 && rect.bottom >= vh * 0.5) setActiveChapter(i + 1);
      });
    };
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [page]);

  const spawnSparks = (e) => {
    const colors = ["var(--gold)","var(--blush)","#fff","var(--gold-light)","var(--teal)"];
    for(let i=0;i<10;i++){
      const el=document.createElement("div");
      el.className="spark";
      const angle=Math.random()*360;const dist=40+Math.random()*60;
      el.style.cssText=`left:${e.clientX}px;top:${e.clientY}px;background:${colors[i%colors.length]};--tx:${Math.cos(angle*Math.PI/180)*dist}px;--ty:${Math.sin(angle*Math.PI/180)*dist}px;animation-delay:${i*0.03}s;`;
      document.body.appendChild(el);
      setTimeout(()=>el.remove(),800);
    }
  };

  const showToast = (msg, type="success") => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  const occasions = [...new Set(PRODUCTS.map(p => p.occasion))];

  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];
    if (activeFilter) list = list.filter(FABRICS.find(f => f.label === activeFilter)?.match || (() => true));
    if (occasionFilter) list = list.filter(p => p.occasion === occasionFilter);
    if (searchQuery) list = list.filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.fabric.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    list = list.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    if (sortBy === "price-asc") list.sort((a,b) => a.price - b.price);
    else if (sortBy === "price-desc") list.sort((a,b) => b.price - a.price);
    else if (sortBy === "rating") list.sort((a,b) => b.rating - a.rating);
    else if (sortBy === "popular") list.sort((a,b) => b.reviews - a.reviews);
    return list;
  }, [activeFilter, occasionFilter, searchQuery, priceRange, sortBy]);

  const [activePanelIndex, setActivePanelIndex] = useState(0);

  useEffect(() => {
    if (page !== "store") return;
    const container = storeSnapRef.current;
    if (!container) return;
    const handleScroll = () => {
      const panels = container.querySelectorAll(".prod-panel");
      panels.forEach((el, i) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.5) {
          setActivePanelIndex(i);
        }
      });
    };
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [page, filteredProducts]);

  const relatedProducts = useMemo(() => {
    if (!activeProduct) return [];
    const sameOccasion = PRODUCTS.filter(p => p.id !== activeProduct.id && p.occasion === activeProduct.occasion);
    const rest = PRODUCTS.filter(p => p.id !== activeProduct.id && p.occasion !== activeProduct.occasion);
    return [...sameOccasion, ...rest].slice(0, 5);
  }, [activeProduct]);

  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const discount = appliedCoupon ? Math.round(cartTotal * appliedCoupon / 100) : 0;
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const openDrawer = (product) => {
    document.querySelector(".drawer")?.scrollTo({ top: 0, behavior: "instant" });
    setActiveProduct(product);
    setQty(1);
    setStep("detail");
    setSelectedSize(product.sizes[0]);
    setSelectedColor(product.colors[0]);
    setBlouseIncluded(false);
    setAppliedCoupon(null);
    setCouponCode("");
    setCouponError("");
    setActiveTab("desc");
    setDrawerOpen(true);
    setCartOpen(false);
    setRecentlyViewed(prev => [product, ...prev.filter(p => p.id !== product.id)].slice(0, 5));
  };

  const closeAll = () => { setDrawerOpen(false); setCartOpen(false); };
  const changeQty = (d) => setQty((q) => Math.max(1, Math.min(9, q + d)));
  const handleField = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const toggleWishlist = (id) => {
    setWishlist(w => w.includes(id) ? w.filter(x => x !== id) : [...w, id]);
    showToast(wishlist.includes(id) ? "Removed from wishlist" : "Added to wishlist ♥");
  };

  const addToCart = (product, q = qty) => {
    setCart(prev => {
      const exists = prev.find(i => i.id === product.id && i.size === selectedSize && i.color === selectedColor);
      if (exists) return prev.map(i => i.id === product.id && i.size === selectedSize && i.color === selectedColor ? { ...i, qty: Math.min(9, i.qty + q) } : i);
      return [...prev, { ...product, qty: q, size: selectedSize || product.sizes[0], color: selectedColor || product.colors[0], blouse: blouseIncluded }];
    });
    showToast("Added to cart 🛒");
  };

  const removeFromCart = (id, size, color) => setCart(prev => prev.filter(i => !(i.id === id && i.size === size && i.color === color)));
  const updateCartQty = (id, size, color, d) => setCart(prev => prev.map(i => i.id === id && i.size === size && i.color === color ? { ...i, qty: Math.max(1, Math.min(9, i.qty + d)) } : i));

  const applyCoupon = () => {
    const disc = COUPONS[couponCode.trim().toUpperCase()];
    if (disc) { setAppliedCoupon(disc); setCouponError(""); showToast(`${disc}% discount applied! 🎉`); }
    else { setCouponError("Invalid coupon code"); setAppliedCoupon(null); }
  };

  const toggleCompare = (p) => {
    setCompareList(prev => {
      if (prev.find(x => x.id === p.id)) return prev.filter(x => x.id !== p.id);
      if (prev.length >= 3) { showToast("Compare max 3 sarees", "error"); return prev; }
      return [...prev, p];
    });
  };

  const pay = () => {
    if (!form.name.trim() || !form.address.trim() || !form.city.trim()) { alert("Please fill in your name, address and city."); return; }
    setStep("processing");
    const orderDate = new Date();
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 5);
    setTimeout(() => {
      const itemsToOrder = cartOpen ? cart : [{ ...activeProduct, qty, size: selectedSize, color: selectedColor, blouse: blouseIncluded }];
      setOrders(prev => [{ items: itemsToOrder, total: cartOpen ? cartTotal - discount : activeProduct.price * qty, orderDate: fmtDate(orderDate), deliveryDate: fmtDate(deliveryDate), city: form.city, address: `${form.address}, ${form.city}${form.pin ? " - " + form.pin : ""}`, status: "Confirmed" }, ...prev]);
      if (cartOpen) setCart([]);
      setStep("success");
    }, 1500);
  };

  const trackOrder = () => { closeAll(); setPage("orders"); };

  const openCartCheckout = () => {
    setCartOpen(false);
    setStep("checkout");
    setDrawerOpen(true);
  };

  const scrollToStore = () => {
    setActiveFilter(null);
    setOccasionFilter("");
    setSearchQuery("");
    setPage("store");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const enterChapter = (filter) => {
    setActiveFilter(filter);
    setOccasionFilter("");
    setSearchQuery("");
    setPage("store");
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <div style={{ background: "#0a0608", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600&family=Poppins:wght@300;400;500;600&display=swap');
        :root{
          --maroon:#6B1E2B; --maroon-dark:#43101C; --gold:#C9A24B; --gold-light:#E9D7A8;
          --ivory:#F8F1E4; --ivory-dim:#EFE5D2; --teal:#1F4747; --ink:#241414; --blush:#E7C3B9;
        }
        *{box-sizing:border-box;margin:0;padding:0;}
        .ws-root{font-family:'Poppins',sans-serif;color:var(--ink);overflow-x:hidden;}
        .ws-serif{font-family:'Cormorant Garamond',serif;}
        .ws-root button{font-family:'Poppins',sans-serif;cursor:pointer;border:none;background:none;}

        /* ══════════════════════════════
           CINEMATIC NAV
        ══════════════════════════════ */
        .c-nav{position:fixed;top:0;left:0;right:0;z-index:200;display:flex;align-items:center;justify-content:space-between;padding:20px 5vw;transition:background .4s,backdrop-filter .4s,padding .4s;}
        .c-nav.scrolled{background:rgba(10,6,8,.88);backdrop-filter:blur(18px);padding:14px 5vw;}
        .c-brand{display:flex;align-items:center;gap:10px;cursor:pointer;}
        .c-brand-mark{width:28px;height:28px;flex-shrink:0;}
        .c-brand-text{font-family:'Cormorant Garamond',serif;font-size:24px;font-weight:700;letter-spacing:3px;color:#E9D7A8;line-height:1;}
        .c-brand-sub{font-size:8px;letter-spacing:3px;text-transform:uppercase;color:rgba(233,215,168,.5);display:block;margin-top:2px;}
        .c-nav-links{display:flex;align-items:center;gap:32px;}
        .c-nav-link{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:rgba(233,215,168,.7);cursor:pointer;transition:color .2s;white-space:nowrap;}
        .c-nav-link:hover,.c-nav-link.active{color:#E9D7A8;}
        .c-nav-right{display:flex;align-items:center;gap:16px;}
        .c-cart-btn{position:relative;width:40px;height:40px;border-radius:50%;border:1px solid rgba(201,162,75,.3);display:flex;align-items:center;justify-content:center;color:#E9D7A8;transition:border-color .2s,background .2s;}
        .c-cart-btn:hover{border-color:#C9A24B;background:rgba(201,162,75,.1);}
        .c-cart-btn svg{width:18px;height:18px;}
        .c-badge{position:absolute;top:-4px;right:-4px;background:var(--gold);color:var(--maroon-dark);font-size:9px;font-weight:700;border-radius:50%;width:16px;height:16px;display:flex;align-items:center;justify-content:center;}

        /* ══════════════════════════════
           CINEMATIC HERO
        ══════════════════════════════ */
        .c-hero{position:relative;height:100vh;min-height:600px;display:flex;align-items:center;justify-content:center;overflow:hidden;background:#0a0608;}
        .c-hero-bg{position:absolute;inset:0;background:radial-gradient(ellipse 80% 80% at 70% 60%, rgba(107,30,43,.45) 0%, rgba(10,6,8,1) 70%);z-index:1;}
        .c-hero-fabric{position:absolute;inset:0;z-index:0;opacity:.13;background-image:repeating-linear-gradient(45deg, rgba(201,162,75,.4) 0 1px, transparent 1px 48px), repeating-linear-gradient(-45deg, rgba(201,162,75,.2) 0 1px, transparent 1px 48px);}
        .c-hero-content{position:relative;z-index:2;text-align:center;padding:0 5vw;}
        .c-hero-eyebrow{font-size:10px;letter-spacing:6px;text-transform:uppercase;color:rgba(201,162,75,.7);display:block;margin-bottom:28px;animation:fadeUp .9s ease .1s both;}
        .c-hero-title{font-family:'Cormorant Garamond',serif;font-size:clamp(64px,10vw,130px);font-weight:300;line-height:.92;color:#E9D7A8;margin-bottom:8px;animation:fadeUp .9s ease .25s both;}
        .c-hero-title em{font-style:italic;color:#C9A24B;}
        .c-hero-sub{font-size:clamp(14px,2vw,20px);font-family:'Cormorant Garamond',serif;font-style:italic;color:rgba(233,215,168,.55);letter-spacing:1px;margin-bottom:56px;animation:fadeUp .9s ease .4s both;}
        .c-hero-cta{display:inline-flex;align-items:center;gap:12px;padding:16px 40px;background:transparent;border:1px solid rgba(201,162,75,.5);color:#E9D7A8;font-size:11px;letter-spacing:3px;text-transform:uppercase;border-radius:2px;cursor:pointer;transition:background .3s,border-color .3s;animation:fadeUp .9s ease .55s both;}
        .c-hero-cta:hover{background:rgba(201,162,75,.12);border-color:#C9A24B;}
        .c-hero-cta svg{width:16px;height:16px;transition:transform .3s;}
        .c-hero-cta:hover svg{transform:translateX(5px);}
        .c-hero-scroll{position:absolute;bottom:40px;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:8px;z-index:2;animation:fadeUp 1s ease .8s both;}
        .c-scroll-line{width:1px;height:60px;background:linear-gradient(to bottom, transparent, rgba(201,162,75,.6));animation:scrollPulse 2s ease-in-out infinite;}
        @keyframes scrollPulse{0%,100%{opacity:.4;transform:scaleY(1);}50%{opacity:1;transform:scaleY(1.2);transform-origin:top;}}
        .c-scroll-label{font-size:9px;letter-spacing:3px;text-transform:uppercase;color:rgba(201,162,75,.5);}
        @keyframes fadeUp{from{opacity:0;transform:translateY(32px);}to{opacity:1;transform:translateY(0);}}

        /* ══════════════════════════════
           3D BACK BUTTON
        ══════════════════════════════ */
        .back-btn-wrap{display:inline-block;perspective:600px;margin-bottom:28px;}
        .back-btn{
          position:relative;display:inline-flex;align-items:center;gap:10px;
          padding:12px 28px;font-family:'Poppins',sans-serif;font-size:11px;
          font-weight:600;letter-spacing:3px;text-transform:uppercase;
          color:#E9D7A8;background:transparent;border:none;cursor:pointer;
          transform-style:preserve-3d;
          transition:transform .15s ease,color .25s;
          transform:rotateX(0deg) rotateY(0deg) translateZ(0px);
        }
        .back-btn::before{
          content:'';position:absolute;inset:0;
          background:linear-gradient(135deg,rgba(201,162,75,.18) 0%,rgba(107,30,43,.22) 100%);
          border:1px solid rgba(201,162,75,.35);border-radius:4px;
          transform:translateZ(-8px);
          box-shadow:0 8px 32px -8px rgba(201,162,75,.2),0 2px 0 0 rgba(201,162,75,.15);
          transition:transform .15s ease,box-shadow .25s;
        }
        .back-btn::after{
          content:'';position:absolute;inset:0;
          background:linear-gradient(135deg,rgba(201,162,75,.08) 0%,rgba(107,30,43,.1) 100%);
          border:1px solid rgba(201,162,75,.5);border-radius:4px;
          opacity:0;transition:opacity .25s;
        }
        .back-btn:hover{color:#C9A24B;transform:rotateX(8deg) rotateY(-6deg) translateZ(6px);}
        .back-btn:hover::before{transform:translateZ(-14px);box-shadow:0 18px 48px -10px rgba(201,162,75,.35),0 4px 0 0 rgba(201,162,75,.25);}
        .back-btn:hover::after{opacity:1;}
        .back-btn:active{transform:rotateX(2deg) rotateY(-1deg) translateZ(2px);}
        .back-btn:active::before{transform:translateZ(-4px);box-shadow:0 4px 16px -4px rgba(201,162,75,.2),0 1px 0 0 rgba(201,162,75,.15);}
        .back-btn-arrow{display:inline-flex;align-items:center;transition:transform .3s cubic-bezier(.34,1.56,.64,1);}
        .back-btn:hover .back-btn-arrow{transform:translateX(-5px);}
        .back-btn-text{position:relative;z-index:1;}
        @keyframes backBtnEntrance{
          0%{opacity:0;transform:rotateX(-40deg) rotateY(20deg) translateZ(-30px) translateY(-10px);}
          60%{transform:rotateX(6deg) rotateY(-4deg) translateZ(4px) translateY(0);}
          100%{opacity:1;transform:rotateX(0deg) rotateY(0deg) translateZ(0px) translateY(0);}
        }
        .back-btn-wrap.animate-in{animation:backBtnEntrance .55s cubic-bezier(.2,.8,.2,1) both;}

        /* ══════════════════════════════
           SCROLL SNAP CONTAINER
        ══════════════════════════════ */
        .c-snap-container{height:100vh;overflow-y:scroll;scroll-snap-type:y mandatory;scroll-behavior:smooth;}
        .c-snap-container::-webkit-scrollbar{display:none;}
        .c-snap-container{-ms-overflow-style:none;scrollbar-width:none;}
        .c-snap-section{scroll-snap-align:start;scroll-snap-stop:always;}

        /* ══════════════════════════════
           CHAPTER PANELS (VISITE STYLE)
        ══════════════════════════════ */
        .c-chapter{position:relative;height:100vh;min-height:600px;display:flex;align-items:center;overflow:hidden;transition:filter .4s;}
        .c-chapter:hover .c-chapter-overlay{background:linear-gradient(90deg, rgba(0,0,0,.75) 0%, rgba(0,0,0,.45) 50%, rgba(0,0,0,.05) 100%);}
        .c-chapter:hover .c-chapter-img-main{transform:scale(1.08) !important;}
        .c-chapter:hover .c-chapter-hint{width:80px !important;opacity:1 !important;}
        .c-chapter:hover .c-chapter-hint span{width:36px !important;}
        .c-chapter-bg{position:absolute;inset:0;transition:opacity 1s;}
        .c-chapter-overlay{position:absolute;inset:0;background:linear-gradient(90deg, rgba(0,0,0,.85) 0%, rgba(0,0,0,.55) 50%, rgba(0,0,0,.15) 100%);}
        .c-chapter-content{position:relative;z-index:2;padding:0 8vw;max-width:560px;}
        .c-chapter-num{font-family:'Cormorant Garamond',serif;font-size:200px;font-weight:300;line-height:1;position:absolute;right:5vw;top:50%;transform:translateY(-50%);color:rgba(255,255,255,.04);pointer-events:none;user-select:none;letter-spacing:-8px;}
        .c-chapter-tag{font-size:9px;letter-spacing:5px;text-transform:uppercase;margin-bottom:18px;display:block;}
        .c-chapter-title{font-family:'Cormorant Garamond',serif;font-size:clamp(56px,8vw,110px);font-weight:300;line-height:.9;margin-bottom:20px;letter-spacing:-2px;}
        .c-chapter-subtitle{font-family:'Cormorant Garamond',serif;font-size:16px;font-style:italic;margin-bottom:20px;opacity:.7;}
        .c-chapter-desc{font-size:14px;line-height:1.9;margin-bottom:36px;opacity:.7;max-width:420px;}
        .c-chapter-btn{display:inline-flex;align-items:center;gap:10px;padding:14px 32px;border:1px solid currentColor;font-size:10px;letter-spacing:3px;text-transform:uppercase;cursor:pointer;background:transparent;transition:background .3s;border-radius:2px;}
        .c-chapter-btn:hover{background:rgba(255,255,255,.08);}
        .c-chapter-btn svg{width:14px;height:14px;transition:transform .3s;}
        .c-chapter-btn:hover svg{transform:translateX(5px);}
        .c-chapter-images{position:absolute;right:0;top:0;bottom:0;width:45%;display:flex;align-items:center;justify-content:center;overflow:hidden;}
        .c-chapter-img-stack{position:relative;width:100%;height:100%;}
        .c-chapter-img-main{position:absolute;right:0;top:10%;width:75%;height:80%;object-fit:cover;transform:translateY(0);transition:transform .6s ease;}
        .c-chapter-img-accent{position:absolute;right:55%;bottom:10%;width:45%;height:55%;object-fit:cover;border:3px solid rgba(255,255,255,.08);}

        /* NAV DOTS */
        .c-nav-dots{position:fixed;right:28px;top:50%;transform:translateY(-50%);display:flex;flex-direction:column;gap:10px;z-index:150;}
        .c-nav-dot{width:6px;height:6px;border-radius:50%;background:rgba(201,162,75,.3);cursor:pointer;transition:all .3s;}
        .c-nav-dot.active{background:#C9A24B;transform:scale(1.5);}

        /* ══════════════════════════════
           MARQUEE TICKER
        ══════════════════════════════ */
        .c-marquee{background:rgba(201,162,75,.12);border-top:1px solid rgba(201,162,75,.15);border-bottom:1px solid rgba(201,162,75,.15);overflow:hidden;padding:10px 0;white-space:nowrap;}
        .c-marquee-track{display:inline-flex;animation:marqueeScroll 32s linear infinite;}
        .c-marquee-track:hover{animation-play-state:paused;}
        @keyframes marqueeScroll{from{transform:translateX(0);}to{transform:translateX(-50%);}}
        .c-marquee-item{display:inline-flex;align-items:center;gap:14px;font-size:10px;font-weight:600;letter-spacing:2.5px;text-transform:uppercase;color:rgba(201,162,75,.8);padding:0 40px;}
        .c-marquee-dot{width:3px;height:3px;border-radius:50%;background:rgba(201,162,75,.5);}

        /* ══════════════════════════════
           STATS / MANIFESTO SECTION
        ══════════════════════════════ */
        .c-manifesto{background:#0d0810;padding:100px 5vw;text-align:center;position:relative;overflow:hidden;}
        .c-manifesto::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 60% 40% at 50% 50%, rgba(107,30,43,.2) 0%, transparent 70%);pointer-events:none;}
        .c-manifesto-eyebrow{font-size:9px;letter-spacing:5px;text-transform:uppercase;color:rgba(201,162,75,.5);margin-bottom:24px;display:block;}
        .c-manifesto-title{font-family:'Cormorant Garamond',serif;font-size:clamp(32px,5vw,64px);font-weight:300;color:#E9D7A8;line-height:1.1;margin-bottom:24px;max-width:700px;margin-left:auto;margin-right:auto;}
        .c-manifesto-title em{font-style:italic;color:#C9A24B;}
        .c-manifesto-body{font-size:14px;color:rgba(233,215,168,.5);line-height:1.9;max-width:520px;margin:0 auto 70px;}
        .c-stats{display:flex;justify-content:center;gap:0;flex-wrap:wrap;max-width:700px;margin:0 auto;}
        .c-stat{flex:1;min-width:140px;padding:24px 30px;border-right:1px solid rgba(201,162,75,.1);}
        .c-stat:last-child{border-right:none;}
        .c-stat-num{font-family:'Cormorant Garamond',serif;font-size:52px;font-weight:300;color:#C9A24B;display:block;line-height:1;}
        .c-stat-label{font-size:9px;letter-spacing:2px;text-transform:uppercase;color:rgba(233,215,168,.4);margin-top:6px;display:block;}

        /* ══════════════════════════════
           CINEMATIC FOOTER
        ══════════════════════════════ */
        .c-footer{background:#060406;padding:80px 5vw 40px;border-top:1px solid rgba(201,162,75,.1);}
        .c-footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr;gap:60px;margin-bottom:60px;}
        .c-footer-brand{font-family:'Cormorant Garamond',serif;font-size:32px;font-weight:300;letter-spacing:4px;color:#E9D7A8;margin-bottom:14px;}
        .c-footer-tagline{font-size:11px;color:rgba(233,215,168,.35);letter-spacing:1.5px;line-height:1.8;max-width:280px;}
        .c-footer-col-title{font-size:9px;letter-spacing:3px;text-transform:uppercase;color:rgba(201,162,75,.6);margin-bottom:20px;}
        .c-footer-link{display:block;font-size:12px;color:rgba(233,215,168,.4);cursor:pointer;margin-bottom:10px;transition:color .2s;letter-spacing:.3px;}
        .c-footer-link:hover{color:#E9D7A8;}
        .c-footer-trust{display:flex;align-items:center;gap:8px;font-size:11px;color:rgba(233,215,168,.35);margin-bottom:10px;}
        .c-footer-trust svg{width:14px;height:14px;color:rgba(201,162,75,.5);flex-shrink:0;}
        .c-footer-bottom{border-top:1px solid rgba(201,162,75,.08);padding-top:24px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;}
        .c-footer-copy{font-size:10px;color:rgba(233,215,168,.2);letter-spacing:1px;}

        /* ══════════════════════════════
           STORE NAV (non-home pages)
        ══════════════════════════════ */
        .nav{position:sticky;top:0;z-index:50;display:flex;align-items:center;justify-content:space-between;
          padding:14px 5vw;background:var(--maroon);color:var(--ivory);box-shadow:0 2px 18px rgba(67,16,28,.25);}
        .brand-wrap{display:flex;align-items:center;gap:10px;cursor:pointer;}
        .brand-mark{width:30px;height:30px;flex-shrink:0;}
        .brand-text{font-family:'Cormorant Garamond',serif;font-size:26px;font-weight:700;letter-spacing:2px;color:var(--gold-light);line-height:1;}
        .brand-sub{font-size:9px;letter-spacing:2px;text-transform:uppercase;color:var(--blush);display:block;margin-top:2px;}
        .nav-right{display:flex;align-items:center;gap:22px;}
        .nav-links{display:flex;align-items:center;gap:22px;}
        .nav-link{font-size:12px;letter-spacing:1.5px;text-transform:uppercase;color:var(--ivory-dim);position:relative;padding-bottom:4px;transition:color .25s;cursor:pointer;white-space:nowrap;}
        .nav-link.active,.nav-link:hover{color:var(--gold-light);}
        .nav-link.active::after{content:'';position:absolute;left:0;right:0;bottom:-2px;height:2px;background:var(--gold);}
        .nav-icon-btn{width:38px;height:38px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:var(--gold-light);position:relative;transition:background .2s;}
        .nav-icon-btn:hover{background:rgba(255,255,255,.12);}
        .nav-icon-btn svg{width:20px;height:20px;}
        .badge{position:absolute;top:-3px;right:-3px;background:var(--gold);color:var(--maroon-dark);font-size:9px;font-weight:700;border-radius:50%;width:16px;height:16px;display:flex;align-items:center;justify-content:center;}

        /* SEARCH BAR */
        .search-bar{background:var(--maroon-dark);padding:10px 5vw;display:flex;gap:10px;align-items:center;}
        .search-wrap{flex:1;position:relative;}
        .search-wrap input{width:100%;padding:9px 14px 9px 38px;border-radius:6px;border:none;background:rgba(255,255,255,.1);color:var(--ivory);font-size:13px;font-family:'Poppins',sans-serif;outline:none;}
        .search-wrap input::placeholder{color:rgba(233,215,168,.5);}
        .search-wrap input:focus{background:rgba(255,255,255,.16);}
        .search-icon{position:absolute;left:11px;top:50%;transform:translateY(-50%);color:var(--gold-light);opacity:.7;}
        .search-icon svg{width:16px;height:16px;}
        .sort-sel{padding:9px 12px;border-radius:6px;border:none;background:rgba(255,255,255,.1);color:var(--gold-light);font-size:12px;font-family:'Poppins',sans-serif;cursor:pointer;outline:none;}
        .sort-sel option{background:var(--maroon-dark);color:var(--ivory);}
        .view-toggle{display:flex;gap:4px;}
        .view-btn-tog{width:34px;height:34px;border-radius:5px;display:flex;align-items:center;justify-content:center;color:var(--gold-light);transition:background .2s;}
        .view-btn-tog.active,.view-btn-tog:hover{background:rgba(255,255,255,.15);}
        .view-btn-tog svg{width:16px;height:16px;}

        /* FILTER CHIPS */
        .float-strip{display:flex;justify-content:center;align-items:center;gap:28px;flex-wrap:wrap;padding:36px 5vw 24px;perspective:900px;background:var(--ivory);}
        .chip-scene{width:88px;height:88px;perspective:600px;}
        .chip-coin{width:100%;height:100%;position:relative;transform-style:preserve-3d;border-radius:50%;animation:coinSpin 7s ease-in-out infinite;}
        @keyframes coinSpin{0%{transform:rotateY(0deg) translateY(0px);}25%{transform:rotateY(90deg) translateY(-10px);}50%{transform:rotateY(180deg) translateY(0px);}75%{transform:rotateY(270deg) translateY(-10px);}100%{transform:rotateY(360deg) translateY(0px);}}
        .chip-face{position:absolute;inset:0;border-radius:50%;display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:10px;letter-spacing:.5px;text-transform:uppercase;font-weight:700;text-align:center;padding:8px;line-height:1.3;backface-visibility:hidden;-webkit-backface-visibility:hidden;box-shadow:0 14px 26px -10px rgba(67,16,28,.35);}
        .chip-sub{font-size:8px;font-weight:400;letter-spacing:1px;opacity:.85;margin-top:2px;}
        .chip-front{transform:rotateY(0deg);}
        .chip-back{transform:rotateY(180deg);}

        /* FILTERS ROW */
        .filters-row{padding:0 5vw 18px;display:flex;gap:10px;flex-wrap:wrap;align-items:center;background:var(--ivory);}
        @keyframes pillFloat{0%{transform:perspective(400px) rotateX(0deg) translateY(0px);box-shadow:0 2px 8px rgba(201,162,75,.3);}50%{transform:perspective(400px) rotateX(8deg) translateY(-4px);box-shadow:0 8px 20px rgba(201,162,75,.45);}100%{transform:perspective(400px) rotateX(0deg) translateY(0px);box-shadow:0 2px 8px rgba(201,162,75,.3);}}
        .filter-pill{padding:6px 14px;border-radius:20px;font-size:11px;border:2px solid var(--gold);background:#fff;color:var(--maroon-dark);cursor:pointer;white-space:nowrap;font-weight:600;animation:pillFloat 3s ease-in-out infinite;transform-style:preserve-3d;transition:background .2s,color .2s,border-color .2s;}
        .filter-pill:hover{animation-play-state:paused;transform:perspective(400px) rotateX(12deg) translateY(-6px) scale(1.07);box-shadow:0 12px 28px rgba(107,30,43,.35);background:var(--maroon);color:var(--gold-light);border-color:var(--gold);}
        .filter-pill.active{animation-play-state:paused;background:var(--maroon);color:var(--gold-light);border-color:var(--gold);box-shadow:0 6px 18px rgba(107,30,43,.35);transform:perspective(400px) rotateX(6deg) translateY(-3px);}
        .price-label{font-size:11px;color:#8a7a6a;letter-spacing:.5px;}
        .clear-filters{font-size:11px;color:var(--gold-light);font-weight:600;cursor:pointer;background:var(--maroon);border:1px solid var(--gold);padding:6px 14px;border-radius:20px;margin-left:auto;white-space:nowrap;transition:background .2s;}
        .results-count{padding:8px 5vw 10px;font-size:12px;color:#8a7a6a;letter-spacing:.5px;background:var(--ivory);}

        /* GRID */
        .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:28px;padding:10px 5vw 80px;background:var(--ivory);}
        .grid.list-view{grid-template-columns:1fr;}

        /* CARDS */
        .card{position:relative;border-radius:16px;cursor:pointer;opacity:0;transform:translateY(60px) scale(0.96);transition:opacity .7s cubic-bezier(.2,.8,.2,1), transform .7s cubic-bezier(.2,.8,.2,1), box-shadow .5s;overflow:hidden;height:420px;box-shadow:0 8px 32px -8px rgba(67,16,28,.35);}
        .card.card-visible{opacity:1;transform:translateY(0) scale(1);}
        .card:hover{box-shadow:0 28px 60px -12px rgba(67,16,28,.55);transform:translateY(-8px) scale(1.02)!important;}
        .card-inner{width:100%;height:100%;position:relative;}
        .card-front{width:100%;height:100%;position:relative;}
        .card-media{position:absolute;inset:-12% 0;height:124%;overflow:hidden;transition:transform .7s cubic-bezier(.2,.8,.2,1);}
        .card-media img{width:100%;height:100%;object-fit:cover;display:block;transform:scale(1.12);transition:transform .7s cubic-bezier(.2,.8,.2,1),filter .5s;}
        .card:hover .card-media{transform:translateY(-5%);}
        .card:hover .card-media img{transform:scale(1.18)!important;filter:brightness(0.68);}
        .card-front::after{content:'';position:absolute;inset:0;background:linear-gradient(to top, rgba(36,10,10,.95) 0%, rgba(36,10,10,.5) 38%, rgba(0,0,0,.08) 65%, transparent 100%);z-index:1;transition:opacity .5s;}
        .card:hover .card-front::after{background:linear-gradient(to top, rgba(36,10,10,.98) 0%, rgba(36,10,10,.65) 50%, rgba(0,0,0,.2) 75%, transparent 100%);}
        .card-tag{position:absolute;top:16px;left:16px;background:rgba(201,162,75,.18);color:var(--gold-light);font-size:9px;letter-spacing:2px;text-transform:uppercase;padding:5px 11px;border-radius:20px;backdrop-filter:blur(6px);border:1px solid rgba(201,162,75,.3);z-index:3;opacity:0;transform:translateY(-8px);transition:opacity .4s .3s,transform .4s .3s;}
        .card.card-visible .card-tag{opacity:1;transform:translateY(0);}
        .card-actions{position:absolute;top:14px;right:14px;display:flex;flex-direction:column;gap:7px;z-index:4;opacity:0;transform:translateX(10px);transition:opacity .3s,transform .3s;}
        .card:hover .card-actions{opacity:1;transform:translateX(0);}
        .card-action-btn{width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.15);backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;transition:all .2s;color:#fff;}
        .card-action-btn:hover{background:rgba(255,255,255,.3);transform:scale(1.15);}
        .card-action-btn svg{width:15px;height:15px;}
        .card-action-btn.wishlisted{background:var(--maroon);border-color:var(--maroon);animation:heartPop .3s ease;}
        @keyframes heartPop{0%{transform:scale(1);}50%{transform:scale(1.4);}100%{transform:scale(1);}}
        .card-action-btn.compared{background:var(--teal);border-color:var(--teal);}
        @keyframes badgePulse{0%,100%{box-shadow:0 0 0 0 rgba(31,71,71,.5);}70%{box-shadow:0 0 0 6px rgba(31,71,71,0);}}
        .badge-discount{position:absolute;top:16px;left:50%;transform:translateX(-50%);background:var(--teal);color:#dff3ec;font-size:9px;font-weight:700;letter-spacing:.5px;padding:4px 10px;border-radius:20px;z-index:3;animation:badgePulse 2s infinite;white-space:nowrap;}
        .card-body{position:absolute;bottom:0;left:0;right:0;z-index:2;padding:22px 22px 20px;transform:translateY(70px);transition:transform .6s cubic-bezier(.2,.8,.2,1);}
        .card.card-visible .card-body{transform:translateY(58px);}
        .card:hover .card-body{transform:translateY(0)!important;}
        .card-name{font-family:'Cormorant Garamond',serif;font-size:22px;font-weight:600;margin:0 0 3px;color:#fff;line-height:1.15;text-shadow:0 2px 12px rgba(0,0,0,.4);}
        .card-fabric{font-size:10px;color:rgba(233,215,168,.75);letter-spacing:1px;margin:0 0 8px;text-transform:uppercase;}
        .card-rating{display:flex;align-items:center;gap:6px;margin-bottom:12px;}
        .card-rating span{font-size:11px;color:rgba(233,215,168,.7);}
        .card-bottom{display:flex;align-items:center;justify-content:space-between;gap:8px;opacity:0;transform:translateY(16px);transition:opacity .4s .12s,transform .4s .12s;}
        .card:hover .card-bottom{opacity:1;transform:translateY(0);}
        .card-price{font-size:18px;font-weight:700;color:#fff;}
        .card-price .old{font-size:11px;color:rgba(255,255,255,.45);text-decoration:line-through;font-weight:400;margin-right:6px;}
        .card-btns{display:flex;gap:7px;}
        .cart-btn{height:36px;padding:0 14px;border-radius:8px;background:var(--gold);color:var(--maroon-dark);font-size:11px;font-weight:700;border:none;transition:all .2s;display:flex;align-items:center;gap:5px;letter-spacing:.3px;}
        .cart-btn:hover{background:var(--gold-light);transform:scale(1.05);}
        .cart-btn svg{width:13px;height:13px;}
        .view-btn{width:36px;height:36px;border-radius:50%;background:rgba(255,255,255,.15);border:1.5px solid rgba(255,255,255,.4);color:#fff;display:flex;align-items:center;justify-content:center;transition:all .25s;flex-shrink:0;backdrop-filter:blur(4px);}
        .view-btn:hover{background:#fff;color:var(--maroon-dark);}
        .view-btn svg{width:16px;height:16px;}
        .grid.list-view .card{height:180px;transform:none!important;opacity:1;}
        .grid.list-view .card-media{position:absolute;inset:0;height:100%;transform:none!important;}
        .grid.list-view .card-media img{transform:scale(1)!important;}
        .grid.list-view .card-body{transform:translateY(0)!important;display:flex;flex-direction:row;align-items:flex-end;justify-content:space-between;padding:16px 20px;}
        .grid.list-view .card-bottom{opacity:1!important;transform:none!important;}
        .grid.list-view .card-actions{opacity:1!important;transform:none!important;}
        @keyframes newBadgeFloat{0%,100%{transform:translateY(0) rotate(-3deg);}50%{transform:translateY(-4px) rotate(-3deg);}}
        .new-badge{position:absolute;top:10px;left:50%;transform:translateX(-50%) rotate(-3deg);background:var(--gold);color:var(--maroon-dark);font-size:8px;font-weight:800;letter-spacing:2px;text-transform:uppercase;padding:3px 8px;border-radius:3px;z-index:3;animation:newBadgeFloat 2s ease-in-out infinite;white-space:nowrap;box-shadow:0 4px 12px rgba(201,162,75,.4);}

        /* RECENTLY VIEWED */
        .recently-wrap{padding:32px 5vw 60px;background:var(--ivory-dim);}
        .recently-title{font-family:'Cormorant Garamond',serif;font-size:22px;color:var(--maroon-dark);margin-bottom:16px;display:flex;align-items:center;gap:10px;}
        .recently-title::after{content:'';flex:1;height:1px;background:linear-gradient(90deg,var(--gold),transparent);}
        .recently-strip{display:flex;gap:14px;overflow-x:auto;padding-bottom:8px;scrollbar-width:thin;scrollbar-color:var(--gold) transparent;}
        .recently-card{flex-shrink:0;width:110px;cursor:pointer;transition:transform .2s;}
        .recently-card:hover{transform:translateY(-4px);}
        .recently-card img{width:110px;height:140px;object-fit:cover;border-radius:8px;box-shadow:0 8px 20px -8px rgba(67,16,28,.3);}
        .recently-card-name{font-size:10px;color:var(--maroon-dark);font-weight:600;margin-top:6px;text-align:center;line-height:1.3;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;}
        .recently-card-price{font-size:10px;color:#8a7a6a;text-align:center;margin-top:2px;}

        /* RELATED PRODUCTS */
        .related-wrap{margin-top:24px;padding-top:18px;border-top:1px solid #e8dccb;}
        .related-title{font-family:'Cormorant Garamond',serif;font-size:19px;color:var(--maroon-dark);margin-bottom:14px;display:flex;align-items:center;gap:10px;}
        .related-title::after{content:'';flex:1;height:1px;background:linear-gradient(90deg,var(--gold),transparent);}
        .related-strip{display:flex;gap:16px;overflow-x:auto;padding-bottom:10px;scrollbar-width:thin;scrollbar-color:var(--gold) transparent;}
        .related-card{flex-shrink:0;width:230px;cursor:pointer;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 10px 26px -10px rgba(67,16,28,.32);border:1px solid #f0e6d6;transition:transform .2s,box-shadow .2s;}
        .related-card:hover{transform:translateY(-5px);box-shadow:0 18px 36px -12px rgba(67,16,28,.45);}
        .related-card-media{position:relative;height:220px;overflow:hidden;}
        .related-card-media img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .5s ease;}
        .related-card:hover .related-card-media img{transform:scale(1.06);}
        .related-card-occasion{position:absolute;top:10px;left:10px;background:rgba(36,20,20,.55);color:var(--gold-light);font-size:9px;letter-spacing:1.2px;text-transform:uppercase;padding:3px 8px;border-radius:3px;backdrop-filter:blur(2px);}
        .related-card-badge{position:absolute;bottom:10px;left:10px;background:var(--teal);color:#dff3ec;font-size:9px;font-weight:700;letter-spacing:.5px;padding:3px 8px;border-radius:3px;}
        .related-card-body{padding:13px 14px 15px;}
        .related-card-name{font-family:'Cormorant Garamond',serif;font-size:16px;font-weight:600;color:var(--maroon-dark);line-height:1.25;margin-bottom:3px;}
        .related-card-fabric{font-size:10.5px;color:#8a7a6a;letter-spacing:.3px;margin-bottom:7px;}
        .related-card-rating{display:flex;align-items:center;gap:5px;margin-bottom:8px;}
        .related-card-rating span{font-size:11px;color:#8a7a6a;}
        .related-card-tags{display:flex;gap:5px;flex-wrap:wrap;margin-bottom:10px;}
        .related-card-tag{font-size:9px;border:1px solid var(--gold);color:var(--maroon-dark);padding:2px 8px;border-radius:14px;background:var(--ivory-dim);}
        .related-card-price-row{display:flex;align-items:baseline;justify-content:space-between;margin-bottom:10px;}
        .related-card-price{font-size:15px;font-weight:600;color:var(--ink);}
        .related-card-price .old{font-size:10px;color:#a99;text-decoration:line-through;font-weight:400;margin-right:5px;}
        .related-card-saving{font-size:10px;color:#2e7d32;font-weight:600;}
        .related-card-btns{display:flex;gap:8px;}
        .related-card-cart{flex:1;height:34px;border-radius:6px;background:var(--ivory-dim);color:var(--maroon);font-size:11px;font-weight:600;border:1px solid #d8cbb4;display:flex;align-items:center;justify-content:center;gap:5px;transition:all .2s;}
        .related-card-cart:hover{background:var(--maroon);color:var(--gold-light);border-color:var(--maroon);}
        .related-card-cart svg{width:13px;height:13px;}
        .related-card-view{flex:1;height:34px;border-radius:6px;background:var(--maroon);color:var(--gold-light);font-size:11px;font-weight:600;border:none;transition:background .2s;}
        .related-card-view:hover{background:var(--gold);color:var(--maroon-dark);}

        /* OVERLAY & DRAWER */
        .overlay{position:fixed;inset:0;background:rgba(36,20,20,.55);opacity:0;visibility:hidden;transition:opacity .35s;z-index:90;}
        .overlay.show{opacity:1;visibility:visible;}
        .drawer{position:fixed;top:0;left:0;height:100vh;width:min(460px,94vw);background:var(--ivory);box-shadow:30px 0 60px rgba(0,0,0,.25);transform:translateX(-100%);transition:transform .5s cubic-bezier(.22,.8,.2,1);z-index:100;overflow-y:auto;display:flex;flex-direction:column;}
        .drawer.open{transform:translateX(0);}
        .drawer-head{display:flex;align-items:center;justify-content:space-between;padding:16px 20px;background:var(--maroon);color:var(--ivory);position:sticky;top:0;z-index:5;flex-shrink:0;}
        .drawer-head .label{font-size:11px;letter-spacing:2px;text-transform:uppercase;color:var(--gold-light);}
        .close-btn{width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.12);color:var(--gold-light);display:flex;align-items:center;justify-content:center;transition:background .2s,transform .2s;}
        .close-btn:hover{background:var(--gold);color:var(--maroon-dark);transform:translateX(-3px);}
        .close-btn svg{width:17px;height:17px;}
        .drawer-body{padding:20px;flex:1;}
        .drawer-img{width:100%;height:300px;object-fit:cover;border-radius:6px;margin-bottom:16px;box-shadow:0 12px 30px -10px rgba(0,0,0,.25);}
        .drawer-header-row{display:flex;justify-content:space-between;align-items:flex-start;gap:10px;margin-bottom:4px;}
        .drawer-body h3{font-size:24px;color:var(--maroon-dark);line-height:1.2;}
        .drawer-wish-btn{width:36px;height:36px;border-radius:50%;border:1px solid #d8cbb4;display:flex;align-items:center;justify-content:center;flex-shrink:0;transition:all .2s;color:var(--maroon);}
        .drawer-wish-btn:hover,.drawer-wish-btn.active{background:var(--maroon);color:#fff;border-color:var(--maroon);}
        .drawer-wish-btn svg{width:16px;height:16px;}
        .drawer-fabric{font-size:11px;color:#8a7a6a;letter-spacing:.5px;margin:2px 0 12px;}
        .drawer-rating-row{display:flex;align-items:center;gap:8px;margin-bottom:12px;}
        .drawer-rating-row span{font-size:12px;color:#8a7a6a;}
        .drawer-price{font-size:22px;font-weight:600;margin:0 0 4px;}
        .drawer-price .old{font-size:13px;color:#a99;text-decoration:line-through;font-weight:400;margin-right:8px;}
        .saving-tag{display:inline-block;background:#e8f5e9;color:#2e7d32;font-size:11px;font-weight:600;padding:3px 9px;border-radius:4px;margin-bottom:16px;}
        .tabs{display:flex;border-bottom:1px solid #e8dccb;margin-bottom:16px;}
        .tab{font-size:11px;letter-spacing:1px;text-transform:uppercase;padding:8px 14px;cursor:pointer;color:#8a7a6a;border-bottom:2px solid transparent;margin-bottom:-1px;transition:all .2s;}
        .tab.active{color:var(--maroon);border-bottom-color:var(--gold);font-weight:600;}
        .drawer-desc{font-size:13px;line-height:1.85;color:#564640;margin:0 0 16px;}
        .meta-row{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px;}
        .meta-chip{font-size:10px;border:1px solid var(--gold);color:var(--maroon-dark);padding:4px 10px;border-radius:20px;background:var(--ivory-dim);}
        .option-section{margin-bottom:16px;}
        .option-label{font-size:10px;letter-spacing:1px;text-transform:uppercase;color:#8a7a6a;margin-bottom:8px;display:flex;align-items:center;justify-content:space-between;}
        .option-label a{color:var(--maroon);cursor:pointer;text-decoration:underline;}
        .size-options{display:flex;gap:8px;flex-wrap:wrap;}
        .size-btn{padding:6px 13px;border-radius:5px;border:1px solid #d8cbb4;background:#fff;font-size:12px;color:var(--ink);cursor:pointer;transition:all .2s;}
        .size-btn:hover,.size-btn.active{border-color:var(--maroon);background:var(--maroon);color:#fff;}
        .color-options{display:flex;gap:8px;flex-wrap:wrap;}
        .color-btn{padding:5px 12px;border-radius:20px;border:1px solid #d8cbb4;font-size:11px;cursor:pointer;transition:all .2s;background:#fff;}
        .color-btn:hover,.color-btn.active{border-color:var(--maroon);background:var(--ivory-dim);}
        .blouse-toggle{display:flex;align-items:center;gap:10px;padding:10px 14px;background:var(--ivory-dim);border-radius:6px;cursor:pointer;border:1px solid #d8cbb4;font-size:12px;transition:border-color .2s;}
        .blouse-toggle:hover{border-color:var(--gold);}
        .blouse-toggle input{accent-color:var(--maroon);width:15px;height:15px;}
        .size-guide{background:#fff;border:1px solid #e8dccb;border-radius:6px;padding:14px;margin-bottom:16px;font-size:12px;}
        .size-guide table{width:100%;border-collapse:collapse;}
        .size-guide th{background:var(--ivory-dim);padding:7px 10px;text-align:left;font-size:10px;letter-spacing:1px;text-transform:uppercase;color:#8a7a6a;}
        .size-guide td{padding:7px 10px;border-bottom:1px solid #f0e8da;font-size:12px;}
        .review-card{background:#fff;border:1px solid #e8dccb;border-radius:6px;padding:14px;margin-bottom:10px;}
        .review-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;}
        .review-name{font-size:13px;font-weight:600;color:var(--maroon-dark);}
        .review-date{font-size:11px;color:#a99685;}
        .review-text{font-size:12.5px;line-height:1.7;color:#564640;}
        .add-review-btn{width:100%;padding:10px;border:1px dashed var(--gold);border-radius:6px;color:var(--maroon);font-size:12px;letter-spacing:.5px;margin-top:6px;transition:background .2s;}
        .qty-row{display:flex;align-items:center;gap:14px;margin-bottom:20px;}
        .qty-row span{font-size:11px;letter-spacing:1px;text-transform:uppercase;color:#8a7a6a;}
        .qty-ctrl{display:flex;align-items:center;border:1px solid var(--gold);border-radius:6px;overflow:hidden;}
        .qty-ctrl button{width:32px;height:32px;font-size:16px;color:var(--maroon);background:var(--ivory-dim);}
        .qty-ctrl button:hover{background:var(--gold-light);}
        .qty-ctrl span.num{width:36px;text-align:center;font-size:14px;display:inline-block;}
        .action-row{display:flex;gap:10px;margin-bottom:10px;}
        .buy-btn{flex:1;padding:13px;border-radius:6px;background:var(--gold);color:var(--maroon-dark);font-size:13px;font-weight:600;letter-spacing:1px;text-transform:uppercase;transition:background .25s,transform .15s;}
        .buy-btn:hover{background:var(--gold-light);}
        .add-cart-btn{flex:1;padding:13px;border-radius:6px;background:var(--maroon);color:var(--gold-light);font-size:13px;font-weight:600;letter-spacing:1px;text-transform:uppercase;transition:background .25s;}
        .add-cart-btn:hover{background:var(--maroon-dark);}
        .share-btn{width:44px;height:44px;border-radius:6px;border:1px solid #d8cbb4;display:flex;align-items:center;justify-content:center;color:var(--maroon);transition:all .2s;flex-shrink:0;}
        .share-btn:hover{background:var(--ivory-dim);}
        .share-btn svg{width:18px;height:18px;}
        .delivery-info{background:var(--ivory-dim);border-radius:6px;padding:12px 14px;margin-bottom:16px;}
        .delivery-row{display:flex;align-items:center;gap:8px;font-size:12px;color:#564640;padding:4px 0;}
        .delivery-row svg{width:15px;height:15px;color:var(--teal);flex-shrink:0;}
        .checkout-step{padding:20px;flex:1;}
        .field{margin-bottom:12px;}
        .field label{display:block;font-size:10px;letter-spacing:1px;text-transform:uppercase;color:#8a7a6a;margin-bottom:5px;}
        .field input{width:100%;padding:10px 12px;border:1px solid #d8cbb4;border-radius:5px;background:#fff;font-size:13px;color:var(--ink);outline:none;transition:border-color .2s;font-family:'Poppins',sans-serif;}
        .field input:focus{border-color:var(--gold);}
        .field-row{display:flex;gap:10px;}
        .field-row .field{flex:1;}
        .order-summary-box{background:var(--ivory-dim);border-radius:6px;padding:12px 14px;margin:14px 0 20px;}
        .si-name{font-size:13px;font-weight:600;margin:0 0 2px;}
        .si-meta{font-size:11px;color:#8a7a6a;margin:0;}
        .coupon-row{display:flex;gap:8px;margin-bottom:14px;}
        .coupon-row input{flex:1;padding:9px 12px;border:1px solid #d8cbb4;border-radius:5px;background:#fff;font-size:12px;color:var(--ink);outline:none;font-family:'Poppins',sans-serif;}
        .coupon-row input:focus{border-color:var(--gold);}
        .coupon-btn{padding:9px 14px;border-radius:5px;background:var(--teal);color:#fff;font-size:12px;font-weight:600;white-space:nowrap;}
        .coupon-error{font-size:11px;color:#c0392b;margin:-10px 0 10px;}
        .coupon-success{font-size:11px;color:#27ae60;margin:-10px 0 10px;font-weight:600;}
        .pay-breakdown{border:1px solid #e8dccb;border-radius:6px;overflow:hidden;margin-bottom:16px;}
        .pay-row{display:flex;justify-content:space-between;padding:9px 14px;font-size:13px;border-bottom:1px solid #f0e8da;}
        .pay-row:last-child{border-bottom:none;font-weight:700;font-size:14px;background:var(--ivory-dim);}
        .pay-row.discount{color:#27ae60;}
        .back-link{font-size:12px;color:var(--maroon);letter-spacing:.5px;display:inline-flex;align-items:center;gap:5px;margin-bottom:14px;cursor:pointer;}
        .back-link svg{width:14px;height:14px;}
        .pay-method-label{font-size:10px;letter-spacing:1px;text-transform:uppercase;color:#8a7a6a;margin:0 0 10px;display:block;font-weight:600;}
        .pay-methods{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px;}
        .pay-method-btn{padding:10px 8px;border-radius:8px;border:2px solid #e8dccb;background:#fff;cursor:pointer;transition:all .2s;display:flex;flex-direction:column;align-items:center;gap:5px;font-size:11px;font-weight:600;color:#8a7a6a;}
        .pay-method-btn:hover{border-color:var(--gold);color:var(--maroon-dark);}
        .pay-method-btn.selected{border-color:var(--maroon);background:var(--ivory-dim);color:var(--maroon-dark);}
        .pay-method-btn svg{width:22px;height:22px;}
        .pay-method-btn .pm-name{font-size:10px;letter-spacing:.3px;}
        .proc-wrap{padding:60px 30px;text-align:center;flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;}
        .spinner{width:54px;height:54px;border-radius:50%;border:4px solid var(--ivory-dim);border-top-color:var(--gold);margin:0 auto 22px;animation:spin 0.9s linear infinite;}
        @keyframes spin{to{transform:rotate(360deg);}}
        .proc-wrap p{font-size:13px;color:#8a7a6a;letter-spacing:.5px;}
        .success-wrap{padding:40px 30px;text-align:center;flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;}
        .check-circle{width:72px;height:72px;border-radius:50%;background:var(--teal);display:flex;align-items:center;justify-content:center;margin:0 auto 20px;}
        .check-circle svg{width:34px;height:34px;color:#fff;}
        .success-wrap h3{font-size:22px;margin:0 0 8px;color:var(--maroon-dark);}
        .success-wrap p{font-size:13px;color:#8a7a6a;margin:0 0 24px;line-height:1.7;}
        .track-btn{background:var(--maroon);color:var(--gold-light);padding:12px 24px;border-radius:6px;font-size:12px;letter-spacing:1px;text-transform:uppercase;}

        /* CART DRAWER */
        .cart-drawer{position:fixed;top:0;right:0;height:100vh;width:min(420px,94vw);background:var(--ivory);box-shadow:-30px 0 60px rgba(0,0,0,.2);transform:translateX(100%);transition:transform .5s cubic-bezier(.22,.8,.2,1);z-index:100;overflow-y:auto;display:flex;flex-direction:column;}
        .cart-drawer.open{transform:translateX(0);}
        .cart-item{display:flex;gap:12px;background:#fff;border-radius:8px;padding:12px;margin-bottom:10px;border:1px solid #f0e8da;}
        .cart-item img{width:60px;height:75px;object-fit:cover;border-radius:5px;flex-shrink:0;}
        .cart-item-info{flex:1;min-width:0;}
        .cart-item-name{font-size:13px;font-weight:600;color:var(--maroon-dark);margin-bottom:2px;}
        .cart-item-meta{font-size:11px;color:#8a7a6a;margin-bottom:8px;}
        .cart-item-row{display:flex;align-items:center;justify-content:space-between;}
        .cart-item-price{font-size:14px;font-weight:600;}
        .cart-remove{color:#c0392b;font-size:10px;letter-spacing:.5px;cursor:pointer;text-transform:uppercase;}
        .cart-total-bar{background:var(--maroon);color:var(--ivory);padding:16px 20px;border-radius:8px;display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;}
        .cart-total-bar .total-label{font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:var(--blush);}
        .cart-total-bar .total-amt{font-size:20px;font-weight:700;color:var(--gold-light);}
        .checkout-cart-btn{width:100%;padding:14px;border-radius:6px;background:var(--gold);color:var(--maroon-dark);font-size:13px;font-weight:700;letter-spacing:1px;text-transform:uppercase;}
        .cart-empty{text-align:center;padding:60px 20px;color:#a99685;}
        .cart-empty svg{width:48px;height:48px;margin-bottom:14px;opacity:.4;}

        /* COMPARE */
        .compare-bar{position:fixed;bottom:0;left:0;right:0;background:var(--maroon-dark);color:var(--ivory);padding:12px 5vw;display:flex;align-items:center;gap:14px;z-index:80;transform:translateY(100%);transition:transform .3s;}
        .compare-bar.show{transform:translateY(0);}
        .compare-bar span{font-size:12px;letter-spacing:1px;color:var(--gold-light);}
        .compare-open-btn{padding:8px 18px;border-radius:5px;background:var(--gold);color:var(--maroon-dark);font-size:12px;font-weight:700;margin-left:auto;}
        .compare-clear{font-size:11px;color:var(--blush);cursor:pointer;text-decoration:underline;}
        .compare-modal{position:fixed;inset:0;z-index:110;background:rgba(36,20,20,.7);display:flex;align-items:center;justify-content:center;padding:20px;}
        .compare-box{background:var(--ivory);border-radius:10px;max-width:900px;width:100%;max-height:90vh;overflow-y:auto;padding:24px;}
        .compare-box h3{font-size:22px;margin:0 0 20px;color:var(--maroon-dark);}
        .compare-table{width:100%;border-collapse:collapse;font-size:12px;}
        .compare-table th{background:var(--maroon);color:var(--gold-light);padding:10px 14px;text-align:left;font-size:11px;letter-spacing:1px;}
        .compare-table td{padding:10px 14px;border-bottom:1px solid #e8dccb;vertical-align:top;}
        .compare-table img{width:80px;height:100px;object-fit:cover;border-radius:4px;}

        /* TOAST */
        .toast{position:fixed;bottom:24px;right:24px;background:var(--maroon-dark);color:var(--gold-light);padding:12px 20px;border-radius:8px;font-size:13px;font-weight:500;z-index:200;animation:slideUp .3s ease;box-shadow:0 8px 24px rgba(0,0,0,.25);}
        .toast.error{background:#c0392b;color:#fff;}
        @keyframes slideUp{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}
        @keyframes sparkBurst{0%{opacity:1;transform:translate(0,0) scale(1) rotate(0deg);}100%{opacity:0;transform:translate(var(--tx),var(--ty)) scale(0) rotate(180deg);}}
        .spark{position:fixed;pointer-events:none;width:7px;height:7px;border-radius:2px;animation:sparkBurst .7s ease-out forwards;z-index:9999;transform-origin:center;}

        /* STORE BACK BTN */
        .store-back-btn{display:inline-flex;align-items:center;gap:8px;padding:10px 20px;background:rgba(201,162,75,.12);border:1px solid rgba(201,162,75,.25);color:#E9D7A8;font-size:10px;letter-spacing:2px;text-transform:uppercase;border-radius:2px;cursor:pointer;transition:background .2s;margin:16px 5vw 0;font-family:'Poppins',sans-serif;}
        .store-back-btn:hover{background:rgba(201,162,75,.2);}
        .store-back-btn svg{width:14px;height:14px;}

        /* ORDERS / WISHLIST */
        .orders-page,.wishlist-page{padding:40px 5vw 80px;min-height:60vh;background:var(--ivory);}
        .orders-page h2,.wishlist-page h2{font-size:30px;margin:0 0 6px;}
        .orders-page .sub,.wishlist-page .sub{font-size:13px;color:#8a7a6a;margin:0 0 28px;}
        .order-card{background:#fff;border-radius:8px;padding:16px;box-shadow:0 8px 24px -12px rgba(67,16,28,.22);margin-bottom:16px;border-left:4px solid var(--gold);}
        .order-top-row{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;}
        .order-date{font-size:11px;color:#a99685;letter-spacing:.5px;}
        .status-pill{background:var(--teal);color:#dff3ec;font-size:10px;letter-spacing:1px;text-transform:uppercase;padding:4px 11px;border-radius:14px;}
        .order-items{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:10px;}
        .order-thumb{width:54px;height:66px;object-fit:cover;border-radius:4px;}
        .order-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(130px,1fr));gap:8px;}
        .order-grid div span{display:block;font-size:10px;letter-spacing:1px;text-transform:uppercase;color:#a99685;margin-bottom:2px;}
        .order-grid div b{font-size:12px;font-weight:500;color:var(--ink);}
        .empty-state{text-align:center;padding:60px 20px;color:#a99685;}
        .empty-state svg{width:48px;height:48px;margin-bottom:14px;opacity:.5;}
        .shop-link{color:var(--maroon);font-weight:600;border-bottom:1px solid var(--gold);cursor:pointer;}

        @media(max-width:640px){
          .c-hero-title{font-size:52px;}
          .c-chapter{height:auto;min-height:100vh;padding:100px 0 60px;}
          .c-chapter-images{display:none;}
          .c-chapter-content{max-width:100%;}
          .c-nav-links{display:none;}
          .c-footer-grid{grid-template-columns:1fr;}
          .grid{grid-template-columns:repeat(auto-fill,minmax(160px,1fr));gap:16px;}
        }

        /* ══════════════════════════════
           LETTER DROP ANIMATION
        ══════════════════════════════ */
        @keyframes letterDrop{
          0%{opacity:0;transform:translateY(-18px) rotateX(-90deg) scale(.7);}
          60%{transform:translateY(3px) rotateX(8deg) scale(1.05);}
          100%{opacity:1;transform:translateY(0) rotateX(0deg) scale(1);}
        }

        /* ══════════════════════════════
           PRODUCT SNAP PANELS
        ══════════════════════════════ */
        .prod-snap-wrap{height:100vh;overflow-y:scroll;scroll-snap-type:y mandatory;scroll-behavior:smooth;}
        .prod-snap-wrap::-webkit-scrollbar{display:none;}
        .prod-snap-wrap{-ms-overflow-style:none;scrollbar-width:none;}
        .prod-panel{scroll-snap-align:start;scroll-snap-stop:always;height:100vh;display:flex;position:relative;overflow:hidden;cursor:pointer;}
        .prod-panel-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transition:transform .8s cubic-bezier(.2,.8,.2,1);}
        .prod-panel:hover .prod-panel-img{transform:scale(1.04);}
        .prod-panel-overlay{position:absolute;inset:0;background:linear-gradient(90deg,rgba(6,2,4,.96) 0%,rgba(6,2,4,.82) 45%,rgba(6,2,4,.18) 100%);z-index:1;}
        .prod-panel-left{position:relative;z-index:2;width:52%;padding:0 5vw 0 6vw;display:flex;flex-direction:column;justify-content:center;gap:0;}
        .prod-panel-tag{font-size:9px;letter-spacing:5px;text-transform:uppercase;color:rgba(201,162,75,.6);margin-bottom:16px;display:block;}
        .prod-panel-name{font-family:'Cormorant Garamond',serif;font-size:clamp(32px,4.5vw,62px);font-weight:300;color:#E9D7A8;line-height:1;margin-bottom:10px;}
        .prod-panel-fabric{font-family:'Cormorant Garamond',serif;font-size:clamp(13px,1.4vw,17px);font-style:italic;color:rgba(233,215,168,.5);margin-bottom:18px;}
        .prod-panel-price{font-size:clamp(22px,3vw,38px);font-family:'Cormorant Garamond',serif;font-weight:600;color:#C9A24B;margin-bottom:6px;}
        .prod-panel-old{font-size:14px;color:rgba(255,255,255,.3);text-decoration:line-through;margin-left:10px;font-weight:300;}
        .prod-panel-desc{font-size:13px;color:rgba(233,215,168,.45);line-height:1.8;max-width:380px;margin-bottom:22px;}
        .prod-panel-tags{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:24px;}
        .prod-panel-chip{font-size:9px;letter-spacing:2px;text-transform:uppercase;padding:4px 12px;border:1px solid rgba(201,162,75,.25);color:rgba(201,162,75,.7);border-radius:20px;}
        .prod-panel-actions{display:flex;gap:12px;align-items:center;}
        .prod-panel-buy{padding:12px 28px;background:var(--gold);color:var(--maroon-dark);font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;border:none;border-radius:3px;cursor:pointer;font-family:'Poppins',sans-serif;transition:background .2s,transform .2s;}
        .prod-panel-buy:hover{background:#E9D7A8;transform:translateY(-2px);}
        .prod-panel-wish{width:42px;height:42px;border-radius:50%;border:1px solid rgba(201,162,75,.35);background:transparent;color:#E9D7A8;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all .2s;}
        .prod-panel-wish:hover,.prod-panel-wish.active{background:var(--maroon);border-color:var(--maroon);}
        .prod-panel-wish svg{width:16px;height:16px;}
        .prod-panel-num{position:absolute;right:5vw;bottom:10%;font-family:'Cormorant Garamond',serif;font-size:clamp(80px,14vw,180px);font-weight:300;color:rgba(255,255,255,.025);line-height:1;z-index:1;pointer-events:none;user-select:none;}
        .prod-panel-counter{position:absolute;top:50%;right:3vw;transform:translateY(-50%);z-index:3;display:flex;flex-direction:column;gap:8px;align-items:center;}
        .prod-panel-dot{width:5px;height:5px;border-radius:50%;background:rgba(201,162,75,.25);transition:all .3s;cursor:pointer;}
        .prod-panel-dot.active{background:#C9A24B;transform:scale(1.6);}
        .prod-back-btn{position:fixed;top:24px;left:24px;z-index:300;display:flex;align-items:center;gap:8px;padding:10px 20px;background:rgba(10,6,8,.75);backdrop-filter:blur(12px);border:1px solid rgba(201,162,75,.3);border-radius:3px;color:#E9D7A8;font-size:10px;letter-spacing:2.5px;text-transform:uppercase;cursor:pointer;font-family:'Poppins',sans-serif;transition:border-color .2s,background .2s;}
        .prod-back-btn:hover{border-color:rgba(201,162,75,.65);background:rgba(10,6,8,.9);}
        .prod-panel-rating{display:flex;align-items:center;gap:6px;margin-bottom:14px;font-size:12px;color:rgba(233,215,168,.5);}
      `}</style>

      <div className="ws-root">

        {/* ══════════════════════════════════
            CINEMATIC FLOATING NAV (always visible)
        ══════════════════════════════════ */}
        <nav className={`c-nav${scrollY > 60 || page !== "home" ? " scrolled" : ""}`}>
          <div className="c-brand" onClick={page === "home" ? undefined : () => { setPage("home"); window.scrollTo({top:0}); }}>
            <svg className="c-brand-mark" viewBox="0 0 40 40" fill="none">
              <path d="M6 14H34M6 20H34M6 26H34" stroke="#E9D7A8" strokeWidth="1.6"/>
              <path d="M12 8V32M20 8V32M28 8V32" stroke="#C9A24B" strokeWidth="1.6"/>
            </svg>
            <div>
              <span className="c-brand-text">WEAVERS</span>
              <span className="c-brand-sub">Beautiful Handloom</span>
            </div>
          </div>
          <div className="c-nav-links">
            {page === "home" ? (
              CHAPTERS.map((ch, i) => (
                <span key={ch.id} className={`c-nav-link${activeChapter === i + 1 ? " active" : ""}`}
                  onClick={() => chaptersRef.current[i]?.scrollIntoView({ behavior: "smooth" })}>
                  {ch.label}
                </span>
              ))
            ) : (
              <>
                <span className={`c-nav-link${page==="store"?"active":""}`} onClick={() => { setPage("store"); window.scrollTo({top:0}); }}>Collection</span>
                <span className={`c-nav-link${page==="wishlist"?"active":""}`} onClick={() => setPage("wishlist")}>Wishlist {wishlist.length > 0 && `(${wishlist.length})`}</span>
                <span className={`c-nav-link${page==="orders"?"active":""}`} onClick={() => setPage("orders")}>Orders</span>
                <span className="c-nav-link" onClick={() => { setPage("home"); window.scrollTo({top:0}); }}>← Home</span>
              </>
            )}
          </div>
          <div className="c-nav-right">
            <button className="c-cart-btn" onClick={() => { setCartOpen(true); setDrawerOpen(false); }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 001.99 1.61h9.72a2 2 0 001.99-1.61L23 6H6"/></svg>
              {cartCount > 0 && <span className="c-badge">{cartCount}</span>}
            </button>
          </div>
        </nav>

        {/* ══════════════════════════════════
            CINEMATIC HOME PAGE
        ══════════════════════════════════ */}
        {page === "home" && (
          <div ref={snapContainerRef} className="c-snap-container" style={{ background: "#0a0608" }}>

            {/* HERO */}
            <section ref={heroRef} className="c-hero c-snap-section">
              <div className="c-hero-fabric"/>
              <div className="c-hero-bg"/>
              <div className="c-hero-content">
                <span className="c-hero-eyebrow">Handloom · Since 1978</span>
                <h1 className="c-hero-title">
                  WEAVERS
                </h1>
                <p className="c-hero-sub">Six yards of silk, woven by hand.</p>
                <button className="c-hero-cta" onClick={scrollToStore}>
                  Explore Collection
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </button>

                {/* Search + Sort + Orders row on home page */}
                <div style={{marginTop:36,display:"flex",flexDirection:"column",alignItems:"center",gap:16,animation:"fadeUp .9s ease .7s both"}}>

                  {/* Search bar */}
                  <div style={{position:"relative",width:"min(420px,80vw)"}}>
                    <svg style={{position:"absolute",left:14,top:"50%",transform:"translateY(-50%)",color:"rgba(201,162,75,.55)",pointerEvents:"none"}} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
                    <input
                      value={searchQuery}
                      onChange={e=>{setSearchQuery(e.target.value);}}
                      onKeyDown={e=>{ if(e.key==="Enter" && searchQuery.trim()) scrollToStore(); }}
                      placeholder="Search sarees, fabric, occasion…"
                      style={{
                        width:"100%",padding:"12px 44px 12px 40px",
                        background:"rgba(201,162,75,.07)",
                        border:"1px solid rgba(201,162,75,.3)",
                        borderRadius:3,color:"#E9D7A8",
                        fontSize:12,letterSpacing:.5,
                        fontFamily:"'Poppins',sans-serif",outline:"none",
                        transition:"border-color .2s,background .2s",
                      }}
                      onFocus={e=>{e.target.style.borderColor="rgba(201,162,75,.65)";e.target.style.background="rgba(201,162,75,.12)";}}
                      onBlur={e=>{e.target.style.borderColor="rgba(201,162,75,.3)";e.target.style.background="rgba(201,162,75,.07)";}}
                    />
                    {searchQuery && (
                      <button onClick={()=>setSearchQuery("")} style={{position:"absolute",right:12,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",color:"rgba(201,162,75,.5)",fontSize:16,cursor:"pointer",lineHeight:1}}>✕</button>
                    )}
                  </div>

                  {/* Sort + Orders row */}
                  <div style={{display:"flex",alignItems:"center",gap:12}}>
                    {/* Sort dropdown */}
                    <div style={{position:"relative"}}>
                      <select
                        value={sortBy}
                        onChange={e => setSortBy(e.target.value)}
                        style={{
                          appearance:"none",WebkitAppearance:"none",
                          background:"rgba(201,162,75,.08)",
                          border:"1px solid rgba(201,162,75,.3)",
                          borderRadius:3,color:"#E9D7A8",
                          fontSize:11,letterSpacing:2,textTransform:"uppercase",
                          padding:"10px 36px 10px 16px",
                          fontFamily:"'Poppins',sans-serif",cursor:"pointer",outline:"none",
                          transition:"border-color .2s,background .2s",
                        }}
                        onMouseEnter={e=>{e.target.style.borderColor="rgba(201,162,75,.65)";e.target.style.background="rgba(201,162,75,.14)";}}
                        onMouseLeave={e=>{e.target.style.borderColor="rgba(201,162,75,.3)";e.target.style.background="rgba(201,162,75,.08)";}}
                      >
                        <option value="default" style={{background:"#1a0a10",color:"#E9D7A8"}}>Featured</option>
                        <option value="price-asc" style={{background:"#1a0a10",color:"#E9D7A8"}}>Price: Low → High</option>
                        <option value="price-desc" style={{background:"#1a0a10",color:"#E9D7A8"}}>Price: High → Low</option>
                        <option value="rating" style={{background:"#1a0a10",color:"#E9D7A8"}}>Top Rated</option>
                        <option value="popular" style={{background:"#1a0a10",color:"#E9D7A8"}}>Most Popular</option>
                      </select>
                      <svg style={{position:"absolute",right:10,top:"50%",transform:"translateY(-50%)",pointerEvents:"none",color:"rgba(201,162,75,.6)"}} width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg>
                    </div>

                    {/* Orders button */}
                    <button
                      onClick={()=>setPage("orders")}
                      style={{
                        display:"inline-flex",alignItems:"center",gap:8,
                        padding:"10px 20px",
                        background:"rgba(107,30,43,.25)",
                        border:"1px solid rgba(201,162,75,.3)",
                        borderRadius:3,color:"#E9D7A8",
                        fontSize:11,letterSpacing:2,textTransform:"uppercase",
                        fontFamily:"'Poppins',sans-serif",cursor:"pointer",
                        transition:"border-color .2s,background .2s",
                        position:"relative",
                      }}
                      onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(201,162,75,.65)";e.currentTarget.style.background="rgba(107,30,43,.45)";}}
                      onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(201,162,75,.3)";e.currentTarget.style.background="rgba(107,30,43,.25)";}}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 12h6M9 16h4"/></svg>
                      My Orders
                      {orders.length > 0 && (
                        <span style={{background:"var(--gold)",color:"var(--maroon-dark)",fontSize:9,fontWeight:700,borderRadius:"50%",width:16,height:16,display:"inline-flex",alignItems:"center",justifyContent:"center",marginLeft:2}}>{orders.length}</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <div className="c-hero-scroll">
                <span className="c-scroll-label">Scroll</span>
                <div className="c-scroll-line"/>
              </div>
              {/* MARQUEE — pinned at bottom of hero panel */}
              <div className="c-marquee" style={{position:"absolute",bottom:0,left:0,right:0,zIndex:3}}>
                <div className="c-marquee-track">
                  {[...Array(2)].map((_,ri) => (
                    <span key={ri} style={{display:"inline-flex"}}>
                      {["New Arrivals — Kanjivaram Collection","✦ Free Shipping Above ₹5,000","Patola Ikat — Limited Edition","✦ Handwoven by Artisan Families","Festive Banarasi — Now in Stock","✦ Easy 15-Day Returns","Authentic Certificates Included","✦ COD Available Across India"].map((t,i) => (
                        <span className="c-marquee-item" key={i}><span className="c-marquee-dot"/>{t}</span>
                      ))}
                    </span>
                  ))}
                </div>
              </div>
            </section>

            {/* CHAPTER PANELS */}
            {CHAPTERS.map((ch, i) => {
              const chProducts = PRODUCTS.filter(FABRICS.find(f => f.label === ch.filter)?.match || (() => false)).slice(0, 3);
              return (
                <section
                  key={ch.id}
                  ref={el => chaptersRef.current[i] = el}
                  className="c-chapter c-snap-section"
                  style={{ background: ch.bg, cursor:"pointer" }}
                  onClick={() => enterChapter(ch.filter)}
                >
                  {/* Big ghost number */}
                  <div className="c-chapter-num" style={{color:`rgba(255,255,255,.03)`}}>0{i+1}</div>

                  {/* Gradient overlay */}
                  <div className="c-chapter-overlay"/>

                  {/* Content */}
                  <div className="c-chapter-content">
                    <span className="c-chapter-tag" style={{color: ch.accent}}>
                      {String(i+1).padStart(2,"0")} · WEAVERS COLLECTION
                    </span>
                    <h2 className="c-chapter-title" style={{color: ch.accent}}>{ch.title}</h2>
                    <p className="c-chapter-subtitle" style={{color: "rgba(233,215,168,.65)"}}>{ch.subtitle}</p>
                    <p className="c-chapter-desc" style={{color: "rgba(233,215,168,.55)"}}>{ch.desc}</p>
                    <div className="c-chapter-hint" style={{display:"flex",alignItems:"center",gap:8,marginTop:24,opacity:.45,transition:"opacity .3s"}}>
                      <span style={{width:20,height:1,background:ch.accent,display:"inline-block",transition:"width .4s"}}/>
                      <span style={{fontSize:9,letterSpacing:4,textTransform:"uppercase",color:ch.accent,fontFamily:"'Poppins',sans-serif"}}>Tap to explore</span>
                      <span style={{width:20,height:1,background:ch.accent,display:"inline-block",transition:"width .4s"}}/>
                    </div>
                  </div>

                  {/* Product images stack */}
                  {chProducts.length > 0 && (
                    <div className="c-chapter-images">
                      <div className="c-chapter-img-stack">
                        {chProducts[0] && (
                          <img
                            className="c-chapter-img-main"
                            src={chProducts[0].img}
                            alt={chProducts[0].name}
                            style={{transform:`translateY(${(scrollY - (i * window.innerHeight || 0)) * 0.06}px) scale(1.05)`}}
                          />
                        )}
                        {chProducts[1] && (
                          <img
                            className="c-chapter-img-accent"
                            src={chProducts[1].img}
                            alt={chProducts[1].name}
                            style={{border:`2px solid ${ch.accent}22`}}
                          />
                        )}
                        {/* Product name overlay */}
                        <div style={{
                          position:"absolute",bottom:0,left:0,right:"20%",
                          padding:"16px 20px",
                          background:"linear-gradient(to top, rgba(0,0,0,.7) 0%, transparent 100%)",
                          zIndex:2,
                        }}>
                          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:15,color:ch.accent,letterSpacing:1,marginBottom:4,opacity:.8}}>
                            {chProducts[0]?.fabric}
                          </div>
                          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:20,color:"#E9D7A8",fontWeight:600}}>
                            {chProducts[0]?.name}
                          </div>
                          <div style={{fontSize:12,color:"rgba(233,215,168,.6)",marginTop:4}}>
                            {fmtMoney(chProducts[0]?.price)}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Subtle woven pattern overlay */}
                  <div style={{position:"absolute",inset:0,backgroundImage:`repeating-linear-gradient(90deg, rgba(255,255,255,.012) 0 1px, transparent 1px 60px), repeating-linear-gradient(0deg, rgba(255,255,255,.012) 0 1px, transparent 1px 60px)`,pointerEvents:"none",zIndex:0}}/>
                </section>
              );
            })}

            {/* NAV DOTS */}
            <div className="c-nav-dots">
              {[{ label: "Home" }, ...CHAPTERS].map((_, i) => (
                <div
                  key={i}
                  className={`c-nav-dot${activeChapter === i ? " active" : ""}`}
                  title={i === 0 ? "Home" : CHAPTERS[i-1]?.label}
                  onClick={() => {
                    if (i === 0) heroRef.current?.scrollIntoView({ behavior: "smooth" });
                    else chaptersRef.current[i-1]?.scrollIntoView({ behavior: "smooth" });
                  }}
                />
              ))}
            </div>

            {/* MANIFESTO / STATS + FOOTER */}
            <div className="c-snap-section" style={{overflowY:"auto",height:"100vh"}}>
            {/* MANIFESTO / STATS */}
            <section className="c-manifesto">
              <span className="c-manifesto-eyebrow">Our Promise</span>
              <h2 className="c-manifesto-title">
                Every saree is <em>direct from</em> the loom — no middlemen, no shortcuts.
              </h2>
              <p className="c-manifesto-body">
                WEAVERS works directly with artisan cooperatives across Kanchipuram, Varanasi, Patan and Bengal — paying fair wages, documenting each piece, and shipping with a certificate of authenticity.
              </p>
              <div className="c-stats">
                {[{num:"200+",label:"Weaver Families"},{num:"18",label:"Saree Varieties"},{num:"48+",label:"Years of Craft"},{num:"12K+",label:"Happy Customers"}].map((s,i)=>(
                  <div className="c-stat" key={i}>
                    <span className="c-stat-num">{s.num}</span>
                    <span className="c-stat-label">{s.label}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* FOOTER */}
            <footer className="c-footer">
              <div className="c-footer-grid">
                <div>
                  <div className="c-footer-brand">WEAVERS</div>
                  <p className="c-footer-tagline">
                    Handloom silk sarees sourced directly from weaver families across India. Authentic, certified, and delivered to your door since 1978.
                  </p>
                </div>
                <div>
                  <div className="c-footer-col-title">Collection</div>
                  {CHAPTERS.map(ch => (
                    <span key={ch.id} className="c-footer-link" onClick={() => enterChapter(ch.filter)}>{ch.label} Sarees</span>
                  ))}
                </div>
                <div>
                  <div className="c-footer-col-title">We Promise</div>
                  {[
                    { icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>, text: "100% Authentic" },
                    { icon: <><rect x="1" y="3" width="15" height="13"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></>, text: "Free Shipping ₹5k+" },
                    { icon: <><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></>, text: "15-Day Returns" },
                    { icon: <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>, text: "Weaver Certified" },
                  ].map((t, i) => (
                    <div className="c-footer-trust" key={i}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">{t.icon}</svg>
                      {t.text}
                    </div>
                  ))}
                </div>
              </div>
              <div className="c-footer-bottom">
                <span className="c-footer-copy">© 2026 Weavers Handloom · Crafted with love across India</span>
                <button
                  onClick={scrollToStore}
                  style={{padding:"10px 24px",border:"1px solid rgba(201,162,75,.3)",background:"transparent",color:"rgba(233,215,168,.5)",fontSize:10,letterSpacing:2,textTransform:"uppercase",cursor:"pointer",borderRadius:2,fontFamily:"'Poppins',sans-serif",transition:"border-color .2s,color .2s"}}
                  onMouseEnter={e => { e.target.style.borderColor="rgba(201,162,75,.7)"; e.target.style.color="#E9D7A8"; }}
                  onMouseLeave={e => { e.target.style.borderColor="rgba(201,162,75,.3)"; e.target.style.color="rgba(233,215,168,.5)"; }}
                >
                  Shop All Sarees →
                </button>
              </div>
            </footer>
            </div>{/* end c-snap-section for manifesto+footer */}
          </div>
        )}

        {/* ══════════════════════════════════
            STORE PAGE — FULL SNAP PANELS
        ══════════════════════════════════ */}
        {page === "store" && (
          <>
            {/* Fixed back button */}
            <button className="prod-back-btn" onClick={() => { setPage("home"); window.scrollTo({top:0}); }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
              Back
            </button>

            {/* Snap container */}
            <div ref={storeSnapRef} className="prod-snap-wrap">
              {filteredProducts.map((p, i) => {
                const discPct = Math.round((p.old - p.price) / p.old * 100);
                const isActive = activeProductPanel === p.id;
                return (
                  <div
                    key={p.id}
                    className="prod-panel"
                    onClick={() => openDrawer(p)}
                    onMouseEnter={() => setActiveProductPanel(p.id)}
                    onMouseLeave={() => setActiveProductPanel(null)}
                  >
                    {/* Full-bleed background image */}
                    <img className="prod-panel-img" src={p.img} alt={p.name}/>
                    <div className="prod-panel-overlay"/>

                    {/* Ghost panel number */}
                    <div className="prod-panel-num">{String(i+1).padStart(2,"0")}</div>

                    {/* Left content — letter by letter */}
                    <div className="prod-panel-left">
                      <span className="prod-panel-tag">
                        <LetterByLetter text={`${String(i+1).padStart(2,"0")} · ${p.occasion.toUpperCase()} COLLECTION`} delay={0.05}/>
                      </span>

                      <div className="prod-panel-name">
                        <LetterByLetter text={p.name} delay={0.12}/>
                      </div>

                      <div className="prod-panel-fabric">
                        <LetterByLetter text={p.fabric} delay={0.28}/>
                      </div>

                      <div className="prod-panel-rating">
                        <Stars rating={p.rating} small/>
                        <span style={{animationDelay:"0.35s"}}>{p.rating} · {p.reviews} reviews</span>
                      </div>

                      <div className="prod-panel-price" style={{display:"flex",alignItems:"baseline"}}>
                        <LetterByLetter text={fmtMoney(p.price)} delay={0.38} style={{color:"#C9A24B"}}/>
                        <span className="prod-panel-old">{fmtMoney(p.old)}</span>
                        <span style={{marginLeft:12,fontSize:11,background:"var(--teal)",color:"#dff3ec",padding:"2px 8px",borderRadius:3,letterSpacing:1,fontFamily:"'Poppins',sans-serif"}}>{discPct}% OFF</span>
                      </div>

                      <div className="prod-panel-desc">
                        <LetterByLetter text={p.desc} delay={0.45}/>
                      </div>

                      <div className="prod-panel-tags">
                        {p.tags.map((t,ti) => (
                          <span key={ti} className="prod-panel-chip">{t}</span>
                        ))}
                      </div>

                      <div className="prod-panel-actions" onClick={e => e.stopPropagation()}>
                        <button className="prod-panel-buy" onClick={() => openDrawer(p)}>
                          Buy Now
                        </button>
                        <button
                          className={`prod-panel-wish ${wishlist.includes(p.id) ? "active" : ""}`}
                          onClick={() => toggleWishlist(p.id)}
                        >
                          <svg viewBox="0 0 24 24" fill={wishlist.includes(p.id)?"currentColor":"none"} stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
                        </button>
                        <button
                          style={{padding:"12px 20px",background:"transparent",border:"1px solid rgba(201,162,75,.35)",color:"rgba(233,215,168,.7)",fontSize:10,letterSpacing:2,textTransform:"uppercase",cursor:"pointer",borderRadius:3,fontFamily:"'Poppins',sans-serif",transition:"all .2s"}}
                          onClick={(e) => { e.stopPropagation(); setSelectedSize(p.sizes[0]); setSelectedColor(p.colors[0]); addToCart(p,1); spawnSparks(e); }}
                          onMouseEnter={e=>e.currentTarget.style.borderColor="rgba(201,162,75,.7)"}
                          onMouseLeave={e=>e.currentTarget.style.borderColor="rgba(201,162,75,.35)"}
                        >
                          + Cart
                        </button>
                      </div>
                    </div>

                    {/* Scroll position dots */}
                    <div className="prod-panel-counter">
                      {filteredProducts.map((_,di) => (
                        <div
                          key={di}
                          className={`prod-panel-dot${di===activePanelIndex?" active":""}`}
                          onClick={e => {
                            e.stopPropagation();
                            storeSnapRef.current?.querySelectorAll(".prod-panel")[di]?.scrollIntoView({behavior:"smooth"});
                          }}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {/* WISHLIST */}
        {page==="wishlist" && (
          <div className="wishlist-page">
            <h2 className="ws-serif">My Wishlist</h2>
            <p className="sub">Sarees you've saved for later.</p>
            {wishlist.length===0 ? (
              <div className="empty-state">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
                <p>No items yet. <span className="shop-link" onClick={()=>setPage("store")}>Browse the collection</span></p>
              </div>
            ) : (
              <div className={`grid ${viewMode==="list"?"list-view":""}`}>
                {PRODUCTS.filter(p=>wishlist.includes(p.id)).map((p,i)=>{
                  const discPct=Math.round((p.old-p.price)/p.old*100);
                  return (
                    <div key={p.id} className="card" style={{transitionDelay:`${(i%4)*0.1}s`}} onClick={()=>openDrawer(p)}>
                      <div className="card-media"><img src={p.img} alt={p.name}/></div>
                      <div className="card-body">
                        <h3 className="card-name">{p.name}</h3>
                        <p className="card-fabric">{p.fabric}</p>
                        <div className="card-rating"><Stars rating={p.rating} small/><span style={{fontSize:11,color:"#8a7a6a",marginLeft:4}}>{p.rating}</span></div>
                        <div className="card-bottom">
                          <span className="card-price"><span className="old">{fmtMoney(p.old)}</span>{fmtMoney(p.price)}</span>
                          <div className="card-btns" onClick={e=>e.stopPropagation()}>
                            <button className="cart-btn" onClick={()=>{setSelectedSize(p.sizes[0]);setSelectedColor(p.colors[0]);addToCart(p,1);}}>
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 001.99 1.61h9.72a2 2 0 001.99-1.61L23 6H6"/></svg>Add
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ORDERS */}
        {page==="orders" && (
          <div className="orders-page">
            <h2 className="ws-serif">My Orders</h2>
            <p className="sub">Track delivery dates and shipping details.</p>
            {orders.length===0 ? (
              <div className="empty-state">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9h18M5 9l1-5h12l1 5M5 9v9a2 2 0 002 2h10a2 2 0 002-2V9"/></svg>
                <p>No orders yet. <span className="shop-link" onClick={()=>setPage("store")}>Browse the collection</span></p>
              </div>
            ) : (
              orders.map((o,idx)=>(
                <div className="order-card" key={idx}>
                  <div className="order-top-row">
                    <span className="order-date">Ordered on {o.orderDate}</span>
                    <span className="status-pill">✓ {o.status}</span>
                  </div>
                  <div className="order-items">
                    {o.items.map((item,ii)=>(<img key={ii} className="order-thumb" src={item.img||item.product?.img} alt={item.name||item.product?.name}/>))}
                    <div style={{fontSize:13,color:"var(--maroon-dark)",fontWeight:600,alignSelf:"center"}}>{o.items.length} item{o.items.length!==1?"s":""} · {fmtMoney(o.total)}</div>
                  </div>
                  <div className="order-grid">
                    <div><span>Arrives by</span><b>{o.deliveryDate}</b></div>
                    <div><span>Delivering to</span><b>{o.address}</b></div>
                    <div><span>Total paid</span><b>{fmtMoney(o.total)}</b></div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* OVERLAY */}
        <div className={`overlay ${drawerOpen||cartOpen?"show":""}`} onClick={closeAll}/>

        {/* PRODUCT DRAWER */}
        <aside className={`drawer ${drawerOpen?"open":""}`}>
          <div className="drawer-head">
            <span className="label">
              {step==="detail"&&"Product detail"}
              {step==="checkout"&&"Checkout"}
              {step==="processing"&&"Processing Payment"}
              {step==="success"&&"Order Confirmed"}
            </span>
            <button className="close-btn" onClick={closeAll}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 5L8 12L15 19"/></svg>
            </button>
          </div>

          {activeProduct && step==="detail" && (
            <div className="drawer-body">
              <img className="drawer-img" src={activeProduct.img} alt={activeProduct.name}/>
              <div className="drawer-header-row">
                <h3 className="ws-serif">{activeProduct.name}</h3>
                <button className={`drawer-wish-btn ${wishlist.includes(activeProduct.id)?"active":""}`} onClick={()=>toggleWishlist(activeProduct.id)}>
                  <svg viewBox="0 0 24 24" fill={wishlist.includes(activeProduct.id)?"currentColor":"none"} stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
                </button>
              </div>
              <p className="drawer-fabric">{activeProduct.fabric}</p>
              <div className="drawer-rating-row"><Stars rating={activeProduct.rating}/><span>{activeProduct.rating} · {activeProduct.reviews} reviews</span></div>
              <p className="drawer-price"><span className="old">{fmtMoney(activeProduct.old)}</span>{fmtMoney(activeProduct.price)}</p>
              <span className="saving-tag">You save {fmtMoney(activeProduct.old-activeProduct.price)} ({Math.round((activeProduct.old-activeProduct.price)/activeProduct.old*100)}% off)</span>

              <div className="tabs">
                {["desc","size","reviews"].map(t=>(
                  <button key={t} className={`tab ${activeTab===t?"active":""}`} onClick={()=>setActiveTab(t)}>
                    {t==="desc"?"Description":t==="size"?"Size Guide":"Reviews"}
                  </button>
                ))}
              </div>

              {activeTab==="desc" && (
                <>
                  <p className="drawer-desc">{activeProduct.desc}</p>
                  <div className="meta-row">{activeProduct.tags.map(t=><span className="meta-chip" key={t}>{t}</span>)}</div>
                  <div className="delivery-info">
                    <div className="delivery-row"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg> Free delivery on orders above ₹5,000</div>
                    <div className="delivery-row"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/></svg> Estimated delivery in 5–7 working days</div>
                    <div className="delivery-row"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg> Woven by artisan families — certificate of authenticity included</div>
                  </div>
                </>
              )}
              {activeTab==="size" && (
                <div className="size-guide">
                  <table><thead><tr><th>Length</th><th>Best For</th><th>Blouse Fabric</th></tr></thead>
                    <tbody>
                      <tr><td>5.5m</td><td>Petite frame · simple drapes</td><td>0.8m</td></tr>
                      <tr><td>6m</td><td>Standard · most drape styles</td><td>0.8–1m</td></tr>
                      <tr><td>6.5m</td><td>Tall frame · elaborate drapes</td><td>1m</td></tr>
                      <tr><td>7m</td><td>Extra fabric · designer drapes</td><td>1m</td></tr>
                    </tbody>
                  </table>
                </div>
              )}
              {activeTab==="reviews" && (
                <div>
                  {SAMPLE_REVIEWS.map((r,i)=>(
                    <div className="review-card" key={i}>
                      <div className="review-top"><span className="review-name">{r.name}</span><div style={{display:"flex",alignItems:"center",gap:6}}><Stars rating={r.rating} small/><span className="review-date">{r.date}</span></div></div>
                      <p className="review-text">{r.text}</p>
                    </div>
                  ))}
                  <button className="add-review-btn">+ Write a review</button>
                </div>
              )}

              <div className="option-section">
                <div className="option-label"><span>Select Length</span><a onClick={()=>setActiveTab("size")}>Size guide</a></div>
                <div className="size-options">{activeProduct.sizes.map(s=>(<button key={s} className={`size-btn ${selectedSize===s?"active":""}`} onClick={()=>setSelectedSize(s)}>{s}</button>))}</div>
              </div>
              <div className="option-section">
                <div className="option-label"><span>Colour — {selectedColor}</span></div>
                <div className="color-options">{activeProduct.colors.map(c=>(<button key={c} className={`color-btn ${selectedColor===c?"active":""}`} onClick={()=>setSelectedColor(c)}>{c}</button>))}</div>
              </div>
              {activeProduct.blouse && (
                <div className="option-section">
                  <label className="blouse-toggle">
                    <input type="checkbox" checked={blouseIncluded} onChange={e=>setBlouseIncluded(e.target.checked)}/>
                    Include matching blouse piece (+₹499)
                  </label>
                </div>
              )}

              <div className="qty-row">
                <span>Qty</span>
                <div className="qty-ctrl">
                  <button onClick={()=>changeQty(-1)}>−</button>
                  <span className="num">{qty}</span>
                  <button onClick={()=>changeQty(1)}>+</button>
                </div>
              </div>

              <div className="action-row">
                <button className="add-cart-btn" onClick={(e)=>{spawnSparks(e);addToCart(activeProduct);}}>Add to Cart</button>
                <button className="buy-btn" onClick={()=>setStep("checkout")}>Buy Now</button>
                <button className="share-btn" onClick={()=>{navigator.clipboard?.writeText(window.location.href);showToast("Link copied! 🔗");}}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                </button>
              </div>

              {relatedProducts.length > 0 && (
                <div className="related-wrap">
                  <div className="related-title ws-serif">You May Also Like</div>
                  <div className="related-strip">
                    {relatedProducts.map(p => {
                      const discPct = Math.round((p.old - p.price) / p.old * 100);
                      return (
                        <div className="related-card" key={p.id} onClick={() => openDrawer(p)}>
                          <div className="related-card-media">
                            <img src={p.img} alt={p.name} />
                            <span className="related-card-occasion">{p.occasion}</span>
                            <span className="related-card-badge">{discPct}% OFF</span>
                          </div>
                          <div className="related-card-body">
                            <div className="related-card-name">{p.name}</div>
                            <div className="related-card-fabric">{p.fabric}</div>
                            <div className="related-card-rating"><Stars rating={p.rating} small/><span>{p.rating} ({p.reviews})</span></div>
                            <div className="related-card-tags">{p.tags.slice(0,2).map(t=><span className="related-card-tag" key={t}>{t}</span>)}</div>
                            <div className="related-card-price-row">
                              <span className="related-card-price"><span className="old">{fmtMoney(p.old)}</span>{fmtMoney(p.price)}</span>
                              <span className="related-card-saving">Save {fmtMoney(p.old-p.price)}</span>
                            </div>
                            <div className="related-card-btns">
                              <button className="related-card-cart" onClick={(e)=>{e.stopPropagation();spawnSparks(e);setSelectedSize(p.sizes[0]);setSelectedColor(p.colors[0]);addToCart(p,1);}}>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 001.99 1.61h9.72a2 2 0 001.99-1.61L23 6H6"/></svg>Add
                              </button>
                              <button className="related-card-view" onClick={(e)=>{e.stopPropagation();openDrawer(p);}}>View Details</button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeProduct && step==="checkout" && (
            <div className="checkout-step">
              <a className="back-link" onClick={()=>setStep("detail")}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 5L8 12L15 19"/></svg>Back
              </a>
              <div className="order-summary-box">
                <div style={{display:"flex",gap:12,alignItems:"center"}}>
                  <img src={activeProduct.img} alt={activeProduct.name} style={{width:52,height:64,objectFit:"cover",borderRadius:4}}/>
                  <div>
                    <p className="si-name">{activeProduct.name}</p>
                    <p className="si-meta">Size: {selectedSize} · {selectedColor}{blouseIncluded?" · +Blouse":""}</p>
                    <p className="si-meta">Qty {qty} · {fmtMoney(activeProduct.price)} each</p>
                  </div>
                </div>
              </div>
              <div className="field"><label>Full name *</label><input name="name" value={form.name} onChange={handleField} placeholder="Ananya Rao"/></div>
              <div className="field"><label>Phone number</label><input name="phone" value={form.phone} onChange={handleField} placeholder="98765 43210"/></div>
              <div className="field"><label>Delivery address *</label><input name="address" value={form.address} onChange={handleField} placeholder="Flat no, street, area"/></div>
              <div className="field-row">
                <div className="field"><label>City *</label><input name="city" value={form.city} onChange={handleField} placeholder="Hyderabad"/></div>
                <div className="field"><label>Pincode</label><input name="pin" value={form.pin} onChange={handleField} placeholder="500081"/></div>
              </div>
              <span className="pay-method-label">Payment Method</span>
              <div className="pay-methods">
                <button className={`pay-method-btn ${payMethod==="upi"?"selected":""}`} onClick={()=>setPayMethod("upi")}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M12 9v6M9 12l3-3 3 3"/></svg>
                  <span className="pm-name">UPI</span>
                </button>
                <button className={`pay-method-btn ${payMethod==="cod"?"selected":""}`} onClick={()=>setPayMethod("cod")}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></svg>
                  <span className="pm-name">Cash on Delivery</span>
                </button>
                <button className={`pay-method-btn ${payMethod==="card"?"selected":""}`} onClick={()=>setPayMethod("card")}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                  <span className="pm-name">Credit / Debit Card</span>
                </button>
                <button className={`pay-method-btn ${payMethod==="netbanking"?"selected":""}`} onClick={()=>setPayMethod("netbanking")}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                  <span className="pm-name">Net Banking</span>
                </button>
              </div>
              {payMethod==="upi" && (<div className="field"><label>UPI ID</label><input name="upi" value={form.upi} onChange={handleField} placeholder="yourname@upi"/></div>)}
              {payMethod==="card" && (<><div className="field"><label>Card number</label><input name="card" value={form.card} onChange={handleField} placeholder="4242 4242 4242 4242"/></div><div className="field-row"><div className="field"><label>Expiry</label><input name="exp" value={form.exp} onChange={handleField} placeholder="MM/YY"/></div><div className="field"><label>CVV</label><input name="cvv" value={form.cvv} onChange={handleField} placeholder="123"/></div></div></>)}
              {payMethod==="netbanking" && (<div className="field"><label>Select Bank</label><select name="bank" style={{width:"100%",padding:"10px 12px",border:"1px solid #d8cbb4",borderRadius:5,background:"#fff",fontSize:13,color:"var(--ink)",outline:"none",fontFamily:"'Poppins',sans-serif"}}><option>State Bank of India</option><option>HDFC Bank</option><option>ICICI Bank</option><option>Axis Bank</option><option>Kotak Mahindra Bank</option></select></div>)}
              {payMethod==="cod" && (<div style={{background:"#f0faf4",border:"1px solid #b7e0c8",borderRadius:6,padding:"10px 14px",fontSize:12,color:"#2e7d32",marginBottom:8}}>✓ Pay in cash when your order arrives. No advance payment needed.</div>)}
              <div className="coupon-row">
                <input value={couponCode} onChange={e=>setCouponCode(e.target.value)} placeholder="Coupon code (try SILK10)"/>
                <button className="coupon-btn" onClick={applyCoupon}>Apply</button>
              </div>
              {couponError && <p className="coupon-error">{couponError}</p>}
              {appliedCoupon && <p className="coupon-success">✓ {appliedCoupon}% discount applied!</p>}
              <div className="pay-breakdown">
                <div className="pay-row"><span>Subtotal</span><span>{fmtMoney(activeProduct.price*qty+(blouseIncluded?499:0))}</span></div>
                <div className="pay-row"><span>Delivery</span><span style={{color:"#27ae60"}}>{activeProduct.price*qty>=5000?"Free":"₹99"}</span></div>
                {appliedCoupon && <div className="pay-row discount"><span>Discount ({appliedCoupon}%)</span><span>− {fmtMoney(Math.round(activeProduct.price*qty*appliedCoupon/100))}</span></div>}
                <div className="pay-row"><span>Total</span><span>{fmtMoney(Math.round(activeProduct.price*qty*(1-(appliedCoupon||0)/100)+(blouseIncluded?499:0)+(activeProduct.price*qty>=5000?0:99)))}</span></div>
              </div>
              <button className="buy-btn" onClick={pay}>Pay Now</button>
            </div>
          )}

          {step==="processing" && (
            <div className="proc-wrap">
              <div className="spinner"/>
              <p>Processing your payment securely…</p>
            </div>
          )}

          {activeProduct && step==="success" && (
            <div className="success-wrap">
              <div className="check-circle"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 13L9 17L19 7"/></svg></div>
              <h3 className="ws-serif">Order Confirmed!</h3>
              <p>Your <strong>{activeProduct.name}</strong> ships to {orders[0]?.city}.<br/>Expected delivery by {orders[0]?.deliveryDate}.</p>
              <button className="track-btn" onClick={trackOrder}>Track My Order</button>
            </div>
          )}
        </aside>

        {/* CART DRAWER */}
        <aside className={`cart-drawer ${cartOpen?"open":""}`}>
          <div className="drawer-head">
            <span className="label">Shopping Cart ({cartCount} items)</span>
            <button className="close-btn" onClick={closeAll}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>
          <div style={{padding:"16px",flex:1}}>
            {cart.length===0 ? (
              <div className="cart-empty">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 001.99 1.61h9.72a2 2 0 001.99-1.61L23 6H6"/></svg>
                <p style={{fontSize:13}}>Your cart is empty.<br/><span className="shop-link" onClick={()=>{setCartOpen(false);setPage("store");}}>Browse sarees</span></p>
              </div>
            ) : (
              <>
                {cart.map((item,i)=>(
                  <div className="cart-item" key={i}>
                    <img src={item.img} alt={item.name}/>
                    <div className="cart-item-info">
                      <div className="cart-item-name">{item.name}</div>
                      <div className="cart-item-meta">{item.size} · {item.color}{item.blouse?" · +Blouse":""}</div>
                      <div className="cart-item-row">
                        <div style={{display:"flex",alignItems:"center",border:"1px solid var(--gold)",borderRadius:6,overflow:"hidden"}}>
                          <button style={{width:26,height:26,fontSize:13,color:"var(--maroon)",background:"var(--ivory-dim)",border:"none",cursor:"pointer"}} onClick={()=>updateCartQty(item.id,item.size,item.color,-1)}>−</button>
                          <span style={{width:30,textAlign:"center",fontSize:12,display:"inline-block"}}>{item.qty}</span>
                          <button style={{width:26,height:26,fontSize:13,color:"var(--maroon)",background:"var(--ivory-dim)",border:"none",cursor:"pointer"}} onClick={()=>updateCartQty(item.id,item.size,item.color,1)}>+</button>
                        </div>
                        <span className="cart-item-price">{fmtMoney(item.price*item.qty)}</span>
                      </div>
                      <span className="cart-remove" onClick={()=>removeFromCart(item.id,item.size,item.color)}>Remove</span>
                    </div>
                  </div>
                ))}
                <div className="coupon-row" style={{marginTop:8}}>
                  <input value={couponCode} onChange={e=>setCouponCode(e.target.value)} placeholder="Have a coupon? (try SILK10)"/>
                  <button className="coupon-btn" onClick={applyCoupon}>Apply</button>
                </div>
                {couponError && <p className="coupon-error">{couponError}</p>}
                {appliedCoupon && <p className="coupon-success">✓ {appliedCoupon}% discount applied!</p>}
                <div className="cart-total-bar">
                  <div><span className="total-label">Total</span><br/><span className="total-amt">{fmtMoney(cartTotal-discount)}</span></div>
                  {discount>0&&<span style={{fontSize:12,color:"var(--gold-light)"}}>Saved {fmtMoney(discount)}!</span>}
                </div>
                <button className="checkout-cart-btn" onClick={openCartCheckout}>Proceed to Checkout</button>
                <p style={{fontSize:11,color:"#a99685",textAlign:"center",marginTop:10}}>✦ Free shipping above ₹5,000 · Easy 15-day returns</p>
              </>
            )}
          </div>
        </aside>

        {/* COMPARE BAR */}
        <div className={`compare-bar ${compareList.length>0?"show":""}`}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold-light)" strokeWidth="2"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>
          <span>Comparing {compareList.length} saree{compareList.length>1?"s":""}</span>
          <span className="compare-clear" onClick={()=>setCompareList([])}>Clear</span>
          <button className="compare-open-btn" onClick={()=>setCompareOpen(true)}>Compare Now</button>
        </div>

        {compareOpen && (
          <div className="compare-modal" onClick={()=>setCompareOpen(false)}>
            <div className="compare-box" onClick={e=>e.stopPropagation()}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
                <h3 className="ws-serif">Compare Sarees</h3>
                <button onClick={()=>setCompareOpen(false)} style={{fontSize:20,color:"var(--maroon)",background:"none",border:"none",cursor:"pointer"}}>✕</button>
              </div>
              <table className="compare-table">
                <thead><tr><th>Feature</th>{compareList.map(p=><th key={p.id}>{p.name}</th>)}</tr></thead>
                <tbody>
                  <tr><td><b>Image</b></td>{compareList.map(p=><td key={p.id}><img src={p.img} alt={p.name}/></td>)}</tr>
                  <tr><td><b>Price</b></td>{compareList.map(p=><td key={p.id}>{fmtMoney(p.price)}</td>)}</tr>
                  <tr><td><b>Fabric</b></td>{compareList.map(p=><td key={p.id}>{p.fabric}</td>)}</tr>
                  <tr><td><b>Rating</b></td>{compareList.map(p=><td key={p.id}><Stars rating={p.rating} small/> {p.rating}</td>)}</tr>
                  <tr><td><b>Occasion</b></td>{compareList.map(p=><td key={p.id}>{p.occasion}</td>)}</tr>
                  <tr><td><b>Sizes</b></td>{compareList.map(p=><td key={p.id}>{p.sizes.join(", ")}</td>)}</tr>
                  <tr><td><b>Colours</b></td>{compareList.map(p=><td key={p.id}>{p.colors.join(", ")}</td>)}</tr>
                  <tr><td><b>Blouse piece</b></td>{compareList.map(p=><td key={p.id}>{p.blouse?"Available":"Not included"}</td>)}</tr>
                  <tr><td><b>Tags</b></td>{compareList.map(p=><td key={p.id}>{p.tags.join(", ")}</td>)}</tr>
                  <tr><td></td>{compareList.map(p=><td key={p.id}><button className="buy-btn" style={{width:"100%",padding:"10px"}} onClick={()=>{setCompareOpen(false);openDrawer(p);}}>View</button></td>)}</tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {toast && <div className={`toast ${toast.type==="error"?"error":""}`}>{toast.msg}</div>}
      </div>
    </div>
  );
}