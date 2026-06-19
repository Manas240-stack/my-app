import { useState, useEffect } from "react";
import {
  BarChart3, LineChart, PieChart, TrendingUp, TrendingDown,
  DollarSign, Users, Stethoscope, Activity, CheckCircle2,
  AlertCircle, Clock, Flag, Shield, Lock, Download,
  Filter, Search, ChevronRight, ChevronDown, X, Eye,
  FileText, Zap, ThumbsUp, ThumbsDown, Calendar,
  MapPin, Star, Award, Pill, Truck, CreditCard,
  Bell, Settings, LogOut, Menu, Home, BarChart2,
  Database, Radio, Send, Smartphone, ArrowUpRight,
  ArrowDownRight, Copy, RefreshCw, ArrowRight, Check
} from "lucide-react";

/* ═══════════════════════════════════════════════
   STYLES — Admin dark theme
   Deep navy + electric accent + clinical greens
   Fonts: IBM Plex Sans + JetBrains Mono
═══════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;500;600&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{
  --bg:     #050a12;
  --bg2:    #0d1620;
  --bg3:    #141f2d;
  --bg4:    #1a2a3a;
  --accent: #00d4ff;
  --accent2:#00a8cc;
  --blue:   #0066ff;
  --green:  #00d97e;
  --red:    #ff3b3b;
  --amber:  #ffa500;
  --purple: #b366ff;
  --text:   #e8f4f8;
  --text2:  #a0b8c8;
  --text3:  #708090;
  --border: #1a3a4a;
  --border2:#0f2030;
  --white:  #ffffff;
  --r:      8px;
  --r-lg:   12px;
  --r-xl:   20px;
}
html,body,#root{height:100%;overflow:hidden;}
body{font-family:'IBM Plex Sans',sans-serif;background:var(--bg);color:var(--text);-webkit-font-smoothing:antialiased;}
.mono{font-family:'JetBrains Mono',monospace;}

@keyframes fadeUp  {from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}
@keyframes fadeIn  {from{opacity:0;}to{opacity:1;}}
@keyframes spin    {to{transform:rotate(360deg);}}
@keyframes pulse   {0%,100%{opacity:1;}50%{opacity:.4;}}
@keyframes slideDown{from{opacity:0;transform:translateY(-10px);}to{opacity:1;transform:translateY(0);}}
@keyframes shimmer {0%{background-position:-200% center;}100%{background-position:200% center;}}

.fu  {animation:fadeUp  .35s cubic-bezier(.22,1,.36,1) both;}
.fi  {animation:fadeIn  .25s ease both;}
.sd  {animation:slideDown .3s ease both;}
.d1  {animation-delay:.05s;opacity:0;} .d2{animation-delay:.10s;opacity:0;}
.d3  {animation-delay:.15s;opacity:0;} .d4{animation-delay:.20s;opacity:0;}
.d5  {animation-delay:.25s;opacity:0;} .d6{animation-delay:.30s;opacity:0;}

::-webkit-scrollbar{width:4px;} ::-webkit-scrollbar-thumb{background:var(--border);border-radius:2px;}

/* Stat card */
.stat-card{
  background:linear-gradient(135deg,var(--bg3),var(--bg2));
  border:1px solid var(--border);border-radius:var(--r-xl);
  padding:20px;transition:all .25s;cursor:pointer;
  position:relative;overflow:hidden;
}
.stat-card:hover{border-color:var(--accent);transform:translateY(-2px);
  box-shadow:0 12px 40px rgba(0,212,255,.15);}
.stat-card::before{content:'';position:absolute;top:-50%;right:-50%;
  width:200px;height:200px;background:radial-gradient(circle,rgba(0,212,255,.08),transparent);
  pointer-events:none;}

/* Btn */
.btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;
  padding:10px 18px;border-radius:var(--r-lg);border:none;
  font-family:'IBM Plex Sans',sans-serif;font-size:13px;font-weight:600;
  cursor:pointer;transition:all .18s;line-height:1;white-space:nowrap;}
.btn-accent{background:linear-gradient(135deg,var(--accent),var(--blue));color:#000;
  box-shadow:0 4px 16px rgba(0,212,255,.25);}
.btn-accent:hover{transform:translateY(-1px);box-shadow:0 8px 24px rgba(0,212,255,.35);}
.btn-ghost{background:var(--bg3);border:1px solid var(--border);color:var(--text2);}
.btn-ghost:hover{background:var(--bg4);color:var(--text);border-color:var(--accent);}
.btn-success{background:rgba(0,217,126,.15);color:var(--green);border:1px solid rgba(0,217,126,.25);}
.btn-danger{background:rgba(255,59,59,.12);color:var(--red);border:1px solid rgba(255,59,59,.2);}
.btn-sm{padding:7px 14px;font-size:12px;}
.btn-xs{padding:5px 10px;font-size:11px;}

/* Nav */
.nav-item{display:flex;align-items:center;gap:10px;padding:10px 14px;
  border-radius:var(--r-lg);cursor:pointer;transition:all .18s;
  border:none;background:none;font-family:'IBM Plex Sans',sans-serif;
  font-size:13px;font-weight:500;color:var(--text2);width:100%;text-align:left;}
.nav-item:hover{background:var(--bg3);color:var(--text);}
.nav-item.active{background:rgba(0,212,255,.1);color:var(--accent);border-left:3px solid var(--accent);
  padding-left:11px;font-weight:700;}

/* Badge */
.badge{display:inline-flex;align-items:center;gap:4px;
  padding:3px 10px;border-radius:100px;font-size:11px;font-weight:700;}
.b-green {background:rgba(0,217,126,.15);color:var(--green);}
.b-red   {background:rgba(255,59,59,.15);color:var(--red);}
.b-amber {background:rgba(255,165,0,.15);color:var(--amber);}
.b-blue  {background:rgba(0,102,255,.15);color:var(--blue);}
.b-purple{background:rgba(179,102,255,.15);color:var(--purple);}

/* Table */
.admin-table{width:100%;border-collapse:collapse;font-size:13px;}
.admin-table th{background:var(--bg3);padding:11px 16px;text-align:left;
  font-size:10px;font-weight:700;color:var(--text3);
  letter-spacing:.08em;border-bottom:1px solid var(--border);}
.admin-table td{padding:12px 16px;border-bottom:1px solid var(--border2);}
.admin-table tr:hover td{background:rgba(0,212,255,.02);}

/* Tabs */
.tab{padding:10px 16px;border:none;background:none;cursor:pointer;
  font-family:'IBM Plex Sans',sans-serif;font-size:13px;font-weight:600;
  color:var(--text2);border-bottom:2px solid transparent;transition:all .18s;}
.tab.active{color:var(--accent);border-bottom-color:var(--accent);}
.tab:hover:not(.active){color:var(--text);}

/* Modal */
.modal-bg{position:fixed;inset:0;z-index:200;background:rgba(0,0,0,.8);
  backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;
  padding:20px;animation:fadeIn .2s ease;}
.modal{background:var(--bg2);border:1px solid var(--border);
  border-radius:var(--r-xl);max-width:640px;width:100%;
  max-height:90vh;overflow-y:auto;animation:fadeUp .3s cubic-bezier(.22,1,.36,1);}

/* Chart placeholder */
.chart-placeholder{width:100%;height:240px;background:var(--bg3);
  border:1px solid var(--border);border-radius:var(--r-lg);
  display:flex;align-items:center;justify-content:center;
  color:var(--text3);font-size:13px;}

/* Spark line */
.sparkline{display:flex;align-items:flex-end;gap:2px;height:32px;}
.spark-bar{flex:1;background:var(--accent);border-radius:2px 2px 0 0;
  min-height:2px;transition:background .2s;}
.spark-bar:hover{background:var(--blue);}

/* Status indicator */
.status-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0;}
.status-green {background:var(--green);}
.status-red   {background:var(--red);}
.status-amber {background:var(--amber);}

/* Search */
.search-wrap{display:flex;align-items:center;gap:8px;
  background:var(--bg3);border:1.5px solid var(--border);
  border-radius:var(--r-lg);padding:9px 14px;transition:border-color .18s;}
.search-wrap:focus-within{border-color:var(--accent);}
.search-inp{border:none;outline:none;background:transparent;flex:1;
  font-family:'IBM Plex Sans',sans-serif;font-size:13px;color:var(--text);}
.search-inp::placeholder{color:var(--text3);}

/* Approval card */
.approval-card{background:var(--bg2);border:1px solid var(--border);
  border-radius:var(--r-xl);padding:18px;cursor:pointer;
  transition:all .2s;}
.approval-card:hover{border-color:var(--accent);background:var(--bg3);}
.approval-card.urgent{border-color:var(--red);}

/* KPI section */
.kpi-group{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));
  gap:12px;}
`;

/* ═══════════════════════════════════════════════
   MOCK DATA
═══════════════════════════════════════════════ */
const METRICS = {
  revenue:     { current:2847320, prev:2614200, growth:8.9 },
  gmv:         { current:12948200, prev:11823400, growth:9.5 },
  patients:    { current:47821, prev:45632, growth:4.8 },
  doctors:     { current:623, prev:589, growth:5.8 },
  consultations:{ current:8920, prev:8201, growth:8.8 },
  orders:      { current:9384, prev:8621, growth:8.8 },
  nps:         { current:67, prev:64, growth:4.7 },
};

const PENDING_APPROVALS = [
  {
    id:"D234", name:"Dr. Priya Sharma", mci:"MCI-598234", specialty:"Endocrinology",
    city:"Delhi", exp:8, status:"pending_mci", days:3, docs:["MBBS","MCI Cert","Aadhaar"],
    rating:"New", urgent:true,
  },
  {
    id:"D235", name:"Dr. Vikram Nair", mci:"MCI-467821", specialty:"Internal Medicine",
    city:"Mumbai", exp:12, status:"pending_review", days:1, docs:["MBBS","MCI Cert","Aadhaar"],
    rating:"New", urgent:false,
  },
  {
    id:"D236", name:"Dr. Ananya Reddy", mci:"MCI-823945", specialty:"Diabetology",
    city:"Bengaluru", exp:6, status:"pending_docs", days:5, docs:["MBBS","Aadhaar"],
    rating:"New", urgent:false,
  },
];

const RECENT_ORDERS = [
  { id:"ORD-001", patient:"Priya M.", med:"SemaSlim 7mg", amount:1299, status:"delivered", days:2 },
  { id:"ORD-002", patient:"Rajesh K.", med:"SemaPen 2.4mg", amount:2199, status:"in_transit", days:0 },
  { id:"ORD-003", patient:"Ananya R.", med:"LiraDose 3mg", amount:1799, status:"dispatched", days:1 },
  { id:"ORD-004", patient:"Suresh P.", med:"SemaSlim 7mg", amount:1299, status:"pending", days:3 },
  { id:"ORD-005", patient:"Meera J.", med:"SemaSlim 7mg", amount:1299, status:"delivered", days:1 },
];

const SYSTEM_HEALTH = [
  { system:"API Gateway", status:"online", latency:"42ms", uptime:"99.98%", lastIncident:"2 weeks ago" },
  { system:"Database", status:"online", latency:"18ms", uptime:"99.99%", lastIncident:"Never" },
  { system:"Cache (Redis)", status:"online", latency:"3ms", uptime:"99.97%", lastIncident:"3 days ago" },
  { system:"MSG91 Integration", status:"online", latency:"120ms", uptime:"99.89%", lastIncident:"5 days ago" },
  { system:"Razorpay Bridge", status:"online", latency:"280ms", uptime:"99.91%", lastIncident:"1 week ago" },
  { system:"Claude API Proxy", status:"online", latency:"1200ms", uptime:"99.94%", lastIncident:"10 days ago" },
];

const COMPLIANCE_ITEMS = [
  { item:"DPDPA Compliance", status:"compliant", lastAudit:"Jun 5, 2025", risk:"low", action:"On track" },
  { item:"MCI Registration Verification", status:"compliant", lastAudit:"Jun 10, 2025", risk:"low", action:"Automated daily" },
  { item:"HIPAA Equivalent Encryption", status:"compliant", lastAudit:"Jun 1, 2025", risk:"low", action:"AES-256" },
  { item:"Payment PCI-DSS", status:"compliant", lastAudit:"Jun 8, 2025", risk:"low", action:"Razorpay L1" },
  { item:"Cold-Chain Temperature Logs", status:"compliant", lastAudit:"Jun 9, 2025", risk:"low", action:"IoT sensors" },
  { item:"Doctor Document Retention", status:"review_needed", lastAudit:"May 28, 2025", risk:"medium", action:"Check S3 compliance" },
];

const ALERTS = [
  { id:1, type:"critical", title:"High OTP failure rate", desc:"SMS OTP failure rate 8.2% vs normal 0.3%", action:"MSG91 check", time:"5 min ago" },
  { id:2, type:"warning", title:"Doctor approval queue", desc:"18 pending doctor registrations (5+ days old)", action:"Review queue", time:"2 hrs ago" },
  { id:3, type:"info", title:"API latency spike", desc:"Gateway latency 320ms → 580ms for 8 minutes", action:"Check logs", time:"1 hr ago" },
  { id:4, type:"success", title:"Backup completed", desc:"Daily DB backup completed successfully (2.8GB)", action:"View logs", time:"3 hrs ago" },
];

/* ═══════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════ */
function MetricCard({ label, value, change, icon:Icon, color }) {
  const isPositive = change >= 0;
  return (
    <div className={`stat-card fu`}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
        <div style={{ width:40, height:40, borderRadius:12, background:`${color}15`,
          border:`1px solid ${color}25`, display:"flex", alignItems:"center", justifyContent:"center" }}>
          <Icon size={18} color={color} />
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:2, fontSize:11,
          fontWeight:700, color: isPositive ? "var(--green)" : "var(--red)" }}>
          {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
          {Math.abs(change)}%
        </div>
      </div>
      <div style={{ fontSize:24, fontWeight:800, color, lineHeight:1, marginBottom:4 }}>
        {typeof value === "number" ? value.toLocaleString("en-IN") : value}
      </div>
      <div style={{ fontSize:12, color:"var(--text3)" }}>{label}</div>
    </div>
  );
}

function SparklineChart({ data }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  return (
    <div className="sparkline">
      {data.map((v, i) => (
        <div key={i} className="spark-bar"
          style={{ height:`${((v - min) / range) * 100}%` }} />
      ))}
    </div>
  );
}

function Spinner({ size=16, color="var(--accent)" }) {
  return <div style={{ width:size, height:size, borderRadius:"50%",
    border:`2px solid rgba(0,212,255,.2)`, borderTopColor:color,
    animation:"spin .7s linear infinite" }} />;
}

/* ═══════════════════════════════════════════════
   APPROVAL MODAL
═══════════════════════════════════════════════ */
function ApprovalModal({ doctor, onClose, onApprove, onReject }) {
  const [step, setStep] = useState(0);

  return (
    <div className="modal-bg" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ padding:"28px" }}>
        {step === 0 ? (
          <>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
              <h3 style={{ fontSize:18, fontWeight:700 }}>Doctor Registration Review</h3>
              <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer",
                width:28, height:28, borderRadius:"50%", background:"var(--bg3)",
                display:"flex", alignItems:"center", justifyContent:"center" }}>
                <X size={14} color="var(--text2)" />
              </button>
            </div>

            {/* Doctor info */}
            <div style={{ background:"var(--bg3)", border:"1px solid var(--border)",
              borderRadius:"var(--r-lg)", padding:"18px", marginBottom:20 }}>
              <div style={{ display:"flex", gap:14, marginBottom:16 }}>
                <div style={{ width:60, height:60, borderRadius:14, background:"var(--bg4)",
                  border:"1px solid var(--border)", display:"flex", alignItems:"center",
                  justifyContent:"center", fontSize:28, flexShrink:0 }}>👨‍⚕️</div>
                <div>
                  <div style={{ fontSize:17, fontWeight:700, color:"var(--text)", marginBottom:4 }}>
                    {doctor.name}
                  </div>
                  <div style={{ fontSize:13, color:"var(--text2)", marginBottom:6 }}>
                    {doctor.specialty} · {doctor.exp} yrs experience
                  </div>
                  <div style={{ display:"flex", gap:8 }}>
                    <span className="badge b-blue">{doctor.mci}</span>
                    <span className="badge b-amber">{doctor.city}</span>
                  </div>
                </div>
              </div>

              {/* Status checks */}
              <div style={{ borderTop:"1px solid var(--border2)", paddingTop:12 }}>
                {[
                  { label:"MCI Verification",  status:doctor.status==="pending_mci"?"pending":"done" },
                  { label:"Document Upload",   status:doctor.status==="pending_docs"?"pending":"done" },
                  { label:"Manual Review",     status:doctor.status==="pending_review"?"pending":"done" },
                  { label:"Background Check",  status:"pending" },
                ].map(({ label, status }) => (
                  <div key={label} style={{ display:"flex", gap:10, alignItems:"center",
                    padding:"7px 0", borderBottom:"1px solid var(--border2)" }}>
                    {status === "done"
                      ? <CheckCircle2 size={14} color="var(--green)" />
                      : <Clock size={14} color="var(--amber)" />}
                    <span style={{ fontSize:13, color:"var(--text2)", flex:1 }}>{label}</span>
                    <span style={{ fontSize:11, fontWeight:700, color: status==="done" ? "var(--green)" : "var(--amber)" }}>
                      {status === "done" ? "✓ Done" : "⏳ Pending"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendation */}
            <div style={{ background:"rgba(0,217,126,.08)", border:"1px solid rgba(0,217,126,.15)",
              borderRadius:"var(--r-lg)", padding:"14px", marginBottom:20,
              fontSize:13, color:"var(--green)" }}>
              ✅ <strong>Recommended for approval</strong> — All documents verified, MCI registration confirmed
            </div>

            {/* Actions */}
            <div style={{ display:"flex", gap:10 }}>
              <button className="btn btn-ghost" style={{ flex:1 }} onClick={onClose}>Cancel</button>
              <button className="btn btn-danger" style={{ flex:1 }}
                onClick={() => { onReject(doctor.id); onClose(); }}>
                <ThumbsDown size={13} /> Reject
              </button>
              <button className="btn btn-accent" style={{ flex:1.5 }}
                onClick={() => { setStep(1); }}>
                <ThumbsUp size={13} /> Review & Approve
              </button>
            </div>
          </>
        ) : (
          <>
            <h3 style={{ fontSize:18, fontWeight:700, marginBottom:20 }}>Confirm Approval</h3>
            <div style={{ background:"var(--bg3)", borderRadius:"var(--r-lg)", padding:"16px", marginBottom:20 }}>
              <p style={{ fontSize:13.5, color:"var(--text2)", lineHeight:1.7, marginBottom:14 }}>
                You are about to approve <strong>{doctor.name}</strong> as a physician on SlimRx.
              </p>
              <div style={{ fontSize:12, color:"var(--text3)" }}>
                They will receive an SMS + email notification and can start accepting patient bookings immediately.
              </div>
            </div>

            <div style={{ display:"flex", gap:10 }}>
              <button className="btn btn-ghost" style={{ flex:1 }} onClick={() => setStep(0)}>Back</button>
              <button className="btn btn-accent" style={{ flex:1.5 }}
                onClick={() => { onApprove(doctor.id); onClose(); }}>
                <Check size={13} /> Confirm Approval
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   PAGES
═══════════════════════════════════════════════ */
function PageOverview() {
  return (
    <div style={{ padding:"28px", overflowY:"auto", height:"100%" }}>
      <div style={{ marginBottom:24 }}>
        <h1 style={{ fontSize:24, fontWeight:800, color:"var(--text)", marginBottom:6 }}>
          Platform Dashboard
        </h1>
        <p style={{ fontSize:13.5, color:"var(--text3)" }}>
          Real-time platform metrics · {new Date().toLocaleDateString("en-IN", { year:"numeric", month:"long", day:"numeric" })}
        </p>
      </div>

      {/* KPIs */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:14, marginBottom:28 }}>
        <MetricCard label="GMV (30d)" value={"₹" + (METRICS.gmv.current/10000000).toFixed(1) + "Cr"}
          change={METRICS.gmv.growth} icon={DollarSign} color="var(--blue)" />
        <MetricCard label="Revenue (30d)" value={"₹" + (METRICS.revenue.current/100000).toFixed(1) + "L"}
          change={METRICS.revenue.growth} icon={CreditCard} color="var(--green)" />
        <MetricCard label="Active Patients" value={METRICS.patients.current.toLocaleString("en-IN")}
          change={METRICS.patients.growth} icon={Users} color="var(--accent)" />
        <MetricCard label="Active Doctors" value={METRICS.doctors.current}
          change={METRICS.doctors.growth} icon={Stethoscope} color="var(--purple)" />
        <MetricCard label="Consultations (30d)" value={METRICS.consultations.current.toLocaleString("en-IN")}
          change={METRICS.consultations.growth} icon={Activity} color="var(--amber)" />
        <MetricCard label="Platform NPS" value={METRICS.nps.current}
          change={METRICS.nps.growth} icon={Star} color="var(--green)" />
      </div>

      {/* Charts row */}
      <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:16, marginBottom:24 }}>
        <div style={{ background:"var(--bg2)", border:"1px solid var(--border)",
          borderRadius:"var(--r-xl)", padding:"20px" }}>
          <h3 style={{ fontSize:14, fontWeight:700, marginBottom:16 }}>Revenue Trend (7d)</h3>
          <div className="chart-placeholder">
            <LineChart size={40} color="var(--text3)" />
          </div>
        </div>

        <div style={{ background:"var(--bg2)", border:"1px solid var(--border)",
          borderRadius:"var(--r-xl)", padding:"20px" }}>
          <h3 style={{ fontSize:14, fontWeight:700, marginBottom:16 }}>Order Status</h3>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {[
              { label:"Delivered", val:2840, color:"var(--green)" },
              { label:"In Transit", val:640, color:"var(--blue)" },
              { label:"Pending", val:210, color:"var(--amber)" },
            ].map(({ label, val, color }) => (
              <div key={label}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4, fontSize:12 }}>
                  <span style={{ color:"var(--text3)" }}>{label}</span>
                  <span style={{ fontWeight:700, color }}>{val}</span>
                </div>
                <div style={{ height:4, background:"var(--bg3)", borderRadius:2, overflow:"hidden" }}>
                  <div style={{ height:"100%", width:`${(val/3000)*100}%`, background:color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent activity */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
        {/* Recent orders */}
        <div style={{ background:"var(--bg2)", border:"1px solid var(--border)",
          borderRadius:"var(--r-xl)", overflow:"hidden" }}>
          <div style={{ padding:"18px 20px", borderBottom:"1px solid var(--border)" }}>
            <h3 style={{ fontSize:14, fontWeight:700 }}>Recent Orders</h3>
          </div>
          <table className="admin-table">
            <thead style={{ display:"none" }} />
            <tbody>
              {RECENT_ORDERS.map(o => (
                <tr key={o.id}>
                  <td style={{ padding:"12px 16px" }}>
                    <div style={{ fontSize:12, fontWeight:700, color:"var(--text)" }}>{o.id}</div>
                    <div style={{ fontSize:11, color:"var(--text3)" }}>{o.patient}</div>
                  </td>
                  <td style={{ padding:"12px 16px", fontSize:12, color:"var(--text2)" }}>{o.med}</td>
                  <td style={{ padding:"12px 16px", textAlign:"right" }}>
                    <span style={{ fontWeight:700, color:"var(--accent)" }}>₹{o.amount.toLocaleString()}</span>
                  </td>
                  <td style={{ padding:"12px 16px", textAlign:"right" }}>
                    <span className={`badge ${o.status==="delivered"?"b-green":o.status==="in_transit"?"b-blue":"b-amber"}`}>
                      {o.status === "delivered" ? "✓ Done" : o.status === "in_transit" ? "→ Transit" : "⏳ Pending"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* System health */}
        <div style={{ background:"var(--bg2)", border:"1px solid var(--border)",
          borderRadius:"var(--r-xl)", overflow:"hidden" }}>
          <div style={{ padding:"18px 20px", borderBottom:"1px solid var(--border)" }}>
            <h3 style={{ fontSize:14, fontWeight:700 }}>System Health</h3>
          </div>
          {SYSTEM_HEALTH.slice(0,5).map((s, i) => (
            <div key={s.system} style={{
              display:"flex", justifyContent:"space-between", alignItems:"center",
              padding:"11px 16px", borderBottom: i < 4 ? "1px solid var(--border2)" : "none",
            }}>
              <div>
                <div style={{ fontSize:12, fontWeight:600, color:"var(--text)" }}>{s.system}</div>
                <div style={{ fontSize:10, color:"var(--text3)" }}>{s.latency}</div>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                <div className="status-dot status-green" />
                <span style={{ fontSize:11, fontWeight:700, color:"var(--text3)" }}>{s.uptime}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PageApprovals() {
  const [selected, setSelected] = useState(null);
  const [approving, setApproving] = useState(null);

  const handleApprove = (id) => {
    setApproving(id);
    setTimeout(() => setApproving(null), 1500);
  };

  const handleReject = (id) => {
    alert(`Doctor ${id} rejected.`);
  };

  return (
    <div style={{ padding:"28px", overflowY:"auto", height:"100%" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
        <div>
          <h2 style={{ fontSize:20, fontWeight:800, color:"var(--text)", marginBottom:6 }}>
            Doctor Approvals
          </h2>
          <p style={{ fontSize:13, color:"var(--text3)" }}>
            {PENDING_APPROVALS.length} pending registration{PENDING_APPROVALS.length !== 1 ? "s" : ""}
          </p>
        </div>
        <button className="btn btn-ghost btn-sm"><RefreshCw size={13} /> Refresh</button>
      </div>

      <div style={{ display:"grid", gap:12 }}>
        {PENDING_APPROVALS.map((doc, i) => (
          <div key={doc.id} className={`approval-card fu d${i+1} ${doc.urgent ? "urgent" : ""}`}
            style={{ position:"relative" }}>
            {doc.urgent && (
              <div style={{ position:"absolute", top:12, right:12, display:"flex",
                alignItems:"center", gap:4, padding:"4px 8px", background:"rgba(255,59,59,.1)",
                borderRadius:6, border:"1px solid rgba(255,59,59,.2)" }}>
                <Flag size={12} color="var(--red)" />
                <span style={{ fontSize:10, fontWeight:700, color:"var(--red)" }}>Urgent</span>
              </div>
            )}

            <div style={{ display:"flex", gap:14, marginBottom:14 }}>
              <div style={{ width:52, height:52, borderRadius:12, background:"var(--bg3)",
                display:"flex", alignItems:"center", justifyContent:"center", fontSize:26,
                flexShrink:0, border:"1px solid var(--border)" }}>👨‍⚕️</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:14, fontWeight:700, color:"var(--text)", marginBottom:3 }}>
                  {doc.name}
                </div>
                <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:6 }}>
                  <span className="badge b-blue">{doc.mci}</span>
                  <span className="badge b-purple">{doc.specialty}</span>
                  <span className="badge b-blue">{doc.exp} years exp</span>
                </div>
                <div style={{ display:"flex", gap:6, fontSize:12, color:"var(--text3)" }}>
                  <MapPin size={12} /> {doc.city} ·
                  <Clock size={12} /> Pending {doc.days} days
                </div>
              </div>

              <div style={{ display:"flex", flexDirection:"column", gap:8, flexShrink:0 }}>
                <button className="btn btn-danger btn-sm"
                  onClick={() => handleReject(doc.id)}>
                  <ThumbsDown size={12} /> Reject
                </button>
                <button className="btn btn-accent btn-sm"
                  onClick={() => setSelected(doc)}>
                  <Eye size={12} /> Review
                </button>
              </div>
            </div>

            {/* Status checks */}
            <div style={{ padding:"12px", background:"var(--bg3)",
              borderRadius:"var(--r)", border:"1px solid var(--border2)", fontSize:12 }}>
              <div style={{ display:"flex", gap:8, marginBottom:6 }}>
                {[
                  { label:"MCI Check",   done:doc.status!=="pending_mci" },
                  { label:"Documents",   done:doc.status!=="pending_docs" },
                  { label:"Review",      done:doc.status!=="pending_review" },
                ].map(({ label, done }) => (
                  <div key={label} style={{ display:"flex", alignItems:"center", gap:4 }}>
                    {done
                      ? <CheckCircle2 size={13} color="var(--green)" />
                      : <Clock size={13} color="var(--amber)" />}
                    <span style={{ color: done ? "var(--green)" : "var(--amber)" }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <ApprovalModal doctor={selected} onClose={() => setSelected(null)}
          onApprove={handleApprove} onReject={handleReject} />
      )}
    </div>
  );
}

function PageCompliance() {
  return (
    <div style={{ padding:"28px", overflowY:"auto", height:"100%" }}>
      <div style={{ marginBottom:24 }}>
        <h2 style={{ fontSize:20, fontWeight:800, color:"var(--text)", marginBottom:6 }}>
          Compliance & Regulations
        </h2>
        <p style={{ fontSize:13, color:"var(--text3)" }}>
          Real-time compliance status tracking for all regulatory requirements
        </p>
      </div>

      {/* Compliance summary */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14, marginBottom:24 }}>
        {[
          { label:"Fully Compliant",  val:5, color:"var(--green)" },
          { label:"Review Needed",    val:1, color:"var(--amber)" },
          { label:"Non-Compliant",    val:0, color:"var(--red)" },
        ].map(({ label, val, color }) => (
          <div key={label} style={{
            background:"var(--bg2)", border:`1px solid ${color}30`, borderRadius:"var(--r-lg)",
            padding:"16px", textAlign:"center",
          }}>
            <div style={{ fontSize:28, fontWeight:800, color, marginBottom:6 }}>{val}</div>
            <div style={{ fontSize:12, color:"var(--text3)" }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Compliance items */}
      <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
        {COMPLIANCE_ITEMS.map((item, i) => (
          <div key={item.item} className={`fu d${i+1}`}
            style={{ background:"var(--bg2)", border:"1px solid var(--border)",
              borderRadius:"var(--r-lg)", padding:"18px", cursor:"pointer",
              transition:"all .2s" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
              <div style={{ display:"flex", gap:12, flex:1 }}>
                <div style={{
                  width:40, height:40, borderRadius:10,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  background: item.status === "compliant" ? "rgba(0,217,126,.1)" : "rgba(255,165,0,.1)",
                  border: item.status === "compliant"
                    ? "1px solid rgba(0,217,126,.2)" : "1px solid rgba(255,165,0,.2)",
                  flexShrink:0,
                }}>
                  {item.status === "compliant"
                    ? <CheckCircle2 size={18} color="var(--green)" />
                    : <AlertCircle size={18} color="var(--amber)" />}
                </div>
                <div>
                  <div style={{ fontSize:14, fontWeight:700, color:"var(--text)", marginBottom:3 }}>
                    {item.item}
                  </div>
                  <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                    <span style={{ fontSize:11, color:"var(--text3)" }}>
                      Last audit: {item.lastAudit}
                    </span>
                    <span className={`badge ${item.risk==="low"?"b-green":item.risk==="medium"?"b-amber":"b-red"}`}>
                      {item.risk.toUpperCase()} RISK
                    </span>
                  </div>
                </div>
              </div>
              <button className="btn btn-ghost btn-sm">{item.action}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   ROOT APP
═══════════════════════════════════════════════ */
const PAGES = [
  { id:"overview",   label:"Overview",   icon:Home },
  { id:"approvals",  label:"Approvals",  icon:CheckCircle2 },
  { id:"compliance", label:"Compliance", icon:Shield },
];

export default function AdminDashboard() {
  const [page, setPage] = useState("overview");
  const [mobile, setMobile] = useState(false);

  return (
    <>
      <style>{CSS}</style>
      <div style={{ display:"flex", height:"100vh", overflow:"hidden" }}>

        {/* Sidebar */}
        <aside style={{
          width:280, flexShrink:0,
          background:"linear-gradient(180deg,var(--bg2),var(--bg))",
          borderRight:"1px solid var(--border)",
          padding:"24px 16px",
          display:"flex", flexDirection:"column",
          boxShadow:"2px 0 16px rgba(0,0,0,.3)",
        }}>
          {/* Header */}
          <div style={{ marginBottom:32 }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 0" }}>
              <div style={{
                width:36, height:36, borderRadius:12,
                background:"linear-gradient(135deg,var(--accent),var(--blue))",
                display:"flex", alignItems:"center", justifyContent:"center",
                boxShadow:"0 8px 24px rgba(0,212,255,.25)",
              }}>
                <BarChart2 size={18} color="#000" />
              </div>
              <div>
                <div style={{ fontSize:14, fontWeight:800, color:"var(--text)", lineHeight:1 }}>
                  SlimRx
                </div>
                <div style={{ fontSize:9, color:"var(--accent)", letterSpacing:".1em" }}>
                  ADMIN
                </div>
              </div>
            </div>
          </div>

          {/* Status indicator */}
          <div style={{
            background:"linear-gradient(135deg,rgba(0,217,126,.1),rgba(0,102,255,.05))",
            border:"1px solid var(--border)",
            borderRadius:"var(--r-lg)", padding:"12px 14px", marginBottom:24,
          }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
              <div style={{ width:8, height:8, borderRadius:"50%",
                background:"var(--green)", animation:"pulse 2s ease infinite" }} />
              <span style={{ fontSize:12, fontWeight:700, color:"var(--green)" }}>System Healthy</span>
            </div>
            <div style={{ fontSize:10, color:"var(--text3)" }}>
              All services operational · 99.98% uptime
            </div>
          </div>

          {/* Navigation */}
          <nav style={{ display:"flex", flexDirection:"column", gap:3, marginBottom:"auto" }}>
            {PAGES.map(p => (
              <button key={p.id} className={`nav-item ${page===p.id?"active":""}`}
                onClick={() => setPage(p.id)}>
                <p.icon size={16} />
                <span style={{ flex:1 }}>{p.label}</span>
              </button>
            ))}
          </nav>

          {/* Alert summary */}
          <div style={{
            background:"var(--bg3)", border:"1px solid var(--border)",
            borderRadius:"var(--r-lg)", padding:"12px 14px", marginBottom:16,
            cursor:"pointer", transition:"all .2s",
          }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
              <Bell size={14} color="var(--amber)" />
              <span style={{ fontSize:12, fontWeight:700, color:"var(--text)" }}>
                {ALERTS.length} Alerts
              </span>
            </div>
            <div style={{ fontSize:10, color:"var(--text3)", lineHeight:1.5 }}>
              {ALERTS.find(a => a.type === "critical")
                ? "1 critical alert — check immediately"
                : "All systems normal"}
            </div>
          </div>

          {/* Footer */}
          <div style={{
            display:"flex", flexDirection:"column", gap:8,
            paddingTop:16, borderTop:"1px solid var(--border)",
          }}>
            <button className="nav-item" style={{ justifyContent:"center" }}>
              <Settings size={16} />
              <span>Settings</span>
            </button>
            <button className="nav-item" style={{ justifyContent:"center" }}>
              <LogOut size={16} />
              <span>Sign Out</span>
            </button>
          </div>
        </aside>

        {/* Main */}
        <main style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
          {/* Top bar */}
          <div style={{
            background:"linear-gradient(90deg,rgba(0,212,255,.02),transparent)",
            borderBottom:"1px solid var(--border)",
            padding:"0 28px", height:56, flexShrink:0,
            display:"flex", alignItems:"center", justifyContent:"space-between",
          }}>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              {PAGES.find(p => p.id === page) && (() => {
                const CurrentIcon = PAGES.find(p => p.id === page).icon;
                return (
                  <>
                    <CurrentIcon size={18} color="var(--accent)" />
                    <span style={{ fontSize:14, fontWeight:700, color:"var(--text)" }}>
                      {PAGES.find(p => p.id === page).label}
                    </span>
                  </>
                );
              })()}
            </div>
            <div style={{ display:"flex", gap:10, alignItems:"center" }}>
              <button className="btn btn-ghost btn-sm">
                <Download size={13} /> Export Report
              </button>
              <button className="btn btn-ghost btn-sm">
                <RefreshCw size={13} /> Refresh
              </button>
            </div>
          </div>

          {/* Content */}
          <div style={{ flex:1, overflowY:"auto", background:"linear-gradient(135deg,var(--bg),var(--bg2))" }}>
            {page === "overview"   && <PageOverview />}
            {page === "approvals"  && <PageApprovals />}
            {page === "compliance" && <PageCompliance />}
          </div>
        </main>
      </div>
    </>
  );
}
