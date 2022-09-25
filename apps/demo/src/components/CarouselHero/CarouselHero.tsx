import React, { FC, ReactElement } from "react";

import styles from "./CarouselHero.module.scss";
import { Carousel } from "../Carousel/Carousel";

interface CarouselHeroProps {
  children: ReactElement[];
}

export const CarouselHero: FC<CarouselHeroProps> = ({ children }) => {
  return (
    <Carousel initialSlideCount={2} styles={styles}>
      {children}
    </Carousel>
  );
};
