import styles from "./Btn.module.css";
import React from "react";

const Button = ({
  text,
  onClick,
  icon,
  backgroundColor,
  type = "button",
  onLogout,
}) => {
  const buttonStyle = {
    backgroundColor: backgroundColor,
  };

  const handleClick = () => {
    if (onLogout) {
      onLogout(); // Anropa logout-funktionen om den finns
    } else {
      onClick(); // Annars anropa standard onClick
    }
  };

  return (
    <button
      type={type}
      className={styles.submitBtn}
      style={buttonStyle}
      onClick={handleClick}
    >
      {icon}
      {text}
    </button>
  );
};

export default Button;
