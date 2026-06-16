import React, { useState } from "react";
import "../style/Projects.css";

const projects = [
  {
    title: "WebScope - AI Powered Web Analyzer",
    description:
      "WebScope is an AI-powered website analysis platform that evaluates websites based on SEO performance, UI/UX quality, and security standards. It scans a given website, generates a detailed score, and provides insights to improve performance, usability, and protection against vulnerabilities. The platform also displays commonly visited websites for quick analysis, helping developers and businesses optimize their sites for better search ranking, user experience, and security.",
    tags: ["React", "Node.js", "AI Integration", "SEO Scanner", "Vulnerability Auditor"],
    github: "https://github.com/tamilselvan8428/website-whisperer.git",
    live: "https://webscope.netlify.app/",
  },
  {
    title: "Vehicle Vista - Smart Vehicle Monitoring",
    description:
      "Vehicle Vista is a vehicle management platform designed for consulting companies that handle vehicle sales for both two-wheelers and four-wheelers. When a vehicle is registered for sale by a consulting company, the system records its details and ownership. If another user attempts to register the same vehicle again, the platform automatically detects the duplicate entry and prevents registration, displaying the consulting company that has already listed the vehicle. This ensures data accuracy, prevents duplicate listings, and helps maintain a trusted vehicle sales management system.",
    tags: ["React", "Express.js", "MongoDB", "MySQL", "Validation System"],
    github: "https://github.com/tamilselvan8428/vehicle-hub.git",
    live: "https://vehiclevista.netlify.app/",
  }
];

const ProjectCard = ({ project }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    // Calculate rotation (-10deg to 10deg)
    const tiltX = (y - 0.5) * -10;
    const tiltY = (x - 0.5) * 10;

    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const tiltStyle = {
    transform: isHovered
      ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.02, 1.02, 1.02)`
      : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    transition: isHovered ? 'none' : 'transform 0.5s ease'
  };

  return (
    <div 
      className="project-card glass-card"
      style={tiltStyle}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="project-card-content">
        <h3>{project.title}</h3>
        
        <div className="project-tags">
          {project.tags.map((tag, i) => (
            <span className="project-tag" key={i}>{tag}</span>
          ))}
        </div>

        <p>{project.description}</p>

        <div className="project-buttons">
          <a href={project.github} target="_blank" rel="noreferrer" className="btn-github">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24" style={{marginRight: '8px', verticalAlign: 'middle'}}>
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </a>

          <a href={project.live} target="_blank" rel="noreferrer" className="btn-live">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24" style={{marginRight: '8px', verticalAlign: 'middle'}}>
              <path d="M12 2c5.522 0 10 4.477 10 10s-4.478 10-10 10-10-4.478-10-10 4.478-10 10-10zm0-2c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm2 12h-4v-4h-2v6h6v-2z"/>
            </svg>
            Live Demo
          </a>
        </div>
      </div>
    </div>
  );
};

const Projects = () => {
  return (
    <section className="projects-section">
      <h2 className="section-title">My Projects</h2>

      <div className="projects-container">
        {projects.map((project, index) => (
          <ProjectCard project={project} key={index} />
        ))}
      </div>
    </section>
  );
};

export default Projects;