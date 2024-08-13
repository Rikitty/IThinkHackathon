"use client";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  fetchUserEvents,
  fetchUserLikedEvents,
  fetchUserDetails,
} from "@/lib/features/auth/userSlice";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Chip from "@/components/chip/Chip";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
            Username: {userDetails?.userName}
          </h3>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            Community Name: {userDetails?.communityName}{" "}
          </h4>
        </div>
      </div>

      <Separator className="my-4" />

      <h2 className="font-bold mt-4 flex justify-end text-yellow-500"><a href="/dashboard">See all</a></h2>
      <div className="mt-4">
        {userEvents.map((event) => (
          // Card
          <Card key={event.id} className="w-full">
            <CardContent>
              <AspectRatio ratio={16 / 9} className="bg-muted">
                <img
                  src={event.imageUrl as string}
                  alt="Photo by Drew Beamer"
                  className="rounded-md object-cover"
                />
              </AspectRatio>
              <div className="mb-4 p-4">
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                  {event.title}
                </h4>
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                  {event.description}
                </p>
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                  Location: {event.location}
                </p>
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                  Start Date: {new Date(event.startDate).toLocaleDateString()}
                </p>
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                  End Date: {new Date(event.endDate).toLocaleDateString()}{" "}
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex justify-between mx-4">
                <Button asChild>
                  <Link href={`/dashboard/event/${event.id}/edit`}>Edit</Link>
                </Button>
                <Button
                  variant={"destructive"}
                  onClick={() => handleDeleteEvent(event.id)}
                >
                  Delete
                </Button>
              </div>
            </CardFooter>
            {/* <div key={event.id} className="mb-4 p-4 bg-gray-800 rounded-md">
              <h3 className="text-xl font-bold">{event.title}</h3>
              <p>{event.description}</p>
              <p>Location: {event.location}</p>
              <p>
                Start Date: {new Date(event.startDate).toLocaleDateString()}
              </p>
              <p>End Date: {new Date(event.endDate).toLocaleDateString()}</p>
              <div className="flex gap-2">
                <button>
                  <a href={`/dashboard/event/${event.id}/edit`}>Edit</a>
                </button>
                <button onClick={() => handleDeleteEvent(event.id)}>
                  Delete
                </button>
              </div>
            </div> */}
          </Card>
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
