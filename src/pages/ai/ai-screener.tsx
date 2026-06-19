import { useState, useEffect, useRef, useCallback } from "react";
import {
  Activity, Send, Mic, MicOff, RefreshCw, ChevronRight,
  AlertTriangle, CheckCircle2, XCircle, Clock, Shield,
  Stethoscope, Pill, ArrowRight, Loader, Sparkles,
  User, Bot, Lock, Phone, Info, Download, Star,
  Heart, TrendingDown, Zap, ChevronDown
} from "lucide-react";

/* ═══════════════════════════════════════════════════════════
   GLOBAL STYLES — Aesthetic: Clinical-futuristic dark
   Fonts: Instrument Serif (display) + IBM Plex Sans (body)
   Palette: Deep midnight + electric teal + warm cream
═══════════════════════════════════════════════════════════ */
const G = `
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=IBM+Plex+Sans:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --mid:      #050c14;
  --mid2:     #0a1628;
  --mid3:     #0f1f3a;
  --teal-600: #0891b2;
  --teal-500: #06b6d4;
  --teal-400: #22d3ee;
  --teal-300: #67e8f9;
  --teal-100: #cffafe;
  --teal-50:  #ecfeff;
  --cream:    #fdf8f0;
  --cream2:   #f5ede0;
  --amber:    #f59e0b;
  --red:      #f43f5e;
  --red-soft: #fff1f2;
  --green:    #10b981;
  --green-soft:#d1fae5;
  --slate-800:#1e293b;
  --slate-700:#334155;
  --slate-600:#475569;
  --slate-500:#64748b;
  --slate-400:#94a3b8;
  --slate-300:#cbd5e1;
  --slate-200:#e2e8f0;
  --slate-100:#f1f5f9;
  --white:    #ffffff;
  --r:        10px;
  --r-lg:     18px;
  --r-xl:     26px;
}

html, body, #root { height: 100%; }

body {
  font-family: 'IBM Plex Sans', sans-serif;
  background: var(--mid);
  color: var(--white);
  -webkit-font-smoothing: antialiased;
  overflow: hidden;
}

.serif { font-family: 'Instrument Serif', Georgia, serif; }
.mono  { font-family: 'IBM Plex Mono', monospace; }

/* ── Keyframes ── */
@keyframes fadeUp    { from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:translateY(0);} }
@keyframes fadeIn    { from{opacity:0;}to{opacity:1;} }
@keyframes slideR    { from{opacity:0;transform:translateX(-12px);}to{opacity:1;transform:translateX(0);} }
@keyframes slideL    { from{opacity:0;transform:translateX(12px);}to{opacity:1;transform:translateX(0);} }
@keyframes spin      { to{transform:rotate(360deg);} }
@keyframes blink     { 0%,100%{opacity:1;}50%{opacity:0;} }
@keyframes pulse-dot { 0%,100%{transform:scale(1);opacity:1;}50%{transform:scale(1.4);opacity:.6;} }
@keyframes wave      { 0%{transform:scaleY(.4);}50%{transform:scaleY(1);}100%{transform:scaleY(.4);} }
@keyframes glow      { 0%,100%{box-shadow:0 0 8px rgba(6,182,212,.3);}50%{box-shadow:0 0 24px rgba(6,182,212,.6);} }
@keyframes scan      { 0%{transform:translateY(-100%);}100%{transform:translateY(400%);} }
@keyframes typewriter{ from{width:0;}to{width:100%;} }
@keyframes bounce-in { 0%{transform:scale(0.7);opacity:0;}60%{transform:scale(1.08);}100%{transform:scale(1);opacity:1;} }
@keyframes shimmer   { 0%{background-position:-200% center;}100%{background-position:200% center;} }

.fade-up { animation: fadeUp .45s cubic-bezier(.22,1,.36,1) both; }
.fade-in { animation: fadeIn .3s ease both; }
.slide-r { animation: slideR .4s cubic-bezier(.22,1,.36,1) both; }
.slide-l { animation: slideL .4s cubic-bezier(.22,1,.36,1) both; }
.bounce-in{ animation: bounce-in .5s cubic-bezier(.22,1,.36,1) both; }

/* ── Scrollbar ── */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(6,182,212,.3); border-radius: 2px; }

/* ── Chat bubbles ── */
.bubble-ai {
  background: rgba(6,182,212,.08);
  border: 1px solid rgba(6,182,212,.18);
  border-radius: 4px 18px 18px 18px;
  padding: 14px 18px;
  color: var(--cream);
  font-size: 14.5px;
  line-height: 1.7;
  max-width: 82%;
  backdrop-filter: blur(8px);
}
.bubble-user {
  background: linear-gradient(135deg,rgba(8,145,178,.7),rgba(6,182,212,.5));
  border: 1px solid rgba(6,182,212,.3);
  border-radius: 18px 4px 18px 18px;
  padding: 12px 18px;
  color: var(--white);
  font-size: 14.5px;
  line-height: 1.65;
  max-width: 78%;
  box-shadow: 0 4px 16px rgba(6,182,212,.15);
}

/* ── Thinking dots ── */
.thinking { display:flex; gap:5px; align-items:center; padding: 4px 0; }
.dot { width:7px; height:7px; border-radius:50%; background:var(--teal-400); }
.dot:nth-child(1){animation:pulse-dot .9s ease infinite 0s;}
.dot:nth-child(2){animation:pulse-dot .9s ease infinite .15s;}
.dot:nth-child(3){animation:pulse-dot .9s ease infinite .3s;}

/* ── Quick reply chips ── */
.qr-chip {
  display:inline-flex; align-items:center; gap:6px;
  padding:9px 16px; border-radius:100px;
  background:rgba(6,182,212,.08);
  border:1px solid rgba(6,182,212,.25);
  color:var(--teal-300); font-size:13px; font-weight:500;
  cursor:pointer; transition:all .18s;
  font-family:'IBM Plex Sans',sans-serif;
  white-space:nowrap;
}
.qr-chip:hover {
  background:rgba(6,182,212,.2);
  border-color:rgba(6,182,212,.5);
  color:var(--teal-100);
  transform:translateY(-1px);
}

/* ── Input ── */
.chat-input {
  flex:1; background:transparent; border:none; outline:none;
  font-family:'IBM Plex Sans',sans-serif; font-size:14px;
  color:var(--cream); resize:none; line-height:1.5;
}
.chat-input::placeholder { color:rgba(255,255,255,.25); }

/* ── Score ring ── */
.score-ring {
  width:88px; height:88px; border-radius:50%; position:relative;
  display:flex; align-items:center; justify-content:center; flex-shrink:0;
}

/* ── Btn ── */
.btn-teal {
  display:inline-flex; align-items:center; gap:8px;
  padding:13px 24px; border-radius:var(--r); border:none;
  background:linear-gradient(135deg,var(--teal-600),var(--teal-500));
  color:var(--white); font-family:'IBM Plex Sans',sans-serif;
  font-size:14px; font-weight:600; cursor:pointer;
  transition:all .2s; box-shadow:0 4px 16px rgba(6,182,212,.25);
}
.btn-teal:hover { transform:translateY(-1px); box-shadow:0 8px 24px rgba(6,182,212,.35); }
.btn-ghost-teal {
  display:inline-flex; align-items:center; gap:7px;
  padding:11px 20px; border-radius:var(--r);
  background:transparent; border:1.5px solid rgba(6,182,212,.3);
  color:var(--teal-300); font-family:'IBM Plex Sans',sans-serif;
  font-size:13px; font-weight:500; cursor:pointer; transition:all .2s;
}
.btn-ghost-teal:hover { background:rgba(6,182,212,.1); border-color:rgba(6,182,212,.5); }

/* ── Tag ── */
.tag {
  display:inline-flex; align-items:center; gap:5px;
  padding:3px 10px; border-radius:100px;
  font-size:11px; font-weight:600; letter-spacing:.03em;
}
.tag-teal  { background:rgba(6,182,212,.15); color:var(--teal-300); border:1px solid rgba(6,182,212,.25); }
.tag-green { background:rgba(16,185,129,.15); color:#6ee7b7; border:1px solid rgba(16,185,129,.25); }
.tag-red   { background:rgba(244,63,94,.15);  color:#fda4af; border:1px solid rgba(244,63,94,.25); }
.tag-amber { background:rgba(245,158,11,.15); color:#fcd34d; border:1px solid rgba(245,158,11,.25); }

/* ── Divider ── */
.div { height:1px; background:rgba(255,255,255,.06); }

/* ── Waveform bars ── */
.wave-bar {
  width:3px; border-radius:2px; background:var(--teal-400);
}
.wave-bar:nth-child(1){animation:wave .8s ease infinite 0s; height:10px;}
.wave-bar:nth-child(2){animation:wave .8s ease infinite .1s; height:18px;}
.wave-bar:nth-child(3){animation:wave .8s ease infinite .2s; height:24px;}
.wave-bar:nth-child(4){animation:wave .8s ease infinite .15s; height:18px;}
.wave-bar:nth-child(5){animation:wave .8s ease infinite .05s; height:10px;}

/* ── Scan line ── */
.scan-line {
  position:absolute; left:0; right:0; height:2px;
  background:linear-gradient(90deg,transparent,rgba(6,182,212,.6),transparent);
  animation:scan 2.5s ease-in-out infinite;
}

/* ── Avatar ── */
.ai-avatar {
  width:34px; height:34px; border-radius:10px; flex-shrink:0;
  background:linear-gradient(135deg,rgba(8,145,178,.8),rgba(6,182,212,.5));
  border:1px solid rgba(6,182,212,.4);
  display:flex; align-items:center; justify-content:center;
  animation:glow 3s ease-in-out infinite;
}
.user-avatar {
  width:34px; height:34px; border-radius:10px; flex-shrink:0;
  background:rgba(255,255,255,.08); border:1px solid rgba(255,255,255,.12);
  display:flex; align-items:center; justify-content:center;
}
`;

/* ═══════════════════════════════════════════════════════════
   SYSTEM PROMPT for Claude AI screener
═══════════════════════════════════════════════════════════ */
const SYSTEM_PROMPT = `You are Dr. Aria — an AI medical intake assistant for SlimRx.in, India's leading GLP-1 telehealth platform. Your role is to conduct a warm, professional, clinically rigorous eligibility screening for GLP-1 weight-loss medications (semaglutide oral/injection, liraglutide injection).

PERSONALITY: Warm but clinical. Empathetic, never judgmental. Like a caring doctor who also has excellent bedside manner. Speak in simple English mixed occasionally with Hindi terms (ji, aap) to feel authentically Indian.

YOUR GOAL: Collect the following information conversationally, one or two questions at a time:
1. Age
2. Current weight and height (to compute BMI)
3. Weight loss goal
4. Relevant medical conditions (diabetes, hypertension, high cholesterol, PCOS, heart disease, sleep apnea)
5. CONTRAINDICATION SCREENING (critical): thyroid cancer/MTC history, pancreatitis, severe kidney disease, pregnancy/breastfeeding, eating disorders
6. Current medications (especially insulin, sulfonylureas, other GLP-1s)
7. Previous weight loss attempts
8. Lifestyle factors (diet, exercise)

ELIGIBILITY RULES:
- ELIGIBLE: BMI ≥ 27 with comorbidity OR BMI ≥ 30 without comorbidity, age 18-70, no absolute contraindications
- CONTRAINDICATED (must flag and recommend physician review): personal/family history of medullary thyroid carcinoma (MTC), Multiple Endocrine Neoplasia syndrome type 2 (MEN 2), history of pancreatitis, severe renal impairment (eGFR < 30), pregnancy, breastfeeding, type 1 diabetes, active eating disorder
- BORDERLINE: BMI 25-27 without comorbidity — can proceed with extra caution

CONVERSATION FLOW:
- Start with a warm welcome and first 1-2 questions
- Ask maximum 2 questions per message
- After 6-8 exchanges, synthesize and provide eligibility result
- If contraindication detected early, gently pause and recommend physician consultation
- Never give specific medical advice or dosing information
- Always recommend final physician review before prescription

ELIGIBILITY RESULT FORMAT (when ready — include this JSON at the END of your final assessment message, after your human-readable text):
<eligibility_result>
{
  "status": "eligible" | "borderline" | "contraindicated" | "physician_review_required",
  "score": 0-100,
  "bmi": number_or_null,
  "recommended_medication": "SemaSlim 7mg Oral" | "LiraDose 3mg Pen" | "SemaPen XR 2.4mg" | null,
  "flags": ["list", "of", "clinical", "flags"],
  "summary": "2-3 sentence clinical summary",
  "next_step": "book_consultation" | "proceed_to_checkout" | "physician_review"
}
</eligibility_result>

IMPORTANT RULES:
- Never reproduce copyrighted material
- Decline any off-topic requests gracefully and redirect to health screening
- If asked about pricing, say "Our team will share detailed pricing after your eligibility is confirmed"
- Maintain HIPAA-equivalent confidentiality standards
- End every message with a clear, specific next question or action
- Keep responses concise — under 120 words per message ideally
- Use plain English, avoid jargon unless explaining it
`;

/* ═══════════════════════════════════════════════════════════
   QUICK REPLY SUGGESTION SETS
═══════════════════════════════════════════════════════════ */
const QUICK_REPLIES = {
  start:   ["I want to lose weight", "Tell me about GLP-1 meds", "Check my eligibility"],
  age:     ["I'm in my 20s", "I'm in my 30s", "I'm in my 40s", "I'm 50+"],
  bmi:     ["I'm overweight (BMI 25-30)", "I'm obese (BMI 30+)", "Not sure of my BMI"],
  conditions: ["Yes, I have Type 2 Diabetes", "I have high blood pressure", "I have PCOS", "None of these"],
  contra:  ["No thyroid issues", "No pancreatitis history", "I'm not pregnant", "None of the above"],
  lifestyle: ["I exercise occasionally", "I've tried diets before", "Very busy lifestyle", "I'm ready to commit"],
};

/* ═══════════════════════════════════════════════════════════
   RESULT CARD COMPONENT
═══════════════════════════════════════════════════════════ */
function EligibilityResultCard({ result, onProceed, onReview }) {
  const statusConfig = {
    eligible: {
      color: "var(--green)", bg: "rgba(16,185,129,.08)", border: "rgba(16,185,129,.25)",
      icon: CheckCircle2, label: "Eligible for GLP-1 Therapy", tagClass: "tag-green",
    },
    borderline: {
      color: "var(--amber)", bg: "rgba(245,158,11,.08)", border: "rgba(245,158,11,.25)",
      icon: AlertTriangle, label: "Borderline — Doctor Review Suggested", tagClass: "tag-amber",
    },
    contraindicated: {
      color: "var(--red)", bg: "rgba(244,63,94,.08)", border: "rgba(244,63,94,.25)",
      icon: XCircle, label: "Not Recommended — Please See a Doctor", tagClass: "tag-red",
    },
    physician_review_required: {
      color: "var(--amber)", bg: "rgba(245,158,11,.08)", border: "rgba(245,158,11,.25)",
      icon: Stethoscope, label: "Physician Review Required", tagClass: "tag-amber",
    },
  };

  const cfg = statusConfig[result.status] || statusConfig.eligible;
  const Icon = cfg.icon;

  const circumference = 2 * Math.PI * 36;
  const offset = circumference - (result.score / 100) * circumference;

  const medConfig = {
    "SemaSlim 7mg Oral":  { icon: "💊", type: "Oral · Once daily",    price: "₹1,299/mo" },
    "LiraDose 3mg Pen":   { icon: "💉", type: "Pen · Once daily",     price: "₹1,799/mo" },
    "SemaPen XR 2.4mg":   { icon: "💉", type: "Pen · Once weekly",    price: "₹2,199/mo" },
  };
  const med = result.recommended_medication ? medConfig[result.recommended_medication] : null;

  return (
    <div className="bounce-in" style={{
      background: cfg.bg,
      border: `1px solid ${cfg.border}`,
      borderRadius: "var(--r-xl)",
      padding: "24px",
      marginTop: 8,
    }}>
      {/* Header */}
      <div style={{ display: "flex", gap: 16, alignItems: "flex-start", marginBottom: 20 }}>
        {/* Score ring */}
        <div className="score-ring">
          <svg width="88" height="88" style={{ position: "absolute", top: 0, left: 0, transform: "rotate(-90deg)" }}>
            <circle cx="44" cy="44" r="36" fill="none" stroke="rgba(255,255,255,.06)" strokeWidth="7" />
            <circle cx="44" cy="44" r="36" fill="none"
              stroke={cfg.color} strokeWidth="7"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(.4,0,.2,1)" }}
            />
          </svg>
          <div style={{ textAlign: "center", zIndex: 1 }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: cfg.color, lineHeight: 1 }}>{result.score}</div>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,.4)", letterSpacing: ".05em" }}>SCORE</div>
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
            <Icon size={16} color={cfg.color} />
            <span style={{ fontWeight: 700, fontSize: 15, color: cfg.color }}>{cfg.label}</span>
          </div>

          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {result.bmi && (
              <span className={`tag ${cfg.tagClass}`}>BMI {result.bmi}</span>
            )}
            {result.flags?.slice(0, 2).map(f => (
              <span key={f} className="tag tag-amber">{f}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Summary */}
      <p style={{ fontSize: 13.5, color: "rgba(255,255,255,.65)", lineHeight: 1.65, marginBottom: 18 }}>
        {result.summary}
      </p>

      {/* Recommended medication */}
      {med && result.status !== "contraindicated" && (
        <div style={{
          background: "rgba(6,182,212,.06)", border: "1px solid rgba(6,182,212,.18)",
          borderRadius: "var(--r)", padding: "14px 16px", marginBottom: 18,
          display: "flex", gap: 12, alignItems: "center",
        }}>
          <span style={{ fontSize: 28 }}>{med.icon}</span>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 4 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: "var(--teal-100)" }}>
                  {result.recommended_medication}
                </div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,.4)" }}>{med.type}</div>
              </div>
              <div style={{ fontSize: 18, fontWeight: 800, color: "var(--teal-400)" }}>{med.price}</div>
            </div>
          </div>
          <span className="tag tag-teal">Recommended</span>
        </div>
      )}

      {/* Clinical flags */}
      {result.flags?.length > 0 && (
        <div style={{ marginBottom: 18 }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,.35)", letterSpacing: ".08em", marginBottom: 8 }}>
            CLINICAL NOTES
          </div>
          {result.flags.map(f => (
            <div key={f} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
              <Info size={12} color="rgba(255,255,255,.3)" />
              <span style={{ fontSize: 12, color: "rgba(255,255,255,.5)" }}>{f}</span>
            </div>
          ))}
        </div>
      )}

      {/* CTAs */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {(result.status === "eligible" || result.status === "borderline") && (
          <button className="btn-teal" style={{ width: "100%", justifyContent: "center", fontSize: 15 }}
            onClick={onProceed}>
            <Stethoscope size={16} />
            Book Doctor Consultation
            <ArrowRight size={15} />
          </button>
        )}
        <button className="btn-ghost-teal" style={{ width: "100%", justifyContent: "center" }}
          onClick={onReview}>
          <Phone size={14} />
          {result.status === "contraindicated"
            ? "Call for Personal Medical Review — Free"
            : "Speak to a Doctor First — Free"}
        </button>
      </div>

      {/* Disclaimer */}
      <div style={{
        marginTop: 14, padding: "10px 12px",
        background: "rgba(255,255,255,.03)", borderRadius: "var(--r)",
        fontSize: 11, color: "rgba(255,255,255,.3)", lineHeight: 1.6,
      }}>
        <Lock size={10} style={{ display: "inline", marginRight: 4 }} />
        This AI screening is indicative only. A licensed physician must review your case before
        any prescription is issued. Not a substitute for professional medical advice.
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   TYPING INDICATOR
═══════════════════════════════════════════════════════════ */
function TypingIndicator() {
  return (
    <div className="slide-r" style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
      <div className="ai-avatar"><Bot size={16} color="var(--teal-300)" /></div>
      <div className="bubble-ai" style={{ padding: "12px 16px" }}>
        <div className="thinking">
          <div className="dot" /><div className="dot" /><div className="dot" />
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   PARSE ELIGIBILITY RESULT from AI response
═══════════════════════════════════════════════════════════ */
function parseEligibilityResult(text) {
  const match = text.match(/<eligibility_result>([\s\S]*?)<\/eligibility_result>/);
  if (!match) return null;
  try {
    return JSON.parse(match[1].trim());
  } catch {
    return null;
  }
}

function stripResultTag(text) {
  return text.replace(/<eligibility_result>[\s\S]*?<\/eligibility_result>/, "").trim();
}

/* ═══════════════════════════════════════════════════════════
   WELCOME SCREEN
═══════════════════════════════════════════════════════════ */
function WelcomeScreen({ onStart }) {
  return (
    <div className="fade-up" style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", height: "100%",
      padding: "40px 24px", textAlign: "center",
    }}>
      {/* Animated logo */}
      <div style={{ position: "relative", marginBottom: 32 }}>
        <div style={{
          width: 96, height: 96, borderRadius: 28,
          background: "linear-gradient(135deg,rgba(8,145,178,.6),rgba(6,182,212,.3))",
          border: "1px solid rgba(6,182,212,.4)",
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative", overflow: "hidden",
          animation: "glow 3s ease-in-out infinite",
        }}>
          <div className="scan-line" />
          <Activity size={40} color="var(--teal-300)" />
        </div>
        {/* Orbit dots */}
        {[0, 60, 120, 180, 240, 300].map((deg, i) => (
          <div key={i} style={{
            position: "absolute",
            top: "50%", left: "50%",
            width: 6, height: 6, borderRadius: "50%",
            background: "var(--teal-400)",
            transform: `rotate(${deg}deg) translate(56px) translateY(-50%)`,
            opacity: .4 + (i % 3) * .2,
          }} />
        ))}
      </div>

      <div style={{ marginBottom: 8 }}>
        <span className="tag tag-teal">
          <Sparkles size={10} /> AI-Powered · Clinically Validated
        </span>
      </div>

      <h1 className="serif" style={{
        fontSize: 36, color: "var(--white)",
        lineHeight: 1.2, marginBottom: 14, marginTop: 12,
        letterSpacing: "-.02em",
      }}>
        Meet Dr. Aria
      </h1>
      <p style={{ fontSize: 15, color: "rgba(255,255,255,.55)", lineHeight: 1.7, marginBottom: 12, maxWidth: 360 }}>
        Your AI eligibility screener for GLP-1 weight-loss therapy.
        Takes <strong style={{ color: "var(--teal-300)" }}>3 minutes</strong>, fully confidential,
        and powered by advanced medical AI.
      </p>

      <div style={{
        display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 10,
        marginBottom: 32,
      }}>
        {[
          { icon: Shield, text: "HIPAA-equivalent privacy" },
          { icon: Stethoscope, text: "Clinician-reviewed protocol" },
          { icon: Lock, text: "End-to-end encrypted" },
        ].map(({ icon: Icon, text }) => (
          <div key={text} style={{
            display: "flex", alignItems: "center", gap: 6,
            fontSize: 12, color: "rgba(255,255,255,.4)",
          }}>
            <Icon size={12} color="var(--teal-500)" /> {text}
          </div>
        ))}
      </div>

      <button className="btn-teal" style={{ fontSize: 16, padding: "16px 36px" }} onClick={onStart}>
        <Zap size={17} />
        Begin Eligibility Screening
        <ArrowRight size={16} />
      </button>

      <p style={{ fontSize: 11, color: "rgba(255,255,255,.25)", marginTop: 16 }}>
        Not a substitute for professional medical advice
      </p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SIDE PANEL — Progress tracker
═══════════════════════════════════════════════════════════ */
function SidePanel({ messages, userName }) {
  const topics = [
    { key: "age",        label: "Age",            icon: User },
    { key: "bmi",        label: "Weight / BMI",   icon: TrendingDown },
    { key: "conditions", label: "Health History", icon: Heart },
    { key: "contra",     label: "Safety Screen",  icon: Shield },
    { key: "meds",       label: "Medications",    icon: Pill },
    { key: "lifestyle",  label: "Lifestyle",      icon: Activity },
  ];

  // Simple heuristic: topic is "done" if relevant keywords appear in transcript
  const allText = messages.map(m => m.content.toLowerCase()).join(" ");
  const isDone = {
    age:        /\b(age|year|old)\b/.test(allText) && messages.length > 3,
    bmi:        /\b(bmi|weight|kg|height|cm)\b/.test(allText) && messages.length > 5,
    conditions: /\b(diabetes|blood pressure|pcos|cholesterol|condition)\b/.test(allText),
    contra:     /\b(thyroid|pancreatitis|pregnant|kidney|cancer)\b/.test(allText),
    meds:       /\b(medication|medicine|drug|insulin|taking)\b/.test(allText) && messages.length > 8,
    lifestyle:  /\b(diet|exercise|lifestyle|eat|active)\b/.test(allText),
  };

  const totalDone = Object.values(isDone).filter(Boolean).length;
  const pct = Math.round((totalDone / 6) * 100);

  return (
    <div style={{
      width: 220, flexShrink: 0,
      background: "rgba(255,255,255,.03)",
      borderRight: "1px solid rgba(255,255,255,.06)",
      padding: "24px 20px",
      display: "flex", flexDirection: "column",
      gap: 0,
    }}>
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 28 }}>
        <div style={{
          width: 30, height: 30, borderRadius: 9,
          background: "linear-gradient(135deg,var(--teal-600),var(--teal-500))",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Activity size={15} color="white" />
        </div>
        <span className="serif" style={{ fontSize: 17, color: "var(--white)", fontStyle: "italic" }}>
          SlimRx
        </span>
      </div>

      {/* User info */}
      {userName && (
        <div style={{
          background: "rgba(6,182,212,.06)", border: "1px solid rgba(6,182,212,.12)",
          borderRadius: "var(--r)", padding: "12px",
          marginBottom: 20,
        }}>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,.3)", marginBottom: 4 }}>SCREENING FOR</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: "var(--teal-200)" }}>{userName}</div>
        </div>
      )}

      {/* Progress */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,.35)", letterSpacing: ".08em" }}>
            INTAKE PROGRESS
          </span>
          <span style={{ fontSize: 12, fontWeight: 700, color: "var(--teal-400)" }}>{pct}%</span>
        </div>
        <div style={{ height: 5, background: "rgba(255,255,255,.06)", borderRadius: 100, overflow: "hidden" }}>
          <div style={{
            height: "100%", borderRadius: 100,
            background: "linear-gradient(90deg,var(--teal-600),var(--teal-400))",
            width: `${pct}%`, transition: "width .8s cubic-bezier(.4,0,.2,1)",
          }} />
        </div>
      </div>

      {/* Topic checklist */}
      <div style={{ flex: 1 }}>
        {topics.map(({ key, label, icon: Icon }) => (
          <div key={key} style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "10px 0",
            borderBottom: "1px solid rgba(255,255,255,.04)",
            transition: "all .3s",
          }}>
            <div style={{
              width: 26, height: 26, borderRadius: 8, flexShrink: 0,
              background: isDone[key] ? "rgba(16,185,129,.15)" : "rgba(255,255,255,.05)",
              border: `1px solid ${isDone[key] ? "rgba(16,185,129,.3)" : "rgba(255,255,255,.08)"}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all .3s",
            }}>
              {isDone[key]
                ? <CheckCircle2 size={13} color="var(--green)" />
                : <Icon size={13} color="rgba(255,255,255,.25)" />}
            </div>
            <span style={{
              fontSize: 13,
              color: isDone[key] ? "rgba(255,255,255,.7)" : "rgba(255,255,255,.3)",
              fontWeight: isDone[key] ? 600 : 400,
              transition: "all .3s",
            }}>{label}</span>
          </div>
        ))}
      </div>

      {/* Privacy note */}
      <div style={{ marginTop: 20 }}>
        <div className="div" style={{ marginBottom: 16 }} />
        <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
          <Lock size={12} color="rgba(255,255,255,.2)" style={{ marginTop: 2, flexShrink: 0 }} />
          <p style={{ fontSize: 11, color: "rgba(255,255,255,.2)", lineHeight: 1.6 }}>
            Conversation is encrypted. Data protected under DPDPA 2023. Deleted after 30 days unless you create an account.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   MAIN APP
═══════════════════════════════════════════════════════════ */
export default function AIEligibilityScreener() {
  const [screen, setScreen] = useState("welcome"); // welcome | chat
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [quickReplies, setQuickReplies] = useState(QUICK_REPLIES.start);
  const [eligibilityResult, setEligibilityResult] = useState(null);
  const [userName, setUserName] = useState("");
  const [msgCount, setMsgCount] = useState(0);
  const [error, setError] = useState(null);
  const [showSide, setShowSide] = useState(true);

  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const historyRef = useRef([]);

  // Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking]);

  // Extract user name from early messages
  useEffect(() => {
    const userMsgs = messages.filter(m => m.role === "user");
    if (!userName && userMsgs.length > 0) {
      const text = userMsgs[0].content;
      const nameMatch = text.match(/(?:i'm|i am|my name is|call me)\s+([A-Z][a-z]+)/i);
      if (nameMatch) setUserName(nameMatch[1]);
    }
  }, [messages]);

  // Determine quick replies based on message count & content
  const getQuickReplies = useCallback((aiText, count) => {
    const t = aiText.toLowerCase();
    if (count <= 1) return QUICK_REPLIES.age;
    if (t.includes("bmi") || t.includes("weight") || t.includes("height")) return QUICK_REPLIES.bmi;
    if (t.includes("condition") || t.includes("diabetes") || t.includes("blood pressure")) return QUICK_REPLIES.conditions;
    if (t.includes("thyroid") || t.includes("pancreatitis") || t.includes("pregnant")) return QUICK_REPLIES.contra;
    if (t.includes("lifestyle") || t.includes("exercise") || t.includes("diet")) return QUICK_REPLIES.lifestyle;
    return [];
  }, []);

  const callClaude = useCallback(async (userMessage) => {
    setIsThinking(true);
    setError(null);

    // Build history
    const newHistory = [
      ...historyRef.current,
      { role: "user", content: userMessage }
    ];
    historyRef.current = newHistory;

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: newHistory,
        }),
      });

      if (!response.ok) {
        const err = await response.json().catch(() => ({}));
        throw new Error(err?.error?.message || `API error ${response.status}`);
      }

      const data = await response.json();
      const rawText = data.content
        .filter(b => b.type === "text")
        .map(b => b.text)
        .join("\n");

      // Parse eligibility result if present
      const result = parseEligibilityResult(rawText);
      const displayText = result ? stripResultTag(rawText) : rawText;

      // Add AI message
      const aiMsg = { role: "assistant", content: displayText, result, id: Date.now() };
      historyRef.current = [...newHistory, { role: "assistant", content: rawText }];

      setMessages(prev => [...prev, aiMsg]);
      if (result) setEligibilityResult(result);

      const newCount = msgCount + 1;
      setMsgCount(newCount);
      setQuickReplies(result ? [] : getQuickReplies(displayText, newCount));

    } catch (e) {
      setError(e.message || "Connection error. Please try again.");
      // Remove the last user message from history on error
      historyRef.current = historyRef.current.slice(0, -1);
    } finally {
      setIsThinking(false);
    }
  }, [msgCount, getQuickReplies]);

  const handleStart = async () => {
    setScreen("chat");
    const welcomeMsg = {
      role: "assistant",
      content: "Namaste! 🙏 I'm **Dr. Aria**, your AI eligibility assistant at SlimRx.in.\n\nI'll ask you a few quick health questions to see if GLP-1 weight-loss therapy is right for you — it takes about 3 minutes.\n\nEverything you share is completely confidential and protected.\n\nTo get started — could you tell me your **age** and what your main weight-loss goal is?",
      id: Date.now(),
    };
    historyRef.current = [{ role: "assistant", content: welcomeMsg.content }];
    setMessages([welcomeMsg]);
    setQuickReplies(QUICK_REPLIES.age);
  };

  const sendMessage = useCallback(async (text) => {
    const msg = text || input.trim();
    if (!msg || isThinking) return;
    setInput("");

    const userMsg = { role: "user", content: msg, id: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setQuickReplies([]);

    await callClaude(msg);
    setTimeout(() => inputRef.current?.focus(), 100);
  }, [input, isThinking, callClaude]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleReset = () => {
    setMessages([]);
    setEligibilityResult(null);
    setInput("");
    setUserName("");
    setMsgCount(0);
    setError(null);
    setQuickReplies(QUICK_REPLIES.start);
    historyRef.current = [];
    setScreen("welcome");
  };

  // Render a single message bubble
  const renderMessage = (msg, idx) => {
    const isAI = msg.role === "assistant";
    const delay = `${Math.min(idx * 0.05, 0.3)}s`;

    // Parse bold markdown **text**
    const formatText = (text) => {
      if (!text) return null;
      const parts = text.split(/(\*\*[^*]+\*\*)/g);
      return parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={i} style={{ color: "var(--teal-200)" }}>{part.slice(2, -2)}</strong>;
        }
        // Handle newlines
        return part.split("\n").map((line, j, arr) => (
          <span key={`${i}-${j}`}>
            {line}
            {j < arr.length - 1 && <br />}
          </span>
        ));
      });
    };

    return (
      <div
        key={msg.id || idx}
        className={isAI ? "slide-r" : "slide-l"}
        style={{
          display: "flex",
          flexDirection: isAI ? "row" : "row-reverse",
          gap: 10,
          alignItems: "flex-end",
          animationDelay: delay,
          opacity: 0,
          marginBottom: 4,
        }}
      >
        {/* Avatar */}
        {isAI
          ? <div className="ai-avatar"><Bot size={16} color="var(--teal-300)" /></div>
          : <div className="user-avatar"><User size={15} color="rgba(255,255,255,.6)" /></div>
        }

        <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: "82%" }}>
          <div className={isAI ? "bubble-ai" : "bubble-user"}>
            {formatText(msg.content)}
          </div>

          {/* Eligibility result card attached to AI message */}
          {msg.result && (
            <EligibilityResultCard
              result={msg.result}
              onProceed={() => alert("Redirecting to booking… (integrate with consultation module)")}
              onReview={() => alert("Opening phone/video call options… (integrate with consultation module)")}
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      <style>{G}</style>
      <div style={{
        display: "flex", height: "100vh", width: "100vw",
        background: "linear-gradient(160deg,var(--mid) 0%,var(--mid2) 50%,var(--mid) 100%)",
        overflow: "hidden",
      }}>
        {/* Welcome Screen */}
        {screen === "welcome" && (
          <div style={{ flex: 1 }}>
            <WelcomeScreen onStart={handleStart} />
          </div>
        )}

        {/* Chat Screen */}
        {screen === "chat" && (
          <>
            {/* Side panel — hidden on small screens via JS flag */}
            {showSide && (
              <SidePanel messages={messages} userName={userName} />
            )}

            {/* Main chat area */}
            <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>
              {/* Top bar */}
              <div style={{
                padding: "14px 20px",
                borderBottom: "1px solid rgba(255,255,255,.06)",
                background: "rgba(255,255,255,.02)",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                flexShrink: 0,
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div className="ai-avatar" style={{ width: 38, height: 38 }}>
                    <Bot size={18} color="var(--teal-300)" />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: "var(--white)" }}>
                      Dr. Aria
                      <span className="tag tag-teal" style={{ marginLeft: 8, fontSize: 10 }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--green)", display: "inline-block", marginRight: 4, animation: "pulse-dot 1.5s ease infinite" }} />
                        Online
                      </span>
                    </div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,.35)" }}>
                      AI Eligibility Screener · SlimRx.in
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    onClick={() => setShowSide(s => !s)}
                    className="btn-ghost-teal"
                    style={{ padding: "8px 12px", fontSize: 12 }}
                  >
                    {showSide ? "Hide" : "Show"} Progress
                  </button>
                  <button
                    onClick={handleReset}
                    className="btn-ghost-teal"
                    style={{ padding: "8px 12px", fontSize: 12 }}
                  >
                    <RefreshCw size={13} /> Restart
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div style={{
                flex: 1, overflowY: "auto", padding: "24px 20px",
                display: "flex", flexDirection: "column", gap: 16,
              }}>
                {messages.map((msg, idx) => renderMessage(msg, idx))}

                {isThinking && (
                  <div style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
                    <div className="ai-avatar"><Bot size={16} color="var(--teal-300)" /></div>
                    <TypingIndicator />
                  </div>
                )}

                {error && (
                  <div className="fade-in" style={{
                    background: "rgba(244,63,94,.08)", border: "1px solid rgba(244,63,94,.25)",
                    borderRadius: "var(--r)", padding: "12px 16px",
                    display: "flex", gap: 10, alignItems: "center",
                  }}>
                    <AlertTriangle size={16} color="var(--red)" />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 600, color: "#fda4af", marginBottom: 2 }}>
                        Connection Error
                      </div>
                      <div style={{ fontSize: 12, color: "rgba(255,255,255,.4)" }}>{error}</div>
                    </div>
                    <button
                      className="btn-ghost-teal"
                      style={{ padding: "7px 12px", fontSize: 12 }}
                      onClick={() => {
                        setError(null);
                        const lastUser = [...messages].reverse().find(m => m.role === "user");
                        if (lastUser) {
                          setMessages(prev => prev.slice(0, -1));
                          callClaude(lastUser.content);
                        }
                      }}>
                      <RefreshCw size={12} /> Retry
                    </button>
                  </div>
                )}

                <div ref={bottomRef} />
              </div>

              {/* Quick replies */}
              {quickReplies.length > 0 && !isThinking && !eligibilityResult && (
                <div className="fade-up" style={{
                  padding: "0 20px 12px",
                  display: "flex", gap: 8, flexWrap: "wrap",
                  overflowX: "auto",
                  flexShrink: 0,
                }}>
                  {quickReplies.map(qr => (
                    <button key={qr} className="qr-chip" onClick={() => sendMessage(qr)}>
                      {qr}
                    </button>
                  ))}
                </div>
              )}

              {/* Input bar */}
              {!eligibilityResult && (
                <div style={{
                  padding: "14px 20px 20px",
                  borderTop: "1px solid rgba(255,255,255,.06)",
                  background: "rgba(255,255,255,.02)",
                  flexShrink: 0,
                }}>
                  <div style={{
                    display: "flex", gap: 10, alignItems: "flex-end",
                    background: "rgba(255,255,255,.05)",
                    border: "1.5px solid rgba(6,182,212,.2)",
                    borderRadius: "var(--r-lg)",
                    padding: "12px 16px",
                    transition: "border-color .2s",
                  }}
                    onFocusCapture={e => e.currentTarget.style.borderColor = "rgba(6,182,212,.5)"}
                    onBlurCapture={e => e.currentTarget.style.borderColor = "rgba(6,182,212,.2)"}
                  >
                    <textarea
                      ref={inputRef}
                      className="chat-input"
                      placeholder="Type your response… (Enter to send)"
                      value={input}
                      onChange={e => {
                        setInput(e.target.value);
                        e.target.style.height = "auto";
                        e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
                      }}
                      onKeyDown={handleKeyDown}
                      rows={1}
                      style={{ height: "22px", maxHeight: "120px", overflowY: "auto" }}
                    />

                    <button
                      onClick={() => sendMessage()}
                      disabled={!input.trim() || isThinking}
                      style={{
                        width: 38, height: 38, borderRadius: 10, flexShrink: 0,
                        background: input.trim() && !isThinking
                          ? "linear-gradient(135deg,var(--teal-600),var(--teal-500))"
                          : "rgba(255,255,255,.06)",
                        border: "none", cursor: input.trim() && !isThinking ? "pointer" : "not-allowed",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "all .2s",
                        boxShadow: input.trim() && !isThinking ? "0 4px 12px rgba(6,182,212,.3)" : "none",
                      }}
                    >
                      {isThinking
                        ? <Loader size={16} color="rgba(255,255,255,.4)" style={{ animation: "spin .8s linear infinite" }} />
                        : <Send size={16} color={input.trim() ? "white" : "rgba(255,255,255,.2)"} />}
                    </button>
                  </div>

                  <div style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    marginTop: 8, paddingX: 4,
                  }}>
                    <div style={{ display: "flex", gap: 14 }}>
                      <SecurityBadge text="Encrypted" />
                      <SecurityBadge text="DPDPA Compliant" />
                    </div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,.2)" }}>
                      {input.length > 0 ? `${input.length} chars` : "Shift+Enter for new line"}
                    </div>
                  </div>
                </div>
              )}

              {/* Post-result footer */}
              {eligibilityResult && (
                <div className="fade-up" style={{
                  padding: "16px 20px 24px",
                  borderTop: "1px solid rgba(255,255,255,.06)",
                  background: "rgba(255,255,255,.02)",
                  flexShrink: 0,
                }}>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <button
                      className="btn-ghost-teal"
                      style={{ flex: 1 }}
                      onClick={handleReset}
                    >
                      <RefreshCw size={14} /> Start New Screening
                    </button>
                    <button
                      className="btn-teal"
                      style={{ flex: 2 }}
                      onClick={() => alert("Opening consultation booking… (integrate with Module 3: Patient Dashboard)")}
                    >
                      <Stethoscope size={15} />
                      Book Doctor Consultation
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}

/* ── tiny helper used in chat input ── */
function SecurityBadge({ text }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "rgba(255,255,255,.25)" }}>
      <Lock size={10} color="var(--teal-600)" /> {text}
    </div>
  );
}
