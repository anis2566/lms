import { Attachment } from "@prisma/client"

interface ChapterAttachmentsProsp {
    attachments: Attachment[]
}

export const ChapterAttachments = ({attachments}:ChapterAttachmentsProsp) => {
    return (
        <div className="space-y-6 mt-3">
            {
                attachments.map((att, i) => (
                    <div key={i}>
                        <p className="font-semibold">{att.title}</p>
                        <a href={att.url} target="_blank" className="text-sm text-sky-700">{att.url}</a>
                    </div>
                ))
            }
        </div>
    )
}