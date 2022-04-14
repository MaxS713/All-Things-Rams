//Library Imports
import React, { useState } from "react";

//Style Imports
import "./styles/contact.css";

export default function ContactForm() {
  const [status, setStatus] = useState("Send");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Thank You!");

    const { name, email, subject, message } = e.target.elements;

    let details = {
      name: name.value,
      email: email.value,
      message: message.value,
    };

    let response = await fetch("http://localhost:5000/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(details),
    });
    setStatus("Thank You!");
    let result = await response.json();
    alert(result.status);
  };
  return (
    <>
      <main>
        <div id="mega-wrapper">
        <div className="form-container">
          <section className="form-wrapper">
            <form className="form" onSubmit={handleSubmit}>
              {/* User inputs their name */}

              <h1 id="contact">Contact Us!</h1>

              <div>
                <input type="text" id="name" placeholder="Your Name" required />
              </div>

              {/* User inputs their email */}
              <div>
                <input
                  type="email"
                  id="email"
                  placeholder="Your Email"
                  required
                />
              </div>
              {/* User inputs their subject */}
              <div>
                <input type="text" id="subject" placeholder="Subject" />
              </div>

              {/* User inputs their message */}
              <div>
                <textarea
                  id="message"
                  maxLength={550}
                  placeholder="Share your thoughts"
                  required
                />
              </div>

              <div className="submit-button">
                {/* Button to submit message/contact form */}
                <button id="submit" type="submit">
                  {status}
                </button>
              </div>
            </form>
          </section>
        </div>
        </div>
      </main>
    </>
  );
}
