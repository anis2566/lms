"use client"

import { Pen } from "lucide-react"
import { Button } from "../ui/button"
import { useCategoryCreate } from "@/hooks/use-category-create"

export const CreateCategory = () => {
    const {open, onOpen} = useCategoryCreate(state => state)
    return (
        <Button onClick={onOpen} className="dark:bg-slate-700 dark:text-white dark:hover:bg-slate-800">
            <Pen /> 
            Create 
        </Button>
    )
}