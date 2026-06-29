import { useEffect, useRef, useState } from "react";


export default function WeaversLogin({ onLoginSuccess }) {
  const [showPass, setShowPass]     = useState(false);
  const [email, setEmail]           = useState("");
  const [password, setPassword]     = useState("");
  const [shake, setShake]           = useState(false);
  const [introGone, setIntroGone]   = useState(false);
  const [adminHint, setAdminHint]   = useState(false);
  const particleRef                 = useRef(null);

  /* ── spawn floating particles ── */
  useEffect(() => {
    const container = particleRef.current;
    if (!container) return;
    for (let i = 0; i < 40; i++) {
      const p = document.createElement("div");
      p.className = "wl-particle";
      const size = Math.random() * 4 + 1;
      p.style.cssText = `
        width:${size}px;height:${size}px;
        left:${Math.random() * 100}%;
        animation-duration:${Math.random() * 4 + 3}s;
        animation-delay:${Math.random() * 3}s;
      `;
      container.appendChild(p);
    }
  }, []);

  /* ── hide intro overlay after animation ── */
  useEffect(() => {
    const t = setTimeout(() => setIntroGone(true), 4200);
    return () => clearTimeout(t);
  }, []);

  /* ── secret admin hint: type "admin" anywhere ── */
  useEffect(() => {
    let buf = "";
    const handler = (e) => {
      buf += e.key.toLowerCase();
      if (buf.includes("admin")) { setAdminHint(true); buf = ""; }
      if (buf.length > 10) buf = buf.slice(-10);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  /* ── login handler ── */
  function doLogin() {
    if (!email.trim() || !password.trim()) {
      setShake(false);
      requestAnimationFrame(() => setShake(true));
      return;
    }
    if (email.trim() === "harsha@gmail.com" && password === "HARSHA") {
      onLoginSuccess("admin");
      return;
    }
    onLoginSuccess("user");
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Inter:wght@300;400&display=swap');

        .wl-root {
          --gold: #C9A84C;
          --gold-light: #E8C97A;
          --crimson: #8B1A1A;
          --deep: #0A0608;
          --silk: #F9F3EA;
          --text: #2A1A0E;
          position: fixed; inset: 0;
          font-family: 'Inter', sans-serif;
          background: var(--deep);
          overflow: hidden;
        }

        .wl-intro {
          position: fixed; inset: 0;
          display: flex; align-items: center; justify-content: center; flex-direction: column;
          z-index: 100;
          background: radial-gradient(ellipse at center, #1a0a08 0%, #0A0608 70%);
          transition: opacity 0.8s ease-in-out;
        }
        .wl-intro.gone { opacity: 0; pointer-events: none; }

        .wl-particles { position: absolute; inset: 0; overflow: hidden; }
        .wl-particle {
          position: absolute; border-radius: 50%;
          background: #C9A84C;
          animation: wlFloat linear infinite;
          opacity: 0;
        }
        @keyframes wlFloat {
          0%   { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          10%  { opacity: 0.6; }
          90%  { opacity: 0.3; }
          100% { transform: translateY(-20px) rotate(720deg); opacity: 0; }
        }

        .wl-logo-scene { perspective: 800px; width: 300px; height: 180px; display: flex; align-items: center; justify-content: center; }
        .wl-logo-3d {
          transform-style: preserve-3d;
          animation: wlLogoReveal 2.8s cubic-bezier(0.16,1,0.3,1) forwards;
          opacity: 0;
        }
        @keyframes wlLogoReveal {
          0%   { opacity: 0; transform: rotateX(90deg) rotateY(-30deg) scale(0.4); filter: blur(20px); }
          40%  { opacity: 1; filter: blur(0px); }
          70%  { transform: rotateX(-5deg) rotateY(8deg) scale(1.05); }
          85%  { transform: rotateX(3deg) rotateY(-4deg) scale(1); }
          100% { transform: rotateX(0deg) rotateY(0deg) scale(1); opacity: 1; }
        }

        .wl-logo-text {
          font-family: 'Playfair Display', serif;
          font-size: 5.5rem; font-weight: 900; letter-spacing: 0.18em;
          background: linear-gradient(135deg, #8B5E1A 0%, #C9A84C 35%, #F0D080 55%, #C9A84C 75%, #8B5E1A 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          filter: drop-shadow(0 0 40px rgba(201,168,76,0.6));
        }
        .wl-logo-underline {
          height: 2px;
          background: linear-gradient(90deg, transparent, #C9A84C, #E8C97A, #C9A84C, transparent);
          margin-top: 8px;
          transform: scaleX(0);
          animation: wlLineGrow 0.6s ease-out 1.8s forwards;
        }
        @keyframes wlLineGrow { to { transform: scaleX(1); } }

        .wl-logo-sub {
          font-family: 'Cormorant Garamond', serif; font-style: italic;
          font-size: 1rem; letter-spacing: 0.35em;
          color: rgba(201,168,76,0.7); text-align: center; margin-top: 10px;
          opacity: 0;
          animation: wlFadeUp 0.7s ease-out 2.2s forwards;
        }
        @keyframes wlFadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .wl-thread {
          position: absolute; width: 1px;
          background: linear-gradient(180deg, transparent, #C9A84C, transparent);
          animation: wlThread 2s ease-in-out forwards;
          transform: scaleY(0); transform-origin: top center;
        }
        @keyframes wlThread {
          0%   { transform: scaleY(0); opacity: 0; }
          50%  { opacity: 1; }
          100% { transform: scaleY(1); opacity: 0.4; }
        }

        .wl-stage {
          position: fixed; inset: 0;
          display: flex; align-items: stretch;
          opacity: 0;
          animation: wlStageReveal 1s ease-out 4.2s forwards;
        }
        @keyframes wlStageReveal { to { opacity: 1; } }

        .wl-form-panel {
          flex: 1;
          background: radial-gradient(ellipse at center, #FDF6EC 0%, #F9F3EA 100%);
          display: flex; align-items: center; justify-content: center;
          position: relative; overflow: hidden;
          width: 100%;
        }
        .wl-form-bg {
          position: absolute; inset: 0;
          background:
            repeating-linear-gradient(0deg, rgba(201,168,76,.04) 0px, rgba(201,168,76,.04) 1px, transparent 1px, transparent 40px),
            repeating-linear-gradient(90deg, rgba(201,168,76,.04) 0px, rgba(201,168,76,.04) 1px, transparent 1px, transparent 40px);
        }
        .wl-form-wrap {
          position: relative; z-index: 2; width: 340px;
          opacity: 0; transform: translateY(30px);
          animation: wlFormIn 0.9s cubic-bezier(0.16,1,0.3,1) 4.6s forwards;
        }
        @keyframes wlFormIn { to { opacity: 1; transform: translateY(0); } }
        .wl-form-wrap.shake { animation: wlShake 0.45s ease; }
        @keyframes wlShake {
          0%,100% { transform: translateX(0); }
          20%     { transform: translateX(-8px); }
          40%     { transform: translateX(8px); }
          60%     { transform: translateX(-5px); }
          80%     { transform: translateX(5px); }
        }

        .wl-title {
          font-family: 'Playfair Display', serif;
          font-size: 2rem; font-weight: 700; color: #2A1A0E; margin-bottom: 4px;
        }
        .wl-subtitle {
          font-family: 'Cormorant Garamond', serif; font-style: italic;
          font-size: 0.95rem; color: #8B1A1A; letter-spacing: 0.1em; margin-bottom: 36px;
        }

        .wl-field { margin-bottom: 22px; }
        .wl-field label {
          display: block; font-size: 0.72rem; letter-spacing: 0.15em;
          text-transform: uppercase; color: #6B4C2A; margin-bottom: 8px; font-weight: 400;
        }
        .wl-field input {
          width: 100%; padding: 14px 16px;
          box-sizing: border-box;
          background: white; border: 1.5px solid rgba(201,168,76,0.35); border-radius: 2px;
          font-family: 'Inter', sans-serif; font-size: 0.9rem; color: #2A1A0E;
          outline: none; transition: border-color 0.3s, box-shadow 0.3s;
        }
        .wl-field input:focus { border-color: #C9A84C; box-shadow: 0 0 0 3px rgba(201,168,76,0.12); }
        .wl-field input::placeholder { color: #C4A882; }
        .wl-pass-wrap { position: relative; }
        .wl-pass-wrap input { padding-right: 46px; }
        .wl-eye {
          position: absolute; right: 14px; top: 50%; transform: translateY(-50%);
          background: none; border: none; cursor: pointer; padding: 0; color: #C9A84C;
          display: flex; align-items: center;
        }

        .wl-forgot { text-align: right; margin-top: -14px; margin-bottom: 28px; }
        .wl-forgot a {
          font-size: 0.78rem; color: #8B1A1A; text-decoration: none;
          letter-spacing: 0.05em; transition: opacity 0.2s;
        }
        .wl-forgot a:hover { opacity: 0.7; }

        .wl-btn-login {
          width: 100%; padding: 16px;
          background: linear-gradient(135deg, #8B5E1A 0%, #C9A84C 50%, #8B5E1A 100%);
          background-size: 200% 100%;
          border: none; color: white;
          font-family: 'Playfair Display', serif;
          font-size: 1rem; letter-spacing: 0.2em;
          cursor: pointer; border-radius: 2px;
          transition: background-position 0.4s, transform 0.2s, box-shadow 0.3s;
          text-transform: uppercase;
        }
        .wl-btn-login:hover {
          background-position: 100% 0;
          transform: translateY(-1px);
          box-shadow: 0 8px 30px rgba(201,168,76,0.4);
        }

        .wl-divider {
          display: flex; align-items: center; gap: 14px;
          margin: 24px 0; color: #C4A882; font-size: 0.75rem; letter-spacing: 0.1em;
        }
        .wl-divider::before, .wl-divider::after {
          content: ''; flex: 1; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent);
        }

        .wl-btn-google {
          width: 100%; padding: 14px;
          background: white; border: 1.5px solid rgba(201,168,76,0.3);
          color: #2A1A0E; font-size: 0.88rem;
          display: flex; align-items: center; justify-content: center; gap: 10px;
          cursor: pointer; border-radius: 2px;
          transition: border-color 0.3s, box-shadow 0.3s;
          font-family: 'Inter', sans-serif;
        }
        .wl-btn-google:hover { border-color: #C9A84C; box-shadow: 0 4px 16px rgba(0,0,0,0.08); }

        .wl-signup { text-align: center; margin-top: 24px; font-size: 0.82rem; color: #8B6A40; }
        .wl-signup a { color: #8B1A1A; text-decoration: none; }
        .wl-signup a:hover { text-decoration: underline; }

        /* Hidden admin hint */
        .wl-admin-hint {
          margin-top: 18px;
          padding: 10px 14px;
          background: rgba(139,26,26,0.08);
          border: 1px dashed rgba(139,26,26,0.3);
          border-radius: 2px;
          font-size: 0.75rem;
          color: #8B1A1A;
          text-align: center;
          letter-spacing: 0.05em;
          animation: wlFadeUp 0.4s ease-out forwards;
        }
      `}</style>

      <div className="wl-root">
        <div className={`wl-intro${introGone ? " gone" : ""}`}>
          <div className="wl-particles" ref={particleRef} />
          <div className="wl-thread" style={{ left:"20%", height:"40vh", top:"30vh", animationDelay:"0.3s", animationDuration:"2.5s" }} />
          <div className="wl-thread" style={{ left:"50%", height:"60vh", top:"20vh", animationDelay:"0.1s", animationDuration:"3s" }} />
          <div className="wl-thread" style={{ left:"80%", height:"35vh", top:"35vh", animationDelay:"0.5s", animationDuration:"2s" }} />
          <div className="wl-logo-scene">
            <div className="wl-logo-3d">
              <div className="wl-logo-text">WEAVERS</div>
              <div className="wl-logo-underline" />
              <div className="wl-logo-sub">✦ &nbsp; Handcrafted Silk Sarees &nbsp; ✦</div>
            </div>
          </div>
        </div>

        <div className="wl-stage">
          <div className="wl-form-panel">
            <div className="wl-form-bg" />
            <div className={`wl-form-wrap${shake ? " shake" : ""}`} onAnimationEnd={() => setShake(false)}>
              <div className="wl-title">Welcome Back</div>
              <div className="wl-subtitle">Sign in to explore our collection</div>

              <div className="wl-field">
                <label>Email Address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && doLogin()}
                />
              </div>

              <div className="wl-field">
                <label>Password</label>
                <div className="wl-pass-wrap">
                  <input
                    type={showPass ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && doLogin()}
                  />
                  <button className="wl-eye" type="button" onClick={() => setShowPass(s => !s)}>
                    {showPass ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                        <line x1="1" y1="1" x2="23" y2="23"/>
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <div className="wl-forgot"><a href="#">Forgot password?</a></div>

              <button className="wl-btn-login" onClick={doLogin}>Enter the Collection</button>

              <div className="wl-divider">or</div>

              <button className="wl-btn-google" onClick={() => onLoginSuccess("user")}>
                <svg width="18" height="18" viewBox="0 0 18 18">
                  <path d="M17.64 9.2a10.34 10.34 0 0 0-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.91A8.8 8.8 0 0 0 17.64 9.2z" fill="#4285F4"/>
                  <path d="M9 18a8.6 8.6 0 0 0 5.96-2.18l-2.91-2.26a5.4 5.4 0 0 1-8.07-2.85H.96v2.34A9 9 0 0 0 9 18z" fill="#34A853"/>
                  <path d="M3.98 10.71A5.4 5.4 0 0 1 3.7 9a5.4 5.4 0 0 1 .28-1.71V4.95H.96A9 9 0 0 0 0 9a9 9 0 0 0 .96 4.05z" fill="#FBBC05"/>
                  <path d="M9 3.58a4.86 4.86 0 0 1 3.44 1.35l2.58-2.58A8.64 8.64 0 0 0 9 0 9 9 0 0 0 .96 4.95L3.98 7.3A5.4 5.4 0 0 1 9 3.58z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>

              <div className="wl-signup">
                New to WEAVERS? <a href="#" onClick={e => e.preventDefault()}>Create an account</a>
              </div>

              {adminHint && (
                <div className="wl-admin-hint">
                  🔐 Admin portal detected · Use <strong>harsha@gmail.com</strong> / <strong>HARSHA</strong>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}