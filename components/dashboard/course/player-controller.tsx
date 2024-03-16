"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface PlayerControllerProps {
    previousChapter: string;
    nextChapter: string;
    courseId: string;
}

export const PlayerController = ({ previousChapter, nextChapter, courseId }: PlayerControllerProps) => {
    const router = useRouter()

    return (
        <div className="px-4 flex flex-col md:flex-row items-center justify-between">
            <Button variant="outline" disabled={!previousChapter} onClick={()=>router.push(`/courses/${courseId}/chapters/${previousChapter}`)}>
                <ChevronLeft />
                Prev
            </Button>
            <Button disabled={!nextChapter} variant="outline" onClick={()=>router.push(`/courses/${courseId}/chapters/${nextChapter}`)}>
                <ChevronRight />
                Next
            </Button>
        </div>
)
}