import { Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaCamera, FaCreditCard, FaParking, FaWifi } from "react-icons/fa";
import {
  IoCallOutline,
  IoGlobeOutline,
  IoLocationOutline,
  IoMailOutline,
} from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import StarRating from "react-star-ratings";
import Map from "../../Layout/GoogleMap/Map";
import Newsletter from "../../Layout/NewsLetter/Newsletter";
import { getSingleBusiness } from "../../services/business/business";
import { DAYS, SingleListing } from "../../types/BusinessTypes";
import "./ListingDetails.css";

const ListingDetails = () => {
  const { slug } = useParams();
  const [listing, setListing] = useState<SingleListing>();
  const [activeImage, setActiveImage] = useState<string>("");
  useEffect(() => {
    const getBusiness = async () => {
      const business = await getSingleBusiness(slug);
      setListing(business);
    };

    getBusiness();
  }, [slug]);
  const today = new Date(Date.now());
  return (
    <section className="listing__details__container">
      {/* ---------------------- SINGLE LISTING - BACKGROUND IMAGE  ------------------------------------- */}

      <section className="listing__bg">
        {listing?.images ? (
          <Image
            src={`${listing?.images[0]}`}
            alt="background image"
            className="listingbg__image"
          />
        ) : (
          <Image
            src="/background/bg1.jpg"
            alt="background image"
            className="listingbg__image"
          />
        )}
      </section>

      {/* ---------------------- SINGLE LISTING - TOP DESCRIPTION  ------------------------------------- */}

      <section className="listing__desc__container">
        <div className="listing__logo">
          {listing?.logo ? (
            <Image
              src={listing?.logo}
              alt={`${listing?.name} Logo`}
              className="business__logo"
            />
          ) : (
            <div className="default__logo">
              <h4 className="default__name">{listing?.name.slice(0, 1)}</h4>
            </div>
          )}
        </div>

        <div className="listing__desc">
          <h4 className="listing__name">{listing?.name}</h4>
          <div className="listing__ratings">
            <StarRating
              // rating={item.ratings}
              rating={5}
              starRatedColor="#f6c914"
              starDimension="25px"
              starSpacing="1px"
            />

            <p className="ratings__count">- 69 reviews</p>
          </div>
          <p className="listing__address">{listing?.address}</p>
        </div>
      </section>

      {/* ---------------------- SINGLE LISTING - MIDDLE DESCRIPTION  ------------------------------------- */}
      <section className="listing__details">
        <div className="details__left">
          {/* ---------------------- SINGLE LISTING - OVERVIEW  ------------------------------------- */}

          <div className="listing__overview border__bottom">
            <h6 className="listing__heading">Overview</h6>
            <p className="overview p__text">{listing?.description}</p>
          </div>

          {/* ---------------------- SINGLE LISTING - GALLERY  ------------------------------------- */}

          <div className="listing__gallery border__bottom">
            <h6 className="listing__heading">Gallery</h6>
            <div className="gallery__images">
              <div className="active__image">
                <Image
                  src={activeImage ? activeImage : listing?.images[0]}
                  className="gallery__image"
                  alt="Gallery Image"
                />

                <div className="images__count">
                  <FaCamera className="image__icon" size={16} />
                  <p className="image__count">
                    {listing?.images.length} Images
                  </p>
                </div>
              </div>

              <div className="gallery__grid">
                {listing?.images &&
                  listing?.images.map((item, index) => (
                    <Image
                      key={index}
                      onClick={() => setActiveImage(item)}
                      src={item}
                      alt={`${listing?.name} image`}
                      className="grid__items"
                    />
                  ))}
              </div>
            </div>
          </div>

          {/* ---------------------- SINGLE LISTING - AMENITIES CONTAINER  ------------------------------------- */}

          <div className="listing__amenities border__bottom">
            <h6 className="listing__heading">Amenities</h6>
            <div className="amenities__gird">
              {listing?.amenities &&
                listing?.amenities.map((item) => (
                  <div key={item} className="listing__amenity">
                    {item === "wifi" && (
                      <div className="amenity__item">
                        <FaWifi size={32} className="amenity__icon" />
                        <p className="p__text amenity__title">Free Wifi</p>
                      </div>
                    )}
                    {item === "parking" && (
                      <div className="amenity__item">
                        <FaParking size={32} className="amenity__icon" />
                        <p className="p__text amenity__title">Free Parking</p>
                      </div>
                    )}
                    {item === "card" && (
                      <div className="amenity__item">
                        <FaCreditCard size={32} className="amenity__icon" />
                        <p className="p__text amenity__title">Accept Card</p>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* ---------------------- SINGLE LISTING - RIGHT CONTAINER  ------------------------------------- */}

        <div className="details__right">
          {/* ---------------------- SINGLE LISTING - MAP  ------------------------------------- */}
          <div className="listing__location">
            <Map
              lng={listing?.business_location.coordinates[0]}
              lat={listing?.business_location.coordinates[1]}
            />
          </div>
          {/* ---------------------- SINGLE LISTING - CONTACT DESCRIPTION  ------------------------------------- */}

          <div className="listing__contact">
            <h6 className="listing__heading">Contact</h6>

            <div className="listing__contact__details">
              <div className="contact__address">
                <IoLocationOutline
                  size={25}
                  className="contact__address__icon"
                />
                <p className="contacts__list p__text">{listing?.address}</p>
              </div>

              <div className="contact__address">
                <IoCallOutline size={25} className="contact__address__icon" />
                <p className="contacts__list p__text">
                  +977 {listing?.phone_number}
                </p>
              </div>

              <div className="contact__address">
                <IoMailOutline size={25} className="contact__address__icon" />
                <p className="contacts__list p__text">{listing?.email}</p>
              </div>

              <div className="contact__address">
                <IoGlobeOutline size={25} className="contact__address__icon" />
                <Link
                  to={`${listing?.website}`}
                  className="contacts__list p__text"
                >
                  {listing?.website}
                </Link>
              </div>
            </div>
          </div>

          {/* ---------------------- SINGLE LISTING - OPENING HOURS DESCRIPTION  ------------------------------------- */}

          <div className="listing__contact">
            <h6 className="listing__heading">Working Hours</h6>

            <div className="listing__contact__details">
              {listing?.opening_hours.map((opening__hour, index) => (
                <div className="opening__hours">
                  <p className="p__text opening__days">{DAYS[index]}</p>
                  <p
                    className={`p__text ${
                      opening__hour.open === "closed" &&
                      opening__hour.closes === "closed"
                        ? "closed"
                        : ""
                    } ${
                      today.getDay() === index &&
                      today.toTimeString().slice(0, 5) >= opening__hour.open &&
                      today.toTimeString().slice(0, 5) <= opening__hour.closes
                        ? "opened"
                        : ""
                    }`}
                  >
                    {opening__hour.open === "closed" &&
                    opening__hour.closes === "closed"
                      ? "Closed"
                      : today.getDay() === index &&
                        today.toTimeString().slice(0, 5) >=
                          opening__hour.open &&
                        today.toTimeString().slice(0, 5) <= opening__hour.closes
                      ? "Open Now"
                      : `${opening__hour.open} A.M - ${opening__hour.closes} P.M`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------- SINGLE LISTING - NEWSLETTER  ------------------------------------- */}
      <section className="listing__details__newsletter px__8">
        <Newsletter />
      </section>
    </section>
  );
};

export default ListingDetails;
