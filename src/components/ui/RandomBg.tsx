import React, { useRef, useEffect, useState } from "react";

const svgs = [
  "./Black-heads/head-1.svg",
  "./Black-heads/head-2.svg",
  "./Black-heads/head-3.svg",
  "./Black-heads/head-4.svg",
  "./Black-heads/head-5.svg",
  "./Black-heads/head-6.svg",
  "./Black-heads/head-7.svg",
  "./Black-heads/head-8.svg",
  "./Black-heads/head-9.svg",
  "./Black-heads/head-10.svg",
  "./Black-heads/head-11.svg",
  "./Black-heads/head-12.svg",
  "./Black-heads/head-13.svg",
  "./Black-heads/head-14.svg",
];

const RandomBg = ({ avoidRefs }) => {
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

export default RandomBg;
