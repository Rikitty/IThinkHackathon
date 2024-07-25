"use client"

import NavigationBar from "@/components/navigation/navbar";
import { Button } from "@/components/ui/button"; // Ensure you have a Button component
import { useRouter } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <section className="flex h-screen bg-gray-900 text-white">
      {/* Left Sidebar */}
      <div className="w-1/6 p-4 bg-gray-800 flex flex-col items-center">
        <div className="mb-4">
          <Button onClick={() => router.push('/create')} className="w-full bg-yellow-500 hover:bg-yellow-600">Create</Button>
        </div>
        <div className="w-full">
          <input
            type="text"
            placeholder="Search"
            className="w-full p-2 rounded-md bg-gray-700 text-white"
          />
        </div>
      </div>

      {/* Middle Section */}
      <div className="w-4/6 p-4 overflow-y-auto bg-gray-700">
        {children}
      </div>

      {/* Right Sidebar */}
      <div className="w-1/6 p-4 bg-gray-800 flex flex-col items-center">
        <NavigationBar />
      </div>
    </section>
  );
}
