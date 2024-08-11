"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { GrCalendar, GrLocation } from "react-icons/gr";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import Link from "next/link";
import { useAppSelector } from "@/lib/hooks";
import Image from "next/image";

interface Like {
  userId: number | null;
}

interface ExtendedEvent {
  id: number | null;
  title: string;
  location: string;
  description: string;
  startDate: Date;
  endDate: Date;
  imageUrl: string | null;
  userId: number;
  likes?: Like[] | null;
}

const SingleEventPage: React.FC = () => {
  const [event, setEvent] = useState<ExtendedEvent | null>(null);
  const [hasLiked, setHasLiked] = useState(false);
  const { id } = useParams(); // Get event ID from dynamic route
  const userId = useAppSelector((state) => state.user.id);
  const token = useAppSelector((state) => state.user.token) || "";

  useEffect(() => {
    const fetchEventDetails = async (eventId: number) => {
      try {
        const response = await fetch(`http://localhost:3001/events/${eventId}`);
        const data = await response.json();
        console.log(data);
        setEvent(data);
        setHasLiked(data.likes.some((like: Like) => like.userId === userId));
      } catch (error) {
        console.error("Error fetching event details:", error);
      }
    };
    console.log("ID:", id);
    console.log("User ID:", userId);

    if (id) {
      fetchEventDetails(Number(id));
    }
  }, [id, userId]);

  const handleLikeClick = async () => {
    if (!event) return;

    try {
      await fetch(`http://localhost:3001/events/${event.id}/like`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ hasLiked }),
      });
      setHasLiked(!hasLiked);
      setEvent({
        ...event,
        likes: hasLiked
          ? event.likes?.filter((like) => like.userId !== userId)
          : [...(event.likes || []), { userId }],
      });
    } catch (error) {
      console.error("Error liking the event:", error);
    }
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="m-2 mt-8 p-2 bg-gray-800 bg-opacity-60 rounded-md shadow-lg flex">
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
        <div className="text-sm text-gray-200 mt-2">{event.description}</div>

        <div className="flex justify-between items-center mt-4">
          <button
            onClick={handleLikeClick}
            className="bg-orange-400 text-white py-1 px-3 rounded-md flex items-center"
          >
            {hasLiked ? (
              <FaHeart className="mr-2" />
            ) : (
              <CiHeart className="mr-2" />
            )}{" "}
            {event.likes?.length}
          </button>
          <Link
            href="/dashboard"
            className="bg-yellow-500 text-white py-1 px-3 rounded-md"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleEventPage;
