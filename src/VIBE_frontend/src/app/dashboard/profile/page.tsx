import React from 'react';
import Chip from '@/components/chip/Chip';

const Profile: React.FC = () => {
  const chips = ['Technology', 'Business', 'Marketing', 'Education', 'Arts'];

  return (
    <div>
      <h1>Profile</h1>
      <div>
        {chips.map((chip, index) => (
          <Chip key={index} label={chip} />
        ))}
      </div>
    </div>
  );
};

export default Profile;