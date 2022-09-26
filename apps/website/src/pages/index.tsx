import React from "react";
import { CarouselStandard } from "../components/CarouselStandard/CarouselStandard";
import { CarouselHero } from "../components/CarouselHero/CarouselHero";
import { Card } from "../components/Card/Card";

const Home = () => (
  <main>
    <h1>React Ribbon</h1>

    <h2>Hero</h2>
    <CarouselHero>
      {new Array(20).fill(true).map((_, index) => (
        <Card key={index} index={index + 1} />
      ))}
    </CarouselHero>

    <h2>Standard</h2>
    <CarouselStandard>
      {new Array(20).fill(true).map((_, index) => (
        <Card key={index} index={index + 1} />
      ))}
    </CarouselStandard>
  </main>
);

export default Home;
