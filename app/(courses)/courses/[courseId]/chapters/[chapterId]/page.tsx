import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { ChevronLeft, ChevronRight, File } from "lucide-react";

import { getChapter } from "@/actions/get-chapter";
import { Banner } from "@/components/banner";
import { Separator } from "@/components/ui/separator";
import { Preview } from "@/components/preview";

// import { VideoPlayer } from "./_components/video-player";
import { CourseEnrollButton } from "@/components/dashboard/course/course-enroll-button";
import { CourseProgressButton } from "@/components/dashboard/course/course-progress-button";
import { CoursePlayer } from "@/components/dashboard/course/course-player";
import { getUserById } from "@/actions/user";
import { db } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { PlayerController } from "@/components/dashboard/course/player-controller";
import { ChapterTab } from "@/components/dashboard/chapter/chapter-tab";

const ChapterIdPage = async ({
  params
}: {
  params: { courseId: string; chapterId: string }
}) => {
  const { userId } = auth();

  if (!userId) {
    return redirect("/");
  }

  const user = await db.user.findFirst({
    where: {
      externalId: userId
    }
  })

  if (!user) {
    return redirect("/");
  }

  const {
    chapter,
    course,
    attachments,
    previousChapter,
    nextChapter,
    userProgress,
    purchase,
  } = await getChapter({
    userId:user.id,
    chapterId: params.chapterId,
    courseId: params.courseId,
  });

  if (!chapter || !course) {
    return redirect("/")
  }

  const isLocked = !chapter.isFree && !purchase;
  const completeOnEnd = !!purchase && !userProgress?.isCompleted;

  return ( 
    <div>
      {userProgress?.isCompleted && (
        <div className="px-4">
          <Banner
            variant="success"
            label="You already completed this chapter."
          />
        </div>
      )}
      {isLocked && (
        <Banner
          variant="warning"
          label="You need to purchase this course to watch this chapter."
        />
      )}
      <div className="flex flex-col max-w-4xl mx-auto pb-10">
        <div className="p-4">
            <CoursePlayer
                chapterId={params.chapterId}
                title={chapter.title}
                courseId={params.courseId}
                nextChapterId={nextChapter ?? undefined}
                videoId={chapter.videoUrl || ""}
                isLocked={isLocked}
                completeOnEnd={completeOnEnd}
            />
        </div>
        <div>
          <PlayerController previousChapter={previousChapter ?? ""} nextChapter={nextChapter ?? ""} courseId={params.courseId} />
          <div className="p-4 flex flex-col md:flex-row items-center justify-between">
            <h2 className="text-2xl font-semibold mb-2">
              {chapter.title}
            </h2>
            {purchase ? (
              <CourseProgressButton
                chapterId={params.chapterId}
                courseId={params.courseId}
                nextChapterId={nextChapter ?? undefined}
                isCompleted={!!userProgress?.isCompleted}
              />
            ) : (
              <CourseEnrollButton
                courseId={params.courseId}
                price={course.price!}
              />
            )}
          </div>
          <Separator />
          <ChapterTab desc={chapter.description ?? ""} attachments={attachments} chapterId={params.chapterId} courseId={params.courseId} />
          {/* <div>
            <Preview value={chapter.description!} />
          </div> */}
          {/* {!!attachments.length && (
            <>
              <Separator />
              <div className="p-4">
                {attachments.map((attachment) => (
                  <a 
                    href={attachment.url}
                    target="_blank"
                    key={attachment.id}
                    className="flex items-center p-3 w-full bg-sky-200 border text-sky-700 rounded-md hover:underline"
                  >
                    <File />
                    <p className="line-clamp-1">
                      {attachment.title}
                    </p>
                  </a>
                ))}
              </div>
            </>
          )} */}
        </div>
      </div>
    </div>
   );
}
 
export default ChapterIdPage;