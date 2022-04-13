//Library Imports
import React, { useState } from "react";

//Style Imports
import "./styles/contact.css";
import RamsStadium from "./styles/RamsStadium.jpg";

export default function ContactForm() {
  const [status, setStatus] = useState("Submit Feedback");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitted");

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
    setStatus("Submit");
    let result = await response.json();
    alert(result.status);
  };
  return (
    <>
      <main>
        <div className="content-container">
          <section className="form-wrapper">
            <form className="form" onSubmit={handleSubmit}>
              {/* User inputs their name */}

              <h1>Contact Us!</h1>

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
          <div className="form-image">
            <img src={RamsStadium} alt="Image of Sofi Stadium" id="stadium" />
          </div>
        </div>
      </main>
    </>
  );
}
