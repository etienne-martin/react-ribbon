import React, { FC, ReactElement } from "react";

import styles from "./CarouselStandard.module.scss";
import { Carousel } from "../Carousel/Carousel";

interface CarouselStandardProps {
  children: ReactElement[];
}

export const CarouselStandard: FC<CarouselStandardProps> = ({ children }) => {
  return (
    <Carousel initialSlideCount={5} styles={styles}>
      {children}
    </Carousel>
  );
};
