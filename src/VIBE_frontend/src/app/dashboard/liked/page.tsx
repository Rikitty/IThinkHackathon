"use client";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  fetchUserEvents,
  fetchUserLikedEvents,
  fetchUserDetails,
} from "@/lib/features/auth/userSlice";
import Chip from "@/components/chip/Chip";
import { GrCalendar, GrLocation } from "react-icons/gr";
import { FaHeart } from "react-icons/fa";
import { CiHeart } from "react-icons/ci";
import { useRouter } from "next/navigation";

const Liked: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { id, token, userLikedEvents, status, error } =
    useAppSelector((state) => state.user);

  useEffect(() => {
    if (id && token) {
      dispatch(fetchUserDetails());
      dispatch(fetchUserEvents());
      dispatch(fetchUserLikedEvents());
    }
  }, [dispatch, id, token]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  const chips = ["Technology", "Business", "Marketing", "Education", "Arts"];

  const handleChipClick = (chip: string) => {
    alert(`Chip clicked: ${chip}`);
  };

  const handleEventClick = (eventId: number) => {
    router.push(`/dashboard/event/${eventId}`);
  };

  return (
    <div className="text-lg m-2">
      <h1 className="font-bold">Liked</h1>
      <div className="flex justify-center mt-4">
        {chips.map((chip, index) => (
          <Chip
            key={index}
            label={chip}
            onClick={() => handleChipClick(chip)}
          />
        ))}
      </div>
      <h2 className="font-bold mt-4">Liked Events</h2>
      <div className="mt-4">
        {userLikedEvents.map((event) => {
          const likes = event.likes || [];
          const hasLiked = likes.some((like) => like.userId === id);

          return (
            <div
              key={event.id}
              className="m-2 mt-8 p-2 bg-gray-800 bg-opacity-60 rounded-md shadow-lg flex cursor-pointer"
              onClick={() => handleEventClick(event.id)} // Handle event click
            >
              <div className="w-1/3 p-4 flex justify-center">
                {event.imageUrl && (
                  <img
                    src={event.imageUrl}
                    alt="Event"
                    className="w-full h-auto rounded-md"
                  />
                )}
              </div>

              <div className="w-2/3 p-3">
                <div className="text-xl font-bold text-white">{event.title}</div>
                <div className="text-sm text-gray-400 flex items-center mt-2">
                  <GrCalendar className="mr-1" />
                  {new Date(event.startDate).toDateString()}{" "}
                  <GrLocation className="ml-2 mr-1" /> {event.location}
                </div>
                <div className="text-sm text-gray-200 mt-2">
                  {event.description}
                </div>

                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent the event click handler from firing
                      // Assuming you have a function to handle likes
                      // handleLikeClick(event.id, hasLiked);
                    }}
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
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent the event click handler from firing
                      handleEventClick(event.id);
                    }}
                    className="bg-yellow-500 text-white py-1 px-3 rounded-md"
                  >
                    REGISTER NOW
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Liked;
