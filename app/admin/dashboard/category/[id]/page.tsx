import { UpdateCategory } from "@/components/dashboard/category-update-form";
import { db } from "@/lib/db";

interface EditCategoryProps {
    params: {
        id: string;
    }
}

const EditCategory = async ({ params: { id } }: EditCategoryProps) => {

    const category = await db.category.findUnique({
        where: {
            id
        }
    })

    return (
        <div className="p-3 w-full h-[80vh] flex items-center justify-center">
            <div className="w-full max-w-[700px] border-2 dark:bg-slate-900 p-2 rounded-sm">
                <h1 className="text-center text-md font-semibold">Update Category</h1>
                {category && <UpdateCategory category={category} />}
            </div>
        </div>
    )
}

export default EditCategory
