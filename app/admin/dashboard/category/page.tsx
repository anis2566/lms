import { db } from "@/lib/db"
import { CreateCategory } from "@/components/dashboard/create-category"
import { CategoryList } from "@/components/dashboard/category-list"

const Category = async () => {

    const categories = await db.category.findMany({
        orderBy: {
            name: "asc"
        }
    })

    return (
        <div className="p-3 w-full">
            <div className="w-full flex items-center justify-between">
                <h3 className="text-xl font-semibold">Category</h3>
                <CreateCategory />
            </div>
            <CategoryList categories={categories} />
        </div>
    )
}

export default Category