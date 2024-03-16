import { ChapterQuestionInputForm } from "./chapter-question-input-form"
import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"

interface ChapterQuestionInputProps {
    chapterId: string;
    courseId: string;
}
export const ChapterQuestionInput = async ({chapterId, courseId}:ChapterQuestionInputProps) => {
    const { userId } = auth()
    if (!userId) {
        return redirect("/")
    }
    const user = await db.user.findFirst({
        where: {
            externalId: userId
        }
    })

    if (!user) {
        return redirect("/")
    }

    return (
        <div>
            <ChapterQuestionInputForm user={user} chapterId={chapterId} courseId={courseId} />
        </div>
  )
}