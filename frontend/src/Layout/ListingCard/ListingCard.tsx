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
          src={item.image[0]}
          alt="Business Image"
        />
      </div>

      <div className="services__logo">
        <Image className="service__logo" src={item.logo} />
      </div>

      <div className="services__mid">
        <div className="service__details">
          <p className="p__text business__name">
            <b>{item.name}</b>
          </p>
          <div className="ratings">
            <StarRating
              rating={item.ratings}
              starRatedColor="#f6c914"
              starDimension="18px"
              starSpacing="1px"
            />
          </div>
          <div className="home__service__contact">
            <div className="service__location">
              <FaLocationDot size={24} className="service__icon" />
              <p className="service__address">{item.address}</p>
            </div>
            <div className="service__phone">
              <FaPhoneAlt size={18} className="service__icon" />
              <p className="service__address">(+12) 345-678-910</p>
            </div>
          </div>
        </div>
      </div>
      <div className="services__bottom">
        <p className="service__category p__text">
          <b>Restaurant</b>
        </p>

        <p
          className={`service__open__status p__text ${
            item.open_status ? "green__text" : "red__text"
          } `}
        >
          <b>{item.open_status ? "Open" : "Closed"}</b>
        </p>
      </div>
    </Link>
  );
};

export default ListingCard;
