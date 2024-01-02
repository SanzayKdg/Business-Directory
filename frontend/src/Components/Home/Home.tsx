import { Button, Image, Input, Select } from "@chakra-ui/react";
// import { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
const Home = () => {
  // const [categoryCard, setCategoryCard] = useState("");
  const business__categories = [
    {
      category: "Restaurant",
      is__popular: true,
      dark__img: "/icons/restaurant.svg",
      light__img: "/icons/restaurant_light.svg",
      listings: 69,
    },
    {
      category: "Shopping",
      is__popular: true,
      dark__img: "/icons/bag.svg",
      light__img: "/icons/bag_light.svg",
      listings: 69,
    },
    {
      category: "Beauty",
      is__popular: true,
      dark__img: "/icons/leaf.svg",
      light__img: "/icons/leaf__light.svg",
      listings: 69,
    },
    {
      category: "Automobiles",
      is__popular: false,
      dark__img: "/icons/restaurant.svg",
      light__img: "/icons/restaurant.svg",
      listings: 69,
    },
    {
      category: "Real Estate",
      is__popular: false,
      dark__img: "/icons/restaurant.svg",
      light__img: "/icons/restaurant.svg",
      listings: 69,
    },
    {
      category: "Hotels",
      is__popular: true,
      dark__img: "/icons/bed.svg",
      light__img: "/icons/bed_light.svg",
      listings: 69,
    },
    {
      category: "Bars & Pubs",
      is__popular: true,
      dark__img: "/icons/wine.svg",
      light__img: "/icons/wine_light.svg",
      listings: 69,
    },
  ];

  const popular__categories = business__categories.filter(
    (category) => category.is__popular
  );

  // const handleMouseEnter = (index: number) => {
  //   const newActiveCategory = [...categoryCard];
  //   newActiveCategory[index] = true;
  //   setCategoryCard(newActiveCategory);
  // };
  // const handleMouseLeave = () => {
  //   setCategoryCard(Array(popular__categories.length).fill(false));
  // };
  return (
    <div className="home__container">
      <div className="home__top">
        <h1 className="home__heading h1__text">
          Discover The Best Services Near You
        </h1>
        <h4 className="home__description p_text">
          1.118.940.376 The best service package is waiting for you
        </h4>
      </div>

      <div className="home__mid">
        <form className="home__form">
          <div className="home__form__item">
            <Input
              focusBorderColor="white"
              className="home__form__input p__text"
              border="hidden"
              type="email"
              width="400px"
              placeholder="What are you Looking for?"
            />
          </div>
          <div className="form__divider"></div>
          <div className="home__form__item location__form__item">
            <Input
              focusBorderColor="white"
              border="hidden"
              className="home__form__input p__text"
              type="text"
              placeholder="Location"
            />
            <Image
              alt="Location Icon"
              className="home__location"
              src="/icons/location.svg"
            />
          </div>
          <div className="form__divider"></div>

          <div className="home__form__item">
            <Select
              border="hidden"
              // focusBorderColor="white"
              className="home__form__input p__text"
              placeholder="Category"
              width="150px"
            >
              <option className="p__text" value={"hello"}>
                Hello
              </option>
              <option className="p__text" value={"hello1"}>
                Hello 1
              </option>
              <option className="p__text" value={"hello2"}>
                Hello 2
              </option>
              <option className="p__text" value={"hello3"}>
                Hello 3
              </option>
            </Select>
          </div>

          <Button className="home__search__btn" colorScheme="red">
            <p className="p__text">Search</p>
          </Button>
        </form>
      </div>

      <div className="home__filter">
        {business__categories &&
          business__categories.map((item, index) => (
            <Button
              key={index} //temporary
              style={{ marginLeft: "1rem" }}
              className="home__filters__items"
              colorScheme="whiteAlpha"
            >
              <Link className="filter__link p__text" to={"/"}>
                {item.category}
              </Link>
            </Button>
          ))}
      </div>

      <div className="home__popular__categories">
        <div className="popular__categories__top">
          <h1 className="home__heading black__text h1__text">
            Most Popular Categories
          </h1>
          <h4 className="home__description black__text p__text">
            Travelocity empowers travelers who are giving back on their trips in
            ways big and small
          </h4>
        </div>

        <div className="popular__categories__mid">
          {popular__categories &&
            popular__categories.map((item, index) => (
              // <Link
              //   key={index}
              //   onMouseEnter={() => handleMouseEnter(index)}
              //   onMouseLeave={handleMouseLeave}
              //   to={"/"}
              //   className={`category__card ${
              //     categoryCard[index] ? "category__card__hover" : ""
              //   }`}
              // >
              //   <div className="category__icon">
              //     <Image
              //       alt="Location Icon"
              //       className="popular__category__icon"
              //       src={`${categoryCard[index] ? item.light__img : item.dark__img}`}
              //     />
              //   </div>
              //   <div className="category__description">
              //     <p
              //       className={`category__name p__text ${
              //         categoryCard[index] ? "light__text" : ""
              //       } `}
              //     >
              //       <b>{item.category.toUpperCase()}</b>
              //     </p>
              //     <p
              //       className={`listing__number p__text ${
              //         categoryCard[index] ? "light__text" : ""
              //       }`}
              //     >
              //       {item.listings} Listings
              //     </p>
              //   </div>
              // </Link>

              <Link
                key={index}
           
                to={"/"}
                className={`category__card`}
              >
                <div className="category__icon">
                  <Image
                    alt="Location Icon"
                    className="popular__category__icon"
                    src={`${item.dark__img}`}
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
    </div>
  );
};

export default Home;
