import { db } from "@/lib/db";
import { ChapterQuestion } from "./chapter-question"
import { ChapterQuestionInput } from "./chapter-question-input"
import { Question, QuestionReply } from "@prisma/client";

interface ChapterQuestionAnswerProps {
    chapterId: string;
    courseId: string;
}

export interface QuestionWithReplies extends Question {
    replies: QuestionReply[];
}

export const ChapterQuestionAnswer = async ({ chapterId, courseId }: ChapterQuestionAnswerProps) => {
const questions = await db.question.findMany({
    where: {
        chapterId
    },
    include: {
        replies: {
            orderBy: {
                createdAt: "desc"
            }
        }
    },
    orderBy: {
        createdAt: "desc"
    }
});

    return (
        <div className="mt-3">
            <ChapterQuestionInput chapterId={chapterId} courseId={courseId} />
            <ChapterQuestion questions={questions} />
        </div>
    )
}