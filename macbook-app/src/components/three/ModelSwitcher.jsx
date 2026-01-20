// 14 and 16 -> Presentation Control
import React, {useRef} from 'react';
import {PresentationControls} from "@react-three/drei";
import gsap from "gsap";

import MacbookModel14 from "../models/Macbook-14.jsx";
import MacbookModel16 from "../models/Macbook-16.jsx";
import {useGSAP} from "@gsap/react";

const ANIMATION_DURATION = 1;
const OFFSET_DISTANCE = 5;

const fadeMeshes = (group, opacity) => {
  if (!group) return;

  group.traverse((child)=>{
    if(child.isMesh) {
      child.to(child.material, {opacity, duration: ANIMATION_DURATION})
    }
  })
}

const moveGroup = (group, x) => {
  if (!group) return;
  group.to(group.position, {x, duration: ANIMATION_DURATION} )
}


const ModelSwitcher = ({scale, isMobile}) => {

  const smallMacbookRef = useRef();
  const largeMacbookRef = useRef();

  const showLargeMacbook = scale === 0.008 || scale === 0.05;

  const controlsConfig = {
    snap: true, // Use an object instead of 'true' for a snappier return
    global: true, // Crucial: allows dragging outside the canvas without getting stuck
    speed: 1,
    zoom: 1,
    // polar: [-Math.PI, Math.PI],
    // rotation: [0, Math.PI / 2, 0],
    azimuth: [-Infinity, Infinity],
    config: { mass:1, tension:0, friction:26 }
  }

  useGSAP(()=>{
    if (showLargeMacbook) {
      moveGroup(smallMacbookRef.current, -OFFSET_DISTANCE);
      moveGroup(largeMacbookRef.current, 0);

      fadeMeshes(smallMacbookRef.current, 0);
      fadeMeshes(largeMacbookRef.current, 1);

    }
    else {
      moveGroup(smallMacbookRef.current, 0);
      moveGroup(largeMacbookRef.current, OFFSET_DISTANCE);

      fadeMeshes(smallMacbookRef.current, 1);
      fadeMeshes(largeMacbookRef.current, 0);

    }

  }, [scale])

  return (
    <>
      <PresentationControls {...controlsConfig} >
        <group ref={largeMacbookRef} >
          <MacbookModel16 scale={isMobile ? 0.05 : 0.08} />
        </group>
      </PresentationControls>
      <PresentationControls {...controlsConfig } >
        <group ref={smallMacbookRef} >
          <MacbookModel14 scale={isMobile ? 0.03 : 0.06} />
        </group>
      </PresentationControls>
    </>
  );
};

export default ModelSwitcher;