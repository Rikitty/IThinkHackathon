"use client";

import Link from "next/link";
import { GrHomeRounded } from "react-icons/gr";
import { RiHeart2Line } from "react-icons/ri";
import { TbSchoolBell } from "react-icons/tb";
import { FaCircleUser } from "react-icons/fa6";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export default function NavigationBar() {
  return (
    <>
    <div className="shadow-xl flex justify-between items-center px-6 my-3">
        <div>
            <NavigationMenu className="flex space-x-4">
                <NavigationMenuList className="flex flex-row space-x-4">
                    <NavigationMenuItem className="flex flex-col items-center">
                        <div className="flex justify-center">
                            <GrHomeRounded color="#FBBC05" />
                        </div>
                        <Link className="text-center" href="/dashboard" style={{ color: '#7E7E7E' }}>
                            Home
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem className="flex flex-col items-center">
                        <div className="flex justify-center">
                            <RiHeart2Line color="#FBBC05" />
                        </div>
                        <Link className="text-center" href={"/dashboard/liked"} style={{ color: '#7E7E7E' }}>
                            Liked
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem className="flex flex-col items-center">
                        <div className="flex justify-center">
                            <TbSchoolBell color="#FBBC05" />
                        </div>
                        <Link className="text-center" href={"/dashboard/notification"} style={{ color: '#7E7E7E' }}>
                            Notification
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem className="flex flex-col items-center">
                        <div className="flex justify-center">
                            <FaCircleUser color="#FBBC05" />
                        </div>
                        <Link className="text-center" href={"/dashboard/profile"} style={{ color: '#7E7E7E' }}>
                            Profile
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
        </div>
    </>
  );
}