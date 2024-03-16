"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

import { SearchInput } from "@/components/search-input";
import { ModeToggle } from "@/components/mode-toggle";
import { Notifications } from "./notifications";

export const NavbarRoutes = () => {
    const pathname = usePathname();
  const isSearchPage = pathname === "/courses";

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-2 ml-auto items-center">
        <ModeToggle />
        <Notifications />
        <UserButton
          afterSignOutUrl="/"
        />
      </div>
    </>
  )
}