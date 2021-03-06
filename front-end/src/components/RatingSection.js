import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import useToken from "./useToken";

import classes from "../css/RatingSection.module.css";
import { API } from "../api-service";

const RatingSection = (props) => {
  const { token } = useToken();

  const [rating, setRating] = useState(-1);
  const [showRatingInput, setShowRatingInput] = useState(false);
  const [hightlighted, setHighlighted] = useState(-1);

  useEffect(() => setRating(props.avgRating), [props.avgRating]);

  const addRatingClickedHandler = () => {
    setShowRatingInput(!showRatingInput);
  };

  const highlightRate = (high) => (e) => {
    setHighlighted(high);
  };

  const submitRatingHandler = (rating) => (e) => {
    e.preventDefault();
    rating += 1;

    const newRating = {
      resource: props.resourceId,
      stars: rating,
    };

    API.postRating(token, newRating, () => {
      API.fetchResource(props.resourceId, token, props.updateResource);
      setShowRatingInput(false);
    });
  };

  let avgRating = props.avgRating;
  let numRatings = props.numRatings;

  return (
    <div className={classes["ratings-container"]} data-test="ratings-container">
      <FontAwesomeIcon
        icon={faStar}
        className={`${
          avgRating > 0 ? classes["orange"] : classes["no-display"]
        } ${classes["fa-star"]}`}
        data-test="star-icon-1"
      />
      <FontAwesomeIcon
        icon={faStar}
        className={`${
          avgRating > 1 ? classes["orange"] : classes["no-display"]
        } ${classes["fa-star"]}`}
        data-test="star-icon-2"
      />
      <FontAwesomeIcon
        icon={faStar}
        className={`${
          avgRating > 2 ? classes["orange"] : classes["no-display"]
        } ${classes["fa-star"]}`}
        data-test="star-icon-3"
      />
      <FontAwesomeIcon
        icon={faStar}
        className={`${
          avgRating > 3 ? classes["orange"] : classes["no-display"]
        } ${classes["fa-star"]}`}
        data-test="star-icon-4"
      />
      <FontAwesomeIcon
        icon={faStar}
        className={`${
          avgRating > 4 ? classes["orange"] : classes["no-display"]
        } ${classes["fa-star"]}`}
        data-test="star-icon-5"
      />

      <span className={classes["num-ratings"]} data-test="num-ratings">
        {numRatings !== 1
          ? `(${numRatings} ratings)`
          : `(${numRatings} rating)`}
      </span>

      {props.addRatingBtn && (
        <div className={classes["add-rating-button-container"]}>
          <FontAwesomeIcon
            icon={faPlusSquare}
            className={classes["add-rating"]}
            onClick={addRatingClickedHandler}
            data-test="add-rating-button"
          />
        </div>
      )}

      {showRatingInput && (
        <div className={classes["rate-container"]}>
          <h2>Rate it!</h2>
          <div className={classes["stars-container"]}>
            {[...Array(5)].map((e, i) => {
              return (
                <FontAwesomeIcon
                  key={i}
                  icon={faStar}
                  className={
                    hightlighted > i - 1
                      ? classes["orange-pointer"]
                      : classes["white"]
                  }
                  data-test={`add-star-icon-${i + 1}`}
                  onMouseEnter={highlightRate(i)}
                  onMouseLeave={highlightRate(-1)}
                  onClick={submitRatingHandler(i)}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default RatingSection;
