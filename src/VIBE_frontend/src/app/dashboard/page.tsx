'use client';
import React from 'react';
import Chip from '@/components/chip/Chip';
import crud from '@/app/crud';

crud.deleteAllDataFromLocalStorage();
const initialData = [
  {
    username: "user1",
    event_message: "Message 1",
    image: [],
    clip: []
  },
  {
    username: "user2",
    event_message: "Message 2",
    image: [],
    clip: []
  },
  {
    username: "user3",
    event_message: "Message 3",
    image: [],
    clip: []
  }
];
crud.saveDataToLocalStorage(initialData);
const storedData = crud.getDataFromLocalStorage();

const Dashboard : React.FC = () => {
  const chips = ['Technology', 'Business', 'Marketing', 'Education', 'Arts'];
  const handleChipClick = (chip: string) => {
    alert(`Chip clicked: ${chip}`);
  };
  return (
    <div>
      
      {/* Chips */}
      <h1 className='text-lg font-bold p-2'>Hello, World!</h1>
      <div className='flex justify-center mt-4'>
        {chips.map((chip, index) => (
          <Chip key={index} label={chip} onClick={() => handleChipClick(chip)} />
        ))}
      </div>

      {/* Event Containers */}
      <div className='p-2 mt-5'>
        <h1>Next content here</h1>
        {storedData.map((item: { username : String; event_message : String; }) => (
        <div className="row-item">
          {item.username} {item.event_message} 
        </div>
      ))}
      </div>
    </div>
  );
};

export default Dashboard;