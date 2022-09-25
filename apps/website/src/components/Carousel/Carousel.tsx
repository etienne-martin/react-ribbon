import React, { FC, ReactElement, useRef } from "react";
import {
  Carousel as ReactCarousel,
  CarouselRef,
  OnPageChangeParams,
} from "react-ribbon";

import { NextButton, PrevButton } from "../CarouselNavButton/CarouselNavButton";

interface CarouselProps {
  children: ReactElement[];
  initialSlideCount: number;
  styles: {
    readonly [key: string]: string;
  };
}

export const Carousel: FC<CarouselProps> = ({
  children,
  initialSlideCount,
  styles,
}) => {
  const carouselRef = useRef<CarouselRef>(null);
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);

  const handlePageChange = ({ currentPage, lastPage }: OnPageChangeParams) => {
    const shouldShowPrevButton = currentPage !== 0;
    const shouldShowNextButton = currentPage !== lastPage;

    prevButtonRef.current?.style.setProperty(
      "opacity",
      shouldShowPrevButton ? "1" : "0.4"
    );

    nextButtonRef.current?.style.setProperty(
      "opacity",
      shouldShowNextButton ? "1" : "0.4"
    );
  };

  return (
    <>
      <header>
        <PrevButton
          ref={prevButtonRef}
          onClick={() => carouselRef.current?.prevPage()}
        />

        <NextButton
          ref={nextButtonRef}
          onClick={() => carouselRef.current?.nextPage()}
        />
      </header>
      <div className={styles.container}>
        <ReactCarousel
          ref={carouselRef}
          initialSlideCount={initialSlideCount}
          onPageChange={handlePageChange}
          className={styles.carousel}
        >
          {children}
        </ReactCarousel>
      </div>
    </>
  );
};
