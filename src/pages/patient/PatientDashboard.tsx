import { useState, useEffect, useRef } from "react";
import {
  Activity, Home, FileText, ShoppingBag, Phone, Settings,
  Bell, ChevronRight, TrendingDown, TrendingUp, Award,
  Calendar, Clock, Truck, CheckCircle2, AlertCircle,
  Pill, Stethoscope, Download, Plus, Target, Flame,
  BarChart2, ArrowUpRight, ArrowDownRight, Droplets,
  Moon, Wind, Heart, RefreshCw, ChevronDown,
  ChevronUp, Info, Star, MessageCircle, Camera,
  Shield, Lock, X, Check, Edit3, Zap, Gift
} from "lucide-react";

/* ═══════════════════════════════════════════
   GLOBAL STYLES
   Aesthetic: Warm clinical — creamy whites,
   forest greens, rich typography. Like a
   premium private healthcare app.
   Fonts: Fraunces (display) + Plus Jakarta Sans
═══════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;0,9..144,800;1,9..144,400;1,9..144,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}

:root{
  --forest:   #1a3a2a;
  --forest2:  #22452f;
  --forest3:  #2d5a3d;
  --sage:     #4a7c59;
  --mint:     #6db88a;
  --mint2:    #8ecba4;
  --lime:     #a8e6bf;
  --cream:    #faf7f2;
  --cream2:   #f3ede3;
  --cream3:   #e8dfd0;
  --warm:     #c9a96e;
  --warm2:    #e8c98a;
  --red:      #e05252;
  --red-s:    #fdf2f2;
  --amber:    #d48b3a;
  --amber-s:  #fdf6ec;
  --blue:     #4a7fb5;
  --blue-s:   #eef4fb;
  --ink:      #1c1917;
  --ink2:     #292524;
  --text:     #3d3530;
  --text2:    #6b5f57;
  --text3:    #9c8f86;
  --border:   #e5ddd4;
  --border2:  #f0e8de;
  --white:    #ffffff;
  --r:        10px;
  --r-lg:     16px;
  --r-xl:     24px;
  --r-2xl:    32px;
  --sh:       0 1px 3px rgba(0,0,0,.06),0 2px 8px rgba(0,0,0,.04);
  --sh-md:    0 4px 16px rgba(0,0,0,.08),0 1px 4px rgba(0,0,0,.04);
  --sh-lg:    0 12px 40px rgba(0,0,0,.1),0 4px 12px rgba(0,0,0,.06);
}

html,body,#root{height:100%;overflow:hidden;}
body{
  font-family:'Plus Jakarta Sans',sans-serif;
  background:var(--cream);
  color:var(--text);
  -webkit-font-smoothing:antialiased;
}
.fr{font-family:'Fraunces',Georgia,serif;}

/* Keyframes */
@keyframes fadeUp  {from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:translateY(0);}}
@keyframes fadeIn  {from{opacity:0;}to{opacity:1;}}
@keyframes slideR  {from{opacity:0;transform:translateX(-10px);}to{opacity:1;transform:translateX(0);}}
@keyframes spin    {to{transform:rotate(360deg);}}
@keyframes pulse   {0%,100%{opacity:1;}50%{opacity:.5;}}
@keyframes countUp {from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);}}
@keyframes shimmer {0%{background-position:-200% center;}100%{background-position:200% center;}}
@keyframes barGrow {from{height:0;}to{height:var(--h);}}
@keyframes ringFill{from{stroke-dashoffset:var(--full);}to{stroke-dashoffset:var(--off);}}

.fu{animation:fadeUp .45s cubic-bezier(.22,1,.36,1) both;}
.fi{animation:fadeIn .3s ease both;}
.sr{animation:slideR .4s cubic-bezier(.22,1,.36,1) both;}
.d1{animation-delay:.05s;opacity:0;}
.d2{animation-delay:.10s;opacity:0;}
.d3{animation-delay:.15s;opacity:0;}
.d4{animation-delay:.20s;opacity:0;}
.d5{animation-delay:.25s;opacity:0;}
.d6{animation-delay:.30s;opacity:0;}

/* Scrollbar */
::-webkit-scrollbar{width:5px;height:5px;}
::-webkit-scrollbar-track{background:transparent;}
::-webkit-scrollbar-thumb{background:var(--cream3);border-radius:3px;}

/* Card */
.card{
  background:var(--white);
  border:1px solid var(--border2);
  border-radius:var(--r-xl);
  box-shadow:var(--sh);
  transition:box-shadow .25s,transform .25s;
}
.card:hover{box-shadow:var(--sh-md);}
.card-active{border-color:var(--mint);box-shadow:0 0 0 2px rgba(109,184,138,.15),var(--sh-md);}

/* Nav item */
.nav-item{
  display:flex;align-items:center;gap:12px;
  padding:11px 16px;border-radius:var(--r-lg);
  cursor:pointer;transition:all .2s;
  font-size:14px;font-weight:500;color:var(--text2);
  border:none;background:none;width:100%;
  font-family:'Plus Jakarta Sans',sans-serif;
}
.nav-item:hover{background:var(--cream2);color:var(--text);}
.nav-item.active{
  background:linear-gradient(135deg,var(--forest),var(--forest2));
  color:var(--white);font-weight:600;
  box-shadow:0 4px 12px rgba(26,58,42,.25);
}
.nav-item.active svg{opacity:1;}
.nav-item svg{opacity:.6;}
.nav-item.active svg{opacity:1;}

/* Badge */
.badge{
  display:inline-flex;align-items:center;gap:4px;
  padding:3px 9px;border-radius:100px;
  font-size:11px;font-weight:700;letter-spacing:.02em;
}
.bg-mint  {background:rgba(109,184,138,.12);color:var(--forest3);}
.bg-amber {background:rgba(212,139,58,.12); color:#7c4f1a;}
.bg-red   {background:rgba(224,82,82,.1);   color:#9b2626;}
.bg-blue  {background:rgba(74,127,181,.1);  color:#1e4f82;}
.bg-warm  {background:rgba(201,169,110,.15);color:#6b4a1a;}
.bg-cream {background:var(--cream2);color:var(--text2);}

/* Stat box */
.stat-box{
  background:var(--white);border:1px solid var(--border2);
  border-radius:var(--r-lg);padding:18px 20px;
  box-shadow:var(--sh);
}

/* Btn */
.btn{
  display:inline-flex;align-items:center;justify-content:center;gap:7px;
  padding:11px 20px;border-radius:var(--r-lg);border:none;
  font-family:'Plus Jakarta Sans',sans-serif;
  font-size:13.5px;font-weight:600;cursor:pointer;
  transition:all .2s;line-height:1;
}
.btn-forest{
  background:linear-gradient(135deg,var(--forest),var(--forest2));
  color:var(--white);
  box-shadow:0 4px 12px rgba(26,58,42,.25);
}
.btn-forest:hover{transform:translateY(-1px);box-shadow:0 8px 20px rgba(26,58,42,.32);}
.btn-outline{
  background:transparent;border:1.5px solid var(--border);
  color:var(--text2);
}
.btn-outline:hover{border-color:var(--mint);color:var(--forest);background:rgba(109,184,138,.05);}
.btn-sm{padding:8px 14px;font-size:12px;}
.btn-xs{padding:6px 11px;font-size:11px;}

/* Input */
.inp{
  width:100%;padding:11px 14px;
  border:1.5px solid var(--border);
  border-radius:var(--r);
  font-family:'Plus Jakarta Sans',sans-serif;
  font-size:14px;color:var(--ink);background:var(--white);
  outline:none;transition:border-color .2s,box-shadow .2s;
}
.inp:focus{border-color:var(--mint);box-shadow:0 0 0 3px rgba(109,184,138,.12);}
.inp::placeholder{color:var(--text3);}

/* Tab bar */
.tab-btn{
  flex:1;padding:10px 6px;border:none;background:none;
  font-family:'Plus Jakarta Sans',sans-serif;
  font-size:13px;font-weight:500;
  color:var(--text3);cursor:pointer;transition:all .2s;
  border-bottom:2.5px solid transparent;
}
.tab-btn.active{color:var(--forest);font-weight:700;border-bottom-color:var(--mint);}
.tab-btn:hover:not(.active){color:var(--text);}

/* Progress ring */
.ring-track{fill:none;stroke:var(--border2);stroke-width:7;}
.ring-fill {fill:none;stroke-width:7;stroke-linecap:round;transition:stroke-dashoffset 1.2s cubic-bezier(.4,0,.2,1);}

/* Log entry row */
.log-row{
  display:flex;align-items:center;gap:12px;
  padding:12px 0;border-bottom:1px solid var(--border2);
}
.log-row:last-child{border-bottom:none;}

/* Timeline dot */
.tl-dot{
  width:12px;height:12px;border-radius:50%;flex-shrink:0;
}
.tl-line{width:2px;background:var(--border2);margin:0 auto;}

/* Modal */
.modal-bg{
  position:fixed;inset:0;z-index:200;
  background:rgba(28,25,23,.55);backdrop-filter:blur(4px);
  display:flex;align-items:center;justify-content:center;padding:20px;
  animation:fadeIn .25s ease;
}
.modal{
  background:var(--white);border-radius:var(--r-2xl);
  max-width:480px;width:100%;max-height:90vh;overflow-y:auto;
  box-shadow:0 32px 80px rgba(0,0,0,.2);
  animation:fadeUp .3s cubic-bezier(.22,1,.36,1);
}

/* Notification dot */
.notif-dot{
  width:8px;height:8px;border-radius:50%;
  background:var(--red);position:absolute;top:-2px;right:-2px;
  border:2px solid var(--white);
}
`;

/* ═══════════════════════════════════════════
   MOCK DATA
═══════════════════════════════════════════ */
const PATIENT = {
  name: "Priya Mehta",
  age: 34,
  city: "Mumbai",
  avatar: "👩‍💼",
  plan: "SemaSlim™ 7mg Oral",
  planIcon: "💊",
  maker: "Sun Pharmaceutical",
  startDate: "2025-02-01",
  nextRenewal: "2025-06-01",
  doctor: "Dr. Kavitha Rajan",
  doctorSpec: "MD Endocrinology",
  startWeight: 84.5,
  currentWeight: 72.3,
  goalWeight: 65.0,
  height: 162,
};

const WEIGHT_LOG = [
  { date: "Feb 1",  w: 84.5, note: "Started SemaSlim" },
  { date: "Feb 8",  w: 83.1, note: "" },
  { date: "Feb 15", w: 81.8, note: "Dose increase to 7mg" },
  { date: "Feb 22", w: 80.6, note: "" },
  { date: "Mar 1",  w: 79.2, note: "1 month check-in" },
  { date: "Mar 8",  w: 78.1, note: "" },
  { date: "Mar 15", w: 77.0, note: "" },
  { date: "Mar 22", w: 76.2, note: "2 month check-in" },
  { date: "Apr 1",  w: 75.4, note: "" },
  { date: "Apr 8",  w: 74.8, note: "" },
  { date: "Apr 15", w: 74.1, note: "3 month milestone!" },
  { date: "Apr 22", w: 73.5, note: "" },
  { date: "May 1",  w: 73.0, note: "4 month check-in" },
  { date: "May 10", w: 72.3, note: "Today" },
];

const VITALS_LOG = [
  { label: "Blood Pressure",  value: "118/76",  unit: "mmHg",  status: "good",   icon: Heart,     trend: -4 },
  { label: "Fasting Glucose", value: "95",       unit: "mg/dL", status: "good",   icon: Droplets,  trend: -18 },
  { label: "Total Steps",     value: "7,240",    unit: "/day",  status: "ok",     icon: Wind,      trend: +12 },
  { label: "Sleep Quality",   value: "6.8",      unit: "hrs",   status: "ok",     icon: Moon,      trend: +0.5 },
];

const PRESCRIPTIONS = [
  {
    id: "RX-2025-0312",
    med: "Semaglutide 7mg (Oral)",
    brand: "SemaSlim™",
    dose: "7mg once daily",
    issued: "May 1, 2025",
    valid: "Jul 31, 2025",
    doctor: "Dr. Kavitha Rajan",
    status: "active",
    refillsLeft: 2,
  },
  {
    id: "RX-2025-0201",
    med: "Semaglutide 3mg (Oral)",
    brand: "SemaSlim™",
    dose: "3mg once daily (starter)",
    issued: "Feb 1, 2025",
    valid: "Apr 30, 2025",
    doctor: "Dr. Kavitha Rajan",
    status: "expired",
    refillsLeft: 0,
  },
];

const ORDERS = [
  {
    id: "SRX-A1B2C3",
    date: "May 1, 2025",
    items: ["SemaSlim™ 7mg — 30 tablets"],
    status: "delivered",
    total: 1299,
    tracking: "DTDC-4472891923",
    deliveredOn: "May 2, 2025",
    invoice: true,
  },
  {
    id: "SRX-X9Y8Z7",
    date: "Apr 1, 2025",
    items: ["SemaSlim™ 7mg — 30 tablets"],
    status: "delivered",
    total: 1299,
    tracking: "DTDC-4467832101",
    deliveredOn: "Apr 2, 2025",
    invoice: true,
  },
  {
    id: "SRX-M3N4P5",
    date: "Mar 1, 2025",
    items: ["SemaSlim™ 3mg — 28 tablets"],
    status: "delivered",
    total: 999,
    tracking: "DTDC-4451223904",
    deliveredOn: "Mar 3, 2025",
    invoice: true,
  },
  {
    id: "SRX-Q6R7S8",
    date: "Feb 1, 2025",
    items: ["SemaSlim™ 3mg — 28 tablets (Starter)"],
    status: "delivered",
    total: 999,
    tracking: "DTDC-4438901234",
    deliveredOn: "Feb 2, 2025",
    invoice: true,
  },
];

const APPOINTMENTS = [
  {
    id: 1,
    type: "Monthly Check-in",
    doctor: "Dr. Kavitha Rajan",
    date: "June 2, 2025",
    time: "11:00 AM",
    mode: "Video Call",
    status: "upcoming",
  },
  {
    id: 2,
    type: "Dose Review",
    doctor: "Dr. Kavitha Rajan",
    date: "May 1, 2025",
    time: "10:30 AM",
    mode: "Video Call",
    status: "completed",
    summary: "Dose maintained at 7mg. Weight progress excellent. Continue current regimen.",
  },
  {
    id: 3,
    type: "Initial Consultation",
    doctor: "Dr. Kavitha Rajan",
    date: "Feb 1, 2025",
    time: "9:00 AM",
    mode: "Video Call",
    status: "completed",
    summary: "Prescribed SemaSlim 3mg starter dose. Baseline metrics recorded.",
  },
];

const ACHIEVEMENTS = [
  { icon: "🏆", label: "First 5kg Lost",     date: "Mar 3",  earned: true  },
  { icon: "🔥", label: "30-Day Streak",       date: "Mar 1",  earned: true  },
  { icon: "⚡", label: "10kg Milestone",      date: "Apr 20", earned: true  },
  { icon: "💪", label: "3-Month Champion",    date: "May 1",  earned: true  },
  { icon: "🎯", label: "Halfway to Goal",     date: "May 10", earned: true  },
  { icon: "🌟", label: "15kg Lost",           date: "—",      earned: false },
  { icon: "👑", label: "Goal Weight Reached", date: "—",      earned: false },
];

const NOTIFICATIONS = [
  { id: 1, type: "refill",  text: "Your next shipment ships in 8 days.",          time: "2h ago",  read: false },
  { id: 2, type: "appt",   text: "Reminder: Check-in with Dr. Rajan on June 2.",  time: "1d ago",  read: false },
  { id: 3, type: "tip",    text: "Tip: Stay hydrated — aim for 8 glasses today.", time: "2d ago",  read: true  },
  { id: 4, type: "good",   text: "You've lost 12.2 kg! Great progress 🎉",        time: "5d ago",  read: true  },
];

/* ═══════════════════════════════════════════
   HELPER COMPONENTS
═══════════════════════════════════════════ */

function SectionHead({ title, action, actionLabel }) {
  return (
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
      <h2 className="fr" style={{ fontSize:22, fontWeight:700, color:"var(--ink)", letterSpacing:"-.02em" }}>
        {title}
      </h2>
      {action && (
        <button className="btn btn-outline btn-sm" onClick={action}>
          {actionLabel} <ChevronRight size={13} />
        </button>
      )}
    </div>
  );
}

function StatCard({ icon: Icon, label, value, sub, color, trend, delay }) {
  return (
    <div className={`stat-box fu ${delay}`} style={{ position:"relative", overflow:"hidden" }}>
      <div style={{
        position:"absolute", top:-16, right:-16, width:64, height:64, borderRadius:"50%",
        background:`${color}18`, pointerEvents:"none",
      }} />
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
        <div style={{
          width:38, height:38, borderRadius:12,
          background:`${color}14`, display:"flex", alignItems:"center", justifyContent:"center",
        }}>
          <Icon size={18} color={color} />
        </div>
        {trend !== undefined && (
          <div style={{ display:"flex", alignItems:"center", gap:3, fontSize:12, fontWeight:700,
            color: trend < 0 ? "var(--mint)" : "var(--red)" }}>
            {trend < 0
              ? <ArrowDownRight size={13} />
              : <ArrowUpRight size={13} />}
            {Math.abs(trend)}{typeof trend === "number" && Math.abs(trend) < 50 ? "%" : ""}
          </div>
        )}
      </div>
      <div style={{ fontSize:26, fontWeight:800, color:"var(--ink)", lineHeight:1, marginBottom:4 }}>
        {value}
      </div>
      <div style={{ fontSize:13, color:"var(--text2)", fontWeight:500 }}>{label}</div>
      {sub && <div style={{ fontSize:11, color:"var(--text3)", marginTop:3 }}>{sub}</div>}
    </div>
  );
}

/* ── Mini sparkline (SVG) ── */
function Sparkline({ data, color = "var(--mint)", height = 48, width = 200 }) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((v - min) / range) * (height - 8) - 4;
    return `${x},${y}`;
  });
  const path = `M${pts.join(" L")}`;
  const fill = `M${pts[0]} L${pts.join(" L")} L${width},${height} L0,${height} Z`;

  return (
    <svg width={width} height={height} style={{ display:"block" }}>
      <defs>
        <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity=".25" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={fill} fill="url(#sg)" />
      <path d={path} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Last dot */}
      <circle
        cx={pts[pts.length - 1].split(",")[0]}
        cy={pts[pts.length - 1].split(",")[1]}
        r="4" fill={color} stroke="white" strokeWidth="2"
      />
    </svg>
  );
}

/* ── Bar chart (vertical) ── */
function BarChart({ data, color = "var(--mint)", height = 80 }) {
  const max = Math.max(...data.map(d => d.v));
  return (
    <div style={{ display:"flex", alignItems:"flex-end", gap:6, height }}>
      {data.map((d, i) => {
        const pct = (d.v / max) * 100;
        const isLast = i === data.length - 1;
        return (
          <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
            <div style={{
              width:"100%", borderRadius:"4px 4px 0 0",
              background: isLast ? color : `${color}50`,
              height:`${pct}%`,
              transition:`height .8s cubic-bezier(.4,0,.2,1) ${i * 0.05}s`,
              minHeight:4,
            }} />
            <span style={{ fontSize:9, color:"var(--text3)", whiteSpace:"nowrap" }}>{d.l}</span>
          </div>
        );
      })}
    </div>
  );
}

/* ── Progress ring ── */
function ProgressRing({ pct, size = 72, stroke = 7, color = "var(--mint)", label, sub }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (pct / 100) * circ;
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
      <svg width={size} height={size}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--border2)" strokeWidth={stroke} />
        <circle
          cx={size/2} cy={size/2} r={r} fill="none"
          stroke={color} strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size/2} ${size/2})`}
          style={{ transition:"stroke-dashoffset 1.2s cubic-bezier(.4,0,.2,1)" }}
        />
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle"
          style={{ fontSize:14, fontWeight:800, fill:"var(--ink)", fontFamily:"Plus Jakarta Sans" }}>
          {pct}%
        </text>
      </svg>
      {label && <div style={{ fontSize:12, fontWeight:600, color:"var(--text2)", textAlign:"center" }}>{label}</div>}
      {sub && <div style={{ fontSize:10, color:"var(--text3)", textAlign:"center" }}>{sub}</div>}
    </div>
  );
}

/* ═══════════════════════════════════════════
   PAGE: OVERVIEW
═══════════════════════════════════════════ */
function PageOverview({ onLogWeight, onLogModal }) {
  const lost = (PATIENT.startWeight - PATIENT.currentWeight).toFixed(1);
  const toGo = (PATIENT.currentWeight - PATIENT.goalWeight).toFixed(1);
  const totalGoal = PATIENT.startWeight - PATIENT.goalWeight;
  const progressPct = Math.round((parseFloat(lost) / totalGoal) * 100);
  const bmi = (PATIENT.currentWeight / ((PATIENT.height / 100) ** 2)).toFixed(1);
  const weeklyRate = (parseFloat(lost) / 15).toFixed(2); // 15 weeks approx

  const weights = WEIGHT_LOG.map(w => w.w);
  const weeklyLoss = [0.8, 1.2, 0.9, 1.1, 0.8, 0.7, 0.9]; // kg/week mock

  return (
    <div style={{ padding:"28px 28px 40px", overflowY:"auto", height:"100%" }}>
      {/* Welcome banner */}
      <div className="fu" style={{
        background:"linear-gradient(135deg,var(--forest),var(--forest3))",
        borderRadius:"var(--r-2xl)", padding:"28px 32px",
        marginBottom:28, position:"relative", overflow:"hidden",
      }}>
        <div style={{
          position:"absolute", top:-40, right:-40, width:180, height:180, borderRadius:"50%",
          background:"rgba(255,255,255,.04)", pointerEvents:"none",
        }} />
        <div style={{
          position:"absolute", bottom:-30, right:80, width:100, height:100, borderRadius:"50%",
          background:"rgba(168,230,191,.06)", pointerEvents:"none",
        }} />
        <div style={{ position:"relative" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:16 }}>
            <div>
              <div style={{ fontSize:13, color:"rgba(255,255,255,.5)", marginBottom:6, fontWeight:500 }}>
                Good morning 🌿
              </div>
              <h1 className="fr" style={{ fontSize:28, color:"var(--white)", fontWeight:700, marginBottom:8, letterSpacing:"-.02em" }}>
                {PATIENT.name}
              </h1>
              <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
                <span className="badge bg-cream" style={{ background:"rgba(255,255,255,.12)", color:"rgba(255,255,255,.7)", fontSize:11 }}>
                  {PATIENT.planIcon} {PATIENT.plan}
                </span>
                <span className="badge bg-cream" style={{ background:"rgba(255,255,255,.12)", color:"rgba(255,255,255,.7)", fontSize:11 }}>
                  <Stethoscope size={10} /> {PATIENT.doctor}
                </span>
              </div>
            </div>
            <div style={{ textAlign:"right" }}>
              <div style={{ fontSize:13, color:"rgba(255,255,255,.45)", marginBottom:4 }}>Total lost</div>
              <div className="fr" style={{ fontSize:48, fontWeight:800, color:"var(--lime)", lineHeight:1 }}>
                {lost}<span style={{ fontSize:22 }}> kg</span>
              </div>
              <div style={{ fontSize:12, color:"rgba(255,255,255,.45)", marginTop:2 }}>
                {toGo} kg to goal
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{ marginTop:24 }}>
            <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
              <span style={{ fontSize:12, color:"rgba(255,255,255,.5)" }}>Journey progress</span>
              <span style={{ fontSize:12, fontWeight:700, color:"var(--lime)" }}>{progressPct}%</span>
            </div>
            <div style={{ height:8, background:"rgba(255,255,255,.1)", borderRadius:100, overflow:"hidden" }}>
              <div style={{
                height:"100%", borderRadius:100,
                background:"linear-gradient(90deg,var(--lime),var(--mint2))",
                width:`${progressPct}%`,
                transition:"width 1.4s cubic-bezier(.4,0,.2,1)",
              }} />
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", marginTop:6 }}>
              <span style={{ fontSize:10, color:"rgba(255,255,255,.3)" }}>Start: {PATIENT.startWeight} kg</span>
              <span style={{ fontSize:10, color:"rgba(255,255,255,.3)" }}>Goal: {PATIENT.goalWeight} kg</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:16, marginBottom:28 }}>
        <StatCard icon={TrendingDown} label="Current Weight"   value={`${PATIENT.currentWeight} kg`} sub={`BMI ${bmi}`}           color="var(--mint)"  trend={-14.5} delay="d1" />
        <StatCard icon={Flame}        label="Weekly Loss Rate" value={`${weeklyRate} kg`}              sub="per week avg"            color="var(--amber)" trend={null}  delay="d2" />
        <StatCard icon={Target}       label="Goal Progress"    value={`${progressPct}%`}               sub={`${toGo} kg remaining`}  color="var(--blue)"  trend={null}  delay="d3" />
        <StatCard icon={Award}        label="Active Days"      value="104"                             sub="since Feb 1"             color="var(--warm)"  trend={null}  delay="d4" />
      </div>

      {/* Weight chart + log */}
      <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:20, marginBottom:28 }}>
        {/* Chart card */}
        <div className="card fu d3" style={{ padding:"24px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
            <div>
              <h3 className="fr" style={{ fontSize:17, fontWeight:700, color:"var(--ink)" }}>Weight Journey</h3>
              <p style={{ fontSize:12, color:"var(--text3)", marginTop:2 }}>Feb – May 2025</p>
            </div>
            <button className="btn btn-forest btn-xs" onClick={onLogWeight}>
              <Plus size={12} /> Log Weight
            </button>
          </div>

          {/* SVG area chart */}
          <div style={{ overflowX:"auto" }}>
            <Sparkline data={weights} color="var(--mint)" height={80} width={Math.max(300, weights.length * 28)} />
          </div>

          <div style={{ display:"flex", gap:24, marginTop:16, paddingTop:16, borderTop:"1px solid var(--border2)" }}>
            {[
              { l:"Start",   v:`${PATIENT.startWeight} kg`,   c:"var(--text3)" },
              { l:"Current", v:`${PATIENT.currentWeight} kg`, c:"var(--forest)" },
              { l:"Goal",    v:`${PATIENT.goalWeight} kg`,    c:"var(--mint)" },
            ].map(s => (
              <div key={s.l}>
                <div style={{ fontSize:11, color:"var(--text3)", marginBottom:2 }}>{s.l}</div>
                <div style={{ fontSize:16, fontWeight:800, color:s.c }}>{s.v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress rings */}
        <div className="card fu d4" style={{ padding:"24px", display:"flex", flexDirection:"column", gap:20 }}>
          <h3 className="fr" style={{ fontSize:17, fontWeight:700, color:"var(--ink)" }}>Progress Rings</h3>
          <div style={{ display:"flex", justifyContent:"space-around", flexWrap:"wrap", gap:16 }}>
            <ProgressRing pct={progressPct} color="var(--mint)"  label="Journey" sub="complete" />
            <ProgressRing pct={Math.round((7240 / 10000) * 100)} color="var(--amber)" size={64} stroke={6} label="Steps" sub="10k goal" />
            <ProgressRing pct={68}  color="var(--blue)"  size={64} stroke={6} label="Hydration" sub="8 glass goal" />
          </div>
        </div>
      </div>

      {/* Vitals + weekly bars */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginBottom:28 }}>
        {/* Vitals */}
        <div className="card fu d5" style={{ padding:"24px" }}>
          <SectionHead title="Latest Vitals" />
          {VITALS_LOG.map(v => (
            <div key={v.label} className="log-row">
              <div style={{
                width:36, height:36, borderRadius:10, flexShrink:0,
                background: v.status === "good" ? "rgba(109,184,138,.1)" : "rgba(212,139,58,.1)",
                display:"flex", alignItems:"center", justifyContent:"center",
              }}>
                <v.icon size={16} color={v.status === "good" ? "var(--sage)" : "var(--amber)"} />
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, fontWeight:600, color:"var(--ink)" }}>{v.label}</div>
                <div style={{ fontSize:12, color:"var(--text3)" }}>{v.unit}</div>
              </div>
              <div style={{ textAlign:"right" }}>
                <div style={{ fontSize:15, fontWeight:800, color:"var(--ink)" }}>{v.value}</div>
                <div style={{ fontSize:11, color: v.trend < 0 ? "var(--mint)" : "var(--amber)",
                  display:"flex", alignItems:"center", justifyContent:"flex-end", gap:2 }}>
                  {v.trend < 0 ? <ArrowDownRight size={11} /> : <ArrowUpRight size={11} />}
                  {Math.abs(v.trend)}{v.trend < 0 ? " lower" : " higher"}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Weekly loss */}
        <div className="card fu d6" style={{ padding:"24px" }}>
          <SectionHead title="Weekly Loss (kg)" />
          <BarChart
            data={weeklyLoss.map((v, i) => ({
              v, l: `W${i + 1}`
            }))}
            color="var(--mint)"
            height={100}
          />
          <div style={{
            marginTop:16, paddingTop:14, borderTop:"1px solid var(--border2)",
            display:"flex", justifyContent:"space-between",
          }}>
            <div>
              <div style={{ fontSize:11, color:"var(--text3)" }}>Best week</div>
              <div style={{ fontSize:15, fontWeight:800, color:"var(--forest)" }}>1.2 kg</div>
            </div>
            <div>
              <div style={{ fontSize:11, color:"var(--text3)" }}>Avg / week</div>
              <div style={{ fontSize:15, fontWeight:800, color:"var(--forest)" }}>{weeklyRate} kg</div>
            </div>
            <div>
              <div style={{ fontSize:11, color:"var(--text3)" }}>Trend</div>
              <div style={{ fontSize:15, fontWeight:800, color:"var(--mint)" }}>↓ Steady</div>
            </div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="card fu" style={{ padding:"24px", marginBottom:28 }}>
        <SectionHead title="Achievements" />
        <div style={{ display:"flex", gap:16, flexWrap:"wrap" }}>
          {ACHIEVEMENTS.map((a, i) => (
            <div key={i} style={{
              display:"flex", flexDirection:"column", alignItems:"center", gap:6,
              opacity: a.earned ? 1 : .3,
              filter: a.earned ? "none" : "grayscale(1)",
            }}>
              <div style={{
                width:52, height:52, borderRadius:16, fontSize:26,
                display:"flex", alignItems:"center", justifyContent:"center",
                background: a.earned ? "rgba(109,184,138,.1)" : "var(--cream2)",
                border:`2px solid ${a.earned ? "rgba(109,184,138,.3)" : "var(--border2)"}`,
              }}>{a.icon}</div>
              <div style={{ fontSize:11, fontWeight:600, color:"var(--text2)", textAlign:"center", maxWidth:60 }}>{a.label}</div>
              {a.earned && <div style={{ fontSize:9, color:"var(--text3)" }}>{a.date}</div>}
            </div>
          ))}
        </div>
      </div>

      {/* Next appointment */}
      <div className="card card-active fu" style={{ padding:"20px 24px" }}>
        <div style={{ display:"flex", gap:16, alignItems:"center", flexWrap:"wrap" }}>
          <div style={{
            width:48, height:48, borderRadius:14, flexShrink:0,
            background:"rgba(109,184,138,.1)", display:"flex", alignItems:"center", justifyContent:"center",
          }}>
            <Calendar size={22} color="var(--sage)" />
          </div>
          <div style={{ flex:1 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap", marginBottom:4 }}>
              <span style={{ fontWeight:700, fontSize:15, color:"var(--ink)" }}>
                Next: Monthly Check-in
              </span>
              <span className="badge bg-mint">Upcoming</span>
            </div>
            <div style={{ fontSize:13, color:"var(--text2)" }}>
              {APPOINTMENTS[0].date} · {APPOINTMENTS[0].time} · {APPOINTMENTS[0].mode} with {APPOINTMENTS[0].doctor}
            </div>
          </div>
          <button className="btn btn-forest btn-sm">
            Join Call <ChevronRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   PAGE: PRESCRIPTIONS
═══════════════════════════════════════════ */
function PagePrescriptions() {
  return (
    <div style={{ padding:"28px", overflowY:"auto", height:"100%" }}>
      <SectionHead title="Prescriptions" />

      {PRESCRIPTIONS.map((rx, i) => (
        <div key={rx.id} className={`card fu d${i + 1}`} style={{ padding:"24px", marginBottom:16 }}>
          <div style={{ display:"flex", gap:16, alignItems:"flex-start", flexWrap:"wrap" }}>
            <div style={{
              width:52, height:52, borderRadius:16, flexShrink:0, fontSize:26,
              display:"flex", alignItems:"center", justifyContent:"center",
              background:"rgba(109,184,138,.1)", border:"1px solid rgba(109,184,138,.2)",
            }}>💊</div>

            <div style={{ flex:1 }}>
              <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:8, marginBottom:8 }}>
                <div>
                  <h3 style={{ fontWeight:700, fontSize:16, color:"var(--ink)", marginBottom:3 }}>{rx.med}</h3>
                  <div style={{ fontSize:13, color:"var(--text2)" }}>{rx.dose}</div>
                </div>
                <span className={`badge ${rx.status === "active" ? "bg-mint" : "bg-cream"}`}>
                  {rx.status === "active" ? "● Active" : "Expired"}
                </span>
              </div>

              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(130px,1fr))", gap:12, marginBottom:16 }}>
                {[
                  { l:"Prescription ID", v:rx.id },
                  { l:"Issued by",       v:rx.doctor },
                  { l:"Date Issued",     v:rx.issued },
                  { l:"Valid Until",     v:rx.valid },
                  { l:"Refills Left",    v:`${rx.refillsLeft} of 3` },
                ].map(f => (
                  <div key={f.l}>
                    <div style={{ fontSize:11, color:"var(--text3)", marginBottom:2, fontWeight:500 }}>{f.l}</div>
                    <div style={{ fontSize:13, fontWeight:600, color:"var(--ink)" }}>{f.v}</div>
                  </div>
                ))}
              </div>

              <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
                <button className="btn btn-outline btn-sm">
                  <Download size={13} /> Download PDF
                </button>
                {rx.status === "active" && rx.refillsLeft > 0 && (
                  <button className="btn btn-forest btn-sm">
                    <RefreshCw size={13} /> Request Refill
                  </button>
                )}
                {rx.status === "expired" && (
                  <button className="btn btn-outline btn-sm" style={{ borderColor:"var(--amber)", color:"var(--amber)" }}>
                    <Stethoscope size={13} /> Request Renewal
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Info card */}
      <div style={{
        background:"var(--cream2)", border:"1px solid var(--border)",
        borderRadius:"var(--r-lg)", padding:"16px 20px",
        display:"flex", gap:12, alignItems:"flex-start",
      }}>
        <Info size={16} color="var(--sage)" style={{ flexShrink:0, marginTop:2 }} />
        <div>
          <div style={{ fontWeight:700, fontSize:13, color:"var(--text)", marginBottom:4 }}>
            About your prescriptions
          </div>
          <div style={{ fontSize:12.5, color:"var(--text2)", lineHeight:1.65 }}>
            Your digital prescriptions are valid pan-India and are stored securely on SlimRx servers.
            Refill requests are reviewed by your physician within 24 hours. If your prescription expires,
            a renewal consultation will be automatically scheduled.
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   PAGE: ORDERS
═══════════════════════════════════════════ */
function PageOrders() {
  const [expanded, setExpanded] = useState(null);
  const statusBadge = { delivered: "bg-mint", processing: "bg-blue", shipped: "bg-amber" };
  const statusLabel = { delivered: "✓ Delivered", processing: "Processing", shipped: "In Transit" };

  return (
    <div style={{ padding:"28px", overflowY:"auto", height:"100%" }}>
      <SectionHead title="Order History" />

      {/* Next order banner */}
      <div className="card card-active fu d1" style={{ padding:"20px 24px", marginBottom:24, background:"rgba(109,184,138,.04)" }}>
        <div style={{ display:"flex", gap:14, alignItems:"center", flexWrap:"wrap" }}>
          <div style={{
            width:44, height:44, borderRadius:14, flexShrink:0,
            background:"rgba(109,184,138,.12)", display:"flex", alignItems:"center", justifyContent:"center",
          }}>
            <Truck size={20} color="var(--sage)" />
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontWeight:700, fontSize:15, color:"var(--ink)", marginBottom:2 }}>
              Next shipment in <span style={{ color:"var(--forest)" }}>8 days</span>
            </div>
            <div style={{ fontSize:13, color:"var(--text2)" }}>
              SemaSlim™ 7mg — 30 tablets · Auto-renews Jun 1
            </div>
          </div>
          <div style={{ display:"flex", gap:8 }}>
            <button className="btn btn-outline btn-sm">Skip Month</button>
            <button className="btn btn-forest btn-sm">Early Refill</button>
          </div>
        </div>
      </div>

      {/* Order list */}
      {ORDERS.map((order, i) => (
        <div key={order.id} className={`card fu d${Math.min(i + 2, 6)}`}
          style={{ marginBottom:14, overflow:"hidden" }}>
          {/* Order header */}
          <div
            onClick={() => setExpanded(expanded === order.id ? null : order.id)}
            style={{
              padding:"18px 20px",
              display:"flex", gap:14, alignItems:"center",
              cursor:"pointer",
            }}
          >
            <div style={{
              width:40, height:40, borderRadius:12, flexShrink:0,
              background:"rgba(109,184,138,.08)", display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:20,
            }}>📦</div>
            <div style={{ flex:1 }}>
              <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:6, marginBottom:4 }}>
                <span style={{ fontWeight:700, fontSize:14, color:"var(--ink)" }}>{order.id}</span>
                <span className={`badge ${statusBadge[order.status]}`}>{statusLabel[order.status]}</span>
              </div>
              <div style={{ fontSize:13, color:"var(--text2)" }}>
                {order.date} · ₹{order.total.toLocaleString("en-IN")}
              </div>
            </div>
            {expanded === order.id
              ? <ChevronUp size={16} color="var(--text3)" />
              : <ChevronDown size={16} color="var(--text3)" />}
          </div>

          {/* Expanded details */}
          {expanded === order.id && (
            <div className="fi" style={{
              borderTop:"1px solid var(--border2)", padding:"16px 20px",
              background:"var(--cream)",
            }}>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))", gap:14, marginBottom:16 }}>
                {[
                  { l:"Items",        v:order.items.join(", ") },
                  { l:"Tracking",     v:order.tracking },
                  { l:"Delivered on", v:order.deliveredOn },
                  { l:"Total Paid",   v:`₹${order.total.toLocaleString("en-IN")}` },
                ].map(f => (
                  <div key={f.l}>
                    <div style={{ fontSize:11, color:"var(--text3)", marginBottom:2 }}>{f.l}</div>
                    <div style={{ fontSize:13, fontWeight:600, color:"var(--ink)", wordBreak:"break-all" }}>{f.v}</div>
                  </div>
                ))}
              </div>
              <div style={{ display:"flex", gap:10 }}>
                {order.invoice && (
                  <button className="btn btn-outline btn-sm">
                    <Download size={12} /> Invoice
                  </button>
                )}
                <button className="btn btn-outline btn-sm">
                  <MessageCircle size={12} /> Support
                </button>
                <button className="btn btn-forest btn-sm">
                  <RefreshCw size={12} /> Reorder
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════
   PAGE: CONSULTATIONS
═══════════════════════════════════════════ */
function PageConsultations() {
  return (
    <div style={{ padding:"28px", overflowY:"auto", height:"100%" }}>
      <SectionHead title="Consultations" actionLabel="Book Appointment" action={() => {}} />

      {/* Doctor card */}
      <div className="card fu d1 card-active" style={{ padding:"24px", marginBottom:24 }}>
        <div style={{ display:"flex", gap:16, alignItems:"center", flexWrap:"wrap" }}>
          <div style={{
            width:64, height:64, borderRadius:20, flexShrink:0, fontSize:36,
            display:"flex", alignItems:"center", justifyContent:"center",
            background:"rgba(109,184,138,.1)", border:"1.5px solid rgba(109,184,138,.25)",
          }}>👩‍⚕️</div>
          <div style={{ flex:1 }}>
            <div style={{ fontWeight:800, fontSize:17, color:"var(--ink)", marginBottom:4 }}>
              {PATIENT.doctor}
            </div>
            <div style={{ fontSize:13, color:"var(--text2)", marginBottom:8 }}>{PATIENT.doctorSpec} · MCI Reg. 234521</div>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              <span className="badge bg-mint">Your Primary Doctor</span>
              <span className="badge bg-cream">
                <Star size={10} style={{ fill:"var(--warm)", color:"var(--warm)" }} /> 4.97 (214 reviews)
              </span>
            </div>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            <button className="btn btn-forest btn-sm"><Phone size={13} /> Call Now</button>
            <button className="btn btn-outline btn-sm"><MessageCircle size={13} /> Message</button>
          </div>
        </div>
      </div>

      {/* Appointments */}
      {APPOINTMENTS.map((appt, i) => (
        <div key={appt.id} className={`card fu d${i + 2}`} style={{ padding:"20px 24px", marginBottom:14 }}>
          <div style={{ display:"flex", gap:14, alignItems:"flex-start", flexWrap:"wrap" }}>
            <div style={{
              width:44, height:44, borderRadius:14, flexShrink:0,
              background: appt.status === "upcoming" ? "rgba(109,184,138,.12)" : "var(--cream2)",
              display:"flex", alignItems:"center", justifyContent:"center",
            }}>
              {appt.status === "upcoming"
                ? <Calendar size={20} color="var(--sage)" />
                : <CheckCircle2 size={20} color="var(--text3)" />}
            </div>
            <div style={{ flex:1 }}>
              <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:6, marginBottom:6 }}>
                <span style={{ fontWeight:700, fontSize:15, color:"var(--ink)" }}>{appt.type}</span>
                <span className={`badge ${appt.status === "upcoming" ? "bg-mint" : "bg-cream"}`}>
                  {appt.status === "upcoming" ? "Upcoming" : "Completed"}
                </span>
              </div>
              <div style={{ fontSize:13, color:"var(--text2)", marginBottom:appt.summary ? 10 : 0 }}>
                {appt.date} · {appt.time} · {appt.mode}
              </div>
              {appt.summary && (
                <div style={{
                  background:"var(--cream2)", borderRadius:"var(--r)", padding:"10px 14px",
                  fontSize:13, color:"var(--text2)", lineHeight:1.6,
                  borderLeft:"3px solid var(--mint)", marginTop:8,
                }}>
                  <span style={{ fontWeight:600, color:"var(--text)" }}>Doctor's notes: </span>
                  {appt.summary}
                </div>
              )}
              {appt.status === "upcoming" && (
                <div style={{ display:"flex", gap:10, marginTop:14 }}>
                  <button className="btn btn-forest btn-sm">Join Video Call</button>
                  <button className="btn btn-outline btn-sm">Reschedule</button>
                  <button className="btn btn-outline btn-sm" style={{ color:"var(--red)", borderColor:"var(--red)" }}>
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Support */}
      <div style={{
        background:"var(--cream2)", borderRadius:"var(--r-xl)", padding:"20px 24px",
        display:"flex", gap:16, alignItems:"center", flexWrap:"wrap",
        border:"1px solid var(--border)",
      }}>
        <div style={{ fontSize:32 }}>📞</div>
        <div style={{ flex:1 }}>
          <div style={{ fontWeight:700, fontSize:15, color:"var(--ink)", marginBottom:3 }}>24/7 Nurse Helpline</div>
          <div style={{ fontSize:13, color:"var(--text2)" }}>
            For side effects, dose questions, or urgent concerns
          </div>
        </div>
        <div>
          <div style={{ fontWeight:800, fontSize:18, color:"var(--forest)" }}>1800-123-SLIM</div>
          <div style={{ fontSize:11, color:"var(--text3)" }}>Toll free · Available always</div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   WEIGHT LOG MODAL
═══════════════════════════════════════════ */
function WeightLogModal({ onClose }) {
  const [weight, setWeight] = useState("");
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    if (!weight || isNaN(weight)) return;
    setSaved(true);
    setTimeout(onClose, 1200);
  };

  return (
    <div className="modal-bg" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ padding:"32px" }}>
        {!saved ? (
          <>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
              <h2 className="fr" style={{ fontSize:22, fontWeight:700, color:"var(--ink)" }}>
                Log Today's Weight
              </h2>
              <button onClick={onClose} style={{
                width:32, height:32, borderRadius:"50%", background:"var(--cream2)",
                border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
              }}>
                <X size={15} color="var(--text2)" />
              </button>
            </div>

            <div style={{ marginBottom:20 }}>
              <label style={{ fontSize:12, fontWeight:700, color:"var(--text2)", display:"block", marginBottom:8 }}>
                WEIGHT (KG)
              </label>
              <input
                className="inp"
                type="number"
                step="0.1"
                placeholder={`e.g. ${PATIENT.currentWeight}`}
                value={weight}
                onChange={e => setWeight(e.target.value)}
                style={{ fontSize:24, fontWeight:800, textAlign:"center", padding:"16px" }}
                autoFocus
              />
            </div>

            <div style={{ marginBottom:24 }}>
              <label style={{ fontSize:12, fontWeight:700, color:"var(--text2)", display:"block", marginBottom:8 }}>
                NOTE (optional)
              </label>
              <input
                className="inp"
                placeholder="e.g. After morning walk, feeling great"
                value={note}
                onChange={e => setNote(e.target.value)}
              />
            </div>

            <div style={{
              background:"var(--cream2)", borderRadius:"var(--r-lg)", padding:"14px 16px",
              display:"flex", gap:10, alignItems:"center", marginBottom:24,
            }}>
              <TrendingDown size={16} color="var(--sage)" />
              <div style={{ fontSize:13, color:"var(--text2)" }}>
                Your last entry: <strong style={{ color:"var(--forest)" }}>{PATIENT.currentWeight} kg</strong> on May 10
              </div>
            </div>

            <div style={{ display:"flex", gap:12 }}>
              <button className="btn btn-outline" style={{ flex:1 }} onClick={onClose}>Cancel</button>
              <button
                className="btn btn-forest"
                style={{ flex:2 }}
                onClick={handleSave}
                disabled={!weight}
              >
                <Check size={15} /> Save Entry
              </button>
            </div>
          </>
        ) : (
          <div className="fi" style={{ textAlign:"center", padding:"20px 0" }}>
            <div style={{
              width:72, height:72, borderRadius:"50%", background:"rgba(109,184,138,.12)",
              display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px",
            }}>
              <CheckCircle2 size={36} color="var(--mint)" />
            </div>
            <h3 className="fr" style={{ fontSize:20, fontWeight:700, color:"var(--ink)", marginBottom:8 }}>
              Weight Logged!
            </h3>
            <p style={{ fontSize:14, color:"var(--text2)" }}>
              <strong>{weight} kg</strong> recorded for today.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   NOTIFICATIONS PANEL
═══════════════════════════════════════════ */
function NotificationsPanel({ onClose }) {
  const typeIcon = {
    refill: <Truck size={14} color="var(--sage)" />,
    appt:   <Calendar size={14} color="var(--blue)" />,
    tip:    <Zap size={14} color="var(--amber)" />,
    good:   <Award size={14} color="var(--warm)" />,
  };

  return (
    <div style={{
      position:"absolute", top:60, right:16, width:320, zIndex:100,
      background:"var(--white)", borderRadius:"var(--r-xl)", border:"1px solid var(--border2)",
      boxShadow:"var(--sh-lg)", overflow:"hidden",
      animation:"fadeUp .3s cubic-bezier(.22,1,.36,1)",
    }}>
      <div style={{ padding:"16px 20px", borderBottom:"1px solid var(--border2)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <span style={{ fontWeight:700, fontSize:15, color:"var(--ink)" }}>Notifications</span>
        <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer" }}>
          <X size={16} color="var(--text3)" />
        </button>
      </div>
      {NOTIFICATIONS.map(n => (
        <div key={n.id} style={{
          padding:"14px 20px", borderBottom:"1px solid var(--border2)",
          background: n.read ? "var(--white)" : "rgba(109,184,138,.04)",
          display:"flex", gap:12,
        }}>
          <div style={{
            width:34, height:34, borderRadius:10, flexShrink:0,
            background:"var(--cream2)", display:"flex", alignItems:"center", justifyContent:"center",
          }}>
            {typeIcon[n.type]}
          </div>
          <div style={{ flex:1 }}>
            <div style={{ fontSize:13, color:"var(--ink)", lineHeight:1.5, marginBottom:3 }}>{n.text}</div>
            <div style={{ fontSize:11, color:"var(--text3)" }}>{n.time}</div>
          </div>
          {!n.read && <div style={{ width:7, height:7, borderRadius:"50%", background:"var(--mint)", flexShrink:0, marginTop:4 }} />}
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════
   PAGE: SETTINGS
═══════════════════════════════════════════ */
function PageSettings() {
  const [notifications, setNotifications] = useState({ refill:true, appt:true, tips:false, weekly:true });
  const toggle = k => setNotifications(p => ({ ...p, [k]:!p[k] }));

  return (
    <div style={{ padding:"28px", overflowY:"auto", height:"100%" }}>
      <SectionHead title="Settings" />

      {/* Profile */}
      <div className="card fu d1" style={{ padding:"24px", marginBottom:20 }}>
        <h3 style={{ fontWeight:700, fontSize:14, color:"var(--text2)", marginBottom:16, letterSpacing:".04em" }}>
          PROFILE
        </h3>
        <div style={{ display:"flex", gap:16, alignItems:"center", marginBottom:20 }}>
          <div style={{
            width:64, height:64, borderRadius:20, fontSize:36,
            display:"flex", alignItems:"center", justifyContent:"center",
            background:"rgba(109,184,138,.1)", border:"1.5px solid rgba(109,184,138,.25)",
            position:"relative",
          }}>
            {PATIENT.avatar}
            <button style={{
              position:"absolute", bottom:-4, right:-4, width:22, height:22,
              borderRadius:"50%", background:"var(--forest)", border:"2px solid white",
              display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer",
            }}>
              <Camera size={10} color="white" />
            </button>
          </div>
          <div>
            <div style={{ fontWeight:800, fontSize:17, color:"var(--ink)" }}>{PATIENT.name}</div>
            <div style={{ fontSize:13, color:"var(--text2)" }}>{PATIENT.city} · Age {PATIENT.age}</div>
            <div style={{ fontSize:12, color:"var(--text3)" }}>Member since Feb 2025</div>
          </div>
        </div>
        {[
          { l:"Full Name",     v:PATIENT.name,          k:"name" },
          { l:"Mobile",        v:"+91 98765 43210",      k:"phone" },
          { l:"Email",         v:"priya.mehta@email.com",k:"email" },
          { l:"City / Pincode",v:"Mumbai — 400001",      k:"city" },
        ].map(f => (
          <div key={f.k} style={{
            display:"flex", justifyContent:"space-between", alignItems:"center",
            padding:"11px 0", borderBottom:"1px solid var(--border2)",
          }}>
            <div>
              <div style={{ fontSize:11, color:"var(--text3)", marginBottom:2 }}>{f.l}</div>
              <div style={{ fontSize:14, fontWeight:500, color:"var(--ink)" }}>{f.v}</div>
            </div>
            <button className="btn btn-outline btn-xs">
              <Edit3 size={11} /> Edit
            </button>
          </div>
        ))}
      </div>

      {/* Notifications */}
      <div className="card fu d2" style={{ padding:"24px", marginBottom:20 }}>
        <h3 style={{ fontWeight:700, fontSize:14, color:"var(--text2)", marginBottom:16, letterSpacing:".04em" }}>
          NOTIFICATIONS
        </h3>
        {[
          { k:"refill",  l:"Refill reminders",       s:"7 days before next shipment" },
          { k:"appt",    l:"Appointment reminders",  s:"24 hrs before consultation" },
          { k:"tips",    l:"Daily health tips",       s:"Personalised by Dr. Aria AI" },
          { k:"weekly",  l:"Weekly progress report",  s:"Every Monday morning" },
        ].map(item => (
          <div key={item.k} style={{
            display:"flex", justifyContent:"space-between", alignItems:"center",
            padding:"12px 0", borderBottom:"1px solid var(--border2)",
          }}>
            <div>
              <div style={{ fontSize:14, fontWeight:600, color:"var(--ink)", marginBottom:2 }}>{item.l}</div>
              <div style={{ fontSize:12, color:"var(--text3)" }}>{item.s}</div>
            </div>
            <div
              onClick={() => toggle(item.k)}
              style={{
                width:44, height:24, borderRadius:100, cursor:"pointer",
                background: notifications[item.k] ? "var(--mint)" : "var(--border)",
                position:"relative", transition:"background .2s", flexShrink:0,
              }}
            >
              <div style={{
                position:"absolute", top:3, left: notifications[item.k] ? "calc(100% - 21px)" : 3,
                width:18, height:18, borderRadius:"50%", background:"white",
                boxShadow:"0 1px 4px rgba(0,0,0,.15)",
                transition:"left .2s cubic-bezier(.4,0,.2,1)",
              }} />
            </div>
          </div>
        ))}
      </div>

      {/* Privacy & security */}
      <div className="card fu d3" style={{ padding:"24px", marginBottom:20 }}>
        <h3 style={{ fontWeight:700, fontSize:14, color:"var(--text2)", marginBottom:16, letterSpacing:".04em" }}>
          PRIVACY & SECURITY
        </h3>
        {[
          { icon:Lock,   l:"Change Password",      s:"Last changed 3 months ago" },
          { icon:Shield, l:"Two-Factor Auth",       s:"Enabled via OTP" },
          { icon:Download, l:"Export My Data",     s:"Download your health records" },
          { icon:X,      l:"Delete Account",        s:"Permanently remove all data", danger:true },
        ].map(item => (
          <div key={item.l} style={{
            display:"flex", alignItems:"center", gap:14,
            padding:"12px 0", borderBottom:"1px solid var(--border2)", cursor:"pointer",
          }}>
            <div style={{
              width:36, height:36, borderRadius:10,
              background: item.danger ? "rgba(224,82,82,.08)" : "var(--cream2)",
              display:"flex", alignItems:"center", justifyContent:"center",
            }}>
              <item.icon size={16} color={item.danger ? "var(--red)" : "var(--text2)"} />
            </div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:14, fontWeight:500, color: item.danger ? "var(--red)" : "var(--ink)" }}>{item.l}</div>
              <div style={{ fontSize:12, color:"var(--text3)" }}>{item.s}</div>
            </div>
            <ChevronRight size={15} color="var(--text3)" />
          </div>
        ))}
      </div>

      {/* Subscription */}
      <div className="card fu d4 card-active" style={{ padding:"24px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap", gap:12 }}>
          <div>
            <h3 style={{ fontWeight:700, fontSize:15, color:"var(--ink)", marginBottom:4 }}>Active Subscription</h3>
            <div style={{ fontSize:13, color:"var(--text2)" }}>{PATIENT.plan}</div>
            <div style={{ fontSize:12, color:"var(--text3)", marginTop:2 }}>Renews June 1, 2025 · ₹1,299/mo</div>
          </div>
          <div style={{ display:"flex", gap:8 }}>
            <button className="btn btn-outline btn-sm">Pause</button>
            <button className="btn btn-outline btn-sm" style={{ color:"var(--red)", borderColor:"var(--red)" }}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   ROOT APP
═══════════════════════════════════════════ */
export default function PatientDashboard() {
  const [activePage, setActivePage] = useState("overview");
  const [showWeightModal, setShowWeightModal] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);

  const unread = NOTIFICATIONS.filter(n => !n.read).length;

  const NAV = [
    { id:"overview",       label:"Overview",        icon:Home },
    { id:"prescriptions",  label:"Prescriptions",   icon:FileText },
    { id:"orders",         label:"Orders",          icon:ShoppingBag },
    { id:"consultations",  label:"Consultations",   icon:Stethoscope },
    { id:"settings",       label:"Settings",        icon:Settings },
  ];

  const renderPage = () => {
    switch (activePage) {
      case "overview":      return <PageOverview onLogWeight={() => setShowWeightModal(true)} />;
      case "prescriptions": return <PagePrescriptions />;
      case "orders":        return <PageOrders />;
      case "consultations": return <PageConsultations />;
      case "settings":      return <PageSettings />;
      default:              return <PageOverview onLogWeight={() => setShowWeightModal(true)} />;
    }
  };

  return (
    <>
      <style>{CSS}</style>
      <div style={{
        display:"flex", height:"100vh", width:"100vw",
        background:"var(--cream)", overflow:"hidden",
      }}>
        {/* ── Sidebar ── */}
        <aside style={{
          width:240, flexShrink:0,
          background:"var(--white)",
          borderRight:"1px solid var(--border2)",
          display:"flex", flexDirection:"column",
          padding:"20px 16px",
          boxShadow:"2px 0 12px rgba(0,0,0,.04)",
        }}>
          {/* Logo */}
          <div style={{ display:"flex", alignItems:"center", gap:10, padding:"4px 6px", marginBottom:28 }}>
            <div style={{
              width:34, height:34, borderRadius:10,
              background:"linear-gradient(135deg,var(--forest),var(--forest3))",
              display:"flex", alignItems:"center", justifyContent:"center",
            }}>
              <Activity size={17} color="white" />
            </div>
            <span className="fr" style={{ fontSize:20, fontWeight:700, color:"var(--forest)", fontStyle:"italic" }}>
              SlimRx
            </span>
          </div>

          {/* Patient mini-profile */}
          <div style={{
            background:"var(--cream2)", borderRadius:"var(--r-lg)", padding:"14px",
            marginBottom:20, display:"flex", gap:10, alignItems:"center",
          }}>
            <div style={{
              width:38, height:38, borderRadius:12, flexShrink:0, fontSize:22,
              display:"flex", alignItems:"center", justifyContent:"center",
              background:"rgba(109,184,138,.12)",
            }}>{PATIENT.avatar}</div>
            <div style={{ minWidth:0 }}>
              <div style={{ fontWeight:700, fontSize:13, color:"var(--ink)", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
                {PATIENT.name}
              </div>
              <div style={{ fontSize:11, color:"var(--text3)" }}>{PATIENT.plan.slice(0,16)}…</div>
            </div>
          </div>

          {/* Nav */}
          <nav style={{ flex:1, display:"flex", flexDirection:"column", gap:4 }}>
            {NAV.map(item => (
              <button
                key={item.id}
                className={`nav-item ${activePage === item.id ? "active" : ""}`}
                onClick={() => setActivePage(item.id)}
              >
                <item.icon size={17} />
                {item.label}
              </button>
            ))}
          </nav>

          {/* Bottom: refill CTA */}
          <div style={{
            background:"linear-gradient(135deg,var(--forest),var(--forest3))",
            borderRadius:"var(--r-lg)", padding:"14px", marginTop:16,
          }}>
            <div style={{ fontSize:11, color:"rgba(255,255,255,.5)", marginBottom:4 }}>Next shipment</div>
            <div style={{ fontWeight:800, fontSize:15, color:"var(--lime)", marginBottom:2 }}>8 days</div>
            <div style={{ fontSize:11, color:"rgba(255,255,255,.4)", marginBottom:10 }}>SemaSlim™ 7mg · 30 tabs</div>
            <button className="btn btn-outline btn-xs" style={{
              width:"100%", justifyContent:"center",
              borderColor:"rgba(255,255,255,.2)", color:"rgba(255,255,255,.7)",
            }}>
              <Gift size={11} /> Early Refill
            </button>
          </div>
        </aside>

        {/* ── Main content ── */}
        <main style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden", minWidth:0 }}>
          {/* Top bar */}
          <header style={{
            height:60, flexShrink:0,
            background:"var(--white)",
            borderBottom:"1px solid var(--border2)",
            padding:"0 24px",
            display:"flex", alignItems:"center", justifyContent:"space-between",
            boxShadow:"0 1px 4px rgba(0,0,0,.04)",
          }}>
            <div>
              <h1 style={{ fontSize:17, fontWeight:700, color:"var(--ink)" }}>
                {NAV.find(n => n.id === activePage)?.label}
              </h1>
              <div style={{ fontSize:11, color:"var(--text3)" }}>
                Patient ID: SRX-PMU-0312 · {new Date().toLocaleDateString("en-IN", { day:"2-digit", month:"short", year:"numeric" })}
              </div>
            </div>

            <div style={{ display:"flex", gap:10, alignItems:"center", position:"relative" }}>
              {/* Notifications */}
              <button
                onClick={() => setShowNotifs(s => !s)}
                style={{
                  width:38, height:38, borderRadius:10,
                  background:"var(--cream2)", border:"1px solid var(--border2)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  cursor:"pointer", position:"relative",
                }}
              >
                <Bell size={16} color="var(--text2)" />
                {unread > 0 && (
                  <div className="notif-dot" />
                )}
              </button>

              {/* Log weight */}
              <button
                className="btn btn-forest btn-sm"
                onClick={() => setShowWeightModal(true)}
              >
                <Plus size={13} /> Log Weight
              </button>

              {showNotifs && (
                <NotificationsPanel onClose={() => setShowNotifs(false)} />
              )}
            </div>
          </header>

          {/* Page content */}
          <div style={{ flex:1, overflowY:"auto", background:"var(--cream)" }}>
            {renderPage()}
          </div>
        </main>
      </div>

      {/* Weight log modal */}
      {showWeightModal && <WeightLogModal onClose={() => setShowWeightModal(false)} />}
    </>
  );
}
