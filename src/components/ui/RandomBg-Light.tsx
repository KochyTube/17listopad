import React, { useRef, useEffect, useState } from "react";

const svgs = [
  "./Light-heads/head-1.svg",
  "./Light-heads/head-2.svg",
  "./Light-heads/head-3.svg",
  "./Light-heads/head-4.svg",
  "./Light-heads/head-5.svg",
  "./Light-heads/head-6.svg",
  "./Light-heads/head-7.svg",
  "./Light-heads/head-8.svg",
  "./Light-heads/head-9.svg",
  "./Light-heads/head-10.svg",
  "./Light-heads/head-11.svg",
  "./Light-heads/head-12.svg",
  "./Light-heads/head-13.svg",
  "./Light-heads/head-14.svg",
  "./Light-heads/head-15.svg",

];

const RandomBgLight = ({ avoidRefs }) => {
  const [positions, setPositions] = useState([]);

  const SVG_WIDTH = 100;
  const SVG_HEIGHT = 100;

  useEffect(() => {
    const placedPositions = [];

    const generatePosition = () => {
      let attempts = 0;
      while (attempts < 50) {
        const top = Math.random() * (100 - SVG_HEIGHT / window.innerHeight * 100);
        const left = Math.random() * (100 - SVG_WIDTH / window.innerWidth * 100);
        const newPos = { top, left };

        const overlaps = placedPositions.some(
          (pos) =>
            Math.abs(pos.top - newPos.top) * window.innerHeight / 100 < SVG_HEIGHT &&
            Math.abs(pos.left - newPos.left) * window.innerWidth / 100 < SVG_WIDTH
        );

        const collidesWithComponents = avoidRefs.some(ref => {
          if (!ref.current) return false;
          const rect = ref.current.getBoundingClientRect();
          const svgTop = newPos.top * window.innerHeight / 100;
          const svgLeft = newPos.left * window.innerWidth / 100;
          return !(
            svgLeft + SVG_WIDTH < rect.left ||
            svgLeft > rect.right ||
            svgTop + SVG_HEIGHT < rect.top ||
            svgTop > rect.bottom
          );
        });

        if (!overlaps && !collidesWithComponents) {
          placedPositions.push(newPos);
          return newPos;
        }
        attempts++;
      }

      const fallbackPos = { top: Math.random() * 100, left: Math.random() * 100 };
      placedPositions.push(fallbackPos);
      return fallbackPos;
    };

    setPositions(svgs.map(() => generatePosition()));
  }, [avoidRefs]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {svgs.map((src, index) => (
        <img
          key={index}
          src={src}
          alt=""
          style={{
            position: "absolute",
            top: `${positions[index]?.top}%`,
            left: `${positions[index]?.left}%`,
            width: `${SVG_WIDTH}px`,
            height: `${SVG_HEIGHT}px`,
          }}
        />
      ))}
    </div>
  );
};

export default RandomBgLight;
