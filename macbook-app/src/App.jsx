import React from 'react';
import NavBar from "./components/NavBar.jsx";
import Hero from "./components/Hero.jsx";
import ProductViewer from "./components/ProductViewer.jsx";
import { ScrollTrigger, SplitText  } from "gsap/all";
import gsap from "gsap";
import Showcase from "./components/Showcase.jsx";

gsap.registerPlugin(ScrollTrigger, SplitText);
const App = () => {
  return (
    <main>
      <NavBar />
      <Hero/>
      <ProductViewer/>
      <Showcase/>
    </main>
  );
};

export default App;