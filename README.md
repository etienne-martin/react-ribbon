# react-ribbon

A fully responsive React carousel with first-class SSR support.

[![Build status](https://github.com/etienne-martin/react-ribbon/workflows/Pipeline/badge.svg)](https://github.com/etienne-martin/react-ribbon/actions)
[![npm monthly downloads](https://img.shields.io/npm/dm/react-ribbon.svg)](https://www.npmjs.com/package/react-ribbon)

## Installation

To use react-ribbon in your project, run:

```shell script
npm install react-ribbon
```

## CSS Variables

The appearance and behavior of carousels are controlled via [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties). This allows for a fully responsive carousel while supporting server-side rendering (SSR). The CSS `calc()` function is used throughout the library to perform calculations. Please note that unitless values like `0` or `50` don't play well with `calc()` for values representing dimensions so make sure to include units when specifying dimensions.

**`--slides-per-page`**

Pages are used to determine how many slides will be visible at a given time. A page can hold many slides. While slides are actual elements in the DOM tree, pages are purely conceptual.

Can be an integer a floating number. Defaults to `1`.

---                     

**`--slides-to-scroll`**

Controls how many slides should be scrolled when navigating the carousel. Defaults to `--slides-per-page`.

---

**`--scroll-duration`**

Specifies the duration over which scroll transitions should occur. Defaults to `0.5s`.

---

**`--slide-gap`**

The amount of space between each slide. Can be in percentage or pixels. Defaults to `0px`.

---

**`--offset`**      

The horizontal offset applied to the carousel Can be in percentage or pixels. Defaults to `0px`.


## Props

### children

`ReactElement[]`

An array of React elements to be rendered as slides inside the carousel.

---

### onPageChange

`({ currentPage, lastPage }: OnPageChangeParams) => void`

Triggered whenever a navigation occurs and after mounting the carousel.

---

### initialSlideCount

`number`

The number of slides to include in the initial server-side render. This help to reduce the size of the HTML payload and speed up hydration by partially rendering only a fixed number of slides on the server.

---

### lazy

`boolean`

On-demand rendering of slides as they move into view. Enabled by default.

---

### ref

`CarouselRef`

A ref which gives access to the `prevPage` and `nextPage` functions used for navigation.
