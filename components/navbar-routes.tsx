"use client";

import { UserButton, useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

import { SearchInput } from "./search-input";
import { ModeToggle } from "./mode-toggle";

export const NavbarRoutes = () => {
    const pathname = usePathname();
  const isSearchPage = pathname === "/search";

  return (
    <>
      {isSearchPage && (
        <div className="hidden md:block">
          <SearchInput />
        </div>
      )}
      <div className="flex gap-x-2 ml-auto">
        <ModeToggle />
        <UserButton
          afterSignOutUrl="/"
        />
      </div>
    </>
  )
}