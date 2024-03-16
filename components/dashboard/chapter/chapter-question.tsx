"use client"

import { Question } from "@prisma/client"
import ReactTimeAgo from 'react-time-ago'
import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en'
import ru from 'javascript-time-ago/locale/ru'

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


interface ChapterQuestionProps {
    questions: Question[]
}

export const ChapterQuestion = ({ questions }: ChapterQuestionProps) => {
    return (
        <div>
            {
                questions.map((item, i) => (
                    <div className="grid w-full max-w-sm gap-4" key={i}>
                        <div className="flex gap-4">
                            <div className="flex-shrink-0">
                                <Avatar>
                                    <AvatarImage src={item.imageUrl || ""} />
                                    <AvatarFallback>{item.userName}</AvatarFallback>
                                </Avatar>
                            </div>
                            <div className="grid gap-1.5">
                            <div className="flex items-center gap-2 text-sm">
                                <h4 className="font-semibold">{item.userName}</h4>
                                    <time className="text-sm text-gray-500 dark:text-gray-400">
                                        <ReactTimeAgo date={item.createdAt} locale="en-US"/>
                                </time>
                            </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{item.text}</p>
                            </div>
                        </div>
                        <div className="flex gap-4 ml-10">
                            <div className="flex-shrink-0">
                            {/* <img
                                alt="User avatar"
                                className="rounded-full"
                                height="32"
                                src="/placeholder.svg"
                                style={{
                                aspectRatio: "32/32",
                                objectFit: "cover",
                                }}
                                width="32"
                            /> */}
                            </div>
                            <div className="grid gap-1.5">
                            <div className="flex items-center gap-2 text-xs">
                                <h4 className="font-semibold text-sm">You</h4>
                                <time className="text-xs text-gray-500 dark:text-gray-400">Now</time>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Thanks for your feedback! We are glad you like it.</p>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
        )
}