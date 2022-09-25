import React, { ButtonHTMLAttributes } from "react";

import styles from "./CarouselNavButton.module.scss";

export const PrevButton = React.forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(({ ...otherProps }, ref) => {
  return (
    <button {...otherProps} ref={ref} className={`${styles.button}`}>
      {"<"}
    </button>
  );
});

export const NextButton = React.forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement>
>(({ ...otherProps }, ref) => {
  return (
    <button {...otherProps} ref={ref} className={`${styles.button}`}>
      {">"}
    </button>
  );
});
