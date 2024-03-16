import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

import { NotificationItem } from "./notification-item"
import { Bell, Eye } from "lucide-react"

export const Notifications = () => {
    return (
        <Menubar className="border-none">
        <MenubarMenu>
                <MenubarTrigger className="relative cursor-pointer">
                    <Bell />
                    <div className="w-5 h-5 bg-red-500 text-white text-sm rounded-full absolute top-0 right-0">5</div>
            </MenubarTrigger>
            <MenubarContent align="end" className="w-[300px]">
            <MenubarItem className="w-full flex items-center gap-2">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div>
                            <p>{"What is quantum physics? I don't understand".substring(0, 20)}...</p>
                            <div className="flex items-center gap-2">
                                <Badge className="bg-indigo-500 dark:bg-green-500 text-white">Question</Badge>
                                <span className="text-[10px]">22 Feb 2023 10:30 PM</span>
                            </div>
                        </div>
                        <Eye className="w-5 h-5" />
            </MenubarItem>
            <MenubarItem className="w-full flex items-center gap-2">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div>
                            <p>{"What is quantum physics? I don't understand".substring(0, 20)}...</p>
                            <div className="flex items-center gap-2">
                                <Badge className="bg-indigo-500 dark:bg-green-500 text-white">Question</Badge>
                                <span className="text-[10px]">22 Feb 2023 10:30 PM</span>
                            </div>
                        </div>
                        <Eye className="w-5 h-5" />
            </MenubarItem>
            <MenubarItem className="w-full flex items-center gap-2">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div>
                            <p>{"What is quantum physics? I don't understand".substring(0, 20)}...</p>
                            <div className="flex items-center gap-2">
                                <Badge className="bg-indigo-500 dark:bg-green-500 text-white">Question</Badge>
                                <span className="text-[10px]">22 Feb 2023 10:30 PM</span>
                            </div>
                        </div>
                        <Eye className="w-5 h-5" />
            </MenubarItem>
            </MenubarContent>
        </MenubarMenu>
        </Menubar>
    )
}