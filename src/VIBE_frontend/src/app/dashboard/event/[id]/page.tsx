import React from "react";
import { notFound } from "next/navigation";
import { GrCalendar, GrLocation } from "react-icons/gr";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import Link from "next/link";

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

// Fetch the event data based on ID
async function fetchEventDetails(eventId: number) {
  try {
    const response = await fetch(`http://localhost:3001/api/events/${eventId}`, {
      cache: 'no-store', // Disable caching for dynamic data
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching event details:", error);
    return null;
  }
}

// Generate static params for known paths
export async function generateStaticParams() {
  const response = await fetch("http://localhost:3001/api/events");
  const events = await response.json();

  return events.map((event: { id: number }) => ({
    id: event.id.toString(),
  }));
}

const SingleEventPage = async ({ params }: { params: { id: string } }) => {
  const event = await fetchEventDetails(Number(params.id));

  if (!event) {
    notFound(); // Redirect to 404 if event is not found
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
            className="bg-orange-400 text-white py-1 px-3 rounded-md flex items-center"
          >
            <CiHeart className="mr-2" /> {event.likes?.length}
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
