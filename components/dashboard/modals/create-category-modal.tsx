"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import toast from "react-hot-toast";
import { Pen } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCategoryCreate } from "@/hooks/use-category-create";
import { UploadDropzone } from "@/lib/uploadthing";
import Image from "next/image";
import { createCategory } from "@/actions/category";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "required",
  }),
    imageUrl: z.string().min(1, {
        message: "required"
    })
});

export const CreateCategoryModal = () => {
    const { open, onClose } = useCategoryCreate(state => state)
    
    const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: ""
    },
    });
    
    const { isSubmitting } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        createCategory(values)
            .then((data) => {
                if (data?.error) {
                    toast.error(data.error)
                }
                if (data?.success) {
                    toast.success(data?.success)
                    onClose()
                    form.reset()
                }
            })
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                <DialogTitle>Create Category</DialogTitle>
                <DialogDescription>
                    Create a new category to organize your courses
                </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8 mt-8"
                    >
                        <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>
                                Category Name
                            </FormLabel>
                            <FormControl>
                                <Input
                                disabled={isSubmitting}
                                placeholder="e.g. 'Education'"
                                {...field}
                                />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="imageUrl"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>
                                Category Image
                            </FormLabel>
                            <FormControl>
                                {form.getValues("imageUrl") ? (
                                        <div className="w-full h-[150px] border-dotted border-2 border-gray-300 dark:border-gray-700 flex justify-center items-center">
                                            <Image
                                                src={form.getValues("imageUrl")}
                                                alt="Category Image"
                                                width={150}
                                                height={150}
                                            />
                                    </div>
                                ) : (
                                <UploadDropzone
                                    endpoint="imageUploader"
                                    onClientUploadComplete={(res) => {
                                        // Do something with the response
                                        field.onChange(res[0].url)
                                        toast.success("Image uploaded")
                                    }}
                                    onUploadError={(error: Error) => {
                                        toast.error("Image upload failed")
                                    }}
                                    />                                            
                                )}
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <div className="flex items-center gap-x-2">
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                        >
                            Continue
                        </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}

