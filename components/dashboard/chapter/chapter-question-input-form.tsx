"use client"

import { createQuestion } from "@/actions/question";
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { User } from "@prisma/client"
import { useState } from "react";
import toast from "react-hot-toast";

interface ChapterQuestionInputFormProps {
    user: User;
    chapterId: string;
    courseId: string;
}

export const ChapterQuestionInputForm = ({user, chapterId, courseId}:ChapterQuestionInputFormProps) => {
    const [text, setText] = useState("")

    const handleAskQuestion = async () => {
        createQuestion({ userName: user.name, chapterId, courseId, text, imageUrl:user.imageUrl || "" })
            .then(data => {
                if (data?.error) {
                    toast.error(data?.error)
                }
                if (data?.success) {
                    toast.success(data?.success)
                    setText("")
                }
        })
    }

    return (
    <div className="grid w-full gap-0.5">
        <div className="flex items-center gap-2">
            <Textarea className="min-h-[100px] max-h-[200px] box-border" placeholder="Leave a question..." value={text} onChange={(e)=>setText(e.target.value)} />
        </div>
        <div className="flex items-center justify-end text-sm py-2">
        <Button type="submit" disabled={!text} onClick={handleAskQuestion}>Submit</Button>
        </div>
    </div>
    )
}