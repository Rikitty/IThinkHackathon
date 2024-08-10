"use client";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { fetchEvents, toggleLikeEvent } from "@/lib/features//events/eventsSlice"; 
import Chip from "@/components/chip/Chip";
import { GrCalendar, GrLocation } from "react-icons/gr";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";


interface Like {
  userId: number;
}

interface ExtendedEvent {
  id: number;
  title: string;
  location: string;
  description: string;
  startDate: Date;
  endDate: Date;
  imageUrl: string | null;
  userId: number;
  likes?: Like[]; // Extend the Event type to include likes
}




const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const events = useAppSelector((state) => state.events.events) as ExtendedEvent[];
  const userId = useAppSelector((state) => state.user.id);
  const token = useAppSelector((state) => state.user.token) || "";

  const chips = ["Technology", "Business", "Marketing", "Education", "Arts"];

  useEffect(() => {
    // Fetch events on component mount
    dispatch(fetchEvents());
  }, [dispatch]);

  const handleChipClick = (chip: string) => {
    alert(`Chip clicked: ${chip}`);
  };

  const handleLikeClick = (eventId: number, hasLiked: boolean) => {
    dispatch(toggleLikeEvent({ eventId, hasLiked, token }));
  };

  return (
    <div>
      <h1 className="text-lg font-bold m-2">Hello, World!</h1>
      <div className="flex justify-center mt-4">
        {chips.map((chip, index) => (
          <Chip key={index} label={chip} onClick={() => handleChipClick(chip)} />
        ))}
      </div>

      <div className="m-2 mt-7 text-3xl font-bold">
        <h1>Feed</h1>
      </div>
      {events.map((item) => {
        const likes = item.likes || [];
        const hasLiked = likes.some((like) => like.userId === userId);

        return (
          <div key={item.id} className="m-2 mt-8 p-2 bg-gray-800 bg-opacity-60 rounded-md shadow-lg flex">
            <div className="w-1/3 p-4 flex justify-center">
              {item.imageUrl && (
                <img src={item.imageUrl} alt="Event" className="w-full h-auto rounded-md" />
              )}
            </div>

            <div className="w-2/3 p-3">
              <div className="text-xl font-bold text-white">{item.title}</div>
              <div className="text-sm text-gray-400 flex items-center mt-2">
                <GrCalendar className="mr-1" />
                {new Date(item.startDate).toDateString()} <GrLocation className="ml-2 mr-1" /> {item.location}
              </div>
              <div className="text-sm text-gray-200 mt-2">{item.description}</div>

              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => handleLikeClick(item.id, hasLiked)}
                  className="bg-orange-400 text-white py-1 px-3 rounded-md flex items-center"
                >
                  {hasLiked ? <FaHeart className="mr-2" /> : <CiHeart className="mr-2" />} {likes.length}
                </button>
                <button
                  className="bg-yellow-500 text-white py-1 px-3 rounded-md"
                  onClick={() => alert("Register Now")}
                >
                  REGISTER NOW
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Dashboard;
