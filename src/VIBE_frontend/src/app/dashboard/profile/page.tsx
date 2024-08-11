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
        <div className="flex w-1/3">
          <Avatar className="h-16 w-16">
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>{" "}
        </div>
        <div className="flex-1 w-2/3">
          <p>Email: {userDetails?.email}</p>
          <p>Username: {userDetails?.userName}</p>
          <p>Community Name: {userDetails?.communityName}</p>
        </div>
      </div>

      <Separator className="my-4" />

      <h2 className="font-bold mt-4">My Events</h2>
      <div className="mt-4">
        {userEvents.map((event) => (
          <div key={event.id} className="mb-4 p-4 bg-gray-800 rounded-md">
            <h3 className="text-xl font-bold">{event.title}</h3>
            <p>{event.description}</p>
            <p>Location: {event.location}</p>
            <p>Start Date: {new Date(event.startDate).toLocaleDateString()}</p>
            <p>End Date: {new Date(event.endDate).toLocaleDateString()}</p>
          </div>
        ))}
      </div>

      <h2 className="font-bold mt-4">Liked Events</h2>
      <div className="mt-4">
        {userLikedEvents.map((event) => (
          <div key={event.id} className="mb-4 p-4 bg-gray-800 rounded-md">
            <h3 className="text-xl font-bold">{event.title}</h3>
            <p>{event.description}</p>
            <p>Location: {event.location}</p>
            <p>Start Date: {new Date(event.startDate).toLocaleDateString()}</p>
            <p>End Date: {new Date(event.endDate).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profile;