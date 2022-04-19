//Library Imports
import React, { useState } from "react";

//Style Imports
import "./styles/terms+privacy.css";

export default function Privacy() {
  return (
    <>
      <div id="tp-wrapper">
        <div id="tp-title-wrapper">
          <h2 id="tp-title">Privacy Policy</h2>
        </div>
        <section id="tp-section">
          <p className="tp-content">
            Your privacy is important to us. It is AllThingsRams's policy to respect
            your privacy regarding any information we may collect from you
            across our website, www.AllThingsRams.com, and other sites we own and
            operate.
          </p>
          <p className="tp-content">
            We only ask for personal information when we truly need it to
            provide a service to you. We collect it by fair and lawful means,
            with your knowledge and consent. We also let you know why we’re
            collecting it and how it will be used.
          </p>
          <p className="tp-content">
            We only retain collected information for as long as necessary to
            provide you with your requested service. What data we store, we’ll
            protect within commercially acceptable means to prevent loss and
            theft, as well as unauthorized access, disclosure, copying, use or
            modification.
          </p>
          <p className="tp-content">
            We don’t share any personally identifying information publicly or
            with third-parties, except when required to by law.
          </p>
          <p className="tp-content">
            Our website may link to external sites that are not operated by us.
            Please be aware that we have no control over the content and
            practices of these sites, and cannot accept responsibility or
            liability for their respective privacy policies.
          </p>
          <p className="tp-content">
            You are free to refuse our request for your personal information,
            with the understanding that we may be unable to provide you with
            some of your desired services.
          </p>
          <p className="tp-content">
            Your continued use of our website will be regarded as acceptance of
            our practices around privacy and personal information. If you have
            any questions about how we handle user data and personal
            information, feel free to contact us.
          </p>
          <p className="tp-content">This policy is effective as of 2022.</p>
        </section>
      </div>
    </>
  );
}
