import { Button, Image, Input, Select } from "@chakra-ui/react";
import "./Home.css";
const Home = () => {
  return (
    <div className="home__container">
      <div className="home__top">
        <h1 className="home__heading">Discover The Best Services Near You</h1>
        <h4 className="home__description">
          1.118.940.376 The best service package is waiting for you
        </h4>
      </div>

      <div className="home__bottom">
        <form className="home__form">
          <div className="home__form__item">
            <Input
              focusBorderColor="white"
              className="home__form__input"
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
              className="home__form__input"
              type="text"
              placeholder="Location"
            />
            <Image alt="Location Icon" className="home__location" src="/icons/location.svg" />
          </div>
          <div className="form__divider"></div>

          <div className="home__form__item">
            <Select
              border="hidden"

              // focusBorderColor="white"
              className="home__form__input"
              placeholder="Category"
              width="150px"
            >
              <option value={"hello"}>Hello</option>
              <option value={"hello1"}>Hello 1</option>
              <option value={"hello2"}>Hello 2 </option>
              <option value={"hello3"}>Hello 3</option>
            </Select>
          </div>

          <Button className="home__search__btn" colorScheme="red">
            Search
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Home;
