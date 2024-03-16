"use client";

import * as z from "zod";
import { Pencil, PlusCircle, ImageIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Course } from "@prisma/client";
import Image from "next/image";
import { UploadDropzone } from "@/lib/uploadthing";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { updateCourse } from "@/actions/course";

interface ImageFormProps {
  initialData:Course;
  courseId: string;
};

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "required",
  }),
});

export const ImageForm = ({
  initialData,
  courseId
}: ImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);
    
    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageUrl: ""
    },
    });

    const {isSubmitting} = form.formState

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
     const {imageUrl, ...rest} = initialData
    updateCourse({id: courseId, course: {...rest, imageUrl: values.imageUrl}})
      .then(data => {
        if (data?.error) {
          toast.error(data?.error)
        }
        if (data?.success) {
            toggleEdit()
            form.reset()
          toast.success(data?.success)
      }
    })
    }

  return (
    <div className="mt-6 border bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course image
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && (
            <>Cancel</>
          )}
          {!isEditing && !initialData.imageUrl && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add an image
            </>
          )}
          {!isEditing && initialData.imageUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit image
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        !initialData.imageUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
          <div className="relative aspect-video mt-2">
            <Image
              alt="Upload"
              fill
              className="object-cover rounded-md"
              src={initialData.imageUrl}
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
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    {
                                        form.getValues("imageUrl") ? (
                                             <div className="relative aspect-video mt-2">
                                                <Image
                                                alt="Upload"
                                                fill
                                                className="object-cover rounded-md"
                                                src={form.getValues("imageUrl")}
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