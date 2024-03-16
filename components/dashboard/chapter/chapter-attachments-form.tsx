"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Pencil, Trash } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Attachment, Chapter } from "@prisma/client";
import { addAttachment, deleteAttachments, updateChapter } from "@/actions/chapter";

interface ChapterTitleFormProps {
  initialData: Chapter;
  attachments: Attachment[];
  chapterId: string;
  courseId: string;
};

const formSchema = z.object({
  title: z.string().min(1),
  url: z.string().min(1),
});

export const ChapterAttachmentsForm = ({
  initialData,
  attachments,
  chapterId,
  courseId
}: ChapterTitleFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {title: "", url: ""},
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    addAttachment({ chapterId, ...values, courseId })
      .then((data) => {
        if (data?.success) {
          toggleEdit()
          form.reset()
          toast.success(data?.success)
        }
    })
  }

  const onDelete = async (id: string) => {
    deleteAttachments({ id, chapterId, courseId })
      .then(data => {
        if (data?.error) {
        toast.error(data?.error)
        }
        if (data?.success) {
          toast.success(data?.success)
        }
    })
  }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Chapter attachments
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Add attachment
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <div className="mt-2 space-y-3">
          {
            attachments.length > 0 && 
            attachments.map((item, i) => (
              <div key={i} className="border-2 p-2 rounded-sm flex justify-between items-center">
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <span className="text-muted-foreground text-sm">{item.url}</span>
                </div>
                <Button variant="destructive" size="icon" className="w-6 h-6" onClick={()=>onDelete(item.id)}>
                  <Trash className="w-5 h-5" />
                </Button>
              </div>
            ))
          }
        </div>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Attachment Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Introduction to the course'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Attachment Url</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Introduction to the course'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button
                disabled={!isValid || isSubmitting}
                type="submit"
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  )
}