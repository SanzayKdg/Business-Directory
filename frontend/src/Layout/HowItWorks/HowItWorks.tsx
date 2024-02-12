import { Image } from "@chakra-ui/react";
import "./HowItWorks.css"
const HowItWorks = () => {
  return (
    <>
      <div className="home__works__top">
        <h1 className="black__text h1__text text__center">How Does It Work</h1>
        <h4 className="black__text p__text text__center">
          Travelocity empowers travelers who are giving back on their trips in
          ways big and small
        </h4>
      </div>

      <div className="home__works__bottom">
        <div className="work__cards">
          <div className="work__card__top">
            <Image src="/icons/work1.svg" className="works__image" />
          </div>
          <div className="work__card__bottom">
            <h6 className="p__text">
              <b>1. Choose a Category</b>
            </h6>
            <p className="p__text works__details">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore.
            </p>
          </div>
        </div>
        <div className="work__cards">
          <div className="work__card__top">
            <Image src="/icons/work2.svg" className="works__image" />
          </div>
          <div className="work__card__bottom">
            <h6 className="p__text">
              <b>2. What You Want</b>
            </h6>
            <p className="p__text works__details">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore.
            </p>
          </div>
        </div>
        <div className="work__cards">
          <div className="work__card__top">
            <Image src="/icons/work3.svg" className="works__image" />
          </div>
          <div className="work__card__bottom">
            <h6 className="p__text">
              <b>3. Go Out & Explore</b>
            </h6>
            <p className="p__text works__details">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowItWorks;
