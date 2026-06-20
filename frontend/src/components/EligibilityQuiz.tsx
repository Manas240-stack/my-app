import { useState } from "react";
import "./EligibilityQuiz.css";

const questions = [
  "What is your age?",
  "What is your current weight?",
  "Do you have diabetes?"
];

export default function EligibilityQuiz() {
  const [step, setStep] = useState(0);

  return (
    <div className="quiz-page">
      <div className="quiz-card">
        <h1>Metabolic Assessment</h1>

        <h2>{questions[step]}</h2>

        <input placeholder="Enter answer" />

        <button
          onClick={() =>
            setStep(Math.min(step + 1, questions.length - 1))
          }
        >
          Continue
        </button>
      </div>
    </div>
  );
}
