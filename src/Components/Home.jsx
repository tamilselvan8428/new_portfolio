import React, { useEffect, useRef, useState } from "react";
import { animate, stagger, splitText } from "https://esm.sh/animejs";
import * as THREE from "three";
import GLOBE from "vanta/dist/vanta.globe.min";
import "../style/Home.css";

const roles = [
  "Full Stack Developer",
  "Data Analytics",
  "Freelance Web Developer"
];

const Home = () => {

  const vantaRef = useRef(null);

  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);

  // NAME ANIMATION
  useEffect(() => {

    const { chars } = splitText(".name", {
      chars: { wrap: true }
    });

    animate(chars, {
      y: ["100%", "0%"],
      opacity: [1, 1],
      duration: 800,
      delay: stagger(60),
      ease: "out(3)"
    });

  }, []);

  // TYPING EFFECT
  useEffect(() => {

    const currentWord = roles[index];

    if (charIndex < currentWord.length) {

      const timeout = setTimeout(() => {
        setText(prev => prev + currentWord[charIndex]);
        setCharIndex(charIndex + 1);
      }, 100);

      return () => clearTimeout(timeout);

    } else {

      setTimeout(() => {
        setText("");
        setCharIndex(0);
        setIndex((index + 1) % roles.length);
      }, 1500);

    }

  }, [charIndex, index]);

  // VANTA BACKGROUND
  useEffect(() => {

    const vantaEffect = GLOBE({
      el: vantaRef.current,
      THREE: THREE,
      mouseControls: true,
      touchControls: true,
      scale: 1,
      scaleMobile: 1
    });

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };

  }, []);

  return (
    <div ref={vantaRef} className="hero">

      <div className="hero-content">

        <h1 className="name">I am Tamilselvan</h1>

        <p className="title">
          {text}
          <span className="cursor">|</span>
        </p>

      </div>

    </div>
  );
};

export default Home;