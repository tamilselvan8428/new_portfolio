import React, { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import "../style/Skills.css";

const skillsData = [
  { name: "React.js", percentage: 85 },
  { name: "Node.js", percentage: 80 },
  { name: "MongoDB", percentage: 82 },
  { name: "MySQL", percentage: 75 },
  { name: "Data Analysis", percentage: 70 },
  { name: "JavaScript", percentage: 90 },
  { name: "Python", percentage: 75 },
  { name: "Express.js", percentage: 85 },
  { name: "Git & GitHub", percentage: 88 },
  { name: "REST APIs", percentage: 85 }
];

const SkillBar = ({ name, percentage, visible }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const interval = setInterval(() => {
      start++;
      if (start >= percentage) {
        start = percentage;
        clearInterval(interval);
      }
      setProgress(start);
    }, 15);
    return () => clearInterval(interval);
  }, [visible, percentage]);

  return (
    <div className="skill-bar-card glass-card">
      <div className="skill-bar-info">
        <span className="skill-bar-name">{name}</span>
        <span className="skill-bar-percentage">{progress}%</span>
      </div>
      <div className="skill-bar-track">
        <div 
          className="skill-bar-fill" 
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

const Skills = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
  }, []);

  // 3D Tag Cloud Simulation
  useEffect(() => {
    if (!canvasRef.current) return;

    const width = 450;
    const height = 450;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 180;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const radius = 68;
    const sprites = [];
    const sphereGroup = new THREE.Group();
    scene.add(sphereGroup);

    // Create text texture
    const createTextTexture = (text) => {
      const canvas = document.createElement("canvas");
      canvas.width = 256;
      canvas.height = 64;
      const ctx = canvas.getContext("2d");

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Rounded rect background for the bubble
      ctx.fillStyle = "rgba(18, 12, 43, 0.75)";
      ctx.beginPath();
      ctx.roundRect ? ctx.roundRect(4, 4, 248, 56, 12) : ctx.rect(4, 4, 248, 56);
      ctx.fill();

      // Border glow
      ctx.strokeStyle = "rgba(0, 242, 255, 0.5)";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Text drawing
      ctx.font = "bold 23px Outfit, Inter, sans-serif";
      ctx.fillStyle = "#ffffff";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, canvas.width / 2, canvas.height / 2);

      return new THREE.CanvasTexture(canvas);
    };

    // Distribute skills in Fibonacci Sphere
    const count = skillsData.length;
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;

      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);

      const texture = createTextTexture(skillsData[i].name);
      const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 0.9
      });

      const sprite = new THREE.Sprite(material);
      sprite.position.set(x, y, z);
      sprite.scale.set(45, 11, 1);
      
      sphereGroup.add(sprite);
      sprites.push(sprite);
    }

    // Add mouse velocity interactivity
    let mouseX = 0;
    let mouseY = 0;
    let targetSpeedX = 0.004;
    let targetSpeedY = 0.004;
    let currentSpeedX = 0.004;
    let currentSpeedY = 0.004;

    const handleMouseMove = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const x = e.clientX - rect.left - width / 2;
      const y = e.clientY - rect.top - height / 2;
      targetSpeedX = x * 0.00008;
      targetSpeedY = y * 0.00008;
    };

    const canvasElement = canvasRef.current;
    canvasElement.addEventListener("mousemove", handleMouseMove);

    // Animation
    let animationFrameId;
    const animate = () => {
      currentSpeedX += (targetSpeedX - currentSpeedX) * 0.05;
      currentSpeedY += (targetSpeedY - currentSpeedY) * 0.05;

      sphereGroup.rotation.y += currentSpeedX;
      sphereGroup.rotation.x += currentSpeedY;

      // Adjust opacity and scale of sprites in the background (depth cues)
      sprites.forEach(sprite => {
        const vector = new THREE.Vector3();
        sprite.getWorldPosition(vector);
        const opacity = (vector.z + radius) / (2 * radius) * 0.6 + 0.4;
        sprite.material.opacity = opacity;
        
        const scaleMultiplier = (vector.z + radius) / (2 * radius) * 0.35 + 0.8;
        sprite.scale.set(45 * scaleMultiplier, 11 * scaleMultiplier, 1);
      });

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      canvasElement.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      sprites.forEach(sprite => {
        sprite.material.map.dispose();
        sprite.material.dispose();
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div id="skills" ref={containerRef} className="skills-section">
      <h2 className="section-title">My Skills</h2>

      <div className="skills-container">
        
        {/* Left Side: 3D Interactive Tag Cloud */}
        <div className="skills-left">
          <canvas ref={canvasRef} className="skills-3d-canvas" />
        </div>

        {/* Right Side: Skill progress bars */}
        <div className="skills-right">
          {skillsData.map((skill, idx) => (
            <SkillBar 
              key={idx} 
              name={skill.name} 
              percentage={skill.percentage} 
              visible={visible} 
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default Skills;