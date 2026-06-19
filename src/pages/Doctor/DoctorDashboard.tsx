import { useState, useEffect, useRef } from "react";
import {
  Activity, Users, FileText, Calendar, Bell, Settings,
  Search, ChevronRight, ChevronDown, ChevronUp, Check,
  Clock, AlertTriangle, CheckCircle2, XCircle, Phone,
  Video, MessageCircle, Pill, TrendingDown, TrendingUp,
  ArrowUpRight, ArrowDownRight, MoreVertical, Filter,
  Download, Send, X, Plus, Edit3, Eye, RefreshCw,
  Shield, Lock, Star, Zap, BarChart2, Heart,
  Stethoscope, ClipboardList, AlertCircle, Info,
  LogOut, User, Award, Thermometer, Droplets
} from "lucide-react";

/* ═══════════════════════════════════════════════
   GLOBAL STYLES
   Aesthetic: Authoritative medical dark-slate.
   Navy + electric blue accents + clean whites.
   Fonts: Cabinet Grotesk (display) + Outfit (body)
   Dense information design like a real EMR system.
═══════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=DM+Serif+Display:ital@0;1&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}

:root {
  --navy:    #0b1629;
  --navy2:   #111e38;
  --navy3:   #172442;
  --blue:    #2563eb;
  --blue2:   #3b82f6;
  --blue3:   #60a5fa;
  --blue-s:  #eff6ff;
  --cyan:    #0891b2;
  --cyan2:   #22d3ee;
  --teal:    #0d9488;
  --teal-s:  #f0fdfa;
  --green:   #16a34a;
  --green-s: #f0fdf4;
  --amber:   #d97706;
  --amber-s: #fffbeb;
  --red:     #dc2626;
  --red-s:   #fef2f2;
  --purple:  #7c3aed;
  --purple-s:#f5f3ff;
  --slate-900:#0f172a;
  --slate-800:#1e293b;
  --slate-700:#334155;
  --slate-600:#475569;
  --slate-500:#64748b;
  --slate-400:#94a3b8;
  --slate-300:#cbd5e1;
  --slate-200:#e2e8f0;
  --slate-100:#f1f5f9;
  --slate-50: #f8fafc;
  --white:   #ffffff;
  --r:       8px;
  --r-lg:    14px;
  --r-xl:    20px;
  --r-2xl:   28px;
  --sh:      0 1px 3px rgba(0,0,0,.08),0 1px 2px rgba(0,0,0,.04);
  --sh-md:   0 4px 16px rgba(0,0,0,.1),0 2px 4px rgba(0,0,0,.06);
  --sh-lg:   0 12px 40px rgba(0,0,0,.14),0 4px 8px rgba(0,0,0,.08);
}

html,body,#root { height:100%; overflow:hidden; }
body {
  font-family:'Outfit',sans-serif;
  background:var(--slate-100);
  color:var(--slate-800);
  -webkit-font-smoothing:antialiased;
  font-size:14px;
}
.serif { font-family:'DM Serif Display',Georgia,serif; }

/* Animations */
@keyframes fadeUp  { from{opacity:0;transform:translateY(12px);}to{opacity:1;transform:translateY(0);} }
@keyframes fadeIn  { from{opacity:0;}to{opacity:1;} }
@keyframes slideR  { from{opacity:0;transform:translateX(-8px);}to{opacity:1;transform:translateX(0);} }
@keyframes pulse   { 0%,100%{opacity:1;}50%{opacity:.4;} }
@keyframes spin    { to{transform:rotate(360deg);} }
@keyframes blink   { 0%,100%{opacity:1;}50%{opacity:0;} }

.fu  { animation:fadeUp  .4s cubic-bezier(.22,1,.36,1) both; }
.fi  { animation:fadeIn  .3s ease both; }
.sr  { animation:slideR  .35s cubic-bezier(.22,1,.36,1) both; }
.d1  { animation-delay:.04s; opacity:0; }
.d2  { animation-delay:.08s; opacity:0; }
.d3  { animation-delay:.12s; opacity:0; }
.d4  { animation-delay:.16s; opacity:0; }
.d5  { animation-delay:.20s; opacity:0; }
.d6  { animation-delay:.24s; opacity:0; }

/* Scrollbar */
::-webkit-scrollbar { width:4px; height:4px; }
::-webkit-scrollbar-track { background:transparent; }
::-webkit-scrollbar-thumb { background:var(--slate-300); border-radius:2px; }

/* ── Sidebar nav ── */
.snav {
  display:flex; align-items:center; gap:10px;
  padding:10px 14px; border-radius:var(--r-lg);
  cursor:pointer; transition:all .18s;
  color:rgba(255,255,255,.55); font-size:13.5px; font-weight:500;
  border:none; background:none; width:100%;
  font-family:'Outfit',sans-serif; text-align:left;
}
.snav:hover { background:rgba(255,255,255,.06); color:rgba(255,255,255,.85); }
.snav.active {
  background:rgba(37,99,235,.25);
  color:var(--white);
  font-weight:600;
  border-left:3px solid var(--blue2);
  padding-left:11px;
}

/* ── Cards ── */
.card {
  background:var(--white);
  border:1px solid var(--slate-200);
  border-radius:var(--r-xl);
  box-shadow:var(--sh);
}
.card-hover { transition:all .22s; }
.card-hover:hover { box-shadow:var(--sh-md); transform:translateY(-1px); }

/* ── Stat tile ── */
.stat-tile {
  background:var(--white);
  border:1px solid var(--slate-200);
  border-radius:var(--r-lg);
  padding:16px 18px;
  box-shadow:var(--sh);
}

/* ── Patient row ── */
.pt-row {
  display:flex; align-items:center; gap:14px;
  padding:13px 18px; border-bottom:1px solid var(--slate-100);
  cursor:pointer; transition:background .15s;
}
.pt-row:hover { background:var(--slate-50); }
.pt-row:last-child { border-bottom:none; }
.pt-row.selected { background:var(--blue-s); }

/* ── Badge ── */
.badge {
  display:inline-flex; align-items:center; gap:4px;
  padding:2px 8px; border-radius:100px;
  font-size:11px; font-weight:700; letter-spacing:.02em;
  white-space:nowrap;
}
.b-blue   { background:var(--blue-s);   color:var(--blue); }
.b-green  { background:var(--green-s);  color:var(--green); }
.b-amber  { background:var(--amber-s);  color:var(--amber); }
.b-red    { background:var(--red-s);    color:var(--red); }
.b-teal   { background:var(--teal-s);   color:var(--teal); }
.b-purple { background:var(--purple-s); color:var(--purple); }
.b-slate  { background:var(--slate-100); color:var(--slate-600); }

/* ── Priority dot ── */
.p-dot {
  width:8px; height:8px; border-radius:50%; flex-shrink:0;
}
.p-urgent { background:var(--red); animation:pulse 1.4s ease infinite; }
.p-high   { background:var(--amber); }
.p-normal { background:var(--green); }
.p-low    { background:var(--slate-400); }

/* ── Btn ── */
.btn {
  display:inline-flex; align-items:center; justify-content:center; gap:6px;
  padding:9px 18px; border-radius:var(--r-lg); border:none;
  font-family:'Outfit',sans-serif; font-size:13px; font-weight:600;
  cursor:pointer; transition:all .18s; line-height:1; white-space:nowrap;
}
.btn-blue {
  background:var(--blue); color:var(--white);
  box-shadow:0 2px 8px rgba(37,99,235,.3);
}
.btn-blue:hover { background:#1d4ed8; transform:translateY(-1px); box-shadow:0 4px 14px rgba(37,99,235,.4); }
.btn-navy {
  background:var(--navy); color:var(--white);
  box-shadow:0 2px 8px rgba(11,22,41,.3);
}
.btn-navy:hover { background:var(--navy2); transform:translateY(-1px); }
.btn-outline {
  background:transparent; border:1.5px solid var(--slate-300);
  color:var(--slate-700);
}
.btn-outline:hover { border-color:var(--blue2); color:var(--blue); background:var(--blue-s); }
.btn-green-s {
  background:var(--green-s); color:var(--green);
  border:1.5px solid rgba(22,163,74,.2);
}
.btn-green-s:hover { background:#dcfce7; }
.btn-red-s {
  background:var(--red-s); color:var(--red);
  border:1.5px solid rgba(220,38,38,.2);
}
.btn-sm { padding:7px 13px; font-size:12px; border-radius:var(--r); }
.btn-xs { padding:5px 10px; font-size:11px; border-radius:6px; }
.btn:disabled { opacity:.45; cursor:not-allowed; transform:none !important; }

/* ── Input ── */
.inp {
  width:100%; padding:9px 12px;
  border:1.5px solid var(--slate-200);
  border-radius:var(--r); outline:none;
  font-family:'Outfit',sans-serif; font-size:13.5px;
  color:var(--slate-800); background:var(--white);
  transition:border-color .18s, box-shadow .18s;
}
.inp:focus { border-color:var(--blue2); box-shadow:0 0 0 3px rgba(59,130,246,.1); }
.inp::placeholder { color:var(--slate-400); }

/* ── Tab ── */
.tab {
  padding:8px 14px; border:none; background:none;
  font-family:'Outfit',sans-serif; font-size:13px; font-weight:500;
  color:var(--slate-500); cursor:pointer; transition:all .18s;
  border-bottom:2px solid transparent; border-radius:0;
}
.tab.active { color:var(--blue); font-weight:700; border-bottom-color:var(--blue2); }
.tab:hover:not(.active) { color:var(--slate-700); }

/* ── Section label ── */
.sec-label {
  font-size:10px; font-weight:700; letter-spacing:.1em;
  color:var(--slate-400); text-transform:uppercase; margin-bottom:8px;
}

/* ── Timeline ── */
.tl-item { display:flex; gap:12px; padding-bottom:16px; position:relative; }
.tl-item::before {
  content:''; position:absolute; left:14px; top:28px;
  width:2px; height:calc(100% - 12px);
  background:var(--slate-200);
}
.tl-item:last-child::before { display:none; }
.tl-dot {
  width:28px; height:28px; border-radius:50%; flex-shrink:0;
  display:flex; align-items:center; justify-content:center;
  font-size:12px; z-index:1;
}

/* ── Modal ── */
.modal-bg {
  position:fixed; inset:0; z-index:300;
  background:rgba(15,23,42,.6); backdrop-filter:blur(4px);
  display:flex; align-items:center; justify-content:center;
  padding:20px; animation:fadeIn .2s ease;
}
.modal {
  background:var(--white); border-radius:var(--r-2xl);
  max-width:600px; width:100%; max-height:90vh; overflow-y:auto;
  box-shadow:0 32px 80px rgba(0,0,0,.3);
  animation:fadeUp .3s cubic-bezier(.22,1,.36,1);
}

/* ── Status indicator ── */
.status-live {
  display:inline-flex; align-items:center; gap:5px;
  font-size:11px; font-weight:600; color:var(--green);
}
.status-live::before {
  content:''; width:7px; height:7px; border-radius:50%;
  background:var(--green); animation:pulse 1.5s ease infinite;
}

/* ── Rx form ── */
.rx-field { margin-bottom:14px; }
.rx-label {
  display:block; font-size:11px; font-weight:700;
  color:var(--slate-500); margin-bottom:5px; letter-spacing:.04em;
}
.rx-select {
  width:100%; padding:9px 32px 9px 12px;
  border:1.5px solid var(--slate-200); border-radius:var(--r);
  font-family:'Outfit',sans-serif; font-size:13.5px; color:var(--slate-800);
  background:var(--white); outline:none; cursor:pointer;
  appearance:none; -webkit-appearance:none;
  transition:border-color .18s;
}
.rx-select:focus { border-color:var(--blue2); box-shadow:0 0 0 3px rgba(59,130,246,.1); }
.rx-wrap { position:relative; }
.rx-wrap::after {
  content:''; position:absolute; right:12px; top:50%; transform:translateY(-50%);
  border:4px solid transparent; border-top-color:var(--slate-400);
  pointer-events:none;
}

/* ── Notification panel ── */
.notif-item {
  display:flex; gap:10px; padding:12px 16px;
  border-bottom:1px solid var(--slate-100); transition:background .15s;
  cursor:pointer;
}
.notif-item:hover { background:var(--slate-50); }
.notif-item.unread { background:var(--blue-s); }

/* ── Search ── */
.search-wrap {
  display:flex; align-items:center; gap:8px;
  background:var(--white); border:1.5px solid var(--slate-200);
  border-radius:var(--r-lg); padding:8px 14px;
  transition:border-color .18s, box-shadow .18s;
}
.search-wrap:focus-within {
  border-color:var(--blue2);
  box-shadow:0 0 0 3px rgba(59,130,246,.1);
}
.search-inp {
  border:none; outline:none; background:transparent;
  font-family:'Outfit',sans-serif; font-size:13.5px;
  color:var(--slate-800); flex:1;
}
.search-inp::placeholder { color:var(--slate-400); }
`;

/* ═══════════════════════════════════════════════
   MOCK DATA
═══════════════════════════════════════════════ */
const DOCTOR = {
  name: "Dr. Kavitha Rajan",
  spec: "MD Endocrinology, DM Metabolism",
  reg: "MCI-234521",
  hospital: "SlimRx Medical · Mumbai",
  avatar: "👩‍⚕️",
  todayConsults: 12,
  pendingRx: 4,
  activePatients: 186,
  rating: 4.97,
};

const QUEUE = [
  {
    id: "Q001", name: "Priya Mehta",      age: 34, city: "Mumbai",
    type: "Monthly Check-in",  time: "10:30 AM", status: "in-progress",
    priority: "normal", medication: "SemaSlim 7mg",
    weight: 72.3, lastWeight: 73.0, bmi: 27.5, avatar: "👩‍💼",
    waitMins: 0, notes: "4 months on treatment. Excellent adherence.",
  },
  {
    id: "Q002", name: "Rajesh Kumar",     age: 42, city: "Delhi",
    type: "Side Effect Report", time: "11:00 AM", status: "waiting",
    priority: "high", medication: "SemaPen XR 2.4mg",
    weight: 98.2, lastWeight: 100.1, bmi: 32.4, avatar: "👨‍💻",
    waitMins: 8, notes: "Reports nausea. Week 2 of treatment.",
  },
  {
    id: "Q003", name: "Ananya Reddy",     age: 29, city: "Bengaluru",
    type: "Dose Review",        time: "11:30 AM", status: "waiting",
    priority: "normal", medication: "LiraDose 3mg",
    weight: 68.5, lastWeight: 70.2, bmi: 26.8, avatar: "👩‍⚕️",
    waitMins: 22, notes: "3 months. Dose escalation due today.",
  },
  {
    id: "Q004", name: "Suresh Pillai",    age: 55, city: "Chennai",
    type: "Initial Consultation",time: "12:00 PM", status: "waiting",
    priority: "normal", medication: "New Patient",
    weight: 102.0, lastWeight: null, bmi: 34.1, avatar: "👨‍🦳",
    waitMins: 45, notes: "New patient. Type 2 diabetic. Referred by Dr. Sharma.",
  },
  {
    id: "Q005", name: "Meera Joshi",      age: 38, city: "Pune",
    type: "Prescription Renewal", time: "12:30 PM", status: "waiting",
    priority: "urgent", medication: "SemaSlim 7mg",
    weight: 74.1, lastWeight: 76.3, bmi: 28.2, avatar: "👩‍🎨",
    waitMins: 58, notes: "Urgent: Rx expiry today. Patient travelling tomorrow.",
  },
  {
    id: "Q006", name: "Arjun Nair",       age: 47, city: "Kochi",
    type: "Monthly Check-in",   time: "1:00 PM",  status: "scheduled",
    priority: "low", medication: "LiraDose 3mg",
    weight: 88.5, lastWeight: 91.0, bmi: 30.1, avatar: "👨‍💼",
    waitMins: 0, notes: "6 months on treatment. Excellent results.",
  },
];

const ALL_PATIENTS = [
  { id:"P001", name:"Priya Mehta",    age:34, city:"Mumbai",    med:"SemaSlim 7mg",   status:"active",   lost:12.2, months:4,  bmi:27.5, lastVisit:"May 10", avatar:"👩‍💼", adherence:98 },
  { id:"P002", name:"Rajesh Kumar",   age:42, city:"Delhi",     med:"SemaPen XR 2.4", status:"active",   lost:1.9,  months:0,  bmi:32.4, lastVisit:"May 20", avatar:"👨‍💻", adherence:72 },
  { id:"P003", name:"Ananya Reddy",   age:29, city:"Bengaluru", med:"LiraDose 3mg",   status:"active",   lost:1.7,  months:3,  bmi:26.8, lastVisit:"May 15", avatar:"👩‍⚕️", adherence:91 },
  { id:"P004", name:"Suresh Pillai",  age:55, city:"Chennai",   med:"New Patient",    status:"new",      lost:0,    months:0,  bmi:34.1, lastVisit:"Today",  avatar:"👨‍🦳", adherence:0  },
  { id:"P005", name:"Meera Joshi",    age:38, city:"Pune",      med:"SemaSlim 7mg",   status:"active",   lost:2.2,  months:5,  bmi:28.2, lastVisit:"May 18", avatar:"👩‍🎨", adherence:95 },
  { id:"P006", name:"Arjun Nair",     age:47, city:"Kochi",     med:"LiraDose 3mg",   status:"active",   lost:2.5,  months:6,  bmi:30.1, lastVisit:"May 12", avatar:"👨‍💼", adherence:89 },
  { id:"P007", name:"Divya Sharma",   age:31, city:"Jaipur",    med:"SemaSlim 7mg",   status:"paused",   lost:4.8,  months:3,  bmi:29.3, lastVisit:"Apr 28", avatar:"👩‍🏫", adherence:60 },
  { id:"P008", name:"Kiran Patel",    age:50, city:"Ahmedabad", med:"SemaPen XR 2.4", status:"active",   lost:8.1,  months:4,  bmi:31.2, lastVisit:"May 8",  avatar:"👨‍🔬", adherence:94 },
];

const NOTIFICATIONS_DATA = [
  { id:1, type:"urgent",  text:"Meera Joshi — Prescription expiring today. Action needed.",        time:"Just now",  read:false },
  { id:2, type:"alert",   text:"Rajesh Kumar — Reported nausea side effects via app.",             time:"12m ago",   read:false },
  { id:3, type:"new",     text:"New patient Suresh Pillai — intake form completed.",               time:"1h ago",    read:false },
  { id:4, type:"info",    text:"Priya Mehta — Weight logged: 72.3 kg (↓0.7 from last week).",     time:"3h ago",    read:true  },
  { id:5, type:"system",  text:"Platform: 3 prescription renewal requests pending approval.",      time:"5h ago",    read:true  },
];

const MEDICATIONS_LIST = [
  { id:"sema-oral",  name:"Semaglutide 7mg (Oral)",      brand:"SemaSlim™",  maker:"Sun Pharma",   type:"oral" },
  { id:"sema-pen",   name:"Semaglutide 2.4mg (Weekly)",  brand:"SemaPen™ XR",maker:"Zydus Cadila", type:"injection" },
  { id:"lira-pen",   name:"Liraglutide 3mg (Daily)",     brand:"LiraDose™",  maker:"Cipla Ltd.",   type:"injection" },
  { id:"sema-3mg",   name:"Semaglutide 3mg Starter",     brand:"SemaSlim™",  maker:"Sun Pharma",   type:"oral" },
];

const WEEKLY_STATS = [
  { day:"Mon", consults:11, rx:6 },
  { day:"Tue", consults:14, rx:9 },
  { day:"Wed", consults:9,  rx:4 },
  { day:"Thu", consults:15, rx:11 },
  { day:"Fri", consults:12, rx:7 },
  { day:"Sat", consults:8,  rx:3 },
  { day:"Sun", consults:4,  rx:2 },
];

/* ═══════════════════════════════════════════════
   SMALL HELPERS
═══════════════════════════════════════════════ */

function Avatar({ emoji, size = 36, bg = "var(--blue-s)" }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: Math.round(size * 0.28),
      background: bg, display: "flex", alignItems: "center",
      justifyContent: "center", fontSize: size * 0.5, flexShrink: 0,
    }}>{emoji}</div>
  );
}

function PriorityDot({ level }) {
  const cls = { urgent:"p-urgent", high:"p-high", normal:"p-normal", low:"p-low" };
  return <div className={`p-dot ${cls[level] || "p-normal"}`} />;
}

function StatTile({ icon: Icon, label, value, sub, color, delta, delay }) {
  return (
    <div className={`stat-tile fu ${delay}`} style={{ position:"relative", overflow:"hidden" }}>
      <div style={{
        position:"absolute", top:-10, right:-10, width:56, height:56, borderRadius:"50%",
        background:`${color}14`, pointerEvents:"none",
      }} />
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
        <div style={{
          width:34, height:34, borderRadius:10,
          background:`${color}12`, display:"flex", alignItems:"center", justifyContent:"center",
        }}>
          <Icon size={16} color={color} />
        </div>
        {delta !== undefined && (
          <div style={{
            display:"flex", alignItems:"center", gap:2,
            fontSize:11, fontWeight:700,
            color: delta >= 0 ? "var(--green)" : "var(--red)",
          }}>
            {delta >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            {Math.abs(delta)}%
          </div>
        )}
      </div>
      <div style={{ fontSize:24, fontWeight:800, color:"var(--slate-900)", lineHeight:1, marginBottom:3 }}>
        {value}
      </div>
      <div style={{ fontSize:12.5, color:"var(--slate-500)", fontWeight:500 }}>{label}</div>
      {sub && <div style={{ fontSize:11, color:"var(--slate-400)", marginTop:2 }}>{sub}</div>}
    </div>
  );
}

function MiniBar({ data, colorA, colorB }) {
  const maxVal = Math.max(...data.map(d => Math.max(d.consults, d.rx)));
  return (
    <div style={{ display:"flex", gap:3, alignItems:"flex-end", height:48 }}>
      {data.map((d, i) => (
        <div key={i} style={{ flex:1, display:"flex", gap:1, alignItems:"flex-end" }}>
          <div style={{
            flex:1, borderRadius:"2px 2px 0 0",
            background: colorA,
            height:`${(d.consults / maxVal) * 100}%`,
            minHeight:3,
            transition:`height .8s cubic-bezier(.4,0,.2,1) ${i*.05}s`,
          }} />
          <div style={{
            flex:1, borderRadius:"2px 2px 0 0",
            background: colorB,
            height:`${(d.rx / maxVal) * 100}%`,
            minHeight:2,
            transition:`height .8s cubic-bezier(.4,0,.2,1) ${i*.05+.04}s`,
          }} />
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   PRESCRIBE MODAL
═══════════════════════════════════════════════ */
function PrescribeModal({ patient, onClose, onIssue }) {
  const [form, setForm] = useState({
    medication: "",
    dose: "",
    frequency: "",
    duration: "30 days",
    refills: "2",
    instructions: "",
    warnings: "",
    followUp: "30 days",
  });
  const [step, setStep] = useState(0); // 0=form, 1=confirm, 2=issued
  const [issuing, setIssuing] = useState(false);

  const DOSES = {
    "sema-oral": ["3mg (Starter)", "7mg (Maintenance)"],
    "sema-pen":  ["0.25mg (Starter)", "0.5mg", "1mg", "1.7mg", "2.4mg (Max)"],
    "lira-pen":  ["0.6mg (Starter)", "1.2mg", "1.8mg", "2.4mg", "3mg (Max)"],
    "sema-3mg":  ["3mg"],
  };

  const FREQS = {
    "sema-oral": ["Once daily (morning, 30min before food)"],
    "sema-pen":  ["Once weekly (same day each week)"],
    "lira-pen":  ["Once daily (any time)"],
    "sema-3mg":  ["Once daily (morning, 30min before food)"],
  };

  const selectedMed = MEDICATIONS_LIST.find(m => m.id === form.medication);

  const handleIssue = () => {
    setIssuing(true);
    setTimeout(() => { setIssuing(false); setStep(2); }, 1800);
  };

  return (
    <div className="modal-bg" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ padding:"32px" }}>
        {/* Header */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:24 }}>
          <div>
            <h2 className="serif" style={{ fontSize:22, color:"var(--slate-900)", marginBottom:4 }}>
              Issue Prescription
            </h2>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <Avatar emoji={patient.avatar} size={28} />
              <span style={{ fontSize:13, color:"var(--slate-600)", fontWeight:500 }}>
                {patient.name} · Age {patient.age} · BMI {patient.bmi}
              </span>
            </div>
          </div>
          <button onClick={onClose} style={{
            width:30, height:30, borderRadius:"50%", background:"var(--slate-100)",
            border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
          }}>
            <X size={15} color="var(--slate-500)" />
          </button>
        </div>

        {/* Step indicators */}
        <div style={{ display:"flex", gap:6, marginBottom:24 }}>
          {["Select Medication", "Review & Confirm", "Issued"].map((s, i) => (
            <div key={i} style={{ flex:1, textAlign:"center" }}>
              <div style={{
                height:4, borderRadius:2, marginBottom:4,
                background: i <= step ? "var(--blue)" : "var(--slate-200)",
                transition:"background .3s",
              }} />
              <div style={{ fontSize:10, color: i <= step ? "var(--blue)" : "var(--slate-400)", fontWeight:600 }}>
                {s}
              </div>
            </div>
          ))}
        </div>

        {/* Step 0: Form */}
        {step === 0 && (
          <div className="fi">
            <div className="rx-field">
              <label className="rx-label">MEDICATION</label>
              <div className="rx-wrap">
                <select className="rx-select" value={form.medication}
                  onChange={e => setForm(f => ({ ...f, medication:e.target.value, dose:"", frequency:"" }))}>
                  <option value="">— Select medication —</option>
                  {MEDICATIONS_LIST.map(m => (
                    <option key={m.id} value={m.id}>{m.brand} — {m.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {form.medication && (
              <>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                  <div className="rx-field">
                    <label className="rx-label">DOSE</label>
                    <div className="rx-wrap">
                      <select className="rx-select" value={form.dose}
                        onChange={e => setForm(f => ({ ...f, dose:e.target.value }))}>
                        <option value="">— Select —</option>
                        {(DOSES[form.medication] || []).map(d => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="rx-field">
                    <label className="rx-label">FREQUENCY</label>
                    <div className="rx-wrap">
                      <select className="rx-select" value={form.frequency}
                        onChange={e => setForm(f => ({ ...f, frequency:e.target.value }))}>
                        <option value="">— Select —</option>
                        {(FREQS[form.medication] || []).map(f => (
                          <option key={f} value={f}>{f}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:14 }}>
                  <div className="rx-field">
                    <label className="rx-label">DURATION</label>
                    <div className="rx-wrap">
                      <select className="rx-select" value={form.duration}
                        onChange={e => setForm(f => ({ ...f, duration:e.target.value }))}>
                        {["30 days","60 days","90 days"].map(d => <option key={d}>{d}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="rx-field">
                    <label className="rx-label">REFILLS</label>
                    <div className="rx-wrap">
                      <select className="rx-select" value={form.refills}
                        onChange={e => setForm(f => ({ ...f, refills:e.target.value }))}>
                        {["0","1","2","3"].map(r => <option key={r}>{r}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="rx-field">
                    <label className="rx-label">FOLLOW-UP</label>
                    <div className="rx-wrap">
                      <select className="rx-select" value={form.followUp}
                        onChange={e => setForm(f => ({ ...f, followUp:e.target.value }))}>
                        {["2 weeks","30 days","45 days","60 days"].map(d => <option key={d}>{d}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="rx-field">
                  <label className="rx-label">SPECIAL INSTRUCTIONS (optional)</label>
                  <textarea className="inp" rows={2} placeholder="e.g. Take with 240ml water. Avoid high-fat meals within 30 mins."
                    value={form.instructions}
                    onChange={e => setForm(f => ({ ...f, instructions:e.target.value }))}
                    style={{ resize:"vertical" }} />
                </div>

                {/* Drug warnings autofill */}
                <div style={{
                  background:"var(--amber-s)", border:"1px solid rgba(217,119,6,.2)",
                  borderRadius:var_r, padding:"10px 14px",
                  display:"flex", gap:8, alignItems:"flex-start",
                }}>
                  <AlertTriangle size={14} color="var(--amber)" style={{ flexShrink:0, marginTop:2 }} />
                  <div style={{ fontSize:12, color:"#92400e", lineHeight:1.6 }}>
                    <strong>Standard warnings auto-included:</strong> Nausea/vomiting (esp. weeks 1–4),
                    pancreatitis risk, thyroid monitoring, hypoglycemia risk if on insulin.
                    Contraindicated in pregnancy.
                  </div>
                </div>
              </>
            )}

            <div style={{ display:"flex", gap:10, marginTop:24 }}>
              <button className="btn btn-outline" style={{ flex:1 }} onClick={onClose}>Cancel</button>
              <button
                className="btn btn-blue"
                style={{ flex:2 }}
                disabled={!form.medication || !form.dose || !form.frequency}
                onClick={() => setStep(1)}
              >
                Review Prescription <ChevronRight size={15} />
              </button>
            </div>
          </div>
        )}

        {/* Step 1: Confirm */}
        {step === 1 && (
          <div className="fi">
            <div style={{
              background:"var(--slate-50)", border:"1px solid var(--slate-200)",
              borderRadius:var_r_lg, padding:"20px", marginBottom:20,
            }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
                <span className="serif" style={{ fontSize:17, color:"var(--slate-900)" }}>
                  Prescription Preview
                </span>
                <span className="badge b-blue">Digital Rx · Legally Valid</span>
              </div>

              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                {[
                  { l:"Patient",    v:patient.name },
                  { l:"Age / BMI",  v:`${patient.age} yrs / BMI ${patient.bmi}` },
                  { l:"Medication", v:selectedMed?.name },
                  { l:"Brand",      v:selectedMed?.brand },
                  { l:"Dose",       v:form.dose },
                  { l:"Frequency",  v:form.frequency },
                  { l:"Duration",   v:form.duration },
                  { l:"Refills",    v:`${form.refills} refills` },
                  { l:"Follow-up",  v:`In ${form.followUp}` },
                  { l:"Prescribing Doctor", v:DOCTOR.name },
                ].map(({ l, v }) => (
                  <div key={l}>
                    <div style={{ fontSize:10, color:"var(--slate-400)", fontWeight:700, marginBottom:2, letterSpacing:".06em" }}>{l.toUpperCase()}</div>
                    <div style={{ fontSize:13, fontWeight:600, color:"var(--slate-800)" }}>{v}</div>
                  </div>
                ))}
              </div>

              {form.instructions && (
                <div style={{ marginTop:14, paddingTop:14, borderTop:"1px solid var(--slate-200)" }}>
                  <div style={{ fontSize:10, color:"var(--slate-400)", fontWeight:700, marginBottom:4, letterSpacing:".06em" }}>SPECIAL INSTRUCTIONS</div>
                  <div style={{ fontSize:13, color:"var(--slate-700)", lineHeight:1.6 }}>{form.instructions}</div>
                </div>
              )}
            </div>

            <div style={{
              background:"var(--blue-s)", border:"1px solid rgba(37,99,235,.15)",
              borderRadius:var_r, padding:"12px 14px",
              display:"flex", gap:8, alignItems:"center", marginBottom:20,
            }}>
              <Shield size={14} color="var(--blue)" />
              <div style={{ fontSize:12, color:"var(--blue)", lineHeight:1.5 }}>
                Prescription will be digitally signed with your MCI credentials, sent to patient's
                SlimRx app, and forwarded to the dispensing pharmacy automatically.
              </div>
            </div>

            <div style={{ display:"flex", gap:10 }}>
              <button className="btn btn-outline" style={{ flex:1 }} onClick={() => setStep(0)}>
                ← Edit
              </button>
              <button
                className="btn btn-blue"
                style={{ flex:2 }}
                onClick={handleIssue}
                disabled={issuing}
              >
                {issuing ? (
                  <>
                    <div style={{ width:14, height:14, borderRadius:"50%", border:"2px solid rgba(255,255,255,.3)", borderTopColor:"white", animation:"spin .7s linear infinite" }} />
                    Issuing...
                  </>
                ) : (
                  <><Shield size={15} /> Issue Prescription</>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Issued */}
        {step === 2 && (
          <div className="fi" style={{ textAlign:"center", padding:"20px 0" }}>
            <div style={{
              width:72, height:72, borderRadius:"50%", background:"var(--green-s)",
              display:"flex", alignItems:"center", justifyContent:"center",
              margin:"0 auto 16px",
              animation:"fadeUp .4s cubic-bezier(.22,1,.36,1)",
            }}>
              <CheckCircle2 size={36} color="var(--green)" />
            </div>
            <h3 className="serif" style={{ fontSize:20, color:"var(--slate-900)", marginBottom:8 }}>
              Prescription Issued Successfully
            </h3>
            <p style={{ fontSize:13.5, color:"var(--slate-600)", lineHeight:1.65, marginBottom:20 }}>
              <strong>{patient.name}</strong> has been notified via app and SMS.
              Pharmacy has received the dispensing order. Follow-up scheduled in {form.followUp}.
            </p>

            <div style={{
              background:"var(--slate-50)", borderRadius:var_r_lg, padding:"14px 16px",
              display:"inline-flex", gap:10, alignItems:"center", marginBottom:24,
            }}>
              <FileText size={16} color="var(--blue)" />
              <div style={{ textAlign:"left" }}>
                <div style={{ fontSize:11, color:"var(--slate-500)", marginBottom:1 }}>Prescription ID</div>
                <div style={{ fontSize:14, fontWeight:700, color:"var(--slate-900)", fontFamily:"monospace" }}>
                  RX-{Date.now().toString(36).toUpperCase().slice(-8)}
                </div>
              </div>
            </div>

            <div style={{ display:"flex", gap:10 }}>
              <button className="btn btn-outline" style={{ flex:1 }} onClick={onClose}>
                <Download size={13} /> Download PDF
              </button>
              <button className="btn btn-blue" style={{ flex:1 }} onClick={() => { onIssue?.(); onClose(); }}>
                Back to Queue
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const var_r    = "var(--r)";
const var_r_lg = "var(--r-lg)";
const var_r_xl = "var(--r-xl)";

/* ═══════════════════════════════════════════════
   PATIENT DETAIL PANEL (right panel)
═══════════════════════════════════════════════ */
function PatientDetailPanel({ patient, onClose, onPrescribe }) {
  const [activeTab, setActiveTab] = useState("overview");
  const weightChange = patient.lastWeight
    ? (patient.weight - patient.lastWeight).toFixed(1)
    : null;

  const TABS = ["overview", "history", "notes"];

  const HISTORY_ITEMS = [
    { date:"May 10", type:"Weight Log",        note:"72.3 kg logged via app", icon:"⚖️" },
    { date:"May 1",  type:"Video Consultation", note:"Dose review — maintained 7mg", icon:"📹" },
    { date:"Apr 15", type:"Weight Log",         note:"74.1 kg — 3 month milestone", icon:"⚖️" },
    { date:"Apr 1",  type:"Prescription",       note:"SemaSlim 7mg renewed for 90 days", icon:"📋" },
    { date:"Mar 22", type:"Video Consultation", note:"2 month check-in. Excellent progress.", icon:"📹" },
    { date:"Feb 1",  type:"Initial Rx",         note:"SemaSlim 3mg starter prescribed", icon:"💊" },
  ];

  return (
    <div style={{
      width:360, flexShrink:0,
      background:var_white,
      borderLeft:`1px solid var(--slate-200)`,
      display:"flex", flexDirection:"column",
      height:"100%", overflow:"hidden",
      animation:"slideR .3s cubic-bezier(.22,1,.36,1)",
    }}>
      {/* Header */}
      <div style={{
        padding:"18px 20px",
        borderBottom:"1px solid var(--slate-200)",
        background:"linear-gradient(135deg,var(--navy),var(--navy2))",
      }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14 }}>
          <div style={{ display:"flex", gap:12, alignItems:"center" }}>
            <div style={{
              width:44, height:44, borderRadius:14, flexShrink:0, fontSize:24,
              background:"rgba(255,255,255,.1)", display:"flex", alignItems:"center", justifyContent:"center",
              border:"1px solid rgba(255,255,255,.15)",
            }}>{patient.avatar}</div>
            <div>
              <div style={{ fontWeight:700, fontSize:15, color:"white" }}>{patient.name}</div>
              <div style={{ fontSize:12, color:"rgba(255,255,255,.5)" }}>
                {patient.age}y · {patient.city} · BMI {patient.bmi}
              </div>
            </div>
          </div>
          <button onClick={onClose} style={{
            background:"rgba(255,255,255,.1)", border:"none", cursor:"pointer",
            width:28, height:28, borderRadius:"50%",
            display:"flex", alignItems:"center", justifyContent:"center",
          }}>
            <X size={14} color="rgba(255,255,255,.7)" />
          </button>
        </div>

        {/* Quick stats */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8 }}>
          {[
            { l:"Weight",    v:`${patient.weight} kg`, c:"white" },
            { l:"Change",    v:weightChange ? `${weightChange > 0 ? "+" : ""}${weightChange} kg` : "—",
              c: weightChange && weightChange < 0 ? "#6ee7b7" : weightChange > 0 ? "#fca5a5" : "white" },
            { l:"Adherence", v:patient.adherence ? `${patient.adherence}%` : "New", c:"white" },
          ].map(s => (
            <div key={s.l} style={{
              background:"rgba(255,255,255,.07)", borderRadius:8, padding:"8px 10px",
              border:"1px solid rgba(255,255,255,.08)",
            }}>
              <div style={{ fontSize:10, color:"rgba(255,255,255,.4)", marginBottom:2 }}>{s.l}</div>
              <div style={{ fontSize:15, fontWeight:800, color:s.c }}>{s.v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Status + medication */}
      <div style={{ padding:"14px 20px", borderBottom:"1px solid var(--slate-100)" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
          <span className={`badge ${patient.status === "active" ? "b-green" : patient.status === "new" ? "b-blue" : "b-slate"}`}>
            {patient.status === "active" ? "● Active" : patient.status === "new" ? "New Patient" : "Paused"}
          </span>
          <PriorityDot level={patient.priority || "normal"} />
        </div>
        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
          <div style={{
            width:30, height:30, borderRadius:8, flexShrink:0,
            background:"var(--blue-s)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:16,
          }}>💊</div>
          <div>
            <div style={{ fontSize:13, fontWeight:600, color:"var(--slate-800)" }}>{patient.med}</div>
            <div style={{ fontSize:11, color:"var(--slate-400)" }}>Current medication · Month {patient.months}</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display:"flex", borderBottom:"1px solid var(--slate-200)", flexShrink:0 }}>
        {TABS.map(t => (
          <button key={t} className={`tab ${activeTab === t ? "active" : ""}`}
            onClick={() => setActiveTab(t)}
            style={{ flex:1, textAlign:"center", textTransform:"capitalize" }}>
            {t}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div style={{ flex:1, overflowY:"auto", padding:"16px 20px" }}>
        {activeTab === "overview" && (
          <div className="fi">
            {[
              { l:"Consultation Type", v:patient.type },
              { l:"Scheduled Time",    v:patient.time },
              { l:"Wait Time",         v:patient.waitMins > 0 ? `${patient.waitMins} min` : "In progress" },
              { l:"Total Weight Lost", v:patient.lost > 0 ? `${patient.lost} kg` : "New — baseline today" },
              { l:"Months on Therapy", v:patient.months || "Starting today" },
              { l:"Last Visit",        v:patient.lastVisit },
            ].map(({ l, v }) => (
              <div key={l} style={{
                display:"flex", justifyContent:"space-between", alignItems:"center",
                padding:"9px 0", borderBottom:"1px solid var(--slate-100)",
                fontSize:13,
              }}>
                <span style={{ color:"var(--slate-500)" }}>{l}</span>
                <span style={{ fontWeight:600, color:"var(--slate-800)" }}>{v}</span>
              </div>
            ))}

            {patient.notes && (
              <div style={{
                background:"var(--slate-50)", borderRadius:var_r, padding:"12px",
                marginTop:14, borderLeft:"3px solid var(--blue2)",
              }}>
                <div style={{ fontSize:10, color:"var(--slate-400)", fontWeight:700, marginBottom:4, letterSpacing:".06em" }}>
                  DOCTOR NOTES
                </div>
                <div style={{ fontSize:13, color:"var(--slate-600)", lineHeight:1.6 }}>
                  {patient.notes}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === "history" && (
          <div className="fi">
            {HISTORY_ITEMS.map((item, i) => (
              <div key={i} className="tl-item">
                <div className="tl-dot" style={{ background:"var(--blue-s)", fontSize:14 }}>
                  {item.icon}
                </div>
                <div style={{ flex:1, paddingTop:4 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:3 }}>
                    <span style={{ fontSize:13, fontWeight:600, color:"var(--slate-800)" }}>{item.type}</span>
                    <span style={{ fontSize:11, color:"var(--slate-400)" }}>{item.date}</span>
                  </div>
                  <div style={{ fontSize:12.5, color:"var(--slate-500)", lineHeight:1.5 }}>{item.note}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "notes" && (
          <div className="fi">
            <textarea
              className="inp"
              rows={6}
              placeholder="Add clinical notes for this consultation…"
              defaultValue={patient.notes}
              style={{ resize:"vertical", marginBottom:10 }}
            />
            <button className="btn btn-blue btn-sm" style={{ width:"100%", justifyContent:"center" }}>
              <Check size={13} /> Save Notes
            </button>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div style={{
        padding:"14px 20px", borderTop:"1px solid var(--slate-200)",
        display:"flex", flexDirection:"column", gap:8, flexShrink:0,
      }}>
        <div style={{ display:"flex", gap:8 }}>
          <button className="btn btn-blue" style={{ flex:1, justifyContent:"center" }}
            onClick={() => onPrescribe(patient)}>
            <Pill size={14} /> Prescribe
          </button>
          <button className="btn btn-green-s btn-sm">
            <Video size={13} /> Call
          </button>
          <button className="btn btn-outline btn-sm">
            <MessageCircle size={13} />
          </button>
        </div>
        <button className="btn btn-outline" style={{ width:"100%", justifyContent:"center", fontSize:12 }}>
          <CheckCircle2 size={13} /> Mark Consultation Complete
        </button>
      </div>
    </div>
  );
}

const var_white = "var(--white)";

/* ═══════════════════════════════════════════════
   PAGE: DASHBOARD (Overview)
═══════════════════════════════════════════════ */
function PageDashboard({ onSelectPatient }) {
  return (
    <div style={{ padding:"24px", overflowY:"auto", height:"100%" }}>
      {/* Stats row */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:14, marginBottom:24 }}>
        <StatTile icon={Users}       label="Active Patients"    value={DOCTOR.activePatients} sub="Total registered"      color="var(--blue)"   delta={+8}  delay="d1" />
        <StatTile icon={Calendar}    label="Today's Consults"   value={DOCTOR.todayConsults}  sub="2 in progress"         color="var(--teal)"   delta={+4}  delay="d2" />
        <StatTile icon={Pill}        label="Pending Rx"         value={DOCTOR.pendingRx}      sub="Awaiting approval"     color="var(--amber)"  delta={null} delay="d3" />
        <StatTile icon={TrendingDown} label="Avg Weight Loss"   value="1.08 kg"               sub="Per patient / week"    color="var(--green)"  delta={+12} delay="d4" />
        <StatTile icon={Star}        label="Patient Rating"     value={`${DOCTOR.rating}★`}  sub="From 214 reviews"      color="var(--purple)" delta={null} delay="d5" />
        <StatTile icon={Award}       label="Adherence Rate"     value="88%"                   sub="Across all patients"   color="var(--cyan)"   delta={+3}  delay="d6" />
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:20, marginBottom:20 }}>
        {/* Today's Queue summary */}
        <div className="card fu d3" style={{ padding:"20px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
            <div>
              <h3 className="serif" style={{ fontSize:17, color:"var(--slate-900)" }}>Today's Queue</h3>
              <p style={{ fontSize:12, color:"var(--slate-400)", marginTop:1 }}>{QUEUE.length} consultations scheduled</p>
            </div>
            <span className="status-live">Live</span>
          </div>

          {QUEUE.slice(0, 4).map(q => (
            <div key={q.id}
              className="pt-row"
              onClick={() => onSelectPatient(q)}
              style={{ borderRadius:var_r }}
            >
              <PriorityDot level={q.priority} />
              <Avatar emoji={q.avatar} size={32} bg={q.status === "in-progress" ? "var(--blue-s)" : "var(--slate-100)"} />
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:13, fontWeight:600, color:"var(--slate-800)", marginBottom:2 }}>{q.name}</div>
                <div style={{ fontSize:11, color:"var(--slate-400)", whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
                  {q.type}
                </div>
              </div>
              <div style={{ textAlign:"right", flexShrink:0 }}>
                <div style={{ fontSize:12, fontWeight:600, color:"var(--slate-700)" }}>{q.time}</div>
                <span className={`badge ${q.status === "in-progress" ? "b-blue" : q.status === "waiting" ? "b-amber" : "b-slate"}`}>
                  {q.status === "in-progress" ? "Live" : q.status === "waiting" ? "Waiting" : "Sched."}
                </span>
              </div>
            </div>
          ))}

          <button className="btn btn-outline btn-sm" style={{ width:"100%", justifyContent:"center", marginTop:10 }}>
            View Full Queue <ChevronRight size={13} />
          </button>
        </div>

        {/* Weekly activity */}
        <div className="card fu d4" style={{ padding:"20px" }}>
          <h3 className="serif" style={{ fontSize:17, color:"var(--slate-900)", marginBottom:4 }}>This Week</h3>
          <p style={{ fontSize:12, color:"var(--slate-400)", marginBottom:16 }}>Consultations vs Prescriptions</p>

          <MiniBar data={WEEKLY_STATS} colorA="var(--blue)" colorB="var(--cyan2)" />

          <div style={{ display:"flex", justifyContent:"space-between", marginTop:8, marginBottom:16 }}>
            {WEEKLY_STATS.map(d => (
              <div key={d.day} style={{ fontSize:9, color:"var(--slate-400)", textAlign:"center", flex:1 }}>{d.day}</div>
            ))}
          </div>

          <div style={{ display:"flex", gap:16 }}>
            <div style={{ display:"flex", alignItems:"center", gap:6 }}>
              <div style={{ width:10, height:10, borderRadius:2, background:"var(--blue)" }} />
              <span style={{ fontSize:11, color:"var(--slate-500)" }}>Consults</span>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:6 }}>
              <div style={{ width:10, height:10, borderRadius:2, background:"var(--cyan2)" }} />
              <span style={{ fontSize:11, color:"var(--slate-500)" }}>Prescriptions</span>
            </div>
          </div>

          <div style={{ height:1, background:"var(--slate-200)", margin:"14px 0" }} />

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
            {[
              { l:"Total Consults", v:WEEKLY_STATS.reduce((a,d)=>a+d.consults,0) },
              { l:"Rx Issued",      v:WEEKLY_STATS.reduce((a,d)=>a+d.rx,0) },
            ].map(({ l, v }) => (
              <div key={l}>
                <div style={{ fontSize:11, color:"var(--slate-400)", marginBottom:2 }}>{l}</div>
                <div style={{ fontSize:20, fontWeight:800, color:"var(--slate-900)" }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alerts */}
      <div className="card fu d5" style={{ padding:"20px" }}>
        <h3 className="serif" style={{ fontSize:17, color:"var(--slate-900)", marginBottom:14 }}>
          Action Required
          <span className="badge b-red" style={{ marginLeft:10 }}>3 urgent</span>
        </h3>

        {[
          { icon:"🔴", text:"Meera Joshi — Prescription expires today. Issue renewal immediately.", action:"Issue Rx",   color:"var(--red)"   },
          { icon:"🟡", text:"Rajesh Kumar — Side effect report: nausea grade 2. Review within 2 hrs.", action:"Review",   color:"var(--amber)" },
          { icon:"🔵", text:"Suresh Pillai — New patient form complete. Initial consult at 12:00 PM.", action:"View",     color:"var(--blue)"  },
        ].map((a, i) => (
          <div key={i} style={{
            display:"flex", gap:12, alignItems:"center",
            padding:"12px", borderRadius:var_r_lg, marginBottom:8,
            background:"var(--slate-50)", border:"1px solid var(--slate-200)",
          }}>
            <span style={{ fontSize:18, flexShrink:0 }}>{a.icon}</span>
            <div style={{ flex:1, fontSize:13, color:"var(--slate-700)", lineHeight:1.5 }}>{a.text}</div>
            <button className="btn btn-outline btn-xs" style={{ flexShrink:0 }}>{a.action}</button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   PAGE: CONSULTATION QUEUE
═══════════════════════════════════════════════ */
function PageQueue({ onSelectPatient, selectedId }) {
  const [filter, setFilter] = useState("all");

  const filtered = filter === "all" ? QUEUE
    : QUEUE.filter(q => q.status === filter || q.priority === filter);

  const priorityColor = { urgent:"var(--red)", high:"var(--amber)", normal:"var(--green)", low:"var(--slate-400)" };
  const statusColor   = { "in-progress":"b-blue", waiting:"b-amber", scheduled:"b-slate" };

  return (
    <div style={{ padding:"20px 24px", overflowY:"auto", height:"100%" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
        <div>
          <h2 className="serif" style={{ fontSize:20, color:"var(--slate-900)" }}>Consultation Queue</h2>
          <p style={{ fontSize:12, color:"var(--slate-400)", marginTop:1 }}>
            {QUEUE.filter(q => q.status !== "scheduled").length} active · {QUEUE.filter(q => q.status === "scheduled").length} upcoming
          </p>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          {["all","in-progress","waiting","urgent"].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`btn btn-sm ${filter === f ? "btn-navy" : "btn-outline"}`}
              style={{ textTransform:"capitalize" }}>
              {f === "all" ? "All" : f === "in-progress" ? "Live" : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Queue table */}
      <div className="card" style={{ overflow:"hidden" }}>
        {/* Header */}
        <div style={{
          display:"grid",
          gridTemplateColumns:"28px 200px 160px 120px 80px 90px 80px 1fr",
          gap:0, padding:"10px 18px",
          background:"var(--slate-50)", borderBottom:"1px solid var(--slate-200)",
          fontSize:10, fontWeight:700, color:"var(--slate-400)", letterSpacing:".08em",
        }}>
          {["","PATIENT","TYPE","MEDICATION","TIME","STATUS","BMI",""].map((h,i) => (
            <div key={i}>{h}</div>
          ))}
        </div>

        {filtered.map((q, idx) => (
          <div
            key={q.id}
            onClick={() => onSelectPatient(q)}
            className={`fu d${Math.min(idx+1,6)}`}
            style={{
              display:"grid",
              gridTemplateColumns:"28px 200px 160px 120px 80px 90px 80px 1fr",
              gap:0, padding:"13px 18px",
              borderBottom:"1px solid var(--slate-100)",
              cursor:"pointer", transition:"background .15s",
              background: selectedId === q.id ? "var(--blue-s)" : "white",
              alignItems:"center",
            }}
            onMouseEnter={e => { if(selectedId !== q.id) e.currentTarget.style.background = "var(--slate-50)"; }}
            onMouseLeave={e => { if(selectedId !== q.id) e.currentTarget.style.background = "white"; }}
          >
            <PriorityDot level={q.priority} />

            <div style={{ display:"flex", gap:10, alignItems:"center" }}>
              <Avatar emoji={q.avatar} size={30} bg={selectedId === q.id ? "white" : "var(--slate-100)"} />
              <div>
                <div style={{ fontSize:13, fontWeight:600, color:"var(--slate-800)" }}>{q.name}</div>
                <div style={{ fontSize:11, color:"var(--slate-400)" }}>{q.age}y · {q.city}</div>
              </div>
            </div>

            <div style={{ fontSize:12.5, color:"var(--slate-600)" }}>{q.type}</div>
            <div style={{ fontSize:12, color:"var(--slate-500)", fontWeight:500 }}>{q.medication}</div>
            <div style={{ fontSize:13, fontWeight:600, color:"var(--slate-700)" }}>{q.time}</div>

            <span className={`badge ${statusColor[q.status]}`}>
              {q.status === "in-progress" ? "● Live" : q.status === "waiting" ? `Wait ${q.waitMins}m` : "Scheduled"}
            </span>

            <div style={{ fontSize:13, fontWeight:600, color:"var(--slate-700)" }}>{q.bmi}</div>

            <div style={{ display:"flex", gap:6, justifyContent:"flex-end" }}>
              <button className="btn btn-blue btn-xs" onClick={e => { e.stopPropagation(); onSelectPatient(q); }}>
                <Eye size={11} /> View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   PAGE: ALL PATIENTS
═══════════════════════════════════════════════ */
function PagePatients({ onSelectPatient }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = ALL_PATIENTS.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.city.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div style={{ padding:"24px", overflowY:"auto", height:"100%" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
        <div>
          <h2 className="serif" style={{ fontSize:20, color:"var(--slate-900)" }}>All Patients</h2>
          <p style={{ fontSize:12, color:"var(--slate-400)", marginTop:1 }}>{ALL_PATIENTS.length} total</p>
        </div>
        <button className="btn btn-blue btn-sm"><Plus size={13} /> Add Patient</button>
      </div>

      {/* Search + filter */}
      <div style={{ display:"flex", gap:12, marginBottom:18 }}>
        <div className="search-wrap" style={{ flex:1 }}>
          <Search size={15} color="var(--slate-400)" />
          <input className="search-inp" placeholder="Search by name or city…"
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div style={{ display:"flex", gap:6 }}>
          {["all","active","new","paused"].map(s => (
            <button key={s} className={`btn btn-sm ${statusFilter === s ? "btn-navy" : "btn-outline"}`}
              onClick={() => setStatusFilter(s)}
              style={{ textTransform:"capitalize" }}>
              {s === "all" ? "All" : s}
            </button>
          ))}
        </div>
      </div>

      {/* Patient cards grid */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:14 }}>
        {filtered.map((p, i) => (
          <div key={p.id}
            className={`card card-hover fu d${Math.min(i+1,6)}`}
            onClick={() => onSelectPatient({ ...p, type:"Check-in", time:"—", priority:"normal", lastWeight:null, waitMins:0, notes:"" })}
            style={{ padding:"18px", cursor:"pointer" }}
          >
            <div style={{ display:"flex", gap:12, alignItems:"flex-start", marginBottom:14 }}>
              <Avatar emoji={p.avatar} size={40} bg="var(--slate-100)" />
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:3 }}>
                  <span style={{ fontSize:14, fontWeight:700, color:"var(--slate-900)" }}>{p.name}</span>
                  <span className={`badge ${p.status === "active" ? "b-green" : p.status === "new" ? "b-blue" : "b-slate"}`}>
                    {p.status}
                  </span>
                </div>
                <div style={{ fontSize:12, color:"var(--slate-400)" }}>{p.age}y · {p.city} · BMI {p.bmi}</div>
              </div>
            </div>

            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, marginBottom:12 }}>
              {[
                { l:"Lost",       v:p.lost > 0 ? `${p.lost} kg` : "New" },
                { l:"Months",     v:p.months || "—" },
                { l:"Adherence",  v:p.adherence > 0 ? `${p.adherence}%` : "—" },
              ].map(({ l, v }) => (
                <div key={l} style={{
                  background:"var(--slate-50)", borderRadius:8, padding:"8px",
                  border:"1px solid var(--slate-200)", textAlign:"center",
                }}>
                  <div style={{ fontSize:11, color:"var(--slate-400)", marginBottom:2 }}>{l}</div>
                  <div style={{ fontSize:14, fontWeight:700, color:"var(--slate-800)" }}>{v}</div>
                </div>
              ))}
            </div>

            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <div style={{ fontSize:12, color:"var(--slate-400)" }}>
                💊 {p.med} · Last: {p.lastVisit}
              </div>
              <ChevronRight size={14} color="var(--slate-400)" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   PAGE: PRESCRIPTIONS
═══════════════════════════════════════════════ */
function PagePrescriptions() {
  const RX_LIST = [
    { id:"RX-2025-0541", patient:"Priya Mehta",   med:"SemaSlim 7mg",  issued:"May 1",  valid:"Jul 31",  status:"active",  refills:2 },
    { id:"RX-2025-0540", patient:"Arjun Nair",    med:"LiraDose 3mg",  issued:"May 1",  valid:"Jul 31",  status:"active",  refills:1 },
    { id:"RX-2025-0539", patient:"Kiran Patel",   med:"SemaPen XR 2.4",issued:"Apr 20", valid:"Jul 20",  status:"active",  refills:3 },
    { id:"RX-2025-0538", patient:"Meera Joshi",   med:"SemaSlim 7mg",  issued:"Feb 1",  valid:"May 26",  status:"expiring",refills:0 },
    { id:"RX-2025-0537", patient:"Divya Sharma",  med:"SemaSlim 7mg",  issued:"Mar 15", valid:"May 15",  status:"expired", refills:0 },
  ];

  return (
    <div style={{ padding:"24px", overflowY:"auto", height:"100%" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
        <div>
          <h2 className="serif" style={{ fontSize:20, color:"var(--slate-900)" }}>Prescriptions</h2>
          <p style={{ fontSize:12, color:"var(--slate-400)", marginTop:1 }}>Digital Rx issued by you</p>
        </div>
        <button className="btn btn-blue btn-sm"><Plus size={13} /> Issue New Rx</button>
      </div>

      <div className="card" style={{ overflow:"hidden" }}>
        <div style={{
          display:"grid", gridTemplateColumns:"160px 1fr 130px 100px 100px 90px 100px",
          padding:"10px 18px", background:"var(--slate-50)", borderBottom:"1px solid var(--slate-200)",
          fontSize:10, fontWeight:700, color:"var(--slate-400)", letterSpacing:".08em",
        }}>
          {["RX ID","PATIENT · MEDICATION","ISSUED","VALID UNTIL","REFILLS","STATUS",""].map((h,i) => (
            <div key={i}>{h}</div>
          ))}
        </div>

        {RX_LIST.map((rx, i) => (
          <div key={rx.id} className={`fu d${Math.min(i+1,5)}`} style={{
            display:"grid", gridTemplateColumns:"160px 1fr 130px 100px 100px 90px 100px",
            padding:"13px 18px", borderBottom:"1px solid var(--slate-100)",
            fontSize:13, alignItems:"center",
          }}>
            <div style={{ fontFamily:"monospace", fontSize:12, color:"var(--slate-600)", fontWeight:600 }}>{rx.id}</div>
            <div>
              <div style={{ fontWeight:600, color:"var(--slate-800)" }}>{rx.patient}</div>
              <div style={{ fontSize:11, color:"var(--slate-400)" }}>{rx.med}</div>
            </div>
            <div style={{ color:"var(--slate-600)" }}>{rx.issued}</div>
            <div style={{ color:"var(--slate-600)" }}>{rx.valid}</div>
            <div style={{ color:"var(--slate-600)" }}>{rx.refills} left</div>
            <span className={`badge ${rx.status === "active" ? "b-green" : rx.status === "expiring" ? "b-amber" : "b-slate"}`}>
              {rx.status === "expiring" ? "⚠ Expiring" : rx.status}
            </span>
            <div style={{ display:"flex", gap:6 }}>
              <button className="btn btn-outline btn-xs"><Download size={11} /></button>
              {(rx.status === "expiring" || rx.status === "expired") && (
                <button className="btn btn-blue btn-xs">Renew</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   NOTIFICATIONS DROPDOWN
═══════════════════════════════════════════════ */
function NotifDropdown({ onClose }) {
  return (
    <div style={{
      position:"absolute", top:52, right:0, width:340, zIndex:200,
      background:"var(--white)", borderRadius:var_r_xl,
      border:"1px solid var(--slate-200)", boxShadow:"var(--sh-lg)",
      overflow:"hidden", animation:"fadeUp .25s cubic-bezier(.22,1,.36,1)",
    }}>
      <div style={{
        padding:"14px 18px", borderBottom:"1px solid var(--slate-200)",
        display:"flex", justifyContent:"space-between", alignItems:"center",
      }}>
        <span style={{ fontWeight:700, fontSize:14, color:"var(--slate-900)" }}>Notifications</span>
        <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer" }}>
          <X size={15} color="var(--slate-400)" />
        </button>
      </div>
      {NOTIFICATIONS_DATA.map(n => (
        <div key={n.id} className={`notif-item ${!n.read ? "unread" : ""}`}>
          <div style={{
            width:32, height:32, borderRadius:10, flexShrink:0, fontSize:15,
            background:"var(--slate-100)", display:"flex", alignItems:"center", justifyContent:"center",
          }}>
            {n.type === "urgent" ? "🔴" : n.type === "alert" ? "🟡" : n.type === "new" ? "🔵" : "ℹ️"}
          </div>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontSize:12.5, color:"var(--slate-700)", lineHeight:1.5, marginBottom:2 }}>{n.text}</div>
            <div style={{ fontSize:11, color:"var(--slate-400)" }}>{n.time}</div>
          </div>
          {!n.read && <div style={{ width:7, height:7, borderRadius:"50%", background:"var(--blue)", flexShrink:0, marginTop:4 }} />}
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   ROOT APP
═══════════════════════════════════════════════ */
const NAV_ITEMS = [
  { id:"dashboard",     label:"Dashboard",     icon:BarChart2 },
  { id:"queue",         label:"Queue",         icon:Clock,    badge:QUEUE.filter(q=>q.status!=="scheduled").length },
  { id:"patients",      label:"Patients",      icon:Users },
  { id:"prescriptions", label:"Prescriptions", icon:FileText },
];

export default function DoctorDashboard() {
  const [activePage,   setActivePage]   = useState("dashboard");
  const [selectedPt,   setSelectedPt]   = useState(null);
  const [prescribeFor, setPrescribeFor] = useState(null);
  const [showNotifs,   setShowNotifs]   = useState(false);
  const unread = NOTIFICATIONS_DATA.filter(n => !n.read).length;

  const handleSelectPatient = (pt) => {
    setSelectedPt(pt);
    if (activePage === "dashboard") setActivePage("queue");
  };

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":     return <PageDashboard    onSelectPatient={handleSelectPatient} />;
      case "queue":         return <PageQueue         onSelectPatient={setSelectedPt} selectedId={selectedPt?.id} />;
      case "patients":      return <PagePatients      onSelectPatient={setSelectedPt} />;
      case "prescriptions": return <PagePrescriptions />;
      default:              return <PageDashboard    onSelectPatient={handleSelectPatient} />;
    }
  };

  return (
    <>
      <style>{CSS}</style>
      <div style={{ display:"flex", height:"100vh", width:"100vw", overflow:"hidden" }}>

        {/* ── Sidebar ── */}
        <aside style={{
          width:220, flexShrink:0,
          background:"linear-gradient(180deg,var(--navy) 0%,var(--navy2) 100%)",
          display:"flex", flexDirection:"column",
          padding:"20px 14px",
          borderRight:"1px solid rgba(255,255,255,.06)",
        }}>
          {/* Logo */}
          <div style={{ display:"flex", alignItems:"center", gap:10, padding:"4px 8px", marginBottom:28 }}>
            <div style={{
              width:32, height:32, borderRadius:9,
              background:"linear-gradient(135deg,var(--blue),var(--cyan))",
              display:"flex", alignItems:"center", justifyContent:"center",
            }}>
              <Activity size={16} color="white" />
            </div>
            <div>
              <div className="serif" style={{ color:"white", fontSize:16, fontStyle:"italic", lineHeight:1 }}>SlimRx</div>
              <div style={{ fontSize:9, color:"rgba(255,255,255,.35)", letterSpacing:".08em" }}>PHYSICIAN PORTAL</div>
            </div>
          </div>

          {/* Doctor card */}
          <div style={{
            background:"rgba(255,255,255,.06)", borderRadius:var_r_lg,
            padding:"12px", marginBottom:20,
            border:"1px solid rgba(255,255,255,.08)",
          }}>
            <div style={{ display:"flex", gap:10, alignItems:"center", marginBottom:8 }}>
              <div style={{
                width:36, height:36, borderRadius:11, flexShrink:0, fontSize:20,
                display:"flex", alignItems:"center", justifyContent:"center",
                background:"rgba(255,255,255,.1)",
              }}>{DOCTOR.avatar}</div>
              <div>
                <div style={{ fontWeight:700, fontSize:12.5, color:"white", lineHeight:1.2 }}>{DOCTOR.name}</div>
                <div style={{ fontSize:10, color:"rgba(255,255,255,.4)", marginTop:1 }}>MD Endocrinology</div>
              </div>
            </div>
            <div style={{ display:"flex", gap:4 }}>
              <span className="status-live" style={{ fontSize:10 }}>Available</span>
            </div>
          </div>

          {/* Nav */}
          <nav style={{ flex:1, display:"flex", flexDirection:"column", gap:2 }}>
            <div className="sec-label" style={{ color:"rgba(255,255,255,.25)", padding:"0 8px", marginBottom:6 }}>
              NAVIGATION
            </div>
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                className={`snav ${activePage === item.id ? "active" : ""}`}
                onClick={() => setActivePage(item.id)}
              >
                <item.icon size={16} />
                <span style={{ flex:1, textAlign:"left" }}>{item.label}</span>
                {item.badge > 0 && (
                  <span style={{
                    background:"var(--blue)", color:"white",
                    fontSize:10, fontWeight:800, padding:"1px 6px", borderRadius:100,
                    minWidth:18, textAlign:"center",
                  }}>{item.badge}</span>
                )}
              </button>
            ))}
          </nav>

          {/* Bottom */}
          <div style={{ marginTop:"auto" }}>
            <div style={{ height:1, background:"rgba(255,255,255,.08)", margin:"12px 0" }} />
            <button className="snav" onClick={() => {}}>
              <Settings size={16} /> Settings
            </button>
            <button className="snav" onClick={() => {}}>
              <LogOut size={16} /> Sign Out
            </button>
          </div>
        </aside>

        {/* ── Main area ── */}
        <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden", minWidth:0 }}>

          {/* Top bar */}
          <header style={{
            height:54, flexShrink:0,
            background:"var(--white)",
            borderBottom:"1px solid var(--slate-200)",
            padding:"0 24px",
            display:"flex", alignItems:"center", justifyContent:"space-between",
            boxShadow:"0 1px 3px rgba(0,0,0,.06)",
            position:"relative",
          }}>
            <div>
              <div style={{ fontWeight:700, fontSize:15, color:"var(--slate-900)" }}>
                {NAV_ITEMS.find(n => n.id === activePage)?.label || "Dashboard"}
              </div>
              <div style={{ fontSize:11, color:"var(--slate-400)" }}>
                {new Date().toLocaleDateString("en-IN", { weekday:"long", day:"2-digit", month:"long", year:"numeric" })}
              </div>
            </div>

            <div style={{ display:"flex", gap:10, alignItems:"center", position:"relative" }}>
              <div style={{ position:"relative" }}>
                <button
                  onClick={() => setShowNotifs(s => !s)}
                  style={{
                    width:36, height:36, borderRadius:10,
                    background:"var(--slate-100)", border:"1px solid var(--slate-200)",
                    display:"flex", alignItems:"center", justifyContent:"center",
                    cursor:"pointer", position:"relative",
                  }}
                >
                  <Bell size={16} color="var(--slate-600)" />
                  {unread > 0 && (
                    <div style={{
                      position:"absolute", top:-2, right:-2,
                      width:16, height:16, borderRadius:"50%",
                      background:"var(--red)", color:"white",
                      fontSize:9, fontWeight:800,
                      display:"flex", alignItems:"center", justifyContent:"center",
                      border:"2px solid white",
                    }}>{unread}</div>
                  )}
                </button>
                {showNotifs && <NotifDropdown onClose={() => setShowNotifs(false)} />}
              </div>

              <div style={{
                display:"flex", alignItems:"center", gap:8,
                padding:"6px 12px", borderRadius:var_r_lg,
                background:"var(--slate-50)", border:"1px solid var(--slate-200)",
                cursor:"pointer",
              }}>
                <span style={{ fontSize:18 }}>{DOCTOR.avatar}</span>
                <div>
                  <div style={{ fontSize:12, fontWeight:700, color:"var(--slate-800)", lineHeight:1 }}>
                    {DOCTOR.name.split(" ").slice(0,2).join(" ")}
                  </div>
                  <div style={{ fontSize:10, color:"var(--slate-400)" }}>MCI {DOCTOR.reg}</div>
                </div>
                <ChevronDown size={13} color="var(--slate-400)" />
              </div>
            </div>
          </header>

          {/* Content + detail panel */}
          <div style={{ flex:1, display:"flex", overflow:"hidden" }}>
            {/* Page content */}
            <div style={{ flex:1, overflowY:"auto", background:"var(--slate-100)" }}>
              {renderPage()}
            </div>

            {/* Patient detail panel (slides in) */}
            {selectedPt && (
              <PatientDetailPanel
                patient={selectedPt}
                onClose={() => setSelectedPt(null)}
                onPrescribe={pt => setPrescribeFor(pt)}
              />
            )}
          </div>
        </div>
      </div>

      {/* Prescribe modal */}
      {prescribeFor && (
        <PrescribeModal
          patient={prescribeFor}
          onClose={() => setPrescribeFor(null)}
          onIssue={() => setPrescribeFor(null)}
        />
      )}
    </>
  );
}
