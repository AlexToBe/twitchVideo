'use client'

import { Participant,Track } from "livekit-client"
import { useRef,useState,useEffect } from "react"
import {useTracks} from "@livekit/components-react"
import { FullscreenControl } from "./fullscreen-control"
import { VolumeControl } from "./volume-control"
import { useEventListener } from "usehooks-ts"
interface LiveVideoProps{
    participant:Participant
}


export const LiveVideo = ({
    participant
}:LiveVideoProps) => {
    const videoRef = useRef<HTMLVideoElement>(null)
    const wrapperRef = useRef<HTMLDivElement>(null)

    const [isFullscreen,setIsFullscreen] = useState(false)
    const [volume,setVolume] = useState(0)
    const onToggleFullscreen = () => {
        if (isFullscreen) {
            document.exitFullscreen()
        }else if (wrapperRef.current) {
            wrapperRef.current.requestFullscreen()
        }
    }
    const handleFullscreenChange = () => {
        if (document.fullscreenElement) {
            setIsFullscreen(true)
        }else{
            setIsFullscreen(false)
        }
    }

    useEventListener('fullscreenchange',handleFullscreenChange,wrapperRef)

    const onVolumeChange = (value:number) => {
        setVolume(+value)
        if (videoRef?.current) {
            videoRef.current.muted = value === 0
            videoRef.current.volume = +value*0.01
        }
    }

    const toggleMute = () => {

        const ismuted = volume === 0
        setVolume(ismuted ? 50 : 0)
        if (videoRef?.current) {
            videoRef.current.muted = !ismuted
            videoRef.current.volume = ismuted?0.5:0
        }
        
    }

    useEffect(()=>{
       onVolumeChange(0)
    },[])

    useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter((track) => track.participant?.identity === participant.identity)
        .forEach((track) => {
        if (videoRef.current) {
            track.publication.track?.attach(videoRef.current)
        }
    })
    
    
  return (
      <div
        ref={wrapperRef}
          className=" relative h-full flex">
          <video ref={videoRef} width='100%' />
          <div className=" absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all">
              <div className=" absolute bottom-0 flex h-14 w-full items-center
               justify-between bg-gradient-to-r from-neutral-900 px-4">
                  <VolumeControl
                    onChange={onVolumeChange}
                      value={volume}
                      onToggle={toggleMute}
                  />
                  <FullscreenControl
                    isFullScreen = {isFullscreen}
                    onToggle={onToggleFullscreen}
                  />
                      
              </div>
          </div>
    </div>
  )
}

