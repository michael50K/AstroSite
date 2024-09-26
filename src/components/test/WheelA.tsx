// src/WheelComponent.tsx
import React, { useState, useRef, useEffect } from 'react';
import './WheelComponent.css';

interface WheelComponentProps {
  numSpins?: number;
  onSpinEnd?: (result: number) => void;
}

const WheelComponent: React.FC<WheelComponentProps> = ({ numSpins = 10, onSpinEnd }) => {
  const [slices, setSlices] = useState<string[]>(["Slice 1", "Slice 2", "Slice 3", "Slice 4", "Slice 5", "Slice 6", "Slice 7", "Slice 8"]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const wheelRef = useRef<HTMLDivElement | null>(null);
  const [newSlice, setNewSlice] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewSlice(e.target.value);
  };

  const addSlice = () => {
    if (newSlice && slices.length < 20) {
      setSlices([...slices, newSlice]);
      setNewSlice('');
    }
  };

  const removeSlice = (index: number) => {
    if (slices.length > 2) {
      const updatedSlices = [...slices];
      updatedSlices.splice(index, 1);
      setSlices(updatedSlices);
    }
  };

  useEffect(() => {
    if (selectedIndex !== null) {
      onSpinEnd?.(selectedIndex);
    }
  }, [selectedIndex, onSpinEnd]);

  const spinWheel = () => {
    if (!wheelRef.current) return;

    const totalDegrees = 360 * numSpins;
    const randomIndex = Math.floor(Math.random() * slices.length);
    const sliceDegrees = 360 / slices.length;
    const startDegrees = Math.floor(Math.random() * 360);
    const endDegrees = startDegrees + totalDegrees + randomIndex * sliceDegrees;

    let currentDegrees = startDegrees;

    const interval = setInterval(() => {
      if (currentDegrees >= endDegrees) {
        clearInterval(interval);
        setSelectedIndex(randomIndex);
      } else {
        if (wheelRef.current) {
          wheelRef.current.style.transform = `rotate(${currentDegrees}deg)`;
        }
        currentDegrees += 5;
      }
    }, 20);
  };

  return (
    <div className="wheel-container">
      <div className="wheel" ref={wheelRef}>
        {slices.map((slice, index) => (
          <div
            key={index}
            className="slice"
            style={{
              transform: `translate(100px, 100px) rotate(${index * (360 / slices.length)}deg) translate(120px) rotate(-${index * (360 / slices.length)}deg)`,
            }}
          >
            <div
              className="slice-content"
              style={{
                transform: `rotate(${index * (360 / slices.length) + (360 / (2 * slices.length))}deg)`,
              }}
            >
              {slice}
            </div>
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={newSlice}
          onChange={handleInputChange}
          placeholder="Enter new slice label"
        />
        <button onClick={addSlice}>Add Slice</button>
        {slices.map((slice, index) => (
          <button key={index} onClick={() => removeSlice(index)}>Remove Slice {index + 1}</button>
        ))}
      </div>
      <button onClick={spinWheel}>Spin</button>
    </div>
  );
};

export default WheelComponent;