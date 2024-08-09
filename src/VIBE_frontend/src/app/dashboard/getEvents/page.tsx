"use client";
import React, { useState, useEffect } from "react";
import Chip from "@/components/chip/Chip";
import { GrCalendar, GrLocation } from "react-icons/gr";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { useAppSelector } from "@/lib/hooks";

const Dashboard: React.FC = () => {
  const [events, setEvents] = useState([]);
  const userId = useAppSelector((state) => state.user.id);
  const token = useAppSelector((state) => state.user.token);

  const chips = ["Technology", "Business", "Marketing", "Education", "Arts"];

  useEffect(() => {
    // Fetch events and user likes from the server
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:3001/events");
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [events]);

  const handleChipClick = (chip: string) => {
    alert(`Chip clicked: ${chip}`);
  };

  const handleLikeClick = async (eventId: number, hasLiked: boolean) => {
    try {
      const url = `http://localhost:3001/events/${eventId}/${
        hasLiked ? "unlike" : "like"
      }`;
      const method = hasLiked ? "DELETE" : "POST";

      console.log("Sending request:", { url, method, token });

      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        console.error("Failed to update like status:", response.statusText);
      } else {
        // Re-fetch events to update the likes count and liked status
        const data = await response.json();
        console.log("Response data:", data);
        setEvents(data);
      }
    } catch (error) {
      console.error("Error updating like status:", error);
    }
  };

  return (
    <div>
      {/* Chips */}
      <h1 className="text-lg font-bold m-2">Hello, World!</h1>
      <div className="flex justify-center mt-4">
        {chips.map((chip, index) => (
          <Chip
            key={index}
            label={chip}
            onClick={() => handleChipClick(chip)}
          />
        ))}
      </div>

      {/* Event Containers */}
      <div className="m-2 mt-7 text-3xl font-bold">
        <h1>Feed</h1>
      </div>
      {events.map((item: any, index: number) => {
        const likes = item.likes || []; // Fallback to an empty array if likes is undefined
        const hasLiked = likes.some((like: any) => like.userId === userId);

        return (
          <div
            key={index}
            className="m-2 mt-8 p-2 bg-gray-800 bg-opacity-60 rounded-md shadow-lg flex"
          >
            {/* Event Image */}
            <div className="w-1/3 p-4 flex justify-center">
              {item.imageUrl && (
                <img
                  src={item.imageUrl}
                  alt="Event"
                  className="w-full h-auto rounded-md"
                />
              )}
            </div>

            {/* Event Details */}
            <div className="w-2/3 p-3">
              <div className="text-xl font-bold text-white">{item.title}</div>
              <div className="text-sm text-gray-400 flex items-center mt-2">
                <GrCalendar className="mr-1" />
                {new Date(item.startDate).toDateString()}{" "}
                <GrLocation className="ml-2 mr-1" /> {item.location}
              </div>
              <div className="text-sm text-gray-200 mt-2">
                {item.description}
              </div>

              {/* Event Footer */}
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => handleLikeClick(item.id, hasLiked)}
                  className="bg-orange-400 text-white py-1 px-3 rounded-md flex items-center"
                >
                  {hasLiked ? (
                    <FaHeart className="mr-2" />
                  ) : (
                    <CiHeart className="mr-2" />
                  )}{" "}
                  {likes.length}
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
