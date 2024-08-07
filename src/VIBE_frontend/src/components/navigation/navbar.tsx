"use client";

import Link from "next/link";
import { GrHomeRounded } from "react-icons/gr";
import { RiHeart2Line } from "react-icons/ri";
import { TbSchoolBell } from "react-icons/tb";
import { FaCircleUser } from "react-icons/fa6";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
} from "@/components/ui/navigation-menu";
import { usePathname } from "next/navigation";  // Correct import for pathname

export default function NavigationBar() {
  const pathname = usePathname();  // Use usePathname instead of useRouter

  // Helper function to check if a link is active
  const isActive = (path: string) => pathname === path;

  return (
    <div className="shadow-xl flex justify-between items-center px-6 my-3">
      <NavigationMenu className="flex space-x-4">
        <NavigationMenuList className="flex flex-row space-x-4">
          <Link
            href="/dashboard"
            className={`flex flex-col items-center p-3 rounded-full ${
              isActive("/dashboard") ? "bg-yellow-500" : ""
            }`}
          >
            <div className="flex justify-center mb-1">
              <GrHomeRounded color={isActive("/dashboard") ? "#FFF" : "#FBBC05"} />
            </div>
            <span
              className={`text-center ${
                isActive("/dashboard") ? "text-white" : "text-gray-700"
              }`}
            >
              Home
            </span>
          </Link>
          <Link
            href="/dashboard/liked"
            className={`flex flex-col items-center p-3 rounded-full ${
              isActive("/dashboard/liked") ? "bg-yellow-500" : ""
            }`}
          >
            <div className="flex justify-center mb-1">
              <RiHeart2Line color={isActive("/dashboard/liked") ? "#FFF" : "#FBBC05"} />
            </div>
            <span
              className={`text-center ${
                isActive("/dashboard/liked") ? "text-white" : "text-gray-700"
              }`}
            >
              Liked
            </span>
          </Link>
          <Link
            href="/dashboard/notification"
            className={`flex flex-col items-center p-3 rounded-full ${
              isActive("/dashboard/notification") ? "bg-yellow-500" : ""
            }`}
          >
            <div className="flex justify-center mb-1">
              <TbSchoolBell color={isActive("/dashboard/notification") ? "#FFF" : "#FBBC05"} />
            </div>
            <span
              className={`text-center ${
                isActive("/dashboard/notification") ? "text-white" : "text-gray-700"
              }`}
            >
              Notification
            </span>
          </Link>
          <Link
            href="/dashboard/profile"
            className={`flex flex-col items-center p-3 rounded-full ${
              isActive("/dashboard/profile") ? "bg-yellow-500" : ""
            }`}
          >
            <div className="flex justify-center mb-1">
              <FaCircleUser color={isActive("/dashboard/profile") ? "#FFF" : "#FBBC05"} />
            </div>
            <span
              className={`text-center ${
                isActive("/dashboard/profile") ? "text-white" : "text-gray-700"
              }`}
            >
              Profile
            </span>
          </Link>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
