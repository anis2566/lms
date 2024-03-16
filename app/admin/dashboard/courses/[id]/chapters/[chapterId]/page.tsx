import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Eye, LayoutDashboard, Paperclip, Video } from "lucide-react";

import { db } from "@/lib/db";
import { IconBadge } from "@/components/icon-badge";
import { Banner } from "@/components/banner";

import { ChapterTitleForm } from "@/components/dashboard/chapter/chapter-title-form";
import { ChapterDescriptionForm } from "@/components/dashboard/chapter/chapter-description-form";
import { ChapterAccessForm } from "@/components/dashboard/chapter/chapter-access-form";
import { ChapterThumbnailForm } from "@/components/dashboard/chapter/chapter-thumbnail-form";
import { ChapterVideoForm } from "@/components/dashboard/chapter/chapter-video-form";
import { VideoPlayer } from "@/components/video-player";
import { ChapterAttachmentsForm } from "@/components/dashboard/chapter/chapter-attachments-form";
import { ChapterActions } from "@/components/dashboard/chapter/chapter-actions";

const ChapterIdPage = async ({
  params
}: {
  params: { id: string; chapterId: string }
}) => {
  const { userId } = auth();

    if (!userId) {
    return redirect("/");
  }

  const chapter = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
      courseId: params.id
    },
  });

  if (!chapter) {
    return redirect("/")
  }

const chapterWithAttachments = await db.chapter.findUnique({
  where: {
    id: params.chapterId,
    courseId: params.id
  },
  include: {
    attachments: true,
  },
});

  const requiredFields = [
    chapter.title,
    chapter.description,
    chapter.videoUrl,
    chapter.videoThumbnail
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!chapter.isPublished && (
        <Banner
          variant="warning"
          label="This chapter is unpublished. It will not be visible in the course"
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              href={`/admin/dashboard/courses/${params.id}`}
              className="flex items-center text-sm hover:opacity-75 transition mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to course setup
            </Link>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">
                  Chapter Creation
                </h1>
                <span className="text-sm text-slate-700">
                  Complete all fields {completionText}
                </span>
              </div>
              <ChapterActions
                disabled={!isComplete}
                courseId={params.id}
                chapterId={params.chapterId}
                isPublished={chapter.isPublished}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl">
                  Customize your chapter
                </h2>
              </div>
              <ChapterTitleForm
                initialData={chapter}
                courseId={params.id}
                chapterId={params.chapterId}
              />
              <ChapterDescriptionForm
                initialData={chapter}
                courseId={params.id}
                chapterId={params.chapterId}
              />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Eye} />
                <h2 className="text-xl">
                  Access Settings
                </h2>
              </div>
              <ChapterAccessForm
                initialData={chapter}
                courseId={params.id}
                chapterId={params.chapterId}
              />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Paperclip} />
                <h2 className="text-xl">
                  Attachments
                </h2>
              </div>
              <ChapterAttachmentsForm
                initialData={chapter}
                attachments={chapterWithAttachments?.attachments || []}
                courseId={params.id}
                chapterId={params.chapterId}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={Video} />
              <h2 className="text-xl">
                Add a video
              </h2>
            </div>
            <ChapterThumbnailForm
              initialData={chapter}
              chapterId={params.chapterId}
              courseId={params.id}
            />
            <ChapterVideoForm
              initialData={chapter}
              chapterId={params.chapterId}
              courseId={params.id}
            />
            {chapter.videoUrl && (
              <div className="mt-6">
                <VideoPlayer videoId={chapter.videoUrl} className="" />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
   );
}
 
export default ChapterIdPage;