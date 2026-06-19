import { useState, useEffect, useRef } from "react";
import {
  Activity, ArrowLeft, ArrowRight, Check, CheckCircle2,
  ChevronRight, Clock, Calendar, Video, Phone, MessageCircle,
  Shield, Lock, CreditCard, Smartphone, Building2, Wallet,
  Star, MapPin, Award, Users, Stethoscope, Pill, AlertTriangle,
  Info, X, ChevronLeft, ChevronDown, Zap, Heart, FileText,
  Truck, RefreshCw, Copy, TrendingDown, Gift, Bell
} from "lucide-react";

/* ═══════════════════════════════════════════════════
   STYLES
   Aesthetic: Luxury editorial — off-white canvas,
   deep navy, warm gold accents. Like a premium
   private clinic booking system.
   Fonts: Gilda Display (headings) + Jost (body)
═══════════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Jost:wght@300;400;500;600;700;800&family=Gilda+Display&display=swap');

*,*::before,*::after { box-sizing:border-box; margin:0; padding:0; }
:root {
  --navy:    #0d1b2a;
  --navy2:   #1b2d42;
  --navy3:   #243347;
  --gold:    #c9933a;
  --gold2:   #e8b96a;
  --gold3:   #f5d799;
  --gold-s:  #fdf6e9;
  --teal:    #0f766e;
  --teal2:   #14b8a6;
  --teal-s:  #f0fdfa;
  --blue:    #1d4ed8;
  --blue-s:  #eff6ff;
  --green:   #15803d;
  --green-s: #f0fdf4;
  --red:     #dc2626;
  --red-s:   #fef2f2;
  --amber:   #d97706;
  --ink:     #0f172a;
  --ink2:    #1e293b;
  --text:    #334155;
  --text2:   #64748b;
  --text3:   #94a3b8;
  --border:  #e2e8f0;
  --border2: #f1f5f9;
  --bg:      #f8f7f4;
  --bg2:     #f2f0ec;
  --white:   #ffffff;
  --r:       10px;
  --r-lg:    16px;
  --r-xl:    22px;
  --r-2xl:   32px;
  --sh:      0 1px 4px rgba(0,0,0,.06), 0 2px 8px rgba(0,0,0,.04);
  --sh-md:   0 4px 20px rgba(0,0,0,.09), 0 2px 6px rgba(0,0,0,.04);
  --sh-lg:   0 16px 48px rgba(0,0,0,.12), 0 4px 12px rgba(0,0,0,.06);
}
html, body, #root { height:100%; overflow:hidden; }
body {
  font-family:'Jost', sans-serif;
  background:var(--bg);
  color:var(--text);
  -webkit-font-smoothing:antialiased;
}
.gilda { font-family:'Gilda Display', Georgia, serif; }

/* Keyframes */
@keyframes fadeUp  { from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:translateY(0);} }
@keyframes fadeIn  { from{opacity:0;}to{opacity:1;} }
@keyframes slideR  { from{opacity:0;transform:translateX(20px);}to{opacity:1;transform:translateX(0);} }
@keyframes slideL  { from{opacity:0;transform:translateX(-20px);}to{opacity:1;transform:translateX(0);} }
@keyframes spin    { to{transform:rotate(360deg);} }
@keyframes pulse   { 0%,100%{opacity:1;}50%{opacity:.5;} }
@keyframes pop     { 0%{transform:scale(0);}60%{transform:scale(1.15);}100%{transform:scale(1);} }
@keyframes shimmer { 0%{background-position:-200% center;}100%{background-position:200% center;} }
@keyframes float   { 0%,100%{transform:translateY(0);}50%{transform:translateY(-6px);} }
@keyframes tick    { from{stroke-dashoffset:100;}to{stroke-dashoffset:0;} }

.fu  { animation:fadeUp .45s cubic-bezier(.22,1,.36,1) both; }
.fi  { animation:fadeIn .3s ease both; }
.sr  { animation:slideR .4s cubic-bezier(.22,1,.36,1) both; }
.sl  { animation:slideL .4s cubic-bezier(.22,1,.36,1) both; }
.d1  { animation-delay:.05s; opacity:0; }
.d2  { animation-delay:.10s; opacity:0; }
.d3  { animation-delay:.15s; opacity:0; }
.d4  { animation-delay:.20s; opacity:0; }
.d5  { animation-delay:.25s; opacity:0; }
.d6  { animation-delay:.30s; opacity:0; }

/* Scrollbar */
::-webkit-scrollbar { width:5px; }
::-webkit-scrollbar-thumb { background:var(--border); border-radius:3px; }

/* Step indicator */
.step-bar {
  height:3px; border-radius:2px;
  transition:background .4s, flex .4s;
}
.step-bar.done   { background:var(--teal2); flex:1; }
.step-bar.active { background:var(--gold); flex:2; }
.step-bar.idle   { background:var(--border2); flex:1; }

/* Calendar day */
.cal-day {
  width:42px; height:42px; border-radius:12px;
  display:flex; align-items:center; justify-content:center;
  flex-direction:column; cursor:pointer;
  transition:all .18s; border:1.5px solid transparent;
  font-family:'Jost',sans-serif;
}
.cal-day:hover:not(.disabled):not(.selected) {
  background:var(--gold-s); border-color:var(--gold2);
}
.cal-day.selected {
  background:var(--navy); color:var(--white);
  border-color:var(--navy); box-shadow:0 4px 12px rgba(13,27,42,.25);
}
.cal-day.today:not(.selected) {
  border-color:var(--gold); color:var(--gold);
  font-weight:800;
}
.cal-day.disabled {
  opacity:.3; cursor:not-allowed;
}
.cal-day.has-slots::after {
  content:''; width:5px; height:5px; border-radius:50%;
  background:var(--teal2); margin-top:2px;
}

/* Time slot */
.t-slot {
  padding:10px 14px; border-radius:var(--r);
  border:1.5px solid var(--border);
  font-size:13px; font-weight:700; text-align:center;
  cursor:pointer; transition:all .18s;
  font-family:'Jost',sans-serif; color:var(--text2);
  background:var(--white);
}
.t-slot:hover:not(.booked) {
  border-color:var(--gold2); color:var(--navy);
  background:var(--gold-s);
}
.t-slot.selected {
  border-color:var(--navy); background:var(--navy);
  color:var(--white); box-shadow:0 4px 12px rgba(13,27,42,.2);
}
.t-slot.booked { opacity:.35; cursor:not-allowed; text-decoration:line-through; }
.t-slot.few-left { border-color:var(--amber); color:var(--amber); }

/* Mode card */
.mode-card {
  display:flex; align-items:center; gap:14px;
  padding:16px 18px; border-radius:var(--r-xl);
  border:2px solid var(--border); cursor:pointer;
  transition:all .2s; background:var(--white);
}
.mode-card:hover { border-color:var(--gold2); box-shadow:var(--sh); }
.mode-card.selected {
  border-color:var(--navy);
  background:linear-gradient(135deg,rgba(13,27,42,.03),rgba(13,27,42,.01));
  box-shadow:0 0 0 3px rgba(13,27,42,.08), var(--sh-md);
}

/* Input */
.inp {
  width:100%; padding:12px 16px;
  border:1.5px solid var(--border); border-radius:var(--r-lg);
  font-family:'Jost',sans-serif; font-size:14px;
  color:var(--ink); background:var(--white); outline:none;
  transition:border-color .18s, box-shadow .18s;
}
.inp:focus { border-color:var(--gold2); box-shadow:0 0 0 3px rgba(201,147,58,.12); }
.inp::placeholder { color:var(--text3); }
.inp.err { border-color:var(--red); }
label.lbl { display:block; font-size:11.5px; font-weight:700;
  color:var(--text2); margin-bottom:6px; letter-spacing:.04em; }

/* Btn */
.btn {
  display:inline-flex; align-items:center; justify-content:center; gap:7px;
  padding:13px 24px; border-radius:var(--r-lg); border:none;
  font-family:'Jost',sans-serif; font-size:14px; font-weight:700;
  cursor:pointer; transition:all .2s; line-height:1; white-space:nowrap;
}
.btn-navy {
  background:linear-gradient(135deg,var(--navy),var(--navy2));
  color:var(--white);
  box-shadow:0 4px 14px rgba(13,27,42,.28);
}
.btn-navy:hover { transform:translateY(-1px); box-shadow:0 8px 24px rgba(13,27,42,.38); }
.btn-navy:active { transform:translateY(0); }
.btn-navy:disabled { opacity:.4; cursor:not-allowed; transform:none !important; }
.btn-gold {
  background:linear-gradient(135deg,var(--gold),#b8822a);
  color:var(--white);
  box-shadow:0 4px 14px rgba(201,147,58,.35);
}
.btn-gold:hover { transform:translateY(-1px); box-shadow:0 8px 22px rgba(201,147,58,.45); }
.btn-gold:disabled { opacity:.4; cursor:not-allowed; transform:none !important; }
.btn-outline { background:transparent; border:1.5px solid var(--border); color:var(--text2); }
.btn-outline:hover { border-color:var(--navy); color:var(--navy); background:rgba(13,27,42,.03); }
.btn-shimmer {
  background-size:200% auto;
  background-image:linear-gradient(90deg,var(--navy) 0%,var(--navy3) 40%,var(--gold) 60%,var(--navy) 100%);
  color:var(--white); animation:shimmer 3s linear infinite;
  box-shadow:0 4px 20px rgba(13,27,42,.3);
}
.btn-shimmer:hover { opacity:.92; transform:translateY(-1px); }
.btn-sm { padding:9px 16px; font-size:13px; }
.btn-xs { padding:7px 12px; font-size:12px; }

/* Card */
.card {
  background:var(--white); border:1px solid var(--border2);
  border-radius:var(--r-xl); box-shadow:var(--sh);
  transition:box-shadow .22s;
}

/* Badge */
.badge { display:inline-flex; align-items:center; gap:4px;
  padding:3px 9px; border-radius:100px;
  font-size:11px; font-weight:700; }
.b-navy  { background:rgba(13,27,42,.08);  color:var(--navy2); }
.b-gold  { background:var(--gold-s);       color:var(--gold); }
.b-teal  { background:var(--teal-s);       color:var(--teal); }
.b-green { background:var(--green-s);      color:var(--green); }
.b-red   { background:var(--red-s);        color:var(--red); }

/* Pay tab */
.pay-tab {
  flex:1; padding:12px 8px; border-radius:var(--r-lg);
  border:1.5px solid var(--border); cursor:pointer;
  transition:all .18s; background:var(--white);
  display:flex; flex-direction:column; align-items:center; gap:5px;
  font-family:'Jost',sans-serif;
}
.pay-tab:hover { border-color:var(--gold2); background:var(--gold-s); }
.pay-tab.active { border-color:var(--navy); background:var(--navy);
  box-shadow:0 4px 14px rgba(13,27,42,.2); }
.pay-tab .pt-icon { font-size:22px; }
.pay-tab .pt-label { font-size:11px; font-weight:700;
  color:var(--text2); transition:color .18s; }
.pay-tab.active .pt-label { color:rgba(255,255,255,.8); }

/* OTP input */
.otp-inp {
  width:48px; height:56px; border-radius:var(--r-lg);
  border:2px solid var(--border); font-family:'Jost',sans-serif;
  font-size:24px; font-weight:800; text-align:center;
  color:var(--ink); background:var(--white); outline:none;
  transition:border-color .18s, box-shadow .18s;
}
.otp-inp:focus { border-color:var(--gold2); box-shadow:0 0 0 3px rgba(201,147,58,.15); }
.otp-inp.filled { border-color:var(--navy); background:var(--bg); }

/* Progress tick animation */
.progress-circle-fill {
  stroke-dasharray:100;
  animation:tick .6s cubic-bezier(.22,1,.36,1) forwards;
}

/* Summary row */
.sum-row {
  display:flex; justify-content:space-between; align-items:center;
  padding:10px 0; border-bottom:1px solid var(--border2);
  font-size:14px;
}
.sum-row:last-child { border-bottom:none; }

/* Stepper sidebar */
.sidebar-step {
  display:flex; gap:12px; padding:14px 16px;
  border-radius:var(--r-lg); transition:background .2s;
}
.sidebar-step.active { background:var(--gold-s); }
.sidebar-step.done   { background:var(--green-s); }
`;

/* ═══════════════════════════════════════════════════
   MOCK DATA
═══════════════════════════════════════════════════ */
const DOCTOR = {
  id:"D001", name:"Dr. Kavitha Rajan",
  title:"MD Endocrinology, DM Metabolism",
  hospital:"Breach Candy Hospital · Mumbai",
  avatar:"👩‍⚕️", rating:4.97, reviews:214,
  exp:14, patients:892, fee:800,
  languages:["English","Hindi","Tamil"],
  modes:["video","phone","chat"],
  tags:["GLP-1 Expert","PCOS","Type 2 Diabetes"],
  successRate:94, avgLoss:11.2,
  about:"Senior Endocrinologist with 14 years specialising in GLP-1 therapy and metabolic disorders.",
};

const MEDICATIONS = [
  { id:"sema-oral", name:"SemaSlim™ 7mg Oral",  maker:"Sun Pharma",   price:1299, icon:"💊", type:"oral"      },
  { id:"sema-pen",  name:"SemaPen™ XR 2.4mg",   maker:"Zydus Cadila", price:2199, icon:"💉", type:"injection" },
  { id:"lira-pen",  name:"LiraDose™ 3mg Pen",   maker:"Cipla Ltd.",   price:1799, icon:"💉", type:"injection" },
];

/* Generate next 14 days */
function getCalendarDays() {
  const days = [];
  const today = new Date();
  for (let i = 0; i < 14; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    days.push({
      date: d,
      label: d.toLocaleDateString("en-IN", { day:"2-digit" }),
      weekday: d.toLocaleDateString("en-IN", { weekday:"short" }),
      month: d.toLocaleDateString("en-IN", { month:"short" }),
      isToday: i === 0,
      isSunday: d.getDay() === 0,
      hasSlots: i !== 0 || true, // all days have slots except Sunday
    });
  }
  return days;
}

const SLOT_TIMES = {
  morning:   ["9:00 AM","9:30 AM","10:00 AM","10:30 AM","11:00 AM","11:30 AM"],
  afternoon: ["12:00 PM","12:30 PM","2:00 PM","2:30 PM","3:00 PM","3:30 PM"],
  evening:   ["4:00 PM","4:30 PM","5:00 PM","5:30 PM","6:00 PM","6:30 PM"],
};
const BOOKED_SLOTS = ["9:00 AM","10:30 AM","12:30 PM","2:00 PM","4:30 PM","5:30 PM"];
const FEW_LEFT     = ["9:30 AM","11:30 AM","3:00 PM","6:00 PM"];

const CONSULT_MODES = [
  { id:"video", label:"Video Call",    icon:Video,          color:"var(--teal)",  sub:"Face-to-face, HD quality",    time:"30 min" },
  { id:"phone", label:"Phone Call",    icon:Phone,          color:"var(--blue)",  sub:"Audio only, private",         time:"20 min" },
  { id:"chat",  label:"Text Chat",     icon:MessageCircle,  color:"var(--gold)",  sub:"Async, reply within 2 hrs",   time:"Async"  },
];

const BOOKING_STEPS = [
  { id:"doctor",   label:"Doctor",        icon:Stethoscope },
  { id:"datetime", label:"Date & Time",   icon:Calendar    },
  { id:"type",     label:"Consult Type",  icon:Video       },
  { id:"details",  label:"Your Details",  icon:FileText    },
  { id:"addons",   label:"Add-ons",       icon:Pill        },
  { id:"payment",  label:"Payment",       icon:CreditCard  },
  { id:"confirm",  label:"Confirm",       icon:CheckCircle2},
];

/* ═══════════════════════════════════════════════════
   HELPER COMPONENTS
═══════════════════════════════════════════════════ */
function Spinner({ size=16, color="white" }) {
  return <div style={{ width:size, height:size, borderRadius:"50%",
    border:`2.5px solid rgba(255,255,255,.25)`, borderTopColor:color,
    animation:"spin .75s linear infinite", flexShrink:0 }} />;
}

function StepSidebar({ steps, current }) {
  const idx = steps.findIndex(s => s.id === current);
  return (
    <div style={{
      width:220, flexShrink:0,
      background:"var(--white)",
      borderRight:"1px solid var(--border2)",
      padding:"28px 16px",
      display:"flex", flexDirection:"column",
      gap:4,
    }}>
      {/* Logo */}
      <div style={{ display:"flex", alignItems:"center", gap:9, marginBottom:28, padding:"0 8px" }}>
        <div style={{ width:30, height:30, borderRadius:9,
          background:"linear-gradient(135deg,var(--navy),var(--navy2))",
          display:"flex", alignItems:"center", justifyContent:"center" }}>
          <Activity size={15} color="white" />
        </div>
        <span className="gilda" style={{ fontSize:18, color:"var(--navy)", letterSpacing:"-.01em" }}>SlimRx</span>
      </div>

      <div style={{ fontSize:10, fontWeight:800, color:"var(--text3)",
        letterSpacing:".12em", padding:"0 8px", marginBottom:8 }}>
        BOOKING STEPS
      </div>

      {steps.map((step, i) => {
        const done   = i < idx;
        const active = i === idx;
        return (
          <div key={step.id} className={`sidebar-step ${active?"active":""} ${done?"done":""}`}>
            <div style={{
              width:30, height:30, borderRadius:10, flexShrink:0,
              display:"flex", alignItems:"center", justifyContent:"center",
              background: done ? "var(--green)" : active ? "var(--gold)" : "var(--border2)",
              transition:"background .3s",
            }}>
              {done
                ? <Check size={14} color="white" strokeWidth={3} />
                : <step.icon size={14} color={active ? "white" : "var(--text3)"} />}
            </div>
            <div>
              <div style={{ fontSize:13, fontWeight:700,
                color: done ? "var(--green)" : active ? "var(--navy)" : "var(--text3)",
                transition:"color .3s" }}>{step.label}</div>
              {active && <div style={{ fontSize:10, color:"var(--gold)", marginTop:1 }}>In progress</div>}
              {done  && <div style={{ fontSize:10, color:"var(--green)", marginTop:1 }}>Complete</div>}
            </div>
          </div>
        );
      })}

      {/* Trust badges */}
      <div style={{ marginTop:"auto", paddingTop:20, borderTop:"1px solid var(--border2)" }}>
        {[
          { icon:Lock,    text:"SSL Encrypted" },
          { icon:Shield,  text:"MCI Verified Doctor" },
          { icon:RefreshCw,text:"Free Cancellation" },
        ].map(({ icon:Icon, text }) => (
          <div key={text} style={{ display:"flex", gap:7, alignItems:"center",
            fontSize:11, color:"var(--text3)", marginBottom:7 }}>
            <Icon size={11} color="var(--teal2)" /> {text}
          </div>
        ))}
      </div>
    </div>
  );
}

function SectionTitle({ children, sub }) {
  return (
    <div style={{ marginBottom:24 }}>
      <h2 className="gilda" style={{ fontSize:26, color:"var(--ink)", letterSpacing:"-.02em",
        marginBottom:sub ? 6 : 0 }}>{children}</h2>
      {sub && <p style={{ fontSize:14, color:"var(--text2)", lineHeight:1.6 }}>{sub}</p>}
    </div>
  );
}

function DoctorCard({ doctor }) {
  return (
    <div className="card" style={{ padding:"20px 22px", marginBottom:24 }}>
      <div style={{ display:"flex", gap:16, alignItems:"center" }}>
        <div style={{ width:60, height:60, borderRadius:18, fontSize:32, flexShrink:0,
          background:"var(--gold-s)", border:"1.5px solid rgba(201,147,58,.2)",
          display:"flex", alignItems:"center", justifyContent:"center" }}>
          {doctor.avatar}
        </div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start",
            flexWrap:"wrap", gap:6 }}>
            <div>
              <h3 className="gilda" style={{ fontSize:18, color:"var(--ink)", marginBottom:2 }}>
                {doctor.name}
              </h3>
              <div style={{ fontSize:12.5, color:"var(--text2)" }}>{doctor.title}</div>
            </div>
            <div style={{ textAlign:"right" }}>
              <div style={{ fontSize:20, fontWeight:800, color:"var(--navy)" }}>₹{doctor.fee}</div>
              <div style={{ fontSize:11, color:"var(--text3)" }}>per session</div>
            </div>
          </div>
          <div style={{ display:"flex", gap:12, marginTop:8, flexWrap:"wrap" }}>
            <span style={{ fontSize:12, fontWeight:700, color:"#d97706" }}>★ {doctor.rating}</span>
            <span style={{ fontSize:12, color:"var(--text3)" }}>{doctor.reviews} reviews</span>
            <span style={{ color:"var(--border)" }}>·</span>
            <span style={{ fontSize:12, color:"var(--text2)" }}>{doctor.exp} yrs exp</span>
            <span style={{ color:"var(--border)" }}>·</span>
            <span style={{ fontSize:12, color:"var(--text2)" }}>
              <MapPin size={10} style={{ display:"inline" }} /> {doctor.hospital.split("·")[1]?.trim()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   STEP 1: DATE & TIME SELECTOR
═══════════════════════════════════════════════════ */
function StepDateTime({ booking, setBooking }) {
  const [selectedDate, setSelectedDate] = useState(booking.date || null);
  const [selectedSlot, setSelectedSlot] = useState(booking.slot || null);
  const calScrollRef = useRef(null);
  const days = getCalendarDays();

  useEffect(() => {
    setBooking(b => ({ ...b, date:selectedDate, slot:selectedSlot }));
  }, [selectedDate, selectedSlot]);

  const formatDate = (d) => {
    if (!d) return "";
    return d.toLocaleDateString("en-IN", { weekday:"long", day:"numeric", month:"long" });
  };

  return (
    <div className="sl">
      <SectionTitle sub="Choose a date and time that works for you">
        Select Date & Time
      </SectionTitle>

      <DoctorCard doctor={DOCTOR} />

      {/* Calendar strip */}
      <div style={{ marginBottom:24 }}>
        <div style={{ fontSize:11, fontWeight:800, color:"var(--text2)",
          letterSpacing:".1em", marginBottom:12 }}>SELECT DATE</div>

        <div ref={calScrollRef} style={{
          display:"flex", gap:8, overflowX:"auto", paddingBottom:8,
          scrollbarWidth:"none",
        }}>
          {days.map((day, i) => (
            <div key={i}
              className={`cal-day ${selectedDate && day.date.toDateString() === selectedDate.toDateString() ? "selected":""}
                ${day.isToday ? "today":""}
                ${day.isSunday ? "disabled":""}
                ${day.hasSlots && !day.isSunday ? "has-slots":""}`.trim().replace(/\s+/g," ")}
              onClick={() => {
                if (!day.isSunday) {
                  setSelectedDate(day.date);
                  setSelectedSlot(null);
                }
              }}
              style={{ flexShrink:0 }}
            >
              <div style={{ fontSize:9, fontWeight:700,
                color: selectedDate && day.date.toDateString() === selectedDate.toDateString()
                  ? "rgba(255,255,255,.7)" : "var(--text3)",
                letterSpacing:".04em" }}>
                {day.weekday.toUpperCase()}
              </div>
              <div style={{ fontSize:16, fontWeight:800, lineHeight:1 }}>{day.label}</div>
              {day.isToday && (
                <div style={{ fontSize:8, fontWeight:700,
                  color: selectedDate && day.date.toDateString() === selectedDate.toDateString()
                    ? "rgba(255,255,255,.6)" : "var(--gold)",
                  marginTop:1 }}>TODAY</div>
              )}
            </div>
          ))}
        </div>

        {selectedDate && (
          <div style={{ fontSize:13, fontWeight:600, color:"var(--teal)",
            marginTop:8, padding:"8px 12px", background:"var(--teal-s)",
            borderRadius:"var(--r)", display:"inline-flex", alignItems:"center", gap:6 }}>
            <Calendar size={13} /> {formatDate(selectedDate)}
          </div>
        )}
      </div>

      {/* Time slots */}
      {selectedDate && (
        <div className="fi">
          {Object.entries(SLOT_TIMES).map(([period, slots]) => (
            <div key={period} style={{ marginBottom:20 }}>
              <div style={{ fontSize:11, fontWeight:800, color:"var(--text2)",
                letterSpacing:".1em", marginBottom:10, textTransform:"uppercase" }}>
                {period === "morning" ? "🌅 Morning" : period === "afternoon" ? "☀️ Afternoon" : "🌆 Evening"}
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(96px,1fr))", gap:8 }}>
                {slots.map(slot => (
                  <div key={slot}
                    className={`t-slot ${selectedSlot === slot ? "selected":""}
                      ${BOOKED_SLOTS.includes(slot) ? "booked":""}
                      ${FEW_LEFT.includes(slot) && !BOOKED_SLOTS.includes(slot) ? "few-left":""}`.trim()}
                    onClick={() => !BOOKED_SLOTS.includes(slot) && setSelectedSlot(slot)}
                  >
                    {slot}
                    {FEW_LEFT.includes(slot) && !BOOKED_SLOTS.includes(slot) && (
                      <div style={{ fontSize:9, color:"var(--amber)", marginTop:2 }}>2 left</div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div style={{ display:"flex", gap:12, fontSize:11, color:"var(--text3)" }}>
            <span>● Available</span>
            <span style={{ color:"var(--amber)" }}>● Few slots left</span>
            <span style={{ opacity:.4 }}>● Booked</span>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   STEP 2: CONSULTATION TYPE
═══════════════════════════════════════════════════ */
function StepConsultType({ booking, setBooking }) {
  const [selected, setSelected] = useState(booking.mode || "video");

  useEffect(() => {
    setBooking(b => ({ ...b, mode:selected }));
  }, [selected]);

  return (
    <div className="sl">
      <SectionTitle sub="How would you like to connect with the doctor?">
        Consultation Mode
      </SectionTitle>

      <DoctorCard doctor={DOCTOR} />

      <div style={{ display:"flex", flexDirection:"column", gap:14, marginBottom:28 }}>
        {CONSULT_MODES.map((mode, i) => (
          mode.id === "chat" || DOCTOR.modes.includes(mode.id) ? (
            <div key={mode.id}
              className={`mode-card ${selected === mode.id ? "selected":""} fu d${i+1}`}
              onClick={() => setSelected(mode.id)}
            >
              {/* Radio */}
              <div style={{
                width:22, height:22, borderRadius:"50%", flexShrink:0,
                border:`2px solid ${selected === mode.id ? "var(--navy)" : "var(--border)"}`,
                background: selected === mode.id ? "var(--navy)" : "transparent",
                display:"flex", alignItems:"center", justifyContent:"center",
                transition:"all .2s",
              }}>
                {selected === mode.id && (
                  <div style={{ width:8, height:8, borderRadius:"50%", background:"white" }} />
                )}
              </div>

              {/* Mode icon */}
              <div style={{
                width:48, height:48, borderRadius:14, flexShrink:0,
                background:`${mode.color}12`,
                border:`1px solid ${mode.color}22`,
                display:"flex", alignItems:"center", justifyContent:"center",
              }}>
                <mode.icon size={22} color={mode.color} />
              </div>

              <div style={{ flex:1 }}>
                <div style={{ fontWeight:800, fontSize:15, color:"var(--ink)", marginBottom:3 }}>
                  {mode.label}
                </div>
                <div style={{ fontSize:12.5, color:"var(--text2)" }}>{mode.sub}</div>
              </div>

              <div style={{ textAlign:"right", flexShrink:0 }}>
                <div style={{ fontSize:13, fontWeight:700, color:"var(--navy)" }}>{mode.time}</div>
                <div style={{ fontSize:11, color:"var(--text3)" }}>duration</div>
              </div>
            </div>
          ) : null
        ))}
      </div>

      {/* What to expect */}
      <div style={{
        background:"var(--gold-s)", border:"1px solid rgba(201,147,58,.2)",
        borderRadius:"var(--r-xl)", padding:"18px 20px",
      }}>
        <div style={{ fontSize:12, fontWeight:800, color:"var(--gold)",
          letterSpacing:".08em", marginBottom:10 }}>WHAT TO EXPECT</div>
        {[
          "Doctor reviews your intake form 10 minutes before the call",
          "Full medical history discussion and GLP-1 eligibility assessment",
          "Digital prescription issued immediately if eligible",
          "Medication ordered and dispatched same day",
        ].map((item, i) => (
          <div key={i} style={{ display:"flex", gap:10, alignItems:"flex-start", marginBottom:8 }}>
            <div style={{
              width:20, height:20, borderRadius:"50%", flexShrink:0,
              background:"var(--gold)", color:"white",
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:10, fontWeight:800,
            }}>{i+1}</div>
            <span style={{ fontSize:13, color:"var(--text)", lineHeight:1.5 }}>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   STEP 3: PATIENT DETAILS
═══════════════════════════════════════════════════ */
function StepPatientDetails({ booking, setBooking }) {
  const [form, setForm] = useState(booking.patientDetails || {
    name:"", phone:"", email:"", age:"", weight:"", height:"",
    conditions:[], currentMeds:"", reason:"",
  });
  const [errors, setErrors] = useState({});

  const set = (k, v) => {
    setForm(f => ({ ...f, [k]:v }));
    setErrors(e => ({ ...e, [k]:"" }));
  };

  const toggleCondition = (cond) => {
    const curr = form.conditions || [];
    set("conditions", curr.includes(cond)
      ? curr.filter(c => c !== cond)
      : [...curr, cond]);
  };

  useEffect(() => {
    setBooking(b => ({ ...b, patientDetails:form }));
  }, [form]);

  const CONDITIONS = ["Type 2 Diabetes","Pre-diabetes","High BP","High Cholesterol","PCOS","Sleep Apnea","None of the above"];

  return (
    <div className="sl">
      <SectionTitle sub="This helps Dr. Kavitha Rajan prepare for your consultation">
        Your Health Details
      </SectionTitle>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
        <div style={{ gridColumn:"1/-1" }}>
          <label className="lbl">FULL NAME *</label>
          <input className={`inp ${errors.name?"err":""}`}
            placeholder="As per Aadhaar" value={form.name}
            onChange={e => set("name", e.target.value)} />
        </div>
        <div>
          <label className="lbl">MOBILE NUMBER *</label>
          <div style={{ display:"flex", border:"1.5px solid var(--border)", borderRadius:"var(--r-lg)",
            overflow:"hidden", transition:"border-color .18s" }}
            onFocusCapture={e => e.currentTarget.style.borderColor = "var(--gold2)"}
            onBlurCapture={e => e.currentTarget.style.borderColor = "var(--border)"}
          >
            <div style={{ padding:"12px 12px", background:"var(--bg2)", borderRight:"1px solid var(--border)",
              fontSize:14, fontWeight:700, color:"var(--text)", flexShrink:0 }}>🇮🇳 +91</div>
            <input className="inp" placeholder="98765 43210"
              value={form.phone} onChange={e => set("phone", e.target.value.replace(/\D/g,"").slice(0,10))}
              style={{ border:"none", borderRadius:0, flex:1 }} />
          </div>
        </div>
        <div>
          <label className="lbl">EMAIL ADDRESS *</label>
          <input className={`inp ${errors.email?"err":""}`}
            type="email" placeholder="you@example.com"
            value={form.email} onChange={e => set("email", e.target.value)} />
        </div>
        <div>
          <label className="lbl">AGE *</label>
          <input className="inp" type="number" placeholder="e.g. 34"
            value={form.age} onChange={e => set("age", e.target.value)} />
        </div>
        <div>
          <label className="lbl">WEIGHT (kg)</label>
          <input className="inp" type="number" placeholder="e.g. 82"
            value={form.weight} onChange={e => set("weight", e.target.value)} />
        </div>
        <div>
          <label className="lbl">HEIGHT (cm)</label>
          <input className="inp" type="number" placeholder="e.g. 165"
            value={form.height} onChange={e => set("height", e.target.value)} />
        </div>
      </div>

      {/* Conditions */}
      <div style={{ marginBottom:16 }}>
        <label className="lbl">EXISTING CONDITIONS (select all that apply)</label>
        <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginTop:6 }}>
          {CONDITIONS.map(cond => {
            const active = form.conditions.includes(cond);
            return (
              <button key={cond} onClick={() => toggleCondition(cond)} style={{
                padding:"7px 14px", borderRadius:100,
                border:`1.5px solid ${active ? "var(--navy)" : "var(--border)"}`,
                background: active ? "var(--navy)" : "var(--white)",
                color: active ? "white" : "var(--text2)",
                fontSize:12.5, fontWeight:600, cursor:"pointer",
                fontFamily:"Jost,sans-serif", transition:"all .18s",
                display:"flex", alignItems:"center", gap:5,
              }}>
                {active && <Check size={11} strokeWidth={3} />}
                {cond}
              </button>
            );
          })}
        </div>
      </div>

      <div style={{ marginBottom:16 }}>
        <label className="lbl">CURRENT MEDICATIONS (if any)</label>
        <input className="inp" placeholder="e.g. Metformin 500mg, Atorvastatin 10mg — or 'None'"
          value={form.currentMeds} onChange={e => set("currentMeds", e.target.value)} />
      </div>

      <div>
        <label className="lbl">REASON FOR CONSULTATION *</label>
        <textarea className="inp" rows={3}
          placeholder="Briefly describe your weight loss goals and what you've tried before…"
          value={form.reason} onChange={e => set("reason", e.target.value)}
          style={{ resize:"vertical" }} />
      </div>

      <div style={{
        background:"rgba(13,27,42,.04)", borderRadius:"var(--r-lg)", padding:"12px 16px",
        display:"flex", gap:8, alignItems:"flex-start", marginTop:16,
        border:"1px solid rgba(13,27,42,.08)",
      }}>
        <Lock size={13} color="var(--navy)" style={{ flexShrink:0, marginTop:2 }} />
        <p style={{ fontSize:12, color:"var(--text2)", lineHeight:1.6 }}>
          Your health information is encrypted and shared only with your consulting doctor.
          Protected under DPDPA 2023. Never shared with third parties.
        </p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   STEP 4: ADD-ONS (Medication + extras)
═══════════════════════════════════════════════════ */
function StepAddOns({ booking, setBooking }) {
  const [selectedMed, setSelectedMed] = useState(booking.medication || null);
  const [addNurse,   setAddNurse]   = useState(booking.addNurse || false);
  const [addReport,  setAddReport]  = useState(booking.addReport || false);

  useEffect(() => {
    setBooking(b => ({ ...b, medication:selectedMed, addNurse, addReport }));
  }, [selectedMed, addNurse, addReport]);

  return (
    <div className="sl">
      <SectionTitle sub="Pre-select your medication — doctor will confirm during consultation">
        Enhance Your Visit
      </SectionTitle>

      {/* Medication selection */}
      <div style={{ marginBottom:24 }}>
        <div style={{ fontSize:11, fontWeight:800, color:"var(--text2)",
          letterSpacing:".1em", marginBottom:14 }}>
          PREFERRED GLP-1 MEDICATION (optional — doctor may change)
        </div>

        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {MEDICATIONS.map((med, i) => (
            <div key={med.id}
              className={`fu d${i+1}`}
              onClick={() => setSelectedMed(selectedMed?.id === med.id ? null : med)}
              style={{
                display:"flex", gap:14, alignItems:"center",
                padding:"16px 18px", borderRadius:"var(--r-xl)",
                border:`1.5px solid ${selectedMed?.id === med.id ? "var(--navy)" : "var(--border)"}`,
                background: selectedMed?.id === med.id
                  ? "linear-gradient(135deg,rgba(13,27,42,.04),rgba(13,27,42,.01))"
                  : "var(--white)",
                cursor:"pointer", transition:"all .2s",
                boxShadow: selectedMed?.id === med.id ? "0 0 0 3px rgba(13,27,42,.08),var(--sh)" : "var(--sh)",
              }}>
              {/* Radio */}
              <div style={{
                width:20, height:20, borderRadius:"50%", flexShrink:0,
                border:`2px solid ${selectedMed?.id === med.id ? "var(--navy)" : "var(--border)"}`,
                background: selectedMed?.id === med.id ? "var(--navy)" : "transparent",
                display:"flex", alignItems:"center", justifyContent:"center",
                transition:"all .2s",
              }}>
                {selectedMed?.id === med.id && (
                  <div style={{ width:8, height:8, borderRadius:"50%", background:"white" }} />
                )}
              </div>

              <span style={{ fontSize:26, flexShrink:0 }}>{med.icon}</span>

              <div style={{ flex:1 }}>
                <div style={{ fontWeight:800, fontSize:14, color:"var(--ink)", marginBottom:2 }}>
                  {med.name}
                </div>
                <div style={{ fontSize:12, color:"var(--text2)" }}>{med.maker}</div>
              </div>

              <div style={{ textAlign:"right", flexShrink:0 }}>
                <div style={{ fontSize:17, fontWeight:800, color:"var(--teal)" }}>
                  ₹{med.price.toLocaleString("en-IN")}
                </div>
                <div style={{ fontSize:11, color:"var(--text3)" }}>per month</div>
              </div>
            </div>
          ))}

          <div style={{
            padding:"12px 16px", borderRadius:"var(--r-lg)",
            background:"var(--teal-s)", border:"1px solid rgba(20,184,166,.2)",
            fontSize:12, color:"var(--teal)", fontWeight:600,
          }}>
            💡 Not sure? Select "No preference" and your doctor will recommend the best medication for your profile.
          </div>
        </div>
      </div>

      {/* Optional add-ons */}
      <div>
        <div style={{ fontSize:11, fontWeight:800, color:"var(--text2)",
          letterSpacing:".1em", marginBottom:14 }}>OPTIONAL ADD-ONS</div>

        {[
          {
            state:addNurse, toggle:setAddNurse,
            icon:"📞", title:"24/7 Nurse Helpline Access",
            sub:"Dedicated nurse available for side-effect support via WhatsApp",
            price:"₹299/mo", badge:"Recommended",
          },
          {
            state:addReport, toggle:setAddReport,
            icon:"📊", title:"Monthly Progress Report",
            sub:"Detailed PDF report: weight, BMI, metabolic markers, adherence score",
            price:"₹199/mo", badge:null,
          },
        ].map((addon, i) => (
          <div key={i}
            onClick={() => addon.toggle(s => !s)}
            style={{
              display:"flex", gap:14, alignItems:"center",
              padding:"16px 18px", borderRadius:"var(--r-xl)",
              border:`1.5px solid ${addon.state ? "var(--gold)" : "var(--border)"}`,
              background: addon.state ? "var(--gold-s)" : "var(--white)",
              cursor:"pointer", marginBottom:12, transition:"all .2s",
            }}>
            <div style={{
              width:20, height:20, borderRadius:6, flexShrink:0,
              border:`2px solid ${addon.state ? "var(--gold)" : "var(--border)"}`,
              background: addon.state ? "var(--gold)" : "transparent",
              display:"flex", alignItems:"center", justifyContent:"center",
              transition:"all .2s",
            }}>
              {addon.state && <Check size={11} color="white" strokeWidth={3} />}
            </div>
            <span style={{ fontSize:24, flexShrink:0 }}>{addon.icon}</span>
            <div style={{ flex:1 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:2 }}>
                <span style={{ fontWeight:800, fontSize:14, color:"var(--ink)" }}>{addon.title}</span>
                {addon.badge && <span className="badge b-gold">{addon.badge}</span>}
              </div>
              <div style={{ fontSize:12, color:"var(--text2)" }}>{addon.sub}</div>
            </div>
            <div style={{ fontWeight:800, fontSize:14, color:"var(--gold)", flexShrink:0 }}>
              {addon.price}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   STEP 5: PAYMENT
═══════════════════════════════════════════════════ */
function StepPayment({ booking, setBooking }) {
  const [method, setMethod] = useState("upi");
  const [upiId,  setUpiId]  = useState("");
  const [cardNo, setCardNo] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv,    setCvv]    = useState("");
  const [bank,   setBank]   = useState("");
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponErr, setCouponErr] = useState("");

  const VALID_COUPONS = { FIRST50:"₹50 off first booking", SLIM20:"20% off today" };

  const applyCoupon = () => {
    if (VALID_COUPONS[coupon.toUpperCase()]) {
      setAppliedCoupon({ code:coupon.toUpperCase(), label:VALID_COUPONS[coupon.toUpperCase()] });
      setCouponErr("");
    } else {
      setCouponErr("Invalid coupon. Try FIRST50 or SLIM20");
    }
  };

  const formatCard = (v) => v.replace(/\D/g,"").slice(0,16).replace(/(.{4})/g,"$1 ").trim();
  const formatExp  = (v) => { const d = v.replace(/\D/g,"").slice(0,4); return d.length >= 3 ? d.slice(0,2)+"/"+d.slice(2) : d; };

  useEffect(() => {
    setBooking(b => ({ ...b, paymentMethod:method }));
  }, [method]);

  const BANKS = ["State Bank of India","HDFC Bank","ICICI Bank","Axis Bank","Kotak Mahindra","Bank of Baroda"];

  const consultFee  = DOCTOR.fee;
  const medPrice    = booking.medication?.price || 0;
  const nurseAddon  = booking.addNurse  ? 299 : 0;
  const reportAddon = booking.addReport ? 199 : 0;
  const discount    = appliedCoupon
    ? appliedCoupon.code === "SLIM20" ? Math.round(consultFee * 0.2) : 50
    : 0;
  const total = consultFee + medPrice + nurseAddon + reportAddon - discount;

  return (
    <div className="sl">
      <SectionTitle sub="Secure payment powered by Razorpay">
        Payment
      </SectionTitle>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
        {/* Left: payment form */}
        <div>
          {/* Method tabs */}
          <div style={{ display:"flex", gap:8, marginBottom:20 }}>
            {[
              { id:"upi",     icon:"📲", label:"UPI" },
              { id:"card",    icon:"💳", label:"Card" },
              { id:"netbank", icon:"🏦", label:"NetBank" },
              { id:"wallet",  icon:"👛", label:"Wallet" },
            ].map(m => (
              <button key={m.id} className={`pay-tab ${method===m.id?"active":""}`}
                onClick={() => setMethod(m.id)}>
                <span className="pt-icon">{m.icon}</span>
                <span className="pt-label">{m.label}</span>
              </button>
            ))}
          </div>

          {/* UPI */}
          {method === "upi" && (
            <div className="fi">
              <label className="lbl">UPI ID</label>
              <input className="inp" placeholder="yourname@upi or 9876543210@paytm"
                value={upiId} onChange={e => setUpiId(e.target.value)} />
              <div style={{ fontSize:11, color:"var(--text3)", marginTop:6 }}>
                Supports GPay, PhonePe, Paytm, BHIM, and all UPI apps
              </div>
              <div style={{ display:"flex", gap:10, marginTop:16 }}>
                {["GPay","PhonePe","Paytm","BHIM"].map(app => (
                  <div key={app} style={{
                    flex:1, padding:"10px 6px", borderRadius:"var(--r)",
                    border:"1.5px solid var(--border)", textAlign:"center",
                    cursor:"pointer", fontSize:12, fontWeight:700, color:"var(--text2)",
                    background:"var(--white)", transition:"all .18s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor="var(--gold2)"; e.currentTarget.style.color="var(--navy)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor="var(--border)"; e.currentTarget.style.color="var(--text2)"; }}
                  >{app}</div>
                ))}
              </div>
            </div>
          )}

          {/* Card */}
          {method === "card" && (
            <div className="fi">
              {/* Card preview */}
              <div style={{
                background:"linear-gradient(135deg,var(--navy),var(--navy3))",
                borderRadius:16, padding:"20px 22px", marginBottom:16,
                position:"relative", overflow:"hidden",
                boxShadow:"0 8px 32px rgba(13,27,42,.3)",
              }}>
                <div style={{ position:"absolute", top:-20, right:-20,
                  width:120, height:120, borderRadius:"50%",
                  background:"rgba(201,147,58,.1)", pointerEvents:"none" }} />
                <div style={{ width:36, height:28, borderRadius:6, marginBottom:16,
                  background:"linear-gradient(135deg,var(--gold),var(--gold2))" }} />
                <div style={{ fontFamily:"monospace", fontSize:17, fontWeight:700,
                  color:"white", letterSpacing:".12em", marginBottom:14 }}>
                  {cardNo || "•••• •••• •••• ••••"}
                </div>
                <div style={{ display:"flex", justifyContent:"space-between" }}>
                  <div>
                    <div style={{ fontSize:9, color:"rgba(255,255,255,.4)", marginBottom:2 }}>CARD HOLDER</div>
                    <div style={{ fontSize:13, fontWeight:700, color:"white" }}>
                      {cardName || "YOUR NAME"}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize:9, color:"rgba(255,255,255,.4)", marginBottom:2 }}>EXPIRES</div>
                    <div style={{ fontSize:13, fontWeight:700, color:"white" }}>{expiry || "MM/YY"}</div>
                  </div>
                </div>
              </div>

              <label className="lbl">CARD NUMBER</label>
              <input className="inp" placeholder="1234 5678 9012 3456"
                value={cardNo} onChange={e => setCardNo(formatCard(e.target.value))}
                maxLength={19} style={{ marginBottom:12, fontFamily:"monospace", letterSpacing:".08em" }} />

              <label className="lbl">NAME ON CARD</label>
              <input className="inp" placeholder="As printed"
                value={cardName} onChange={e => setCardName(e.target.value.toUpperCase())}
                style={{ marginBottom:12 }} />

              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                <div>
                  <label className="lbl">EXPIRY</label>
                  <input className="inp" placeholder="MM/YY"
                    value={expiry} onChange={e => setExpiry(formatExp(e.target.value))}
                    maxLength={5} />
                </div>
                <div>
                  <label className="lbl">CVV</label>
                  <input className="inp" type="password" placeholder="•••"
                    value={cvv} onChange={e => setCvv(e.target.value.replace(/\D/g,"").slice(0,4))}
                    maxLength={4} />
                </div>
              </div>
            </div>
          )}

          {/* Net banking */}
          {method === "netbank" && (
            <div className="fi">
              <label className="lbl">SELECT YOUR BANK</label>
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {BANKS.map(b => (
                  <div key={b} onClick={() => setBank(b)} style={{
                    display:"flex", alignItems:"center", gap:12,
                    padding:"12px 16px", borderRadius:"var(--r-lg)",
                    border:`1.5px solid ${bank===b ? "var(--navy)" : "var(--border)"}`,
                    background: bank===b ? "rgba(13,27,42,.03)" : "var(--white)",
                    cursor:"pointer", transition:"all .18s",
                  }}>
                    <div style={{
                      width:18, height:18, borderRadius:"50%", flexShrink:0,
                      border:`2px solid ${bank===b ? "var(--navy)" : "var(--border)"}`,
                      background: bank===b ? "var(--navy)" : "transparent",
                      display:"flex", alignItems:"center", justifyContent:"center",
                    }}>
                      {bank===b && <div style={{ width:7, height:7, borderRadius:"50%", background:"white" }} />}
                    </div>
                    <span style={{ fontSize:14, fontWeight:500, color:"var(--ink)" }}>{b}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Wallet */}
          {method === "wallet" && (
            <div className="fi">
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                {[
                  { name:"Paytm",      emoji:"🔵" },
                  { name:"Amazon Pay", emoji:"🟡" },
                  { name:"MobiKwik",   emoji:"🔷" },
                  { name:"FreeCharge", emoji:"🔸" },
                ].map(w => (
                  <div key={w.name} style={{
                    display:"flex", gap:10, alignItems:"center",
                    padding:"14px", borderRadius:"var(--r-lg)",
                    border:"1.5px solid var(--border)", cursor:"pointer",
                    background:"var(--white)", transition:"all .18s",
                  }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor="var(--gold2)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor="var(--border)"; }}
                  >
                    <span style={{ fontSize:22 }}>{w.emoji}</span>
                    <span style={{ fontSize:13, fontWeight:700, color:"var(--ink)" }}>{w.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Coupon */}
          <div style={{ marginTop:20 }}>
            <label className="lbl">PROMO CODE</label>
            {appliedCoupon ? (
              <div style={{
                display:"flex", alignItems:"center", gap:10,
                padding:"11px 14px", borderRadius:"var(--r-lg)",
                border:"1.5px solid var(--teal2)", background:"var(--teal-s)",
              }}>
                <CheckCircle2 size={16} color="var(--teal)" />
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:13, fontWeight:700, color:"var(--teal)" }}>{appliedCoupon.code}</div>
                  <div style={{ fontSize:11, color:"var(--teal)" }}>{appliedCoupon.label}</div>
                </div>
                <button onClick={() => setAppliedCoupon(null)} style={{
                  background:"none", border:"none", cursor:"pointer",
                  width:22, height:22, borderRadius:"50%",
                  background:"rgba(0,0,0,.06)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                }}>
                  <X size={12} color="var(--text2)" />
                </button>
              </div>
            ) : (
              <div style={{ display:"flex", gap:8 }}>
                <input className="inp" placeholder="Try FIRST50 or SLIM20"
                  value={coupon} onChange={e => { setCoupon(e.target.value.toUpperCase()); setCouponErr(""); }}
                  style={{ flex:1 }} />
                <button className="btn btn-outline btn-sm" onClick={applyCoupon}>Apply</button>
              </div>
            )}
            {couponErr && (
              <div style={{ fontSize:11, color:"var(--red)", marginTop:5 }}>{couponErr}</div>
            )}
          </div>
        </div>

        {/* Right: order summary */}
        <div>
          <div style={{
            background:"var(--navy)", borderRadius:"var(--r-xl)",
            padding:"20px", marginBottom:14, position:"relative", overflow:"hidden",
          }}>
            <div style={{
              position:"absolute", top:-20, right:-20, width:100, height:100,
              borderRadius:"50%", background:"rgba(201,147,58,.1)", pointerEvents:"none",
            }} />
            <div style={{ fontSize:11, color:"rgba(255,255,255,.4)", marginBottom:12,
              fontWeight:800, letterSpacing:".1em" }}>ORDER SUMMARY</div>

            {/* Doctor avatar in summary */}
            <div style={{ display:"flex", gap:10, alignItems:"center", marginBottom:16,
              paddingBottom:16, borderBottom:"1px solid rgba(255,255,255,.08)" }}>
              <div style={{ fontSize:24 }}>{DOCTOR.avatar}</div>
              <div>
                <div style={{ fontSize:13, fontWeight:700, color:"white" }}>{DOCTOR.name}</div>
                <div style={{ fontSize:11, color:"rgba(255,255,255,.4)" }}>
                  {booking.date?.toLocaleDateString("en-IN",{day:"numeric",month:"short"})}
                  {booking.slot ? ` · ${booking.slot}` : ""}
                  {booking.mode ? ` · ${booking.mode}` : ""}
                </div>
              </div>
            </div>

            {[
              { l:"Consultation fee",   v:`₹${consultFee}`,                       show:true },
              { l:booking.medication?.name, v:`₹${medPrice.toLocaleString("en-IN")}`, show:!!medPrice },
              { l:"Nurse helpline",     v:`₹${nurseAddon}`,                       show:nurseAddon > 0 },
              { l:"Progress report",    v:`₹${reportAddon}`,                      show:reportAddon > 0 },
              { l:`Promo: ${appliedCoupon?.code}`, v:`−₹${discount}`,             show:discount > 0, isDiscount:true },
            ].filter(r => r.show).map(({ l, v, isDiscount }) => (
              <div key={l} style={{
                display:"flex", justifyContent:"space-between",
                padding:"7px 0", borderBottom:"1px solid rgba(255,255,255,.06)",
                fontSize:13,
              }}>
                <span style={{ color:"rgba(255,255,255,.55)" }}>{l}</span>
                <span style={{ fontWeight:700, color: isDiscount ? "#6ee7b7" : "white" }}>{v}</span>
              </div>
            ))}

            <div style={{
              display:"flex", justifyContent:"space-between",
              padding:"14px 0 0", fontSize:16,
            }}>
              <span style={{ fontWeight:800, color:"white" }}>Total</span>
              <span style={{ fontWeight:900, fontSize:24, color:"var(--gold2)" }}>
                ₹{total.toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          {/* Security strip */}
          <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
            {[
              { icon:Lock,    text:"256-bit SSL Encryption" },
              { icon:Shield,  text:"PCI-DSS Level 1 Certified" },
              { icon:RefreshCw,text:"Free cancellation up to 2 hrs before" },
            ].map(({ icon:Icon, text }) => (
              <div key={text} style={{ display:"flex", alignItems:"center", gap:8,
                fontSize:12, color:"var(--text3)" }}>
                <Icon size={12} color="var(--teal2)" /> {text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   STEP 6: BOOKING CONFIRMATION REVIEW
═══════════════════════════════════════════════════ */
function StepConfirm({ booking }) {
  const modeConfig = {
    video: { icon:Video,         label:"Video Call",  color:"var(--teal)" },
    phone: { icon:Phone,         label:"Phone Call",  color:"var(--blue)" },
    chat:  { icon:MessageCircle, label:"Text Chat",   color:"var(--gold)" },
  };
  const mc = modeConfig[booking.mode] || modeConfig.video;
  const patient = booking.patientDetails || {};

  return (
    <div className="sl">
      <SectionTitle sub="Please review all details before confirming your booking">
        Review & Confirm
      </SectionTitle>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
        {[
          {
            title:"Appointment", icon:"📅",
            rows:[
              { l:"Doctor",   v:DOCTOR.name },
              { l:"Date",     v:booking.date?.toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"long"}) || "—" },
              { l:"Time",     v:booking.slot || "—" },
              { l:"Mode",     v:mc.label },
            ],
          },
          {
            title:"Patient", icon:"👤",
            rows:[
              { l:"Name",   v:patient.name || "—" },
              { l:"Mobile", v:patient.phone ? `+91 ${patient.phone}` : "—" },
              { l:"Age",    v:patient.age || "—" },
              { l:"BMI",    v:patient.weight && patient.height
                ? `${((patient.weight)/((patient.height/100)**2)).toFixed(1)}`
                : "—" },
            ],
          },
        ].map(section => (
          <div key={section.title} className="card" style={{ padding:"18px 20px" }}>
            <div style={{ fontSize:12, fontWeight:800, color:"var(--text2)",
              letterSpacing:".08em", marginBottom:12 }}>
              {section.icon} {section.title.toUpperCase()}
            </div>
            {section.rows.map(({ l, v }) => (
              <div key={l} style={{
                display:"flex", justifyContent:"space-between",
                padding:"7px 0", borderBottom:"1px solid var(--border2)",
                fontSize:13,
              }}>
                <span style={{ color:"var(--text2)" }}>{l}</span>
                <span style={{ fontWeight:700, color:"var(--ink)" }}>{v}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Medication & add-ons */}
      {(booking.medication || booking.addNurse || booking.addReport) && (
        <div className="card" style={{ padding:"18px 20px", marginTop:16 }}>
          <div style={{ fontSize:12, fontWeight:800, color:"var(--text2)",
            letterSpacing:".08em", marginBottom:12 }}>💊 MEDICATION & ADD-ONS</div>
          {booking.medication && (
            <div style={{ display:"flex", justifyContent:"space-between", padding:"7px 0",
              borderBottom:"1px solid var(--border2)", fontSize:13 }}>
              <span style={{ color:"var(--text2)" }}>{booking.medication.name}</span>
              <span style={{ fontWeight:700, color:"var(--teal)" }}>₹{booking.medication.price.toLocaleString("en-IN")}/mo</span>
            </div>
          )}
          {booking.addNurse && (
            <div style={{ display:"flex", justifyContent:"space-between", padding:"7px 0",
              borderBottom:"1px solid var(--border2)", fontSize:13 }}>
              <span style={{ color:"var(--text2)" }}>24/7 Nurse Helpline</span>
              <span style={{ fontWeight:700, color:"var(--gold)" }}>₹299/mo</span>
            </div>
          )}
          {booking.addReport && (
            <div style={{ display:"flex", justifyContent:"space-between", padding:"7px 0",
              fontSize:13 }}>
              <span style={{ color:"var(--text2)" }}>Monthly Progress Report</span>
              <span style={{ fontWeight:700, color:"var(--gold)" }}>₹199/mo</span>
            </div>
          )}
        </div>
      )}

      {/* T&C */}
      <div style={{
        background:"var(--gold-s)", border:"1px solid rgba(201,147,58,.2)",
        borderRadius:"var(--r-lg)", padding:"14px 16px", marginTop:16,
        fontSize:12, color:"var(--text)", lineHeight:1.65,
      }}>
        <strong style={{ color:"var(--gold)" }}>Before you confirm:</strong>{" "}
        By booking this consultation you agree to SlimRx's Terms of Service. Your consultation fee
        (₹{DOCTOR.fee}) will be charged after the session is completed. Free cancellation available
        up to 2 hours before your appointment. Prescription is subject to physician's clinical judgment.
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   SUCCESS SCREEN
═══════════════════════════════════════════════════ */
function SuccessScreen({ booking, onReset }) {
  const [copied, setCopied] = useState(false);
  const bookingRef = "SRX" + Date.now().toString(36).toUpperCase().slice(-8);

  const copy = () => {
    navigator.clipboard?.writeText(bookingRef).catch(()=>{});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fi" style={{
      display:"flex", alignItems:"center", justifyContent:"center",
      height:"100%", padding:"40px",
    }}>
      <div style={{ maxWidth:520, width:"100%", textAlign:"center" }}>
        {/* Animated success icon */}
        <div style={{
          width:100, height:100, borderRadius:"50%",
          background:"linear-gradient(135deg,var(--gold-s),rgba(201,147,58,.1))",
          border:"2px solid var(--gold2)",
          display:"flex", alignItems:"center", justifyContent:"center",
          margin:"0 auto 28px",
          animation:"float 3s ease-in-out infinite",
        }}>
          <CheckCircle2 size={48} color="var(--gold)"
            style={{ animation:"pop .5s cubic-bezier(.22,1,.36,1)" }} />
        </div>

        <h1 className="gilda" style={{ fontSize:36, color:"var(--ink)",
          letterSpacing:"-.02em", marginBottom:10 }}>
          Booking Confirmed!
        </h1>
        <p style={{ fontSize:15, color:"var(--text2)", lineHeight:1.75, marginBottom:28 }}>
          Your consultation with <strong style={{ color:"var(--navy)" }}>{DOCTOR.name}</strong> is
          booked for{" "}
          <strong style={{ color:"var(--navy)" }}>
            {booking.date?.toLocaleDateString("en-IN",{weekday:"long",day:"numeric",month:"long"})}
            {" "}at {booking.slot}
          </strong>. You'll receive an SMS and email confirmation shortly.
        </p>

        {/* Booking ref */}
        <div style={{
          display:"inline-flex", gap:12, alignItems:"center",
          background:"var(--bg2)", border:"1px solid var(--border)",
          borderRadius:"var(--r-lg)", padding:"14px 20px", marginBottom:28,
        }}>
          <div>
            <div style={{ fontSize:10, color:"var(--text3)", fontWeight:800,
              letterSpacing:".08em", marginBottom:3 }}>BOOKING REFERENCE</div>
            <div className="gilda" style={{ fontSize:22, color:"var(--ink)", letterSpacing:".04em" }}>
              {bookingRef}
            </div>
          </div>
          <button onClick={copy} style={{
            background: copied ? "var(--green-s)" : "var(--white)",
            border:`1px solid ${copied ? "var(--green)" : "var(--border)"}`,
            borderRadius:"var(--r)", padding:"8px 12px", cursor:"pointer",
            fontSize:12, fontWeight:700, color: copied ? "var(--green)" : "var(--text2)",
            display:"flex", alignItems:"center", gap:5,
            fontFamily:"Jost,sans-serif", transition:"all .2s",
          }}>
            {copied ? <><Check size={12} /> Copied!</> : <><Copy size={12} /> Copy</>}
          </button>
        </div>

        {/* What happens next */}
        <div className="card" style={{ padding:"20px 24px", marginBottom:24, textAlign:"left" }}>
          <div style={{ fontSize:11, fontWeight:800, color:"var(--text2)",
            letterSpacing:".1em", marginBottom:14 }}>WHAT HAPPENS NEXT</div>
          {[
            { emoji:"📲", title:`Reminder sent 30 min before`,          sub:"Via SMS and WhatsApp" },
            { emoji:"📋", title:"Doctor reviews your intake form",        sub:"10 minutes before the call" },
            { emoji:`${booking.mode === "video" ? "📹" : booking.mode === "phone" ? "📞" : "💬"}`,
              title:`${booking.mode === "video" ? "Video" : booking.mode === "phone" ? "Phone" : "Chat"} consultation`,
              sub:`At ${booking.slot}` },
            { emoji:"💊", title:"Digital prescription issued",            sub:"If eligible, immediately after call" },
            { emoji:"🚚", title:"Medication dispatched",                  sub:"Same day, cold-chain delivery" },
          ].map((item, i) => (
            <div key={i} style={{ display:"flex", gap:12, alignItems:"flex-start",
              paddingBottom: i < 4 ? 12 : 0,
              borderBottom: i < 4 ? "1px solid var(--border2)" : "none" }}>
              <div style={{
                width:36, height:36, borderRadius:10, flexShrink:0, fontSize:18,
                background:"var(--gold-s)", display:"flex", alignItems:"center",
                justifyContent:"center", border:"1px solid rgba(201,147,58,.15)",
              }}>{item.emoji}</div>
              <div style={{ paddingTop:2 }}>
                <div style={{ fontSize:13.5, fontWeight:700, color:"var(--ink)", marginBottom:1 }}>{item.title}</div>
                <div style={{ fontSize:12, color:"var(--text3)" }}>{item.sub}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div style={{ display:"flex", gap:12 }}>
          <button className="btn btn-outline" style={{ flex:1 }} onClick={onReset}>
            <ArrowLeft size={14} /> Book Another
          </button>
          <button className="btn btn-navy" style={{ flex:2 }}
            onClick={() => alert("Opening Patient Dashboard… (connect to Module 3)")}>
            Go to My Dashboard <ChevronRight size={15} />
          </button>
        </div>

        {/* Helpline */}
        <div style={{
          marginTop:20, padding:"12px 16px",
          background:"var(--teal-s)", borderRadius:"var(--r-lg)",
          display:"flex", alignItems:"center", gap:10,
          border:"1px solid rgba(20,184,166,.2)",
        }}>
          <Phone size={15} color="var(--teal)" />
          <div style={{ fontSize:13, color:"var(--teal)", fontWeight:600 }}>
            Need help? Call <strong>1800-123-SLIM</strong> · Available 24/7
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   ROOT BOOKING FLOW APP
═══════════════════════════════════════════════════ */
const STEP_ORDER = ["datetime","type","details","addons","payment","confirm"];

export default function BookingFlow() {
  const [currentStep, setCurrentStep] = useState("datetime");
  const [booking, setBooking] = useState({
    doctor: DOCTOR,
    date:   null,
    slot:   null,
    mode:   "video",
    patientDetails: {},
    medication: null,
    addNurse:   false,
    addReport:  false,
    paymentMethod: "upi",
  });
  const [processing, setProcessing] = useState(false);
  const [success,    setSuccess]    = useState(false);
  const contentRef = useRef(null);

  const idx     = STEP_ORDER.indexOf(currentStep);
  const isFirst = idx === 0;
  const isLast  = idx === STEP_ORDER.length - 1;

  const canProceed = () => {
    if (currentStep === "datetime") return booking.date && booking.slot;
    if (currentStep === "type")     return !!booking.mode;
    if (currentStep === "details")  return !!(booking.patientDetails?.name && booking.patientDetails?.phone && booking.patientDetails?.email);
    return true;
  };

  const handleNext = () => {
    if (isLast) {
      setProcessing(true);
      setTimeout(() => { setProcessing(false); setSuccess(true); }, 2200);
      return;
    }
    contentRef.current?.scrollTo({ top:0, behavior:"smooth" });
    setCurrentStep(STEP_ORDER[idx + 1]);
  };

  const handleBack = () => {
    if (!isFirst) {
      contentRef.current?.scrollTo({ top:0, behavior:"smooth" });
      setCurrentStep(STEP_ORDER[idx - 1]);
    }
  };

  const CTAlabels = {
    datetime: "Select Consultation Type →",
    type:     "Enter Your Details →",
    details:  "Choose Add-ons →",
    addons:   "Proceed to Payment →",
    payment:  "Review & Confirm →",
    confirm:  `Confirm & Pay ₹${DOCTOR.fee + (booking.medication?.price || 0) + (booking.addNurse?299:0) + (booking.addReport?199:0)}`,
  };

  const progressPct = ((idx + 1) / STEP_ORDER.length) * 100;

  if (success) {
    return (
      <>
        <style>{CSS}</style>
        <div style={{ display:"flex", height:"100vh", overflow:"hidden" }}>
          <StepSidebar steps={BOOKING_STEPS.slice(1)} current="confirm" />
          <SuccessScreen booking={booking} onReset={() => {
            setSuccess(false);
            setCurrentStep("datetime");
            setBooking(b => ({ ...b, date:null, slot:null }));
          }} />
        </div>
      </>
    );
  }

  return (
    <>
      <style>{CSS}</style>
      <div style={{ display:"flex", height:"100vh", overflow:"hidden" }}>
        {/* Sidebar */}
        <StepSidebar steps={BOOKING_STEPS.slice(1)} current={currentStep} />

        {/* Main */}
        <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>

          {/* Top bar */}
          <div style={{
            background:"var(--white)", borderBottom:"1px solid var(--border2)",
            padding:"0 28px", height:56, flexShrink:0,
            display:"flex", alignItems:"center", justifyContent:"space-between",
            boxShadow:"0 1px 4px rgba(0,0,0,.05)",
          }}>
            <div style={{ display:"flex", gap:8, alignItems:"center" }}>
              {!isFirst && (
                <button className="btn btn-outline btn-xs" onClick={handleBack}>
                  <ArrowLeft size={12} /> Back
                </button>
              )}
              <div style={{ fontSize:12, color:"var(--text3)", fontWeight:600 }}>
                Step {idx + 1} of {STEP_ORDER.length}
              </div>
            </div>

            {/* Progress bar */}
            <div style={{
              flex:1, maxWidth:300, height:5, borderRadius:100,
              background:"var(--border2)", overflow:"hidden", margin:"0 20px",
            }}>
              <div style={{
                height:"100%", borderRadius:100,
                background:"linear-gradient(90deg,var(--navy),var(--gold))",
                width:`${progressPct}%`,
                transition:"width .5s cubic-bezier(.4,0,.2,1)",
              }} />
            </div>

            <div style={{ fontSize:12, color:"var(--text3)" }}>
              Booking with <strong style={{ color:"var(--navy)" }}>{DOCTOR.name.split(" ")[1]}</strong>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} style={{
            flex:1, overflowY:"auto", padding:"32px 36px 120px",
          }}>
            {currentStep === "datetime" && <StepDateTime booking={booking} setBooking={setBooking} />}
            {currentStep === "type"     && <StepConsultType booking={booking} setBooking={setBooking} />}
            {currentStep === "details"  && <StepPatientDetails booking={booking} setBooking={setBooking} />}
            {currentStep === "addons"   && <StepAddOns booking={booking} setBooking={setBooking} />}
            {currentStep === "payment"  && <StepPayment booking={booking} setBooking={setBooking} />}
            {currentStep === "confirm"  && <StepConfirm booking={booking} />}
          </div>

          {/* Sticky CTA footer */}
          <div style={{
            position:"absolute", bottom:0, left:220, right:0,
            background:"var(--white)", borderTop:"1px solid var(--border2)",
            padding:"16px 36px",
            display:"flex", gap:14, alignItems:"center",
            boxShadow:"0 -4px 20px rgba(0,0,0,.08)",
          }}>
            {/* Mini summary */}
            {booking.date && booking.slot && (
              <div style={{ flex:1, fontSize:13, color:"var(--text2)" }}>
                <strong style={{ color:"var(--ink)" }}>
                  {booking.date.toLocaleDateString("en-IN",{day:"numeric",month:"short"})}
                </strong>
                {" · "}{booking.slot}
                {booking.mode && ` · ${booking.mode}`}
              </div>
            )}

            {!processing ? (
              <button
                className={`btn ${isLast ? "btn-shimmer" : "btn-navy"}`}
                style={{ minWidth:240, fontSize:15 }}
                disabled={!canProceed()}
                onClick={handleNext}
              >
                {isLast && <Lock size={15} />}
                {CTAlabels[currentStep]}
                {!isLast && <ChevronRight size={16} />}
              </button>
            ) : (
              <button className="btn btn-navy" style={{ minWidth:240 }} disabled>
                <div style={{ width:18, height:18, borderRadius:"50%",
                  border:"2px solid rgba(255,255,255,.25)", borderTopColor:"white",
                  animation:"spin .75s linear infinite" }} />
                Processing payment…
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
