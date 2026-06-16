import React, { useState } from 'react';
import '../style/Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleScroll = (sectionId) => {
    setIsOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = document.querySelector('.navbar').offsetHeight;
      const elementPosition = element.offsetTop - navHeight - 10;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className='navbar'>
      <div className='nav-container'>
        <div className='nav-logo' onClick={() => handleScroll('home')}>
          <span>Tamil</span>Selvan
        </div>

        <div className={`menu-icon ${isOpen ? 'open' : ''}`} onClick={() => setIsOpen(!isOpen)}>
          <span className="bar1"></span>
          <span className="bar2"></span>
          <span className="bar3"></span>
        </div>

        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          <li><a href="#home" onClick={(e)=>{e.preventDefault();handleScroll('home')}}>Home</a></li>
          <li><a href="#about" onClick={(e)=>{e.preventDefault();handleScroll('about')}}>About Me</a></li>
          <li><a href="#skills" onClick={(e)=>{e.preventDefault();handleScroll('skills')}}>Skills</a></li>
          <li><a href="#certificates" onClick={(e)=>{e.preventDefault();handleScroll('certificates')}}>Certificates</a></li>
          <li><a href="#projects" onClick={(e)=>{e.preventDefault();handleScroll('projects')}}>Projects</a></li>
          <li><a href="#contact" onClick={(e)=>{e.preventDefault();handleScroll('contact')}}>Contact</a></li>
          <li>
            <a href="/resume.pdf" download className="cv-btn">
              Download Resume
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;