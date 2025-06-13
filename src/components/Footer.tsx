
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter, faFacebookF, faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img src="/img/logo.png" alt="شعار الجمعية" />
          <p>جمعية مبرة القعوان الخيرية<br />عطاء يستمر</p>
        </div>

        <div className="footer-links">
          <h4>روابط سريعة</h4>
          <ul>
            <li><a href="#">الرئيسية</a></li>
            <li><a href="#">عن الجمعية</a></li>
            <li><a href="#">مشاريع ثابتة</a></li>
            <li><a href="#">مشاريع موسمية</a></li>
            <li><a href="#">اتصل بنا</a></li>
          </ul>
        </div>

        <div className="footer-social">
          <h4>تابعنا</h4>
          <div className="social-icons">
            <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
            <a href="#"><FontAwesomeIcon icon={faFacebookF} /></a>
            <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
            <a href="#"><FontAwesomeIcon icon={faYoutube} /></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 جمعية مبرة القعوان الخيرية - جميع الحقوق محفوظة.</p>
      </div>
    </footer>
  )
}

export default Footer