'use client';
import React from 'react';
import Chip from '@/components/chip/Chip';

const Profile: React.FC = () => {
  const chips = ['JavaScript', 'TypeScript', 'React', 'Next.js'];

  const handleChipClick = (chip: string) => {
    alert(`Chip clicked: ${chip}`);
  };

  return (
    <div>
      <h1>Profile</h1>
      <div>
        {chips.map((chip, index) => (
          <Chip key={index} label={chip} onClick={() => handleChipClick(chip)} />
        ))}
      </div>
    </div>
  );
};

export default Profile;