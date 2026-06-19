import React, { useState, useEffect, useRef } from 'react';
import {
  Lock, ShieldCheck, ChevronRight, ChevronDown, Check,
  CreditCard, Smartphone, Building2, Wallet, ArrowRight,
  AlertCircle, CheckCircle2, RefreshCw, Clock, Info,
  X, Eye, EyeOff, Truck, Gift, Tag, Copy, ChevronUp,
  Activity, ArrowLeft, Zap, Star
} from 'lucide-react';

/* ─────────────────────────────────────────────
   GLOBAL STYLES
───────────────────────────────────────────── */
const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --ink:        #0d1117;
  --ink-soft:   #1c2333;
  --green-900:  #052e16;
  --green-700:  #15803d;
  --green-600:  #16a34a;
  --green-500:  #22c55e;
  --green-400:  #4ade80;
  --green-100:  #dcfce7;
  --green-50:   #f0fdf4;
  --gold:       #ca8a04;
  --gold-light: #fef08a;
  --slate-700:  #334155;
  --slate-600:  #475569;
  --slate-500:  #64748b;
  --slate-400:  #94a3b8;
  --slate-300:  #cbd5e1;
  --slate-200:  #e2e8f0;
  --slate-100:  #f1f5f9;
  --slate-50:   #f8fafc;
  --white:      #ffffff;
  --red:        #ef4444;
  --red-light:  #fef2f2;
  --amber:      #f59e0b;
  --blue:       #3b82f6;
  --r:          12px;
  --r-lg:       20px;
  --r-xl:       28px;
}

body {
  font-family: 'DM Sans', sans-serif;
  background: #0a0f1a;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
}

.display { font-family: 'Syne', sans-serif; }

/* Animations */
@keyframes fadeUp   { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
@keyframes fadeIn   { from { opacity:0; } to { opacity:1; } }
@keyframes slideIn  { from { opacity:0; transform:translateX(-16px); } to { opacity:1; transform:translateX(0); } }
@keyframes spin     { to { transform:rotate(360deg); } }
@keyframes pulse    { 0%,100%{opacity:1;} 50%{opacity:.5;} }
@keyframes shimmer  { 0%{background-position:-200% center;} 100%{background-position:200% center;} }
@keyframes checkPop { 0%{transform:scale(0);} 60%{transform:scale(1.2);} 100%{transform:scale(1);} }
@keyframes countUp  { from{transform:scale(.85);opacity:0;} to{transform:scale(1);opacity:1;} }
@keyframes ripple   { 0%{transform:scale(0);opacity:.4;} 100%{transform:scale(4);opacity:0;} }

.fade-up  { animation: fadeUp  .5s ease both; }
.fade-in  { animation: fadeIn  .35s ease both; }
.slide-in { animation: slideIn .4s ease both; }

.d1{animation-delay:.05s;opacity:0;}
.d2{animation-delay:.12s;opacity:0;}
.d3{animation-delay:.19s;opacity:0;}
.d4{animation-delay:.26s;opacity:0;}
.d5{animation-delay:.33s;opacity:0;}

/* Input */
.inp {
  width:100%; padding:13px 16px;
  border:1.5px solid var(--slate-200);
  border-radius:var(--r);
  font-family:'DM Sans',sans-serif; font-size:15px; color:var(--ink);
  background:var(--white); outline:none;
  transition:border-color .2s, box-shadow .2s;
}
.inp:focus { border-color:var(--green-500); box-shadow:0 0 0 3px rgba(34,197,94,.12); }
.inp::placeholder { color:var(--slate-400); }
.inp.err { border-color:var(--red); }
.inp.err:focus { box-shadow:0 0 0 3px rgba(239,68,68,.1); }
.inp.valid { border-color:var(--green-500); }

label.lbl {
  display:block; font-size:12px; font-weight:600;
  color:var(--slate-600); margin-bottom:6px; letter-spacing:.03em;
}

/* Card surface */
.surface {
  background:var(--white);
  border-radius:var(--r-xl);
  overflow:hidden;
}

/* Payment method tab */
.pay-tab {
  flex:1; display:flex; flex-direction:column; align-items:center; gap:6px;
  padding:14px 8px; border-radius:var(--r);
  border:1.5px solid var(--slate-200);
  cursor:pointer; transition:all .2s;
  background:var(--white); font-family:'DM Sans',sans-serif;
}
.pay-tab:hover { border-color:var(--green-400); background:var(--green-50); }
.pay-tab.active { border-color:var(--green-500); background:var(--green-50); box-shadow:0 0 0 3px rgba(34,197,94,.1); }
.pay-tab .tab-icon { font-size:22px; }
.pay-tab .tab-label { font-size:11px; font-weight:600; color:var(--slate-600); }
.pay-tab.active .tab-label { color:var(--green-700); }

/* UPI app button */
.upi-app {
  display:flex; flex-direction:column; align-items:center; gap:8px;
  padding:16px 12px; border-radius:var(--r);
  border:1.5px solid var(--slate-200);
  cursor:pointer; transition:all .2s;
  background:var(--white); font-family:'DM Sans',sans-serif;
}
.upi-app:hover { border-color:var(--green-400); background:var(--green-50); transform:translateY(-2px); }
.upi-app.selected { border-color:var(--green-500); background:var(--green-50); }
.upi-app .app-icon { width:44px; height:44px; border-radius:12px; display:flex; align-items:center; justify-content:center; font-size:22px; }
.upi-app .app-name { font-size:11px; font-weight:600; color:var(--slate-600); }

/* Offer chip */
.offer-chip {
  display:inline-flex; align-items:center; gap:6px;
  padding:5px 12px; border-radius:100px;
  font-size:12px; font-weight:600;
}
.chip-green { background:var(--green-100); color:var(--green-700); border:1px solid rgba(34,197,94,.25); }
.chip-gold  { background:#fef9c3; color:#854d0e; border:1px solid #fde047; }
.chip-blue  { background:#eff6ff; color:#1d4ed8; border:1px solid #bfdbfe; }

/* Progress step */
.prog-step { display:flex; align-items:center; gap:8px; }
.prog-dot  {
  width:28px; height:28px; border-radius:50%; flex-shrink:0;
  display:flex; align-items:center; justify-content:center;
  font-size:12px; font-weight:700; transition:all .3s;
}
.prog-dot.done   { background:var(--green-500); color:var(--white); }
.prog-dot.active { background:var(--ink); color:var(--white); box-shadow:0 0 0 4px rgba(13,17,23,.15); }
.prog-dot.idle   { background:var(--slate-200); color:var(--slate-500); }
.prog-line { width:32px; height:2px; background:var(--slate-200); border-radius:1px; transition:background .3s; }
.prog-line.done  { background:var(--green-500); }

/* Btn */
.btn {
  display:inline-flex; align-items:center; justify-content:center; gap:8px;
  padding:15px 28px; border-radius:var(--r); border:none;
  font-family:'DM Sans',sans-serif; font-size:15px; font-weight:600;
  cursor:pointer; transition:all .2s; line-height:1;
}
.btn-green {
  background:linear-gradient(135deg,var(--green-600),var(--green-700));
  color:var(--white);
  box-shadow:0 4px 16px rgba(22,163,74,.3);
}
.btn-green:hover { transform:translateY(-1px); box-shadow:0 8px 24px rgba(22,163,74,.4); }
.btn-green:active { transform:translateY(0); }
.btn-green:disabled { opacity:.45; cursor:not-allowed; transform:none; }
.btn-outline {
  background:transparent; border:1.5px solid var(--slate-300); color:var(--slate-700);
}
.btn-outline:hover { border-color:var(--slate-400); background:var(--slate-50); }
.btn-shimmer {
  background-size:200% auto;
  background-image:linear-gradient(90deg,var(--green-600) 0%,var(--green-400) 50%,var(--green-600) 100%);
  color:var(--white);
  animation:shimmer 2.5s linear infinite;
  box-shadow:0 4px 20px rgba(22,163,74,.35);
}
.btn-shimmer:hover { opacity:.92; transform:translateY(-1px); }

/* Divider */
.div { height:1px; background:var(--slate-200); }

/* Tooltip */
.tooltip-wrap { position:relative; display:inline-flex; }
.tooltip-box {
  position:absolute; bottom:calc(100% + 8px); left:50%; transform:translateX(-50%);
  background:var(--ink); color:var(--white); font-size:11px; font-weight:500;
  padding:6px 10px; border-radius:6px; white-space:nowrap; pointer-events:none;
  opacity:0; transition:opacity .2s; z-index:10;
}
.tooltip-wrap:hover .tooltip-box { opacity:1; }

/* Summary row */
.sum-row {
  display:flex; justify-content:space-between; align-items:center;
  padding:10px 0; border-bottom:1px solid var(--slate-100);
  font-size:14px;
}
.sum-row:last-child { border-bottom:none; }

/* Ripple container */
.ripple-btn { position:relative; overflow:hidden; }
.ripple-btn::after {
  content:''; position:absolute; border-radius:50%;
  background:rgba(255,255,255,.3);
  width:100px; height:100px;
  margin-top:-50px; margin-left:-50px;
  top:var(--y,50%); left:var(--x,50%);
  animation:ripple .6s ease-out;
  opacity:0;
}

/* Scrollbar */
::-webkit-scrollbar { width:5px; }
::-webkit-scrollbar-thumb { background:var(--slate-300); border-radius:3px; }

/* Card number formatting */
.card-num { letter-spacing:.12em; font-size:17px; font-weight:600; }
`;

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const PLANS = [
  {
    id: 'sema-oral', name: 'SemaSlim™ 7mg Oral', maker: 'Sun Pharma',
    icon: '💊', type: 'Oral · Once daily',
    price: 1299, mrp: 4200, savings: 69,
    badge: 'Most Popular', badgeColor: '#854d0e', badgeBg: '#fef9c3',
    includes: ['30-day supply', 'Free doctor consultation', '24/7 nurse helpline', 'Cold-chain delivery'],
  },
  {
    id: 'lira-pen', name: 'LiraDose™ 3mg Pen', maker: 'Cipla Ltd.',
    icon: '💉', type: 'Pre-filled pen · Once daily',
    price: 1799, mrp: 6500, savings: 72,
    badge: 'Clinical Standard', badgeColor: '#166534', badgeBg: '#dcfce7',
    includes: ['30-day supply', 'Free doctor consultation', '24/7 nurse helpline', 'Cold-chain delivery'],
  },
  {
    id: 'sema-pen', name: 'SemaPen™ XR 2.4mg', maker: 'Zydus Cadila',
    icon: '💉', type: 'Pre-filled pen · Once weekly',
    price: 2199, mrp: 9800, savings: 78,
    badge: 'Max Results', badgeColor: '#1e3a8a', badgeBg: '#eff6ff',
    includes: ['4-week supply', 'Free doctor consultation', '24/7 nurse helpline', 'Cold-chain delivery'],
  },
];

const COUPONS = {
  SLIM20: { type: 'percent', value: 20, label: '20% off your first order' },
  WELCOME: { type: 'flat', value: 200, label: '₹200 off first order' },
  FREESHIP: { type: 'shipping', value: 99, label: 'Free delivery' },
};

const UPI_APPS = [
  { id: 'gpay',   name: 'Google Pay', emoji: '🟢', color: '#4285F4' },
  { id: 'phonepe',name: 'PhonePe',    emoji: '🟣', color: '#5f259f' },
  { id: 'paytm',  name: 'Paytm',      emoji: '🔵', color: '#00b9f1' },
  { id: 'bhim',   name: 'BHIM',       emoji: '🟠', color: '#ff5722' },
];

const BANKS = [
  { id: 'sbi',    name: 'State Bank of India' },
  { id: 'hdfc',   name: 'HDFC Bank' },
  { id: 'icici',  name: 'ICICI Bank' },
  { id: 'axis',   name: 'Axis Bank' },
  { id: 'kotak',  name: 'Kotak Mahindra Bank' },
  { id: 'bob',    name: 'Bank of Baroda' },
];

const WALLETS = [
  { id: 'paytm',    name: 'Paytm Wallet',   emoji: '🔵' },
  { id: 'amazon',   name: 'Amazon Pay',     emoji: '🟡' },
  { id: 'mobikwik', name: 'MobiKwik',       emoji: '🔷' },
  { id: 'freecharge',name:'FreeCharge',     emoji: '🔸' },
];

/* ─────────────────────────────────────────────
   HELPER COMPONENTS
───────────────────────────────────────────── */

function Spinner({ size = 20, color = 'white' }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      border: `2.5px solid rgba(255,255,255,.25)`,
      borderTopColor: color,
      animation: 'spin .8s linear infinite',
      flexShrink: 0,
    }} />
  );
}

function FieldError({ msg }) {
  if (!msg) return null;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 5 }}>
      <AlertCircle size={12} color="var(--red)" />
      <span style={{ fontSize: 12, color: 'var(--red)' }}>{msg}</span>
    </div>
  );
}

function SecurityBadge({ text }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--slate-500)' }}>
      <Lock size={11} color="var(--green-600)" />
      {text}
    </div>
  );
}

function SectionTitle({ children, sub }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <h3 className="display" style={{ fontSize: 17, fontWeight: 700, color: 'var(--ink)', marginBottom: sub ? 4 : 0 }}>
        {children}
      </h3>
      {sub && <p style={{ fontSize: 13, color: 'var(--slate-500)' }}>{sub}</p>}
    </div>
  );
}

/* ─────────────────────────────────────────────
   PLAN SELECTOR (step 0)
───────────────────────────────────────────── */
function PlanSelector({ selected, onSelect }) {
  return (
    <div className="fade-up">
      <SectionTitle sub="Select the medication plan prescribed by your doctor">
        Choose Your Plan
      </SectionTitle>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {PLANS.map((plan, i) => (
          <div
            key={plan.id}
            onClick={() => onSelect(plan)}
            className={`fade-up d${i + 1}`}
            style={{
              border: `1.5px solid ${selected?.id === plan.id ? 'var(--green-500)' : 'var(--slate-200)'}`,
              borderRadius: 'var(--r-lg)',
              padding: '18px 20px',
              cursor: 'pointer',
              background: selected?.id === plan.id ? 'var(--green-50)' : 'var(--white)',
              transition: 'all .2s',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {selected?.id === plan.id && (
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 3,
                background: 'linear-gradient(90deg,var(--green-500),var(--green-400))',
              }} />
            )}

            <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              {/* Radio */}
              <div style={{
                width: 20, height: 20, borderRadius: '50%', flexShrink: 0, marginTop: 2,
                border: `2px solid ${selected?.id === plan.id ? 'var(--green-500)' : 'var(--slate-300)'}`,
                background: selected?.id === plan.id ? 'var(--green-500)' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .2s',
              }}>
                {selected?.id === plan.id && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'white' }} />}
              </div>

              <span style={{ fontSize: 28, marginTop: -2 }}>{plan.icon}</span>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 6 }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                      <span className="display" style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)' }}>{plan.name}</span>
                      <span style={{
                        fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 100,
                        background: plan.badgeBg, color: plan.badgeColor,
                      }}>{plan.badge}</span>
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--slate-500)', marginTop: 2 }}>{plan.maker} · {plan.type}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--green-700)', lineHeight: 1 }}>
                      ₹{plan.price.toLocaleString('en-IN')}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--slate-400)', textDecoration: 'line-through' }}>
                      ₹{plan.mrp.toLocaleString('en-IN')}
                    </div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--green-600)' }}>Save {plan.savings}%</div>
                  </div>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
                  {plan.includes.map(f => (
                    <span key={f} style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: 'var(--green-700)' }}>
                      <Check size={10} strokeWidth={3} /> {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   DELIVERY DETAILS (step 1)
───────────────────────────────────────────── */
function DeliveryForm({ data, onChange, errors }) {
  const STATES = ['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal','Delhi','Puducherry'];

  const field = (id, label, type, placeholder, extra = {}) => (
    <div style={{ marginBottom: 16 }} key={id}>
      <label className="lbl">{label}</label>
      <input
        className={`inp ${errors[id] ? 'err' : data[id] ? 'valid' : ''}`}
        type={type}
        placeholder={placeholder}
        value={data[id] || ''}
        onChange={e => onChange(id, e.target.value)}
        {...extra}
      />
      <FieldError msg={errors[id]} />
    </div>
  );

  return (
    <div className="fade-up">
      <SectionTitle sub="Medication will be delivered cold-chain to this address">
        Delivery Details
      </SectionTitle>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
        <div style={{ gridColumn: '1/-1' }}>{field('name', 'FULL NAME', 'text', 'As per Aadhaar')}</div>
        {field('phone', 'MOBILE NUMBER', 'tel', '+91 98765 43210')}
        {field('email', 'EMAIL ADDRESS', 'email', 'you@example.com')}
        <div style={{ gridColumn: '1/-1' }}>{field('address1', 'FLAT / HOUSE / BUILDING NO.', 'text', 'e.g. Flat 4B, Sunrise Apartments')}</div>
        <div style={{ gridColumn: '1/-1' }}>{field('address2', 'STREET / LOCALITY (optional)', 'text', 'e.g. MG Road, Bandra West')}</div>
        {field('city', 'CITY', 'text', 'Mumbai')}
        {field('pincode', 'PIN CODE', 'text', '400001', { maxLength: 6 })}
        <div style={{ gridColumn: '1/-1', marginBottom: 16 }}>
          <label className="lbl">STATE</label>
          <select
            className={`inp ${errors['state'] ? 'err' : data['state'] ? 'valid' : ''}`}
            value={data['state'] || ''}
            onChange={e => onChange('state', e.target.value)}
            style={{ appearance: 'none', WebkitAppearance: 'none', cursor: 'pointer' }}
          >
            <option value="" disabled>Select state</option>
            {STATES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <FieldError msg={errors['state']} />
        </div>
      </div>

      <div style={{
        background: 'var(--green-50)', border: '1px solid rgba(34,197,94,.2)',
        borderRadius: 'var(--r)', padding: '14px 16px',
        display: 'flex', gap: 10, alignItems: 'flex-start',
      }}>
        <Truck size={16} color="var(--green-600)" style={{ flexShrink: 0, marginTop: 2 }} />
        <div>
          <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--green-800)', marginBottom: 2 }}>
            Free cold-chain delivery
          </div>
          <div style={{ fontSize: 12, color: 'var(--green-700)', lineHeight: 1.5 }}>
            Delivered within <strong>24 hours</strong> in Mumbai, Delhi, Bengaluru, Chennai, Hyderabad, Pune.
            48–72 hours pan-India. Temperature monitored from warehouse to door.
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PAYMENT METHOD (step 2)
───────────────────────────────────────────── */
function PaymentMethod({ method, setMethod, cardData, setCardData, upiData, setUpiData, netbankData, setNetbankData, walletData, setWalletData, cardErrors }) {
  const [showCVV, setShowCVV] = useState(false);
  const [selectedUpiApp, setSelectedUpiApp] = useState(null);
  const [upiInputMode, setUpiInputMode] = useState('app'); // 'app' | 'id'

  const formatCard = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 16);
    return digits.replace(/(.{4})/g, '$1 ').trim();
  };

  const formatExpiry = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + '/' + digits.slice(2);
    return digits;
  };

  const getCardBrand = (num) => {
    const d = num.replace(/\s/g, '');
    if (d.startsWith('4')) return '💳 Visa';
    if (d.startsWith('5') || d.startsWith('2')) return '💳 Mastercard';
    if (d.startsWith('6')) return '💳 RuPay';
    if (d.startsWith('37')) return '💳 Amex';
    return null;
  };

  const METHODS = [
    { id: 'upi',     label: 'UPI',          emoji: '📲' },
    { id: 'card',    label: 'Card',          emoji: '💳' },
    { id: 'netbank', label: 'Net Banking',   emoji: '🏦' },
    { id: 'wallet',  label: 'Wallets',       emoji: '👛' },
    { id: 'cod',     label: 'Cash on Delivery', emoji: '💵' },
  ];

  return (
    <div className="fade-up">
      <SectionTitle sub="All payments secured by Razorpay · PCI-DSS Level 1">
        Payment Method
      </SectionTitle>

      {/* Method tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {METHODS.map(m => (
          <button key={m.id} className={`pay-tab ${method === m.id ? 'active' : ''}`}
            onClick={() => setMethod(m.id)}>
            <span className="tab-icon">{m.emoji}</span>
            <span className="tab-label">{m.label}</span>
          </button>
        ))}
      </div>

      {/* ── UPI ── */}
      {method === 'upi' && (
        <div className="slide-in">
          <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
            <button
              onClick={() => setUpiInputMode('app')}
              style={{
                flex: 1, padding: '10px', borderRadius: 'var(--r)',
                border: `1.5px solid ${upiInputMode === 'app' ? 'var(--green-500)' : 'var(--slate-200)'}`,
                background: upiInputMode === 'app' ? 'var(--green-50)' : 'var(--white)',
                fontSize: 13, fontWeight: 600, cursor: 'pointer',
                color: upiInputMode === 'app' ? 'var(--green-700)' : 'var(--slate-600)',
                fontFamily: 'DM Sans, sans-serif', transition: 'all .2s',
              }}>
              Select UPI App
            </button>
            <button
              onClick={() => setUpiInputMode('id')}
              style={{
                flex: 1, padding: '10px', borderRadius: 'var(--r)',
                border: `1.5px solid ${upiInputMode === 'id' ? 'var(--green-500)' : 'var(--slate-200)'}`,
                background: upiInputMode === 'id' ? 'var(--green-50)' : 'var(--white)',
                fontSize: 13, fontWeight: 600, cursor: 'pointer',
                color: upiInputMode === 'id' ? 'var(--green-700)' : 'var(--slate-600)',
                fontFamily: 'DM Sans, sans-serif', transition: 'all .2s',
              }}>
              Enter UPI ID
            </button>
          </div>

          {upiInputMode === 'app' ? (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 16 }}>
                {UPI_APPS.map(app => (
                  <div key={app.id} className={`upi-app ${selectedUpiApp === app.id ? 'selected' : ''}`}
                    onClick={() => { setSelectedUpiApp(app.id); setUpiData({ ...upiData, app: app.id }); }}>
                    <div className="app-icon" style={{ background: `${app.color}18` }}>
                      {app.emoji}
                    </div>
                    <span className="app-name">{app.name}</span>
                    {selectedUpiApp === app.id && (
                      <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'var(--green-500)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Check size={10} color="white" strokeWidth={3} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
              {selectedUpiApp && (
                <div className="fade-in" style={{
                  background: 'var(--green-50)', border: '1px solid var(--green-100)',
                  borderRadius: 'var(--r)', padding: '12px 14px',
                  display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--green-800)',
                }}>
                  <Smartphone size={15} color="var(--green-600)" />
                  You'll be redirected to {UPI_APPS.find(a => a.id === selectedUpiApp)?.name} to complete payment.
                </div>
              )}
            </>
          ) : (
            <div>
              <label className="lbl">YOUR UPI ID</label>
              <input
                className="inp"
                placeholder="yourname@upi or 9876543210@paytm"
                value={upiData?.id || ''}
                onChange={e => setUpiData({ ...upiData, id: e.target.value })}
              />
              <div style={{ fontSize: 12, color: 'var(--slate-500)', marginTop: 6 }}>
                e.g. name@oksbi · name@okicici · number@paytm
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── CARD ── */}
      {method === 'card' && (
        <div className="slide-in">
          {/* Card preview */}
          <div style={{
            background: 'linear-gradient(135deg,var(--green-900),#1a2e1a)',
            borderRadius: 'var(--r-lg)', padding: '24px', marginBottom: 24,
            minHeight: 140, position: 'relative', overflow: 'hidden',
            boxShadow: '0 8px 32px rgba(0,0,0,.3)',
          }}>
            <div style={{ position: 'absolute', top: -30, right: -30, width: 120, height: 120, borderRadius: '50%', background: 'rgba(34,197,94,.08)' }} />
            <div style={{ position: 'absolute', bottom: -20, left: 60, width: 80, height: 80, borderRadius: '50%', background: 'rgba(34,197,94,.06)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24, position: 'relative' }}>
              <div style={{ width: 36, height: 28, borderRadius: 4, background: 'linear-gradient(135deg,#d4a853,#f0c97a)' }} />
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,.5)', fontWeight: 500 }}>
                {getCardBrand(cardData.number || '') || 'DEBIT / CREDIT'}
              </span>
            </div>
            <div className="card-num" style={{
              color: 'var(--white)', letterSpacing: '.16em', fontSize: 16, marginBottom: 16,
              fontFamily: 'monospace',
            }}>
              {cardData.number
                ? cardData.number.padEnd(19, '·').replace(/(.{4})/g, '$1 ').trim()
                : '•••• •••• •••• ••••'}
            </div>
            <div style={{ display: 'flex', gap: 32 }}>
              <div>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,.4)', letterSpacing: '.1em', marginBottom: 2 }}>CARD HOLDER</div>
                <div style={{ fontSize: 13, color: 'var(--white)', fontWeight: 600 }}>
                  {cardData.name || 'YOUR NAME'}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,.4)', letterSpacing: '.1em', marginBottom: 2 }}>EXPIRES</div>
                <div style={{ fontSize: 13, color: 'var(--white)', fontWeight: 600 }}>
                  {cardData.expiry || 'MM/YY'}
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <label className="lbl">CARD NUMBER</label>
            <input
              className={`inp ${cardErrors?.number ? 'err' : cardData.number?.replace(/\s/g,'').length === 16 ? 'valid' : ''}`}
              placeholder="1234 5678 9012 3456"
              value={cardData.number || ''}
              onChange={e => setCardData({ ...cardData, number: formatCard(e.target.value) })}
              maxLength={19}
              inputMode="numeric"
            />
            <FieldError msg={cardErrors?.number} />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label className="lbl">NAME ON CARD</label>
            <input
              className={`inp ${cardErrors?.name ? 'err' : ''}`}
              placeholder="As printed on card"
              value={cardData.name || ''}
              onChange={e => setCardData({ ...cardData, name: e.target.value.toUpperCase() })}
            />
            <FieldError msg={cardErrors?.name} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <div>
              <label className="lbl">EXPIRY DATE</label>
              <input
                className={`inp ${cardErrors?.expiry ? 'err' : ''}`}
                placeholder="MM/YY"
                value={cardData.expiry || ''}
                onChange={e => setCardData({ ...cardData, expiry: formatExpiry(e.target.value) })}
                maxLength={5}
                inputMode="numeric"
              />
              <FieldError msg={cardErrors?.expiry} />
            </div>
            <div>
              <label className="lbl" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                CVV
                <div className="tooltip-wrap">
                  <Info size={12} color="var(--slate-400)" style={{ cursor: 'default' }} />
                  <div className="tooltip-box">3-digit code on back of card (4-digit for Amex)</div>
                </div>
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  className={`inp ${cardErrors?.cvv ? 'err' : ''}`}
                  placeholder="•••"
                  type={showCVV ? 'text' : 'password'}
                  value={cardData.cvv || ''}
                  onChange={e => setCardData({ ...cardData, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                  maxLength={4}
                  inputMode="numeric"
                  style={{ paddingRight: 44 }}
                />
                <button
                  onClick={() => setShowCVV(!showCVV)}
                  style={{
                    position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                    display: 'flex', alignItems: 'center',
                  }}>
                  {showCVV ? <EyeOff size={16} color="var(--slate-400)" /> : <Eye size={16} color="var(--slate-400)" />}
                </button>
              </div>
              <FieldError msg={cardErrors?.cvv} />
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 14 }}>
            <input
              type="checkbox"
              id="savecard"
              style={{ width: 16, height: 16, cursor: 'pointer', accentColor: 'var(--green-600)' }}
            />
            <label htmlFor="savecard" style={{ fontSize: 13, color: 'var(--slate-600)', cursor: 'pointer' }}>
              Save card for future orders (secured by Razorpay Vault)
            </label>
          </div>
        </div>
      )}

      {/* ── NET BANKING ── */}
      {method === 'netbank' && (
        <div className="slide-in">
          <label className="lbl">SELECT YOUR BANK</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
            {BANKS.map(bank => (
              <div
                key={bank.id}
                onClick={() => setNetbankData({ bank: bank.id })}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '13px 16px', borderRadius: 'var(--r)',
                  border: `1.5px solid ${netbankData?.bank === bank.id ? 'var(--green-500)' : 'var(--slate-200)'}`,
                  background: netbankData?.bank === bank.id ? 'var(--green-50)' : 'var(--white)',
                  cursor: 'pointer', transition: 'all .2s',
                }}
              >
                <div style={{
                  width: 20, height: 20, borderRadius: '50%',
                  border: `2px solid ${netbankData?.bank === bank.id ? 'var(--green-500)' : 'var(--slate-300)'}`,
                  background: netbankData?.bank === bank.id ? 'var(--green-500)' : 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  {netbankData?.bank === bank.id && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'white' }} />}
                </div>
                <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--ink)' }}>{bank.name}</span>
                {netbankData?.bank === bank.id && <CheckCircle2 size={16} color="var(--green-500)" style={{ marginLeft: 'auto' }} />}
              </div>
            ))}
          </div>
          <div style={{
            background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 'var(--r)',
            padding: '12px 14px', fontSize: 12, color: '#1d4ed8', lineHeight: 1.5,
          }}>
            <Building2 size={13} style={{ display: 'inline', marginRight: 5 }} />
            You'll be redirected to your bank's secure portal to complete authentication.
          </div>
        </div>
      )}

      {/* ── WALLETS ── */}
      {method === 'wallet' && (
        <div className="slide-in">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {WALLETS.map(w => (
              <div
                key={w.id}
                onClick={() => setWalletData({ wallet: w.id })}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12, padding: '16px',
                  borderRadius: 'var(--r)',
                  border: `1.5px solid ${walletData?.wallet === w.id ? 'var(--green-500)' : 'var(--slate-200)'}`,
                  background: walletData?.wallet === w.id ? 'var(--green-50)' : 'var(--white)',
                  cursor: 'pointer', transition: 'all .2s',
                }}
              >
                <span style={{ fontSize: 24 }}>{w.emoji}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{w.name}</div>
                </div>
                {walletData?.wallet === w.id && <Check size={15} color="var(--green-500)" style={{ marginLeft: 'auto' }} />}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── COD ── */}
      {method === 'cod' && (
        <div className="slide-in" style={{
          background: '#fffbeb', border: '1px solid #fde68a',
          borderRadius: 'var(--r-lg)', padding: '20px',
        }}>
          <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
            <span style={{ fontSize: 32 }}>💵</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6, color: '#92400e' }}>Cash on Delivery</div>
              <div style={{ fontSize: 13, color: '#78350f', lineHeight: 1.6, marginBottom: 12 }}>
                Pay in cash when your medication is delivered. Cold-chain delivery agent will collect
                the exact amount. Please keep exact change ready.
              </div>
              <div style={{
                background: 'white', borderRadius: 'var(--r)', padding: '10px 14px',
                border: '1px solid #fde68a', fontSize: 12, color: '#92400e', fontWeight: 600,
              }}>
                ⚠️ COD attracts an additional ₹49 handling fee. Available in select pin codes only.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   COUPON + ORDER SUMMARY
───────────────────────────────────────────── */
function OrderSummary({ plan, coupon, setCoupon, couponInput, setCouponInput, couponError, setCouponError, onApplyCoupon, onRemoveCoupon }) {
  if (!plan) return null;

  const discount = coupon
    ? coupon.type === 'percent'
      ? Math.round(plan.price * coupon.value / 100)
      : coupon.type === 'flat'
        ? coupon.value
        : 0
    : 0;
  const shipping = coupon?.type === 'shipping' ? 0 : 0; // free shipping anyway
  const total = plan.price - discount;

  return (
    <div>
      {/* Plan summary card */}
      <div style={{
        background: 'linear-gradient(135deg,var(--green-900),#0f2a18)',
        borderRadius: 'var(--r-lg)', padding: '20px', marginBottom: 16,
        border: '1px solid rgba(34,197,94,.15)',
      }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 14 }}>
          <span style={{ fontSize: 28 }}>{plan.icon}</span>
          <div>
            <div className="display" style={{ fontWeight: 700, fontSize: 14, color: 'var(--white)' }}>{plan.name}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,.5)' }}>{plan.maker} · Monthly subscription</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {plan.includes.map(f => (
            <span key={f} style={{
              fontSize: 10, fontWeight: 600, padding: '3px 8px', borderRadius: 100,
              background: 'rgba(34,197,94,.15)', color: 'var(--green-400)',
            }}>{f}</span>
          ))}
        </div>
      </div>

      {/* Coupon */}
      <div style={{ marginBottom: 16 }}>
        <label className="lbl" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Tag size={12} /> PROMO CODE
        </label>
        {coupon ? (
          <div className="fade-in" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '12px 14px', borderRadius: 'var(--r)',
            background: 'var(--green-50)', border: '1.5px solid var(--green-400)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <CheckCircle2 size={16} color="var(--green-600)" />
              <div>
                <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--green-800)' }}>{couponInput.toUpperCase()}</div>
                <div style={{ fontSize: 11, color: 'var(--green-700)' }}>{coupon.label}</div>
              </div>
            </div>
            <button onClick={onRemoveCoupon} style={{
              background: 'none', border: 'none', cursor: 'pointer',
              width: 24, height: 24, borderRadius: '50%', background: 'rgba(0,0,0,.06)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <X size={12} color="var(--slate-600)" />
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              className={`inp ${couponError ? 'err' : ''}`}
              placeholder="Enter promo code (try SLIM20)"
              value={couponInput}
              onChange={e => { setCouponInput(e.target.value.toUpperCase()); setCouponError(''); }}
              onKeyDown={e => e.key === 'Enter' && onApplyCoupon()}
              style={{ flex: 1 }}
            />
            <button
              className="btn btn-outline"
              onClick={onApplyCoupon}
              style={{ whiteSpace: 'nowrap', padding: '13px 16px' }}>
              Apply
            </button>
          </div>
        )}
        {couponError && <FieldError msg={couponError} />}

        {/* Suggested coupons */}
        {!coupon && (
          <div style={{ display: 'flex', gap: 6, marginTop: 8, flexWrap: 'wrap' }}>
            {Object.entries(COUPONS).map(([code, c]) => (
              <button key={code} onClick={() => { setCouponInput(code); setCouponError(''); }}
                style={{
                  background: 'none', border: '1px dashed var(--slate-300)', borderRadius: 100,
                  padding: '4px 10px', fontSize: 11, color: 'var(--slate-600)', cursor: 'pointer',
                  fontFamily: 'DM Sans, sans-serif', transition: 'all .2s',
                }}
                onMouseEnter={e => { e.target.style.borderColor = 'var(--green-500)'; e.target.style.color = 'var(--green-700)'; }}
                onMouseLeave={e => { e.target.style.borderColor = 'var(--slate-300)'; e.target.style.color = 'var(--slate-600)'; }}
              >
                {code}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Price breakdown */}
      <div style={{
        background: 'var(--white)', borderRadius: 'var(--r-lg)', overflow: 'hidden',
        border: '1px solid var(--slate-200)',
      }}>
        <div style={{ padding: '0 16px' }}>
          <div className="sum-row">
            <span style={{ color: 'var(--slate-600)' }}>Medication ({plan.name})</span>
            <span style={{ fontWeight: 600 }}>₹{plan.mrp.toLocaleString('en-IN')}</span>
          </div>
          <div className="sum-row">
            <span style={{ color: 'var(--green-600)' }}>Generic discount ({plan.savings}% off)</span>
            <span style={{ fontWeight: 600, color: 'var(--green-600)' }}>
              −₹{(plan.mrp - plan.price).toLocaleString('en-IN')}
            </span>
          </div>
          {coupon && discount > 0 && (
            <div className="sum-row fade-in">
              <span style={{ color: 'var(--green-600)' }}>Promo: {couponInput}</span>
              <span style={{ fontWeight: 600, color: 'var(--green-600)' }}>−₹{discount.toLocaleString('en-IN')}</span>
            </div>
          )}
          <div className="sum-row">
            <span style={{ color: 'var(--slate-600)' }}>Doctor consultation</span>
            <span style={{ fontWeight: 600, color: 'var(--green-600)' }}>FREE</span>
          </div>
          <div className="sum-row">
            <span style={{ color: 'var(--slate-600)' }}>Cold-chain delivery</span>
            <span style={{ fontWeight: 600, color: 'var(--green-600)' }}>FREE</span>
          </div>
          <div className="sum-row">
            <span style={{ color: 'var(--slate-600)' }}>GST (18% — already included)</span>
            <span style={{ fontWeight: 600, color: 'var(--slate-500)' }}>Incl.</span>
          </div>
        </div>
        <div style={{
          padding: '16px', background: 'var(--green-50)',
          borderTop: '2px solid var(--green-200)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--green-800)' }}>TOTAL DUE TODAY</div>
            <div style={{ fontSize: 11, color: 'var(--green-700)' }}>Renews monthly · Cancel anytime</div>
          </div>
          <div>
            <div className="display" style={{ fontSize: 26, fontWeight: 800, color: 'var(--green-700)', lineHeight: 1 }}>
              ₹{total.toLocaleString('en-IN')}
            </div>
            <div style={{ fontSize: 11, color: 'var(--slate-500)', textDecoration: 'line-through', textAlign: 'right' }}>
              ₹{plan.mrp.toLocaleString('en-IN')}
            </div>
          </div>
        </div>
      </div>

      {/* Trust badges */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 14 }}>
        {[
          { icon: Lock, text: '256-bit SSL Encrypted' },
          { icon: ShieldCheck, text: 'PCI-DSS Level 1' },
          { icon: RefreshCw, text: 'Cancel Anytime' },
        ].map(({ icon: Icon, text }) => (
          <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 11, color: 'var(--slate-500)' }}>
            <Icon size={12} color="var(--green-600)" />
            {text}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   PROCESSING SCREEN
───────────────────────────────────────────── */
function ProcessingScreen({ plan, onComplete }) {
  const [stage, setStage] = useState(0);
  const stages = [
    { label: 'Initiating secure payment…', duration: 900 },
    { label: 'Verifying transaction with Razorpay…', duration: 1200 },
    { label: 'Payment authorised ✓', duration: 800 },
    { label: 'Generating digital prescription…', duration: 900 },
    { label: 'Notifying pharmacy…', duration: 700 },
    { label: 'Confirming cold-chain dispatch…', duration: 600 },
  ];

  useEffect(() => {
    let t = 0;
    stages.forEach((s, i) => {
      t += s.duration;
      setTimeout(() => setStage(i + 1), t);
    });
    setTimeout(onComplete, t + 400);
  }, []);

  const progress = Math.min(100, Math.round((stage / stages.length) * 100));

  return (
    <div style={{ textAlign: 'center', padding: '40px 20px' }} className="fade-in">
      <div style={{
        width: 80, height: 80, borderRadius: '50%', margin: '0 auto 24px',
        background: 'var(--green-50)', display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative',
      }}>
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          border: '3px solid var(--slate-200)', borderTopColor: 'var(--green-500)',
          animation: 'spin 1s linear infinite',
        }} />
        <Lock size={28} color="var(--green-600)" />
      </div>

      <h3 className="display" style={{ fontSize: 20, fontWeight: 700, marginBottom: 6, color: 'var(--ink)' }}>
        Processing Payment
      </h3>
      <p style={{ fontSize: 14, color: 'var(--slate-500)', marginBottom: 28 }}>
        Please do not close this window
      </p>

      {/* Progress bar */}
      <div style={{ background: 'var(--slate-200)', borderRadius: 100, height: 6, marginBottom: 20, overflow: 'hidden' }}>
        <div style={{
          height: '100%', borderRadius: 100,
          background: 'linear-gradient(90deg,var(--green-500),var(--green-400))',
          width: `${progress}%`, transition: 'width .6s cubic-bezier(.4,0,.2,1)',
        }} />
      </div>

      {/* Stage list */}
      <div style={{ textAlign: 'left', maxWidth: 300, margin: '0 auto' }}>
        {stages.map((s, i) => (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10,
            opacity: i <= stage ? 1 : .3, transition: 'opacity .4s',
          }}>
            <div style={{
              width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
              background: i < stage ? 'var(--green-500)' : i === stage ? 'var(--slate-300)' : 'var(--slate-200)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'all .3s',
              animation: i < stage ? 'checkPop .4s ease' : 'none',
            }}>
              {i < stage
                ? <Check size={11} color="white" strokeWidth={3} />
                : i === stage
                  ? <Spinner size={12} color="var(--slate-600)" />
                  : null}
            </div>
            <span style={{ fontSize: 13, color: i < stage ? 'var(--green-700)' : i === stage ? 'var(--ink)' : 'var(--slate-400)', fontWeight: i === stage ? 600 : 400 }}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, fontSize: 12, color: 'var(--slate-500)' }}>
        <Lock size={12} color="var(--green-600)" />
        Secured by Razorpay · SSL encrypted
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   SUCCESS SCREEN
───────────────────────────────────────────── */
function SuccessScreen({ plan, deliveryData, method, coupon, couponInput, onReset }) {
  const orderId = 'SRX' + Date.now().toString(36).toUpperCase().slice(-8);
  const [copied, setCopied] = useState(false);
  const discount = coupon
    ? coupon.type === 'percent'
      ? Math.round((plan?.price || 0) * coupon.value / 100)
      : coupon.type === 'flat' ? coupon.value : 0
    : 0;
  const total = (plan?.price || 0) - discount;

  const copy = () => {
    navigator.clipboard?.writeText(orderId).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fade-in" style={{ padding: '8px 0' }}>
      {/* Success animation */}
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div style={{
          width: 90, height: 90, borderRadius: '50%', margin: '0 auto 20px',
          background: 'var(--green-100)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative',
          animation: 'checkPop .5s cubic-bezier(.17,.67,.3,1.33) both',
        }}>
          <div style={{
            position: 'absolute', inset: -6, borderRadius: '50%',
            border: '2px solid var(--green-300)',
            animation: 'ripple 1.5s ease-out infinite',
          }} />
          <CheckCircle2 size={44} color="var(--green-600)" />
        </div>
        <h2 className="display" style={{ fontSize: 26, fontWeight: 800, color: 'var(--ink)', marginBottom: 8 }}>
          Payment Successful! 🎉
        </h2>
        <p style={{ fontSize: 15, color: 'var(--slate-500)', lineHeight: 1.6, maxWidth: 360, margin: '0 auto' }}>
          Your order is confirmed. A licensed physician will call you within <strong>2 hours</strong> to
          issue your digital prescription.
        </p>
      </div>

      {/* Order ID */}
      <div style={{
        background: 'var(--slate-50)', borderRadius: 'var(--r-lg)', padding: '20px',
        marginBottom: 20, border: '1px solid var(--slate-200)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--slate-500)', letterSpacing: '.08em', marginBottom: 4 }}>ORDER ID</div>
            <div className="display" style={{ fontSize: 20, fontWeight: 800, color: 'var(--ink)' }}>{orderId}</div>
          </div>
          <button
            onClick={copy}
            style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: copied ? 'var(--green-100)' : 'var(--white)',
              border: '1px solid var(--slate-200)',
              borderRadius: 'var(--r)', padding: '8px 14px',
              fontSize: 12, fontWeight: 600, cursor: 'pointer', color: copied ? 'var(--green-700)' : 'var(--slate-600)',
              fontFamily: 'DM Sans, sans-serif', transition: 'all .2s',
            }}>
            {copied ? <><Check size={13} />Copied!</> : <><Copy size={13} />Copy</>}
          </button>
        </div>

        {[
          { label: 'Plan', value: plan?.name },
          { label: 'Amount paid', value: `₹${total.toLocaleString('en-IN')}` },
          { label: 'Payment method', value: method === 'upi' ? 'UPI' : method === 'card' ? 'Debit/Credit Card' : method === 'netbank' ? 'Net Banking' : method === 'wallet' ? 'Wallet' : 'Cash on Delivery' },
          { label: 'Deliver to', value: deliveryData?.city || 'Your city' },
          { label: 'Estimated delivery', value: '24–48 hours' },
        ].map(({ label, value }) => (
          <div key={label} style={{
            display: 'flex', justifyContent: 'space-between', fontSize: 13,
            padding: '6px 0', borderBottom: '1px solid var(--slate-200)',
          }}>
            <span style={{ color: 'var(--slate-500)' }}>{label}</span>
            <span style={{ fontWeight: 600, color: 'var(--ink)' }}>{value}</span>
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--slate-700)', marginBottom: 14 }}>WHAT HAPPENS NEXT</div>
        {[
          { icon: '📞', time: 'Within 2 hours', event: 'Doctor calls for consultation', done: false },
          { icon: '📋', time: 'After consultation', event: 'Digital prescription issued', done: false },
          { icon: '❄️', time: 'Same day', event: 'Cold-chain packaging & dispatch', done: false },
          { icon: '🚚', time: '24–48 hours', event: 'Delivery to your address', done: false },
          { icon: '📲', time: 'All along', event: 'WhatsApp tracking updates', done: false },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: 14, marginBottom: 14 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'var(--green-50)', border: '1px solid var(--green-200)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 16, flexShrink: 0,
              }}>{item.icon}</div>
              {i < 4 && <div style={{ width: 2, flex: 1, background: 'var(--green-100)', margin: '4px 0' }} />}
            </div>
            <div style={{ paddingTop: 6, paddingBottom: i < 4 ? 8 : 0 }}>
              <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--ink)', marginBottom: 2 }}>{item.event}</div>
              <div style={{ fontSize: 12, color: 'var(--slate-500)' }}>{item.time}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Helpline */}
      <div style={{
        background: 'var(--green-50)', border: '1px solid var(--green-200)',
        borderRadius: 'var(--r-lg)', padding: '16px 20px', marginBottom: 24,
        display: 'flex', alignItems: 'center', gap: 14,
      }}>
        <div style={{ fontSize: 28 }}>📞</div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--green-800)', marginBottom: 2 }}>
            Need help? Call our nurse helpline
          </div>
          <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--green-700)' }}>1800-123-SLIM</div>
          <div style={{ fontSize: 11, color: 'var(--green-700)' }}>Available 24/7 · Toll free</div>
        </div>
      </div>

      <button
        className="btn btn-green"
        style={{ width: '100%', fontSize: 15 }}
        onClick={onReset}
      >
        Done — Back to SlimRx <ArrowRight size={16} />
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────────
   STEP HEADER
───────────────────────────────────────────── */
function StepHeader({ step, total }) {
  const labels = ['Plan', 'Delivery', 'Payment', 'Review'];
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, marginBottom: 28 }}>
      {labels.map((label, i) => (
        <React.Fragment key={label}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
            <div className={`prog-dot ${i < step ? 'done' : i === step ? 'active' : 'idle'}`}>
              {i < step ? <Check size={13} strokeWidth={3} /> : i + 1}
            </div>
            <span style={{
              fontSize: 10, fontWeight: i === step ? 700 : 500,
              color: i === step ? 'var(--ink)' : i < step ? 'var(--green-600)' : 'var(--slate-400)',
              whiteSpace: 'nowrap',
            }}>{label}</span>
          </div>
          {i < labels.length - 1 && (
            <div className={`prog-line ${i < step ? 'done' : ''}`} style={{ marginBottom: 16 }} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────
   REVIEW STEP (step 3)
───────────────────────────────────────────── */
function ReviewStep({ plan, deliveryData, method, coupon, couponInput }) {
  const discount = coupon
    ? coupon.type === 'percent'
      ? Math.round((plan?.price || 0) * coupon.value / 100)
      : coupon.type === 'flat' ? coupon.value : 0
    : 0;
  const total = (plan?.price || 0) - discount;
  const methodLabel = { upi: 'UPI', card: 'Debit/Credit Card', netbank: 'Net Banking', wallet: 'Wallet', cod: 'Cash on Delivery' };

  return (
    <div className="fade-up">
      <SectionTitle sub="Please review before placing your order">
        Review Your Order
      </SectionTitle>

      {[
        {
          heading: 'Medication Plan',
          content: (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 24 }}>{plan?.icon}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{plan?.name}</div>
                <div style={{ fontSize: 12, color: 'var(--slate-500)' }}>{plan?.maker} · Monthly</div>
              </div>
            </div>
          ),
        },
        {
          heading: 'Delivery Address',
          content: (
            <div style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--slate-700)' }}>
              <strong>{deliveryData?.name}</strong><br />
              {deliveryData?.address1}{deliveryData?.address2 && `, ${deliveryData.address2}`}<br />
              {deliveryData?.city} – {deliveryData?.pincode}, {deliveryData?.state}
            </div>
          ),
        },
        {
          heading: 'Payment',
          content: <div style={{ fontWeight: 600, fontSize: 14 }}>{methodLabel[method] || method}</div>,
        },
      ].map(({ heading, content }) => (
        <div key={heading} style={{
          border: '1px solid var(--slate-200)', borderRadius: 'var(--r-lg)',
          padding: '16px 20px', marginBottom: 12,
        }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--slate-500)', letterSpacing: '.06em', marginBottom: 10 }}>
            {heading.toUpperCase()}
          </div>
          {content}
        </div>
      ))}

      {/* Final total */}
      <div style={{
        background: 'linear-gradient(135deg,var(--green-900),#0f2a18)',
        borderRadius: 'var(--r-lg)', padding: '20px',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        marginBottom: 16,
      }}>
        <div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,.5)', marginBottom: 4 }}>TOTAL TO PAY</div>
          <div className="display" style={{ fontSize: 32, fontWeight: 800, color: 'var(--green-400)' }}>
            ₹{total.toLocaleString('en-IN')}
          </div>
          {coupon && discount > 0 && (
            <div className="offer-chip chip-green" style={{ marginTop: 6 }}>
              <Tag size={10} /> Saved ₹{discount} with {couponInput}
            </div>
          )}
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 13, color: 'rgba(255,255,255,.5)', textDecoration: 'line-through', marginBottom: 4 }}>
            ₹{plan?.mrp?.toLocaleString('en-IN')}
          </div>
          <div className="offer-chip chip-green">Save {plan?.savings}% vs branded</div>
        </div>
      </div>

      <p style={{ fontSize: 12, color: 'var(--slate-400)', lineHeight: 1.6 }}>
        By placing this order you agree to SlimRx's{' '}
        <a href="#" style={{ color: 'var(--green-600)', textDecoration: 'none' }}>Terms of Service</a> and{' '}
        <a href="#" style={{ color: 'var(--green-600)', textDecoration: 'none' }}>Privacy Policy</a>.
        This subscription auto-renews monthly at ₹{plan?.price?.toLocaleString('en-IN')}. Cancel anytime.
        Prescription required — if the physician determines medication is unsuitable, you will be fully refunded.
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN CHECKOUT APP
───────────────────────────────────────────── */
export default function CheckoutApp() {
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState('checkout'); // 'checkout' | 'processing' | 'success'

  // Form state
  const [selectedPlan, setSelectedPlan] = useState(PLANS[0]);
  const [deliveryData, setDeliveryData] = useState({});
  const [deliveryErrors, setDeliveryErrors] = useState({});
  const [payMethod, setPayMethod] = useState('upi');
  const [cardData, setCardData] = useState({});
  const [cardErrors, setCardErrors] = useState({});
  const [upiData, setUpiData] = useState({});
  const [netbankData, setNetbankData] = useState({});
  const [walletData, setWalletData] = useState({});
  const [coupon, setCoupon] = useState(null);
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  const deliveryChange = (id, val) => {
    setDeliveryData(prev => ({ ...prev, [id]: val }));
    if (deliveryErrors[id]) setDeliveryErrors(prev => ({ ...prev, [id]: '' }));
  };

  const validateDelivery = () => {
    const required = ['name', 'phone', 'email', 'address1', 'city', 'pincode', 'state'];
    const errs = {};
    required.forEach(f => {
      if (!deliveryData[f]) errs[f] = 'This field is required';
    });
    if (deliveryData.phone && !/^[6-9]\d{9}$/.test(deliveryData.phone.replace(/\D/g, '')))
      errs.phone = 'Enter a valid 10-digit Indian mobile number';
    if (deliveryData.email && !/\S+@\S+\.\S+/.test(deliveryData.email))
      errs.email = 'Enter a valid email address';
    if (deliveryData.pincode && !/^\d{6}$/.test(deliveryData.pincode))
      errs.pincode = 'Enter a valid 6-digit PIN code';
    return errs;
  };

  const validateCard = () => {
    if (payMethod !== 'card') return {};
    const errs = {};
    const num = (cardData.number || '').replace(/\s/g, '');
    if (!num || num.length < 16) errs.number = 'Enter a valid 16-digit card number';
    if (!cardData.name) errs.name = 'Cardholder name is required';
    if (!cardData.expiry || !/^\d{2}\/\d{2}$/.test(cardData.expiry)) errs.expiry = 'Enter valid expiry (MM/YY)';
    if (!cardData.cvv || cardData.cvv.length < 3) errs.cvv = 'Enter valid CVV';
    return errs;
  };

  const applyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (!code) { setCouponError('Please enter a promo code'); return; }
    if (COUPONS[code]) {
      setCoupon(COUPONS[code]);
      setCouponError('');
    } else {
      setCouponError('Invalid promo code. Try SLIM20, WELCOME, or FREESHIP');
    }
  };

  const canProceed = () => {
    if (step === 0) return !!selectedPlan;
    if (step === 1) return Object.keys(validateDelivery()).length === 0 && deliveryData.name;
    if (step === 2) return true;
    return true;
  };

  const handleNext = () => {
    if (step === 1) {
      const errs = validateDelivery();
      if (Object.keys(errs).length > 0) { setDeliveryErrors(errs); return; }
    }
    if (step === 2) {
      const errs = validateCard();
      if (Object.keys(errs).length > 0) { setCardErrors(errs); return; }
    }
    if (step < 3) { setStep(s => s + 1); }
    else { setPhase('processing'); }
  };

  const CTALabel = [
    'Continue to Delivery →',
    'Continue to Payment →',
    'Review Order →',
    `Pay ₹${((selectedPlan?.price || 0) - (coupon ? coupon.type === 'percent' ? Math.round((selectedPlan?.price || 0) * coupon.value / 100) : coupon.type === 'flat' ? coupon.value : 0 : 0)).toLocaleString('en-IN')} Securely`,
  ];

  return (
    <>
      <style>{STYLES}</style>

      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(160deg,#0a0f1a 0%,#0f1e14 50%,#0a0f1a 100%)',
        padding: '24px 16px 80px',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
      }}>
        {/* Header */}
        <div style={{
          width: '100%', maxWidth: 480,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: 28,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 34, height: 34, borderRadius: 10,
              background: 'linear-gradient(135deg,var(--green-600),var(--green-800))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Activity size={17} color="white" />
            </div>
            <span className="display" style={{ color: 'var(--white)', fontWeight: 700, fontSize: 18 }}>
              SlimRx<span style={{ color: 'var(--green-400)' }}>.in</span>
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'rgba(255,255,255,.4)' }}>
            <Lock size={12} color="var(--green-500)" />
            Secured by Razorpay
          </div>
        </div>

        {/* Main card */}
        <div style={{
          width: '100%', maxWidth: 480,
          background: 'rgba(255,255,255,.98)',
          borderRadius: 28,
          overflow: 'hidden',
          boxShadow: '0 32px 80px rgba(0,0,0,.4)',
        }}>
          {phase === 'processing' && (
            <div style={{ padding: '32px 28px' }}>
              <ProcessingScreen plan={selectedPlan} onComplete={() => setPhase('success')} />
            </div>
          )}

          {phase === 'success' && (
            <div style={{ padding: '32px 28px' }}>
              <SuccessScreen
                plan={selectedPlan}
                deliveryData={deliveryData}
                method={payMethod}
                coupon={coupon}
                couponInput={couponInput}
                onReset={() => {
                  setPhase('checkout'); setStep(0);
                  setDeliveryData({}); setCardData({}); setCoupon(null); setCouponInput('');
                }}
              />
            </div>
          )}

          {phase === 'checkout' && (
            <>
              {/* Checkout header */}
              <div style={{
                padding: '24px 28px 0',
                background: 'linear-gradient(180deg,var(--green-50) 0%,var(--white) 100%)',
                borderBottom: '1px solid var(--slate-200)',
                paddingBottom: 20,
              }}>
                <StepHeader step={step} total={4} />
              </div>

              {/* Two-column: form left, summary right (or stacked on mobile) */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0,1fr)',
                gap: 0,
              }}>
                {/* Form area */}
                <div style={{ padding: '28px 28px 0' }}>
                  {step === 0 && (
                    <PlanSelector selected={selectedPlan} onSelect={setSelectedPlan} />
                  )}
                  {step === 1 && (
                    <DeliveryForm data={deliveryData} onChange={deliveryChange} errors={deliveryErrors} />
                  )}
                  {step === 2 && (
                    <PaymentMethod
                      method={payMethod} setMethod={setPayMethod}
                      cardData={cardData} setCardData={setCardData}
                      upiData={upiData} setUpiData={setUpiData}
                      netbankData={netbankData} setNetbankData={setNetbankData}
                      walletData={walletData} setWalletData={setWalletData}
                      cardErrors={cardErrors}
                    />
                  )}
                  {step === 3 && (
                    <ReviewStep
                      plan={selectedPlan} deliveryData={deliveryData}
                      method={payMethod} coupon={coupon} couponInput={couponInput}
                    />
                  )}
                </div>

                {/* Order summary (always visible) */}
                <div style={{ padding: '0 28px 28px' }}>
                  <div style={{ marginTop: 24 }}>
                    <div className="div" style={{ marginBottom: 20 }} />
                    <OrderSummary
                      plan={selectedPlan}
                      coupon={coupon} setCoupon={setCoupon}
                      couponInput={couponInput} setCouponInput={setCouponInput}
                      couponError={couponError} setCouponError={setCouponError}
                      onApplyCoupon={applyCoupon}
                      onRemoveCoupon={() => { setCoupon(null); setCouponInput(''); }}
                    />
                  </div>
                </div>
              </div>

              {/* Footer CTA */}
              <div style={{
                padding: '20px 28px 28px',
                borderTop: '1px solid var(--slate-200)',
                background: 'var(--white)',
                display: 'flex', gap: 12, alignItems: 'center',
              }}>
                {step > 0 && (
                  <button className="btn btn-outline" onClick={() => setStep(s => s - 1)}>
                    <ArrowLeft size={15} /> Back
                  </button>
                )}
                <button
                  className={`btn ripple-btn ${step === 3 ? 'btn-shimmer' : 'btn-green'}`}
                  style={{ flex: 1, fontSize: step === 3 ? 16 : 15 }}
                  onClick={handleNext}
                >
                  {step === 3 && <Lock size={15} />}
                  {CTALabel[step]}
                  {step < 3 && <ChevronRight size={16} />}
                </button>
              </div>
            </>
          )}
        </div>

        {/* Below card trust row */}
        {phase === 'checkout' && (
          <div className="fade-up" style={{
            display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 20, marginTop: 20,
          }}>
            {[
              { icon: ShieldCheck, text: 'CDSCO Approved Meds' },
              { icon: Lock, text: 'Bank-grade security' },
              { icon: RefreshCw, text: 'Cancel anytime' },
              { icon: Star, text: '4.9★ from 2,800+ reviews' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'rgba(255,255,255,.4)' }}>
                <Icon size={13} color="var(--green-500)" /> {text}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
