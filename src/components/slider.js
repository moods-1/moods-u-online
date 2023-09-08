import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  sliderMain: {
    width: "100%",
    height: "100%",
    position: "relative",
    display: "flex",
    overflow: "hidden",
    padding: 0,
    margin: 0,
    listStyle: "none",
    "& .activeSlide": {
      opacity: 1,
      transform: "translateX(0)",
    },
    "& .lastSlide": {
      position: "absolute",
      transform: "translateX(-100%)",
    },
    "& .nextSlide": {
      position: "absolute",
      transform: "translateX(100%)",
    },
    "& li": {
      minWidth: "100%",
      height: "100%",
      opacity: 0,
      top: 0,
      left: 0,
      position: "relative",
      transition: "all 300ms linear",
    },
  },
  sliderBars: {
    display: "flex",
    marginTop: 20,
    alignItems: "center",
    height: 40,
  },
  sliderBar: {
    background: "#ddd",
    height: 4,
    flex: 1,
  },
  sliderNavButtons: {
    minWidth: 120,
    marginLeft: 40,
    display: "flex",
    justifyContent: "space-around",
  },
  sliderNavButtons2: {
    minWidth: 120,
    display: "flex",
    justifyContent: "space-around",
  },
  sliderNav: {
    width: 25,
    height: 25,
    border: "none",
    fontSize: 10,
    color: "#04c401",
    background: "#fff",
    borderRadius: "50%",
    "&:hover": {
      background: "#eee",
    },
    "&:disabled": {
      color: "#888 !important",
      background: "#eee",
    },
  },
  slider2Main: {
    width: "100%",
    height: "auto",
    border: "1px solid blue",
    position: "relative",
    display: "flex",
    overflow: "hidden",
    padding: 0,
    margin: 0,
    listStyle: "none",
    "& .activeSlide": {
      opacity: 1,
      transform: "translateX(0)",
    },
    "& .lastSlide": {
      transform: "translateX(100%)",
    },
    "& .nextSlide": {
      transform: "translateX(100%)",
    },
    "& li": {
      width: "100%",
      minHeight: "100%",
      opacity: 0,
      top: 0,
      left: 0,
      position: "absolute",
      transition: "all 300ms linear",
    },
  },
  slider2Bars: {
    width: "100%",
    display: "flex",
    margin: "20px 0px",
    alignItems: "center",
    height: 40,
    justifyContent: 'center'
  },
  slider2Nav: {
    width: 50,
    height: 35,
    border: "none",
    fontSize: 10,
    color: "#04c401",
    background: 'rgba(255, 255, 255, 0.06)',
    borderRadius: "42px",
    "&:hover": {
      background: "#eee",
    },
    "&:disabled": {
      color: "#888 !important",
    },
  },
}));
