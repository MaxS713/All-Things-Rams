//Style Imports
import "./styles/footer.css";

// What does he want to be in the footer?
// Any social links or images?

export default function Footer() {
  return (
    <>
      <footer>
        <p>
          &copy; 2022 - AllThingsFootball.us - All Rights Reserved. The content
          on this site is for entertainment and educational purposes only. All
          Things Rams is not affiliated with the L.A. Rams or the National
          Football League.
        </p>

        <section>
          {/* Links from original concept */}
          <ul id="footer-links">
            {/* need to add in actual connections */}
            <li>About Us</li>
            <li class="seperation">|</li>
            <li>Contact</li>
            <li class="seperation">|</li>
            <li>Privacy</li>
            <li class="seperation">|</li>
            <li>Terms of Use</li>
            <li class="seperation">|</li>
            <li>Admin Login</li>
          </ul>
        </section>
      </footer>
    </>
  );
}
