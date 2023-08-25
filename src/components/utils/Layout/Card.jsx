import React from "react";

const Card = (props) => {
  return <div {...props} className={`border border-dark_secondary p-4 shadow-sm bg-white dark:bg-dark_secondary/50 rounded-xl ${props.className}`} />;
};

Card.defaultProps = {
  className: "",
};

export default Card;
