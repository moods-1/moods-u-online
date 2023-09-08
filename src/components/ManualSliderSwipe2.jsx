import React, { useState } from "react";
import 
import useStyles from "../styles/slider";

// check procurement landing page testimonial section for preview
function ManualSliderSwipe({ data}) {
  const [sliderIndex, setSliderIndex] = useState(0);
  const [disableNext, setDisableNext] = useState(false);
  const [disablePrev, setDisablePrev] = useState(true);
  const classes = useStyles();

  const getPosition = (index) => {
    let position = "nextSlide";
    if (sliderIndex === index) {
      position = "activeSlide";
    }
    if (sliderIndex === index - 1 || (index === 0 && sliderIndex === data.length - 1)) {
      position = "lastSlide";
    }
    if (data.length - 1 === 0) {
      position = "activeSlide";
    }
    return position;
  };

  const handleNext = () => {
    let localIndex = sliderIndex;
    localIndex += 1;

    // Disabling Next Button if slide is last slide
    if (localIndex === data.length - 1) {
      setDisableNext(true);
      setSliderIndex(data.length - 1);
    } else {
      setDisablePrev(false);
      setSliderIndex(sliderIndex + 1);
    }

    if (localIndex !== 0) {
      setDisablePrev(false);
    }
  };

  const handlePrev = () => {
    let localIndex = sliderIndex;
    localIndex -= 1;

    if (localIndex === 0) {
      setDisablePrev(true);
      setSliderIndex(0);
    } else {
      setDisableNext(false);
      setSliderIndex(sliderIndex - 1);
    }

    if (localIndex !== data.length - 1) {
      setDisableNext(false);
    }
  };

  return (
    <>
          <ul className={classes.sliderMain}>
            {data.map((d, index) => (
              <li key={index} className={getPosition(index)}>
                {d}
              </li>
            ))}
          </ul>
          <div className={classes.slider2Bars}>
            <div className={classes.sliderNavButtons2}>
              <button type="button" disabled={disablePrev} className={classes.slider2Nav}  onClick={handlePrev}>
                <i className="fas fa-arrow-left" />
              </button>
              <span />
              <button type="button" disabled={disableNext} className={classes.slider2Nav} onClick={handleNext}>
                <i className="fas fa-arrow-right" />
              </button>
            </div>
          </div>
        </>
  );
}

export default ManualSliderSwipe;
