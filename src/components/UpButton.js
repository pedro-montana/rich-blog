import React, { useState, useEffect, ref } from "react";
import { FaArrowCircleUp } from "react-icons/fa";

function UpButton() {
  const [width, setWidth] = React.useState(window.innerWidth);
  const [height, setHeight] = React.useState(window.innerHeight);
  const updateWidthAndHeight = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };
  React.useEffect(() => {
    window.addEventListener("resize", updateWidthAndHeight);
    return () => window.removeEventListener("resize", updateWidthAndHeight);
  });
  const scrollTop = () => {
    window.scrollTo(0, 0);
  };

  const [offset, setOffset] = useState(false);

  React.useEffect(() => {
  window.onscroll = function() {
    if (window.pageYOffset > 160) {
        setOffset(true);
    } else {

        setOffset(false);
    }
    return () => 
        window.onscroll = null;
};
  }, [])

  return (<>
      <FaArrowCircleUp
        id="up-button"
        style={offset ? {} : {display: "none"}}
        onClick={scrollTop}
        size={width < 990 ? "50" : "70"}
        title="Top"
  />
  </>
  );
}

export default UpButton;
