const Footer = () =>{
    return(
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-content">
                   <div className="footer-section">
                        <h3>Nexora Finance</h3>
                        <p>Secure banking for the modern world.</p>
                     </div>
                     <div className="footer-section">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="/">Home</a></li>
                            <li><a href="/">About</a></li>
                            <li><a href="/">Contact</a></li>
                        </ul>
                     </div>
                     <div className="footer-section">
                        <h4>Contact Us</h4>
                        <p>Email: support@nexorafinance.com</p>
                        <p>Phone: +1 (555) 123-4567</p>
                     </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Nexora Finance. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
export default Footer;