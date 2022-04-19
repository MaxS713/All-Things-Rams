//Library Imports
import React, { useState } from "react";

//Style Imports
import "./styles/terms+privacy.css";

export default function Terms() {
  return (
    <>
      <div id="tp-wrapper">
        <div id="tp-title-wrapper">
          <h2 id="tp-title">Terms of Use</h2>
        </div>
        <section id="tp-section">
          <p className="tp-content">
            By accessing the website at www.AllThingsRams.com, you are agreeing
            to be bound by these terms of service, all applicable laws and
            regulations, and agree that you are responsible for compliance with
            any applicable local laws. If you do not agree with any of these
            terms, you are prohibited from using or accessing this site. The
            materials contained in this website are protected by applicable
            copyright and trademark law.
          </p>
          <h3 className="tp-subtitle">Use License</h3>
          <p className="tp-content">
            Permission is granted to temporarily download one copy of the
            materials (information or software) on www.AllThingsRams.com for
            personal, non-commercial transitory viewing only. This is the grant
            of a license, not a transfer of title, and under this license you
            may not:
          </p>
          <ol id="tp-list">
            <li className="tp-list-item">modify or copy the materials;</li>
            <li className="tp-list-item">
              use the materials for any commercial purpose, or for any public
              display (commercial or non-commercial);{" "}
            </li>
            <li className="tp-list-item">
              attempt to decompile or reverse engineer any software contained on
              www.AllThingsRams.com;{" "}
            </li>
            <li className="tp-list-item">
              remove any copyright or other proprietary notations from the
              materials; or{" "}
            </li>
            <li className="tp-list-item">
              transfer the materials to another person or "mirror" the materials
              on any other server.
            </li>
          </ol>
          <p className="tp-content">
            This license shall automatically terminate if you violate any of
            these restrictions and may be terminated by AllThingsRams at any
            time. Upon terminating your viewing of these materials or upon the
            termination of this license, you must destroy any downloaded
            materials in your possession whether in electronic or printed
            format.
          </p>
          <h3 className="tp-subtitle">Disclaimer</h3>
          <p className="tp-content">
            The materials on www.AllThingsRams.com are provided on an 'as is'
            basis. AllThingsRams makes no warranties, expressed or implied, and
            hereby disclaims and negates all other warranties including, without
            limitation, implied warranties or conditions of merchantability,
            fitness for a particular purpose, or non-infringement of
            intellectual property or other violation of rights. Further,
            AllThingsRams does not warrant or make any representations
            concerning the accuracy, likely results, or reliability of the use
            of the materials on its website or otherwise relating to such
            materials or on any sites linked to this site.
          </p>
          <h3 className="tp-subtitle">Limitations</h3>
          <p className="tp-content">
            In no event shall AllThingsRams or its suppliers be liable for any
            damages (including, without limitation, damages for loss of data or
            profit, or due to business interruption) arising out of the use or
            inability to use the materials on www.AllThingsRams.com, even if
            AllThingsRams or a AllThingsRams authorized representative has been
            notified orally or in writing of the possibility of such damage.
            Because some jurisdictions do not allow limitations on implied
            warranties, or limitations of liability for consequential or
            incidental damages, these limitations may not apply to you.
          </p>
          <h3 className="tp-subtitle">Accuracy of materials</h3>
          <p className="tp-content">
            The materials appearing on www.AllThingsRams.com could include
            technical, typographical, or photographic errors. AllThingsRams does
            not warrant that any of the materials on its website are accurate,
            complete or current. AllThingsRams may make changes to the materials
            contained on its website at any time without notice. However
            AllThingsRams does not make any commitment to update the materials.
          </p>
          <h3 className="tp-subtitle">Links</h3>
          <p className="tp-content">
            AllThingsRams Packernet has not reviewed all of the sites linked to
            its website and is not responsible for the contents of any such
            linked site. The inclusion of any link does not imply endorsement by
            AllThingsRams of the site. Use of any such linked website is at the
            user's own risk.
          </p>
          <h3 className="tp-subtitle">Modifications</h3>
          <p className="tp-content">
            AllThingsRams may revise these terms of service for its website at
            any time without notice. By using this website you are agreeing to
            be bound by the then current version of these terms of service.
          </p>
          <h3 className="tp-subtitle">Governing Law</h3>
          <p className="tp-content">
            These terms and conditions are governed by and construed in
            accordance with the laws of Vermont and you irrevocably submit to
            the exclusive jurisdiction of the courts in that State or location.
          </p>
        </section>
      </div>
    </>
  );
}
