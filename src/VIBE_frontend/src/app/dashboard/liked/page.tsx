'use client';
import React from 'react';
import Chip from '@/components/chip/Chip';

const Liked: React.FC = () => {
  const chips = ['Technology', 'Business', 'Marketing', 'Education', 'Arts'];
  const handleChipClick = (chip: string) => {
    alert(`Chip clicked: ${chip}`);
  };
  return (
    <div>
      <h1>Liked</h1>
      <div>
        {chips.map((chip, index) => (
          <Chip key={index} label={chip} onClick={() => handleChipClick(chip)} />
        ))}
      </div>
    </div>
  );
};

export default Liked;