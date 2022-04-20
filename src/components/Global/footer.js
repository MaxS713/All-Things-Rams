//Style Imports
import "./styles/footer.css";

export default function Footer() {
  function getCopyrightYear() {
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
      <footer>
        <p id="main-disclaimer">
          &copy; {getCopyrightYear()} - AllThingsFootball.us - All Rights
          Reserved. The content on this site is for entertainment and
          educational purposes only.
          <br></br> All Things Rams is not affiliated with the L.A. Rams or the
          National Football League.
        </p>

        <section>
          {/* Links from original concept */}
          <ul id="footer-links">
            <a className="footer-link" href="/about">
              <li>About</li>
            </a>
            <li className="separation">|</li>
            <a className="footer-link" href="/contact">
              <li>Contact</li>
            </a>
            <li className="separation">|</li>
            <a className="footer-link" href="/contact">
              {/* Currently Suggestions goes to the contact page */}
              <li>Suggestions</li>
            </a>
            <li className="separation">|</li>
            <a className="footer-link" href="/privacy-policy">
              <li>Privacy Policy</li>
            </a>
            <li className="separation">|</li>
            <a className="footer-link" href="/terms-of-use">
              <li>Terms of Use</li>
            </a>
            <li className="separation">|</li>
            <a className="footer-link" href="/admin-login">
              <li>Admin Login</li>
            </a>
            {/* testing purposes */}
            <li className="separation">|</li>
            <a className="footer-link" href="/submit">
              <li>Submit</li>
            </a>
          </ul>
        </section>
      </footer>
    </>
  );
}
