import { columns } from "@/components/dashboard/course/list/columns"
import { DataTable } from "@/components/dashboard/course/list/data-table"
import { Button } from "@/components/ui/button"
import { db } from "@/lib/db"
import { Pen } from "lucide-react"
import Link from "next/link"

const Courses = async () => {
    const courses = await db.course.findMany({
        orderBy: {
            createdAt: "desc"
        }
    })
    
    return (
        <div className="p-3 w-full">
            <div className="p-6">
            <DataTable columns={columns} data={courses} />
            </div>
        </div>
    )
}

export default Courses