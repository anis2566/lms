"use client";

import axios from "axios";
import { Trash } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/dashboard/modals/confirm-modal";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import { deleteCourse, publishCourse, unpublishCourse } from "@/actions/course";

interface ActionsProps {
  disabled: boolean;
  courseId: string;
  isPublished: boolean;
};

export const Actions = ({
  disabled,
  courseId,
  isPublished
}: ActionsProps) => {
  const router = useRouter();
  const confetti = useConfettiStore();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
      setIsLoading(true);
      if (isPublished) {
        unpublishCourse({ courseId })
          .then(data => {
            if (data?.error) {
            toast.error(data?.error)
            setIsLoading(false);
            }
            if (data?.success) {
              toast.success(data?.success)
              setIsLoading(false);
            }
        })
      } else {
        publishCourse({ courseId })
          .then(data => {
            if (data?.error) {
            toast.error(data?.error)
            setIsLoading(false);
            }
            if (data?.success) {
              toast.success(data?.success)
              confetti.onOpen();
              setIsLoading(false);
            }
        })
      }
  }
  
  const onDelete = async () => {
    setIsLoading(true);
    deleteCourse({ courseId })
    .then(data => {
      if (data?.error) {
      toast.error(data?.error)
      setIsLoading(false);
      }
      if (data?.success) {
        router.push("/admin/dashboard/courses")
        toast.success(data?.success)
        setIsLoading(false);
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