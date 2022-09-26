import React, {
  FocusEvent,
  HTMLAttributes,
  ReactElement,
  useRef,
  useState,
  CSSProperties,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";

import classNames from "classnames/bind";

import { useResizeObserver } from "./Carousel.hook";
import { Slide } from "./Slide";

import styles from "../styles/style.scss";

export interface OnPageChangeParams {
  currentPage: number;
  lastPage: number;
}

export type CarouselRef = {
  prevPage: () => void;
  nextPage: () => void;
};

export interface CarouselProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactElement[];
  initialSlideCount: number;
  lazy?: boolean;
  onPageChange?: (onPageChangeParams: OnPageChangeParams) => void;
}

const cx = classNames.bind(styles);

const SLIDE_CLASSNAME = cx("slide");

const getCssVariable = (elem: HTMLDivElement, variable: string) => {
  return parseFloat(getComputedStyle(elem).getPropertyValue(variable));
};

export const Carousel = forwardRef<CarouselRef, CarouselProps>(
  (
    {
      children,
      initialSlideCount,
      lazy = true,
      onPageChange,
      className,
      ...otherProps
    },
    ref
  ) => {
    const widthRef = useRef(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    const [state, setState] = useState({
      currentPage: 0,
      pageOffset: 0,
      lastPage: 0,
      slidesToScroll: initialSlideCount,
      slidesPerPage: initialSlideCount,
      shouldAnimate: false,
    });

    const {
      currentPage,
      pageOffset,
      lastPage,
      slidesToScroll,
      slidesPerPage,
      shouldAnimate,
    } = state;

    const totalSlideCount = children.length;
    const pageStart = currentPage * slidesToScroll;
    const pageEnd = pageStart + (slidesPerPage - 1);
    const firstVisibleSlide = pageStart - 1;
    const lastVisibleSlide = pageEnd + 1;

    const getSlidesPerPage = () => {
      return getCssVariable(containerRef.current!, "--slides-per-page");
    };

    const getSlidesToScroll = () => {
      return getCssVariable(containerRef.current!, "--slides-to-scroll");
    };

    const getLastPage = () => {
      return Math.max(
        0,
        (totalSlideCount - getSlidesPerPage()) / getSlidesToScroll()
      );
    };

    const getPageOffset = () => {
      const decimals = getSlidesPerPage() - Math.trunc(getSlidesPerPage());
      return decimals / 2;
    };

    const getCurrentPageWithOffset = () => {
      const atFirstPage = currentPage === 0;
      const atLastPage = currentPage === lastPage;
      const shouldOffset = !atFirstPage && !atLastPage;

      if (!shouldOffset) return currentPage;

      const shouldOffsetToTheRight = Number.isInteger(currentPage);
      const offset = shouldOffsetToTheRight ? pageOffset * -1 : pageOffset;

      return currentPage + offset;
    };

    const changePage = (newPage: number) => {
      if (currentPage !== newPage) {
        setState({
          ...state,
          shouldAnimate: true,
          currentPage: newPage,
        });
      }
    };

    const prevPage = () => changePage(Math.max(0, currentPage - 1));
    const nextPage = () => changePage(Math.min(getLastPage(), currentPage + 1));

    const handleFocus = (event: FocusEvent) => {
      if (!trackRef.current) return;

      const focusedSlide = event.target.closest(
        `.${CSS.escape(SLIDE_CLASSNAME)}`
      );

      if (!focusedSlide) return;

      const focusedSlideIndex = [...trackRef.current.children].indexOf(
        focusedSlide
      );

      // TODO: this should be more granular, we should scroll the track just enough to reveal the element that gained focus
      if (focusedSlideIndex > pageEnd) {
        nextPage();
      } else if (focusedSlideIndex < pageStart) {
        prevPage();
      }
    };

    useResizeObserver(containerRef, ([entry]) => {
      if (!entry) return;
      if (widthRef.current === entry.contentRect.width) return;

      widthRef.current = entry.contentRect.width;

      setState((state) => {
        const { currentPage, slidesToScroll } = state;
        const pageStart = Math.round(currentPage) * slidesToScroll;
        const newPage = Math.min(
          getLastPage(),
          pageStart / getSlidesToScroll()
        );

        return {
          ...state,
          shouldAnimate: false,
          slidesToScroll: getSlidesToScroll(),
          slidesPerPage: getSlidesPerPage(),
          lastPage: getLastPage(),
          currentPage: newPage,
          pageOffset: getPageOffset(),
        };
      });
    });

    /**
     * Tell the consumer when the current or last page changes
     */
    useEffect(() => {
      onPageChange?.({ currentPage, lastPage });
    }, [currentPage, lastPage]);

    useImperativeHandle(ref, () => ({
      prevPage,
      nextPage,
    }));

    return (
      <div
        {...otherProps}
        className={cx("container", className)}
        ref={containerRef}
        style={
          {
            "--current-page": getCurrentPageWithOffset(),
          } as CSSProperties
        }
        onFocus={handleFocus}
      >
        <div
          className={cx("track", {
            animate: shouldAnimate,
          })}
          ref={trackRef}
        >
          {children.map((element, index) => {
            const isVisible =
              index >= firstVisibleSlide && index <= lastVisibleSlide;

            return (
              <Slide isVisible={isVisible} lazy={lazy} key={index}>
                {element}
              </Slide>
            );
          })}
        </div>
      </div>
    );
  }
);
