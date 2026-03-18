import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "../style/Contact.css";

// Initialize EmailJS
emailjs.init("PVvjgTLofvDoeyXeC");

const Contact = () => {
  const form = useRef();
  const [showMessage, setShowMessage] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(form.current);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    // Validate form data
    if (!name || !email || !message) {
      alert("Please fill in all fields");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    // Prepare email data
    const templateParams = {
      from_name: name,
      from_email: email,
      message: message,
      to_name: "Tamil Selvan",
      reply_to: email
    };

    console.log("Sending email with params:", templateParams);

    emailjs.send(
      "service_cun6ctp",
      "template_v3hxkgp",
      templateParams
    )
    .then((response) => {
      console.log("EmailJS Success:", response);
      setShowMessage(true);
      form.current.reset();

      setTimeout(() => {
        setShowMessage(false);
      }, 4000);
    })
    .catch((error) => {
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
    <div className="contact-section">
      <h1>Contact Me</h1>

      <form ref={form} onSubmit={sendEmail}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
        />

        <textarea
          name="message"
          placeholder="Your Message"
          required
        />

        <button type="submit">
          Send Message
        </button>
      </form>

      {/* Success Message */}
      {showMessage && (
        <div className="success-popup">
          <div className="success-box">
            <h2>✔ Message Sent!</h2>
            <p>Thank you for contacting me.<br/>I will reach you soon.</p>
          </div>
        </div>
      )}
    </div>
  );

};

export default Contact;