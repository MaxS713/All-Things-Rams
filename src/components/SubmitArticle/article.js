//Library Imports
import React, { useState } from "react";

//Style Imports
import "./styles/article.css";

export default function SubmitForm() {
  const [status, setStatus] = useState("Send");
  const [disable, setDisable] = useState(false);
  const [val, setVal] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("Submitted!");
    setDisable(true);
    setVal("");

    const { name, email, attachment } = event.target.elements;

    let details = {
      name: name.value,
      email: email.value,
      attachment: attachment.value,
    };

    let response = await fetch("http://localhost:5000/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(details),
    });
    setStatus("Submitted!");
    let result = await response.json();
    alert(result.status);
  };

  return (
    <>
      <main>
        <div id="outside-article-wrapper">
          <div className="article-container">
            <h1 id="article-title">Submit an Article for Review!</h1>
            <section className="article-wrapper">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>

              <form className="article" onSubmit={handleSubmit}>
                {/* User inputs their name */}

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

                <div>
                  <input
                    type="file"
                    id="attachment"
                    value={val}
                    placeholder="Your Attachment"
                    required
                  />
                </div>

                <div className="article-submit-button">
                  {/* Button to submit message/contact form */}
                  <button
                    id="article-submit"
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
