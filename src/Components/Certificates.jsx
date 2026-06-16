import React, { useEffect, useRef } from "react";
import "../style/Certificates.css";

const Certificates = () => {
  const certs = [
    "c.png",
    "css.png",
    "java.png",
    "js.png",
    "linguaskill.png",
    "srm.png",
    "product.png",
    "linkedin.png"
  ];

  const sliderRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if(entry.isIntersecting){
            sliderRef.current.classList.add("start-scroll");
          }else{
            sliderRef.current.classList.remove("start-scroll");
          }
        });
      },
      { threshold: 0.2 }
    );

    if(sliderRef.current){
      observer.observe(sliderRef.current);
    }

    return () => {
      if(sliderRef.current){
        observer.unobserve(sliderRef.current);
      }
    };
  }, []);

  return (
    <section className="cert-section">
      <h2 className="section-title">My Certificates</h2>
      
      <p className="cert-subtitle">A collection of my professional certifications and academic achievements</p>

      <div className="track">
        <div className="line"></div>

        <div className="cert-slider" ref={sliderRef}>
          
          <div className="cert-slide-track">
            {certs.map((cert, index) => (
              <div className="cert-card" key={index}>
                <div className="cert-card-inner">
                  <img src={cert} alt={`Certificate ${index + 1}`}/>
                </div>
              </div>
            ))}
          </div>

          <div className="cert-slide-track" aria-hidden="true">
            {certs.map((cert, index) => (
              <div className="cert-card" key={`dup-${index}`}>
                <div className="cert-card-inner">
                  <img src={cert} alt={`Certificate ${index + 1}`}/>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Certificates;