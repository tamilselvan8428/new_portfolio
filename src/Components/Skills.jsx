import React, { useEffect, useState, useRef } from "react";
import "../style/Skills.css";

const SkillCircle = ({ skill, percentage, visible }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!visible) return;

    let start = 0;
    const interval = setInterval(() => {
      start++;
      if (start >= percentage) {
        start = percentage;
        clearInterval(interval);
      }
      setProgress(start);
    }, 25);

    return () => clearInterval(interval);
  }, [percentage, visible]);

  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className={`skill-card ${visible ? "show" : ""}`}>
      <svg width="150" height="150">
        <circle className="bg" cx="75" cy="75" r={radius} strokeWidth="10" />
        <circle
          className="progress"
          cx="75"
          cy="75"
          r={radius}
          strokeWidth="10"
          style={{ strokeDashoffset: offset }}
        />
      </svg>

      <div className="percentage">{progress}%</div>
      <h3>{skill}</h3>
    </div>
  );
};

const Skills = () => {
  const [visible, setVisible] = useState(false);
  const skillRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (skillRef.current) {
      observer.observe(skillRef.current);
    }
  }, []);

  return (
     <div id="skills" ref={skillRef} className="skills-container">
      <h1>My Skills</h1>

      <div className="skills-grid">
        <SkillCircle skill="React.js" percentage={85} visible={visible} />
        <SkillCircle skill="Node.js" percentage={80} visible={visible} />
        <SkillCircle skill="MongoDB" percentage={82} visible={visible} />
        <SkillCircle skill="MySQL" percentage={75} visible={visible} />
        <SkillCircle skill="Data Analysis" percentage={70} visible={visible} />
      </div>
    </div>
  );
};

export default Skills;