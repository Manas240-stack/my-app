import { useState, useEffect, useRef } from "react";
import {
  Activity, Phone, Shield, ChevronRight, ArrowLeft,
  Check, Eye, EyeOff, User, Stethoscope, Lock,
  RefreshCw, CheckCircle2, AlertCircle, X, Zap,
  FileText, Camera, Upload, Star, Clock, Info
} from "lucide-react";

/* ═══════════════════════════════════════════
   STYLES — Aesthetic: Bold split-screen
   Deep black left panel + pure white right
   Fonts: Clash Display + Satoshi
═══════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,700;0,800;1,700&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{
  --black:   #080c10;
  --black2:  #0e1420;
  --black3:  #161e2e;
  --accent:  #3b82f6;
  --accent2: #60a5fa;
  --accent3: #93c5fd;
  --teal:    #14b8a6;
  --green:   #22c55e;
  --red:     #ef4444;
  --amber:   #f59e0b;
  --white:   #ffffff;
  --off:     #f8fafc;
  --s200:    #e2e8f0;
  --s400:    #94a3b8;
  --s500:    #64748b;
  --s600:    #475569;
  --s700:    #334155;
  --s800:    #1e293b;
  --s900:    #0f172a;
  --r:       10px;
  --r-lg:    16px;
  --r-xl:    24px;
}
html,body,#root{height:100%;overflow:hidden;}
body{font-family:'Manrope',sans-serif;background:var(--black);-webkit-font-smoothing:antialiased;}
.serif{font-family:'Playfair Display',Georgia,serif;}

@keyframes fadeUp  {from{opacity:0;transform:translateY(18px);}to{opacity:1;transform:translateY(0);}}
@keyframes fadeIn  {from{opacity:0;}to{opacity:1;}}
@keyframes spin    {to{transform:rotate(360deg);}}
@keyframes pulse   {0%,100%{opacity:1;}50%{opacity:.4;}}
@keyframes shake   {0%,100%{transform:translateX(0);}20%,60%{transform:translateX(-8px);}40%,80%{transform:translateX(8px);}}
@keyframes bounce  {0%,100%{transform:scale(1);}50%{transform:scale(1.12);}}
@keyframes glow    {0%,100%{box-shadow:0 0 8px rgba(59,130,246,.3);}50%{box-shadow:0 0 24px rgba(59,130,246,.6);}}
@keyframes countDown{from{stroke-dashoffset:0;}to{stroke-dashoffset:88;}}
@keyframes slideUp {from{opacity:0;transform:translateY(32px);}to{opacity:1;transform:translateY(0);}}
@keyframes checkPop{0%{transform:scale(0) rotate(-45deg);}60%{transform:scale(1.2) rotate(5deg);}100%{transform:scale(1) rotate(0);};}

.fu{animation:fadeUp  .5s cubic-bezier(.22,1,.36,1) both;}
.fi{animation:fadeIn  .35s ease both;}
.su{animation:slideUp .5s cubic-bezier(.22,1,.36,1) both;}
.d1{animation-delay:.06s;opacity:0;}
.d2{animation-delay:.12s;opacity:0;}
.d3{animation-delay:.18s;opacity:0;}
.d4{animation-delay:.24s;opacity:0;}
.d5{animation-delay:.30s;opacity:0;}
.d6{animation-delay:.36s;opacity:0;}

/* OTP input boxes */
.otp-box{
  width:56px;height:64px;border-radius:var(--r-lg);
  border:2px solid var(--s200);
  font-family:'Manrope',sans-serif;
  font-size:28px;font-weight:800;text-align:center;
  color:var(--s900);background:var(--white);outline:none;
  transition:border-color .2s,box-shadow .2s,transform .15s;
  caret-color:var(--accent);
}
.otp-box:focus{
  border-color:var(--accent);
  box-shadow:0 0 0 4px rgba(59,130,246,.12);
  transform:scale(1.04);
}
.otp-box.filled{border-color:var(--accent);background:var(--off);}
.otp-box.error{border-color:var(--red);animation:shake .4s ease;}
.otp-box.success{border-color:var(--green);}

/* Input */
.inp{
  width:100%;padding:13px 16px;
  border:1.5px solid var(--s200);border-radius:var(--r-lg);
  font-family:'Manrope',sans-serif;font-size:15px;
  color:var(--s900);background:var(--white);outline:none;
  transition:border-color .2s,box-shadow .2s;
}
.inp:focus{border-color:var(--accent);box-shadow:0 0 0 3px rgba(59,130,246,.1);}
.inp::placeholder{color:var(--s400);}
.inp.err{border-color:var(--red);}
.inp-prefix{
  display:flex;align-items:center;
  border:1.5px solid var(--s200);border-radius:var(--r-lg);
  background:var(--white);overflow:hidden;
  transition:border-color .2s,box-shadow .2s;
}
.inp-prefix:focus-within{border-color:var(--accent);box-shadow:0 0 0 3px rgba(59,130,246,.1);}
.inp-prefix-inner{
  border:none;outline:none;flex:1;padding:13px 16px;
  font-family:'Manrope',sans-serif;font-size:15px;color:var(--s900);
  background:transparent;
}
.inp-prefix-inner::placeholder{color:var(--s400);}

/* Role card */
.role-card{
  display:flex;align-items:center;gap:16px;
  padding:20px;border-radius:var(--r-xl);
  border:2px solid var(--s200);
  cursor:pointer;transition:all .2s;background:var(--white);
}
.role-card:hover{border-color:var(--accent2);box-shadow:0 4px 20px rgba(59,130,246,.1);}
.role-card.active{
  border-color:var(--accent);
  background:linear-gradient(135deg,rgba(59,130,246,.04),rgba(96,165,250,.02));
  box-shadow:0 0 0 3px rgba(59,130,246,.1),0 8px 24px rgba(59,130,246,.08);
}

/* Btn */
.btn{
  display:inline-flex;align-items:center;justify-content:center;gap:8px;
  padding:14px 28px;border-radius:var(--r-lg);border:none;
  font-family:'Manrope',sans-serif;font-size:15px;font-weight:700;
  cursor:pointer;transition:all .2s;line-height:1;
}
.btn-accent{
  background:linear-gradient(135deg,var(--accent),#2563eb);
  color:var(--white);box-shadow:0 4px 16px rgba(59,130,246,.35);
}
.btn-accent:hover{transform:translateY(-1px);box-shadow:0 8px 24px rgba(59,130,246,.45);}
.btn-accent:active{transform:translateY(0);}
.btn-accent:disabled{opacity:.45;cursor:not-allowed;transform:none !important;}
.btn-outline{background:transparent;border:1.5px solid var(--s200);color:var(--s600);}
.btn-outline:hover{border-color:var(--accent);color:var(--accent);background:rgba(59,130,246,.04);}
.btn-black{background:var(--black);color:var(--white);border:1.5px solid rgba(255,255,255,.12);}
.btn-black:hover{background:var(--black2);}
.btn-full{width:100%;}

/* Step pill */
.step-pill{
  display:flex;align-items:center;gap:6px;
  padding:5px 14px;border-radius:100px;
  background:rgba(59,130,246,.1);border:1px solid rgba(59,130,246,.2);
  font-size:12px;font-weight:700;color:var(--accent2);
}

/* Progress dots */
.prog-dot{
  width:8px;height:8px;border-radius:50%;transition:all .3s;
}
.prog-dot.active{background:var(--accent);width:24px;border-radius:4px;}
.prog-dot.done{background:var(--green);}
.prog-dot.idle{background:var(--s200);}

/* Left panel mesh */
.left-mesh{
  background:
    radial-gradient(ellipse 70% 50% at 20% 20%,rgba(59,130,246,.15) 0%,transparent 60%),
    radial-gradient(ellipse 50% 40% at 80% 80%,rgba(20,184,166,.1) 0%,transparent 50%),
    linear-gradient(160deg,var(--black) 0%,var(--black2) 50%,var(--black3) 100%);
}

/* Select */
.sel{
  width:100%;padding:13px 36px 13px 16px;
  border:1.5px solid var(--s200);border-radius:var(--r-lg);
  font-family:'Manrope',sans-serif;font-size:15px;color:var(--s900);
  background:var(--white);outline:none;cursor:pointer;
  appearance:none;-webkit-appearance:none;
  transition:border-color .2s;
}
.sel:focus{border-color:var(--accent);box-shadow:0 0 0 3px rgba(59,130,246,.1);}
.sel-wrap{position:relative;}
.sel-wrap::after{
  content:'';position:absolute;right:14px;top:50%;transform:translateY(-50%);
  border:5px solid transparent;border-top-color:var(--s400);pointer-events:none;
}

/* Timer ring */
.timer-ring{transform:rotate(-90deg);}
.timer-track{fill:none;stroke:var(--s200);stroke-width:3;}
.timer-fill{fill:none;stroke:var(--accent);stroke-width:3;stroke-linecap:round;transition:stroke-dashoffset .1s linear;}

/* Upload zone */
.upload-zone{
  border:2px dashed var(--s200);border-radius:var(--r-xl);
  padding:24px;text-align:center;cursor:pointer;
  transition:all .2s;background:var(--off);
}
.upload-zone:hover{border-color:var(--accent2);background:rgba(59,130,246,.03);}

/* Scrollbar */
::-webkit-scrollbar{width:4px;}
::-webkit-scrollbar-thumb{background:var(--s200);border-radius:2px;}

/* Check field */
.check-row{display:flex;align-items:center;gap:10px;padding:6px 0;cursor:pointer;}
.check-box{
  width:20px;height:20px;border-radius:6px;flex-shrink:0;
  border:2px solid var(--s300,#cbd5e1);transition:all .2s;
  display:flex;align-items:center;justify-content:center;
}
.check-box.checked{background:var(--accent);border-color:var(--accent);}
`;

/* ═══════════════════════════════════════════
   DATA
═══════════════════════════════════════════ */
const SPECIALTIES = [
  "Endocrinology","Internal Medicine","General Practice",
  "Bariatric Medicine","Diabetology","Nutrition & Dietetics",
  "Metabolism & Obesity","Family Medicine",
];
const LANGUAGES  = ["English","Hindi","Tamil","Telugu","Kannada","Malayalam","Marathi","Bengali","Gujarati"];
const CITIES     = ["Mumbai","Delhi","Bengaluru","Chennai","Hyderabad","Pune","Kolkata","Ahmedabad","Jaipur","Kochi"];

/* ═══════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════ */
function FieldLabel({ children, required }) {
  return (
    <label style={{ display:"block", fontSize:12, fontWeight:700, color:"var(--s600)",
      marginBottom:6, letterSpacing:".04em" }}>
      {children}{required && <span style={{ color:"var(--red)", marginLeft:3 }}>*</span>}
    </label>
  );
}
function FieldErr({ msg }) {
  if (!msg) return null;
  return (
    <div style={{ display:"flex", alignItems:"center", gap:4, marginTop:5 }}>
      <AlertCircle size={11} color="var(--red)" />
      <span style={{ fontSize:11, color:"var(--red)" }}>{msg}</span>
    </div>
  );
}
function Divider({ label }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:12, margin:"20px 0" }}>
      <div style={{ flex:1, height:1, background:"var(--s200)" }} />
      {label && <span style={{ fontSize:12, color:"var(--s400)", fontWeight:600 }}>{label}</span>}
      <div style={{ flex:1, height:1, background:"var(--s200)" }} />
    </div>
  );
}
function Spinner({ size=18, color="white" }) {
  return <div style={{ width:size, height:size, borderRadius:"50%",
    border:`2.5px solid rgba(255,255,255,.25)`, borderTopColor:color,
    animation:"spin .75s linear infinite", flexShrink:0 }} />;
}

/* ═══════════════════════════════════════════
   OTP INPUT COMPONENT
═══════════════════════════════════════════ */
function OTPInput({ length=6, value, onChange, status }) {
  const inputs = useRef([]);

  const handleKey = (e, idx) => {
    if (e.key === "Backspace") {
      if (!value[idx] && idx > 0) {
        inputs.current[idx - 1]?.focus();
        const arr = value.split("");
        arr[idx - 1] = "";
        onChange(arr.join(""));
      } else {
        const arr = value.split("");
        arr[idx] = "";
        onChange(arr.join(""));
      }
      return;
    }
    if (e.key === "ArrowLeft" && idx > 0) { inputs.current[idx-1]?.focus(); return; }
    if (e.key === "ArrowRight" && idx < length-1) { inputs.current[idx+1]?.focus(); return; }
  };

  const handleChange = (e, idx) => {
    const v = e.target.value.replace(/\D/g,"").slice(-1);
    const arr = value.padEnd(length," ").split("");
    arr[idx] = v;
    const next = arr.join("").replace(/ /g,"");
    onChange(next);
    if (v && idx < length - 1) inputs.current[idx + 1]?.focus();
  };

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g,"").slice(0, length);
    onChange(pasted);
    inputs.current[Math.min(pasted.length, length-1)]?.focus();
    e.preventDefault();
  };

  return (
    <div style={{ display:"flex", gap:10, justifyContent:"center" }}>
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          ref={el => inputs.current[i] = el}
          className={`otp-box ${value[i] ? "filled":""} ${status==="error"?"error":""} ${status==="success"?"success":""}`}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[i] || ""}
          onChange={e => handleChange(e, i)}
          onKeyDown={e => handleKey(e, i)}
          onPaste={handlePaste}
          autoComplete="one-time-code"
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════
   COUNTDOWN TIMER RING
═══════════════════════════════════════════ */
function TimerRing({ seconds, total=30 }) {
  const r = 14;
  const circ = 2 * Math.PI * r;
  const offset = circ - (seconds / total) * circ;
  return (
    <div style={{ position:"relative", width:36, height:36 }}>
      <svg width={36} height={36} className="timer-ring">
        <circle cx={18} cy={18} r={r} className="timer-track" />
        <circle cx={18} cy={18} r={r} className="timer-fill"
          strokeDasharray={circ}
          strokeDashoffset={offset}
        />
      </svg>
      <div style={{
        position:"absolute", inset:0,
        display:"flex", alignItems:"center", justifyContent:"center",
        fontSize:11, fontWeight:800, color:"var(--accent)",
      }}>{seconds}</div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   LEFT PANEL
═══════════════════════════════════════════ */
function LeftPanel({ role }) {
  const isDoctor = role === "doctor";
  return (
    <div className="left-mesh" style={{
      width:440, flexShrink:0,
      padding:"48px 48px",
      display:"flex", flexDirection:"column",
      position:"relative", overflow:"hidden",
    }}>
      {/* Grid dots bg */}
      <div style={{
        position:"absolute", inset:0, pointerEvents:"none",
        backgroundImage:"radial-gradient(circle,rgba(255,255,255,.06) 1px,transparent 1px)",
        backgroundSize:"28px 28px",
      }} />

      {/* Logo */}
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:56, position:"relative" }}>
        <div style={{
          width:38, height:38, borderRadius:12,
          background:"linear-gradient(135deg,var(--accent),#1d4ed8)",
          display:"flex", alignItems:"center", justifyContent:"center",
          boxShadow:"0 4px 16px rgba(59,130,246,.4)",
        }}>
          <Activity size={20} color="white" />
        </div>
        <div>
          <div style={{ fontFamily:"Playfair Display,serif", fontSize:22, fontWeight:800,
            color:"white", letterSpacing:"-.02em", lineHeight:1 }}>SlimRx</div>
          <div style={{ fontSize:10, color:"rgba(255,255,255,.35)", letterSpacing:".1em" }}>HEALTH PLATFORM</div>
        </div>
      </div>

      {/* Main copy */}
      <div style={{ flex:1, display:"flex", flexDirection:"column", justifyContent:"center", position:"relative" }}>
        <div style={{ marginBottom:16 }}>
          <span style={{
            fontSize:11, fontWeight:700, letterSpacing:".12em",
            color:"var(--accent2)", textTransform:"uppercase",
          }}>
            {isDoctor ? "Physician Portal" : "Patient Portal"}
          </span>
        </div>

        <h1 style={{
          fontFamily:"Playfair Display,serif",
          fontSize:42, fontWeight:800, color:"white",
          lineHeight:1.1, letterSpacing:"-.03em", marginBottom:20,
        }}>
          {isDoctor
            ? <>India's most <em>trusted</em> GLP-1 platform</>
            : <>Your weight-loss <em>journey</em> starts here</>}
        </h1>

        <p style={{ fontSize:15, color:"rgba(255,255,255,.55)", lineHeight:1.75, marginBottom:40, maxWidth:340 }}>
          {isDoctor
            ? "Join 600+ physicians prescribing affordable Indian generic GLP-1 medications to thousands of patients nationwide."
            : "Access doctor-prescribed GLP-1 medications from ₹1,299/month. Same molecule as Ozempic®. Delivered to your door."}
        </p>

        {/* Feature bullets */}
        {(isDoctor ? [
          { icon:"🏥", text:"MCI-verified physician onboarding" },
          { icon:"📋", text:"Digital prescription tools built-in" },
          { icon:"👥", text:"Patient queue & management dashboard" },
          { icon:"💰", text:"Competitive consultation fee structure" },
        ] : [
          { icon:"💊", text:"Semaglutide & Liraglutide from ₹1,299/mo" },
          { icon:"👩‍⚕️", text:"Licensed MBBS/MD consultation included" },
          { icon:"🚚", text:"Cold-chain delivery within 24 hours" },
          { icon:"🔒", text:"HIPAA-equivalent privacy protection" },
        ]).map((f, i) => (
          <div key={i} style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
            <div style={{
              width:36, height:36, borderRadius:10, flexShrink:0,
              background:"rgba(255,255,255,.06)", border:"1px solid rgba(255,255,255,.08)",
              display:"flex", alignItems:"center", justifyContent:"center", fontSize:17,
            }}>{f.icon}</div>
            <span style={{ fontSize:13.5, color:"rgba(255,255,255,.65)" }}>{f.text}</span>
          </div>
        ))}
      </div>

      {/* Social proof */}
      <div style={{
        background:"rgba(255,255,255,.05)", border:"1px solid rgba(255,255,255,.08)",
        borderRadius:16, padding:"16px 20px", position:"relative",
      }}>
        <div style={{ display:"flex", gap:16, alignItems:"center" }}>
          <div style={{ display:"flex" }}>
            {["👩‍💼","👨‍💻","👩‍⚕️","👨‍🦱"].map((e,i) => (
              <div key={i} style={{
                width:32, height:32, borderRadius:"50%", fontSize:18,
                background:"rgba(255,255,255,.1)", border:"2px solid rgba(0,0,0,.3)",
                display:"flex", alignItems:"center", justifyContent:"center",
                marginLeft: i > 0 ? -10 : 0,
              }}>{e}</div>
            ))}
          </div>
          <div>
            <div style={{ fontSize:13, fontWeight:700, color:"white", lineHeight:1 }}>
              {isDoctor ? "600+ Physicians" : "47,000+ Patients"}
            </div>
            <div style={{ fontSize:11, color:"rgba(255,255,255,.4)", marginTop:2 }}>
              {isDoctor ? "Already on the platform" : "Actively on treatment"}
            </div>
          </div>
          <div style={{ marginLeft:"auto", textAlign:"right" }}>
            <div style={{ fontSize:18, fontWeight:900, color:"var(--accent2)" }}>4.9★</div>
            <div style={{ fontSize:10, color:"rgba(255,255,255,.3)" }}>avg rating</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   SCREEN 1 — ROLE SELECT
═══════════════════════════════════════════ */
function ScreenRoleSelect({ onSelect }) {
  const [hovered, setHovered] = useState(null);
  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%", padding:"48px 52px", justifyContent:"center" }}>
      <div className="fu d1" style={{ marginBottom:8 }}>
        <span style={{ fontSize:12, fontWeight:700, color:"var(--s500)", letterSpacing:".1em" }}>WELCOME TO SLIMRX</span>
      </div>
      <h2 className="fu d2" style={{ fontFamily:"Playfair Display,serif", fontSize:34, fontWeight:800,
        color:"var(--s900)", letterSpacing:"-.03em", marginBottom:10 }}>
        Who are you?
      </h2>
      <p className="fu d3" style={{ fontSize:15, color:"var(--s500)", marginBottom:40, lineHeight:1.65 }}>
        Choose your role to get started. You can switch anytime from settings.
      </p>

      <div style={{ display:"flex", flexDirection:"column", gap:14, marginBottom:40 }}>
        {[
          {
            role:"patient", emoji:"🙋", title:"I'm a Patient",
            sub:"I want to access GLP-1 weight-loss medication with a doctor's prescription.",
            color:"var(--accent)",
          },
          {
            role:"doctor", emoji:"👨‍⚕️", title:"I'm a Physician",
            sub:"I want to join SlimRx as a consulting doctor and prescribe GLP-1 medications.",
            color:"var(--teal)",
          },
        ].map((r, i) => (
          <div key={r.role}
            className={`role-card fu d${i+4} ${hovered === r.role ? "active" : ""}`}
            onClick={() => onSelect(r.role)}
            onMouseEnter={() => setHovered(r.role)}
            onMouseLeave={() => setHovered(null)}
          >
            <div style={{
              width:52, height:52, borderRadius:16, fontSize:26, flexShrink:0,
              background:`${r.color}10`, border:`1.5px solid ${r.color}25`,
              display:"flex", alignItems:"center", justifyContent:"center",
            }}>{r.emoji}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:800, fontSize:16, color:"var(--s900)", marginBottom:4 }}>{r.title}</div>
              <div style={{ fontSize:13, color:"var(--s500)", lineHeight:1.55 }}>{r.sub}</div>
            </div>
            <ChevronRight size={18} color="var(--s400)" />
          </div>
        ))}
      </div>

      <p className="fu d6" style={{ fontSize:12, color:"var(--s400)", textAlign:"center" }}>
        By continuing you agree to SlimRx's{" "}
        <a href="#" style={{ color:"var(--accent)", textDecoration:"none" }}>Terms of Service</a> and{" "}
        <a href="#" style={{ color:"var(--accent)", textDecoration:"none" }}>Privacy Policy</a>
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════
   SCREEN 2 — PHONE INPUT
═══════════════════════════════════════════ */
function ScreenPhone({ role, mode, onBack, onSendOTP }) {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const isDoctor = role === "doctor";
  const isLogin  = mode === "login";

  const validate = () => {
    if (!/^[6-9]\d{9}$/.test(phone)) {
      setErr("Enter a valid 10-digit Indian mobile number");
      return false;
    }
    return true;
  };

  const handleSend = () => {
    if (!validate()) return;
    setLoading(true);
    setErr("");
    setTimeout(() => {
      setLoading(false);
      onSendOTP(phone);
    }, 1400);
  };

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%", padding:"48px 52px", justifyContent:"center" }}>
      <button className="fu d1" onClick={onBack} style={{
        display:"flex", alignItems:"center", gap:6,
        background:"none", border:"none", cursor:"pointer",
        fontSize:13, fontWeight:600, color:"var(--s500)", marginBottom:32,
        fontFamily:"Manrope,sans-serif",
      }}>
        <ArrowLeft size={15} /> Back
      </button>

      <div className="fu d1" style={{ marginBottom:8 }}>
        <span className="step-pill">
          <span>Step 1 of {isDoctor && !isLogin ? "4" : "2"}</span>
        </span>
      </div>

      <h2 className="fu d2" style={{ fontFamily:"Playfair Display,serif", fontSize:32, fontWeight:800,
        color:"var(--s900)", letterSpacing:"-.03em", marginBottom:10 }}>
        {isLogin ? "Welcome back" : `Create your ${isDoctor ? "physician" : "patient"} account`}
      </h2>
      <p className="fu d3" style={{ fontSize:14, color:"var(--s500)", marginBottom:36, lineHeight:1.65 }}>
        {isLogin
          ? "Enter your registered mobile number. We'll send a 6-digit OTP."
          : "We'll verify your mobile number with a one-time password."}
      </p>

      <div className="fu d4" style={{ marginBottom:20 }}>
        <FieldLabel required>Mobile Number</FieldLabel>
        <div className={`inp-prefix ${err ? "err":""}`} style={{ borderColor: err ? "var(--red)" : undefined }}>
          <div style={{
            padding:"13px 14px", borderRight:"1.5px solid var(--s200)",
            fontSize:15, fontWeight:700, color:"var(--s700)",
            background:"var(--off)", flexShrink:0,
          }}>🇮🇳 +91</div>
          <input
            className="inp-prefix-inner"
            type="tel"
            placeholder="98765 43210"
            value={phone}
            onChange={e => { setPhone(e.target.value.replace(/\D/g,"").slice(0,10)); setErr(""); }}
            onKeyDown={e => e.key === "Enter" && handleSend()}
            maxLength={10}
            autoFocus
          />
          {phone.length === 10 && (
            <div style={{ padding:"0 14px" }}>
              <CheckCircle2 size={18} color="var(--green)" />
            </div>
          )}
        </div>
        <FieldErr msg={err} />
      </div>

      <button
        className="fu d5 btn btn-accent btn-full"
        onClick={handleSend}
        disabled={phone.length < 10 || loading}
        style={{ marginBottom:20 }}
      >
        {loading ? <><Spinner /> Sending OTP…</> : <>Send OTP <ChevronRight size={16} /></>}
      </button>

      <div className="fu d6" style={{ textAlign:"center" }}>
        <span style={{ fontSize:13, color:"var(--s500)" }}>
          {isLogin ? "New to SlimRx? " : "Already have an account? "}
        </span>
        <button onClick={() => {}} style={{
          background:"none", border:"none", cursor:"pointer",
          fontSize:13, fontWeight:700, color:"var(--accent)",
          fontFamily:"Manrope,sans-serif",
        }}>
          {isLogin ? "Create account" : "Sign in instead"}
        </button>
      </div>

      <div className="fu" style={{ marginTop:32, display:"flex", alignItems:"center", gap:6,
        fontSize:11, color:"var(--s400)", justifyContent:"center" }}>
        <Lock size={11} color="var(--accent)" /> OTP delivered via SMS · Expires in 10 minutes
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   SCREEN 3 — OTP VERIFY
═══════════════════════════════════════════ */
function ScreenOTP({ phone, role, mode, onBack, onVerified }) {
  const [otp, setOtp] = useState("");
  const [status, setStatus] = useState("idle"); // idle|verifying|error|success
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const isDoctor = role === "doctor";
  const isLogin  = mode === "login";

  // Countdown
  useEffect(() => {
    if (timer <= 0) { setCanResend(true); return; }
    const t = setTimeout(() => setTimer(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [timer]);

  const handleResend = () => {
    setTimer(30);
    setCanResend(false);
    setOtp("");
    setStatus("idle");
  };

  // Auto-verify when 6 digits entered
  useEffect(() => {
    if (otp.length === 6) {
      setStatus("verifying");
      setTimeout(() => {
        // Simulate: "000000" = wrong
        if (otp === "000000") {
          setStatus("error");
          setTimeout(() => { setStatus("idle"); setOtp(""); }, 1200);
        } else {
          setStatus("success");
          setTimeout(() => onVerified(), 800);
        }
      }, 1200);
    }
  }, [otp]);

  const maskedPhone = `+91 ${phone.slice(0,5)}XXXXX`;

  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%", padding:"48px 52px", justifyContent:"center" }}>
      <button className="fu d1" onClick={onBack} style={{
        display:"flex", alignItems:"center", gap:6,
        background:"none", border:"none", cursor:"pointer",
        fontSize:13, fontWeight:600, color:"var(--s500)", marginBottom:32,
        fontFamily:"Manrope,sans-serif",
      }}>
        <ArrowLeft size={15} /> Change number
      </button>

      <div className="fu d1" style={{ marginBottom:8 }}>
        <span className="step-pill">Step 2 of {isDoctor && !isLogin ? "4" : "2"}</span>
      </div>

      <h2 className="fu d2" style={{ fontFamily:"Playfair Display,serif", fontSize:32, fontWeight:800,
        color:"var(--s900)", letterSpacing:"-.03em", marginBottom:10 }}>
        Verify your number
      </h2>
      <p className="fu d3" style={{ fontSize:14, color:"var(--s500)", marginBottom:8, lineHeight:1.65 }}>
        We sent a 6-digit code to <strong style={{ color:"var(--s800)" }}>{maskedPhone}</strong>
      </p>
      <p className="fu d3" style={{ fontSize:12, color:"var(--s400)", marginBottom:36 }}>
        Hint: Any code except 000000 will work in this demo 😊
      </p>

      {/* OTP input */}
      <div className="fu d4" style={{ marginBottom:24 }}>
        <OTPInput length={6} value={otp} onChange={setOtp} status={status} />
      </div>

      {/* Status feedback */}
      {status === "verifying" && (
        <div className="fi" style={{ display:"flex", alignItems:"center", justifyContent:"center",
          gap:8, marginBottom:20, color:"var(--s500)", fontSize:13 }}>
          <Spinner size={16} color="var(--accent)" /> Verifying…
        </div>
      )}
      {status === "error" && (
        <div className="fi" style={{ display:"flex", alignItems:"center", justifyContent:"center",
          gap:6, marginBottom:20, color:"var(--red)", fontSize:13, fontWeight:600 }}>
          <AlertCircle size={14} /> Incorrect code. Please try again.
        </div>
      )}
      {status === "success" && (
        <div className="fi" style={{ display:"flex", alignItems:"center", justifyContent:"center",
          gap:6, marginBottom:20, color:"var(--green)", fontSize:13, fontWeight:700 }}>
          <CheckCircle2 size={16} style={{ animation:"checkPop .4s ease" }} /> Verified successfully!
        </div>
      )}

      {/* Resend */}
      <div className="fu d5" style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:12 }}>
        {canResend ? (
          <button onClick={handleResend} style={{
            background:"none", border:"none", cursor:"pointer",
            fontSize:13, fontWeight:700, color:"var(--accent)",
            display:"flex", alignItems:"center", gap:6,
            fontFamily:"Manrope,sans-serif",
          }}>
            <RefreshCw size={13} /> Resend OTP
          </button>
        ) : (
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <TimerRing seconds={timer} total={30} />
            <span style={{ fontSize:13, color:"var(--s500)" }}>
              Resend in <strong>{timer}s</strong>
            </span>
          </div>
        )}
      </div>

      <div style={{ marginTop:32, display:"flex", alignItems:"center", gap:6,
        fontSize:11, color:"var(--s400)", justifyContent:"center" }}>
        <Shield size={11} color="var(--accent)" /> Your number is never shared with third parties
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   SCREEN 4 — PATIENT PROFILE SETUP
═══════════════════════════════════════════ */
function ScreenPatientProfile({ onComplete }) {
  const [form, setForm] = useState({ name:"", dob:"", gender:"", city:"", weight:"", height:"" });
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]:v }));
  const valid = form.name && form.dob && form.gender && form.city && agree;

  const handleSubmit = () => {
    if (!valid) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); onComplete("patient", form); }, 1600);
  };

  return (
    <div style={{ height:"100%", overflowY:"auto", padding:"40px 52px" }}>
      <div style={{ marginBottom:8 }}>
        <span className="step-pill">Step 3 of 3 — Almost there!</span>
      </div>
      <h2 className="fu" style={{ fontFamily:"Playfair Display,serif", fontSize:28, fontWeight:800,
        color:"var(--s900)", letterSpacing:"-.03em", marginBottom:6 }}>
        Complete your profile
      </h2>
      <p style={{ fontSize:13.5, color:"var(--s500)", marginBottom:28, lineHeight:1.6 }}>
        This helps your doctor personalise your treatment plan.
      </p>

      {/* Avatar */}
      <div className="upload-zone" style={{ marginBottom:24 }}>
        <div style={{ fontSize:40, marginBottom:8 }}>🙋</div>
        <div style={{ fontSize:13, fontWeight:600, color:"var(--s600)", marginBottom:2 }}>
          Add a profile photo (optional)
        </div>
        <div style={{ fontSize:11, color:"var(--s400)" }}>JPG or PNG, max 2MB</div>
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>
        <div style={{ gridColumn:"1/-1" }}>
          <FieldLabel required>Full Name</FieldLabel>
          <input className="inp" placeholder="As per Aadhaar" value={form.name}
            onChange={e => set("name", e.target.value)} />
        </div>
        <div>
          <FieldLabel required>Date of Birth</FieldLabel>
          <input className="inp" type="date" value={form.dob}
            onChange={e => set("dob", e.target.value)} />
        </div>
        <div>
          <FieldLabel required>Gender</FieldLabel>
          <div className="sel-wrap">
            <select className="sel" value={form.gender} onChange={e => set("gender", e.target.value)}>
              <option value="">Select</option>
              {["Male","Female","Non-binary","Prefer not to say"].map(g => <option key={g}>{g}</option>)}
            </select>
          </div>
        </div>
        <div>
          <FieldLabel>Current Weight (kg)</FieldLabel>
          <input className="inp" type="number" placeholder="e.g. 82" value={form.weight}
            onChange={e => set("weight", e.target.value)} />
        </div>
        <div>
          <FieldLabel>Height (cm)</FieldLabel>
          <input className="inp" type="number" placeholder="e.g. 165" value={form.height}
            onChange={e => set("height", e.target.value)} />
        </div>
        <div style={{ gridColumn:"1/-1" }}>
          <FieldLabel required>City</FieldLabel>
          <div className="sel-wrap">
            <select className="sel" value={form.city} onChange={e => set("city", e.target.value)}>
              <option value="">Select city</option>
              {CITIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="check-row" onClick={() => setAgree(a => !a)} style={{ marginBottom:24 }}>
        <div className={`check-box ${agree ? "checked":""}`}>
          {agree && <Check size={12} color="white" strokeWidth={3} />}
        </div>
        <span style={{ fontSize:13, color:"var(--s600)", lineHeight:1.5 }}>
          I consent to SlimRx storing my health data for the purpose of medical consultation,
          as outlined in the <a href="#" style={{ color:"var(--accent)" }}>Privacy Policy</a>.
        </span>
      </div>

      <button className="btn btn-accent btn-full"
        onClick={handleSubmit} disabled={!valid || loading}>
        {loading ? <><Spinner /> Setting up your account…</> : <>Complete Registration <ChevronRight size={16} /></>}
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════
   SCREEN 5 — DOCTOR REGISTRATION (multi-step)
═══════════════════════════════════════════ */
function ScreenDoctorReg({ onComplete }) {
  const [step, setStep] = useState(0); // 0=personal 1=credentials 2=availability 3=docs
  const [form, setForm] = useState({
    name:"", dob:"", gender:"", city:"",
    mci:"", specialty:"", experience:"", languages:[],
    consultFee:"", slots:[], bio:"",
    docUploaded:false,
  });
  const [loading, setLoading] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]:v }));

  const STEPS = ["Personal Info","Credentials","Availability","Documents"];

  const handleNext = () => {
    if (step < 3) setStep(s => s + 1);
    else {
      setLoading(true);
      setTimeout(() => { setLoading(false); onComplete("doctor", form); }, 2000);
    }
  };

  const toggleLang = (lang) => {
    const curr = form.languages;
    set("languages", curr.includes(lang) ? curr.filter(l => l !== lang) : [...curr, lang]);
  };

  const TIME_SLOTS = ["9:00 AM","10:00 AM","11:00 AM","12:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM","6:00 PM","7:00 PM"];
  const toggleSlot = (slot) => {
    const curr = form.slots;
    set("slots", curr.includes(slot) ? curr.filter(s => s !== slot) : [...curr, slot]);
  };

  return (
    <div style={{ height:"100%", display:"flex", flexDirection:"column", overflow:"hidden" }}>
      {/* Header */}
      <div style={{ padding:"28px 52px 0", flexShrink:0 }}>
        <div style={{ marginBottom:12 }}>
          <span className="step-pill">Step {step + 3} of 6 — {STEPS[step]}</span>
        </div>
        <h2 style={{ fontFamily:"Playfair Display,serif", fontSize:26, fontWeight:800,
          color:"var(--s900)", letterSpacing:"-.03em", marginBottom:4 }}>
          {step === 0 && "Tell us about yourself"}
          {step === 1 && "Your medical credentials"}
          {step === 2 && "Set your availability"}
          {step === 3 && "Upload documents"}
        </h2>
        <p style={{ fontSize:13, color:"var(--s500)", marginBottom:20 }}>
          {step === 0 && "Basic profile information for your SlimRx physician profile."}
          {step === 1 && "MCI registration and specialisation details."}
          {step === 2 && "When are you available for teleconsultations?"}
          {step === 3 && "Required for MCI verification and pharmacy compliance."}
        </p>

        {/* Step dots */}
        <div style={{ display:"flex", gap:6, marginBottom:24 }}>
          {STEPS.map((_, i) => (
            <div key={i} className={`prog-dot ${i < step ? "done" : i === step ? "active" : "idle"}`} />
          ))}
        </div>
      </div>

      {/* Body */}
      <div style={{ flex:1, overflowY:"auto", padding:"0 52px 24px" }}>

        {/* STEP 0: Personal */}
        {step === 0 && (
          <div className="fi">
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
              <div style={{ gridColumn:"1/-1" }}>
                <FieldLabel required>Full Name (with title)</FieldLabel>
                <input className="inp" placeholder="Dr. Firstname Lastname" value={form.name}
                  onChange={e => set("name", e.target.value)} />
              </div>
              <div>
                <FieldLabel required>Date of Birth</FieldLabel>
                <input className="inp" type="date" value={form.dob}
                  onChange={e => set("dob", e.target.value)} />
              </div>
              <div>
                <FieldLabel required>Gender</FieldLabel>
                <div className="sel-wrap">
                  <select className="sel" value={form.gender} onChange={e => set("gender", e.target.value)}>
                    <option value="">Select</option>
                    {["Male","Female","Non-binary","Prefer not to say"].map(g => <option key={g}>{g}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ gridColumn:"1/-1" }}>
                <FieldLabel required>Primary Practice City</FieldLabel>
                <div className="sel-wrap">
                  <select className="sel" value={form.city} onChange={e => set("city", e.target.value)}>
                    <option value="">Select city</option>
                    {CITIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
              <div style={{ gridColumn:"1/-1" }}>
                <FieldLabel>Languages Spoken</FieldLabel>
                <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginTop:6 }}>
                  {LANGUAGES.map(lang => (
                    <button key={lang} onClick={() => toggleLang(lang)} style={{
                      padding:"6px 14px", borderRadius:100,
                      border:`1.5px solid ${form.languages.includes(lang) ? "var(--accent)" : "var(--s200)"}`,
                      background: form.languages.includes(lang) ? "var(--accent)" : "white",
                      color: form.languages.includes(lang) ? "white" : "var(--s600)",
                      fontSize:12, fontWeight:600, cursor:"pointer",
                      fontFamily:"Manrope,sans-serif", transition:"all .18s",
                    }}>
                      {lang}
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ gridColumn:"1/-1" }}>
                <FieldLabel>Short Bio (shown to patients)</FieldLabel>
                <textarea className="inp" rows={3} placeholder="e.g. MD Endocrinology with 12 years experience in metabolic disorders and weight management…"
                  value={form.bio} onChange={e => set("bio", e.target.value)}
                  style={{ resize:"vertical" }} />
              </div>
            </div>
          </div>
        )}

        {/* STEP 1: Credentials */}
        {step === 1 && (
          <div className="fi">
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
              <div style={{ gridColumn:"1/-1" }}>
                <FieldLabel required>MCI Registration Number</FieldLabel>
                <input className="inp" placeholder="e.g. MCI-234521" value={form.mci}
                  onChange={e => set("mci", e.target.value)} />
                <div style={{ fontSize:11, color:"var(--s400)", marginTop:5 }}>
                  We verify this with the Medical Council of India database within 24 hrs.
                </div>
              </div>
              <div style={{ gridColumn:"1/-1" }}>
                <FieldLabel required>Primary Specialty</FieldLabel>
                <div className="sel-wrap">
                  <select className="sel" value={form.specialty} onChange={e => set("specialty", e.target.value)}>
                    <option value="">Select specialty</option>
                    {SPECIALTIES.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <FieldLabel required>Years of Experience</FieldLabel>
                <div className="sel-wrap">
                  <select className="sel" value={form.experience} onChange={e => set("experience", e.target.value)}>
                    <option value="">Select</option>
                    {["1–3 years","4–7 years","8–12 years","13–20 years","20+ years"].map(x => <option key={x}>{x}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <FieldLabel required>Teleconsultation Fee (₹)</FieldLabel>
                <input className="inp" type="number" placeholder="e.g. 800" value={form.consultFee}
                  onChange={e => set("consultFee", e.target.value)} />
              </div>
            </div>

            <div style={{
              background:"rgba(59,130,246,.05)", border:"1px solid rgba(59,130,246,.15)",
              borderRadius:12, padding:"14px 16px", marginTop:20,
              display:"flex", gap:10, alignItems:"flex-start",
            }}>
              <Info size={15} color="var(--accent)" style={{ flexShrink:0, marginTop:2 }} />
              <div style={{ fontSize:12, color:"var(--s600)", lineHeight:1.6 }}>
                SlimRx charges a <strong>15% platform fee</strong> on each teleconsultation.
                You receive 85% of your consultation fee directly to your registered bank account within T+2 days.
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Availability */}
        {step === 2 && (
          <div className="fi">
            <FieldLabel>Select available time slots (patients will book within these)</FieldLabel>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(110px,1fr))", gap:8, marginTop:8, marginBottom:20 }}>
              {TIME_SLOTS.map(slot => (
                <button key={slot} onClick={() => toggleSlot(slot)} style={{
                  padding:"10px 8px", borderRadius:10,
                  border:`1.5px solid ${form.slots.includes(slot) ? "var(--accent)" : "var(--s200)"}`,
                  background: form.slots.includes(slot) ? "var(--accent)" : "white",
                  color: form.slots.includes(slot) ? "white" : "var(--s600)",
                  fontSize:13, fontWeight:600, cursor:"pointer",
                  fontFamily:"Manrope,sans-serif", transition:"all .18s",
                  display:"flex", alignItems:"center", justifyContent:"center", gap:4,
                }}>
                  {form.slots.includes(slot) && <Check size={11} strokeWidth={3} />}
                  {slot}
                </button>
              ))}
            </div>

            <div>
              <FieldLabel>Available Days</FieldLabel>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginTop:6 }}>
                {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(d => (
                  <button key={d} style={{
                    padding:"8px 14px", borderRadius:8,
                    border:"1.5px solid var(--s200)", background:"white",
                    color:"var(--s600)", fontSize:13, fontWeight:600,
                    cursor:"pointer", fontFamily:"Manrope,sans-serif",
                  }}>
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Documents */}
        {step === 3 && (
          <div className="fi">
            {[
              { label:"MBBS / MD Certificate", required:true,  icon:"📜", hint:"Clear photo or scanned PDF" },
              { label:"MCI Registration Certificate", required:true,  icon:"🏥", hint:"From Medical Council of India" },
              { label:"Aadhaar Card",          required:true,  icon:"🪪", hint:"For identity verification" },
              { label:"Bank Account Details",  required:true,  icon:"🏦", hint:"Cancelled cheque or passbook" },
              { label:"Profile Photo",         required:false, icon:"📸", hint:"Professional photo, JPG/PNG" },
            ].map(doc => (
              <div key={doc.label} style={{
                display:"flex", alignItems:"center", gap:14,
                padding:"14px 16px", borderRadius:12,
                border:"1.5px solid var(--s200)", marginBottom:10,
                background:"var(--off)", cursor:"pointer",
                transition:"border-color .2s",
              }}>
                <div style={{
                  width:40, height:40, borderRadius:10, fontSize:20, flexShrink:0,
                  background:"white", display:"flex", alignItems:"center", justifyContent:"center",
                  border:"1px solid var(--s200)",
                }}>{doc.icon}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:13.5, fontWeight:700, color:"var(--s800)", marginBottom:2 }}>
                    {doc.label}
                    {doc.required && <span style={{ color:"var(--red)", marginLeft:4 }}>*</span>}
                  </div>
                  <div style={{ fontSize:11, color:"var(--s400)" }}>{doc.hint}</div>
                </div>
                <button className="btn btn-outline btn-sm" style={{ flexShrink:0 }}>
                  <Upload size={12} /> Upload
                </button>
              </div>
            ))}

            <div style={{
              background:"rgba(34,197,94,.05)", border:"1px solid rgba(34,197,94,.2)",
              borderRadius:12, padding:"14px 16px", marginTop:4,
              display:"flex", gap:10, alignItems:"flex-start",
            }}>
              <Shield size={15} color="var(--green)" style={{ flexShrink:0, marginTop:2 }} />
              <div style={{ fontSize:12, color:"var(--s600)", lineHeight:1.6 }}>
                Documents are encrypted with AES-256 and stored on HIPAA-compliant servers in India.
                They are used exclusively for MCI verification and SlimRx compliance purposes.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{
        padding:"16px 52px 28px", flexShrink:0,
        borderTop:"1px solid var(--s200)", display:"flex", gap:12,
      }}>
        {step > 0 && (
          <button className="btn btn-outline" onClick={() => setStep(s => s - 1)}>
            <ArrowLeft size={14} /> Back
          </button>
        )}
        <button
          className="btn btn-accent"
          style={{ flex:1 }}
          onClick={handleNext}
          disabled={loading}
        >
          {loading
            ? <><Spinner /> Submitting for verification…</>
            : step === 3
              ? <><Check size={15} /> Submit for MCI Verification</>
              : <>Continue <ChevronRight size={16} /></>
          }
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   SCREEN 6 — SUCCESS
═══════════════════════════════════════════ */
function ScreenSuccess({ role, userData, onEnter }) {
  const isDoctor = role === "doctor";
  return (
    <div style={{ display:"flex", flexDirection:"column", height:"100%",
      padding:"48px 52px", justifyContent:"center", alignItems:"center", textAlign:"center" }}>
      <div className="su" style={{
        width:88, height:88, borderRadius:"50%",
        background: isDoctor ? "rgba(20,184,166,.1)" : "rgba(34,197,94,.1)",
        display:"flex", alignItems:"center", justifyContent:"center",
        marginBottom:24, position:"relative",
      }}>
        <div style={{
          position:"absolute", inset:-6, borderRadius:"50%",
          border:`2px solid ${isDoctor ? "rgba(20,184,166,.3)" : "rgba(34,197,94,.3)"}`,
          animation:"glow 2s ease-in-out infinite",
        }} />
        <CheckCircle2 size={44} color={isDoctor ? "var(--teal)" : "var(--green)"}
          style={{ animation:"checkPop .5s cubic-bezier(.22,1,.36,1)" }} />
      </div>

      <h2 className="su" style={{ fontFamily:"Playfair Display,serif", fontSize:30, fontWeight:800,
        color:"var(--s900)", letterSpacing:"-.03em", marginBottom:10 }}>
        {isDoctor ? "Application Submitted!" : "Account Created!"}
      </h2>

      <p className="su" style={{ fontSize:14.5, color:"var(--s500)", lineHeight:1.75,
        marginBottom:32, maxWidth:360 }}>
        {isDoctor
          ? <>Welcome, <strong style={{ color:"var(--s800)" }}>{userData?.name || "Doctor"}</strong>!
            Your MCI credentials are being verified. This takes 24–48 hours.
            You'll receive an SMS once your profile goes live.</>
          : <>Welcome to SlimRx, <strong style={{ color:"var(--s800)" }}>{userData?.name || "there"}</strong>!
            Your account is ready. Let's find the right GLP-1 medication for you.</>
        }
      </p>

      {isDoctor && (
        <div className="su" style={{
          background:"var(--off)", border:"1px solid var(--s200)",
          borderRadius:16, padding:"18px 24px", marginBottom:28,
          width:"100%", textAlign:"left",
        }}>
          <div style={{ fontSize:11, fontWeight:700, color:"var(--s400)", letterSpacing:".08em", marginBottom:12 }}>
            WHAT HAPPENS NEXT
          </div>
          {[
            { icon:"🔍", text:"MCI number verified against national database" },
            { icon:"📞", text:"SlimRx onboarding team calls you within 2 hours" },
            { icon:"✅", text:"Profile approved & live on platform" },
            { icon:"👥", text:"First patients assigned to your queue" },
          ].map((s, i) => (
            <div key={i} style={{ display:"flex", gap:10, alignItems:"center", marginBottom:10 }}>
              <span style={{ fontSize:18 }}>{s.icon}</span>
              <span style={{ fontSize:13, color:"var(--s600)" }}>{s.text}</span>
            </div>
          ))}
        </div>
      )}

      <button className="btn btn-accent btn-full su" onClick={onEnter}>
        {isDoctor ? "Go to Physician Dashboard" : "Start My Health Journey"}
        <ChevronRight size={16} />
      </button>
    </div>
  );
}

/* ═══════════════════════════════════════════
   ROOT AUTH APP
═══════════════════════════════════════════ */
export default function AuthApp() {
  // screen: role|phone|otp|profile|doctor-reg|success
  const [screen, setScreen] = useState("role");
  const [role,   setRole]   = useState(null);
  const [mode,   setMode]   = useState("register"); // register|login
  const [phone,  setPhone]  = useState("");
  const [userData, setUserData] = useState(null);

  const handleRoleSelect = (r) => { setRole(r); setScreen("phone"); };
  const handleSendOTP    = (p) => { setPhone(p); setScreen("otp"); };
  const handleVerified   = () => {
    if (mode === "login") {
      setScreen("success");
    } else {
      setScreen(role === "doctor" ? "doctor-reg" : "profile");
    }
  };
  const handleComplete = (r, data) => {
    setUserData(data);
    setScreen("success");
  };
  const handleEnter = () => {
    alert(`Redirecting to ${role === "doctor" ? "Doctor Dashboard" : "Patient Dashboard"}…\n(Connect to Module 3 or 4)`);
  };

  return (
    <>
      <style>{CSS}</style>
      <div style={{ display:"flex", height:"100vh", width:"100vw", overflow:"hidden" }}>
        {/* Left panel */}
        <LeftPanel role={role || "patient"} />

        {/* Right panel */}
        <div style={{
          flex:1, background:"var(--white)", overflowY:"auto",
          display:"flex", flexDirection:"column",
        }}>
          {screen === "role"       && <ScreenRoleSelect onSelect={handleRoleSelect} />}
          {screen === "phone"      && (
            <ScreenPhone
              role={role} mode={mode}
              onBack={() => setScreen("role")}
              onSendOTP={handleSendOTP}
            />
          )}
          {screen === "otp"        && (
            <ScreenOTP
              phone={phone} role={role} mode={mode}
              onBack={() => setScreen("phone")}
              onVerified={handleVerified}
            />
          )}
          {screen === "profile"    && <ScreenPatientProfile onComplete={handleComplete} />}
          {screen === "doctor-reg" && <ScreenDoctorReg onComplete={handleComplete} />}
          {screen === "success"    && (
            <ScreenSuccess role={role} userData={userData} onEnter={handleEnter} />
          )}
        </div>
      </div>
    </>
  );
}
