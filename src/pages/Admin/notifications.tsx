import { useState, useEffect, useRef } from "react";
import {
  MessageCircle, Phone, Mail, Bell, Send, Check, CheckCheck,
  Clock, AlertCircle, RefreshCw, Filter, Search, ChevronDown,
  ChevronRight, X, Plus, Edit3, Trash2, Eye, Copy, Zap,
  Users, TrendingUp, Activity, Shield, Settings, BarChart2,
  ArrowUpRight, ArrowDownRight, Calendar, Pill, Truck,
  Stethoscope, CreditCard, Star, Info, CheckCircle2, XCircle
} from "lucide-react";

/* ═══════════════════════════════════════════════
   STYLES — Aesthetic: WhatsApp-inspired dark
   with clean notification management UI.
   Deep charcoal + WA green + warm accents.
   Fonts: Space Grotesk + JetBrains Mono
═══════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{
  --bg:     #0b0f14;
  --bg2:    #131920;
  --bg3:    #1a2332;
  --bg4:    #1e2a3a;
  --wa:     #25d366;
  --wa2:    #128c7e;
  --wa3:    #075e54;
  --wa-s:   rgba(37,211,102,.1);
  --sms:    #3b82f6;
  --sms-s:  rgba(59,130,246,.1);
  --email:  #f59e0b;
  --email-s:rgba(245,158,11,.1);
  --push:   #8b5cf6;
  --push-s: rgba(139,92,246,.1);
  --green:  #22c55e;
  --red:    #ef4444;
  --amber:  #f59e0b;
  --text:   #e2e8f0;
  --text2:  #94a3b8;
  --text3:  #64748b;
  --border: #1e293b;
  --border2:#253044;
  --white:  #ffffff;
  --r:      8px;
  --r-lg:   14px;
  --r-xl:   20px;
}
html,body,#root{height:100%;overflow:hidden;}
body{font-family:'Space Grotesk',sans-serif;background:var(--bg);color:var(--text);-webkit-font-smoothing:antialiased;}
.mono{font-family:'JetBrains Mono',monospace;}

@keyframes fadeUp  {from{opacity:0;transform:translateY(12px);}to{opacity:1;transform:translateY(0);}}
@keyframes fadeIn  {from{opacity:0;}to{opacity:1;}}
@keyframes spin    {to{transform:rotate(360deg);}}
@keyframes pulse   {0%,100%{opacity:1;}50%{opacity:.4;}}
@keyframes msgIn   {from{opacity:0;transform:scale(.95) translateY(8px);}to{opacity:1;transform:scale(1) translateY(0);}}
@keyframes sendPulse{0%{box-shadow:0 0 0 0 rgba(37,211,102,.4);}100%{box-shadow:0 0 0 16px rgba(37,211,102,0);}}
@keyframes shimmer {0%{background-position:-200% center;}100%{background-position:200% center;}}
@keyframes blink   {0%,100%{opacity:1;}50%{opacity:.3;}}

.fu  {animation:fadeUp  .4s cubic-bezier(.22,1,.36,1) both;}
.fi  {animation:fadeIn  .3s ease both;}
.msg {animation:msgIn   .35s cubic-bezier(.22,1,.36,1) both;}
.d1  {animation-delay:.04s;opacity:0;} .d2{animation-delay:.08s;opacity:0;}
.d3  {animation-delay:.12s;opacity:0;} .d4{animation-delay:.16s;opacity:0;}
.d5  {animation-delay:.20s;opacity:0;} .d6{animation-delay:.24s;opacity:0;}

::-webkit-scrollbar{width:4px;} ::-webkit-scrollbar-thumb{background:var(--border2);border-radius:2px;}

/* Sidebar nav */
.snav{display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:var(--r-lg);
  cursor:pointer;transition:all .18s;color:var(--text2);font-size:13.5px;font-weight:500;
  border:none;background:none;width:100%;font-family:'Space Grotesk',sans-serif;text-align:left;}
.snav:hover{background:var(--bg3);color:var(--text);}
.snav.active{background:var(--wa-s);color:var(--wa);font-weight:700;
  border-left:3px solid var(--wa);padding-left:11px;}

/* Channel badge */
.ch-badge{display:inline-flex;align-items:center;gap:5px;padding:3px 10px;
  border-radius:100px;font-size:11px;font-weight:700;white-space:nowrap;}
.ch-wa    {background:var(--wa-s);   color:var(--wa);}
.ch-sms   {background:var(--sms-s);  color:var(--sms);}
.ch-email {background:var(--email-s);color:var(--email);}
.ch-push  {background:var(--push-s); color:var(--push);}

/* Status dot */
.s-dot{width:8px;height:8px;border-radius:50%;flex-shrink:0;}
.s-sent      {background:var(--text3);}
.s-delivered {background:var(--sms);}
.s-read      {background:var(--wa);}
.s-failed    {background:var(--red);animation:pulse 1.2s ease infinite;}
.s-pending   {background:var(--amber);animation:pulse 1.4s ease infinite;}

/* Stat card */
.stat{background:var(--bg2);border:1px solid var(--border2);border-radius:var(--r-lg);padding:16px 18px;}

/* Btn */
.btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;
  padding:10px 18px;border-radius:var(--r-lg);border:none;
  font-family:'Space Grotesk',sans-serif;font-size:13px;font-weight:700;
  cursor:pointer;transition:all .18s;line-height:1;white-space:nowrap;}
.btn-wa{background:var(--wa);color:#000;box-shadow:0 4px 14px rgba(37,211,102,.3);}
.btn-wa:hover{background:#22c55e;transform:translateY(-1px);box-shadow:0 6px 20px rgba(37,211,102,.4);}
.btn-outline{background:transparent;border:1.5px solid var(--border2);color:var(--text2);}
.btn-outline:hover{border-color:var(--wa);color:var(--wa);background:var(--wa-s);}
.btn-ghost{background:var(--bg3);border:1px solid var(--border2);color:var(--text2);}
.btn-ghost:hover{background:var(--bg4);color:var(--text);}
.btn-sm{padding:7px 13px;font-size:12px;}
.btn-xs{padding:5px 10px;font-size:11px;}
.btn-danger{background:rgba(239,68,68,.15);color:var(--red);border:1px solid rgba(239,68,68,.2);}
.btn-danger:hover{background:rgba(239,68,68,.25);}

/* WA message bubble */
.wa-bubble{
  background:#005c4b;border-radius:8px 0 8px 8px;
  padding:10px 14px 6px;max-width:85%;position:relative;
  font-size:13.5px;line-height:1.55;color:var(--text);
  box-shadow:0 1px 3px rgba(0,0,0,.3);
}
.wa-bubble.received{background:var(--bg3);border-radius:0 8px 8px 8px;}
.wa-tail-sent{
  position:absolute;top:0;right:-8px;
  border-left:8px solid #005c4b;
  border-bottom:8px solid transparent;
}
.wa-tail-recv{
  position:absolute;top:0;left:-8px;
  border-right:8px solid var(--bg3);
  border-bottom:8px solid transparent;
}
.wa-time{font-size:11px;color:rgba(255,255,255,.55);text-align:right;margin-top:4px;
  display:flex;align-items:center;justify-content:flex-end;gap:4px;}

/* Template card */
.tmpl-card{
  background:var(--bg2);border:1px solid var(--border2);
  border-radius:var(--r-xl);padding:18px 20px;
  transition:all .2s;cursor:pointer;
}
.tmpl-card:hover{border-color:var(--border);background:var(--bg3);}
.tmpl-card.active{border-color:var(--wa);background:rgba(37,211,102,.04);}

/* Input */
.inp{width:100%;padding:10px 14px;border:1.5px solid var(--border2);
  border-radius:var(--r-lg);font-family:'Space Grotesk',sans-serif;
  font-size:13.5px;color:var(--text);background:var(--bg2);outline:none;
  transition:border-color .18s;}
.inp:focus{border-color:var(--wa);}
.inp::placeholder{color:var(--text3);}

/* Log row */
.log-row{display:flex;align-items:center;gap:12px;padding:11px 16px;
  border-bottom:1px solid var(--border);transition:background .15s;cursor:pointer;}
.log-row:hover{background:var(--bg2);}
.log-row:last-child{border-bottom:none;}

/* Tab */
.tab{padding:8px 16px;border:none;background:none;
  font-family:'Space Grotesk',sans-serif;font-size:13px;font-weight:600;
  color:var(--text3);cursor:pointer;transition:all .18s;
  border-bottom:2px solid transparent;}
.tab.active{color:var(--wa);border-bottom-color:var(--wa);}
.tab:hover:not(.active){color:var(--text2);}

/* Search */
.search-wrap{display:flex;align-items:center;gap:8px;
  background:var(--bg2);border:1.5px solid var(--border2);
  border-radius:var(--r-lg);padding:9px 14px;
  transition:border-color .18s;}
.search-wrap:focus-within{border-color:var(--wa);}
.search-inp{border:none;outline:none;background:transparent;flex:1;
  font-family:'Space Grotesk',sans-serif;font-size:13px;color:var(--text);}
.search-inp::placeholder{color:var(--text3);}

/* Modal */
.modal-bg{position:fixed;inset:0;z-index:200;background:rgba(0,0,0,.7);
  backdrop-filter:blur(6px);display:flex;align-items:center;
  justify-content:center;padding:20px;animation:fadeIn .2s ease;}
.modal{background:var(--bg2);border:1px solid var(--border2);
  border-radius:var(--r-xl);max-width:560px;width:100%;
  max-height:90vh;overflow-y:auto;
  box-shadow:0 32px 80px rgba(0,0,0,.5);animation:fadeUp .3s cubic-bezier(.22,1,.36,1);}

/* Phone mockup */
.phone-frame{
  background:var(--bg3);border:2px solid var(--border2);
  border-radius:24px;overflow:hidden;
  box-shadow:0 24px 60px rgba(0,0,0,.4);
}
.phone-status{background:#0a0f14;padding:10px 16px;
  display:flex;justify-content:space-between;align-items:center;}
.wa-header{background:#1f2c34;padding:12px 16px;
  display:flex;align-items:center;gap:10px;}

/* Progress bar */
.prog-bar{height:4px;border-radius:2px;background:var(--border2);overflow:hidden;}
.prog-fill{height:100%;border-radius:2px;transition:width .8s cubic-bezier(.4,0,.2,1);}

/* Switch */
.switch{width:40px;height:22px;border-radius:11px;position:relative;
  cursor:pointer;transition:background .2s;flex-shrink:0;}
.switch.on{background:var(--wa);}
.switch.off{background:var(--border2);}
.switch-thumb{position:absolute;top:3px;width:16px;height:16px;
  border-radius:50%;background:white;transition:left .2s;
  box-shadow:0 1px 3px rgba(0,0,0,.3);}
.switch.on .switch-thumb{left:21px;}
.switch.off .switch-thumb{left:3px;}
`;

/* ═══════════════════════════════════════════════
   MOCK DATA
═══════════════════════════════════════════════ */
const TEMPLATES = [
  {
    id:"otp_login",
    name:"OTP — Login / Register",
    channel:"whatsapp",
    category:"Authentication",
    trigger:"Auto",
    status:"approved",
    dlt_id:"1007164452381902",
    variables:["{{otp}}","{{expiry_mins}}"],
    body:`Your SlimRx verification code is *{{otp}}*. Valid for {{expiry_mins}} minutes. Do not share this OTP with anyone.\n\n_SlimRx Health Platform_`,
    stats:{ sent:47821, delivered:47690, read:46103, failed:131 },
    lastUsed:"2 mins ago",
  },
  {
    id:"booking_confirm",
    name:"Booking Confirmation",
    channel:"whatsapp",
    category:"Consultation",
    trigger:"On booking",
    status:"approved",
    dlt_id:"1007164452381903",
    variables:["{{patient_name}}","{{doctor_name}}","{{date}}","{{time}}","{{mode}}","{{booking_ref}}"],
    body:`Hello *{{patient_name}}* 👋\n\nYour consultation has been confirmed!\n\n🩺 *Doctor:* {{doctor_name}}\n📅 *Date:* {{date}}\n🕐 *Time:* {{time}}\n📱 *Mode:* {{mode}}\n🔖 *Ref:* {{booking_ref}}\n\nWe'll send a reminder 30 minutes before.\n\nNeed to reschedule? Reply *RESCHEDULE*`,
    stats:{ sent:23410, delivered:23389, read:22891, failed:21 },
    lastUsed:"5 mins ago",
  },
  {
    id:"consultation_reminder",
    name:"Consultation Reminder (30 min)",
    channel:"whatsapp",
    category:"Consultation",
    trigger:"30 min before",
    status:"approved",
    dlt_id:"1007164452381904",
    variables:["{{patient_name}}","{{doctor_name}}","{{time}}","{{join_link}}"],
    body:`⏰ *Reminder!* Your consultation starts in 30 minutes.\n\n👩‍⚕️ *{{doctor_name}}*\n🕐 *{{time}}*\n\n🔗 *Join here:* {{join_link}}\n\nPlease be ready 5 minutes early with a stable internet connection.`,
    stats:{ sent:22100, delivered:22089, read:21876, failed:11 },
    lastUsed:"28 mins ago",
  },
  {
    id:"prescription_issued",
    name:"Prescription Issued",
    channel:"whatsapp",
    category:"Prescription",
    trigger:"After consultation",
    status:"approved",
    dlt_id:"1007164452381905",
    variables:["{{patient_name}}","{{medication}}","{{dose}}","{{rx_number}}","{{valid_until}}"],
    body:`✅ *Prescription Ready!*\n\nHello {{patient_name}},\n\nYour prescription has been issued:\n\n💊 *Medication:* {{medication}}\n📋 *Dose:* {{dose}}\n🔖 *Rx ID:* {{rx_number}}\n📅 *Valid until:* {{valid_until}}\n\nYour medication will be dispatched shortly. Track your order in the SlimRx app.\n\nQuestions? Reply *HELP*`,
    stats:{ sent:18920, delivered:18910, read:18654, failed:10 },
    lastUsed:"1 hour ago",
  },
  {
    id:"order_dispatched",
    name:"Order Dispatched",
    channel:"whatsapp",
    category:"Delivery",
    trigger:"On dispatch",
    status:"approved",
    dlt_id:"1007164452381906",
    variables:["{{patient_name}}","{{medication}}","{{tracking_number}}","{{courier}}","{{eta}}"],
    body:`🚚 *Your medication is on its way!*\n\n📦 *{{medication}}*\n🏷️ *Tracking:* {{tracking_number}}\n🚛 *Courier:* {{courier}}\n⏱️ *Expected delivery:* {{eta}}\n\nYour medication is shipped in temperature-controlled packaging to maintain efficacy.\n\nTrack: https://track.slimrx.in/{{tracking_number}}`,
    stats:{ sent:17200, delivered:17188, read:16943, failed:12 },
    lastUsed:"2 hours ago",
  },
  {
    id:"refill_reminder",
    name:"Refill Reminder (7 days)",
    channel:"whatsapp",
    category:"Subscription",
    trigger:"7 days before",
    status:"approved",
    dlt_id:"1007164452381907",
    variables:["{{patient_name}}","{{medication}}","{{days_left}}","{{refill_link}}"],
    body:`💊 *Time to refill your medication!*\n\nHello {{patient_name}},\n\nYou have *{{days_left}} days* of {{medication}} remaining.\n\nOrder now to avoid interruption in your treatment:\n🔗 {{refill_link}}\n\nStay consistent for best results! 💪\n\nReply *SKIP* to skip this month.`,
    stats:{ sent:15600, delivered:15589, read:14901, failed:11 },
    lastUsed:"3 hours ago",
  },
  {
    id:"payment_success",
    name:"Payment Confirmation",
    channel:"whatsapp",
    category:"Payment",
    trigger:"On payment",
    status:"approved",
    dlt_id:"1007164452381908",
    variables:["{{patient_name}}","{{amount}}","{{description}}","{{txn_id}}"],
    body:`✅ *Payment Successful!*\n\nHi {{patient_name}},\n\n₹{{amount}} received for {{description}}.\n\n📄 *Transaction ID:* {{txn_id}}\n\nYour invoice will be emailed to you.\n\nThank you for choosing SlimRx! 🌿`,
    stats:{ sent:31000, delivered:30978, read:29801, failed:22 },
    lastUsed:"4 mins ago",
  },
  {
    id:"weight_milestone",
    name:"Weight Loss Milestone",
    channel:"whatsapp",
    category:"Engagement",
    trigger:"On milestone",
    status:"approved",
    dlt_id:"1007164452381909",
    variables:["{{patient_name}}","{{kg_lost}}","{{milestone}}","{{streak_days}}"],
    body:`🎉 *Congratulations {{patient_name}}!*\n\nYou've reached a milestone:\n\n⚖️ *{{kg_lost}} kg lost!*\n🏆 *{{milestone}}*\n🔥 *{{streak_days}} day streak!*\n\nYour dedication is incredible! Keep going — your goal weight is within reach! 💪\n\nLog your next weigh-in: https://app.slimrx.in/log`,
    stats:{ sent:8900, delivered:8894, read:8867, failed:6 },
    lastUsed:"1 day ago",
  },
];

const LOGS = [
  { id:"L001", recipient:"Priya Mehta",    phone:"+91 98765 43210", channel:"whatsapp", template:"OTP — Login",          status:"read",      time:"2 min ago",   icon:"🔐" },
  { id:"L002", recipient:"Rajesh Kumar",   phone:"+91 87654 32109", channel:"whatsapp", template:"Booking Confirmation", status:"delivered", time:"5 min ago",   icon:"📅" },
  { id:"L003", recipient:"Ananya Reddy",   phone:"+91 76543 21098", channel:"sms",      template:"OTP — Register",       status:"read",      time:"8 min ago",   icon:"🔐" },
  { id:"L004", recipient:"Suresh Pillai",  phone:"+91 65432 10987", channel:"whatsapp", template:"Consultation Reminder",status:"read",      time:"28 min ago",  icon:"⏰" },
  { id:"L005", recipient:"Meera Joshi",    phone:"+91 54321 09876", channel:"whatsapp", template:"Prescription Issued",  status:"read",      time:"1 hr ago",    icon:"💊" },
  { id:"L006", recipient:"Arjun Nair",     phone:"+91 43210 98765", channel:"whatsapp", template:"Order Dispatched",     status:"delivered", time:"2 hr ago",    icon:"🚚" },
  { id:"L007", recipient:"Divya Sharma",   phone:"+91 32109 87654", channel:"whatsapp", template:"Refill Reminder",      status:"failed",    time:"3 hr ago",    icon:"💊" },
  { id:"L008", recipient:"Kiran Patel",    phone:"+91 21098 76543", channel:"whatsapp", template:"Payment Confirmation", status:"read",      time:"4 hr ago",    icon:"💳" },
  { id:"L009", recipient:"Priya Mehta",    phone:"+91 98765 43210", channel:"email",    template:"Monthly Report",       status:"delivered", time:"5 hr ago",    icon:"📊" },
  { id:"L010", recipient:"Vikram Singh",   phone:"+91 90123 45678", channel:"sms",      template:"OTP — Login",          status:"read",      time:"6 hr ago",    icon:"🔐" },
  { id:"L011", recipient:"Nisha Gupta",    phone:"+91 89012 34567", channel:"whatsapp", template:"Weight Milestone",     status:"read",      time:"1 day ago",   icon:"🎉" },
  { id:"L012", recipient:"Ravi Shankar",   phone:"+91 78901 23456", channel:"whatsapp", template:"Booking Confirmation", status:"failed",    time:"1 day ago",   icon:"📅" },
];

const STATS_DATA = {
  today:    { sent:1284, delivered:1271, read:1198, failed:13, deliveryRate:99.0, readRate:94.1 },
  week:     { sent:9821, delivered:9756, read:9201, failed:65, deliveryRate:99.3, readRate:94.3 },
  month:    { sent:47821, delivered:47690, read:46103, failed:131, deliveryRate:99.7, readRate:96.7 },
  allTime:  { sent:312400, delivered:311200, read:298700, failed:1200, deliveryRate:99.6, readRate:96.0 },
};

const CHANNEL_BREAKDOWN = [
  { ch:"WhatsApp", icon:"💬", color:"var(--wa)",    pct:72, sent:"22,400" },
  { ch:"SMS",      icon:"📱", color:"var(--sms)",   pct:18, sent:"5,600"  },
  { ch:"Email",    icon:"📧", color:"var(--email)", pct:8,  sent:"2,500"  },
  { ch:"Push",     icon:"🔔", color:"var(--push)",  pct:2,  sent:"621"    },
];

/* ═══════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════ */
function StatusBadge({ status }) {
  const cfg = {
    approved:  { cls:"ch-wa",    label:"Approved" },
    pending:   { cls:"ch-email", label:"Pending" },
    rejected:  { cls:"ch-sms",   label:"Rejected" },
  };
  const c = cfg[status] || cfg.pending;
  return <span className={`ch-badge ${c.cls}`}>{c.label}</span>;
}

function ChannelBadge({ channel }) {
  const cfg = {
    whatsapp: { cls:"ch-wa",    icon:"💬", label:"WhatsApp" },
    sms:      { cls:"ch-sms",   icon:"📱", label:"SMS" },
    email:    { cls:"ch-email", icon:"📧", label:"Email" },
    push:     { cls:"ch-push",  icon:"🔔", label:"Push" },
  };
  const c = cfg[channel] || cfg.whatsapp;
  return <span className={`ch-badge ${c.cls}`}>{c.icon} {c.label}</span>;
}

function DeliveryStatus({ status }) {
  const cfg = {
    sent:      { cls:"s-sent",      label:"Sent",      icon:"✓" },
    delivered: { cls:"s-delivered", label:"Delivered", icon:"✓✓" },
    read:      { cls:"s-read",      label:"Read",      icon:"✓✓" },
    failed:    { cls:"s-failed",    label:"Failed",    icon:"✗" },
    pending:   { cls:"s-pending",   label:"Pending",   icon:"…" },
  };
  const c = cfg[status] || cfg.pending;
  return (
    <div style={{ display:"flex", alignItems:"center", gap:5 }}>
      <div className={`s-dot ${c.cls}`} />
      <span style={{ fontSize:12, fontWeight:600,
        color: status === "read" ? "var(--wa)" :
               status === "delivered" ? "var(--sms)" :
               status === "failed" ? "var(--red)" :
               status === "pending" ? "var(--amber)" : "var(--text3)" }}>
        {c.label}
      </span>
    </div>
  );
}

function Switch({ on, onToggle }) {
  return (
    <div className={`switch ${on ? "on" : "off"}`} onClick={onToggle}>
      <div className="switch-thumb" />
    </div>
  );
}

function Spinner({ size=16, color="var(--wa)" }) {
  return <div style={{ width:size, height:size, borderRadius:"50%",
    border:`2px solid rgba(37,211,102,.2)`, borderTopColor:color,
    animation:"spin .7s linear infinite" }} />;
}

/* ═══════════════════════════════════════════════
   PHONE PREVIEW COMPONENT
═══════════════════════════════════════════════ */
function PhonePreview({ template }) {
  const fillTemplate = (body) => {
    return body
      .replace("{{patient_name}}", "Priya")
      .replace("{{doctor_name}}", "Dr. Kavitha Rajan")
      .replace("{{date}}", "Jun 2, 2025")
      .replace("{{time}}", "11:00 AM")
      .replace("{{mode}}", "Video Call")
      .replace("{{booking_ref}}", "SRX-A1B2C3")
      .replace("{{otp}}", "482910")
      .replace("{{expiry_mins}}", "10")
      .replace("{{medication}}", "SemaSlim™ 7mg")
      .replace("{{dose}}", "7mg once daily")
      .replace("{{rx_number}}", "RX-2025-0312")
      .replace("{{valid_until}}", "Jul 31, 2025")
      .replace("{{tracking_number}}", "DTDC-4472891923")
      .replace("{{courier}}", "DTDC")
      .replace("{{eta}}", "May 27, by 6 PM")
      .replace("{{days_left}}", "7")
      .replace("{{refill_link}}", "slimrx.in/refill")
      .replace("{{join_link}}", "meet.slimrx.in/abc123")
      .replace("{{amount}}", "1,299")
      .replace("{{description}}", "SemaSlim™ subscription")
      .replace("{{txn_id}}", "pay_ABC123XYZ")
      .replace("{{kg_lost}}", "12.2")
      .replace("{{milestone}}", "10kg Champion 🏆")
      .replace("{{streak_days}}", "104");
  };

  const lines = fillTemplate(template.body).split("\n");

  const renderLine = (line) => {
    return line
      .replace(/\*(.*?)\*/g, '<strong>$1</strong>')
      .replace(/_(.*?)_/g, '<em>$1</em>');
  };

  return (
    <div className="phone-frame" style={{ width:280 }}>
      {/* Status bar */}
      <div className="phone-status">
        <span style={{ fontSize:11, color:"var(--text3)" }}>9:41</span>
        <span style={{ fontSize:11, color:"var(--text3)" }}>●●● WiFi 🔋</span>
      </div>

      {/* WA header */}
      <div className="wa-header">
        <div style={{ width:36, height:36, borderRadius:"50%",
          background:"var(--wa3)", display:"flex", alignItems:"center",
          justifyContent:"center", fontSize:18 }}>🌿</div>
        <div>
          <div style={{ fontSize:13.5, fontWeight:700, color:"var(--text)" }}>SlimRx</div>
          <div style={{ fontSize:11, color:"var(--wa)" }}>
            <span style={{ animation:"blink 2s ease infinite" }}>●</span> Online
          </div>
        </div>
      </div>

      {/* Chat area */}
      <div style={{
        background:"#0b141a",
        backgroundImage:"url(\"data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23182028' fill-opacity='0.4'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10s-10-4.477-10-10 4.477-10 10-10zM10 10c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 25.523 0 20s4.477-10 10-10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
        padding:"12px",
        minHeight:320,
        display:"flex",
        flexDirection:"column",
        justifyContent:"flex-end",
        gap:8,
      }}>
        {/* Time stamp */}
        <div style={{ textAlign:"center", marginBottom:4 }}>
          <span style={{
            background:"rgba(255,255,255,.08)", padding:"3px 10px",
            borderRadius:100, fontSize:10, color:"var(--text3)",
          }}>TODAY</span>
        </div>

        {/* Message bubble */}
        <div style={{ display:"flex", justifyContent:"flex-end" }}>
          <div className="wa-bubble msg" style={{ position:"relative" }}>
            <div className="wa-tail-sent" />
            {lines.map((line, i) => (
              line === "" ? <br key={i} /> :
              <div key={i} dangerouslySetInnerHTML={{ __html: renderLine(line) }} />
            ))}
            <div className="wa-time">
              <span>Now</span>
              <CheckCheck size={14} color="var(--wa)" />
            </div>
          </div>
        </div>
      </div>

      {/* Input bar */}
      <div style={{
        background:"#1f2c34", padding:"8px 10px",
        display:"flex", gap:8, alignItems:"center",
      }}>
        <div style={{
          flex:1, background:"#2a3942", borderRadius:20,
          padding:"8px 14px", fontSize:12, color:"var(--text3)",
        }}>Message</div>
        <div style={{
          width:36, height:36, borderRadius:"50%",
          background:"var(--wa)", display:"flex", alignItems:"center", justifyContent:"center",
          cursor:"pointer",
        }}>
          <Send size={15} color="white" />
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   SEND TEST MODAL
═══════════════════════════════════════════════ */
function SendTestModal({ template, onClose }) {
  const [phone, setPhone] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (!phone || phone.length < 10) return;
    setSending(true);
    setTimeout(() => { setSending(false); setSent(true); }, 1800);
  };

  return (
    <div className="modal-bg" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal" style={{ padding:"28px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
          <h3 style={{ fontSize:18, fontWeight:700 }}>Send Test Message</h3>
          <button onClick={onClose} style={{ background:"none", border:"none",
            cursor:"pointer", width:28, height:28, borderRadius:"50%",
            background:"var(--bg3)", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <X size={14} color="var(--text2)" />
          </button>
        </div>

        {!sent ? (
          <>
            <div style={{
              background:"var(--wa-s)", border:"1px solid rgba(37,211,102,.2)",
              borderRadius:"var(--r-lg)", padding:"12px 16px", marginBottom:20,
              fontSize:13, color:"var(--wa)",
            }}>
              <strong>{template.name}</strong> · {template.dlt_id}
            </div>

            <div style={{ marginBottom:16 }}>
              <label style={{ display:"block", fontSize:12, fontWeight:700,
                color:"var(--text2)", marginBottom:6, letterSpacing:".04em" }}>
                TEST PHONE NUMBER
              </label>
              <div style={{ display:"flex", border:"1.5px solid var(--border2)",
                borderRadius:"var(--r-lg)", overflow:"hidden" }}>
                <div style={{ padding:"10px 12px", background:"var(--bg3)",
                  borderRight:"1px solid var(--border2)", fontSize:13,
                  fontWeight:700, color:"var(--text2)", flexShrink:0 }}>🇮🇳 +91</div>
                <input className="inp" placeholder="98765 43210"
                  value={phone} onChange={e => setPhone(e.target.value.replace(/\D/g,"").slice(0,10))}
                  style={{ border:"none", borderRadius:0, flex:1 }} />
              </div>
            </div>

            <div style={{ fontSize:12, color:"var(--text3)", marginBottom:20, lineHeight:1.6 }}>
              This will send a real WhatsApp message to the number above using your MSG91 credentials.
              Variable placeholders will be filled with sample data.
            </div>

            <div style={{ display:"flex", gap:10 }}>
              <button className="btn btn-outline" style={{ flex:1 }} onClick={onClose}>Cancel</button>
              <button className="btn btn-wa" style={{ flex:2 }}
                disabled={phone.length < 10 || sending}
                onClick={handleSend}>
                {sending ? <><Spinner size={14} color="black" /> Sending…</> : <><Send size={14} /> Send Test</>}
              </button>
            </div>
          </>
        ) : (
          <div className="fi" style={{ textAlign:"center", padding:"20px 0" }}>
            <div style={{ fontSize:48, marginBottom:12 }}>✅</div>
            <h3 style={{ fontSize:18, fontWeight:700, marginBottom:8 }}>Test Sent!</h3>
            <p style={{ fontSize:13.5, color:"var(--text2)", marginBottom:20 }}>
              WhatsApp message sent to +91 {phone}. Check your phone.
            </p>
            <button className="btn btn-outline" onClick={onClose} style={{ width:"100%", justifyContent:"center" }}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   PAGE: DASHBOARD
═══════════════════════════════════════════════ */
function PageDashboard() {
  const [period, setPeriod] = useState("today");
  const stats = STATS_DATA[period];

  return (
    <div style={{ padding:"24px", overflowY:"auto", height:"100%" }}>
      {/* Header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:24 }}>
        <div>
          <h2 style={{ fontSize:22, fontWeight:800, color:"var(--text)", marginBottom:4 }}>
            Notification Dashboard
          </h2>
          <p style={{ fontSize:13, color:"var(--text3)" }}>
            MSG91 · WhatsApp Business API · DLT Registered
          </p>
        </div>
        <div style={{ display:"flex", gap:8 }}>
          {["today","week","month","allTime"].map(p => (
            <button key={p} className={`btn btn-sm ${period===p?"btn-wa":"btn-ghost"}`}
              onClick={() => setPeriod(p)}
              style={{ color: period===p ? "#000" : undefined }}>
              {p === "allTime" ? "All Time" : p.charAt(0).toUpperCase()+p.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Stats grid */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:14, marginBottom:24 }}>
        {[
          { label:"Messages Sent",    value:stats.sent.toLocaleString("en-IN"),      color:"var(--text)",  icon:Send,         delta:+12 },
          { label:"Delivered",        value:stats.delivered.toLocaleString("en-IN"), color:"var(--sms)",   icon:CheckCheck,   delta:+2  },
          { label:"Read / Opened",    value:stats.read.toLocaleString("en-IN"),      color:"var(--wa)",    icon:Eye,          delta:+5  },
          { label:"Failed",           value:stats.failed.toLocaleString("en-IN"),    color:"var(--red)",   icon:XCircle,      delta:-18 },
          { label:"Delivery Rate",    value:`${stats.deliveryRate}%`,                color:"var(--wa)",    icon:TrendingUp,   delta:null },
          { label:"Read Rate",        value:`${stats.readRate}%`,                    color:"var(--email)", icon:BarChart2,    delta:null },
        ].map(({ label, value, color, icon:Icon, delta }, i) => (
          <div key={label} className={`stat fu d${Math.min(i+1,6)}`} style={{ position:"relative" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
              <div style={{ width:32, height:32, borderRadius:10,
                background:`${color}18`, display:"flex", alignItems:"center", justifyContent:"center" }}>
                <Icon size={15} color={color} />
              </div>
              {delta !== null && (
                <div style={{ display:"flex", alignItems:"center", gap:2, fontSize:11, fontWeight:700,
                  color: delta > 0 ? "var(--wa)" : "var(--red)" }}>
                  {delta > 0 ? <ArrowUpRight size={12}/> : <ArrowDownRight size={12}/>}
                  {Math.abs(delta)}%
                </div>
              )}
            </div>
            <div style={{ fontSize:24, fontWeight:800, color, lineHeight:1, marginBottom:3 }}>{value}</div>
            <div style={{ fontSize:12, color:"var(--text3)", fontWeight:500 }}>{label}</div>
          </div>
        ))}
      </div>

      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20, marginBottom:20 }}>
        {/* Channel breakdown */}
        <div style={{ background:"var(--bg2)", border:"1px solid var(--border2)",
          borderRadius:"var(--r-xl)", padding:"20px" }}>
          <h3 style={{ fontSize:15, fontWeight:700, marginBottom:16 }}>Channel Breakdown</h3>
          {CHANNEL_BREAKDOWN.map(ch => (
            <div key={ch.ch} style={{ marginBottom:14 }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                  <span>{ch.icon}</span>
                  <span style={{ fontSize:13, fontWeight:600 }}>{ch.ch}</span>
                </div>
                <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                  <span style={{ fontSize:12, color:"var(--text3)" }}>{ch.sent}</span>
                  <span style={{ fontSize:13, fontWeight:700, color:ch.color }}>{ch.pct}%</span>
                </div>
              </div>
              <div className="prog-bar">
                <div className="prog-fill" style={{ width:`${ch.pct}%`, background:ch.color }} />
              </div>
            </div>
          ))}
        </div>

        {/* Recent activity */}
        <div style={{ background:"var(--bg2)", border:"1px solid var(--border2)",
          borderRadius:"var(--r-xl)", overflow:"hidden" }}>
          <div style={{ padding:"16px 20px 0" }}>
            <h3 style={{ fontSize:15, fontWeight:700, marginBottom:12 }}>Recent Activity</h3>
          </div>
          {LOGS.slice(0, 6).map(log => (
            <div key={log.id} className="log-row">
              <span style={{ fontSize:18, flexShrink:0 }}>{log.icon}</span>
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:13, fontWeight:600, color:"var(--text)",
                  whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>
                  {log.recipient}
                </div>
                <div style={{ fontSize:11, color:"var(--text3)", marginTop:1 }}>
                  {log.template}
                </div>
              </div>
              <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:3 }}>
                <DeliveryStatus status={log.status} />
                <span style={{ fontSize:10, color:"var(--text3)" }}>{log.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Template performance */}
      <div style={{ background:"var(--bg2)", border:"1px solid var(--border2)",
        borderRadius:"var(--r-xl)", overflow:"hidden" }}>
        <div style={{ padding:"16px 20px", borderBottom:"1px solid var(--border2)" }}>
          <h3 style={{ fontSize:15, fontWeight:700 }}>Template Performance</h3>
        </div>
        <table style={{ width:"100%", borderCollapse:"collapse" }}>
          <thead>
            <tr style={{ background:"var(--bg3)" }}>
              {["Template","Channel","Sent","Delivered","Read","Delivery Rate","Read Rate"].map(h => (
                <th key={h} style={{ padding:"10px 16px", textAlign:"left", fontSize:10,
                  fontWeight:700, color:"var(--text3)", letterSpacing:".08em",
                  borderBottom:"1px solid var(--border2)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TEMPLATES.slice(0,5).map((t, i) => {
              const dr = ((t.stats.delivered / t.stats.sent)*100).toFixed(1);
              const rr = ((t.stats.read / t.stats.sent)*100).toFixed(1);
              return (
                <tr key={t.id} style={{ borderBottom:"1px solid var(--border)",
                  background: i%2===0 ? "transparent" : "rgba(255,255,255,.01)" }}>
                  <td style={{ padding:"11px 16px", fontSize:13, fontWeight:600, color:"var(--text)" }}>
                    {t.name}
                  </td>
                  <td style={{ padding:"11px 16px" }}><ChannelBadge channel={t.channel} /></td>
                  <td style={{ padding:"11px 16px", fontSize:13, color:"var(--text2)" }}>
                    {t.stats.sent.toLocaleString("en-IN")}
                  </td>
                  <td style={{ padding:"11px 16px", fontSize:13, color:"var(--sms)" }}>
                    {t.stats.delivered.toLocaleString("en-IN")}
                  </td>
                  <td style={{ padding:"11px 16px", fontSize:13, color:"var(--wa)" }}>
                    {t.stats.read.toLocaleString("en-IN")}
                  </td>
                  <td style={{ padding:"11px 16px" }}>
                    <span style={{ fontSize:13, fontWeight:700,
                      color: parseFloat(dr) > 99 ? "var(--wa)" : "var(--email)" }}>{dr}%</span>
                  </td>
                  <td style={{ padding:"11px 16px" }}>
                    <span style={{ fontSize:13, fontWeight:700,
                      color: parseFloat(rr) > 95 ? "var(--wa)" : "var(--text2)" }}>{rr}%</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   PAGE: TEMPLATES
═══════════════════════════════════════════════ */
function PageTemplates() {
  const [selected, setSelected] = useState(TEMPLATES[0]);
  const [testModal, setTestModal] = useState(null);
  const [search, setSearch] = useState("");

  const filtered = TEMPLATES.filter(t =>
    t.name.toLowerCase().includes(search.toLowerCase()) ||
    t.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display:"flex", height:"100%", overflow:"hidden" }}>
      {/* Template list */}
      <div style={{ width:320, flexShrink:0, borderRight:"1px solid var(--border2)",
        display:"flex", flexDirection:"column", overflow:"hidden" }}>
        <div style={{ padding:"16px", borderBottom:"1px solid var(--border2)", flexShrink:0 }}>
          <div className="search-wrap">
            <Search size={14} color="var(--text3)" />
            <input className="search-inp" placeholder="Search templates…"
              value={search} onChange={e => setSearch(e.target.value)} />
          </div>
        </div>
        <div style={{ flex:1, overflowY:"auto", padding:"12px" }}>
          {filtered.map(t => (
            <div key={t.id} className={`tmpl-card ${selected?.id===t.id?"active":""}`}
              onClick={() => setSelected(t)} style={{ marginBottom:8 }}>
              <div style={{ display:"flex", justifyContent:"space-between",
                alignItems:"flex-start", marginBottom:6 }}>
                <div style={{ fontSize:13.5, fontWeight:700, color:"var(--text)",
                  lineHeight:1.3, flex:1, marginRight:8 }}>{t.name}</div>
                <StatusBadge status={t.status} />
              </div>
              <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                <ChannelBadge channel={t.channel} />
                <span className="ch-badge" style={{ background:"var(--bg3)",
                  color:"var(--text3)", border:"1px solid var(--border2)" }}>
                  {t.category}
                </span>
              </div>
              <div style={{ fontSize:11, color:"var(--text3)", marginTop:6 }}>
                Last used: {t.lastUsed}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Template detail */}
      {selected && (
        <div style={{ flex:1, overflowY:"auto", padding:"24px" }}>
          <div style={{ display:"flex", justifyContent:"space-between",
            alignItems:"flex-start", marginBottom:20, flexWrap:"wrap", gap:10 }}>
            <div>
              <h2 style={{ fontSize:20, fontWeight:800, color:"var(--text)", marginBottom:4 }}>
                {selected.name}
              </h2>
              <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                <ChannelBadge channel={selected.channel} />
                <StatusBadge status={selected.status} />
                <span className="ch-badge" style={{ background:"var(--bg3)",
                  color:"var(--text3)" }}>{selected.category}</span>
              </div>
            </div>
            <div style={{ display:"flex", gap:8 }}>
              <button className="btn btn-ghost btn-sm"
                onClick={() => navigator.clipboard?.writeText(selected.body)}>
                <Copy size={13} /> Copy
              </button>
              <button className="btn btn-outline btn-sm">
                <Edit3 size={13} /> Edit
              </button>
              <button className="btn btn-wa btn-sm"
                onClick={() => setTestModal(selected)}>
                <Send size={13} /> Test Send
              </button>
            </div>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
            {/* Left: details */}
            <div>
              {/* DLT info */}
              <div style={{ background:"var(--bg2)", border:"1px solid var(--border2)",
                borderRadius:"var(--r-lg)", padding:"16px", marginBottom:16 }}>
                <div style={{ fontSize:10, fontWeight:700, color:"var(--text3)",
                  letterSpacing:".1em", marginBottom:10 }}>DLT REGISTRATION</div>
                {[
                  { l:"DLT Template ID", v:selected.dlt_id },
                  { l:"Trigger",         v:selected.trigger },
                  { l:"Category",        v:selected.category },
                  { l:"Status",          v:selected.status },
                ].map(({ l, v }) => (
                  <div key={l} style={{ display:"flex", justifyContent:"space-between",
                    padding:"7px 0", borderBottom:"1px solid var(--border2)",
                    fontSize:13 }}>
                    <span style={{ color:"var(--text3)" }}>{l}</span>
                    <span style={{ fontWeight:600, color:"var(--text)" }} className="mono">{v}</span>
                  </div>
                ))}
              </div>

              {/* Variables */}
              <div style={{ background:"var(--bg2)", border:"1px solid var(--border2)",
                borderRadius:"var(--r-lg)", padding:"16px", marginBottom:16 }}>
                <div style={{ fontSize:10, fontWeight:700, color:"var(--text3)",
                  letterSpacing:".1em", marginBottom:10 }}>TEMPLATE VARIABLES</div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                  {selected.variables.map(v => (
                    <span key={v} className="mono" style={{
                      background:"rgba(139,92,246,.12)", color:"var(--push)",
                      border:"1px solid rgba(139,92,246,.2)",
                      padding:"4px 10px", borderRadius:6, fontSize:12,
                    }}>{v}</span>
                  ))}
                </div>
              </div>

              {/* Template body */}
              <div style={{ background:"var(--bg2)", border:"1px solid var(--border2)",
                borderRadius:"var(--r-lg)", padding:"16px" }}>
                <div style={{ fontSize:10, fontWeight:700, color:"var(--text3)",
                  letterSpacing:".1em", marginBottom:10 }}>TEMPLATE BODY</div>
                <div className="mono" style={{
                  fontSize:12.5, color:"var(--text2)", lineHeight:1.7,
                  whiteSpace:"pre-wrap", background:"var(--bg3)",
                  padding:"12px", borderRadius:"var(--r)",
                }}>
                  {selected.body}
                </div>
              </div>

              {/* Stats */}
              <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10, marginTop:16 }}>
                {[
                  { l:"Sent",      v:selected.stats.sent.toLocaleString("en-IN"),      c:"var(--text)" },
                  { l:"Delivered", v:selected.stats.delivered.toLocaleString("en-IN"), c:"var(--sms)" },
                  { l:"Read",      v:selected.stats.read.toLocaleString("en-IN"),      c:"var(--wa)" },
                  { l:"Failed",    v:selected.stats.failed.toLocaleString("en-IN"),    c:"var(--red)" },
                ].map(({ l, v, c }) => (
                  <div key={l} style={{ background:"var(--bg2)", border:"1px solid var(--border2)",
                    borderRadius:"var(--r)", padding:"10px", textAlign:"center" }}>
                    <div style={{ fontSize:17, fontWeight:800, color:c, lineHeight:1, marginBottom:2 }}>{v}</div>
                    <div style={{ fontSize:10, color:"var(--text3)" }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: phone preview */}
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:12 }}>
              <div style={{ fontSize:11, fontWeight:700, color:"var(--text3)",
                letterSpacing:".1em", alignSelf:"flex-start" }}>LIVE PREVIEW</div>
              <PhonePreview template={selected} />
              <div style={{ fontSize:11, color:"var(--text3)", textAlign:"center" }}>
                Preview with sample data · Actual message may vary
              </div>
            </div>
          </div>
        </div>
      )}

      {testModal && <SendTestModal template={testModal} onClose={() => setTestModal(null)} />}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   PAGE: DELIVERY LOGS
═══════════════════════════════════════════════ */
function PageLogs() {
  const [search, setSearch] = useState("");
  const [chFilter, setChFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = LOGS.filter(l => {
    const ms = l.recipient.toLowerCase().includes(search.toLowerCase()) ||
               l.template.toLowerCase().includes(search.toLowerCase());
    const mc = chFilter === "all" || l.channel === chFilter;
    const st = statusFilter === "all" || l.status === statusFilter;
    return ms && mc && st;
  });

  return (
    <div style={{ padding:"24px", overflowY:"auto", height:"100%", display:"flex",
      flexDirection:"column", gap:0 }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
        <div>
          <h2 style={{ fontSize:20, fontWeight:800, color:"var(--text)", marginBottom:3 }}>
            Delivery Logs
          </h2>
          <p style={{ fontSize:12.5, color:"var(--text3)" }}>Real-time message delivery tracking</p>
        </div>
        <button className="btn btn-ghost btn-sm"><RefreshCw size={13} /> Refresh</button>
      </div>

      {/* Filters */}
      <div style={{ display:"flex", gap:10, marginBottom:16, flexWrap:"wrap" }}>
        <div className="search-wrap" style={{ flex:1, minWidth:200 }}>
          <Search size={14} color="var(--text3)" />
          <input className="search-inp" placeholder="Search recipient or template…"
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div style={{ display:"flex", gap:6 }}>
          {["all","whatsapp","sms","email"].map(c => (
            <button key={c} className={`btn btn-sm ${chFilter===c?"btn-wa":"btn-ghost"}`}
              onClick={() => setChFilter(c)}
              style={{ color: chFilter===c ? "#000" : undefined, textTransform:"capitalize" }}>
              {c === "all" ? "All Channels" : c === "whatsapp" ? "💬 WA" : c === "sms" ? "📱 SMS" : "📧 Email"}
            </button>
          ))}
        </div>
        <div style={{ display:"flex", gap:6 }}>
          {["all","read","delivered","sent","failed"].map(s => (
            <button key={s} className={`btn btn-xs ${statusFilter===s?"btn-wa":"btn-ghost"}`}
              onClick={() => setStatusFilter(s)}
              style={{ color: statusFilter===s ? "#000" : undefined, textTransform:"capitalize" }}>
              {s === "all" ? "All" : s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={{ background:"var(--bg2)", border:"1px solid var(--border2)",
        borderRadius:"var(--r-xl)", overflow:"hidden", flex:1 }}>
        <table style={{ width:"100%", borderCollapse:"collapse" }}>
          <thead>
            <tr style={{ background:"var(--bg3)" }}>
              {["","RECIPIENT","TEMPLATE","CHANNEL","STATUS","TIME",""].map((h,i) => (
                <th key={i} style={{ padding:"10px 14px", textAlign:"left", fontSize:10,
                  fontWeight:700, color:"var(--text3)", letterSpacing:".08em",
                  borderBottom:"1px solid var(--border2)" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((log, i) => (
              <tr key={log.id} className={`fu d${Math.min(i+1,6)}`}
                style={{ borderBottom:"1px solid var(--border)",
                  background: i%2===0 ? "transparent" : "rgba(255,255,255,.01)" }}>
                <td style={{ padding:"11px 14px", fontSize:18 }}>{log.icon}</td>
                <td style={{ padding:"11px 14px" }}>
                  <div style={{ fontSize:13, fontWeight:700, color:"var(--text)" }}>{log.recipient}</div>
                  <div style={{ fontSize:11, color:"var(--text3)", fontFamily:"monospace" }}>{log.phone}</div>
                </td>
                <td style={{ padding:"11px 14px", fontSize:13, color:"var(--text2)" }}>{log.template}</td>
                <td style={{ padding:"11px 14px" }}><ChannelBadge channel={log.channel} /></td>
                <td style={{ padding:"11px 14px" }}><DeliveryStatus status={log.status} /></td>
                <td style={{ padding:"11px 14px", fontSize:12, color:"var(--text3)" }}>{log.time}</td>
                <td style={{ padding:"11px 14px" }}>
                  <div style={{ display:"flex", gap:5 }}>
                    <button className="btn btn-xs btn-ghost"><Eye size={10} /></button>
                    {log.status === "failed" && (
                      <button className="btn btn-xs btn-outline"
                        style={{ color:"var(--amber)", borderColor:"var(--amber)" }}>
                        <RefreshCw size={10} /> Retry
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   PAGE: SETTINGS
═══════════════════════════════════════════════ */
function PageSettings() {
  const [prefs, setPrefs] = useState({
    otp_wa:true, otp_sms:true,
    booking_wa:true, booking_email:true, booking_sms:false,
    reminder_wa:true, reminder_sms:true,
    prescription_wa:true, prescription_email:true,
    dispatch_wa:true, dispatch_sms:false,
    refill_wa:true, refill_sms:false,
    payment_wa:true, payment_email:true,
    milestone_wa:true, milestone_push:true,
  });

  const toggle = (k) => setPrefs(p => ({ ...p, [k]:!p[k] }));

  const PREF_GROUPS = [
    {
      title:"Authentication",  icon:"🔐",
      items:[
        { k:"otp_wa",  label:"OTP via WhatsApp", ch:"wa" },
        { k:"otp_sms", label:"OTP via SMS (fallback)", ch:"sms" },
      ],
    },
    {
      title:"Consultation Events", icon:"📅",
      items:[
        { k:"booking_wa",    label:"Booking confirmation — WhatsApp", ch:"wa" },
        { k:"booking_email", label:"Booking confirmation — Email",     ch:"email" },
        { k:"booking_sms",   label:"Booking confirmation — SMS",       ch:"sms" },
        { k:"reminder_wa",   label:"30-min reminder — WhatsApp",       ch:"wa" },
        { k:"reminder_sms",  label:"30-min reminder — SMS",            ch:"sms" },
      ],
    },
    {
      title:"Prescription & Orders", icon:"💊",
      items:[
        { k:"prescription_wa",    label:"Prescription issued — WhatsApp", ch:"wa" },
        { k:"prescription_email", label:"Prescription issued — Email",     ch:"email" },
        { k:"dispatch_wa",        label:"Order dispatched — WhatsApp",     ch:"wa" },
        { k:"dispatch_sms",       label:"Order dispatched — SMS",          ch:"sms" },
        { k:"refill_wa",          label:"Refill reminder — WhatsApp",      ch:"wa" },
        { k:"refill_sms",         label:"Refill reminder — SMS",           ch:"sms" },
      ],
    },
    {
      title:"Payments", icon:"💳",
      items:[
        { k:"payment_wa",    label:"Payment confirmed — WhatsApp", ch:"wa" },
        { k:"payment_email", label:"Payment confirmed — Email",     ch:"email" },
      ],
    },
    {
      title:"Engagement", icon:"🎉",
      items:[
        { k:"milestone_wa",   label:"Weight milestone — WhatsApp", ch:"wa" },
        { k:"milestone_push", label:"Weight milestone — Push",      ch:"push" },
      ],
    },
  ];

  const chColor = { wa:"var(--wa)", sms:"var(--sms)", email:"var(--email)", push:"var(--push)" };

  return (
    <div style={{ padding:"24px", overflowY:"auto", height:"100%" }}>
      <h2 style={{ fontSize:20, fontWeight:800, color:"var(--text)", marginBottom:6 }}>
        Notification Settings
      </h2>
      <p style={{ fontSize:13, color:"var(--text3)", marginBottom:24 }}>
        Control which channels are used for each notification event
      </p>

      {/* MSG91 Config */}
      <div style={{ background:"var(--bg2)", border:"1px solid var(--border2)",
        borderRadius:"var(--r-xl)", padding:"20px", marginBottom:20 }}>
        <div style={{ fontSize:11, fontWeight:700, color:"var(--text3)",
          letterSpacing:".1em", marginBottom:14 }}>MSG91 CONFIGURATION</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
          {[
            { l:"API Key",          v:"5a3f7c...8b2e (masked)",    status:"connected" },
            { l:"Sender ID (DLT)",  v:"SLIMRX",                   status:"verified" },
            { l:"WhatsApp Number",  v:"+91 92222 22222",           status:"active" },
            { l:"Monthly SMS Used", v:"47,821 / 100,000",          status:"ok" },
          ].map(({ l, v, status }) => (
            <div key={l} style={{ background:"var(--bg3)", borderRadius:"var(--r)",
              padding:"12px 14px" }}>
              <div style={{ fontSize:11, color:"var(--text3)", marginBottom:3 }}>{l}</div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                <span className="mono" style={{ fontSize:13, color:"var(--text)" }}>{v}</span>
                <span style={{ fontSize:10, fontWeight:700,
                  color: status==="connected"||status==="verified"||status==="active"||status==="ok"
                    ? "var(--wa)" : "var(--red)" }}>
                  ● {status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Notification preferences */}
      {PREF_GROUPS.map(group => (
        <div key={group.title} style={{ background:"var(--bg2)", border:"1px solid var(--border2)",
          borderRadius:"var(--r-xl)", padding:"20px", marginBottom:14 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:14 }}>
            <span style={{ fontSize:18 }}>{group.icon}</span>
            <h3 style={{ fontSize:14, fontWeight:700, color:"var(--text)" }}>{group.title}</h3>
          </div>
          {group.items.map(item => (
            <div key={item.k} style={{
              display:"flex", alignItems:"center", justifyContent:"space-between",
              padding:"10px 0", borderBottom:"1px solid var(--border2)",
            }}>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ width:8, height:8, borderRadius:"50%",
                  background:chColor[item.ch], flexShrink:0 }} />
                <span style={{ fontSize:13.5, color:"var(--text)" }}>{item.label}</span>
              </div>
              <Switch on={prefs[item.k]} onToggle={() => toggle(item.k)} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════
   ROOT APP
═══════════════════════════════════════════════ */
const NAV = [
  { id:"dashboard", label:"Dashboard",  icon:BarChart2 },
  { id:"templates", label:"Templates",  icon:MessageCircle },
  { id:"logs",      label:"Logs",       icon:Activity },
  { id:"settings",  label:"Settings",   icon:Settings },
];

export default function NotificationSystem() {
  const [page, setPage] = useState("dashboard");
  const unread = LOGS.filter(l => l.status === "failed").length;

  return (
    <>
      <style>{CSS}</style>
      <div style={{ display:"flex", height:"100vh", overflow:"hidden" }}>

        {/* Sidebar */}
        <aside style={{
          width:220, flexShrink:0,
          background:"var(--bg2)",
          borderRight:"1px solid var(--border2)",
          padding:"20px 14px",
          display:"flex", flexDirection:"column",
        }}>
          {/* Logo */}
          <div style={{ display:"flex", alignItems:"center", gap:10, padding:"4px 8px", marginBottom:28 }}>
            <div style={{ width:32, height:32, borderRadius:10,
              background:"var(--wa)", display:"flex", alignItems:"center", justifyContent:"center",
              boxShadow:"0 0 0 0 rgba(37,211,102,.4)", animation:"sendPulse 2s ease infinite",
            }}>
              <MessageCircle size={17} color="#000" />
            </div>
            <div>
              <div style={{ fontWeight:800, fontSize:15, color:"var(--text)", lineHeight:1 }}>
                SlimRx
              </div>
              <div style={{ fontSize:9, color:"var(--text3)", letterSpacing:".08em" }}>
                NOTIFICATIONS
              </div>
            </div>
          </div>

          {/* Stats pills */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6, marginBottom:20 }}>
            {[
              { label:"Sent today",  value:"1,284", color:"var(--wa)" },
              { label:"Failed",      value:unread.toString(),   color:"var(--red)" },
            ].map(({ label, value, color }) => (
              <div key={label} style={{
                background:"var(--bg3)", borderRadius:"var(--r)",
                padding:"8px 10px", textAlign:"center",
                border:`1px solid ${color}22`,
              }}>
                <div style={{ fontSize:16, fontWeight:800, color, lineHeight:1 }}>{value}</div>
                <div style={{ fontSize:9, color:"var(--text3)", marginTop:2 }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Nav */}
          <nav style={{ flex:1, display:"flex", flexDirection:"column", gap:3 }}>
            {NAV.map(item => (
              <button key={item.id} className={`snav ${page===item.id?"active":""}`}
                onClick={() => setPage(item.id)}>
                <item.icon size={16} />
                <span style={{ flex:1, textAlign:"left" }}>{item.label}</span>
                {item.id==="logs" && unread > 0 && (
                  <span style={{ background:"var(--red)", color:"white", fontSize:10,
                    fontWeight:800, padding:"1px 6px", borderRadius:100 }}>{unread}</span>
                )}
              </button>
            ))}
          </nav>

          {/* MSG91 status */}
          <div style={{
            background:"var(--wa-s)", borderRadius:"var(--r-lg)", padding:"12px",
            border:"1px solid rgba(37,211,102,.15)", marginTop:12,
          }}>
            <div style={{ display:"flex", gap:7, alignItems:"center", marginBottom:4 }}>
              <span style={{ width:7, height:7, borderRadius:"50%", background:"var(--wa)",
                animation:"pulse 1.5s ease infinite", flexShrink:0 }} />
              <span style={{ fontSize:12, fontWeight:700, color:"var(--wa)" }}>MSG91 Connected</span>
            </div>
            <div style={{ fontSize:11, color:"var(--text3)" }}>
              WhatsApp · SMS · DLT Verified
            </div>
          </div>
        </aside>

        {/* Main */}
        <main style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden" }}>
          {/* Top bar */}
          <div style={{
            background:"var(--bg2)", borderBottom:"1px solid var(--border2)",
            padding:"0 24px", height:52, flexShrink:0,
            display:"flex", alignItems:"center", justifyContent:"space-between",
            boxShadow:"0 1px 4px rgba(0,0,0,.3)",
          }}>
            <div style={{ fontSize:15, fontWeight:700, color:"var(--text)" }}>
              {NAV.find(n => n.id === page)?.label}
            </div>
            <div style={{ display:"flex", gap:10, alignItems:"center" }}>
              <div style={{ display:"flex", alignItems:"center", gap:6,
                fontSize:12, color:"var(--wa)" }}>
                <Zap size={13} />
                <span style={{ fontWeight:600 }}>Real-time delivery tracking active</span>
              </div>
              <button className="btn btn-wa btn-sm">
                <Plus size={13} /> New Template
              </button>
            </div>
          </div>

          {/* Page */}
          <div style={{ flex:1, overflowY:"auto", background:"var(--bg)" }}>
            {page === "dashboard" && <PageDashboard />}
            {page === "templates" && <PageTemplates />}
            {page === "logs"      && <PageLogs />}
            {page === "settings"  && <PageSettings />}
          </div>
        </main>
      </div>
    </>
  );
}
