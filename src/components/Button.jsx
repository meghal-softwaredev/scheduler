import React from "react";
import classNames from "classnames";
import "components/Button.scss";

//Button Component to provide consistent button style
export default function Button(props) {
  // set classNames based on type of button
  const buttonClass = classNames("button", {
    "button--confirm": props.confirm,
    "button--danger": props.danger
  });

  return (
    <button
      className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}