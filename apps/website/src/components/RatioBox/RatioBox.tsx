import React, { FC } from "react";

import styles from "./RatioBox.module.scss";

export const RatioBox: FC = ({ children, ...otherProps }) => {
  return (
    <div className={styles.container} {...otherProps}>
      {children}
    </div>
  );
};
