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
        <div className="flex space-x-4 my-2">
          <NavigationMenu className="flex space-x-4">
            <NavigationMenuList className="flex flex-row space-x-4">
              <NavigationMenuItem>
                <Link href={"/dashboard"}>Vibe</Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div>
            <NavigationMenu className="flex space-x-4">
                <NavigationMenuList className="flex flex-row space-x-4">
                <NavigationMenuItem>
                    <Link href={"/auth/login"}>Home</Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href={"/auth/signup"}>Liked</Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href={"/auth/login"}>Notification</Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Link href={"/auth/login"}>Profile</Link>
                </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
        </div>
    </>
  );
}
