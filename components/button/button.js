import styles from "./button.module.scss";
import Icon from "../icon/icon";

export default function Button({ kind = "primary", disabled = false, size = "medium", fullWidth = true, text, type = "button", handleOnClick = false, index, icon, iconPos = "left" }) {
  const handleClick = (event) => {
    if (handleOnClick != false) {
      handleOnClick(index, text);
    } else {
    }
  };

  return (
    <button
      className={`${styles.btn} ${styles[kind]} ${styles[size]} ${fullWidth ? styles.fullWdith : ""} ${iconPos == "left" ? styles["btn--icon-left"] : ""} ${iconPos == "right" ? styles["btn--icon-right"] : ""} text-button`}
      type={type}
      disabled={disabled}
      onClick={handleClick}
    >
      {
        icon &&
        <span className={`${styles["btn__icon"]}`}>
          <Icon iconName={icon} />
        </span>
      }
      
      <span className={`${styles["btn__text"]} ${icon ? "" : styles["btn__text--no-icon"]}`}>
        {text}
      </span>
    </button>
  );
}
