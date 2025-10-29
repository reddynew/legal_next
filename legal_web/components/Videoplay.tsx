"use client"
import React, { useState } from 'react';
interface VideoPlayerProps {
  src: string;
  poster?: string;
  autoPlay?: boolean;
  loop?: boolean;
  controls?: boolean;
  muted?: boolean;
  className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  poster,
  autoPlay = false,
  loop = false,
  controls = true,
  muted = false,
  className = '',
}) => {
    const[isPlaying,setIsPlaying]=useState(false)
  return (
    <video
    className={`
      transition-all duration-400 ease-in-out border-none outline-none focus:outline-none p-0 m-0
      w-full max-w-[400px] sm:max-w-[500px] md:max-w-[600px] lg:max-w-[700px]
      h-auto
      ${className}
    `}
      src={src}
      poster={poster}
      autoPlay={autoPlay}
      loop={loop}
      controls={controls}
      muted={muted}
      onPlay={() => setIsPlaying(true)}
      onPause={() => setIsPlaying(false)}
    >
      Your browser does not support the video tag.
    </video>
  );
};

export default VideoPlayer;