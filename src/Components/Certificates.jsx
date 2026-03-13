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
{ threshold: 0.3 }
);

observer.observe(sliderRef.current);

}, []);

return (
<div className="cert-section">

<h1>My Certificates</h1>

<div className="track">

<div className="line"></div>

<div className="cert-slider" ref={sliderRef}>

{certs.concat(certs).map((cert, index) => (

<div className="cert-card" key={index}>
<img src={cert} alt="certificate"/>
</div>

))}

</div>

</div>

</div>
);
};

export default Certificates;