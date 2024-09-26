// src/WheelComponent.tsx
import React, { useState, useRef, useEffect } from 'react';
import './WheelComponent.css';

interface WheelComponentProps {
  numSpins?: number;
  onSpinEnd?: (result: number) => void;
}

const WheelComponent: React.FC<WheelComponentProps> = ({ numSpins = 10, onSpinEnd }) => {
  const [slices, setSlices] = useState<string[]>([]);
  const [newSliceText, setNewSliceText] = useState<string>('');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const wheelRef = useRef<HTMLDivElement | null>(null);
  const totalSlices = slices.length;

  useEffect(() => {
    if (selectedIndex !== null) {
      onSpinEnd?.(selectedIndex);
    }
  }, [selectedIndex, onSpinEnd]);

  const spinWheel = () => {
    if (!wheelRef.current) return;

    const totalDegrees = 360 * numSpins;
    const randomIndex = Math.floor(Math.random() * totalSlices); // Randomly choose a slice between 0 and totalSlices - 1
    const sliceDegrees = 360 / totalSlices;
    const startDegrees = Math.floor(Math.random() * 360);
    const endDegrees = startDegrees + totalDegrees + randomIndex * sliceDegrees;

    let currentDegrees = startDegrees;

    const interval = setInterval(() => {
      if (currentDegrees >= endDegrees) {
        clearInterval(interval);
        // Correctly setting the selected index based on the random index
        setSelectedIndex(randomIndex);
      } else {
        if (wheelRef.current) {
          wheelRef.current.style.transform = `rotate(${currentDegrees}deg)`;
        }
        currentDegrees += 5; // Speed of rotation (smaller increments for smoother animation)
      }
    }, 20);
  };

  const addSlice = () => {
    if (newSliceText.trim() !== '') {
      setSlices([...slices, newSliceText]);
      setNewSliceText('');
    }
  };

  const removeSlice = (index: number) => {
    const newSlices = slices.filter((_, i) => i !== index);
    setSlices(newSlices);
  };

  return (
    <div className="wheel-container">
      <div className="wheel" ref={wheelRef}>
        {slices.map((slice, index) => (
          <div
            key={index}
            className="slice"
            style={{
              transform: `translate(100px, 100px) rotate(${index * (360 / totalSlices)}deg) translate(120px) rotate(-${index * (360 / totalSlices)}deg)`,
            }}
          >
            {slice}
            <button onClick={() => removeSlice(index)}>X</button>
          </div>
        ))}
      </div>
      <input
        type="text"
        value={newSliceText}
        onChange={(e) => setNewSliceText(e.target.value)}
      />
      <button onClick={addSlice}>Add Slice</button>
      <button onClick={spinWheel}>Spin</button>
    </div>
  );
};

export default WheelComponent;