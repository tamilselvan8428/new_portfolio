import React from "react";
import "../style/Projects.css";

const projects = [
{
  title: "WebScope - AI Powered Web Analyzer",
  description:
    "WebScope is an AI-powered website analysis platform that evaluates websites based on SEO performance, UI/UX quality, and security standards. It scans a given website, generates a detailed score, and provides insights to improve performance, usability, and protection against vulnerabilities. The platform also displays commonly visited websites for quick analysis, helping developers and businesses optimize their sites for better search ranking, user experience, and security.",
  github: "https://github.com/tamilselvan8428/website-whisperer.git",
  live: "https://webscope.netlify.app/",
},
{
  title: "Vehicle Vista - Smart Vehicle Monitoring System",
  description:
    "Vehicle Vista is a vehicle management platform designed for consulting companies that handle vehicle sales for both two-wheelers and four-wheelers. When a vehicle is registered for sale by a consulting company, the system records its details and ownership. If another user attempts to register the same vehicle again, the platform automatically detects the duplicate entry and prevents registration, displaying the consulting company that has already listed the vehicle. This ensures data accuracy, prevents duplicate listings, and helps maintain a trusted vehicle sales management system.",
  github: "https://github.com/tamilselvan8428/vehicle-hub.git",
  live: "https://vehiclevista.netlify.app/",
}
];

const Projects = () => {
  return (
    <section className="projects-section">
      <h2 className="projects-title">My Projects</h2>

      <div className="projects-container">
        {projects.map((project, index) => (
          <div className="project-card" key={index}>
            <h3>{project.title}</h3>

            <p>{project.description}</p>

            <div className="project-buttons">
              <a href={project.github} target="_blank" rel="noreferrer">
                GitHub
              </a>

              <a href={project.live} target="_blank" rel="noreferrer">
                Live Demo
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;