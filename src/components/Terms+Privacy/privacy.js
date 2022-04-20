//Library Imports
import React, { useState } from "react";

//Style Imports
import "./styles/terms+privacy.css";

export default function Privacy() {
  function getEffectiveYear() {
    let startYear = 2022;
    let currentYear = new Date().getFullYear();
    if (startYear !== currentYear) {
      return startYear + " - " + currentYear;
    } else {
      return currentYear;
    }
  }

  return (
    <>
      <div id="tp-wrapper">
        <div id="tp-title-wrapper">
          <h2 id="tp-title">Privacy Policy</h2>
        </div>
        <section id="tp-section">
          <p className="tp-content">
            Your privacy is important to us. It is All Things Rams policy to
            respect your privacy regarding any information we may collect from
            you across our website, www.allthingsrams.com, and other sites we
            own and operate, if any.
          </p>
          <p className="tp-content">
            We only ask for personal information when we need it to provide a
            service to you or when you consent to give it to us in order to
            receive information from us or have us provide a service to you. We
            collect it by fair and lawful means, with your knowledge and
            consent. By providing us with your information and visiting our
            website you consent to our use of your information, solely for
            business reasons.
          </p>
          <p className="tp-content">
            We only retain collected information for as long as necessary to
            provide you with your requested service. What data we store, we’ll
            protect within commercially acceptable means to prevent loss and
            theft, as well as unauthorized access, disclosure, copying, use or
            modification.
          </p>
          <p className="tp-content">
            We don’t share any personally identifying information publicly,
            except when required to by law.
          </p>
          <p className="tp-content">
            Please be aware that our website links to external sites that are
            not operated by us. Please be aware that we have no control over the
            content and practices of those sites, and cannot accept
            responsibility or liability for those websites or their respective
            privacy policies. You understand that many of the links that you
            utilize are not owned by us and thus we do not control their privacy
            policies.
          </p>
          <p className="tp-content">
            You are free to refuse our request for your personal information at
            any time, with the understanding that we may be unable to provide
            you with some of your desired services.
          </p>
          <p className="tp-content">
            Your use, and continued use, of our website will be regarded as
            acceptance of our practices around privacy and personal information.
            If you have any questions about how we handle user data and personal
            information, feel free to contact us..
          </p>
          <p className="tp-content">
            This policy is effective as of {getEffectiveYear()} .
          </p>
        </section>
      </div>
    </>
  );
}
