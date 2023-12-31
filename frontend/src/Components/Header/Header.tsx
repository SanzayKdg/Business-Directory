import { Avatar, Button, Image } from "@chakra-ui/react";
import "./Header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header__container">
      <Image
        src="/background/bg1.jpg"
        alt="background image"
        className="background__image"
      />
      <div className="header__contents">
        <div className="header__left">
          <Avatar src="/logo/logo512.svg" size="md" className="" name="Logo" />
        </div>
        <div className="header__mid">
          <ul className="nav__items">
            <li className="nav__links">
              <Link to="/" className="nav__link">
                Home
              </Link>
            </li>
            <li className="nav__links">
              <Link to="/" className="nav__link">
                Listings
              </Link>
            </li>
            <li className="nav__links">
              <Link to="/" className="nav__link">
                About Us
              </Link>
            </li>
            <li className="nav__links">
              <Link to="/" className="nav__link">
                Blog
              </Link>
            </li>
            <li className="nav__links">
              <Link to="/" className="nav__link">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        <div className="header__right">
          <Button colorScheme="red" className="header__cta__btns">
            <Link to={"/"}>Add Listing +</Link>
          </Button>
          <Button className="header__cta__btns" colorScheme="whiteAlpha">
            <Link to={"/"}>Sign In</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;