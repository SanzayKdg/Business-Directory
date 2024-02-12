import { Image } from "@chakra-ui/react";
import "./About.css";
import Newsletter from "../../Layout/NewsLetter/Newsletter";
import OurTeams from "../../Layout/OurTeams/OurTeams";
import OurReviews from "../../Layout/Reviews/OurReviews";
import HowItWorks from "../../Layout/HowItWorks/HowItWorks";
const About = () => {
  return (
    <section className="about__section">
      {/* ---------------------- ABOUT - HERO SECTION  ------------------------------------- */}
      <section className="about__top">
        <div className="about__bg">
          <Image
            src="/background/bg1.jpg"
            alt="background image"
            className="aboutbg__image"
          />
        </div>

        <div className="about__header">
          <h1 className="h1__text light__text text__center">About Us</h1>
          <p className="p__text light__text text__center">
            1.118.940.376 The best service package is waiting for you
          </p>
        </div>
      </section>

      {/* ---------------------- ABOUT - MISSION  ------------------------------------- */}
      <section className="about__mission px__8">
        <div className="mission__left">
          <Image
            src="/background/aboutbg1.jpg"
            alt="Our Mission"
            className="missionbg__image"
          />
        </div>
        <div className="mission__right">
          <h5 className="mission__heading">Our Mission</h5>
          <p className="p__text mission__desc">
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don't look even slightly
            believable. If you are going to use a passage of Lorem Ipsum, you
            need to be sure there isn't anything embarrassing.
          </p>
        </div>
      </section>
      {/* ---------------------- ABOUT - WHO WE ARE  ------------------------------------- */}
      <section className="about__who_we px__8">
        <div className="who__we__left">
          <h5 className="mission__heading">Our Mission</h5>
          <p className="p__text mission__desc">
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don't look even slightly
            believable. If you are going to use a passage of Lorem Ipsum, you
            need to be sure there isn't anything embarrassing.
          </p>
        </div>
        <div className="mission__right">
          <Image
            src="/background/aboutbg2.jpg"
            alt="Our Mission"
            className="missionbg__image"
          />
        </div>
      </section>

      {/* ---------------------- ABOUT - HOW IT WORKS  ------------------------------------- */}
      <section className="about__us px__8">
        <HowItWorks />
      </section>

      {/* ---------------------- ABOUT - CLIENTS  ------------------------------------- */}
      <section className="about__us px__8">
        <OurReviews />
      </section>
      {/* ---------------------- ABOUT - OUR TEAMS  ------------------------------------- */}
      <section className="about__teams px__8">
        <div className="teams__header">
          <h5 className="our__teams__heading">Our Teams</h5>
        </div>
        <div className="teams__flex">
          <OurTeams />
        </div>
      </section>

      {/* ---------------------- ABOUT - NEWSLETTER  ------------------------------------- */}
      <section className="about__newsletter px__8">
        <Newsletter />
      </section>
    </section>
  );
};

export default About;
