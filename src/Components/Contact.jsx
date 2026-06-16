import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "../style/Contact.css";

// Initialize EmailJS
emailjs.init("PVvjgTLofvDoeyXeC");

const Contact = () => {
  const form = useRef();
  const [showMessage, setShowMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    const formData = new FormData(form.current);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    if (!name || !email || !message) {
      alert("Please fill in all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    setLoading(true);

    const templateParams = {
      from_name: name,
      from_email: email,
      message: message,
      to_name: "Tamil Selvan",
      reply_to: email
    };

    emailjs.send(
      "service_cun6ctp",
      "template_v3hxkgp",
      templateParams
    )
    .then((response) => {
      setLoading(false);
      setShowMessage(true);
      form.current.reset();

      setTimeout(() => {
        setShowMessage(false);
      }, 4000);
    })
    .catch((error) => {
      setLoading(false);
      console.error("EmailJS Error:", error);
  
      if (error.text && error.text.includes('Invalid grant')) {
        alert("Email service needs reconnection. Please contact me directly at tamilselvan24650@gmail.com");
      } else if (error.text && error.text.includes('template')) {
        alert("Email template error. Please try again later.");
      } else {
        alert("Failed to send message. Please try again later.");
      }
    });
  };

  return (
    <section className="contact-section">
      <h2 className="section-title">Contact Me</h2>

      <div className="contact-container">
        
        {/* Left Side: Contact Information */}
        <div className="contact-left">
          <h3>Let's Create Something Great</h3>
          <p className="contact-desc">
            I'm always open to discussing new projects, database solutions, full-stack application development, or data analytics projects. Reach out and let's talk!
          </p>

          <div className="contact-cards">
            
            <a href="mailto:tamilselvan24650@gmail.com" className="contact-card-item glass-card">
              <div className="card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div className="card-info">
                <h4>Email Me</h4>
                <p>tamilselvan24650@gmail.com</p>
              </div>
            </a>

            <a href="https://linkedin.com/in/ts-m" target="_blank" rel="noreferrer" className="contact-card-item glass-card">
              <div className="card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </div>
              <div className="card-info">
                <h4>LinkedIn</h4>
                <p>linkedin.com/in/ts-m</p>
              </div>
            </a>

            <a href="https://github.com/tamilselvan8428" target="_blank" rel="noreferrer" className="contact-card-item glass-card">
              <div className="card-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
                </svg>
              </div>
              <div className="card-info">
                <h4>GitHub</h4>
                <p>github.com/tamilselvan8428</p>
              </div>
            </a>

          </div>
        </div>

        {/* Right Side: Form */}
        <div className="contact-right">
          <form ref={form} onSubmit={sendEmail} className="glass-card">
            <div className="form-group">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                required
              />
            </div>

            <div className="form-group">
              <textarea
                name="message"
                placeholder="Your Message"
                required
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

      </div>

      {/* Success Popup */}
      {showMessage && (
        <div className="success-popup">
          <div className="success-box glass-card">
            <div className="success-checkmark">✔</div>
            <h2>Message Sent!</h2>
            <p>Thank you for reaching out. I'll get back to you as soon as possible.</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;