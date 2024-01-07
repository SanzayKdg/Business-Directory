import { Button, Input } from "@chakra-ui/react";
import "./Newsletter.css";

const Newsletter = () => {
  return (
    <div className="newsletter__container">
      <div className="newsletter__left">
        <h1 className="black__text subscribe__heading">Subscribe Newsletter</h1>
        <h4 className="black__text p__text">
          Subscribe to our newsletter and don’t miss anything
        </h4>
      </div>
      <div className="newsletter__right">
        <form className="newsletter__form">
          <Input className="subscribe__email" type="email" placeholder="Your Email" />
          <Button colorScheme="red" className="subscribe__btn">Subscribe</Button>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
