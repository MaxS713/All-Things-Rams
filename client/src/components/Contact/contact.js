//Library Imports
import React, { useState } from "react";

//Style Imports
import "./styles/contact.css";

export default function ContactForm() {
  const [status, setStatus] = useState("Send");
  const [disable, setDisable] = useState(false);
  const [val, setVal] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("Thank You!");
    setDisable(true);
    setVal("");

    const { name, email, subject, message } = event.target.elements;

    let details = {
      name: name.value,
      email: email.value,
      subject: subject.value,
      message: message.value,
    };

    let response = await fetch("http://localhost:5000/api/contact", {
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

                <p id="suggestions">
                  We would love to hear from you about suggestions and changes
                  we can make to improve our site. Feel free to reach out to us
                  and let us know what you think!
                </p>
                <p id="suggest-tag">
                  Suggest a Website, Blog, Podcast or Social Media Account that
                  you would like us to link to.
                </p>

                <div>
                  <input
                    type="text"
                    id="name"
                    value={val}
                    placeholder="Your Name"
                    required
                  />
                </div>

                {/* User inputs their email */}
                <div>
                  <input
                    type="email"
                    id="email"
                    value={val}
                    placeholder="Your Email"
                    required
                  />
                </div>
                {/* User inputs their subject */}
                <div>
                  <input
                    type="text"
                    id="subject"
                    value={val}
                    placeholder="Subject"
                  />
                </div>

                {/* User inputs their message */}
                <div>
                  <textarea
                    id="message"
                    value={val}
                    maxLength={550}
                    placeholder="Share your thoughts"
                    required
                  />
                </div>

                <div className="submit-button">
                  {/* Button to submit message/contact form */}
                  <button
                    id="submit"
                    type="submit"
                    disabled={disable}
                    onSubmit={(handleSubmit, setVal)}
                  >
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
