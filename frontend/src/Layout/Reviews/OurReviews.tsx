import { Avatar, Image } from "@chakra-ui/react";
import { PiCaretCircleLeftThin, PiCaretCircleRightThin } from "react-icons/pi";
import "./OurReviews.css";
import { useState } from "react";
const OurReviews = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const userReviews = [
    {
      name: "John Doe",
      avatar: "/background/user.jpeg",
      review:
        "We worked with consultant. our representative was very knowledgeable and helpful. Consultant made a number of suggestions to help improve our system. explained how things work and why it would help.",
      user_role: "business",
    },
    {
      name: "Mark Zuckerburg",
      avatar: "/background/user.jpeg",
      review:
        "We worked with consultant. our representative was very knowledgeable and helpful. Consultant made a number of suggestions to help improve our system. explained how things work and why it would help.",
      user_role: "user",
    },
    {
      name: "Jack Maa",
      avatar: "/background/user.jpeg",
      review:
        "We worked with consultant. our representative was very knowledgeable and helpful. Consultant made a number of suggestions to help improve our system. explained how things work and why it would help.",
      user_role: "business",
    },
    {
      name: "Tim Cook",
      avatar: "/background/user.jpeg",
      review:
        "We worked with consultant. our representative was very knowledgeable and helpful. Consultant made a number of suggestions to help improve our system. explained how things work and why it would help.",
      user_role: "user",
    },
    {
      name: "John Doe",
      avatar: "/background/user.jpeg",
      review:
        "We worked with consultant. our representative was very knowledgeable and helpful. Consultant made a number of suggestions to help improve our system. explained how things work and why it would help.",
      user_role: "business",
    },
  ];

  const reviews = userReviews.slice(0, 4);

  const handleRightClick = () => {
    setActiveIndex((activeIndex + 1) % reviews.length);
  };
  const handleLeftClick = () => {
    setActiveIndex(!activeIndex ? reviews.length - 1 : activeIndex - 1);
  };

  const Carousel = () => {
    return (
      <div className="user__reviews">
        <div onClick={handleLeftClick} className="nav__arrow">
          <PiCaretCircleLeftThin size={50} className="nav__icons" />
        </div>

        <div className="carousel__container">
          {reviews &&
            reviews.map((item, index) => (
              <div
                key={index}
                className={`reviews__description
                   ${activeIndex === index ? "show" : "hidden"}`}
              >
                <div className="quote__img">
                  <Image src="/icons/quote.svg" alt="quote" />
                </div>
                <p className="p__text text__center">“{item.review}”</p>

                <div className="user__description">
                  <div className="user__avatar">
                    <Avatar size="lg" name="Demo User" src={item.avatar} />
                  </div>

                  <div className="user__details">
                    <p className="p__text user__name">{item.name}</p>
                    <p className="p__text user__designation">
                      {item.user_role === "business"
                        ? "Business Owner"
                        : "Customer"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>

        <div onClick={handleRightClick} className="nav__arrow">
          <PiCaretCircleRightThin size={50} className="nav__icons" />
        </div>
      </div>
    );
  };

  return (
    <div className="our__reviews">
      <div className="reviews__top">
        <h1 className="black__text h1__text text__center">
          What our client say
        </h1>
      </div>

      <Carousel />
    </div>
  );
};

export default OurReviews;
