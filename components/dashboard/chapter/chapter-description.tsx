import { Preview } from "@/components/preview"

interface ChapterDescriptionProps {
    value: string;
}

export const ChapterDescription = ({value}:ChapterDescriptionProps) => {
    return (
        <div>
            <Preview value={value} />
        </div>
    )
}