import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useinterviewHooks from "../hooks/useinterviewHooks";
import '../style/interview.scss'

const Interview = () => {
  const { interviewId } = useParams();
  const { getReportId, report, loading } = useinterviewHooks();

  const [activeNav, setActiveNav] = useState("technical");

  useEffect(() => {
    if (interviewId) {
      getReportId(interviewId);
    }
  }, [interviewId]);

  const navBar = [
    { id: "technical", label: "Technical Questions" },
    { id: "behavioral", label: "Behavioral Questions" },
    { id: "roadmap", label: "Preparation Plan" },
  ];

  return (
    <main className="interview">
      <div className="interview__container">

        {/* TITLE */}
        <h1 className="interview__title">{report?.title}</h1>

        {/* NAVBAR */}
        <div className="interview__nav">
          <ul>
            {navBar.map((item) => (
              <li
                key={item.id}
                className={activeNav === item.id ? "active" : ""}
                onClick={() => setActiveNav(item.id)}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        {/* CONTENT */}
        <div className="interview__content">

          {/* TECHNICAL */}
          {activeNav === "technical" &&
            report?.technicalQuestions?.map((q, index) => (
              <div className="question-card" key={index}>
                <h3>Q{index + 1}. {q.question}</h3>
                <p><strong>💡 Intention:</strong> {q.intention}</p>
                <p><strong>✅ Answer:</strong> {q.answer}</p>
              </div>
            ))}

          {/* BEHAVIORAL */}
          {activeNav === "behavioral" &&
            report?.behavioralQuestions?.map((q, index) => (
              <div className="question-card" key={index}>
                <h3>Q{index + 1}. {q.question}</h3>
                <p><strong>💡 Intention:</strong> {q.intention}</p>
                <p><strong>✅ Answer:</strong> {q.answer}</p>
              </div>
            ))}

          {/* ROADMAP */}
          {activeNav === "roadmap" &&
            report?.preparationPlan?.map((day) => (
              <div className="roadmap-card" key={day.day}>
                <h3>Day {day.day}: {day.focus}</h3>

                <ul>
                  {day.tasks.map((task, i) => (
                    <li key={i}>• {task}</li>
                  ))}
                </ul>
              </div>
            ))}

        </div>

        {/* SKILL GAPS */}
        <div className="skill-gaps">
          <h2>Skill Gaps</h2>

          <div className="skill-list">
            {report?.skillGaps?.map((skill, i) => (
              <span
                key={i}
                className={`skill-badge ${skill.severity}`}
              >
                {skill.skills}
              </span>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
};

export default Interview;