import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "../style/Contact.css";

const Contact = () => {

const form = useRef();
const [showMessage, setShowMessage] = useState(false);

const sendEmail = (e) => {
e.preventDefault();

emailjs.sendForm(
"service_cun6ctp",
"template_v3hxkgp",
form.current,
"PVvjgTLofvDoeyXeC"
)
.then(() => {

setShowMessage(true);   // show success message
e.target.reset();

setTimeout(() => {
setShowMessage(false);  // auto hide after 4 sec
}, 4000);

})
.catch(() => {
alert("Message Failed");
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

<input
type="hidden"
name="time"
value={new Date().toLocaleString()}
/>

<button type="submit">
Send Message
</button>

</form>


{/* Success Message */}

{showMessage && (
<div className="success-popup">
<div className="success-box">
<h2>✔ Message Sent !!</h2>
<p>Thank you for contacting me.<br/>I will reach you soon.</p>
</div>
</div>
)}


{/* Contact Links */}

<div className="contact-links">

<h3>Connect With Me</h3>

<a href="mailto:tamilselvan24650@gmail.com">📧 Send Email</a>

<a href="https://github.com/tamilselvan8428" target="_blank" rel="noreferrer">
💻 GitHub
</a>

<a href="https://linkedin.com/in/ts-m" target="_blank" rel="noreferrer">
🔗 LinkedIn
</a>

<a href="https://wa.me/918428863860" target="_blank" rel="noreferrer">
💬 WhatsApp
</a>

</div>

</div>

);

};

export default Contact;