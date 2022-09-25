# react-ribbon

A fully responsive carousel with built-in SSR support.

## The Terminology

react-ribbon introduces the concept of pages. Pages are used to determine how many elements (slides) will be visible at a given time.
A page can hold many slides. While slides are actual elements in the DOM tree, pages are purely conceptual.

## Styling

react-ribbon relies on [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties) for customization. This allows us to have a fully responsive carousel while supporting server-side rendering (SSR).

The CSS `calc()` function is used throughout this library to perform calculations. Unitless values like `0` or `50` don't play well with `calc()` for values representing dimensions. You must include the unit like so: `0px`, `50px`.

## CSS Variables

#### `--slides-per-page`

The number of slides visible at once. Can be an integer a floating number. Defaults to `1`.

---

#### `--slides-to-scroll`

Controls how many slides should be scrolled through when triggering a scroll from the UI. By default, it will amount to the number of slides per page.

---

#### `--scroll-duration`

Specifies the duration over which scroll transitions should occur. Defaults to `0.5s`.

---

#### `--slide-gap`

The amount of space between each slide. Can be in percentage or pixels. Defaults to `0px`.

---

#### `--offset`

The horizontal offset applied to the carousel (Similar to adding `margin-left` and `margin-right`). Can be in percentage or pixels. Defaults to `0px`.

---

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

### ref

`CarouselRef`

A ref which gives access to the `prevPage` and `nextPage` functions used for navigation.
