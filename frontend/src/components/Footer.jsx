import "./Footer.css";

import shortLogo from "../assets/short_logo.png";
import longLogo from "../assets/Long_logo.png";

import linkedin from "../assets/linkedin.png";
import instagram from "../assets/instagram.png";
import twitter from "../assets/twitter.png";
import youtube from "../assets/youtube.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* LEFT SECTION */}
        <div className="footer-left">
          <div className="footer-brand">
            <img src={shortLogo} alt="LivestockHub Symbol" />
            <img src={longLogo} alt="LivestockHub Logo" />
          </div>

          <p className="footer-desc">
            Empowering farmers and buyers through secure, transparent
            livestock trading technology.
          </p>

          <div className="footer-contact">
            <p>📧 contact@civoranexus.com</p>
            <p>📞 +91 7350675192</p>
            <p>📍 Sangamner, Maharashtra</p>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="footer-right">
          <h3>Let’s Connect</h3>
          <p>
            Stay updated with our latest innovations and community stories.
          </p>

          <div className="footer-socials">
            <a
              href="https://www.linkedin.com/company/civoranexus"
              target="_blank"
              rel="noreferrer"
            >
              <img src={linkedin} alt="LinkedIn" />
            </a>

            <a
              href="https://www.instagram.com/civoranexus"
              target="_blank"
              rel="noreferrer"
            >
              <img src={instagram} alt="Instagram" />
            </a>

            <a
              href="https://x.com/civoranexus"
              target="_blank"
              rel="noreferrer"
            >
              <img src={twitter} alt="Twitter / X" />
            </a>

            <a
              href="https://www.youtube.com/@civoranexus"
              target="_blank"
              rel="noreferrer"
            >
              <img src={youtube} alt="YouTube" />
            </a>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="footer-bottom">
        <span>© 2026 Civora Nexus Pvt. Ltd. All rights reserved.</span>
        <span>Privacy Policy • Terms • Refund Policy</span>
      </div>
    </footer>
  );
};

export default Footer;
