import { Button, Image } from "@chakra-ui/react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { FiFacebook } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { FiYoutube } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { FaGooglePlay, FaApple } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="footer__container">
      <div className="footer__top">
        <div className="footer__section">
          <Link to="/" className="footer__logo">
            <Image src="/logo/logo512.svg" className="website__logo" />
            <h1 className="h1__text website__name">BIZHUB</h1>
          </Link>

          <div className="footer__aboutus">
            <p className="p__text">
              Challenging the way things have always been done can lead to
              creative new options that reward you.
            </p>
          </div>
        </div>
        <div className="footer__section footer__nav__link">
          <h3 className="h3__light text__center">Quick Links</h3>

          <div className="footer__links">
            <Link to="/" className="p__text footer__link">
              Home
            </Link>
            <Link to="/" className="p__text footer__link">
              Listings
            </Link>
            <Link to="/" className="p__text footer__link">
              About Us
            </Link>
            <Link to="/" className="p__text footer__link">
              Blog
            </Link>
            <Link to="/" className="p__text footer__link">
              Contact Us
            </Link>
          </div>
        </div>
        <div className="footer__section">
          <h3 className="h3__light text__center">Follow Us</h3>
          <div className="footer__social__icons">
            <Link to="/">
              <FiFacebook className="social__icon__link" />
            </Link>
            <Link to="/">
              <FaInstagram className="social__icon__link" />
            </Link>
            <Link to="/">
              <FaXTwitter className="social__icon__link" />
            </Link>
            <Link to="/">
              <FiYoutube className="social__icon__link" />
            </Link>
          </div>

          <div className="footer__email">
            <h3 className="h3__light text__center">Email</h3>
            <p className="p__text text__center footer__link">
              info@bizhub.com.np
            </p>
          </div>
        </div>
        <div className="footer__section">
          <h3 className="h3__light text__center">Download App</h3>

          <div className="footer__app">
            <Link to={"/"}>
              <Button className="store__btn">
                <FaGooglePlay className="store__icon" />
                <div className="store__desc">
                  <p className="p__text store__heading">GET IT ON</p>
                  <p className="p__text store__name">Google Play</p>
                </div>
              </Button>
            </Link>
            <Link to={"/"}>
              <Button className="store__btn">
                <FaApple className="store__icon" />
                <div className="store__desc">
                  <p className="p__text store__heading">Download on the</p>
                  <p className="p__text store__name">App Store</p>
                </div>
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p className="p__text text__center">
          Copyright &copy; {new Date(Date.now()).getFullYear()} BizHub. All rights
          reserved
        </p>
      </div>
    </div>
  );
};
export default Footer;
