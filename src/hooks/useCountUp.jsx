// src/hooks/useCountUp.js
import { useState, useEffect } from 'react';

function useCountUp(target, duration = 1500) {
  const [count, setCount] = useState(0);
  const frameRate = 1000 / 60; // 60fps
  const totalFrames = Math.round(duration / frameRate);

  useEffect(() => {
    let currentFrame = 0;
    const counter = setInterval(() => {
      currentFrame++;
      const progress = currentFrame / totalFrames;
      setCount(Math.round(target * progress));

      if (currentFrame === totalFrames) {
        clearInterval(counter);
        setCount(target); // Ensure it ends on the exact target
      }
    }, frameRate);

    return () => clearInterval(counter); // Cleanup on unmount
  }, [target, duration, totalFrames]);

  return count;
}

export default useCountUp;