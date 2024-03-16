import { db } from "@/lib/db"

const Questions = async () => {

    const quesitons = await db.question.findMany({})
    console.log(quesitons)

    return (
        <div className="p-3">Questions</div>
    )
}

export default Questions