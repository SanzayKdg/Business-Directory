import { Image } from "@chakra-ui/react";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import StarRating from "react-star-ratings";
import "./ListingCard.css";

const ListingCard = (props: any) => {
  const { item, index } = props;
  return (
    <Link key={index} to={"/"} className="services__card">
      <div className="services__top">
        <Image
          className="service__background"
          src={item.image}
          alt="Business Image"
        />
      </div>

      <div className="services__mid">
        <Image className="service__logo" src={item.logo} />
        <div className="service__details">
          <p className="p__text business__name">
            <b>{item.name}</b>
          </p>
          <div className="ratings">
            <StarRating
              // rating={item.ratings}
              rating={5}
              starRatedColor="#f6c914"
              starDimension="18px"
              starSpacing="1px"
            />
          </div>
          <div className="home__service__contact">
            <div className="service__location">
              <FaLocationDot className="service__icon location__icon" />
              <p className="service__address">{item.address}</p>
            </div>
            <div className="service__phone">
              <FaPhoneAlt className="service__icon" />
              <p className="service__address">(+977) {item.contact}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="services__bottom">
        <p className="service__category p__text">
          <b>{item.category}</b>
        </p>

        <p
          className={`service__open__status p__text ${
            item.is_online ? "green__text" : "red__text"
          } `}
        >
          <b>{item.is_online ? "Open" : "Closed"}</b>
        </p>
      </div>
    </Link>
  );
};

export default ListingCard;
