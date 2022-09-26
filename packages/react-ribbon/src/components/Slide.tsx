import React, { HTMLAttributes, ReactElement, FC } from "react";
import classNames from "classnames/bind";
import { useInView } from "react-intersection-observer";

import styles from "../styles/style.scss";

export interface SlideProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactElement;
  isVisible: boolean;
  lazy: boolean;
}

const cx = classNames.bind(styles);

export const Slide: FC<SlideProps> = ({ children, isVisible, lazy }) => {
  const { ref, inView } = useInView();
  const shouldRender = lazy ? inView || isVisible : true;

  return (
    <div className={cx("slide")} ref={ref}>
      {shouldRender && children}
    </div>
  );
};
