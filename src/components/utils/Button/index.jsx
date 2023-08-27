import React from "react";
import { BeatLoader, PulseLoader } from "react-spinners";

const Button = (props) => {
  if (props?.loading) {
    return <button {...props} disabled><PulseLoader className="py-1" size={8} color="gray" /></button>;
  }
  return <button {...props} />;
};

export default Button;
