"use client";

import { Trash } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ConfirmModal } from "../modals/confirm-modal";
import { deleteChapter, publishChapter, unpublishChapter } from "@/actions/chapter";
interface ChapterActionsProps {
  disabled: boolean;
  courseId: string;
  chapterId: string;
  isPublished: boolean;
};

export const ChapterActions = ({
  disabled,
  courseId,
  chapterId,
  isPublished
}: ChapterActionsProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

    const onClick = async () => {
      setIsLoading(true);

      if (isPublished) {
        unpublishChapter({ chapterId, courseId })
        .then((data) => {
            if (data?.error) {
                toast.error(data?.error)
                setIsLoading(false)
            }
            if (data?.success) {
                toast.success(data?.success)
                setIsLoading(false)
            }
        })
      } else {
          publishChapter({ chapterId, courseId })
          .then((data) => {
              if (data?.error) {
                  toast.error(data?.error)
                  setIsLoading(false)
              }
              if (data?.success) {
                  toast.success(data?.success)
                  setIsLoading(false)
              }
          })
      }
  }
  
  const onDelete = async () => {
      deleteChapter({ chapterId, courseId })
          .then((data) => {
              if (data?.error) {
              toast.error(data?.error)
              }
              if (data?.success) {
                    router.push(`/admin/dashboard/courses/${courseId}`)
                  toast.success(data?.success)
              }
      })
  }

  return (
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        variant="outline"
        size="sm"
      >
        {isPublished ? "Unpublish" : "Publish"}
      </Button>
      <ConfirmModal onConfirm={onDelete}>
        <Button size="sm" disabled={isLoading}>
          <Trash className="h-4 w-4" />
        </Button>
      </ConfirmModal>
    </div>
  )
}