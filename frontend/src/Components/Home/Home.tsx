import { Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListingCard from "../../Layout/ListingCard/ListingCard";
import Newsletter from "../../Layout/NewsLetter/Newsletter";
import OurReviews from "../../Layout/Reviews/OurReviews";
import SearchForm from "../../Layout/SearchForm/SearchForm";
import "./Home.css";
import { business__categories, blogs } from "../../dummydata";
import { baseUrl } from "../../@config/config";
import { FetchType } from "../../@config/types";



const Home = () => {
  const [listings, setListings] = useState<FetchType>();
  useEffect(() => {
    const getAllBusiness = async () => {
      const response = await fetch(`${baseUrl}/business/all`);
      const data = await response.json();

      setListings({ success: data.success, business: data.businesses });
    };

    getAllBusiness();
  }, []);

  const [activeCategory, setActiveCategory] = useState("");

  const popular__categories = business__categories.filter(
    (category) => category.is__popular
  );

  const most__searched = listings?.business.slice(0, 6);
  console.log(most__searched, "most searched");
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
                    item.category === activeCategory
                      ? "active__category"
                      : ""
                  }`}
                  onClick={() => setActiveCategory(item.category)}
                  key={item.category}
                >
                  <p className="p__text">{item.category}</p>
                </li>
              ))}
          </ul>

          <div className="home__services__container">
            {listings?.business &&
              listings?.business.map((item, index) => (
                <ListingCard key={index} item={item} index={index} />
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
