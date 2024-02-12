import { Button, FormLabel, Image, Input, Textarea } from "@chakra-ui/react";
import "./Contact.css";
import Newsletter from "../../Layout/NewsLetter/Newsletter";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt, FaRegClock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import {
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaFacebookF,
  FaTiktok,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { DAYS } from "../../types/BusinessTypes";
import { IoSendSharp } from "react-icons/io5";
const today = new Date(Date.now()).getDay();
const time = new Date(Date.now()).toTimeString().slice(0, 5);
console.log(time);
const Contact = () => {
  const submitHandler = () => {
    alert("I am submitted");
  };
  return (
    <section className="contactus__container">
      {/* ---------------------- CONTACT US - HERO SECTION  ------------------------------------- */}
      <section className="contactus__top">
        <div className="contactus__bg">
          <Image
            src="/background/bg1.jpg"
            alt="background image"
            className="contactus__image"
          />
        </div>

        <div className="contactus__header">
          <h1 className="h1__text light__text text__center">Contact Us</h1>
          <p className="p__text light__text text__center">
            1.118.940.376 The best service package is waiting for you
          </p>
        </div>
      </section>

      {/* ---------------------- CONTACT US - OUR LOCATION  ------------------------------------- */}
      <section className="contactus__map px__8">
        <iframe
          src={`https://www.google.com/maps?q=27.638021,85.355313&hl=es;z=14&output=embed`}
          loading="lazy"
          allowFullScreen={true}
          className="google__map"
          aria-hidden={false}
          tabIndex={0}
        />
      </section>

      {/* ---------------------- CONTACT US - CONTACT US  ------------------------------------- */}
      <section className="contactus__mid px__8">
        {/* SECTION - CONTACT FORM */}
        <section className="contactus__left">
          <form className="contact__form" onSubmit={submitHandler}>
            <div className="form__top">
              <div className="form__item">
                <FormLabel htmlFor="first__name" className="p__text">
                  First Name
                </FormLabel>
                <Input
                  type="text"
                  className="p__text form__input"
                  id="first__name"
                  placeholder="John"
                  focusBorderColor="black"
                  border="hidden"
                />
              </div>
              <div className="form__item">
                <FormLabel htmlFor="last__name" className="p__text">
                  Last Name
                </FormLabel>
                <Input
                  type="text"
                  className="p__text form__input"
                  id="last__name"
                  placeholder="Doe"
                  border="hidden"
                  focusBorderColor="black"
                />
              </div>
            </div>

            <div className="form__item">
              <FormLabel htmlFor="email" className="p__text">
                Email
              </FormLabel>
              <Input
                type="email"
                className="p__text form__input"
                id="email"
                placeholder="john.doe@gmail.com"
                focusBorderColor="black"
                border="hidden"
              />
            </div>
            <div className="form__item">
              <FormLabel htmlFor="contact" className="p__text">
                Phone
              </FormLabel>
              <Input
                type="email"
                className="p__text form__input"
                id="contact"
                placeholder="+977 987654321"
                focusBorderColor="black"
                border="hidden"
              />
            </div>
            <div className="form__item">
              <FormLabel htmlFor="contact" className="p__text">
                Message
              </FormLabel>
              <Textarea
                rows={10}
                className="p__text form__input"
                placeholder="Tell us your concern."
                focusBorderColor="black"
                border="hidden"
              />
            </div>

            <div className="submit__btn">
              <Button colorScheme="red" type="submit" className="send__btn">
                <p className="send__text">
                  Send Message
                  <IoSendSharp size={25} color="#fff" />
                </p>
              </Button>
            </div>
          </form>
        </section>

        {/* SECTION - CONTACT US */}
        <section className="contactus__right">
          <div className="contactus__desc">
            <h6 className="contactus__heading">Contact Us</h6>

            <div className="contactus__details">
              <div className="contact__detail contactus__address">
                <FaLocationDot className="contactus__icon" />
                <p className="p__text contact__info">
                  Sankhadevi, Lubhu, Lalitpur, Nepal
                </p>
              </div>
              <div className="contact__detail contactus__contact">
                <FaPhoneAlt className="contactus__icon" />
                <p className="p__text contact__info">+977 9876543210</p>
              </div>
              <div className="contact__detail contactus__email">
                <MdEmail className="contactus__icon" />
                <p className="p__text contact__info">mail@bizhub.com</p>
              </div>
            </div>
          </div>
          <div className="contactus__desc">
            <div className="our__opening__hours">
              <h6 className="contactus__heading">
                Opening Hours -{" "}
                <span
                  className={`open__status ${
                    DAYS[today] !== "Saturday" &&
                    time >= "10:00" &&
                    time <= "18:00"
                      ? "opened"
                      : "closed"
                  }`}
                >
                  {DAYS[today] !== "Saturday" &&
                  time >= "10:00" &&
                  time <= "18:00"
                    ? "Open Now"
                    : "Closed"}
                </span>
              </h6>
              <div className="our__timings">
                <FaRegClock className="contactus__icon" />
                <p className="p__text open__time">
                  Sun - Fri:{" "}
                  <span className="p__text contact__info">
                    10:00 A.M - 18:00 P.M
                  </span>
                </p>
              </div>
              <div className="our__timings">
                <FaRegClock className="contactus__icon" />
                <p className="p__text open__time">
                  Sat: <span className="p__text contact__info">Closes</span>
                </p>
              </div>
            </div>
            <div className="contactus__social">
              <h6 className="contactus__heading">Follow Us</h6>

              <div className="social__icons">
                <Link
                  to="https://www.instagram.com"
                  className="social__icon icon__insta"
                >
                  <FaInstagram size={20} color="#fff" />
                </Link>
                <Link
                  to="https://www.linkedin.com"
                  className="social__icon icon__in"
                >
                  <FaLinkedin size={20} color="#fff" />
                </Link>
                <Link
                  to="https://www.twitter.com"
                  className="social__icon icon__x"
                >
                  <FaXTwitter size={20} color="#fff" />
                </Link>
                <Link
                  to="https://www.youtube.com"
                  className="social__icon icon__yt"
                >
                  <FaYoutube size={20} color="#fff" />
                </Link>
                <Link
                  to="https://www.facebook.com"
                  className="social__icon icon__fb"
                >
                  <FaFacebookF size={20} color="#fff" />
                </Link>
                <Link
                  to="https://www.tiktok.com"
                  className="social__icon icon__tik"
                >
                  <FaTiktok size={20} color="#fff" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </section>
      {/* ---------------------- CONTACT US - NEWSLETTER  ------------------------------------- */}
      <section className="contactus__newsletter px__8">
        <Newsletter />
      </section>
    </section>
  );
};

export default Contact;
