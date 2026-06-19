import { useState, useEffect } from "react";
import {
  ChevronRight, ChevronLeft, Check, Upload, AlertCircle,
  CheckCircle2, Clock, DollarSign, Calendar, FileText,
  Shield, Phone, Mail, MapPin, Award, Briefcase, X,
  Search, Eye, Download, Trash2, Plus, Calendar as CalendarIcon
} from "lucide-react";

/* ═══════════════════════════════════════════════
   DOCTOR REGISTRATION & ONBOARDING
   4-step flow: Personal → MCI+Fee → Time Slots → Docs
   Fonts: Sohne + JetBrains Mono
═══════════════════════════════════════════════ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Sohne:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
:root{
  --primary:   #0891b2;
  --primary2:  #0e7490;
  --accent:    #06b6d4;
  --bg:        #f0f9ff;
  --bg2:       #ffffff;
  --bg3:       #f8fafc;
  --border:    #cffafe;
  --border2:   #e0f2fe;
  --text:      #164e63;
  --text2:     #0c4a6e;
  --text3:     #475569;
  --green:     #10b981;
  --red:       #ef4444;
  --amber:     #f59e0b;
  --r:         8px;
  --r-lg:      12px;
  --r-xl:      20px;
}
html,body,#root{height:100%;overflow:hidden;}
body{font-family:'Sohne',sans-serif;background:linear-gradient(135deg,var(--bg),#e0f7ff);color:var(--text);-webkit-font-smoothing:antialiased;}
.mono{font-family:'JetBrains Mono',monospace;}

@keyframes fadeUp {from{opacity:0;transform:translateY(12px);}to{opacity:1;transform:translateY(0);}}
@keyframes slideIn {from{opacity:0;transform:translateX(30px);}to{opacity:1;transform:translateX(0);}}
@keyframes pulse {0%,100%{opacity:1;}50%{opacity:.5;}}

.fu {animation:fadeUp .4s cubic-bezier(.22,1,.36,1) both;}
.si {animation:slideIn .4s cubic-bezier(.22,1,.36,1) both;}

::-webkit-scrollbar{width:4px;} ::-webkit-scrollbar-thumb{background:var(--border2);}

/* Progress bar */
.progress-bar{display:flex;gap:8px;margin-bottom:32px;}
.progress-step{flex:1;display:flex;align-items:center;gap:8px;}
.progress-dot{width:36px;height:36px;border-radius:50%;
  display:flex;align-items:center;justify-content:center;
  font-weight:700;font-size:13px;flex-shrink:0;
  transition:all .3s;border:2px solid transparent;}
.progress-dot.active{background:var(--primary);color:white;}
.progress-dot.done{background:var(--green);color:white;}
.progress-dot.pending{background:var(--bg3);color:var(--text3);border-color:var(--border);}
.progress-line{flex:1;height:2px;background:var(--border);border-radius:2px;margin-top:17px;}
.progress-line.active{background:var(--primary);}

/* Form */
.form-group{margin-bottom:22px;}
.label{display:block;font-size:12px;font-weight:700;color:var(--text2);
  letter-spacing:.04em;margin-bottom:8px;text-transform:uppercase;}
.inp{width:100%;padding:11px 14px;border:1.5px solid var(--border2);
  border-radius:var(--r-lg);font-family:'Sohne',sans-serif;
  font-size:14px;color:var(--text);background:var(--bg2);outline:none;
  transition:all .2s;}
.inp:focus{border-color:var(--primary);box-shadow:0 0 0 3px rgba(8,145,178,.1);}
.inp::placeholder{color:var(--text3);}

/* Select */
.select{appearance:none;width:100%;padding:11px 14px;
  border:1.5px solid var(--border2);border-radius:var(--r-lg);
  font-family:'Sohne',sans-serif;font-size:14px;color:var(--text);
  background:var(--bg2) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%23164e63' d='M1 1l5 5 5-5'/%3E%3C/svg%3E") no-repeat right 12px center;
  padding-right:36px;cursor:pointer;outline:none;transition:all .2s;}
.select:focus{border-color:var(--primary);}

/* Btn */
.btn{display:inline-flex;align-items:center;justify-content:center;gap:6px;
  padding:11px 20px;border-radius:var(--r-lg);border:none;
  font-family:'Sohne',sans-serif;font-size:13px;font-weight:700;
  cursor:pointer;transition:all .2s;line-height:1;}
.btn-primary{background:var(--primary);color:white;box-shadow:0 4px 12px rgba(8,145,178,.25);}
.btn-primary:hover{background:var(--primary2);transform:translateY(-1px);}
.btn-ghost{background:transparent;color:var(--text2);border:none;}
.btn-ghost:hover{color:var(--text);}
.btn-outline{background:transparent;border:1.5px solid var(--border2);color:var(--text);}
.btn-outline:hover{border-color:var(--primary);color:var(--primary);}
.btn-sm{padding:8px 14px;font-size:12px;}
.btn:disabled{opacity:.5;cursor:not-allowed;}

/* Card */
.card{background:var(--bg2);border:1px solid var(--border2);
  border-radius:var(--r-xl);padding:24px;transition:all .3s;}
.card:hover{border-color:var(--accent);box-shadow:0 8px 24px rgba(8,145,178,.08);}

/* Checkbox */
.checkbox{width:18px;height:18px;border-radius:4px;
  border:1.5px solid var(--border2);cursor:pointer;
  display:flex;align-items:center;justify-content:center;
  flex-shrink:0;transition:all .2s;}
.checkbox.checked{background:var(--primary);border-color:var(--primary);}

/* Time slot grid */
.time-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(80px,1fr));gap:8px;}
.time-slot{padding:10px;border:1.5px solid var(--border2);border-radius:var(--r-lg);
  text-align:center;cursor:pointer;transition:all .2s;font-size:12px;font-weight:600;
  color:var(--text3);background:var(--bg3);}
.time-slot:hover{border-color:var(--primary);}
.time-slot.selected{background:var(--primary);color:white;border-color:var(--primary);}

/* File upload */
.file-drop{border:2px dashed var(--border2);border-radius:var(--r-lg);
  padding:32px;text-align:center;cursor:pointer;transition:all .2s;
  background:var(--bg3);}
.file-drop:hover{border-color:var(--primary);background:rgba(8,145,178,.04);}
.file-drop.drag{border-color:var(--primary);background:rgba(8,145,178,.08);}

/* Doc item */
.doc-item{background:var(--bg3);border-radius:var(--r-lg);padding:14px;
  display:flex;justify-content:space-between;align-items:center;}

/* Alert */
.alert{padding:14px 16px;border-radius:var(--r-lg);border-left:4px solid;
  display:flex;gap:12px;font-size:13px;line-height:1.6;}
.alert-info{background:rgba(8,145,178,.08);border-color:var(--primary);color:var(--text2);}
.alert-success{background:rgba(16,185,129,.08);border-color:var(--green);color:var(--text2);}
.alert-warning{background:rgba(245,158,11,.08);border-color:var(--amber);color:var(--text2);}
`;

/* ═══════════════════════════════════════════════
   MOCK DATA
═══════════════════════════════════════════════ */
const SPECIALTIES = [
  "Endocrinology", "Internal Medicine", "Diabetology",
  "Bariatric Medicine", "Cardiology", "Gastroenterology",
  "General Medicine"
];

const STATES = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand",
  "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
  "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura",
  "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const TIME_SLOTS = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "04:30 PM",
  "05:00 PM", "05:30 PM", "06:00 PM"
];

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const DOCUMENT_TYPES = [
  { id: "mbbs", label: "MBBS Degree Certificate", req: true },
  { id: "pg", label: "PG Degree (if applicable)", req: false },
  { id: "mci", label: "MCI Registration Certificate", req: true },
  { id: "aadhaar", label: "Aadhaar Card (Front & Back)", req: true },
  { id: "pan", label: "PAN Card", req: true },
  { id: "bank", label: "Bank Account Statement (3 months)", req: true },
];

/* ═══════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════ */
export default function DoctorRegistration() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    specialty: "",
    state: "",
    city: "",
    experience: "",
    mciNumber: "",
    consultFee: "",
    slotDuration: "30",
    selectedDays: [],
    selectedSlots: [],
    documents: [],
    agreeTerms: false,
  });

  const updateForm = (key, value) => {
    setFormData(p => ({ ...p, [key]: value }));
  };

  const toggleDay = (day) => {
    const days = formData.selectedDays.includes(day)
      ? formData.selectedDays.filter(d => d !== day)
      : [...formData.selectedDays, day];
    updateForm("selectedDays", days);
  };

  const toggleSlot = (slot) => {
    const slots = formData.selectedSlots.includes(slot)
      ? formData.selectedSlots.filter(s => s !== slot)
      : [...formData.selectedSlots, slot];
    updateForm("selectedSlots", slots);
  };

  const handleSubmit = () => {
    if (step === 4) {
      alert("✅ Registration submitted! Waiting for admin approval...");
    }
  };

  const isStep1Valid = formData.name && formData.phone && formData.email && formData.specialty;
  const isStep2Valid = formData.mciNumber && formData.consultFee && formData.experience;
  const isStep3Valid = formData.selectedDays.length > 0 && formData.selectedSlots.length > 0;
  const isStep4Valid = formData.documents.length >= 4 && formData.agreeTerms;

  return (
    <>
      <style>{CSS}</style>
      <div style={{
        minHeight: "100vh",
        padding: "40px 20px",
        background: "linear-gradient(135deg,var(--bg),#e0f7ff)"
      }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          {/* Header */}
          <div className="fu" style={{ marginBottom: 40, textAlign: "center" }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>👨‍⚕️</div>
            <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>
              Register as a Physician
            </h1>
            <p style={{ fontSize: 14, color: "var(--text3)", maxWidth: 480, margin: "0 auto" }}>
              Join India's fastest-growing GLP-1 telehealth platform. Complete registration,
              get verified by MCI, and start accepting patients within 48 hours.
            </p>
          </div>

          {/* Progress */}
          <div className="fu" style={{ marginBottom: 40 }}>
            <div className="progress-bar">
              {[1, 2, 3, 4].map(s => (
                <div key={s} className="progress-step">
                  <div className={`progress-dot ${s < step ? "done" : s === step ? "active" : "pending"}`}>
                    {s < step ? <Check size={16} /> : s}
                  </div>
                  <div className={`progress-line ${s < step ? "active" : ""}`} />
                </div>
              ))}
              <div key="final" className="progress-step">
                <div className={`progress-dot ${step > 4 ? "done" : "pending"}`}>
                  {step > 4 ? <Check size={16} /> : "✓"}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 16, fontSize: 12, fontWeight: 600, color: "var(--text3)" }}>
              <div>Step {step} of 4</div>
              <div>·</div>
              <div>
                {step === 1 && "Personal Details"}
                {step === 2 && "MCI Verification & Fees"}
                {step === 3 && "Time Availability"}
                {step === 4 && "Document Upload"}
              </div>
            </div>
          </div>

          {/* Step 1: Personal Details */}
          {step === 1 && (
            <div className="card si">
              <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 24 }}>
                Personal Information
              </h2>

              {formData.phone && formData.phone.length < 10 && (
                <div className="alert alert-warning" style={{ marginBottom: 16 }}>
                  <AlertCircle size={16} style={{ flexShrink: 0 }} />
                  <span>Phone number must be 10 digits</span>
                </div>
              )}

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                <div className="form-group">
                  <label className="label">Full Name</label>
                  <input className="inp" placeholder="Dr. Your Name"
                    value={formData.name} onChange={e => updateForm("name", e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="label">Phone Number</label>
                  <div style={{ display: "flex" }}>
                    <div style={{ padding: "11px 12px", background: "var(--bg3)",
                      borderRadius: "var(--r-lg) 0 0 var(--r-lg)", fontSize: 13,
                      fontWeight: 600, color: "var(--text3)" }}>🇮🇳 +91</div>
                    <input className="inp" placeholder="98765 43210"
                      style={{ borderRadius: "0 var(--r-lg) var(--r-lg) 0" }}
                      value={formData.phone} onChange={e => updateForm("phone", e.target.value.replace(/\D/g, "").slice(0, 10))} />
                  </div>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                <div className="form-group">
                  <label className="label">Email Address</label>
                  <input className="inp" type="email" placeholder="you@hospital.com"
                    value={formData.email} onChange={e => updateForm("email", e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="label">Specialization</label>
                  <select className="select" value={formData.specialty}
                    onChange={e => updateForm("specialty", e.target.value)}>
                    <option value="">Select specialty...</option>
                    {SPECIALTIES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div className="form-group">
                  <label className="label">State</label>
                  <select className="select" value={formData.state}
                    onChange={e => updateForm("state", e.target.value)}>
                    <option value="">Select state...</option>
                    {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="label">City</label>
                  <input className="inp" placeholder="e.g., Mumbai, Delhi"
                    value={formData.city} onChange={e => updateForm("city", e.target.value)} />
                </div>
              </div>

              {/* Nav buttons */}
              <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
                <button className="btn btn-ghost" disabled>
                  <ChevronLeft size={16} /> Back
                </button>
                <button className="btn btn-primary" style={{ marginLeft: "auto" }}
                  disabled={!isStep1Valid}
                  onClick={() => setStep(2)}>
                  Continue <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: MCI & Fees */}
          {step === 2 && (
            <div className="card si">
              <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 24 }}>
                MCI Registration & Consultation Fees
              </h2>

              <div className="alert alert-info" style={{ marginBottom: 20 }}>
                <Shield size={16} style={{ flexShrink: 0 }} />
                <span>
                  Your MCI number will be verified against the National Medical Commission database.
                </span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                <div className="form-group">
                  <label className="label">MCI Registration Number</label>
                  <input className="inp" placeholder="MCI-XXXXXX"
                    value={formData.mciNumber} onChange={e => updateForm("mciNumber", e.target.value.toUpperCase())} />
                  <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 6 }}>
                    Format: MCI-XXXXXX
                  </div>
                </div>
                <div className="form-group">
                  <label className="label">Years of Experience</label>
                  <select className="select" value={formData.experience}
                    onChange={e => updateForm("experience", e.target.value)}>
                    <option value="">Select...</option>
                    {[1, 3, 5, 8, 10, 15, 20, 25].map(y => (
                      <option key={y} value={y}>{y} years</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="label">Consultation Fee Per Session (₹)</label>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <DollarSign size={18} color="var(--primary)" style={{ marginTop: -4 }} />
                  <input className="inp" placeholder="999" type="number"
                    value={formData.consultFee} onChange={e => updateForm("consultFee", e.target.value)} />
                </div>
                <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 6 }}>
                  Recommended: ₹800–₹2,000 per 30-min session
                </div>
              </div>

              <div className="form-group">
                <label className="label">Slot Duration (minutes)</label>
                <div style={{ display: "flex", gap: 10 }}>
                  {[15, 30, 45, 60].map(d => (
                    <button key={d}
                      className={`btn btn-sm ${formData.slotDuration === d.toString() ? "btn-primary" : "btn-outline"}`}
                      onClick={() => updateForm("slotDuration", d.toString())}>
                      {d} min
                    </button>
                  ))}
                </div>
              </div>

              {/* Nav buttons */}
              <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
                <button className="btn btn-outline"
                  onClick={() => setStep(1)}>
                  <ChevronLeft size={16} /> Back
                </button>
                <button className="btn btn-primary" style={{ marginLeft: "auto" }}
                  disabled={!isStep2Valid}
                  onClick={() => setStep(3)}>
                  Continue <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Time Availability */}
          {step === 3 && (
            <div className="card si">
              <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 24 }}>
                Availability & Time Slots
              </h2>

              <div className="alert alert-info" style={{ marginBottom: 20 }}>
                <Clock size={16} style={{ flexShrink: 0 }} />
                <span>Select at least one day and at least 3 time slots per day.</span>
              </div>

              {/* Days */}
              <div className="form-group">
                <label className="label" style={{ marginBottom: 12 }}>Available Days</label>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {DAYS.map(day => (
                    <button key={day}
                      className={`btn btn-sm ${formData.selectedDays.includes(day) ? "btn-primary" : "btn-outline"}`}
                      onClick={() => toggleDay(day)}>
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              {/* Time slots */}
              <div className="form-group">
                <label className="label" style={{ marginBottom: 12 }}>
                  Time Slots (for all selected days)
                </label>
                <div className="time-grid">
                  {TIME_SLOTS.map(slot => (
                    <div key={slot}
                      className={`time-slot ${formData.selectedSlots.includes(slot) ? "selected" : ""}`}
                      onClick={() => toggleSlot(slot)}>
                      {slot}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: "var(--bg3)", borderRadius: "var(--r-lg)", padding: 14, fontSize: 12, color: "var(--text3)" }}>
                <strong>{formData.selectedDays.length} day(s) × {formData.selectedSlots.length} slot(s)</strong> = {formData.selectedDays.length * formData.selectedSlots.length} consultation slots/week
              </div>

              {/* Nav buttons */}
              <div style={{ display: "flex", gap: 12, marginTop: 32 }}>
                <button className="btn btn-outline"
                  onClick={() => setStep(2)}>
                  <ChevronLeft size={16} /> Back
                </button>
                <button className="btn btn-primary" style={{ marginLeft: "auto" }}
                  disabled={!isStep3Valid}
                  onClick={() => setStep(4)}>
                  Continue <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Document Upload */}
          {step === 4 && (
            <div className="card si">
              <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 24 }}>
                Document Verification
              </h2>

              <div className="alert alert-info" style={{ marginBottom: 20 }}>
                <FileText size={16} style={{ flexShrink: 0 }} />
                <span>
                  Upload clear, legible copies of all required documents. PDFs or high-res images accepted.
                </span>
              </div>

              {/* Documents checklist */}
              <div style={{ marginBottom: 24 }}>
                {DOCUMENT_TYPES.map(doc => (
                  <div key={doc.id} className="doc-item" style={{ marginBottom: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div className={`checkbox ${formData.documents.includes(doc.id) ? "checked" : ""}`}
                        onClick={() => {
                          const docs = formData.documents.includes(doc.id)
                            ? formData.documents.filter(d => d !== doc.id)
                            : [...formData.documents, doc.id];
                          updateForm("documents", docs);
                        }}>
                        {formData.documents.includes(doc.id) && <Check size={12} color="white" />}
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)" }}>
                          {doc.label}
                        </div>
                        {doc.req && (
                          <div style={{ fontSize: 10, color: "var(--red)" }}>* Required</div>
                        )}
                      </div>
                    </div>
                    {formData.documents.includes(doc.id)
                      ? <CheckCircle2 size={16} color="var(--green)" />
                      : <div style={{ width: 16, height: 16, borderRadius: 2, background: "var(--bg3)" }} />}
                  </div>
                ))}
              </div>

              {/* File drop zone */}
              <div className="file-drop">
                <Upload size={32} color="var(--primary)" style={{ margin: "0 auto 8px", display: "block" }} />
                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", marginBottom: 4 }}>
                  Drop files here or click to upload
                </div>
                <div style={{ fontSize: 11, color: "var(--text3)" }}>
                  PDF, JPG, PNG up to 10 MB each
                </div>
              </div>

              {/* Terms */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginTop: 24, marginBottom: 24 }}>
                <div className={`checkbox ${formData.agreeTerms ? "checked" : ""}`}
                  onClick={() => updateForm("agreeTerms", !formData.agreeTerms)}
                  style={{ marginTop: 2 }}>
                  {formData.agreeTerms && <Check size={12} color="white" />}
                </div>
                <label style={{ fontSize: 13, color: "var(--text3)", cursor: "pointer", flex: 1 }}>
                  I agree to SlimRx Terms of Service and Doctor Code of Conduct. I confirm all information
                  provided is accurate and complete.
                </label>
              </div>

              {/* Summary */}
              <div style={{ background: "var(--bg3)", borderRadius: "var(--r-lg)", padding: 16, marginBottom: 24 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "var(--text2)", marginBottom: 12 }}>
                  REGISTRATION SUMMARY
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, fontSize: 12 }}>
                  <div>
                    <div style={{ color: "var(--text3)", marginBottom: 2 }}>Specialty</div>
                    <div style={{ fontWeight: 600 }}>{formData.specialty}</div>
                  </div>
                  <div>
                    <div style={{ color: "var(--text3)", marginBottom: 2 }}>Consultation Fee</div>
                    <div style={{ fontWeight: 600 }}>₹{formData.consultFee} per {formData.slotDuration} min</div>
                  </div>
                  <div>
                    <div style={{ color: "var(--text3)", marginBottom: 2 }}>Availability</div>
                    <div style={{ fontWeight: 600 }}>
                      {formData.selectedDays.length * formData.selectedSlots.length} slots/week
                    </div>
                  </div>
                  <div>
                    <div style={{ color: "var(--text3)", marginBottom: 2 }}>Documents</div>
                    <div style={{ fontWeight: 600, color: formData.documents.length >= 4 ? "var(--green)" : "var(--red)" }}>
                      {formData.documents.length}/6 uploaded
                    </div>
                  </div>
                </div>
              </div>

              {/* Nav buttons */}
              <div style={{ display: "flex", gap: 12 }}>
                <button className="btn btn-outline"
                  onClick={() => setStep(3)}>
                  <ChevronLeft size={16} /> Back
                </button>
                <button className="btn btn-primary" style={{ marginLeft: "auto" }}
                  disabled={!isStep4Valid}
                  onClick={handleSubmit}>
                  <Check size={16} /> Submit Registration
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
