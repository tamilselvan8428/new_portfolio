import React, { useEffect, useRef } from 'react'
import '../style/About.css'

const About = () => {

  const aboutRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.3 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

  }, []);

  return (
    <div className="about-section">

        <h1 className="about-title">About</h1>

        <div ref={aboutRef} className="about-container hidden">

            <div className='content'>
                <h3>
                I am a passionate Full Stack Developer and Data Analyst with a strong interest in building modern, efficient, and scalable web applications. I enjoy working across the entire development process, from designing clean and user-friendly interfaces to developing robust backend systems and managing databases. I have hands-on experience with technologies such as React, Node.js, Express.js, MongoDB, and MySQL, which I use to build full-stack applications that solve real-world problems.

                Along with software development, I am also interested in data analysis and problem solving, where I work with data to extract meaningful insights and support better decision making. I enjoy analyzing patterns, improving system efficiency, and developing solutions that create real impact. I continuously explore new technologies, improve my programming skills, and work on innovative projects that combine development, data analysis, and modern software practices. My goal is to grow as a skilled developer and contribute to impactful digital solutions and advanced technology-driven applications.
                </h3>
            </div>

            <div className='photo'>
                <img src="my_photo.jpg" alt="My Photo" />
            </div>

        </div>

    </div>
  )
}

export default About