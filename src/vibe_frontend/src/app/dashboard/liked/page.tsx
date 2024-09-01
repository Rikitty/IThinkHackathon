"use client";
import React, { useEffect } from "react";
import Chip from "@/components/chip/Chip";
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
import { AspectRatio } from "@/components/ui/aspect-ratio";


const Liked: React.FC = () => {
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

  const chips = ["Technology", "Business", "Marketing", "Education", "Arts"];
  const handleChipClick = (chip: string) => {
    alert(`Chip clicked: ${chip}`);
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
        {userLikedEvents.map((event) => (
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
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Liked;