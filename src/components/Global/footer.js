//Style Imports
import "./styles/footer.css";

// What does he want to be in the footer?
// Any social links or images?

export default function Footer() {
  return (
    <>
      <footer>
        <p className="main-disclaimer">
          &copy; {new Date().getFullYear()} - AllThingsFootball.us - All Rights
          Reserved. The content on this site is for entertainment and
          educational purposes only.
          <br></br> All Things Rams is not affiliated with the L.A. Rams or the
          National Football League.
        </p>

        <section>
          {/* Links from original concept */}
          <ul id="footer-links">
            {/* need to add in actual connections */}
            <a className="footer-link" href="/about">
              <li>About Us</li>
            </a>
            <li className="separation">|</li>
            <a className="footer-link" href="/contact">
              <li>Contact</li>
            </a>
            <li className="separation">|</li>
            <a className="footer-link" href="/">
              <li>Terms of Use</li>
            </a>
            <li className="separation">|</li>
            <a className="footer-link" href="/admin-login">
              <li>Admin Login</li>
            </a>
          </ul>
        </section>
      </footer>
    </>
  );
}
