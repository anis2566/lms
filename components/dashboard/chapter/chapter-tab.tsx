import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { ChapterDescription } from "./chapter-description"
import { ChapterAttachments } from "./chapter-attachments";
import { Attachment } from "@prisma/client";
import { ChapterQuestionAnswer } from "./chapter-question-answer";

interface ChapterTabProps {
  desc: string;
  attachments: Attachment[];
  chapterId: string;
  courseId: string;
}

export function ChapterTab({desc, attachments, chapterId, courseId}:ChapterTabProps) {
  return (
    <Tabs defaultValue="desc" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="desc">Description</TabsTrigger>
        <TabsTrigger value="qa">Q & A</TabsTrigger>
        <TabsTrigger value="attachments">Attachments</TabsTrigger>
      </TabsList>
      <TabsContent value="desc">
        <ChapterDescription value={desc} />
      </TabsContent>
      <TabsContent value="qa">
        <ChapterQuestionAnswer chapterId={chapterId} courseId={courseId} />
      </TabsContent>
      <TabsContent value="attachments">
        <ChapterAttachments attachments={attachments} />
      </TabsContent>
    </Tabs>
  )
}
