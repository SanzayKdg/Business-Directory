/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from "react-redux";
import "./ListingDetails.css";
import { useEffect } from "react";
import { getSingleBusiness } from "../../features/Business/Business";
import { useParams } from "react-router-dom";
const ListingDetails = () => {
  const { business, loading, message } = useSelector(
    (state: any) => state.business
  );

  console.log(business, loading, message);
  const dispatch: any = useDispatch();
  const { slug }: any = useParams();
  useEffect(() => {
    dispatch(getSingleBusiness(slug));
  }, [dispatch, slug]);

  return (
    <div className="listing__details__container">
      <div className="heading"></div>
    </div>
  );
};

export default ListingDetails;
