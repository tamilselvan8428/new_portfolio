import React, { useEffect, useRef, useState } from 'react';
import '../style/About.css';

const About = () => {
  const aboutRef = useRef(null);
  
  // 3D Tilt State
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    // Calculate rotation (-15deg to 15deg)
    const tiltX = (y - 0.5) * -15;
    const tiltY = (x - 0.5) * 15;
    
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
      ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.05, 1.05, 1.05)`
      : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
    transition: isHovered ? 'none' : 'transform 0.5s ease'
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.2 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }
  }, []);

  return (
    <section className="about-section">
      <h2 className="section-title">About Me</h2>

      <div ref={aboutRef} className="about-container hidden glass-card">
        <div className="content">
          <p>
            I am a passionate <strong>Full Stack Developer</strong> and <strong>Data Analyst</strong> with a strong interest in building modern, efficient, and scalable web applications. I enjoy working across the entire development process, from designing clean and user-friendly interfaces to developing robust backend systems and managing databases. I have hands-on experience with technologies such as React, Node.js, Express.js, MongoDB, and MySQL, which I use to build full-stack applications that solve real-world problems.
          </p>
          <p>
            Along with software development, I am also interested in data analysis and problem solving, where I work with data to extract meaningful insights and support better decision making. I enjoy analyzing patterns, improving system efficiency, and developing solutions that create real impact. I continuously explore new technologies, improve my programming skills, and work on innovative projects that combine development, data analysis, and modern software practices. My goal is to grow as a skilled developer and contribute to impactful digital solutions and advanced technology-driven applications.
          </p>
        </div>

        <div 
          className="photo-card" 
          style={tiltStyle}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="photo-inner">
            <img src="my_photo.jpg" alt="Tamilselvan M" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;