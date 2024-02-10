import { Avatar, Button } from "@chakra-ui/react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <nav className="header__contents">
      <div className="header__left">
        <Avatar src="/logo/logo512.svg" size="lg" className="" name="Logo" />
      </div>
      <div className="header__mid">
        <NavLink to="/" className="nav__link">
          Home
        </NavLink>
        <NavLink to="/listings" className="nav__link">
          Listings
        </NavLink>
        <NavLink to="/about" className="nav__link">
          About Us
        </NavLink>
        <NavLink to="/blogs" className="nav__link">
          Blogs
        </NavLink>
        <NavLink to="/contact" className="nav__link">
          Contact Us
        </NavLink>
      </div>
      <div className="header__right">
        <Button colorScheme="red" className="header__cta__btns">
          <Link className="add_listing__link" to={"/"}>
            Add Listing +
          </Link>
        </Button>
        {/* <Button style={{marginLeft: "1rem"}} className="header__cta__btns" colorScheme="whiteAlpha">
            <Link to={"/"}>Sign In</Link>
          </Button> */}
      </div>
    </nav>
  );
};

export default Header;
