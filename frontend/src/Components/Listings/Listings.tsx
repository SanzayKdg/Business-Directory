import { Button, Input, Select } from "@chakra-ui/react";
import { FaLocationDot } from "react-icons/fa6";
import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";
import "./Listings.css";
import StarRatings from "react-star-ratings";
import { FaChevronDown } from "react-icons/fa";
const Listings = () => {
  return (
    <div className="listing__container">
      <div className="listing__header">
        <h1 className="h1__text light__text text__center">Our Listings</h1>
        <p className="p__text light__text text__center">
          1.118.940.376 The best service package is waiting for you
        </p>
      </div>
      <div className="listing__bottom">
        {/* ---------------------- LISTING - FILTERS  ------------------------------------- */}

        <div className="listing__filters">
          <div className="filter__heading">
            <h3 className="p__text">Advance Filter</h3>
          </div>

          <div className="filter__container">
            <form className="filter__form">
              <div className="form__item">
                <Input
                  type="text"
                  placeholder="What are you looking for?"
                  className="p__text search__field"
                  focusBorderColor="white"
                  border="hidden"
                />
                <FaSearch className="filter__search__icon" />
              </div>

              <div className="form__item">
                <Input
                  type="text"
                  placeholder="Location"
                  className="p__text search__field"
                  focusBorderColor="white"
                  border="hidden"
                />
                <FaLocationDot className="filter__search__icon" />
              </div>

              <div className="form__item form__select">
                <Select
                  border="hidden"
                  className="p__text filter__select "
                  placeholder="Category"
                  iconSize="20"
                  iconColor="#261f2280"
                  size="lg"
                  icon={<FaChevronDown />}
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

              <div className="form__item rating__filter">
                <p className="p__text rating__text">Ratings</p>
                <StarRatings
                  rating={5}
                  starRatedColor="#f6c914"
                  starDimension="18px"
                  starSpacing="1px"
                />
              </div>

              <div className="form__item rating__filter">
                <p className="p__text">Radius</p>
                <RangeSlider
                  aria-label={["min", "max"]}
                  colorScheme="red"
                  defaultValue={[10, 30]}
                >
                  <RangeSliderTrack>
                    <RangeSliderFilledTrack />
                  </RangeSliderTrack>
                  <RangeSliderThumb index={0} />
                  <RangeSliderThumb index={1} />
                </RangeSlider>
                <p className="p__text">100km</p>
              </div>

              <div className="form__item reset__btn">
                <Button colorScheme="blackAlpha" variant="outline" className="filter__reset__btn">
                  Reset
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* ---------------------- LISTING - CARDS  ------------------------------------- */}

        <div className="all__listings">
          <div className="listing__card">helo listings</div>
        </div>
      </div>
    </div>
  );
};

export default Listings;
