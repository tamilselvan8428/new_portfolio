import React from 'react'
import '../style/Navbar.css'

const Navbar = () => {

  const handleScroll = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = document.querySelector('.navbar').offsetHeight;
      const elementPosition = element.offsetTop - navHeight - 20;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav className='navbar'>
      <div className='nav-container'>

        <div className='nav-logo'>Portfolio</div>

        <ul className='nav-menu'>
          <li><a href="#home" onClick={(e)=>{e.preventDefault();handleScroll('home')}}>Home</a></li>
          <li><a href="#about" onClick={(e)=>{e.preventDefault();handleScroll('about')}}>About Me</a></li>
          <li><a href="#skills" onClick={(e)=>{e.preventDefault();handleScroll('skills')}}>Skills</a></li>
          <li><a href="#certificates" onClick={(e)=>{e.preventDefault();handleScroll('certificates')}}>Certificates</a></li>
          <li><a href="#projects" onClick={(e)=>{e.preventDefault();handleScroll('projects')}}>Projects</a></li>

          <li>
            <a href="/cv.pdf" download className="cv-btn">
              Download Resume
            </a>
          </li>

        </ul>

      </div>
    </nav>
  )
}

export default Navbar