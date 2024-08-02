'use client';
import React, { useState } from 'react';
import Chip from '@/components/chip/Chip';
import crud from '@/app/crud';

crud.deleteAllDataFromLocalStorage();
const initialData = [
  {
    username: "User 1",
    event_message: "Content description 1",
    image: ["https://cdn.pixabay.com/photo/2016/09/08/18/45/cube-1655118_640.jpg"],
    clip: []
  },
  {
    username: "User 2",
    event_message: "Content description 2",
    image: ["https://cdn.pixabay.com/photo/2016/09/08/18/45/cube-1655118_640.jpg"],
    clip: []
  },
  {
    username: "User 3",
    event_message: "Content description 3",
    image: ["https://cdn.pixabay.com/photo/2016/09/08/18/45/cube-1655118_640.jpg"],
    clip: []
  }
];
crud.saveDataToLocalStorage(initialData);
const storedData = crud.getDataFromLocalStorage();

const Dashboard: React.FC = () => {
  const chips = ['Technology', 'Business', 'Marketing', 'Education', 'Arts'];
  const handleChipClick = (chip: string) => {
    alert(`Chip clicked: ${chip}`);
  };

  const [likes, setLikes] = useState<number[]>(storedData.map(() => 0));

  const handleLikeClick = (index: number) => {
    const newLikes = [...likes];
    newLikes[index] += 1;
    setLikes(newLikes);
  };

  return (
    <div>
      {/* Chips */}
      <h1 className='text-lg font-bold m-2'>Hello, World!</h1>
      <div className='flex justify-center mt-4'>
        {chips.map((chip, index) => (
          <Chip key={index} label={chip} onClick={() => handleChipClick(chip)} />
        ))}
      </div>

      {/* Event Containers */}
      <div className='m-2 mt-7 text-3xl font-bold'>
        <h1>Feed</h1>
      </div>

      {storedData.map((item: { username: string; event_message: string; image: string[]; }, index: number) => (
        <div key={item.username} className="m-2 mt-8 p-5 bg-gray-800 bg-opacity-60 rounded-md shadow-lg">
          {/* Event header */}
          <div className='text-xl font-bold text-white'>
            {item.username}
          </div>

          <div className='text-sm text-gray-200'>
            {item.event_message}
          </div>

          {/* Event Body Place Image here */}
          <div className='p-4'>
            {item.image.length > 0 && (
              <img src={item.image[0]} alt="Event" className="w-full h-auto rounded-md" />
            )}
          </div>

          {/* Event Footer */}
          <div className='flex justify-between items-center'>
            <button
              onClick={() => handleLikeClick(index)}
              className='bg-blue-500 text-white py-1 px-3 rounded-md'
            >
              Like {likes[index]}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
