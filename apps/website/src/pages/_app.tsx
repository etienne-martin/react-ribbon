import React from "react";
import App from "next/app";
import "react-ribbon/dist/style.css";

import "../style.scss";

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return <Component {...pageProps} />;
  }
}
