"use client"

import { generatePlayer } from "@/actions/player";
import axios from "axios";
import { useEffect, useState } from "react"
import {cn} from "@/lib/utils"

interface VideoPlayerProps {
    videoId: string;
    className?: string;
}

export const VideoPlayer = ({videoId, className}:VideoPlayerProps) => {
    const [videoData, setVideoData] = useState({
        otp: "",
        playbackInfo: ""
    })

    useEffect(() => {
        generatePlayer(videoId)
            .then(res => {
                setVideoData({
                    otp: res.data?.otp,
                    playbackInfo: res.data?.playbackInfo
            })
        })
    }, [videoId]);

    return (
        <div>
            <div className="relative aspect-video">
                <iframe
                    src={`https://player.vdocipher.com/v2/?otp=${videoData.otp}&playbackInfo=${videoData.playbackInfo}&player=VuELo02Zak6PnTek`}
                    allowFullScreen={true}
                    allow="encrypted-media"
                    className={cn("border-none w-full h-full", className)}>
                </iframe>
            </div>
        </div>
    )
}