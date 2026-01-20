import React, { useRef } from 'react';
import { PresentationControls } from "@react-three/drei";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import MacbookModel14 from "../models/Macbook-14.jsx";
import MacbookModel16 from "../models/Macbook-16.jsx";

const ANIMATION_DURATION = 1;
const OFFSET_DISTANCE = 5;

const fadeMeshes = (group, opacity) => {
  if (!group) return;
  group.traverse((child) => {
    if (child.isMesh && child.material) {
      // 1. Fix: Enable transparency so opacity changes work
      child.material.transparent = true;
      // 2. Fix: Correct GSAP Syntax
      gsap.to(child.material, { opacity, duration: ANIMATION_DURATION });
    }
  });
};

const ModelSwitcher = ({ scale, isMobile }) => {
  const smallMacbookRef = useRef();
  const largeMacbookRef = useRef();

  const showLargeMacbook = scale === 0.008 || scale === 0.05;

  const controlsConfig = {
    // 3. Fix: Use a spring config object for 'snap' so it actually returns
    snap: { mass: 4, tension: 400 },
    global: true,
    speed: 1,
    zoom: 1,
    polar: [-Math.PI / 2, Math.PI / 2],
    rotation: [0, Math.PI / 2, 0],
    azimuth: [-Math.PI / 6, Math.PI / 6]
  };

  useGSAP(() => {
    if (showLargeMacbook) {
      // SHOW 16 (Large)
      // 14 exits to Left (-x)
      gsap.to(smallMacbookRef.current.position, { x: -OFFSET_DISTANCE, duration: ANIMATION_DURATION });
      fadeMeshes(smallMacbookRef.current, 0);

      // 16 enters from Right (+x)
      gsap.fromTo(largeMacbookRef.current.position,
          { x: OFFSET_DISTANCE },
          { x: 0, duration: ANIMATION_DURATION }
      );
      fadeMeshes(largeMacbookRef.current, 1);

    } else {
      // SHOW 14 (Small)
      // 16 exits to Right (+x)
      gsap.to(largeMacbookRef.current.position, { x: OFFSET_DISTANCE, duration: ANIMATION_DURATION });
      fadeMeshes(largeMacbookRef.current, 0);

      // 14 enters from Left (-x)
      gsap.fromTo(smallMacbookRef.current.position,
          { x: -OFFSET_DISTANCE },
          { x: 0, duration: ANIMATION_DURATION }
      );
      fadeMeshes(smallMacbookRef.current, 1);
    }
  }, [showLargeMacbook]);

  return (
      // 4. Fix: Use ONE PresentationControls wrapper for both items
      <PresentationControls {...controlsConfig}>
        <group ref={largeMacbookRef}>
          <MacbookModel16 scale={isMobile ? 0.05 : 0.08} />
        </group>

        <group ref={smallMacbookRef}>
          <MacbookModel14 scale={isMobile ? 0.03 : 0.06} />
        </group>
      </PresentationControls>
  );
};

export default ModelSwitcher;