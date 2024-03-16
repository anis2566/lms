"use client"

import { Pen, Trash } from "lucide-react"
import toast from "react-hot-toast"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "../ui/button"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { deleteCategory } from "@/actions/category"
import Link from "next/link"


interface CategoryListProps {
    categories: {name: string, imageUrl: string, id: string}[]
}

export const CategoryList = ({ categories }: CategoryListProps) => {
    const handleDelete = (id: string) => {
        deleteCategory(id)
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
        <div>
            <Table>
                <TableCaption>A list of categories.</TableCaption>
                <TableHeader>
                    <TableRow>
                    <TableHead className="text-center">#SL</TableHead>
                    <TableHead className="text-center">Name</TableHead>
                    <TableHead className="text-center">Image</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        categories?.map((category, i) => (
                            <TableRow key={category.id} className="">
                                <TableCell className="text-center">{i + 1}</TableCell>
                                <TableCell className="text-center">{category.name}</TableCell>
                                <TableCell className="flex justify-center">
                                    <Avatar>
                                    <AvatarImage src={category.imageUrl} />
                                        <AvatarFallback>{category?.name?.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                </TableCell>
                                <TableCell className="text-center">
                                    <Link href={`/admin/dashboard/category/${category.id}`}>
                                        <Button variant="outline" size="icon" className="h-8 w-8">
                                            <Pen className="w-5 h-5" />
                                        </Button>
                                    </Link>
                                    <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="destructive" size="icon" className="ml-2 h-8 w-8">
                                        <Trash className="w-5 h-5" />
                                        </Button>
                                    </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                This will permanently delete this category
                                            </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => handleDelete(category.id)}>Continue</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}