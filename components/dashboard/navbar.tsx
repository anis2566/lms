// import { MobileSidebar } from "./mobile-sidebar"

import { NavbarRoutes } from "./navbar-routes"

export const Navbar = () => {
  return (
    <div className="p-4 border-b h-full flex items-center bg-white dark:bg-slate-900 shadow-sm">
      {/* <MobileSidebar /> */}
      <NavbarRoutes />
    </div>
  )
}