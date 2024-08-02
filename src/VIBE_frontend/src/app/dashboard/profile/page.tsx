'use client';
import React from 'react';
import Chip from '@/components/chip/Chip';

const Profile: React.FC = () => {
  const chips = ['JavaScript', 'TypeScript', 'React', 'Next.js'];

  const handleChipClick = (chip: string) => {
    alert(`Chip clicked: ${chip}`);
  };

  return (
    <div className='text-lg m-2'>
      <h1 className='font-bold'>Profile</h1>
      <div className='flex justify-center mt-4'>
        {chips.map((chip, index) => (
          <Chip key={index} label={chip} onClick={() => handleChipClick(chip)} />
        ))}
      </div>
    </div>
  );
};

export default Profile;