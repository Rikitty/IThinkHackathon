import EditForm from "@/components/create/editForm";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaUser } from "react-icons/fa";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Separator } from "@/components/ui/separator";
import Chip from "@/components/chip/Chip";
import { useAppSelector } from "@/lib/hooks";

const chips = ["JavaScript", "TypeScript", "React", "Next.js"];

const handleChipClick = (chip: string) => {
  alert(`Chip clicked: ${chip}`);
};

// This will fetch the data for the event when the page is rendered
export default async function Edit({ params }: { params: { id: string } }) {
  // Fetch event data directly in the component
  const response = await fetch(`http://localhost:3001/api/events/${params.id}`);
  const event = await response.json();

  const { userDetails } = useAppSelector((state) => state.user);

  return (
    <div className="flex h-[42rem] flex-col items-center justify-between">
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

      <div className="flex-1 w-full p-4 rounded-lg">
        {/* Upper Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Avatar className="h-14 w-14">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div className="pl-4">
              <p className="text-white">Username: {userDetails?.userName}</p>
              <FaUser className="text-2xl text-yellow-500 mt-2" />
            </div>
          </div>

          <a href="#" className="text-lg text-white">
            . . .
          </a>
        </div>

        {/* Separator */}
        <hr className="border-t-1 border-yellow-500 mt-2 mb-4" />

        {/* Event Form */}
        <div className="flex flex-col space-y-4">
          <EditForm eventId={event.id} />
        </div>
      </div>
    </div>
  );
}
