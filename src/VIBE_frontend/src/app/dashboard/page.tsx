'use client';
import React, { useState } from 'react';
import Chip from '@/components/chip/Chip';
import crud from '@/app/crud';
import { GrCalendar, GrLocation } from 'react-icons/gr';
import { CiHeart } from 'react-icons/ci';
import { FaHeart } from 'react-icons/fa';

crud.deleteAllDataFromLocalStorage();
const initialData = [
  {
    username: "Arduino Day Philippines",
    event_message: "Celebrate Arduino Day with us at Arduino Day Philippines! Join our community, share your projects, and let's make something amazing together!",
    image: ["https://cdn.pixabay.com/photo/2016/09/08/18/45/cube-1655118_640.jpg"],
    clip: [],
    date: "March 23, 2024",
    location: "iAcademy"
  },
  {
    username: "Arduino Day Philippines",
    event_message: "Celebrate Arduino Day with us at Arduino Day Philippines! Join our community, share your projects, and let's make something amazing together!",
    image: ["https://cdn.pixabay.com/photo/2016/09/08/18/45/cube-1655118_640.jpg"],
    clip: [],
    date: "March 23, 2024",
    location: "iAcademy"
  },
  {
    username: "Arduino Day Philippines",
    event_message: "Celebrate Arduino Day with us at Arduino Day Philippines! Join our community, share your projects, and let's make something amazing together!",
    image: ["https://cdn.pixabay.com/photo/2016/09/08/18/45/cube-1655118_640.jpg"],
    clip: [],
    date: "March 23, 2024",
    location: "iAcademy"
  },
  {
    username: "Arduino Day Philippines",
    event_message: "Celebrate Arduino Day with us at Arduino Day Philippines! Join our community, share your projects, and let's make something amazing together!",
    image: ["https://cdn.pixabay.com/photo/2016/09/08/18/45/cube-1655118_640.jpg"],
    clip: [],
    date: "March 23, 2024",
    location: "iAcademy"
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
  const [liked, setLiked] = useState<boolean[]>(storedData.map(() => false));

  const handleLikeClick = (index: number) => {
    const newLikes = [...likes];
    const newLiked = [...liked];

    if (newLiked[index]) {
      newLikes[index] -= 1;
    } else {
      newLikes[index] += 1;
    }
    newLiked[index] = !newLiked[index];
    
    setLikes(newLikes);
    setLiked(newLiked);
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
          {storedData.map((item: { username: string; event_message: string; image: string[]; date: string; location: string; }, index: number) => (
            <div key={index} className="m-2 mt-8 p-2 bg-gray-800 bg-opacity-60 rounded-md shadow-lg flex">
              {/* Event Image */}
              <div className='w-1/3 p-4 flex justify-center'>
                {item.image.length > 0 && (
                  <img src={item.image[0]} alt="Event" className="w-full h-auto rounded-md" />
                )}
              </div>

              {/* Event Details */}
              <div className='w-2/3 p-3'>
                <div className='text-xl font-bold text-white'>
                  {item.username}
                </div>
                <div className='text-sm text-gray-400 flex items-center mt-2'>
                  <GrCalendar className="mr-1" />{item.date} <GrLocation className="ml-2 mr-1" /> {item.location}
                </div>
                <div className='text-sm text-gray-200 mt-2'>
                  {item.event_message}
                </div>

                {/* Event Footer */}
                <div className='flex justify-between items-center mt-4'>
                  <button
                    onClick={() => handleLikeClick(index)}
                    className='bg-orange-400 text-white py-1 px-3 rounded-md flex items-center'
                  >
                    {liked[index] ? <FaHeart className='mr-2' /> : <CiHeart className='mr-2' />} {likes[index]}
                  </button>
                  <button
                    className='bg-yellow-500 text-white py-1 px-3 rounded-md'
                    onClick={() => alert('Register Now')}
                  >
                    REGISTER NOW
                  </button>
                </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dashboard;



// "use client";
// import React, { useEffect } from "react";
// import { useAppDispatch, useAppSelector } from "@/lib/hooks";
// import {
//   fetchEvents,
//   toggleLikeEvent,
// } from "@/lib/features/events/eventsSlice";
// import Chip from "@/components/chip/Chip";
// import { GrCalendar, GrLocation } from "react-icons/gr";
// import { CiHeart } from "react-icons/ci";
// import { FaHeart } from "react-icons/fa";
// import Image from "next/image";
// import { useRouter } from "next/navigation";

// interface Like {
//   userId: number;
// }

// interface ExtendedEvent {
//   id: number;
//   title: string;
//   location: string;
//   description: string;
//   startDate: Date;
//   endDate: Date;
//   imageUrl: string | null;
//   userId: number;
//   likes?: Like[];
// }

// const Dashboard: React.FC = () => {
//   const dispatch = useAppDispatch();
//   const router = useRouter();
//   const events = useAppSelector(
//     (state) => state.events.events
//   ) as ExtendedEvent[];
//   const userId = useAppSelector((state) => state.user.id);
//   const token = useAppSelector((state) => state.user.token) || "";

//   const chips = ["Technology", "Business", "Marketing", "Education", "Arts"];

//   useEffect(() => {
//     // Fetch events on component mount
//     dispatch(fetchEvents());
//   }, [dispatch]);

//   const handleChipClick = (chip: string) => {
//     alert(`Chip clicked: ${chip}`);
//   };

//   const handleLikeClick = (eventId: number, hasLiked: boolean) => {
//     dispatch(toggleLikeEvent({ eventId, hasLiked, token }));
//   };

//   const handleEventClick = (eventId: number) => {
//     router.push(`/dashboard/event/${eventId}`);
//   };

//   return (
//     <div>
//       <h1 className="text-lg font-bold m-2">Hello, World!</h1>
//       <div className="flex justify-center mt-4">
//         {chips.map((chip, index) => (
//           <Chip
//             key={index}
//             label={chip}
//             onClick={() => handleChipClick(chip)}
//           />
//         ))}
//       </div>

//       <div className="m-2 mt-7 text-3xl font-bold">
//         <h1>Feed</h1>
//       </div>
//       {events.map((item) => {
//         const likes = item.likes || [];
//         const hasLiked = likes.some((like) => like.userId === userId);

//         return (
//           <div
//             key={item.id}
//             className="m-2 mt-8 p-2 bg-gray-800 bg-opacity-60 rounded-md shadow-lg flex cursor-pointer"
//             onClick={() => handleEventClick(item.id)} // Handle event click
//           >
//             <div className="w-1/3 p-4 flex justify-center">
//               {item.imageUrl && (
//                 <img
//                   src={item.imageUrl}
//                   alt="Event"
//                   className="w-full h-auto rounded-md"
//                 />
//               )}
//             </div>

//             <div className="w-2/3 p-3">
//               <div className="text-xl font-bold text-white">{item.title}</div>
//               <div className="text-sm text-gray-400 flex items-center mt-2">
//                 <GrCalendar className="mr-1" />
//                 {new Date(item.startDate).toDateString()}{" "}
//                 <GrLocation className="ml-2 mr-1" /> {item.location}
//               </div>
//               <div className="text-sm text-gray-200 mt-2">
//                 {item.description}
//               </div>

//               <div className="flex justify-between items-center mt-4">
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation(); // Prevent the event click handler from firing
//                     handleLikeClick(item.id, hasLiked);
//                   }}
//                   className="bg-orange-400 text-white py-1 px-3 rounded-md flex items-center"
//                 >
//                   {hasLiked ? (
//                     <FaHeart className="mr-2" />
//                   ) : (
//                     <CiHeart className="mr-2" />
//                   )}{" "}
//                   {likes.length}
//                 </button>
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation(); // Prevent the event click handler from firing
//                     handleEventClick(item.id);
//                   }}
//                   className="bg-yellow-500 text-white py-1 px-3 rounded-md"
//                 >
//                   REGISTER NOW
//                 </button>
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default Dashboard;
