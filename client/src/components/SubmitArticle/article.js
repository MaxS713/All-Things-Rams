//Library Imports
import React, { useState } from "react";

//Style Imports
import "./styles/article.css";

export default function SubmitForm() {
  const [status, setStatus] = useState("Submit");
  const [disable, setDisable] = useState(false);
  const [val, setVal] = useState();
  const [file, setFile] = useState(null);

  function handleChange(event) {
    setFile(event.target.files[0]);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("Submitted!");
    setDisable(true);
    setVal("");

    const { name, email, phone } = event.target.elements;

    const data = new FormData();
    data.append("name", name.value);
    data.append("phone", phone.value);
    data.append("email", email.value);
    data.append("file", file);
    console.log(...data);
    let response = await fetch("api/submit", {
      method: "POST",
      body: data,
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
            <section className="article-wrapper">
              <div id="submission-instructions">
                <h1 id="article-title">Submit an Article for Publication!</h1>
                <p>
                  All Things Rams encourages new submissions from all Rams fans.
                  Maybe you are an aspiring journalist looking to get published
                  and begin your sports communication career. Maybe you are
                  student who wrote an excellent paper on the L.A. Rams or an
                  L.A. Rams player or coach for a class that you took. Maybe you
                  just have a good idea or something to say about the L.A. Rams
                  and you looking for the right forum to do so.
                </p>
                <p>
                  We invite new submissions of original work that we will
                  review, and if accepted, we will publish that article on our
                  website. To start this process, we ask you to do the
                  following. Put your article in a WORD doc and a PDF. Send both
                  the WORD doc and the PDF to us. We will review your
                  submission. Upon review, we will inform you of the following
                  (1) either we are not able to publish your article; (2) we
                  might ask you if you are willing to revise and resubmit your
                  article given our comments on it; or (3) we will ask you if we
                  could publish it. If we ask you that we can publish it, we
                  will likely seek more information from you just to verify that
                  the article is your original contribution and properly cited
                  if needed. All of our contact will be done by email. That's
                  it! We welcome all submissions. Send us article to review
                  using form below!
                </p>
                {/* Working on styling here */}
                <h3 id="send-submission">
                  Send us your submissions at:  
                </h3>
                <p id="submission-email">allthingsrams.official@gmail.com</p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}

//  {/* <form className="article-form" onSubmit={handleSubmit}>
//       {/* User inputs their name */}
//       <div>
//         <input
//           type="text"
//           id="name"
//           value={val}
//           placeholder="Your Name"
//           required
//         />
//       </div>

//       {/* User inputs their phone */}
//       <div>
//         <input
//           type="text"
//           id="phone"
//           value={val}
//           placeholder="Phone Number"
//           required
//         />
//       </div>
//       {/* User inputs their email */}
//       <div>
//         <input
//           type="email"
//           id="email"
//           value={val}
//           placeholder="Your Email"
//           required
//         />
//       </div>

//       {/* User attaches their document */}
//       <div>
//         <input
//           type="file"
//           id="attachment"
//           accept=".doc, .docx, .pdf"
//           calue={file}
//           disabled={disable}
//           onChange={handleChange}
//           required
//         />
//       </div>

//       <div className="article-submit-button">
//         {/* Button to submit message/contact form */}
//         <button
//           id="article-submit"
//           type="submit"
//           disabled={disable}
//           onSubmit={(handleSubmit, setVal)}
//         >
//           {status}
//         </button>
//       </div>
//     </form> */}
