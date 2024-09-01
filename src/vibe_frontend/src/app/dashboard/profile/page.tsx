"use client";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  fetchUserEvents,
  fetchUserLikedEvents,
  fetchUserDetails,
} from "@/lib/features/auth/userSlice";
import Chip from "@/components/chip/Chip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { FaUser } from "react-icons/fa";

const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const { id, token, userDetails, userEvents, userLikedEvents, status, error } =
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

  const chips = ["JavaScript", "TypeScript", "React", "Next.js"];

  const handleChipClick = (chip: string) => {
    alert(`Chip clicked: ${chip}`);
  };

  // Delete event handler
  const handleDeleteEvent = async (eventId: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?"
    );
    if (confirmed) {
      try {
        const response = await fetch(
          `http://localhost:3001/events/${eventId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const responseData = await response.text();
        console.log("Response status:", response.status);
        console.log("Response data:", responseData);

        if (response.ok) {
          dispatch(fetchUserEvents());
          alert("Event deleted successfully.");
        } else {
          alert(
            `Failed to delete the event. Status: ${response.status}, Message: ${responseData}`
          );
        }
      } catch (error) {
        console.error("Error deleting event:", error);
        alert("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="text-lg m-2">
      <h1 className="font-bold">Profile</h1>
      <div className="flex justify-center mt-4">
        {chips.map((chip, index) => (
          <Chip
            key={index}
            label={chip}
            onClick={() => handleChipClick(chip)}
          />
        ))}
      </div>

      <Separator className="my-4" />

      <div className="flex justify-center mt-4">
        <div className="flex w-1/3 items-center justify-center">
          <Avatar className="h-32 w-32">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex-1 w-2/3">
          <p>Email: {userDetails?.email}</p>
          <p>Username: {userDetails?.userName}</p>
          <p>Community Name: {userDetails?.communityName}</p>
          <div>
            <FaUser className="text-2xl text-yellow-500 mt-4" />
          </div>
        </div>
      </div>

      <Separator className="my-4" />

      <h2 className="font-bold mt-4 flex justify-end"><a href="/dashboard">See all</a></h2>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        {userEvents.map((event) => (
          <div
            key={event.id}
            className="relative bg-white rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300"
          >
            <img
              src={event.imageUrl || 'path/to/default/image.jpg'}
              alt={event.title || 'Event image'}
              className="w-full h-40 object-cover"
            />

            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-900">{event.title}</h3>
              <p className="text-sm text-gray-600 mb-2">
                <span className="block text-gray-500">{event.location}</span>
                <span className="block text-gray-500">
                  {new Date(event.startDate).toLocaleDateString()} -{" "}
                  {new Date(event.endDate).toLocaleDateString()}
                </span>
              </p>
              <p className="text-sm text-gray-700 mb-4 line-clamp-2">
                {event.description}
              </p>
              <div className="flex justify-between items-center">
                <a
                  href={`/dashboard/event/${event.id}/edit`}
                  className="text-blue-500 font-semibold hover:underline"
                >
                  Edit
                </a>
                <button
                  onClick={() => handleDeleteEvent(event.id)}
                  className="text-red-500 font-semibold hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Separator className="my-10"/>


      <h2 className="font-bold mt-4 text-2xl text-yellow-500">Favorites</h2>
      <div className="mt-4">
        {userLikedEvents.map((event) => (
          <div key={event.id} className="mb-4 bg-gray-800 rounded-lg overflow-hidden flex">
            {/* Image Section */}
            <img
              src={event.imageUrl || 'path/to/default/image.jpg'}
              alt={event.title}
              className="w-1/2 h-64 object-cover"
            />
            
            {/* Certificate Details Section */}
            <div className="w-1/2 p-4 bg-white text-gray-900 border-2 border-yellow-500 ">
              <p className="text-lg font-bold text-yellow-500 ">Event Favorites</p>
              <p className="text-sm text-gray-600">{event.location}</p>
              <h3 className="mt-4 text-xl font-semibold">{event.title}</h3>
              <p className="mt-2 text-sm text-gray-600">Username: {userDetails?.userName}</p>
              <div className="flex justify-between mt-8">
                <p className="text-gray-600">Signed</p>
                <p className="text-gray-600">Signed</p>
              </div>
            </div>
          </div>
  ))}
</div>

    </div>
  );
};

export default Profile;
