"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ImageIcon, Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Chapter } from "@prisma/client";
import { updateChapter } from "@/actions/chapter";
import Image from "next/image";
import { UploadDropzone } from "@/lib/uploadthing";

interface ChapterThumbnailFormProps {
  initialData: Chapter;
  chapterId: string;
  courseId: string;
};

const formSchema = z.object({
  videoThumbnail: z.string().min(1),
});

export const ChapterThumbnailForm = ({
  initialData,
  chapterId,
  courseId
}: ChapterThumbnailFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {videoThumbnail: ""},
  });

  const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
      const {videoThumbnail, ...rest} = initialData
    updateChapter({chapter: {videoThumbnail: values.videoThumbnail, ...rest}, chapterId, courseId})
    .then(data => {
        if (data?.error) {
            toast.error(data?.error)
        }
        if (data?.success) {
          toast.success(data?.success)
          form.reset()
            toggleEdit()
        }
    })
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Chapter thumbnail
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && (
            <>Cancel</>
          )}
          {!isEditing && !initialData.videoThumbnail && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add an image
            </>
          )}
          {!isEditing && initialData.videoThumbnail && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit image
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        !initialData.videoThumbnail ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              alt="Upload"
              fill
              className="object-cover rounded-md"
              src={initialData.videoThumbnail}
            />
          </div>
        )
      )}
        {isEditing && (
              <Form {...form}>
                  <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-4 mt-8"
                >
                    <div>
                      <FormField
                      control={form.control}
                      name="videoThumbnail"
                      render={({ field }) => (
                          <FormItem>
                              <FormControl>
                                  {
                                      form.getValues("videoThumbnail")  ? (
                                            <div className="relative aspect-video mt-2">
                                              <Image
                                              alt="Upload"
                                              fill
                                              className="object-cover rounded-md"
                                              src={form.getValues("videoThumbnail")}
                                              />
                                          </div>
                                      ) : (
                                          <UploadDropzone
                                              endpoint="imageUploader"
                                              onClientUploadComplete={(res) => {
                                                  // Do something with the response
                                                  field.onChange(res[0].url)
                                                  // toggleEdit()
                                                  toast.success("Image uploaded")
                                              }}
                                              onUploadError={(error: Error) => {
                                                  toast.error("Image upload failed")
                                              }}
                                          />                                           
                                      )
                                  }
                          </FormControl>
                          <FormMessage />
                          </FormItem>
                      )}
                      />
                  <div className="text-xs text-muted-foreground mt-4">
                      16:9 aspect ratio recommended
                  </div>
                  <div className="flex justify-end">
                      <Button
                          disabled={isSubmitting}
                          type="submit"
                      >
                          Save
                      </Button>
                  </div>
                  </div>
                </form>
              </Form>
        )}
    </div>
  )
}