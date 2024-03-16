"use client";

import { CircleHelp, Compass, Layers3, Layout, Users } from "lucide-react";

import { SidebarItem } from "./sidebar-item";

const routes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/admin/dashboard",
  },
  {
    icon: Compass,
    label: "Courses",
    href: "/admin/dashboard/courses",
  },
  {
    icon: Users,
    label: "Users",
    href: "/admin/dashboard/users",
  },
  {
    icon: Layers3,
    label: "Category",
    href: "/admin/dashboard/category",
  },
  {
    icon: CircleHelp,
    label: "Questions",
    href: "/admin/dashboard/questions",
  },
];

export const SidebarRoutes = () => {

  return (
    <div className="flex flex-col w-full">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
    </div>
  )
}