"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import { Category } from "@prisma/client";
import Image from "next/image";
import { UploadDropzone } from "@/lib/uploadthing";
import toast from "react-hot-toast";
import { Pen } from "lucide-react";
import { updateCategory } from "@/actions/category";
import { useRouter } from "next/navigation";

interface UpdateCategoryProps {
    category: Category;
}

const formSchema = z.object({
  name: z.string().min(1, {
    message: "required",
  }),
  imageUrl: z.string().min(1, {
    message: "required"
  })
});

export const UpdateCategory = ({ category }: UpdateCategoryProps) => {
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        name: category.name,
        imageUrl: category.imageUrl
        },
    });

    const { isSubmitting } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        updateCategory({...values, id: category.id})
        .then((data) => {
            if (data?.error) {
                toast.error(data.error)
            }
            if (data?.success) {
                router.push(`/admin/dashboard/category`)
                toast.success(data?.success)
                form.reset()
            }
        })
    }

    return (
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
                                <div className="h-[150px] mx-auto max-w-[160px] flex justify-center items-center relative">
                                    <Image
                                        src={form.getValues("imageUrl")}
                                        alt="Category Image"
                                        width={150}
                                        height={150}
                                        className="rounded-full w-[150px] h-[150px]"
                                    />
                                    <Button variant="outline" size="icon" className="bg-sky-700 text-white hover:bg-sky-600 hover:text-white absolute right-0 top-0" onClick={()=>form.setValue("imageUrl", "")}>
                                        <Pen />
                                    </Button>
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
    )
}