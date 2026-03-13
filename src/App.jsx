import './App.css'
import Home from './Components/Home'
import Navbar from './Components/Navbar'
import About from './Components/About'
import Skills from './Components/Skills'
import Certificates from './Components/Certificates'
import Projects from './Components/Projects'
import Contact from './Components/Contact'
function App() {  

  return (
    <>
      <Navbar/>
    <div id="home">
      <Home/>
      </div>
      <div id="about">
      <About/>
      </div>
      <div id="skills">
        <Skills/>
        </div>
       <div id="certificates">
        <Certificates/>
       </div>
       <div id="projects">
        <Projects/>
       </div>
       <div id="contact">
        <Contact/>
       </div>
      </>
  )
}

export default App
