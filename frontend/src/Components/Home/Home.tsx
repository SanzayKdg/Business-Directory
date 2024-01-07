import { Image } from "@chakra-ui/react";
import { useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import StarRating from "react-star-ratings";
import Newsletter from "../../Layout/NewsLetter/Newsletter";
import OurReviews from "../../Layout/Reviews/OurReviews";
import "./Home.css";
import SearchForm from "../../Layout/SearchForm/SearchForm";
const Home = () => {
  const [activeCategory, setActiveCategory] = useState("");
  const blogs = [
    {
      title: "Internet Banner Advertising Most Reliable",
      tags: ["Videos", "Travel"],
      cover: "/background/list.jpg",
      user: "John Doe",
      createdAt: "2023-12-28T13:54:40.645+00:00",
    },
    {
      title: "Google inks pact for new 35-storey office",
      tags: ["Lifestyle", "Travel"],
      cover: "/background/list.jpg",
      user: "John Smith",
      createdAt: "2023-15-28T13:54:40.645+00:00",
    },
    {
      title: "Etiquette tips for travellers",
      tags: ["Lifestyle", "Travel"],
      cover: "/background/list.jpg",
      user: "Jeff Sheldon",
      createdAt: "2023-17-28T13:54:40.645+00:00",
    },
  ];

  const business__categories = [
    {
      name: "Chinese Sausage Restaurant",
      ratings: 5,
      logo: "/logo/logo512.svg",
      image: ["/background/list.jpg"],
      category: "Restaurant",
      is__popular: true,
      img: "/icons/restaurant.svg",
      listings: 69,
      open_status: false,
      address: "236 Littleton St. New Philadelphia, Ohio, United States",
    },
    {
      name: "Woozie Chinese Restaurant",
      ratings: 5,
      logo: "/logo/logo512.svg",
      image: ["/background/list.jpg"],
      category: "Shopping",
      is__popular: true,
      img: "/icons/bag.svg",
      address: "236 Littleton St. New Philadelphia, Ohio, United States",

      listings: 69,
      open_status: true,
    },
    {
      name: "Ryder Hair Salon Restaurant",
      ratings: 1.5,
      logo: "/logo/logo512.svg",
      image: ["/background/list.jpg"],
      category: "Beauty",
      is__popular: true,
      img: "/icons/leaf.svg",
      address: "236 Littleton St. New Philadelphia, Ohio, United States",

      listings: 69,
      open_status: false,
    },
    {
      name: "Big Smoke Taco Bell",
      ratings: 2.5,
      logo: "/logo/logo512.svg",
      image: ["/background/list.jpg"],
      category: "Automobiles",
      is__popular: false,
      img: "/icons/restaurant.svg",
      address: "236 Littleton St. New Philadelphia, Ohio, United States",

      listings: 69,
      open_status: true,
    },
    {
      name: "Sweet Tatto Parlor",
      ratings: 4.5,
      logo: "/logo/logo512.svg",
      image: ["/background/list.jpg"],
      category: "Real Estate",
      is__popular: false,
      img: "/icons/restaurant.svg",
      address: "236 Littleton St. New Philadelphia, Ohio, United States",

      listings: 69,
      open_status: false,
    },
    {
      name: "Cesar Car Center",
      ratings: 3.5,
      logo: "/logo/logo512.svg",
      image: ["/background/list.jpg"],
      category: "Hotels",
      is__popular: true,
      img: "/icons/bed.svg",
      address: "236 Littleton St. New Philadelphia, Ohio, United States",

      listings: 69,
      open_status: true,
    },
    {
      name: "Carl Casino Restaurant",
      ratings: 3.5,
      logo: "/logo/logo512.svg",
      image: ["/background/list.jpg"],
      category: "Bars & Pubs",
      is__popular: true,
      img: "/icons/wine.svg",
      address: "236 Littleton St. New Philadelphia, Ohio, United States",

      listings: 69,
      open_status: false,
    },
  ];

  const popular__categories = business__categories.filter(
    (category) => category.is__popular
  );

  const most__searched = business__categories.slice(0, 6);

  return (
    <div className="home__container">
      {/* ---------------------- HOME - FORM  ------------------------------------- */}
      <div className="home__form">
        <SearchForm
          heading="Discover The Best Services Near You"
          description="1.118.940.376 The best service package is waiting for you"
          categories_filter={business__categories}
        />
      </div>
      {/* ---------------------- HOME - POPULAR CATEGORIES  ------------------------------------- */}

      <div className="home__popular__categories px__16">
        <div className="popular__categories__top">
          <h1 className="text__center black__text h1__text">
            Most Popular Categories
          </h1>
          <h4 className="text__center p__text black__text ">
            Travelocity empowers travelers who are giving back on their trips in
            ways big and small
          </h4>
        </div>

        <div className="popular__categories__mid">
          {popular__categories &&
            popular__categories.map((item, index) => (
              <Link key={index} to={"/"} className={`category__card`}>
                <div className="category__icon">
                  <Image
                    alt="Location Icon"
                    className="popular__category__icon"
                    src={`${item.img}`}
                  />
                </div>

                <div className="category__description">
                  <p className={`category__name p__text`}>
                    <b>{item.category.toUpperCase()}</b>
                  </p>
                  <p className={`listing__number p__text`}>
                    {item.listings} Listings
                  </p>
                </div>
              </Link>
            ))}
        </div>
        <div className="popular__categories__bottom"></div>
      </div>

      {/* ---------------------- HOME - MOST SEARCHED CATEGORIES / SERVICES  ------------------------------------- */}

      <div className="home__services px__16">
        <div className="home__services__top">
          <h1 className="black__text h1__text text__center">
            Most Searched Services
          </h1>
          <h4 className="black__text p__text text__center">
            Travelocity empowers travelers who are giving back on their trips in
            ways big and small
          </h4>
        </div>

        <div className="home__services__link">
          <ul className="filter__services__items">
            {most__searched &&
              most__searched.map((item) => (
                <li
                  className={`p__text filter__category ${
                    item.category === activeCategory ? "active__category" : ""
                  }`}
                  onClick={() => setActiveCategory(item.category)}
                  key={item.category}
                >
                  <p className="p__text">{item.category}</p>
                </li>
              ))}
          </ul>

          <div className="home__services__container">
            {most__searched &&
              most__searched.map((item, index) => (
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
              ))}
          </div>
        </div>
      </div>

      {/* ---------------------- HOME - HOW IT WORKS  ------------------------------------- */}
      <div className="home__works__description px__16">
        <div className="home__works__top">
          <h1 className="black__text h1__text text__center">
            How Does It Work
          </h1>
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
      </div>

      {/* ---------------------- HOME - FEATURED LOCATION  ------------------------------------- */}
      <div className="featured__location px__16">
        <div className="featured__location__top">
          <h1 className="black__text h1__text text__center">
            Top Featured Location
          </h1>
          <h4 className="black__text p__text text__center">
            Explore restaurants, bars, and cafés by locality
          </h4>
        </div>
        <div className="featured__location__bottom">
          <Link to={"/"} className="featured__location__left location__link">
            <Image className="left__location" src="/background/ktm3.jpg" />
            <p className="p__text light__text location__name">
              Kathmandu<span className="location__listing">69 Listings</span>
            </p>
          </Link>
          <div className="featured__location__right">
            <div className="location__right__top">
              <Link to={"/"} className="location__link">
                <Image className="right__location" src="/background/ltp.jpg" />
                <p className="p__text light__text location__name">
                  Lalitpur
                  <span className="location__listing">69 Listings</span>
                </p>
              </Link>
              <Link to={"/"} className="location__link">
                <Image className="right__location" src="/background/bkt.jpg" />
                <p className="p__text light__text location__name">
                  Bhaktapur
                  <span className="location__listing">69 Listings</span>
                </p>
              </Link>
            </div>
            <Link to="/" className="location__right__bottom location__link">
              <Image
                className="right__bottom__location"
                src="/background/pkh.jpg"
              />
              <p className="p__text light__text location__name">
                Pokhara<span className="location__listing">69 Listings</span>
              </p>
            </Link>
          </div>
        </div>
      </div>

      {/* ---------------------- HOME - OUR REVIEWS  ------------------------------------- */}

      <div className="reviews__section px__16">
        <OurReviews />
      </div>

      {/* ---------------------- HOME - BLOGS / NEWS POST  ------------------------------------- */}

      <div className="blogs__section px__16">
        <div className="home__works__top">
          <h1 className="black__text h1__text text__center">News Posts</h1>
          <h4 className="black__text p__text text__center">
            Checkout Latest News And Articles From Our Blog
          </h4>
        </div>

        <div className="home__services__container">
          {blogs &&
            blogs.map((blog) => (
              <Link key={blog.title} to={"/"} className="blogs__card">
                <div className="blog__top">
                  <Image
                    className="blog__background"
                    src={blog.cover}
                    alt="Business Image"
                  />
                </div>

                <div className="blogs__mid">
                  <div className="blog__details">
                    <div className="blog__details__top">
                      <p className="p__text blog__tags">{blog.tags[0]}</p>
                      <p className="p__text blog__divider">.</p>
                      <p className="p__text blog__tags">{blog.tags[1]}</p>
                    </div>

                    <p className="p__text blog__title">
                      <b>{blog.title}</b>
                    </p>

                    <div className="user__blog">
                      <p className="p__text blog__user__details">19th March</p>
                      <p className="p__text blog__user__details">{blog.user}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>

      {/* ---------------------- HOME - BLOGS / NEWS POST  ------------------------------------- */}
      <div className="home__newsletter px__16">
        <Newsletter />
      </div>
    </div>
  );
};

export default Home;
