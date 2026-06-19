import React, { useState, useEffect, useRef } from 'react';
import {
  Activity, ArrowRight, Check, CheckCircle2, ChevronDown,
  ChevronRight, ClipboardList, Shield, ShieldCheck,
  Stethoscope, Truck, Users, AlertTriangle, Phone,
  Clock, Lock, CreditCard, Info, Star, Heart,
  Pill, TrendingDown, Award, FileText, X, Menu,
  ChevronUp, Zap, BarChart3, Globe
} from 'lucide-react';

/* ─────────────────────────────────────────────
   DESIGN SYSTEM
   Palette: Deep forest emerald + warm off-white
   + charcoal slate + gold accent
   Typography: Playfair Display (display) +
   DM Sans (body) — loaded via Google Fonts
───────────────────────────────────────────── */

const FONTS = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --emerald-950: #022c22;
  --emerald-900: #064e3b;
  --emerald-800: #065f46;
  --emerald-700: #047857;
  --emerald-600: #059669;
  --emerald-500: #10b981;
  --emerald-400: #34d399;
  --emerald-100: #d1fae5;
  --emerald-50:  #ecfdf5;
  --gold:        #d4a853;
  --gold-light:  #f0c97a;
  --charcoal:    #1a1f2e;
  --slate-800:   #1e293b;
  --slate-700:   #334155;
  --slate-500:   #64748b;
  --slate-400:   #94a3b8;
  --slate-200:   #e2e8f0;
  --slate-100:   #f1f5f9;
  --slate-50:    #f8fafc;
  --white:       #ffffff;
  --danger:      #ef4444;
  --amber:       #f59e0b;
  --radius-sm:   6px;
  --radius-md:   12px;
  --radius-lg:   20px;
  --radius-xl:   32px;
  --shadow-sm:   0 1px 3px rgba(0,0,0,.06), 0 1px 2px rgba(0,0,0,.04);
  --shadow-md:   0 4px 16px rgba(0,0,0,.08), 0 2px 6px rgba(0,0,0,.04);
  --shadow-lg:   0 12px 40px rgba(0,0,0,.12), 0 4px 12px rgba(0,0,0,.06);
  --shadow-card: 0 0 0 1px rgba(5,150,105,.08), 0 8px 32px rgba(5,150,105,.06);
}

html { scroll-behavior: smooth; }

body {
  font-family: 'DM Sans', sans-serif;
  background: var(--white);
  color: var(--charcoal);
  -webkit-font-smoothing: antialiased;
  line-height: 1.6;
}

.display-font { font-family: 'Playfair Display', Georgia, serif; }

/* ── Animations ── */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes pulse-ring {
  0%   { transform: scale(1);   opacity: .6; }
  100% { transform: scale(1.5); opacity: 0; }
}
@keyframes shimmer {
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
}
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50%       { transform: translateY(-8px); }
}
@keyframes count-up {
  from { opacity: 0; transform: scale(.8); }
  to   { opacity: 1; transform: scale(1); }
}

.animate-fade-up   { animation: fadeUp .6s ease forwards; }
.animate-fade-in   { animation: fadeIn .4s ease forwards; }
.animate-float     { animation: float 4s ease-in-out infinite; }

.stagger-1 { animation-delay: .1s; opacity: 0; }
.stagger-2 { animation-delay: .2s; opacity: 0; }
.stagger-3 { animation-delay: .3s; opacity: 0; }
.stagger-4 { animation-delay: .4s; opacity: 0; }
.stagger-5 { animation-delay: .5s; opacity: 0; }
.stagger-6 { animation-delay: .6s; opacity: 0; }

/* ── Utility classes ── */
.badge {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 4px 12px; border-radius: 100px;
  font-size: 12px; font-weight: 600; letter-spacing: .04em; text-transform: uppercase;
}
.badge-emerald {
  background: var(--emerald-100); color: var(--emerald-800);
}
.badge-gold {
  background: #fef3c7; color: #92400e;
}
.badge-white {
  background: rgba(255,255,255,.15); color: var(--white); backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,.25);
}

.btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 14px 28px; border-radius: var(--radius-md);
  font-family: 'DM Sans', sans-serif;
  font-size: 15px; font-weight: 600; line-height: 1;
  cursor: pointer; transition: all .2s ease;
  border: none; text-decoration: none; white-space: nowrap;
}
.btn-primary {
  background: linear-gradient(135deg, var(--emerald-600), var(--emerald-700));
  color: var(--white);
  box-shadow: 0 4px 16px rgba(5,150,105,.35);
}
.btn-primary:hover {
  background: linear-gradient(135deg, var(--emerald-700), var(--emerald-800));
  transform: translateY(-1px);
  box-shadow: 0 8px 24px rgba(5,150,105,.45);
}
.btn-primary:active { transform: translateY(0); }
.btn-outline {
  background: transparent;
  border: 1.5px solid var(--emerald-600);
  color: var(--emerald-700);
}
.btn-outline:hover {
  background: var(--emerald-50);
  border-color: var(--emerald-700);
}
.btn-ghost {
  background: rgba(255,255,255,.1);
  color: var(--white);
  border: 1.5px solid rgba(255,255,255,.25);
  backdrop-filter: blur(8px);
}
.btn-ghost:hover { background: rgba(255,255,255,.2); }
.btn-lg { padding: 18px 36px; font-size: 17px; border-radius: var(--radius-lg); }
.btn-sm { padding: 10px 20px; font-size: 13px; }

.card {
  background: var(--white);
  border-radius: var(--radius-lg);
  border: 1px solid var(--slate-200);
  box-shadow: var(--shadow-card);
  transition: all .25s ease;
}
.card:hover { box-shadow: var(--shadow-lg); transform: translateY(-2px); }

.section-heading {
  font-family: 'Playfair Display', Georgia, serif;
  font-weight: 700; line-height: 1.2; letter-spacing: -.02em;
}

/* ── Progress bar ── */
.progress-track {
  height: 6px; background: var(--slate-200); border-radius: 100px; overflow: hidden;
}
.progress-fill {
  height: 100%; border-radius: 100px;
  background: linear-gradient(90deg, var(--emerald-500), var(--emerald-400));
  transition: width .6s cubic-bezier(.4,0,.2,1);
}

/* ── Input ── */
.input-field {
  width: 100%;
  padding: 14px 16px;
  border: 1.5px solid var(--slate-200);
  border-radius: var(--radius-md);
  font-family: 'DM Sans', sans-serif;
  font-size: 15px;
  color: var(--charcoal);
  background: var(--white);
  transition: border-color .2s, box-shadow .2s;
  outline: none;
  appearance: none;
}
.input-field:focus {
  border-color: var(--emerald-500);
  box-shadow: 0 0 0 3px rgba(16,185,129,.12);
}
.input-field::placeholder { color: var(--slate-400); }

.select-field {
  width: 100%;
  padding: 14px 40px 14px 16px;
  border: 1.5px solid var(--slate-200);
  border-radius: var(--radius-md);
  font-family: 'DM Sans', sans-serif;
  font-size: 15px;
  color: var(--charcoal);
  background: var(--white) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='none' viewBox='0 0 24 24'%3E%3Cpath stroke='%2364748b' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m6 9 6 6 6-6'/%3E%3C/svg%3E") no-repeat right 14px center;
  cursor: pointer; outline: none;
  transition: border-color .2s, box-shadow .2s;
  appearance: none; -webkit-appearance: none;
}
.select-field:focus {
  border-color: var(--emerald-500);
  box-shadow: 0 0 0 3px rgba(16,185,129,.12);
}

label.field-label {
  display: block; font-size: 13px; font-weight: 600;
  color: var(--slate-700); margin-bottom: 6px; letter-spacing: .02em;
}

/* ── Divider ── */
.divider { height: 1px; background: var(--slate-200); }

/* ── Trust strip ── */
.trust-item {
  display: flex; align-items: center; gap: 8px;
  font-size: 13px; font-weight: 500; color: var(--slate-600);
}

/* ── Scrollbar ── */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: var(--slate-300); border-radius: 3px; }

/* ── Sticky nav shadow ── */
.nav-scrolled {
  box-shadow: 0 1px 0 rgba(0,0,0,.06), 0 4px 16px rgba(0,0,0,.06);
}

/* ── Gradient text ── */
.gradient-text {
  background: linear-gradient(135deg, var(--emerald-600), var(--emerald-400));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* ── Hero mesh bg ── */
.hero-mesh {
  background:
    radial-gradient(ellipse 80% 60% at 60% -10%, rgba(16,185,129,.18) 0%, transparent 60%),
    radial-gradient(ellipse 50% 40% at 10% 80%, rgba(6,95,70,.12) 0%, transparent 50%),
    linear-gradient(165deg, #022c22 0%, #064e3b 40%, #0f3d2e 100%);
}

/* ── FAQ accordion ── */
.faq-item { border-bottom: 1px solid var(--slate-200); }
.faq-btn {
  width: 100%; text-align: left; background: none; border: none;
  padding: 20px 0; cursor: pointer;
  display: flex; align-items: center; justify-content: space-between; gap: 16px;
  font-family: 'DM Sans', sans-serif; font-size: 16px; font-weight: 600;
  color: var(--charcoal); transition: color .2s;
}
.faq-btn:hover { color: var(--emerald-700); }
.faq-answer {
  overflow: hidden; transition: max-height .35s cubic-bezier(.4,0,.2,1), opacity .3s;
  font-size: 15px; color: var(--slate-600); line-height: 1.7;
}

/* ── Medication card ── */
.med-card {
  background: var(--white);
  border: 1.5px solid var(--slate-200);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: all .25s ease;
  cursor: pointer;
}
.med-card:hover { border-color: var(--emerald-400); box-shadow: var(--shadow-lg); transform: translateY(-3px); }
.med-card.selected { border-color: var(--emerald-500); box-shadow: 0 0 0 3px rgba(16,185,129,.15), var(--shadow-lg); }

/* ── Step indicator ── */
.step-dot {
  width: 32px; height: 32px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 13px; font-weight: 700; transition: all .3s;
  flex-shrink: 0;
}
.step-dot.done { background: var(--emerald-500); color: var(--white); }
.step-dot.active { background: var(--emerald-700); color: var(--white); box-shadow: 0 0 0 4px rgba(16,185,129,.2); }
.step-dot.pending { background: var(--slate-200); color: var(--slate-500); }
.step-line { flex: 1; height: 2px; background: var(--slate-200); transition: background .3s; }
.step-line.done { background: var(--emerald-400); }

/* ── Ticker ── */
@keyframes ticker {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
.ticker-wrap { overflow: hidden; }
.ticker-inner {
  display: flex; gap: 48px; width: max-content;
  animation: ticker 28s linear infinite;
}

/* ── Modal overlay ── */
.modal-overlay {
  position: fixed; inset: 0; z-index: 1000;
  background: rgba(2,44,34,.55); backdrop-filter: blur(4px);
  display: flex; align-items: center; justify-content: center;
  padding: 20px; animation: fadeIn .25s ease;
}
.modal-box {
  background: var(--white); border-radius: var(--radius-xl);
  max-width: 520px; width: 100%; max-height: 90vh; overflow-y: auto;
  box-shadow: 0 24px 80px rgba(0,0,0,.25);
  animation: fadeUp .3s ease;
}

/* ── Radio choice ── */
.radio-choice {
  display: flex; align-items: flex-start; gap: 14px;
  padding: 16px; border-radius: var(--radius-md);
  border: 1.5px solid var(--slate-200);
  cursor: pointer; transition: all .2s;
  user-select: none;
}
.radio-choice:hover { border-color: var(--emerald-400); background: var(--emerald-50); }
.radio-choice.selected { border-color: var(--emerald-500); background: var(--emerald-50); }
.radio-dot {
  width: 20px; height: 20px; border-radius: 50%;
  border: 2px solid var(--slate-300); flex-shrink: 0;
  margin-top: 1px; transition: all .2s;
  display: flex; align-items: center; justify-content: center;
}
.radio-choice.selected .radio-dot {
  border-color: var(--emerald-500); background: var(--emerald-500);
}
.radio-dot::after {
  content: ''; width: 8px; height: 8px;
  border-radius: 50%; background: var(--white);
  opacity: 0; transition: opacity .2s;
}
.radio-choice.selected .radio-dot::after { opacity: 1; }

/* ── Shimmer CTA ── */
.btn-shimmer {
  background-size: 200% auto;
  background-image: linear-gradient(90deg,
    var(--emerald-600) 0%,
    var(--emerald-400) 50%,
    var(--emerald-600) 100%);
  animation: shimmer 3s linear infinite;
  color: var(--white);
}
.btn-shimmer:hover { opacity: .92; transform: translateY(-1px); }

/* ── Review stars ── */
.star-filled { color: #f59e0b; fill: #f59e0b; }
.star-empty  { color: var(--slate-300); }

/* ── Responsive helpers ── */
@media (max-width: 768px) {
  .hide-mobile { display: none !important; }
  .btn-lg { padding: 16px 28px; font-size: 15px; }
}
@media (min-width: 769px) {
  .hide-desktop { display: none !important; }
}
`;

/* ═══════════════════════════════════════════
   DATA LAYER
═══════════════════════════════════════════ */

const MEDICATIONS = [
  {
    id: 'sema-oral',
    name: 'Semaglutide Oral',
    brand: 'SemaSlim™ 7mg',
    maker: 'Sun Pharmaceutical',
    type: 'Oral Tablet',
    typeIcon: '💊',
    price: 1299,
    originalPrice: 4200,
    unit: 'per month',
    highlight: 'Most Popular',
    highlightColor: 'badge-gold',
    desc: 'Once-daily oral tablet. Same active molecule as Ozempic®/Wegovy®. Clinically proven 12–15% body weight reduction over 68 weeks.',
    features: ['Once-daily tablet', 'No injections', 'GLP-1 receptor agonist', 'CDSCO approved'],
    effectiveness: 87,
    convenience: 95,
    savings: '69%',
  },
  {
    id: 'lira-pen',
    name: 'Liraglutide 3mg',
    brand: 'LiraDose™ Pen',
    maker: 'Cipla Ltd.',
    type: 'Pre-filled Pen',
    typeIcon: '💉',
    price: 1799,
    originalPrice: 6500,
    unit: 'per month',
    highlight: 'Clinical Gold Standard',
    highlightColor: 'badge-emerald',
    desc: 'Once-daily subcutaneous injection. Proven 5–10% weight reduction at 56 weeks with superior metabolic benefits. Physician-recommended.',
    features: ['Once-daily injection', 'Pre-filled pen', 'Metabolic benefits', 'CDSCO approved'],
    effectiveness: 94,
    convenience: 75,
    savings: '72%',
  },
  {
    id: 'sema-pen',
    name: 'Semaglutide 2.4mg',
    brand: 'SemaPen™ XR',
    maker: 'Zydus Cadila',
    type: 'Pre-filled Pen (Weekly)',
    typeIcon: '💉',
    price: 2199,
    originalPrice: 9800,
    unit: 'per month',
    highlight: 'Maximum Results',
    highlightColor: 'badge-emerald',
    desc: 'Once-weekly subcutaneous pen. Maximum-dose semaglutide for serious weight management. 15–17% average weight reduction in trials.',
    features: ['Once-weekly only', 'Maximum dose', 'Highest efficacy', 'CDSCO approved'],
    effectiveness: 97,
    convenience: 88,
    savings: '78%',
  },
];

const STEPS_QUIZ = [
  { id: 'eligibility',   label: 'Eligibility',  icon: ClipboardList },
  { id: 'health',        label: 'Health',        icon: Heart },
  { id: 'medication',    label: 'Medication',    icon: Pill },
  { id: 'consultation',  label: 'Consultation',  icon: Stethoscope },
  { id: 'checkout',      label: 'Checkout',      icon: CreditCard },
];

const FAQS = [
  {
    q: 'Are these medications safe and legally approved in India?',
    a: 'Yes. All medications on SlimRx are manufactured by leading Indian pharma companies (Sun Pharma, Cipla, Zydus Cadila) and approved by the Central Drugs Standard Control Organisation (CDSCO). They contain the same active pharmaceutical ingredients as their branded global counterparts like Ozempic® and Wegovy®, at a fraction of the cost.',
  },
  {
    q: 'How is a ₹1,299/month price possible when Wegovy® costs ₹35,000+?',
    a: 'Indian pharmaceutical companies produce generic versions of these molecules once international patents expire or under Indian compulsory licensing. Our model eliminates pharmacy markups, middlemen, and unnecessary overhead — connecting you directly to the manufacturer\'s supply chain under physician supervision.',
  },
  {
    q: 'Do I need a prescription? How does the doctor consultation work?',
    a: 'Yes, a valid prescription is legally required for GLP-1 medications in India. Our telemedicine platform connects you with licensed MBBS/MD physicians within 2 hours. After reviewing your health profile, the doctor issues a digital prescription (valid nationwide) and our pharmacy dispenses your medication.',
  },
  {
    q: 'What are the common side effects I should know about?',
    a: 'The most common side effects are nausea, vomiting, and diarrhoea — especially in the first 2–4 weeks as your body adjusts. These typically subside. Our physicians use a dose-escalation protocol to minimise side effects. Serious side effects are rare but our 24/7 nurse helpline ensures immediate support.',
  },
  {
    q: 'How quickly will my medication be delivered?',
    a: 'After prescription approval (usually within 2 hours), your cold-chain medication ships via our temperature-controlled courier network. Delivery is within 24 hours in Tier-1 cities (Mumbai, Delhi, Bengaluru, Chennai, Hyderabad, Pune) and 48–72 hours pan-India.',
  },
  {
    q: 'Is my health data and payment information secure?',
    a: 'Your data is encrypted end-to-end using AES-256 and stored on HIPAA-compliant servers in India. We are compliant with the Digital Personal Data Protection Act, 2023. We never sell your health data. Payments are processed by Razorpay (PCI-DSS Level 1 certified) and we do not store card numbers.',
  },
];

const TESTIMONIALS = [
  {
    name: 'Priya M.',
    city: 'Bengaluru',
    weight: '14 kg',
    duration: '4 months',
    product: 'SemaSlim™ Oral',
    text: 'I had tried every diet imaginable. SlimRx gave me access to the same medication my NRI cousin was spending $1,200/month on — for less than ₹1,500. My cholesterol is down, I feel incredible.',
    stars: 5,
    avatar: '👩‍💼',
  },
  {
    name: 'Rajesh K.',
    city: 'Mumbai',
    weight: '18 kg',
    duration: '5 months',
    product: 'SemaPen™ XR',
    text: 'My doctor referred me to SlimRx after I showed him the pricing. The consultation was seamless — doctor called within 90 minutes. Delivery was next morning. Genuinely life-changing.',
    stars: 5,
    avatar: '👨‍💻',
  },
  {
    name: 'Ananya R.',
    city: 'Delhi',
    weight: '9 kg',
    duration: '3 months',
    product: 'LiraDose™ Pen',
    text: 'The nurse helpline is exceptional. They walked me through the first injection step-by-step. I was so nervous but it was genuinely painless. 9 kg in 3 months without intense exercise.',
    stars: 5,
    avatar: '👩‍⚕️',
  },
  {
    name: 'Vikram S.',
    city: 'Chennai',
    weight: '22 kg',
    duration: '6 months',
    product: 'SemaPen™ XR',
    text: 'Pre-diabetic, PCOS complications in my wife, we both started together. The family plan pricing made it even more affordable. Our metabolic panels have completely transformed.',
    stars: 5,
    avatar: '👨‍🦱',
  },
];

const TRUST_SIGNALS = [
  { icon: ShieldCheck, text: 'CDSCO Approved Meds' },
  { icon: Stethoscope, text: 'Licensed MBBS/MD Doctors' },
  { icon: Lock, text: 'DPDPA Compliant' },
  { icon: Truck, text: 'Cold-Chain Delivery' },
  { icon: CreditCard, text: 'Razorpay Secured' },
  { icon: Phone, text: '24/7 Nurse Helpline' },
];

const QUIZ_QUESTIONS = {
  eligibility: [
    {
      id: 'age',
      label: 'What is your age?',
      type: 'select',
      options: ['18–29 years', '30–39 years', '40–49 years', '50–59 years', '60+ years'],
    },
    {
      id: 'bmi_range',
      label: 'What is your approximate BMI or weight category?',
      type: 'radio',
      options: [
        { value: 'overweight', label: 'Overweight (BMI 25–29.9)', sub: 'I want to shed 8–15 kg' },
        { value: 'obese1', label: 'Obese Class I (BMI 30–34.9)', sub: 'I want to shed 15–25 kg' },
        { value: 'obese2', label: 'Obese Class II+ (BMI 35+)', sub: 'I want to shed 25 kg+' },
        { value: 'unsure', label: 'I\'m not sure of my BMI', sub: 'Our doctor will assess' },
      ],
    },
  ],
  health: [
    {
      id: 'conditions',
      label: 'Do you have any of the following conditions? (Select all that apply)',
      type: 'multiselect',
      options: [
        'Type 2 Diabetes', 'Pre-diabetes', 'High blood pressure',
        'High cholesterol / Triglycerides', 'PCOS', 'Sleep apnea',
        'Heart disease', 'None of the above',
      ],
    },
    {
      id: 'contraindications',
      label: 'Have you ever been diagnosed with any of the following? (Important for safety)',
      type: 'multiselect',
      options: [
        'Thyroid cancer or family history of MTC',
        'Pancreatitis (inflammation of pancreas)',
        'Severe kidney disease',
        'Pregnancy or planning pregnancy',
        'None of the above',
      ],
    },
  ],
};

/* ═══════════════════════════════════════════
   SUB-COMPONENTS
═══════════════════════════════════════════ */

function StarRating({ count = 5, filled = 5, size = 16 }) {
  return (
    <span style={{ display: 'flex', gap: 2 }}>
      {Array.from({ length: count }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={i < filled ? 'star-filled' : 'star-empty'}
        />
      ))}
    </span>
  );
}

function ProgressBar({ value, label, color = 'var(--emerald-500)' }) {
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontSize: 12, color: 'var(--slate-600)', fontWeight: 500 }}>{label}</span>
        <span style={{ fontSize: 12, color: 'var(--emerald-700)', fontWeight: 700 }}>{value}%</span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${value}%`, background: color }} />
      </div>
    </div>
  );
}

function TrustStrip() {
  return (
    <div style={{
      background: 'var(--slate-50)',
      borderTop: '1px solid var(--slate-200)',
      borderBottom: '1px solid var(--slate-200)',
      padding: '12px 0',
      overflow: 'hidden',
    }}>
      <div className="ticker-wrap">
        <div className="ticker-inner">
          {[...TRUST_SIGNALS, ...TRUST_SIGNALS].map((t, i) => (
            <div key={i} className="trust-item">
              <t.icon size={15} color="var(--emerald-600)" />
              <span>{t.text}</span>
              <span style={{ color: 'var(--slate-300)', marginLeft: 8 }}>•</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Navbar({ onStartQuiz }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const navLinks = ['How It Works', 'Medications', 'Reviews', 'FAQs'];

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: 'rgba(255,255,255,.96)', backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--slate-200)',
      transition: 'box-shadow .3s',
    }} className={scrolled ? 'nav-scrolled' : ''}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        padding: '0 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 64,
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 34, height: 34, borderRadius: 10,
            background: 'linear-gradient(135deg, var(--emerald-600), var(--emerald-800))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Activity size={18} color="white" />
          </div>
          <span className="display-font" style={{
            fontSize: 20, fontWeight: 700, color: 'var(--emerald-900)',
            letterSpacing: '-.02em',
          }}>
            SlimRx
            <span style={{ color: 'var(--emerald-500)', fontWeight: 600 }}>.in</span>
          </span>
        </div>

        {/* Desktop nav */}
        <div className="hide-mobile" style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          {navLinks.map(link => (
            <a key={link} href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
              style={{
                fontSize: 14, fontWeight: 500, color: 'var(--slate-600)',
                textDecoration: 'none', transition: 'color .2s',
              }}
              onMouseEnter={e => e.target.style.color = 'var(--emerald-700)'}
              onMouseLeave={e => e.target.style.color = 'var(--slate-600)'}
            >
              {link}
            </a>
          ))}
        </div>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <button className="hide-mobile btn btn-outline btn-sm" onClick={onStartQuiz}>
            Get Consultation
          </button>
          <button className="btn btn-primary btn-sm" onClick={onStartQuiz}>
            Start Free Quiz <ArrowRight size={14} />
          </button>
          <button
            className="hide-desktop"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
          >
            {mobileOpen ? <X size={22} color="var(--charcoal)" /> : <Menu size={22} color="var(--charcoal)" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="hide-desktop" style={{
          background: 'var(--white)', borderTop: '1px solid var(--slate-200)',
          padding: '16px 24px 20px', display: 'flex', flexDirection: 'column', gap: 16,
        }}>
          {navLinks.map(link => (
            <a key={link} href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setMobileOpen(false)}
              style={{
                fontSize: 15, fontWeight: 500, color: 'var(--slate-700)',
                textDecoration: 'none', padding: '8px 0',
                borderBottom: '1px solid var(--slate-100)',
              }}>
              {link}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

function HeroSection({ onStartQuiz }) {
  return (
    <section className="hero-mesh" style={{ position: 'relative', overflow: 'hidden', padding: '80px 24px 100px' }}>
      {/* Decorative blobs */}
      <div style={{
        position: 'absolute', top: '-40px', right: '-60px',
        width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(16,185,129,.15) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-80px', left: '-80px',
        width: 300, height: 300, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212,168,83,.1) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 64, alignItems: 'center',
        }}>
          {/* Left column */}
          <div>
            <div className="animate-fade-up stagger-1" style={{ marginBottom: 24 }}>
              <span className="badge badge-white">
                <Zap size={11} />
                India's First GLP-1 Telehealth Platform
              </span>
            </div>

            <h1 className="display-font animate-fade-up stagger-2" style={{
              fontSize: 'clamp(38px, 5vw, 62px)',
              fontWeight: 800, color: 'var(--white)',
              lineHeight: 1.1, letterSpacing: '-.03em',
              marginBottom: 24,
            }}>
              Lose Weight with{' '}
              <span style={{ color: 'var(--emerald-400)' }}>Ozempic®-class</span>{' '}
              Meds from ₹1,299/mo
            </h1>

            <p className="animate-fade-up stagger-3" style={{
              fontSize: 17, color: 'rgba(255,255,255,.75)',
              lineHeight: 1.7, marginBottom: 36, maxWidth: 500,
            }}>
              Doctor-prescribed Indian generic GLP-1 medications — same molecule,
              same results, 70–80% cheaper. Delivered cold-chain to your door within 24 hours.
            </p>

            {/* CTA group */}
            <div className="animate-fade-up stagger-4" style={{ display: 'flex', flexWrap: 'wrap', gap: 14, marginBottom: 36 }}>
              <button className="btn btn-shimmer btn-lg" onClick={onStartQuiz}>
                Check My Eligibility Free <ArrowRight size={18} />
              </button>
              <button className="btn btn-ghost btn-lg" onClick={() => document.getElementById('medications')?.scrollIntoView({ behavior: 'smooth' })}>
                View Medications <ChevronDown size={18} />
              </button>
            </div>

            {/* Social proof row */}
            <div className="animate-fade-up stagger-5" style={{ display: 'flex', flexWrap: 'wrap', gap: 28 }}>
              {[
                { num: '47,000+', label: 'Patients served' },
                { num: '4.9★', label: '2,800+ reviews' },
                { num: '₹1,299', label: 'Starting price/mo' },
                { num: '24hrs', label: 'First delivery' },
              ].map(({ num, label }) => (
                <div key={label}>
                  <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--emerald-400)', lineHeight: 1 }}>{num}</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,.55)', marginTop: 2 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column: floating product card */}
          <div className="animate-float hide-mobile" style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{
              background: 'rgba(255,255,255,.07)', backdropFilter: 'blur(24px)',
              border: '1px solid rgba(255,255,255,.12)',
              borderRadius: 28, padding: '32px 28px',
              maxWidth: 360, width: '100%',
              boxShadow: '0 24px 60px rgba(0,0,0,.3)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 14,
                  background: 'linear-gradient(135deg, rgba(16,185,129,.3), rgba(6,95,70,.4))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 24,
                }}>💊</div>
                <div>
                  <div style={{ color: 'var(--white)', fontWeight: 700, fontSize: 15 }}>SemaSlim™ 7mg Oral</div>
                  <div style={{ color: 'rgba(255,255,255,.5)', fontSize: 12 }}>by Sun Pharmaceutical</div>
                </div>
              </div>

              <div style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 4 }}>
                  <span style={{ fontSize: 36, fontWeight: 800, color: 'var(--emerald-400)' }}>₹1,299</span>
                  <span style={{ fontSize: 14, color: 'rgba(255,255,255,.4)', textDecoration: 'line-through' }}>₹4,200</span>
                </div>
                <span style={{
                  background: 'rgba(16,185,129,.2)', color: 'var(--emerald-300)',
                  fontSize: 12, fontWeight: 700, padding: '3px 10px', borderRadius: 100,
                }}>Save 69% vs branded</span>
              </div>

              {['CDSCO Approved formulation', 'Same molecule as Wegovy®', 'Once-daily oral — no injections', 'Cold-chain home delivery'].map(f => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <CheckCircle2 size={15} color="var(--emerald-400)" />
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,.7)' }}>{f}</span>
                </div>
              ))}

              <button className="btn btn-primary" onClick={onStartQuiz} style={{ width: '100%', justifyContent: 'center', marginTop: 20 }}>
                Get Prescribed Now <ArrowRight size={15} />
              </button>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 12 }}>
                <Lock size={12} color="rgba(255,255,255,.4)" />
                <span style={{ fontSize: 11, color: 'rgba(255,255,255,.4)' }}>256-bit encrypted · DPDPA compliant</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      icon: ClipboardList, num: '01', color: 'var(--emerald-600)',
      title: 'Free 3-Minute Quiz',
      desc: 'Answer questions about your health history, current weight, and goals. Our intelligent intake screens for eligibility and contraindications.',
    },
    {
      icon: Stethoscope, num: '02', color: 'var(--emerald-600)',
      title: 'Doctor Consultation',
      desc: 'A licensed Indian physician reviews your profile and consults with you via video or chat within 2 hours. Digital prescription issued immediately.',
    },
    {
      icon: Pill, num: '03', color: 'var(--emerald-600)',
      title: 'Pharmacy Dispatch',
      desc: 'Our CDSCO-licensed pharmacy dispenses your medication in temperature-controlled packaging. Trackable shipment.',
    },
    {
      icon: Truck, num: '04', color: 'var(--emerald-600)',
      title: 'Door Delivery + Ongoing Care',
      desc: 'Receive your medication within 24 hrs. Monthly check-ins, dose adjustments, and 24/7 nurse helpline included.',
    },
  ];

  return (
    <section id="how-it-works" style={{ padding: '100px 24px', background: 'var(--white)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span className="badge badge-emerald" style={{ marginBottom: 16 }}>
            <CheckCircle2 size={12} /> Simple 4-Step Process
          </span>
          <h2 className="section-heading" style={{ fontSize: 'clamp(32px, 4vw, 48px)', marginBottom: 16 }}>
            From quiz to doorstep in{' '}
            <span className="gradient-text">under 24 hours</span>
          </h2>
          <p style={{ fontSize: 17, color: 'var(--slate-500)', maxWidth: 540, margin: '0 auto' }}>
            We've compressed what once required a 3-week hospital process into a seamless digital experience.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 28,
        }}>
          {steps.map((step, idx) => (
            <div key={step.num} className="card" style={{ padding: '32px 24px', position: 'relative' }}>
              {/* Step number watermark */}
              <div style={{
                position: 'absolute', top: 16, right: 20,
                fontSize: 64, fontWeight: 800, color: 'var(--slate-100)',
                lineHeight: 1, fontFamily: 'Playfair Display, serif',
                userSelect: 'none',
              }}>{step.num}</div>

              <div style={{
                width: 52, height: 52, borderRadius: 16,
                background: 'var(--emerald-50)', display: 'flex', alignItems: 'center',
                justifyContent: 'center', marginBottom: 20,
              }}>
                <step.icon size={24} color="var(--emerald-600)" />
              </div>

              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10, color: 'var(--charcoal)' }}>
                {step.title}
              </h3>
              <p style={{ fontSize: 14, color: 'var(--slate-500)', lineHeight: 1.65 }}>{step.desc}</p>

              {idx < steps.length - 1 && (
                <div className="hide-mobile" style={{
                  position: 'absolute', right: -28, top: '50%', transform: 'translateY(-50%)',
                  zIndex: 1,
                }}>
                  <ChevronRight size={20} color="var(--slate-300)" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function MedicationsSection({ onSelectMed }) {
  const [selected, setSelected] = useState(null);

  const handleSelect = (med) => {
    setSelected(med.id);
    onSelectMed(med);
  };

  return (
    <section id="medications" style={{ padding: '100px 24px', background: 'var(--slate-50)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span className="badge badge-emerald" style={{ marginBottom: 16 }}>
            <Shield size={12} /> CDSCO-Approved · Made in India
          </span>
          <h2 className="section-heading" style={{ fontSize: 'clamp(32px, 4vw, 48px)', marginBottom: 16 }}>
            Choose your <span className="gradient-text">GLP-1 medication</span>
          </h2>
          <p style={{ fontSize: 17, color: 'var(--slate-500)', maxWidth: 560, margin: '0 auto' }}>
            All medications contain the same active molecules as their global branded counterparts —
            manufactured by India's top pharma companies under strict GMP standards.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 28, marginBottom: 48,
        }}>
          {MEDICATIONS.map((med) => (
            <div
              key={med.id}
              className={`med-card ${selected === med.id ? 'selected' : ''}`}
              onClick={() => handleSelect(med)}
            >
              {/* Card header */}
              <div style={{
                background: selected === med.id
                  ? 'linear-gradient(135deg, var(--emerald-800), var(--emerald-900))'
                  : 'linear-gradient(135deg, var(--charcoal), var(--slate-800))',
                padding: '24px 24px 20px',
                transition: 'background .3s',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <span style={{ fontSize: 36 }}>{med.typeIcon}</span>
                  <span className={`badge ${med.highlightColor}`}>{med.highlight}</span>
                </div>
                <div style={{ color: 'var(--white)', fontSize: 20, fontWeight: 700, marginBottom: 2 }}>{med.brand}</div>
                <div style={{ color: 'rgba(255,255,255,.5)', fontSize: 12 }}>by {med.maker} · {med.type}</div>
              </div>

              {/* Pricing */}
              <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--slate-100)' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
                  <span style={{ fontSize: 32, fontWeight: 800, color: 'var(--emerald-700)' }}>₹{med.price.toLocaleString('en-IN')}</span>
                  <span style={{ fontSize: 14, color: 'var(--slate-400)', textDecoration: 'line-through' }}>₹{med.originalPrice.toLocaleString('en-IN')}</span>
                  <span className="badge badge-gold" style={{ fontSize: 11, padding: '2px 8px' }}>Save {med.savings}</span>
                </div>
                <div style={{ fontSize: 12, color: 'var(--slate-500)' }}>{med.unit} · subscription, cancel anytime</div>
              </div>

              {/* Description + features */}
              <div style={{ padding: '20px 24px' }}>
                <p style={{ fontSize: 13, color: 'var(--slate-600)', lineHeight: 1.65, marginBottom: 16 }}>{med.desc}</p>

                <div style={{ marginBottom: 20 }}>
                  <ProgressBar value={med.effectiveness} label="Efficacy Score" />
                  <ProgressBar value={med.convenience} label="Convenience Score" color="var(--gold)" />
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
                  {med.features.map(f => (
                    <span key={f} style={{
                      background: 'var(--emerald-50)', color: 'var(--emerald-700)',
                      fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 100,
                      border: '1px solid var(--emerald-200)',
                    }}>{f}</span>
                  ))}
                </div>

                <button
                  className={`btn ${selected === med.id ? 'btn-primary' : 'btn-outline'}`}
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => handleSelect(med)}
                >
                  {selected === med.id ? (
                    <><CheckCircle2 size={16} /> Selected — Get Prescribed</>
                  ) : (
                    <>Select This Medication <ArrowRight size={15} /></>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison note */}
        <div style={{
          background: 'var(--white)', border: '1px solid var(--slate-200)',
          borderRadius: var_('--radius-lg'), padding: '24px 28px',
          display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12,
              background: 'var(--emerald-50)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Info size={22} color="var(--emerald-600)" />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 2 }}>Not sure which medication is right for you?</div>
              <div style={{ fontSize: 13, color: 'var(--slate-500)' }}>Our physicians will personalise the best medication and dosing protocol for your profile.</div>
            </div>
          </div>
          <button className="btn btn-primary btn-sm"
            onClick={() => document.getElementById('quiz-section')?.scrollIntoView({ behavior: 'smooth' })}>
            Get Doctor's Recommendation <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}

function var_(v) { return v; } // CSS var passthrough (for JSX style prop)

function ComparisonSection() {
  const rows = [
    { label: 'Monthly cost', slimrx: '₹1,299 – ₹2,199', branded: '₹22,000 – ₹40,000', winner: 'slimrx' },
    { label: 'Active molecule', slimrx: 'Identical (semaglutide / liraglutide)', branded: 'Same', winner: 'neutral' },
    { label: 'Regulatory approval', slimrx: 'CDSCO India', branded: 'FDA / EMA / CDSCO', winner: 'neutral' },
    { label: 'Manufacturer', slimrx: 'Sun Pharma, Cipla, Zydus', branded: 'Novo Nordisk (Denmark)', winner: 'slimrx' },
    { label: 'Doctor prescription', slimrx: 'Included free', branded: 'Separate cost', winner: 'slimrx' },
    { label: 'Delivery', slimrx: '24 hrs, cold-chain', branded: '3–7 days (if available)', winner: 'slimrx' },
    { label: 'Nurse helpline', slimrx: '24/7 included', branded: 'Not included', winner: 'slimrx' },
    { label: 'Clinical data', slimrx: 'Bioequivalent molecule', branded: 'Original trials', winner: 'neutral' },
  ];

  return (
    <section style={{ padding: '100px 24px', background: 'var(--white)' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="badge badge-emerald" style={{ marginBottom: 16 }}>
            <BarChart3 size={12} /> Transparent Comparison
          </span>
          <h2 className="section-heading" style={{ fontSize: 'clamp(28px, 4vw, 44px)', marginBottom: 12 }}>
            SlimRx vs. Branded Ozempic®/Wegovy®
          </h2>
          <p style={{ color: 'var(--slate-500)', fontSize: 16 }}>Same clinical outcome. World of difference in cost.</p>
        </div>

        <div style={{ overflowX: 'auto', borderRadius: var_('--radius-lg'), border: '1px solid var(--slate-200)', boxShadow: var_('--shadow-md') }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--charcoal)' }}>
                <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,.6)', width: '30%' }}>Category</th>
                <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: 13, fontWeight: 700, color: 'var(--emerald-400)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Activity size={14} /> SlimRx Indian Generics
                  </span>
                </th>
                <th style={{ padding: '16px 20px', textAlign: 'left', fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,.6)' }}>Branded (Ozempic®/Wegovy®)</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.label} style={{ background: i % 2 === 0 ? 'var(--white)' : 'var(--slate-50)' }}>
                  <td style={{ padding: '15px 20px', fontSize: 14, fontWeight: 600, color: 'var(--slate-700)' }}>{row.label}</td>
                  <td style={{ padding: '15px 20px', fontSize: 14, color: 'var(--charcoal)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      {row.winner === 'slimrx' && <Check size={15} color="var(--emerald-500)" strokeWidth={3} />}
                      {row.slimrx}
                    </span>
                  </td>
                  <td style={{ padding: '15px 20px', fontSize: 14, color: 'var(--slate-500)' }}>{row.branded}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--slate-400)', marginTop: 16 }}>
          * Prices are indicative. Branded prices vary by city and pharmacy. SlimRx prices are subscription-based and locked for 6 months.
        </p>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section id="reviews" style={{ padding: '100px 24px', background: 'var(--slate-50)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="badge badge-gold" style={{ marginBottom: 16 }}>
            <Star size={12} style={{ fill: '#d97706', color: '#d97706' }} /> Verified Patient Reviews
          </span>
          <h2 className="section-heading" style={{ fontSize: 'clamp(28px, 4vw, 44px)', marginBottom: 12 }}>
            47,000+ Indians have transformed their health
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 8 }}>
            <StarRating filled={5} size={20} />
            <span style={{ fontSize: 22, fontWeight: 800, color: 'var(--charcoal)' }}>4.9</span>
            <span style={{ fontSize: 14, color: 'var(--slate-500)' }}>from 2,847 verified reviews</span>
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 24,
        }}>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="card" style={{ padding: '28px 24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                <StarRating filled={t.stars} size={14} />
                <span style={{
                  background: 'var(--emerald-50)', color: 'var(--emerald-700)',
                  fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 100,
                }}>{t.product}</span>
              </div>

              <p style={{ fontSize: 14, color: 'var(--slate-600)', lineHeight: 1.7, marginBottom: 20, fontStyle: 'italic' }}>
                "{t.text}"
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 12,
                  background: 'var(--emerald-100)', display: 'flex',
                  alignItems: 'center', justifyContent: 'center', fontSize: 22,
                }}>{t.avatar}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--charcoal)' }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: 'var(--slate-500)' }}>{t.city}</div>
                </div>
              </div>

              <div style={{
                display: 'flex', gap: 16,
                background: 'var(--emerald-50)', borderRadius: var_('--radius-md'),
                padding: '12px 16px',
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--emerald-700)' }}>{t.weight}</div>
                  <div style={{ fontSize: 11, color: 'var(--slate-500)' }}>lost</div>
                </div>
                <div style={{ width: 1, background: 'var(--emerald-200)' }} />
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--emerald-700)' }}>{t.duration}</div>
                  <div style={{ fontSize: 11, color: 'var(--slate-500)' }}>duration</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SafetySection() {
  const points = [
    {
      icon: ShieldCheck, title: 'CDSCO-Compliant Manufacturing',
      text: 'Every batch manufactured in WHO-GMP certified facilities and approved by India\'s Central Drugs Standard Control Organisation.',
    },
    {
      icon: Stethoscope, title: 'Licensed MBBS/MD Physicians',
      text: 'All prescriptions issued by MCI-registered doctors. No AI-only consultations. Real medical oversight at every step.',
    },
    {
      icon: AlertTriangle, title: 'Rigorous Contraindication Screening',
      text: 'Our intake quiz screens for 18 contraindications including thyroid cancer history, pancreatitis, and pregnancy before any prescription.',
    },
    {
      icon: Phone, title: '24/7 Clinical Nurse Helpline',
      text: 'A trained clinical nurse available around-the-clock via phone, WhatsApp, or in-app chat for side effect management and guidance.',
    },
    {
      icon: Truck, title: 'Temperature-Controlled Cold Chain',
      text: 'GLP-1 pens require refrigeration. Our dedicated cold-chain logistics maintains 2–8°C from warehouse to doorstep with real-time monitoring.',
    },
    {
      icon: FileText, title: 'Monthly Physician Check-ins',
      text: 'Your care doesn\'t end at delivery. Monthly dose reviews, metabolic monitoring, and prescription renewals are included in your plan.',
    },
  ];

  return (
    <section style={{ padding: '100px 24px', background: 'var(--emerald-950)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span className="badge badge-white" style={{ marginBottom: 16 }}>
            <Shield size={12} /> Safety First, Always
          </span>
          <h2 className="section-heading" style={{
            fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--white)', marginBottom: 12
          }}>
            Medical rigour you can trust
          </h2>
          <p style={{ color: 'rgba(255,255,255,.55)', fontSize: 16, maxWidth: 500, margin: '0 auto' }}>
            Affordable should never mean unsafe. We've built compliance and clinical protocols
            that exceed India's regulatory standards.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 24,
        }}>
          {points.map((p) => (
            <div key={p.title} style={{
              background: 'rgba(255,255,255,.04)',
              border: '1px solid rgba(255,255,255,.08)',
              borderRadius: var_('--radius-lg'),
              padding: '28px 24px',
              transition: 'all .25s ease',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(16,185,129,.08)';
                e.currentTarget.style.borderColor = 'rgba(16,185,129,.25)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,.04)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,.08)';
              }}
            >
              <div style={{
                width: 48, height: 48, borderRadius: 14,
                background: 'rgba(16,185,129,.15)', display: 'flex',
                alignItems: 'center', justifyContent: 'center', marginBottom: 18,
              }}>
                <p.icon size={22} color="var(--emerald-400)" />
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--white)', marginBottom: 10 }}>{p.title}</h3>
              <p style={{ fontSize: 13.5, color: 'rgba(255,255,255,.5)', lineHeight: 1.65 }}>{p.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  const [openIdx, setOpenIdx] = useState(null);
  const toggle = (i) => setOpenIdx(openIdx === i ? null : i);

  return (
    <section id="faqs" style={{ padding: '100px 24px', background: 'var(--white)' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="badge badge-emerald" style={{ marginBottom: 16 }}>
            <Info size={12} /> Common Questions
          </span>
          <h2 className="section-heading" style={{ fontSize: 'clamp(28px, 4vw, 44px)' }}>
            Frequently asked questions
          </h2>
        </div>

        <div>
          {FAQS.map((faq, i) => (
            <div key={i} className="faq-item">
              <button className="faq-btn" onClick={() => toggle(i)}>
                <span>{faq.q}</span>
                {openIdx === i
                  ? <ChevronUp size={18} color="var(--emerald-600)" />
                  : <ChevronDown size={18} color="var(--slate-400)" />}
              </button>
              <div
                className="faq-answer"
                style={{
                  maxHeight: openIdx === i ? 300 : 0,
                  opacity: openIdx === i ? 1 : 0,
                  paddingBottom: openIdx === i ? 20 : 0,
                }}
              >
                {faq.a}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaBannerSection({ onStartQuiz }) {
  return (
    <section style={{
      padding: '100px 24px',
      background: 'linear-gradient(135deg, var(--emerald-900) 0%, var(--emerald-800) 50%, var(--emerald-700) 100%)',
      textAlign: 'center', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(52,211,153,.15) 0%, transparent 70%)',
      }} />
      <div style={{ maxWidth: 680, margin: '0 auto', position: 'relative' }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🌿</div>
        <h2 className="section-heading" style={{ fontSize: 'clamp(28px, 4vw, 48px)', color: 'var(--white)', marginBottom: 16 }}>
          Your transformation starts with a 3-minute quiz
        </h2>
        <p style={{ fontSize: 17, color: 'rgba(255,255,255,.7)', marginBottom: 40, lineHeight: 1.7 }}>
          No upfront cost to check eligibility. Real doctor consultation included.
          India's most affordable GLP-1 prescription platform.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center', marginBottom: 28 }}>
          <button className="btn btn-shimmer btn-lg" onClick={onStartQuiz}>
            Start My Free Eligibility Quiz <ArrowRight size={18} />
          </button>
          <a href="tel:+918000123456" className="btn btn-ghost btn-lg">
            <Phone size={17} /> Call Us: 1800-123-SLIM
          </a>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 24 }}>
          {[
            { icon: Lock, text: 'Fully confidential' },
            { icon: Clock, text: 'Results in 3 minutes' },
            { icon: ShieldCheck, text: 'No credit card needed' },
          ].map(({ icon: Icon, text }) => (
            <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, color: 'rgba(255,255,255,.6)' }}>
              <Icon size={14} />
              {text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer style={{ background: 'var(--charcoal)', color: 'rgba(255,255,255,.5)', padding: '60px 24px 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 40, marginBottom: 48,
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 9,
                background: 'linear-gradient(135deg, var(--emerald-600), var(--emerald-800))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Activity size={16} color="white" />
              </div>
              <span className="display-font" style={{ color: 'white', fontWeight: 700, fontSize: 18 }}>
                SlimRx<span style={{ color: 'var(--emerald-400)' }}>.in</span>
              </span>
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.7, color: 'rgba(255,255,255,.4)', maxWidth: 240 }}>
              India's most trusted telehealth platform for affordable GLP-1 weight-loss medications.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
              {['MCI', 'CDSCO', 'ISO 27001'].map(badge => (
                <span key={badge} style={{
                  background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.1)',
                  borderRadius: 6, padding: '4px 10px', fontSize: 11, color: 'rgba(255,255,255,.5)',
                }}>{badge}</span>
              ))}
            </div>
          </div>

          {[
            { heading: 'Company', links: ['About Us', 'Our Doctors', 'Careers', 'Press', 'Blog'] },
            { heading: 'Legal & Compliance', links: ['Privacy Policy', 'Terms of Service', 'DPDPA Compliance', 'Prescription Policy', 'Refund Policy'] },
            { heading: 'Support', links: ['1800-123-SLIM (Free)', 'help@slimrx.in', 'WhatsApp Us', 'Track Order', 'Pharmacist Chat'] },
          ].map(col => (
            <div key={col.heading}>
              <h4 style={{ color: 'rgba(255,255,255,.8)', fontWeight: 700, fontSize: 14, marginBottom: 16, letterSpacing: '.03em' }}>
                {col.heading}
              </h4>
              <ul style={{ listStyle: 'none' }}>
                {col.links.map(link => (
                  <li key={link} style={{ marginBottom: 10 }}>
                    <a href="#" style={{
                      fontSize: 13, color: 'rgba(255,255,255,.4)', textDecoration: 'none', transition: 'color .2s',
                    }}
                      onMouseEnter={e => e.target.style.color = 'var(--emerald-400)'}
                      onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,.4)'}
                    >{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,.07)', paddingTop: 24 }}>
          <p style={{ fontSize: 11, lineHeight: 1.6, color: 'rgba(255,255,255,.25)', marginBottom: 12, maxWidth: 900 }}>
            <strong style={{ color: 'rgba(255,255,255,.4)' }}>Medical Disclaimer:</strong>{' '}
            SlimRx is a telehealth platform and not a substitute for professional medical advice.
            GLP-1 medications are prescription drugs and must be dispensed under physician supervision.
            Results vary. Side effects possible. All medications on this platform are CDSCO-approved generic formulations.
            Ozempic® and Wegovy® are registered trademarks of Novo Nordisk A/S. SlimRx is not affiliated with Novo Nordisk.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12 }}>
            <span style={{ fontSize: 12 }}>© 2025 SlimRx Health Technologies Pvt. Ltd. CIN: U85110MH2024PTC123456</span>
            <span style={{ fontSize: 12 }}>Registered with Telehealth Society of India · Pharmacy Lic. No. MH/2024/PH/00321</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════
   QUIZ / FUNNEL MODAL
═══════════════════════════════════════════ */

function QuizModal({ isOpen, onClose, preselectedMed }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedMed, setSelectedMed] = useState(preselectedMed || MEDICATIONS[0]);
  const [multiSelected, setMultiSelected] = useState({});
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', city: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (preselectedMed) setSelectedMed(preselectedMed);
  }, [preselectedMed]);

  useEffect(() => {
    if (isOpen) {
      setStep(0); setSubmitted(false); setLoading(false);
      setAnswers({}); setMultiSelected({}); setFormData({ name: '', phone: '', email: '', city: '' });
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const TOTAL_STEPS = 5;
  const progress = ((step) / TOTAL_STEPS) * 100;

  const handleRadio = (qId, value) => setAnswers(prev => ({ ...prev, [qId]: value }));
  const handleMulti = (qId, value) => {
    const current = multiSelected[qId] || [];
    if (value === 'None of the above') {
      setMultiSelected(prev => ({ ...prev, [qId]: ['None of the above'] }));
      return;
    }
    const next = current.includes('None of the above')
      ? [value]
      : current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
    setMultiSelected(prev => ({ ...prev, [qId]: next }));
  };
  const isMultiSelected = (qId, val) => (multiSelected[qId] || []).includes(val);

  const hasContraindication = () => {
    const contra = multiSelected['contraindications'] || [];
    return contra.some(c => c !== 'None of the above');
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 2000);
  };

  const StepIndicator = () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginBottom: 28 }}>
      {STEPS_QUIZ.map((s, i) => (
        <React.Fragment key={s.id}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <div className={`step-dot ${i < step ? 'done' : i === step ? 'active' : 'pending'}`}>
              {i < step ? <Check size={14} /> : i + 1}
            </div>
            <span style={{ fontSize: 10, color: i === step ? 'var(--emerald-700)' : 'var(--slate-400)', fontWeight: i === step ? 700 : 400, whiteSpace: 'nowrap' }}>
              {s.label}
            </span>
          </div>
          {i < STEPS_QUIZ.length - 1 && (
            <div className={`step-line ${i < step ? 'done' : ''}`} style={{ margin: '0 4px', marginBottom: 18 }} />
          )}
        </React.Fragment>
      ))}
    </div>
  );

  // ── Step 0: Eligibility ──
  const renderEligibility = () => (
    <div>
      <h3 className="display-font" style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>
        Let's check your eligibility
      </h3>
      <p style={{ fontSize: 14, color: 'var(--slate-500)', marginBottom: 28 }}>
        Takes 3 minutes · Completely confidential · No payment required
      </p>

      <div style={{ marginBottom: 20 }}>
        <label className="field-label">Your age group</label>
        <select
          className="select-field"
          value={answers.age || ''}
          onChange={e => handleRadio('age', e.target.value)}
        >
          <option value="" disabled>Select your age group</option>
          {['18–29 years', '30–39 years', '40–49 years', '50–59 years', '60+ years'].map(o => (
            <option key={o} value={o}>{o}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="field-label">Your approximate weight category</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { v: 'overweight', l: 'Overweight (BMI 25–29.9)', sub: 'Want to shed 8–15 kg' },
            { v: 'obese1', l: 'Obese Class I (BMI 30–34.9)', sub: 'Want to shed 15–25 kg' },
            { v: 'obese2', l: 'Obese Class II+ (BMI 35+)', sub: 'Want to shed 25 kg+' },
            { v: 'unsure', l: 'Not sure of my BMI', sub: 'Doctor will assess' },
          ].map(opt => (
            <div
              key={opt.v}
              className={`radio-choice ${answers.bmi_range === opt.v ? 'selected' : ''}`}
              onClick={() => handleRadio('bmi_range', opt.v)}
            >
              <div className="radio-dot" />
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--charcoal)' }}>{opt.l}</div>
                <div style={{ fontSize: 12, color: 'var(--slate-500)' }}>{opt.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ── Step 1: Health History ──
  const renderHealth = () => (
    <div>
      <h3 className="display-font" style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>
        Your health history
      </h3>
      <p style={{ fontSize: 14, color: 'var(--slate-500)', marginBottom: 28 }}>
        This helps our doctors personalise your treatment plan safely.
      </p>

      <div style={{ marginBottom: 24 }}>
        <label className="field-label">Do you have any of these conditions? (Select all that apply)</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {['Type 2 Diabetes', 'Pre-diabetes', 'High blood pressure', 'High cholesterol / Triglycerides', 'PCOS', 'Sleep apnea', 'Heart disease', 'None of the above'].map(opt => (
            <div
              key={opt}
              className={`radio-choice ${isMultiSelected('conditions', opt) ? 'selected' : ''}`}
              onClick={() => handleMulti('conditions', opt)}
              style={{ padding: '12px 16px' }}
            >
              <div style={{
                width: 18, height: 18, borderRadius: 4, flexShrink: 0, marginTop: 2,
                border: isMultiSelected('conditions', opt) ? '2px solid var(--emerald-500)' : '2px solid var(--slate-300)',
                background: isMultiSelected('conditions', opt) ? 'var(--emerald-500)' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all .2s',
              }}>
                {isMultiSelected('conditions', opt) && <Check size={11} color="white" strokeWidth={3} />}
              </div>
              <span style={{ fontSize: 14, color: 'var(--charcoal)' }}>{opt}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        background: '#fef3c7', border: '1px solid #fde68a',
        borderRadius: var_('--radius-md'), padding: '14px 16px',
        display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 20,
      }}>
        <AlertTriangle size={16} color="#d97706" style={{ flexShrink: 0, marginTop: 2 }} />
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#92400e', marginBottom: 4 }}>Important Safety Screening</div>
          <div style={{ fontSize: 12, color: '#78350f', lineHeight: 1.6 }}>
            Have you ever been diagnosed with thyroid cancer, pancreatitis, severe kidney disease, or are you pregnant?
          </div>
        </div>
      </div>

      <div>
        <label className="field-label">Safety check — select any that apply</label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {['Thyroid cancer or family history of MTC', 'Pancreatitis (inflammation of pancreas)', 'Severe kidney disease', 'Pregnancy or planning pregnancy', 'None of the above'].map(opt => (
            <div
              key={opt}
              className={`radio-choice ${isMultiSelected('contraindications', opt) ? 'selected' : ''}`}
              onClick={() => handleMulti('contraindications', opt)}
              style={{ padding: '12px 16px' }}
            >
              <div style={{
                width: 18, height: 18, borderRadius: 4, flexShrink: 0, marginTop: 2,
                border: isMultiSelected('contraindications', opt) ? '2px solid var(--emerald-500)' : '2px solid var(--slate-300)',
                background: isMultiSelected('contraindications', opt) ? 'var(--emerald-500)' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .2s',
              }}>
                {isMultiSelected('contraindications', opt) && <Check size={11} color="white" strokeWidth={3} />}
              </div>
              <span style={{ fontSize: 14, color: 'var(--charcoal)' }}>{opt}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // ── Step 2: Medication Selection ──
  const renderMedication = () => (
    <div>
      <h3 className="display-font" style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>
        Select your medication
      </h3>
      <p style={{ fontSize: 14, color: 'var(--slate-500)', marginBottom: 24 }}>
        Your doctor will confirm the best option after reviewing your profile.
      </p>

      {MEDICATIONS.map(med => (
        <div
          key={med.id}
          onClick={() => setSelectedMed(med)}
          style={{
            border: `1.5px solid ${selectedMed?.id === med.id ? 'var(--emerald-500)' : 'var(--slate-200)'}`,
            borderRadius: var_('--radius-md'),
            padding: '16px',
            marginBottom: 12,
            cursor: 'pointer',
            background: selectedMed?.id === med.id ? 'var(--emerald-50)' : 'var(--white)',
            transition: 'all .2s',
          }}
        >
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <div className="radio-dot" style={{
              border: selectedMed?.id === med.id ? '2px solid var(--emerald-500)' : '2px solid var(--slate-300)',
              background: selectedMed?.id === med.id ? 'var(--emerald-500)' : 'transparent',
            }}>
              {selectedMed?.id === med.id && <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'white' }} />}
            </div>
            <span style={{ fontSize: 24 }}>{med.typeIcon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 4 }}>
                <div>
                  <span style={{ fontWeight: 700, fontSize: 15, color: 'var(--charcoal)' }}>{med.brand}</span>
                  <span style={{ fontSize: 12, color: 'var(--slate-500)', marginLeft: 8 }}>{med.type}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                  <span style={{ fontWeight: 800, fontSize: 17, color: 'var(--emerald-700)' }}>₹{med.price.toLocaleString('en-IN')}</span>
                  <span style={{ fontSize: 11, color: 'var(--slate-400)', textDecoration: 'line-through' }}>₹{med.originalPrice.toLocaleString('en-IN')}</span>
                </div>
              </div>
              <div style={{ fontSize: 12, color: 'var(--slate-500)', marginTop: 4 }}>{med.maker} · {med.unit}</div>
            </div>
          </div>
          <div style={{ marginTop: 12, paddingLeft: 52 }}>
            <ProgressBar value={med.effectiveness} label="Efficacy" />
          </div>
        </div>
      ))}
    </div>
  );

  // ── Step 3: Consultation ──
  const renderConsultation = () => (
    <div>
      <h3 className="display-font" style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>
        Book your doctor consultation
      </h3>
      <p style={{ fontSize: 14, color: 'var(--slate-500)', marginBottom: 24 }}>
        A licensed physician will review your profile and connect with you within 2 hours.
      </p>

      <div style={{
        background: 'var(--emerald-50)', border: '1px solid var(--emerald-200)',
        borderRadius: var_('--radius-md'), padding: '16px', marginBottom: 24,
        display: 'flex', gap: 12, alignItems: 'center',
      }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12, flexShrink: 0,
          background: 'var(--emerald-100)', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Stethoscope size={20} color="var(--emerald-600)" />
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--emerald-800)', marginBottom: 2 }}>Free Doctor Consultation Included</div>
          <div style={{ fontSize: 12, color: 'var(--emerald-700)' }}>Valued at ₹800 — included in your first month subscription</div>
        </div>
      </div>

      {[
        { id: 'name', label: 'Full Name', type: 'text', placeholder: 'As per Aadhaar/PAN' },
        { id: 'phone', label: 'Mobile Number', type: 'tel', placeholder: '+91 98765 43210' },
        { id: 'email', label: 'Email Address', type: 'email', placeholder: 'you@example.com' },
        { id: 'city', label: 'City / Pin Code', type: 'text', placeholder: 'Mumbai / 400001' },
      ].map(field => (
        <div key={field.id} style={{ marginBottom: 16 }}>
          <label className="field-label">{field.label}</label>
          <input
            className="input-field"
            type={field.type}
            placeholder={field.placeholder}
            value={formData[field.id]}
            onChange={e => setFormData(prev => ({ ...prev, [field.id]: e.target.value }))}
          />
        </div>
      ))}

      <div style={{ marginBottom: 16 }}>
        <label className="field-label">Preferred consultation mode</label>
        <div style={{ display: 'flex', gap: 10 }}>
          {['Video Call', 'Phone Call', 'Chat / WhatsApp'].map(mode => (
            <div
              key={mode}
              className={`radio-choice ${answers.consult_mode === mode ? 'selected' : ''}`}
              onClick={() => handleRadio('consult_mode', mode)}
              style={{ flex: 1, justifyContent: 'center', padding: '12px 8px', textAlign: 'center' }}
            >
              <div className="radio-dot" />
              <span style={{ fontSize: 13, fontWeight: 500 }}>{mode}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ fontSize: 12, color: 'var(--slate-500)', lineHeight: 1.6 }}>
        <Lock size={11} style={{ display: 'inline', marginRight: 4 }} color="var(--slate-400)" />
        Your data is encrypted and protected under DPDPA 2023. We never share your information without consent.
      </div>
    </div>
  );

  // ── Step 4: Order Summary & Checkout ──
  const renderCheckout = () => (
    <div>
      <h3 className="display-font" style={{ fontSize: 22, fontWeight: 700, marginBottom: 6 }}>
        Review & Confirm Order
      </h3>
      <p style={{ fontSize: 14, color: 'var(--slate-500)', marginBottom: 24 }}>
        Your first shipment will be dispatched within 24 hours of prescription approval.
      </p>

      {/* Selected med summary */}
      {selectedMed && (
        <div style={{
          border: '1px solid var(--slate-200)', borderRadius: var_('--radius-md'),
          overflow: 'hidden', marginBottom: 20,
        }}>
          <div style={{
            background: 'var(--emerald-900)', padding: '16px',
            display: 'flex', gap: 14, alignItems: 'center',
          }}>
            <span style={{ fontSize: 32 }}>{selectedMed.typeIcon}</span>
            <div>
              <div style={{ color: 'var(--white)', fontWeight: 700, fontSize: 15 }}>{selectedMed.brand}</div>
              <div style={{ color: 'rgba(255,255,255,.5)', fontSize: 12 }}>{selectedMed.maker} · {selectedMed.type}</div>
            </div>
          </div>
          <div style={{ padding: '16px' }}>
            {[
              { label: 'Medication', value: selectedMed.name },
              { label: 'Monthly cost', value: `₹${selectedMed.price.toLocaleString('en-IN')}` },
              { label: 'Doctor consultation', value: 'Free (₹800 value)' },
              { label: 'Delivery', value: 'Free cold-chain' },
              { label: 'Nurse helpline', value: '24/7 Included' },
            ].map(({ label, value }) => (
              <div key={label} style={{
                display: 'flex', justifyContent: 'space-between',
                padding: '8px 0', borderBottom: '1px solid var(--slate-100)',
                fontSize: 14,
              }}>
                <span style={{ color: 'var(--slate-600)' }}>{label}</span>
                <span style={{ fontWeight: 600, color: 'var(--charcoal)' }}>{value}</span>
              </div>
            ))}
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              padding: '12px 0 0', fontSize: 16,
            }}>
              <span style={{ fontWeight: 700 }}>Total today</span>
              <span style={{ fontWeight: 800, color: 'var(--emerald-700)', fontSize: 20 }}>
                ₹{selectedMed.price.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* What happens next */}
      <div style={{
        background: 'var(--slate-50)', borderRadius: var_('--radius-md'), padding: '16px', marginBottom: 20,
      }}>
        <div style={{ fontWeight: 700, fontSize: 13, color: 'var(--slate-700)', marginBottom: 12 }}>WHAT HAPPENS NEXT</div>
        {[
          'Doctor reviews your profile & calls within 2 hours',
          'Digital prescription issued immediately',
          'Pharmacy dispatches cold-chain shipment',
          'Delivery to your door within 24 hours',
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8 }}>
            <div style={{
              width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
              background: 'var(--emerald-500)', color: 'white',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 700,
            }}>{i + 1}</div>
            <span style={{ fontSize: 13, color: 'var(--slate-600)' }}>{item}</span>
          </div>
        ))}
      </div>

      {/* Trust signals */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 20 }}>
        {[
          { icon: Lock, text: 'Secure payment' },
          { icon: ShieldCheck, text: 'CDSCO approved' },
          { icon: Clock, text: 'Cancel anytime' },
        ].map(({ icon: Icon, text }) => (
          <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--slate-500)' }}>
            <Icon size={13} color="var(--emerald-500)" />
            {text}
          </div>
        ))}
      </div>

      <p style={{ fontSize: 11, color: 'var(--slate-400)', lineHeight: 1.6 }}>
        By placing this order you agree to SlimRx's Terms of Service and Privacy Policy. This is a subscription that renews monthly. Cancel anytime from your account dashboard. A valid prescription from a licensed physician is required for dispensing; if the consulting physician determines the medication is not suitable, you will be fully refunded.
      </p>
    </div>
  );

  // ── Contraindication Warning ──
  const renderContraWarning = () => (
    <div style={{ textAlign: 'center', padding: '20px 0' }}>
      <div style={{
        width: 72, height: 72, borderRadius: '50%',
        background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 20px', fontSize: 32,
      }}>⚠️</div>
      <h3 className="display-font" style={{ fontSize: 22, marginBottom: 12, color: 'var(--charcoal)' }}>
        Medical Review Required
      </h3>
      <p style={{ fontSize: 14, color: 'var(--slate-500)', lineHeight: 1.7, marginBottom: 24 }}>
        Based on your health history, one of our physicians needs to personally review your profile
        before we can recommend a GLP-1 medication. This is standard medical practice and is
        completely free of charge.
      </p>
      <div style={{
        background: '#fef3c7', border: '1px solid #fde68a', borderRadius: var_('--radius-md'),
        padding: '16px', marginBottom: 24, textAlign: 'left',
      }}>
        <div style={{ fontWeight: 700, color: '#92400e', fontSize: 14, marginBottom: 8 }}>Our physician will:</div>
        {[
          'Review your complete medical history in detail',
          'Determine if GLP-1 therapy is appropriate for you',
          'Suggest the safest medication and dosing protocol',
          'Advise on alternative treatments if needed',
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 6, fontSize: 13, color: '#78350f' }}>
            <Check size={13} color="#d97706" />
            {item}
          </div>
        ))}
      </div>
      <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', marginBottom: 12 }}
        onClick={() => setStep(3)}>
        <Phone size={16} /> Book Free Medical Review <ArrowRight size={15} />
      </button>
      <button
        onClick={onClose}
        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, color: 'var(--slate-500)' }}>
        Cancel
      </button>
    </div>
  );

  // ── Success Screen ──
  const renderSuccess = () => (
    <div style={{ textAlign: 'center', padding: '20px 0' }}>
      <div style={{
        width: 80, height: 80, borderRadius: '50%',
        background: 'var(--emerald-100)', display: 'flex', alignItems: 'center', justifyContent: 'center',
        margin: '0 auto 20px', position: 'relative',
      }}>
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          border: '2px solid var(--emerald-400)',
          animation: 'pulse-ring 1.5s ease-out infinite',
        }} />
        <CheckCircle2 size={40} color="var(--emerald-500)" />
      </div>
      <h3 className="display-font" style={{ fontSize: 24, marginBottom: 8, color: 'var(--charcoal)' }}>
        Order Confirmed! 🎉
      </h3>
      <p style={{ fontSize: 15, color: 'var(--slate-500)', marginBottom: 28, lineHeight: 1.65 }}>
        Thank you, <strong>{formData.name || 'there'}</strong>! Your consultation is booked.
        A licensed physician will contact you at{' '}
        <strong>{formData.phone || 'your number'}</strong> within 2 hours.
      </p>

      <div style={{
        background: 'var(--emerald-50)', border: '1px solid var(--emerald-200)',
        borderRadius: var_('--radius-md'), padding: '20px', marginBottom: 24, textAlign: 'left',
      }}>
        <div style={{ fontWeight: 700, color: 'var(--emerald-800)', fontSize: 13, marginBottom: 12 }}>YOUR NEXT STEPS</div>
        {[
          { icon: '📱', text: 'Doctor calls you within 2 hours' },
          { icon: '📋', text: 'Digital prescription issued same day' },
          { icon: '📦', text: 'Medication dispatched & delivered in 24 hrs' },
          { icon: '📲', text: 'Check WhatsApp for tracking updates' },
        ].map((step, i) => (
          <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 10 }}>
            <span style={{ fontSize: 18 }}>{step.icon}</span>
            <span style={{ fontSize: 13, color: 'var(--emerald-800)' }}>{step.text}</span>
          </div>
        ))}
      </div>

      <div style={{ background: 'var(--slate-50)', borderRadius: var_('--radius-md'), padding: '16px', marginBottom: 24 }}>
        <div style={{ fontSize: 13, color: 'var(--slate-600)', marginBottom: 4 }}>Order ID</div>
        <div style={{ fontWeight: 800, fontSize: 16, color: 'var(--charcoal)', letterSpacing: '.05em' }}>
          SRX-{Date.now().toString(36).toUpperCase().slice(-8)}
        </div>
      </div>

      <button className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }} onClick={onClose}>
        Done — Back to Homepage
      </button>
    </div>
  );

  const canProceed = () => {
    if (step === 0) return answers.age && answers.bmi_range;
    if (step === 1) return (multiSelected['conditions']?.length > 0) && (multiSelected['contraindications']?.length > 0);
    if (step === 2) return !!selectedMed;
    if (step === 3) return formData.name && formData.phone && formData.email && answers.consult_mode;
    return true;
  };

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        {/* Modal header */}
        <div style={{
          padding: '20px 24px 0',
          borderBottom: '1px solid var(--slate-200)',
          paddingBottom: 20,
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 30, height: 30, borderRadius: 8,
                background: 'linear-gradient(135deg, var(--emerald-600), var(--emerald-800))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Activity size={15} color="white" />
              </div>
              <span className="display-font" style={{ fontWeight: 700, fontSize: 16, color: 'var(--emerald-900)' }}>
                SlimRx<span style={{ color: 'var(--emerald-500)' }}>.in</span>
              </span>
            </div>
            <button onClick={onClose} style={{
              background: 'var(--slate-100)', border: 'none', cursor: 'pointer',
              width: 32, height: 32, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <X size={16} color="var(--slate-600)" />
            </button>
          </div>

          {!submitted && (
            <>
              <div className="progress-track" style={{ marginBottom: 10 }}>
                <div className="progress-fill" style={{ width: `${progress}%` }} />
              </div>
              <div style={{ fontSize: 12, color: 'var(--slate-500)' }}>
                Step {step + 1} of {TOTAL_STEPS} · {Math.round(progress)}% complete
              </div>
            </>
          )}
        </div>

        {/* Modal body */}
        <div style={{ padding: '24px' }}>
          {!submitted && !loading && (
            <>
              {!submitted && step < STEPS_QUIZ.length && (
                <div style={{ marginBottom: 24 }}>
                  <StepIndicator />
                </div>
              )}

              {step === 0 && renderEligibility()}
              {step === 1 && (hasContraindication()
                ? renderContraWarning()
                : renderHealth()
              )}
              {step === 1 && !hasContraindication() && null}
              {step === 2 && renderMedication()}
              {step === 3 && renderConsultation()}
              {step === 4 && renderCheckout()}
            </>
          )}

          {loading && (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{
                width: 60, height: 60, borderRadius: '50%',
                border: '3px solid var(--emerald-100)',
                borderTopColor: 'var(--emerald-500)',
                animation: 'spin 1s linear infinite',
                margin: '0 auto 20px',
              }} />
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              <div style={{ fontWeight: 600, fontSize: 16, color: 'var(--charcoal)', marginBottom: 8 }}>
                Processing your order…
              </div>
              <div style={{ fontSize: 13, color: 'var(--slate-500)' }}>
                Setting up your consultation · Confirming medication · Preparing shipment
              </div>
            </div>
          )}

          {submitted && renderSuccess()}
        </div>

        {/* Modal footer / CTA */}
        {!submitted && !loading && !(step === 1 && hasContraindication()) && (
          <div style={{
            padding: '0 24px 24px',
            display: 'flex', gap: 12, justifyContent: 'space-between',
          }}>
            {step > 0 ? (
              <button
                className="btn btn-outline"
                onClick={() => setStep(s => s - 1)}
              >
                ← Back
              </button>
            ) : <div />}

            {step < TOTAL_STEPS - 1 ? (
              <button
                className="btn btn-primary"
                disabled={!canProceed()}
                onClick={() => setStep(s => s + 1)}
                style={{ opacity: canProceed() ? 1 : .45 }}
              >
                Continue <ArrowRight size={15} />
              </button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={handleSubmit}
                style={{ flex: 1, justifyContent: 'center', fontSize: 16 }}
              >
                <Lock size={15} /> Place Secure Order · ₹{selectedMed?.price?.toLocaleString('en-IN')}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   STICKY BOTTOM BAR (mobile)
═══════════════════════════════════════════ */

function StickyBottomBar({ onStartQuiz }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <div className="hide-desktop" style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 90,
      background: 'var(--white)', borderTop: '1px solid var(--slate-200)',
      padding: '12px 20px 16px',
      boxShadow: '0 -4px 20px rgba(0,0,0,.1)',
      transform: visible ? 'translateY(0)' : 'translateY(100%)',
      transition: 'transform .35s cubic-bezier(.4,0,.2,1)',
    }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--charcoal)' }}>From ₹1,299/month</div>
          <div style={{ fontSize: 11, color: 'var(--slate-500)' }}>Doctor consultation included</div>
        </div>
        <button className="btn btn-primary" onClick={onStartQuiz} style={{ whiteSpace: 'nowrap' }}>
          Start Free Quiz <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   STATS BANNER
═══════════════════════════════════════════ */

function StatsBanner() {
  const stats = [
    { num: '47,000+', label: 'Active Patients', icon: Users },
    { num: '₹1,299', label: 'Starting Price/Month', icon: TrendingDown },
    { num: '4.9/5', label: 'Average Rating', icon: Star },
    { num: '24 hrs', label: 'Avg. First Delivery', icon: Truck },
    { num: '94%', label: 'Patient Satisfaction', icon: Heart },
    { num: '72%', label: 'Average Savings vs Branded', icon: Award },
  ];

  return (
    <section style={{
      background: 'var(--white)', padding: '48px 24px',
      borderTop: '1px solid var(--slate-100)', borderBottom: '1px solid var(--slate-100)',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: 32, textAlign: 'center',
        }}>
          {stats.map(({ num, label, icon: Icon }) => (
            <div key={label}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 12,
                  background: 'var(--emerald-50)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={18} color="var(--emerald-600)" />
                </div>
              </div>
              <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--emerald-700)', lineHeight: 1, marginBottom: 4 }}>{num}</div>
              <div style={{ fontSize: 12, color: 'var(--slate-500)', fontWeight: 500 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   PHARMA LOGOS STRIP
═══════════════════════════════════════════ */

function PharmaLogosStrip() {
  const companies = [
    { name: 'Sun Pharmaceutical', abbr: 'SUN PHARMA', desc: 'NSE: SUNPHARMA' },
    { name: 'Cipla Ltd.', abbr: 'CIPLA', desc: 'NSE: CIPLA' },
    { name: 'Zydus Cadila', abbr: 'ZYDUS', desc: 'NSE: ZYDUSLIFE' },
    { name: 'Dr. Reddy\'s', abbr: "DR. REDDY'S", desc: 'NSE: DRREDDY' },
    { name: 'Lupin Limited', abbr: 'LUPIN', desc: 'NSE: LUPIN' },
  ];

  return (
    <section style={{ padding: '48px 24px', background: 'var(--slate-50)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <p style={{ textAlign: 'center', fontSize: 12, fontWeight: 600, color: 'var(--slate-400)', letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 28 }}>
          Medications manufactured by India's top listed pharma companies
        </p>
        <div style={{
          display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center', alignItems: 'center',
        }}>
          {companies.map(c => (
            <div key={c.abbr} style={{
              background: 'var(--white)', border: '1px solid var(--slate-200)',
              borderRadius: var_('--radius-md'), padding: '14px 24px',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
              minWidth: 120,
            }}>
              <div style={{ fontWeight: 800, fontSize: 13, color: 'var(--charcoal)', letterSpacing: '.04em' }}>{c.abbr}</div>
              <div style={{ fontSize: 10, color: 'var(--slate-400)' }}>{c.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   ROOT APP
═══════════════════════════════════════════ */

export default function App() {
  const [quizOpen, setQuizOpen] = useState(false);
  const [preselectedMed, setPreselectedMed] = useState(null);
  const [backendMessage, setBackendMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/")
      .then((res) => res.text())
      .then((data) => {
        console.log("Backend says:", data);
        setBackendMessage(data);
      })
      .catch((err) => console.error("Backend error:", err));
  }, []);
  const handleOpenQuiz = (med = null) => {
    setPreselectedMed(med);
    setQuizOpen(true);
  };

  return (
    <>
      {/* Inject global styles */}
      <style>{FONTS}</style>

     <Navbar onStartQuiz={() => handleOpenQuiz()} />
<TrustStrip />

<div
  style={{
    textAlign: "center",
    padding: "10px",
    background: "#e8f5e9",
    color: "#2e7d32",
    fontWeight: "bold"
  }}
>
  {backendMessage}
</div>

<HeroSection onStartQuiz={() => handleOpenQuiz()} />
      <StatsBanner />
      <HowItWorksSection />
      <MedicationsSection onSelectMed={(med) => handleOpenQuiz(med)} />
      <PharmaLogosStrip />
      <ComparisonSection />
      <TestimonialsSection />
      <SafetySection />

      {/* CTA section with id for quiz scroll target */}
      <div id="quiz-section">
        <CtaBannerSection onStartQuiz={() => handleOpenQuiz()} />
      </div>

      <FaqSection />
      <Footer />

      <StickyBottomBar onStartQuiz={() => handleOpenQuiz()} />

      <QuizModal
        isOpen={quizOpen}
        onClose={() => setQuizOpen(false)}
        preselectedMed={preselectedMed}
      />
    </>
  );
}
