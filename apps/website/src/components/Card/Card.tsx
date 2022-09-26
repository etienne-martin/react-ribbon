import React, { FC } from "react";

import styles from "./Card.module.scss";
import { RatioBox } from "../RatioBox/RatioBox";

interface CardProps {
  index: number;
}

export const Card: FC<CardProps> = ({ index }) => {
  const src = `https://via.placeholder.com/800/EEE/CCC/?text=${index}`;

  return (
    <div className={styles.card} tabIndex={0}>
      <RatioBox>
        <img className={styles.image} alt="" src={src} />
      </RatioBox>
    </div>
  );
};
