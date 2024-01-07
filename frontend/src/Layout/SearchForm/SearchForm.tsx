import { Button, Input, Select } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import "./SearchForm.css";

const SearchForm = (props: any) => {
  const { heading, description, categories_filter } = props;
  console.log(heading, description, categories_filter);
  return (
    <div className="search__form__container">
      <div className="home__top">
        <h1 className="home__heading h1__text text__center">{heading}</h1>
        <h4 className="home__description p_text text__center">{description}</h4>
      </div>

      <div className="home__mid">
        <form className="home__form">
          <div className="home__form__item">
            <Input
              focusBorderColor="white"
              className="home__form__input p__text"
              border="hidden"
              type="email"
              width="380px"
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
            <FaLocationDot size={20} className="service__icon" />
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
            <p className="p__text search__icon">
              Search <FaSearch size={18} />
            </p>
          </Button>
        </form>
      </div>

      <div className="home__filter">
        {categories_filter &&
          categories_filter.map((item: any, index: number) => (
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
    </div>
  );
};

export default SearchForm;
