import { useState, useEffect } from "react";
import {
  Activity, Search, Filter, Star, Clock, Video,
  Phone, MessageCircle, ChevronRight, ChevronDown,
  Check, MapPin, Award, Users, Stethoscope, X,
  Calendar, Shield, Heart, Languages, Zap,
  ArrowRight, SlidersHorizontal, TrendingUp,
  CheckCircle2, BookOpen, ThumbsUp, Globe
} from "lucide-react";

/* ═══════════════════════════════════════════
   STYLES — Aesthetic: Modern health marketplace
   Clean white cards, warm cream bg, teal accents
   Fonts: Bricolage Grotesque + Lato
═══════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;0,700;0,900;1,400&family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{
  --teal:    #0d9488;
  --teal2:   #14b8a6;
  --teal3:   #5eead4;
  --teal-s:  #f0fdfa;
  --teal-s2: #ccfbf1;
  --blue:    #2563eb;
  --blue-s:  #eff6ff;
  --amber:   #d97706;
  --amber-s: #fffbeb;
  --green:   #16a34a;
  --green-s: #f0fdf4;
  --red:     #dc2626;
  --red-s:   #fef2f2;
  --ink:     #0f172a;
  --ink2:    #1e293b;
  --text:    #334155;
  --text2:   #64748b;
  --text3:   #94a3b8;
  --border:  #e2e8f0;
  --border2: #f1f5f9;
  --cream:   #fafaf8;
  --cream2:  #f5f5f0;
  --white:   #ffffff;
  --r:       10px;
  --r-lg:    16px;
  --r-xl:    22px;
  --r-2xl:   30px;
  --sh:      0 1px 4px rgba(0,0,0,.06),0 2px 8px rgba(0,0,0,.04);
  --sh-md:   0 4px 20px rgba(0,0,0,.08),0 2px 6px rgba(0,0,0,.04);
  --sh-lg:   0 12px 40px rgba(0,0,0,.1),0 4px 10px rgba(0,0,0,.06);
}
html,body,#root{height:100%;overflow:hidden;}
body{font-family:'Lato',sans-serif;background:var(--cream);color:var(--text);-webkit-font-smoothing:antialiased;}
.serif{font-family:'Cormorant Garamond',Georgia,serif;}

@keyframes fadeUp  {from{opacity:0;transform:translateY(14px);}to{opacity:1;transform:translateY(0);}}
@keyframes fadeIn  {from{opacity:0;}to{opacity:1;}}
@keyframes spin    {to{transform:rotate(360deg);}}
@keyframes pulse   {0%,100%{opacity:1;}50%{opacity:.5;}}
@keyframes shimmer {0%{background-position:-200% center;}100%{background-position:200% center;}}

.fu{animation:fadeUp .45s cubic-bezier(.22,1,.36,1) both;}
.fi{animation:fadeIn .3s ease both;}
.d1{animation-delay:.05s;opacity:0;} .d2{animation-delay:.10s;opacity:0;}
.d3{animation-delay:.15s;opacity:0;} .d4{animation-delay:.20s;opacity:0;}
.d5{animation-delay:.25s;opacity:0;} .d6{animation-delay:.30s;opacity:0;}

::-webkit-scrollbar{width:5px;} ::-webkit-scrollbar-thumb{background:var(--border);border-radius:3px;}

/* Doctor card */
.doc-card{
  background:var(--white);border:1px solid var(--border);
  border-radius:var(--r-xl);box-shadow:var(--sh);
  transition:all .25s cubic-bezier(.22,1,.36,1);
  cursor:pointer;overflow:hidden;
}
.doc-card:hover{box-shadow:var(--sh-lg);transform:translateY(-3px);border-color:var(--teal2);}
.doc-card.featured{border:2px solid var(--teal2);box-shadow:0 0 0 3px rgba(20,184,166,.1),var(--sh-md);}

/* Filter chip */
.chip{
  display:inline-flex;align-items:center;gap:5px;
  padding:7px 14px;border-radius:100px;
  font-size:12.5px;font-weight:700;cursor:pointer;
  transition:all .18s;border:1.5px solid var(--border);
  background:var(--white);color:var(--text2);
  font-family:'Lato',sans-serif;white-space:nowrap;
}
.chip:hover{border-color:var(--teal2);color:var(--teal);background:var(--teal-s);}
.chip.active{border-color:var(--teal);background:var(--teal);color:var(--white);}

/* Badge */
.badge{display:inline-flex;align-items:center;gap:4px;padding:3px 9px;border-radius:100px;font-size:11px;font-weight:700;}
.b-teal  {background:var(--teal-s2);color:var(--teal);}
.b-blue  {background:var(--blue-s); color:var(--blue);}
.b-green {background:var(--green-s);color:var(--green);}
.b-amber {background:var(--amber-s);color:var(--amber);}

/* Search bar */
.search-bar{
  display:flex;align-items:center;gap:10px;
  background:var(--white);border:2px solid var(--border);
  border-radius:var(--r-xl);padding:14px 20px;
  transition:border-color .2s,box-shadow .2s;
}
.search-bar:focus-within{border-color:var(--teal2);box-shadow:0 0 0 4px rgba(20,184,166,.1);}
.search-inp{border:none;outline:none;background:transparent;flex:1;
  font-family:'Lato',sans-serif;font-size:15px;color:var(--ink);}
.search-inp::placeholder{color:var(--text3);}

/* Btn */
.btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;
  padding:10px 20px;border-radius:var(--r-lg);border:none;
  font-family:'Lato',sans-serif;font-size:13.5px;font-weight:700;
  cursor:pointer;transition:all .2s;line-height:1;}
.btn-teal{background:linear-gradient(135deg,var(--teal),#0f766e);color:var(--white);
  box-shadow:0 4px 14px rgba(13,148,136,.3);}
.btn-teal:hover{transform:translateY(-1px);box-shadow:0 6px 20px rgba(13,148,136,.4);}
.btn-outline{background:transparent;border:1.5px solid var(--border);color:var(--text2);}
.btn-outline:hover{border-color:var(--teal2);color:var(--teal);background:var(--teal-s);}
.btn-white{background:var(--white);color:var(--teal);border:none;
  box-shadow:0 4px 16px rgba(0,0,0,.12);}
.btn-white:hover{box-shadow:0 8px 24px rgba(0,0,0,.16);transform:translateY(-1px);}
.btn-sm{padding:8px 14px;font-size:12px;}
.btn-xs{padding:6px 10px;font-size:11px;}

/* Modal */
.modal-bg{position:fixed;inset:0;z-index:200;background:rgba(15,23,42,.5);backdrop-filter:blur(4px);
  display:flex;align-items:center;justify-content:center;padding:20px;animation:fadeIn .25s ease;}
.modal{background:var(--white);border-radius:var(--r-2xl);max-width:640px;width:100%;
  max-height:92vh;overflow-y:auto;box-shadow:0 32px 80px rgba(0,0,0,.2);
  animation:fadeUp .3s cubic-bezier(.22,1,.36,1);}

/* Slot grid */
.slot{padding:9px 14px;border-radius:var(--r);border:1.5px solid var(--border);
  font-size:12.5px;font-weight:700;color:var(--text2);cursor:pointer;
  transition:all .18s;text-align:center;font-family:'Lato',sans-serif;}
.slot:hover{border-color:var(--teal2);color:var(--teal);background:var(--teal-s);}
.slot.selected{border-color:var(--teal);background:var(--teal);color:var(--white);}
.slot.booked{opacity:.4;cursor:not-allowed;text-decoration:line-through;}

/* Star rating */
.star-filled{color:#f59e0b;fill:#f59e0b;}
.star-empty {color:var(--border);}

/* Sidebar filter */
.filter-section{margin-bottom:20px;}
.filter-title{font-size:11px;font-weight:900;color:var(--text2);
  letter-spacing:.1em;text-transform:uppercase;margin-bottom:10px;}
.filter-option{display:flex;align-items:center;justify-content:space-between;
  padding:8px 10px;border-radius:var(--r);cursor:pointer;transition:background .15s;}
.filter-option:hover{background:var(--cream2);}
.filter-option.active{background:var(--teal-s);}
`;

/* ═══════════════════════════════════════════
   MOCK DOCTOR DATA
═══════════════════════════════════════════ */
const DOCTORS = [
  {
    id:"D001", name:"Dr. Kavitha Rajan", title:"MD Endocrinology, DM Metabolism",
    specialty:"Endocrinology", city:"Mumbai", avatar:"👩‍⚕️",
    exp:14, rating:4.97, reviews:214, patients:892,
    fee:800, languages:["English","Hindi","Tamil"],
    available:true, nextSlot:"Today, 11:30 AM",
    modes:["video","phone","chat"],
    featured:true, verified:true,
    tags:["GLP-1 Expert","PCOS","Type 2 Diabetes","Metabolic Disorders"],
    bio:"Senior Endocrinologist at Breach Candy Hospital, Mumbai. 14 years specialising in metabolic disorders, obesity medicine and GLP-1 therapy. Published researcher in Indian Journal of Endocrinology.",
    slots:{ today:["11:30 AM","2:00 PM","4:30 PM"], tomorrow:["10:00 AM","11:00 AM","3:00 PM","5:00 PM"] },
    successRate:94, avgLoss:11.2,
  },
  {
    id:"D002", name:"Dr. Arjun Mehta", title:"MBBS, MD Internal Medicine",
    specialty:"Internal Medicine", city:"Delhi",  avatar:"👨‍⚕️",
    exp:9,  rating:4.88, reviews:176, patients:641,
    fee:600, languages:["English","Hindi"],
    available:true, nextSlot:"Today, 2:00 PM",
    modes:["video","phone"],
    featured:false, verified:true,
    tags:["Weight Management","Hypertension","Pre-diabetes"],
    bio:"Internal Medicine specialist at AIIMS-affiliated clinic. Extensive experience in lifestyle medicine and GLP-1 prescribing for weight management.",
    slots:{ today:["2:00 PM","3:30 PM","5:00 PM"], tomorrow:["9:00 AM","11:00 AM","2:00 PM"] },
    successRate:89, avgLoss:9.8,
  },
  {
    id:"D003", name:"Dr. Priya Venkatesh", title:"MBBS, MD Diabetology",
    specialty:"Diabetology", city:"Bengaluru", avatar:"👩‍⚕️",
    exp:11, rating:4.93, reviews:198, patients:734,
    fee:750, languages:["English","Kannada","Tamil"],
    available:true, nextSlot:"Tomorrow, 10:00 AM",
    modes:["video","chat"],
    featured:true, verified:true,
    tags:["GLP-1 Expert","Diabetology","PCOS","Thyroid"],
    bio:"Diabetologist with 11 years at Manipal Hospital Bengaluru. Special interest in GLP-1 receptor agonist therapy and its metabolic benefits beyond weight loss.",
    slots:{ today:[], tomorrow:["10:00 AM","11:00 AM","2:30 PM","4:00 PM"] },
    successRate:92, avgLoss:10.5,
  },
  {
    id:"D004", name:"Dr. Rahul Sharma", title:"MBBS, DNB General Medicine",
    specialty:"General Practice", city:"Pune", avatar:"👨‍⚕️",
    exp:7,  rating:4.82, reviews:134, patients:489,
    fee:500, languages:["English","Hindi","Marathi"],
    available:true, nextSlot:"Today, 4:00 PM",
    modes:["video","phone","chat"],
    featured:false, verified:true,
    tags:["Weight Loss","General Medicine","Preventive Care"],
    bio:"General physician with focused practice in preventive medicine and weight management. Early adopter of GLP-1 telehealth prescribing.",
    slots:{ today:["4:00 PM","5:30 PM"], tomorrow:["9:00 AM","10:30 AM","12:00 PM","3:00 PM","5:00 PM"] },
    successRate:85, avgLoss:8.6,
  },
  {
    id:"D005", name:"Dr. Sunita Pillai", title:"MD, DM Endocrinology",
    specialty:"Endocrinology", city:"Chennai", avatar:"👩‍⚕️",
    exp:18, rating:4.95, reviews:312, patients:1240,
    fee:1000, languages:["English","Tamil","Malayalam"],
    available:false, nextSlot:"Jun 2, 9:00 AM",
    modes:["video"],
    featured:true, verified:true,
    tags:["GLP-1 Pioneer","Obesity Medicine","PCOS","Bariatric Pre-care"],
    bio:"Senior DM Endocrinologist at Apollo Hospitals Chennai. Pioneer of GLP-1 prescribing in South India. Keynote speaker at National Obesity Congress 2024.",
    slots:{ today:[], tomorrow:[] },
    successRate:97, avgLoss:14.1,
  },
  {
    id:"D006", name:"Dr. Vikram Nair", title:"MBBS, MD Nutrition & Dietetics",
    specialty:"Nutrition & Dietetics", city:"Kochi", avatar:"👨‍⚕️",
    exp:6,  rating:4.79, reviews:88, patients:312,
    fee:450, languages:["English","Malayalam","Hindi"],
    available:true, nextSlot:"Today, 3:00 PM",
    modes:["video","chat"],
    featured:false, verified:true,
    tags:["Nutrition","Lifestyle Medicine","Weight Management"],
    bio:"Nutrition specialist combining dietary interventions with GLP-1 therapy for sustainable weight loss. Certified in Obesity Medicine (ECSO).",
    slots:{ today:["3:00 PM","4:30 PM","6:00 PM"], tomorrow:["10:00 AM","11:30 AM","2:00 PM"] },
    successRate:82, avgLoss:7.9,
  },
];

const SPECIALTIES = ["All","Endocrinology","Internal Medicine","Diabetology","General Practice","Nutrition & Dietetics"];
const CITIES_F     = ["All Cities","Mumbai","Delhi","Bengaluru","Chennai","Pune","Kochi"];
const SORT_OPTIONS = ["Best Match","Rating","Experience","Fee (Low-High)","Fee (High-Low)","Next Available"];

/* ═══════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════ */
function StarRow({ rating, size=13 }) {
  return (
    <span style={{ display:"flex", gap:1 }}>
      {[1,2,3,4,5].map(i => (
        <Star key={i} size={size}
          className={i <= Math.round(rating) ? "star-filled" : "star-empty"} />
      ))}
    </span>
  );
}

function ModeIcon({ mode }) {
  const cfg = {
    video: { icon: Video,          label:"Video",  color:"var(--teal)" },
    phone: { icon: Phone,          label:"Phone",  color:"var(--blue)" },
    chat:  { icon: MessageCircle,  label:"Chat",   color:"var(--amber)" },
  };
  const c = cfg[mode];
  if (!c) return null;
  return (
    <div className="tooltip-w" style={{ position:"relative" }}>
      <div style={{
        width:28, height:28, borderRadius:8,
        background:`${c.color}12`, border:`1px solid ${c.color}25`,
        display:"flex", alignItems:"center", justifyContent:"center",
      }}>
        <c.icon size={14} color={c.color} />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   BOOKING MODAL
═══════════════════════════════════════════ */
function BookingModal({ doctor, onClose }) {
  const [day,   setDay]   = useState("today");
  const [slot,  setSlot]  = useState(null);
  const [mode,  setMode]  = useState("video");
  const [step,  setStep]  = useState(0); // 0=pick 1=confirm 2=success
  const [loading, setLoading] = useState(false);

  const slots = day === "today" ? doctor.slots.today : doctor.slots.tomorrow;
  const BOOKED = ["1:00 PM", "3:00 PM"];

  const handleBook = () => {
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep(2); }, 1600);
  };

  const modeConfig = {
    video: { icon:Video,         label:"Video Call",  color:"var(--teal)" },
    phone: { icon:Phone,         label:"Phone Call",  color:"var(--blue)" },
    chat:  { icon:MessageCircle, label:"Chat",        color:"var(--amber)" },
  };

  return (
    <div className="modal-bg" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        {/* Header */}
        <div style={{
          background:"linear-gradient(135deg,#0f172a,#1e3a5f)",
          padding:"24px 28px",
          display:"flex", gap:16, alignItems:"center",
        }}>
          <div style={{
            width:56, height:56, borderRadius:18, fontSize:30, flexShrink:0,
            background:"rgba(255,255,255,.1)", display:"flex", alignItems:"center", justifyContent:"center",
            border:"1px solid rgba(255,255,255,.15)",
          }}>{doctor.avatar}</div>
          <div style={{ flex:1 }}>
            <div style={{ fontFamily:"Cormorant Garamond,serif", fontSize:20, fontWeight:700,
              color:"white", marginBottom:3 }}>{doctor.name}</div>
            <div style={{ fontSize:12, color:"rgba(255,255,255,.5)" }}>{doctor.title}</div>
            <div style={{ display:"flex", gap:8, marginTop:6 }}>
              <span style={{ fontSize:12, fontWeight:700, color:"#fbbf24" }}>★ {doctor.rating}</span>
              <span style={{ fontSize:12, color:"rgba(255,255,255,.4)" }}>· {doctor.reviews} reviews</span>
              <span style={{ fontSize:12, fontWeight:700, color:"#5eead4" }}>₹{doctor.fee}/session</span>
            </div>
          </div>
          <button onClick={onClose} style={{
            width:32, height:32, borderRadius:"50%", background:"rgba(255,255,255,.1)",
            border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
          }}>
            <X size={16} color="rgba(255,255,255,.7)" />
          </button>
        </div>

        <div style={{ padding:"24px 28px" }}>
          {/* STEP 0: Select slot */}
          {step === 0 && (
            <div className="fi">
              {/* Consultation mode */}
              <div style={{ marginBottom:20 }}>
                <div style={{ fontSize:12, fontWeight:900, color:"var(--text2)",
                  letterSpacing:".1em", marginBottom:10 }}>CONSULTATION MODE</div>
                <div style={{ display:"flex", gap:10 }}>
                  {doctor.modes.map(m => {
                    const c = modeConfig[m];
                    return (
                      <button key={m} onClick={() => setMode(m)} style={{
                        flex:1, padding:"11px", borderRadius:"var(--r-lg)",
                        border:`1.5px solid ${mode === m ? c.color : "var(--border)"}`,
                        background: mode === m ? `${c.color}10` : "var(--white)",
                        display:"flex", alignItems:"center", justifyContent:"center", gap:7,
                        fontSize:13, fontWeight:700, cursor:"pointer",
                        color: mode === m ? c.color : "var(--text2)",
                        fontFamily:"Lato,sans-serif", transition:"all .18s",
                      }}>
                        <c.icon size={15} /> {c.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Day toggle */}
              <div style={{ marginBottom:14 }}>
                <div style={{ fontSize:12, fontWeight:900, color:"var(--text2)",
                  letterSpacing:".1em", marginBottom:10 }}>SELECT DATE</div>
                <div style={{ display:"flex", gap:8 }}>
                  {["today","tomorrow"].map(d => (
                    <button key={d} onClick={() => { setDay(d); setSlot(null); }} style={{
                      flex:1, padding:"10px", borderRadius:"var(--r)",
                      border:`1.5px solid ${day === d ? "var(--teal)" : "var(--border)"}`,
                      background: day === d ? "var(--teal-s)" : "var(--white)",
                      color: day === d ? "var(--teal)" : "var(--text2)",
                      fontSize:13, fontWeight:700, cursor:"pointer",
                      fontFamily:"Lato,sans-serif", textTransform:"capitalize", transition:"all .18s",
                    }}>{d === "today" ? "Today" : "Tomorrow"}</button>
                  ))}
                </div>
              </div>

              {/* Slots */}
              <div style={{ marginBottom:20 }}>
                <div style={{ fontSize:12, fontWeight:900, color:"var(--text2)",
                  letterSpacing:".1em", marginBottom:10 }}>AVAILABLE SLOTS</div>
                {slots.length === 0 ? (
                  <div style={{ padding:"20px", textAlign:"center", color:"var(--text3)",
                    fontSize:13, background:"var(--cream2)", borderRadius:"var(--r-lg)" }}>
                    No slots available {day}
                  </div>
                ) : (
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(100px,1fr))", gap:8 }}>
                    {slots.map(s => (
                      <div key={s}
                        className={`slot ${slot === s ? "selected":""} ${BOOKED.includes(s) ? "booked":""}`}
                        onClick={() => !BOOKED.includes(s) && setSlot(s)}>
                        {s}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                className="btn btn-teal"
                style={{ width:"100%", fontSize:15 }}
                disabled={!slot}
                onClick={() => setStep(1)}
              >
                Continue to Confirm <ChevronRight size={16} />
              </button>
            </div>
          )}

          {/* STEP 1: Confirm */}
          {step === 1 && (
            <div className="fi">
              <h3 style={{ fontFamily:"Cormorant Garamond,serif", fontSize:22, fontWeight:700,
                color:"var(--ink)", marginBottom:20 }}>Confirm Your Booking</h3>

              <div style={{
                background:"var(--teal-s)", border:"1px solid var(--teal-s2)",
                borderRadius:"var(--r-xl)", padding:"20px", marginBottom:20,
              }}>
                {[
                  { l:"Doctor",    v:doctor.name },
                  { l:"Specialty", v:doctor.specialty },
                  { l:"Date",      v:day === "today" ? "Today" : "Tomorrow" },
                  { l:"Time",      v:slot },
                  { l:"Mode",      v:modeConfig[mode]?.label },
                  { l:"Fee",       v:`₹${doctor.fee}` },
                ].map(({ l, v }) => (
                  <div key={l} style={{
                    display:"flex", justifyContent:"space-between",
                    padding:"9px 0", borderBottom:"1px solid rgba(13,148,136,.1)",
                    fontSize:14,
                  }}>
                    <span style={{ color:"var(--teal)", fontWeight:600 }}>{l}</span>
                    <span style={{ fontWeight:700, color:"var(--ink)" }}>{v}</span>
                  </div>
                ))}
              </div>

              <div style={{
                background:"var(--amber-s)", border:"1px solid rgba(217,119,6,.2)",
                borderRadius:"var(--r)", padding:"12px 14px", marginBottom:20,
                display:"flex", gap:8, alignItems:"flex-start",
                fontSize:12, color:"#92400e", lineHeight:1.6,
              }}>
                <Shield size={14} color="var(--amber)" style={{ flexShrink:0, marginTop:2 }} />
                Payment is collected securely after the consultation. You will only be charged once you confirm the call was completed.
              </div>

              <div style={{ display:"flex", gap:10 }}>
                <button className="btn btn-outline" style={{ flex:1 }} onClick={() => setStep(0)}>
                  ← Back
                </button>
                <button
                  className="btn btn-teal"
                  style={{ flex:2 }}
                  onClick={handleBook}
                  disabled={loading}
                >
                  {loading
                    ? <><div style={{ width:16,height:16,borderRadius:"50%",
                        border:"2px solid rgba(255,255,255,.3)",borderTopColor:"white",
                        animation:"spin .7s linear infinite"}} /> Booking…</>
                    : <><Check size={15} /> Confirm Booking</>}
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Success */}
          {step === 2 && (
            <div className="fi" style={{ textAlign:"center", padding:"16px 0" }}>
              <div style={{
                width:80, height:80, borderRadius:"50%", background:"var(--teal-s2)",
                display:"flex", alignItems:"center", justifyContent:"center",
                margin:"0 auto 20px",
              }}>
                <CheckCircle2 size={40} color="var(--teal)" />
              </div>
              <h3 style={{ fontFamily:"Cormorant Garamond,serif", fontSize:26, fontWeight:700,
                color:"var(--ink)", marginBottom:8 }}>Consultation Booked!</h3>
              <p style={{ fontSize:14, color:"var(--text2)", lineHeight:1.7, marginBottom:24 }}>
                Your {modeConfig[mode]?.label.toLowerCase()} with <strong>{doctor.name}</strong> is confirmed for{" "}
                <strong>{day === "today" ? "today" : "tomorrow"} at {slot}</strong>.
                You'll receive an SMS reminder 30 minutes before.
              </p>
              <div style={{
                background:"var(--cream2)", borderRadius:"var(--r-lg)", padding:"14px 18px",
                display:"inline-flex", gap:10, alignItems:"center", marginBottom:24,
                fontSize:13,
              }}>
                <Calendar size={16} color="var(--teal)" />
                <div style={{ textAlign:"left" }}>
                  <div style={{ fontSize:10, color:"var(--text3)", marginBottom:1 }}>Booking Ref</div>
                  <div style={{ fontWeight:800, color:"var(--ink)", fontFamily:"monospace" }}>
                    SRX-{Date.now().toString(36).toUpperCase().slice(-8)}
                  </div>
                </div>
              </div>
              <div style={{ display:"flex", gap:10 }}>
                <button className="btn btn-outline" style={{ flex:1 }} onClick={onClose}>
                  Done
                </button>
                <button className="btn btn-teal" style={{ flex:1 }}
                  onClick={() => alert("Adding to calendar… (connect to Calendar API)")}>
                  <Calendar size={14} /> Add to Calendar
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function var_(k, fallback) { return fallback; }

/* ═══════════════════════════════════════════
   DOCTOR PROFILE MODAL
═══════════════════════════════════════════ */
function DoctorProfileModal({ doctor, onClose, onBook }) {
  const REVIEWS_MOCK = [
    { name:"Priya M.", city:"Mumbai",    text:"Extremely knowledgeable. She understood my PCOS complications and tailored the GLP-1 dose perfectly. Lost 14 kg in 4 months.", rating:5, date:"May 2025" },
    { name:"Rohan K.", city:"Delhi",     text:"Very professional. Clear explanation of medication side effects and what to expect. Follow-up was prompt.", rating:5, date:"Apr 2025" },
    { name:"Ananya R.",city:"Bengaluru", text:"Best doctor I've consulted for weight management. She's responsive on chat too.", rating:5, date:"Apr 2025" },
  ];

  return (
    <div className="modal-bg" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ maxWidth:680 }}>
        {/* Hero */}
        <div style={{
          background:"linear-gradient(135deg,#0f172a 0%,#1e3a5f 50%,#0f2d3f 100%)",
          padding:"32px 32px 24px",
          position:"relative", overflow:"hidden",
        }}>
          <div style={{
            position:"absolute", top:-40, right:-40, width:200, height:200, borderRadius:"50%",
            background:"rgba(20,184,166,.08)", pointerEvents:"none",
          }} />
          <button onClick={onClose} style={{
            position:"absolute", top:16, right:16,
            width:32, height:32, borderRadius:"50%", background:"rgba(255,255,255,.1)",
            border:"none", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center",
          }}>
            <X size={16} color="rgba(255,255,255,.7)" />
          </button>

          <div style={{ display:"flex", gap:20, alignItems:"flex-start" }}>
            <div style={{
              width:72, height:72, borderRadius:20, fontSize:40, flexShrink:0,
              background:"rgba(255,255,255,.1)", display:"flex", alignItems:"center", justifyContent:"center",
              border:"1px solid rgba(255,255,255,.15)",
            }}>{doctor.avatar}</div>
            <div>
              <div style={{ display:"flex", gap:10, alignItems:"center", flexWrap:"wrap", marginBottom:4 }}>
                {doctor.featured && <span className="badge b-teal">⭐ Featured</span>}
                {doctor.verified && <span className="badge b-green">✓ MCI Verified</span>}
              </div>
              <h2 style={{ fontFamily:"Cormorant Garamond,serif", fontSize:26, fontWeight:700,
                color:"white", letterSpacing:"-.01em", marginBottom:4 }}>{doctor.name}</h2>
              <div style={{ fontSize:13, color:"rgba(255,255,255,.55)", marginBottom:10 }}>{doctor.title}</div>
              <div style={{ display:"flex", gap:20, flexWrap:"wrap" }}>
                {[
                  { v:`★ ${doctor.rating}`, s:`${doctor.reviews} reviews` },
                  { v:`${doctor.exp} yrs`,  s:"Experience" },
                  { v:`${doctor.patients}+`,s:"Patients" },
                  { v:`₹${doctor.fee}`,     s:"Per session" },
                ].map(({ v, s }) => (
                  <div key={s}>
                    <div style={{ fontWeight:800, fontSize:16, color:"var(--teal3)", lineHeight:1 }}>{v}</div>
                    <div style={{ fontSize:11, color:"rgba(255,255,255,.35)", marginTop:2 }}>{s}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div style={{ padding:"24px 32px" }}>
          {/* About */}
          <div style={{ marginBottom:22 }}>
            <div style={{ fontSize:12, fontWeight:900, color:"var(--text2)", letterSpacing:".1em", marginBottom:8 }}>
              ABOUT
            </div>
            <p style={{ fontSize:14, color:"var(--text)", lineHeight:1.75 }}>{doctor.bio}</p>
          </div>

          {/* Stats */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12, marginBottom:22 }}>
            {[
              { label:"Success Rate",  value:`${doctor.successRate}%`, icon:"🎯", color:"var(--teal)" },
              { label:"Avg. Weight Lost", value:`${doctor.avgLoss} kg`, icon:"📉", color:"var(--green)" },
              { label:"Response Time", value:"< 2 hrs",               icon:"⚡", color:"var(--amber)" },
            ].map(({ label, value, icon, color }) => (
              <div key={label} style={{
                background:"var(--cream2)", borderRadius:"var(--r-lg)", padding:"14px",
                textAlign:"center", border:"1px solid var(--border)",
              }}>
                <div style={{ fontSize:22, marginBottom:6 }}>{icon}</div>
                <div style={{ fontSize:20, fontWeight:900, color, lineHeight:1, marginBottom:3 }}>{value}</div>
                <div style={{ fontSize:11, color:"var(--text3)", fontWeight:700 }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div style={{ marginBottom:22 }}>
            <div style={{ fontSize:12, fontWeight:900, color:"var(--text2)", letterSpacing:".1em", marginBottom:8 }}>
              SPECIALISES IN
            </div>
            <div style={{ display:"flex", gap:7, flexWrap:"wrap" }}>
              {doctor.tags.map(t => (
                <span key={t} className="badge b-teal">{t}</span>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div style={{ marginBottom:22 }}>
            <div style={{ fontSize:12, fontWeight:900, color:"var(--text2)", letterSpacing:".1em", marginBottom:8 }}>
              LANGUAGES
            </div>
            <div style={{ display:"flex", gap:7 }}>
              {doctor.languages.map(l => (
                <span key={l} className="badge b-blue">{l}</span>
              ))}
            </div>
          </div>

          {/* Reviews */}
          <div style={{ marginBottom:24 }}>
            <div style={{ fontSize:12, fontWeight:900, color:"var(--text2)", letterSpacing:".1em", marginBottom:14 }}>
              PATIENT REVIEWS
            </div>
            {REVIEWS_MOCK.map((r, i) => (
              <div key={i} style={{
                background:"var(--cream2)", borderRadius:"var(--r-lg)", padding:"14px 16px",
                marginBottom:10, border:"1px solid var(--border)",
              }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                  <div>
                    <span style={{ fontWeight:700, fontSize:13, color:"var(--ink)" }}>{r.name}</span>
                    <span style={{ fontSize:11, color:"var(--text3)", marginLeft:6 }}>· {r.city}</span>
                  </div>
                  <div style={{ display:"flex", gap:4, alignItems:"center" }}>
                    <StarRow rating={r.rating} size={11} />
                    <span style={{ fontSize:10, color:"var(--text3)" }}>{r.date}</span>
                  </div>
                </div>
                <p style={{ fontSize:13, color:"var(--text)", lineHeight:1.65 }}>"{r.text}"</p>
              </div>
            ))}
          </div>

          <button className="btn btn-teal" style={{ width:"100%", fontSize:15 }}
            onClick={() => { onClose(); onBook(doctor); }}>
            <Calendar size={16} /> Book Consultation — ₹{doctor.fee}
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   DOCTOR CARD
═══════════════════════════════════════════ */
function DoctorCard({ doctor, onBook, onViewProfile, idx }) {
  return (
    <div className={`doc-card fu d${Math.min(idx+1,6)} ${doctor.featured ? "featured":""}`}>
      {/* Featured ribbon */}
      {doctor.featured && (
        <div style={{
          background:"linear-gradient(90deg,var(--teal),var(--teal2))",
          padding:"5px 16px", fontSize:11, fontWeight:800,
          color:"white", letterSpacing:".06em",
        }}>
          ⭐ FEATURED PHYSICIAN
        </div>
      )}

      <div style={{ padding:"20px 22px" }}>
        {/* Top row */}
        <div style={{ display:"flex", gap:14, alignItems:"flex-start", marginBottom:16 }}>
          <div style={{
            width:60, height:60, borderRadius:18, fontSize:32, flexShrink:0,
            background: doctor.available ? "var(--teal-s)" : "var(--cream2)",
            border:`1.5px solid ${doctor.available ? "var(--teal-s2)" : "var(--border)"}`,
            display:"flex", alignItems:"center", justifyContent:"center",
            position:"relative",
          }}>
            {doctor.avatar}
            {/* Online dot */}
            <div style={{
              position:"absolute", bottom:2, right:2,
              width:12, height:12, borderRadius:"50%",
              background: doctor.available ? "var(--green)" : "var(--text3)",
              border:"2px solid white",
            }} />
          </div>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start",
              flexWrap:"wrap", gap:6, marginBottom:3 }}>
              <h3 style={{ fontFamily:"Cormorant Garamond,serif", fontSize:19, fontWeight:700,
                color:"var(--ink)", letterSpacing:"-.01em" }}>{doctor.name}</h3>
              <div style={{ fontWeight:900, fontSize:17, color:"var(--teal)" }}>₹{doctor.fee}</div>
            </div>
            <div style={{ fontSize:12.5, color:"var(--text2)", marginBottom:6 }}>{doctor.title}</div>
            <div style={{ display:"flex", gap:8, alignItems:"center", flexWrap:"wrap" }}>
              <div style={{ display:"flex", gap:3, alignItems:"center" }}>
                <StarRow rating={doctor.rating} size={11} />
                <span style={{ fontSize:12, fontWeight:800, color:"var(--ink)", marginLeft:2 }}>{doctor.rating}</span>
                <span style={{ fontSize:11, color:"var(--text3)" }}>({doctor.reviews})</span>
              </div>
              <span style={{ color:"var(--border)" }}>·</span>
              <span style={{ fontSize:12, color:"var(--text2)" }}>{doctor.exp} yrs exp</span>
              <span style={{ color:"var(--border)" }}>·</span>
              <span style={{ fontSize:12, color:"var(--text2)" }}>
                <MapPin size={10} style={{ display:"inline" }} /> {doctor.city}
              </span>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:14 }}>
          {doctor.tags.slice(0,3).map(t => (
            <span key={t} className="badge b-teal">{t}</span>
          ))}
          {doctor.verified && <span className="badge b-green">✓ MCI Verified</span>}
        </div>

        {/* Stats row */}
        <div style={{
          display:"flex", gap:0,
          background:"var(--cream2)", borderRadius:"var(--r)", overflow:"hidden",
          border:"1px solid var(--border)", marginBottom:14,
        }}>
          {[
            { icon:Users,       v:`${doctor.patients}+`, l:"Patients" },
            { icon:TrendingUp,  v:`${doctor.successRate}%`, l:"Success" },
            { icon:ThumbsUp,    v:`${doctor.avgLoss}kg`,   l:"Avg Loss" },
          ].map(({ icon:Icon, v, l }, i) => (
            <div key={l} style={{
              flex:1, padding:"10px 8px", textAlign:"center",
              borderRight: i < 2 ? "1px solid var(--border)" : "none",
            }}>
              <div style={{ fontSize:14, fontWeight:800, color:"var(--ink)", lineHeight:1, marginBottom:2 }}>{v}</div>
              <div style={{ fontSize:10, color:"var(--text3)", fontWeight:700 }}>{l}</div>
            </div>
          ))}
        </div>

        {/* Languages + modes */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
          <div style={{ display:"flex", gap:4, alignItems:"center" }}>
            <Globe size={12} color="var(--text3)" />
            <span style={{ fontSize:12, color:"var(--text3)" }}>
              {doctor.languages.join(", ")}
            </span>
          </div>
          <div style={{ display:"flex", gap:6 }}>
            {doctor.modes.map(m => <ModeIcon key={m} mode={m} />)}
          </div>
        </div>

        {/* Next availability */}
        <div style={{
          display:"flex", alignItems:"center", gap:7, marginBottom:16,
          padding:"9px 12px", borderRadius:8,
          background: doctor.available ? "var(--teal-s)" : "var(--cream2)",
          border:`1px solid ${doctor.available ? "var(--teal-s2)" : "var(--border)"}`,
        }}>
          <Clock size={13} color={doctor.available ? "var(--teal)" : "var(--text3)"} />
          <span style={{ fontSize:12.5, fontWeight:700,
            color: doctor.available ? "var(--teal)" : "var(--text3)" }}>
            {doctor.available ? `Next: ${doctor.nextSlot}` : `Next available: ${doctor.nextSlot}`}
          </span>
        </div>

        {/* CTA row */}
        <div style={{ display:"flex", gap:10 }}>
          <button className="btn btn-outline btn-sm" style={{ flex:1 }}
            onClick={() => onViewProfile(doctor)}>
            View Profile
          </button>
          <button
            className="btn btn-teal"
            style={{ flex:2 }}
            onClick={() => onBook(doctor)}
            disabled={!doctor.available && doctor.slots.today.length === 0 && doctor.slots.tomorrow.length === 0}
          >
            <Calendar size={14} />
            Book Consultation
          </button>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   FILTER SIDEBAR
═══════════════════════════════════════════ */
function FilterSidebar({ filters, onChange }) {
  const toggle = (key, val) => {
    const curr = filters[key] || [];
    onChange(key, curr.includes(val) ? curr.filter(v => v !== val) : [...curr, val]);
  };
  const isActive = (key, val) => (filters[key] || []).includes(val);

  return (
    <div style={{
      width:230, flexShrink:0,
      background:"var(--white)", borderRight:"1px solid var(--border)",
      padding:"20px 16px", overflowY:"auto", height:"100%",
    }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
        <span style={{ fontWeight:900, fontSize:14, color:"var(--ink)" }}>Filters</span>
        <button onClick={() => onChange("reset")} style={{
          background:"none", border:"none", cursor:"pointer",
          fontSize:12, fontWeight:700, color:"var(--teal)",
          fontFamily:"Lato,sans-serif",
        }}>Clear all</button>
      </div>

      {/* Availability */}
      <div className="filter-section">
        <div className="filter-title">Availability</div>
        {["Available now","Available today","Available this week"].map(opt => (
          <div key={opt} className={`filter-option ${isActive("availability",opt) ? "active":""}`}
            onClick={() => toggle("availability", opt)}>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <div style={{
                width:16, height:16, borderRadius:4,
                border:`2px solid ${isActive("availability",opt) ? "var(--teal)" : "var(--border)"}`,
                background: isActive("availability",opt) ? "var(--teal)" : "transparent",
                display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
              }}>
                {isActive("availability",opt) && <Check size={10} color="white" strokeWidth={3} />}
              </div>
              <span style={{ fontSize:13, color:"var(--text)" }}>{opt}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Specialty */}
      <div className="filter-section">
        <div className="filter-title">Specialty</div>
        {SPECIALTIES.filter(s => s !== "All").map(s => (
          <div key={s} className={`filter-option ${isActive("specialty",s) ? "active":""}`}
            onClick={() => toggle("specialty", s)}>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <div style={{
                width:16, height:16, borderRadius:4,
                border:`2px solid ${isActive("specialty",s) ? "var(--teal)" : "var(--border)"}`,
                background: isActive("specialty",s) ? "var(--teal)" : "transparent",
                display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
              }}>
                {isActive("specialty",s) && <Check size={10} color="white" strokeWidth={3} />}
              </div>
              <span style={{ fontSize:13, color:"var(--text)" }}>{s}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Fee range */}
      <div className="filter-section">
        <div className="filter-title">Consultation Fee</div>
        {["Under ₹500","₹500–₹750","₹750–₹1000","Above ₹1000"].map(opt => (
          <div key={opt} className={`filter-option ${isActive("fee",opt) ? "active":""}`}
            onClick={() => toggle("fee", opt)}>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <div style={{
                width:16, height:16, borderRadius:4,
                border:`2px solid ${isActive("fee",opt) ? "var(--teal)" : "var(--border)"}`,
                background: isActive("fee",opt) ? "var(--teal)" : "transparent",
                display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
              }}>
                {isActive("fee",opt) && <Check size={10} color="white" strokeWidth={3} />}
              </div>
              <span style={{ fontSize:13, color:"var(--text)" }}>{opt}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Language */}
      <div className="filter-section">
        <div className="filter-title">Language</div>
        {["English","Hindi","Tamil","Telugu","Kannada","Malayalam","Marathi"].map(lang => (
          <div key={lang} className={`filter-option ${isActive("language",lang) ? "active":""}`}
            onClick={() => toggle("language", lang)}>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <div style={{
                width:16, height:16, borderRadius:4,
                border:`2px solid ${isActive("language",lang) ? "var(--teal)" : "var(--border)"}`,
                background: isActive("language",lang) ? "var(--teal)" : "transparent",
                display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
              }}>
                {isActive("language",lang) && <Check size={10} color="white" strokeWidth={3} />}
              </div>
              <span style={{ fontSize:13, color:"var(--text)" }}>{lang}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Consultation mode */}
      <div className="filter-section">
        <div className="filter-title">Consultation Mode</div>
        {["Video Call","Phone Call","Chat"].map(opt => (
          <div key={opt} className={`filter-option ${isActive("mode",opt) ? "active":""}`}
            onClick={() => toggle("mode", opt)}>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <div style={{
                width:16, height:16, borderRadius:4,
                border:`2px solid ${isActive("mode",opt) ? "var(--teal)" : "var(--border)"}`,
                background: isActive("mode",opt) ? "var(--teal)" : "transparent",
                display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
              }}>
                {isActive("mode",opt) && <Check size={10} color="white" strokeWidth={3} />}
              </div>
              <span style={{ fontSize:13, color:"var(--text)" }}>{opt}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   ROOT APP
═══════════════════════════════════════════ */
export default function DoctorDiscovery() {
  const [search,      setSearch]      = useState("");
  const [specialty,   setSpecialty]   = useState("All");
  const [city,        setCity]        = useState("All Cities");
  const [sort,        setSort]        = useState("Best Match");
  const [filters,     setFilters]     = useState({});
  const [showFilter,  setShowFilter]  = useState(true);
  const [bookingDoc,  setBookingDoc]  = useState(null);
  const [profileDoc,  setProfileDoc]  = useState(null);

  const handleFilter = (key, val) => {
    if (key === "reset") { setFilters({}); return; }
    setFilters(f => ({ ...f, [key]:val }));
  };

  // Filter + sort doctors
  const filtered = DOCTORS.filter(d => {
    if (search && !d.name.toLowerCase().includes(search.toLowerCase()) &&
        !d.specialty.toLowerCase().includes(search.toLowerCase()) &&
        !d.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))) return false;
    if (specialty !== "All" && d.specialty !== specialty) return false;
    if (city !== "All Cities" && d.city !== city) return false;
    if (filters.specialty?.length && !filters.specialty.includes(d.specialty)) return false;
    if (filters.language?.length && !filters.language.some(l => d.languages.includes(l))) return false;
    if (filters.availability?.includes("Available now") && !d.available) return false;
    return true;
  }).sort((a, b) => {
    if (sort === "Rating") return b.rating - a.rating;
    if (sort === "Experience") return b.exp - a.exp;
    if (sort === "Fee (Low-High)") return a.fee - b.fee;
    if (sort === "Fee (High-Low)") return b.fee - a.fee;
    // Best Match: featured first, then rating
    if (b.featured !== a.featured) return b.featured ? 1 : -1;
    return b.rating - a.rating;
  });

  const activeFilterCount = Object.values(filters).flat().length;

  return (
    <>
      <style>{CSS}</style>
      <div style={{ display:"flex", flexDirection:"column", height:"100vh", overflow:"hidden" }}>

        {/* ── Top Nav ── */}
        <header style={{
          background:"var(--white)", borderBottom:"1px solid var(--border)",
          padding:"0 24px", height:60, flexShrink:0,
          display:"flex", alignItems:"center", justifyContent:"space-between",
          boxShadow:"0 1px 4px rgba(0,0,0,.05)",
        }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <div style={{
              width:32, height:32, borderRadius:10,
              background:"linear-gradient(135deg,var(--teal),#0f766e)",
              display:"flex", alignItems:"center", justifyContent:"center",
            }}>
              <Activity size={17} color="white" />
            </div>
            <span style={{ fontFamily:"Cormorant Garamond,serif", fontSize:20, fontWeight:700,
              color:"var(--teal)", letterSpacing:"-.01em" }}>
              SlimRx
              <span style={{ fontSize:12, color:"var(--text3)", fontWeight:400,
                fontFamily:"Lato,sans-serif", marginLeft:6 }}>/ Find a Doctor</span>
            </span>
          </div>

          <div style={{ display:"flex", gap:10 }}>
            <button className="btn btn-outline btn-sm">Sign In</button>
            <button className="btn btn-teal btn-sm">Get Started</button>
          </div>
        </header>

        {/* ── Hero search bar ── */}
        <div style={{
          background:"linear-gradient(135deg,#0f172a 0%,#0d3a30 60%,#0f172a 100%)",
          padding:"28px 24px", flexShrink:0, position:"relative", overflow:"hidden",
        }}>
          <div style={{
            position:"absolute", inset:0, pointerEvents:"none",
            backgroundImage:"radial-gradient(circle,rgba(255,255,255,.04) 1px,transparent 1px)",
            backgroundSize:"24px 24px",
          }} />
          <div style={{ maxWidth:900, margin:"0 auto", position:"relative" }}>
            <h1 style={{ fontFamily:"Cormorant Garamond,serif", fontSize:28, fontWeight:700,
              color:"white", marginBottom:6, letterSpacing:"-.02em" }}>
              Find your GLP-1 specialist
            </h1>
            <p style={{ fontSize:13.5, color:"rgba(255,255,255,.5)", marginBottom:18 }}>
              All {DOCTORS.length} doctors are MCI-verified and experienced in GLP-1 prescribing
            </p>

            {/* Search */}
            <div style={{ display:"flex", gap:10 }}>
              <div className="search-bar" style={{ flex:1, borderColor:"rgba(255,255,255,.15)",
                background:"rgba(255,255,255,.07)", backdropFilter:"blur(8px)" }}>
                <Search size={18} color="rgba(255,255,255,.4)" />
                <input className="search-inp" placeholder="Search by name, specialty, condition…"
                  value={search} onChange={e => setSearch(e.target.value)}
                  style={{ color:"white" }} />
                {search && (
                  <button onClick={() => setSearch("")} style={{ background:"none", border:"none",
                    cursor:"pointer", display:"flex", alignItems:"center" }}>
                    <X size={15} color="rgba(255,255,255,.4)" />
                  </button>
                )}
              </div>

              <div style={{ position:"relative" }}>
                <select value={city} onChange={e => setCity(e.target.value)} style={{
                  padding:"14px 36px 14px 14px", borderRadius:"var(--r-xl)",
                  border:"1.5px solid rgba(255,255,255,.15)",
                  background:"rgba(255,255,255,.07)", backdropFilter:"blur(8px)",
                  color:"white", fontSize:14, fontWeight:600, cursor:"pointer",
                  appearance:"none", WebkitAppearance:"none", outline:"none",
                  fontFamily:"Lato,sans-serif",
                }}>
                  {CITIES_F.map(c => <option key={c} style={{ color:"var(--ink)", background:"white" }}>{c}</option>)}
                </select>
                <ChevronDown size={14} color="rgba(255,255,255,.5)"
                  style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }} />
              </div>
            </div>

            {/* Specialty chips */}
            <div style={{ display:"flex", gap:8, marginTop:14, flexWrap:"wrap" }}>
              {SPECIALTIES.map(s => (
                <button key={s}
                  className={`chip ${specialty === s ? "active":""}`}
                  onClick={() => setSpecialty(s)}
                  style={{
                    background: specialty === s ? "var(--teal)" : "rgba(255,255,255,.07)",
                    borderColor: specialty === s ? "var(--teal)" : "rgba(255,255,255,.15)",
                    color: specialty === s ? "white" : "rgba(255,255,255,.6)",
                    backdropFilter:"blur(8px)",
                  }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Body ── */}
        <div style={{ flex:1, display:"flex", overflow:"hidden" }}>

          {/* Sidebar */}
          {showFilter && <FilterSidebar filters={filters} onChange={handleFilter} />}

          {/* Main content */}
          <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
            {/* Toolbar */}
            <div style={{
              background:"var(--white)", borderBottom:"1px solid var(--border)",
              padding:"12px 20px", flexShrink:0,
              display:"flex", alignItems:"center", justifyContent:"space-between",
              flexWrap:"wrap", gap:10,
            }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => setShowFilter(f => !f)}
                  style={{ borderColor: showFilter ? "var(--teal)" : "var(--border)",
                    color: showFilter ? "var(--teal)" : "var(--text2)",
                    background: showFilter ? "var(--teal-s)" : "white" }}
                >
                  <SlidersHorizontal size={13} />
                  Filters
                  {activeFilterCount > 0 && (
                    <span style={{
                      background:"var(--teal)", color:"white", fontSize:10, fontWeight:800,
                      padding:"1px 6px", borderRadius:100, minWidth:16, textAlign:"center",
                    }}>{activeFilterCount}</span>
                  )}
                </button>

                <span style={{ fontSize:13, color:"var(--text2)" }}>
                  <strong style={{ color:"var(--ink)" }}>{filtered.length}</strong> doctors found
                </span>
              </div>

              {/* Sort */}
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <span style={{ fontSize:12, color:"var(--text3)", fontWeight:700 }}>Sort:</span>
                <div style={{ position:"relative" }}>
                  <select value={sort} onChange={e => setSort(e.target.value)} style={{
                    padding:"7px 30px 7px 12px", borderRadius:"var(--r)",
                    border:"1.5px solid var(--border)", background:"white",
                    color:"var(--text)", fontSize:13, fontWeight:600, cursor:"pointer",
                    appearance:"none", WebkitAppearance:"none", outline:"none",
                    fontFamily:"Lato,sans-serif",
                  }}>
                    {SORT_OPTIONS.map(s => <option key={s}>{s}</option>)}
                  </select>
                  <ChevronDown size={13} color="var(--text3)"
                    style={{ position:"absolute", right:10, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }} />
                </div>
              </div>
            </div>

            {/* Doctor grid */}
            <div style={{ flex:1, overflowY:"auto", padding:"20px" }}>
              {filtered.length === 0 ? (
                <div style={{ textAlign:"center", padding:"60px 20px" }}>
                  <div style={{ fontSize:48, marginBottom:16 }}>🔍</div>
                  <h3 style={{ fontFamily:"Cormorant Garamond,serif", fontSize:22, color:"var(--ink)", marginBottom:8 }}>
                    No doctors found
                  </h3>
                  <p style={{ color:"var(--text2)", fontSize:14 }}>
                    Try adjusting your filters or search terms
                  </p>
                </div>
              ) : (
                <div style={{ display:"grid",
                  gridTemplateColumns:"repeat(auto-fill,minmax(340px,1fr))", gap:18 }}>
                  {filtered.map((doc, i) => (
                    <DoctorCard
                      key={doc.id} doctor={doc} idx={i}
                      onBook={setBookingDoc}
                      onViewProfile={setProfileDoc}
                    />
                  ))}
                </div>
              )}

              {/* Trust strip */}
              <div style={{
                marginTop:32, padding:"20px 24px",
                background:"var(--teal-s)", borderRadius:"var(--r-xl)",
                border:"1px solid var(--teal-s2)",
                display:"flex", flexWrap:"wrap", gap:20, alignItems:"center",
                justifyContent:"center",
              }}>
                {[
                  { icon:Shield,       text:"All doctors MCI-verified" },
                  { icon:Award,        text:"Average 4.9★ patient rating" },
                  { icon:Clock,        text:"Consultation within 2 hours" },
                  { icon:CheckCircle2, text:"Prescription same session" },
                ].map(({ icon:Icon, text }) => (
                  <div key={text} style={{ display:"flex", alignItems:"center", gap:7,
                    fontSize:13, fontWeight:700, color:"var(--teal)" }}>
                    <Icon size={15} /> {text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking modal */}
      {bookingDoc && (
        <BookingModal
          doctor={bookingDoc}
          onClose={() => setBookingDoc(null)}
        />
      )}

      {/* Profile modal */}
      {profileDoc && (
        <DoctorProfileModal
          doctor={profileDoc}
          onClose={() => setProfileDoc(null)}
          onBook={(doc) => { setProfileDoc(null); setBookingDoc(doc); }}
        />
      )}
    </>
  );
}
