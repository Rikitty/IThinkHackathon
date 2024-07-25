"use client";

import Link from "next/link";
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
                <NavigationMenuItem>
                    <Link href={"/dashboard"}>Home</Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href={"/dashboard/liked"}>Liked</Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href={"/dashboard/notification"}>Notification</Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href={"/dashboard/profile"}>Profile</Link>
                </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
        </div>
    </>
  );
}
