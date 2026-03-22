"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipForward } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/app/components/ui/tooltip";

// Based off 3kh0's music player https://github.com/3kh0/simple-music-player

const songs = [
  {
    title: "25mxfu - After the Magic - 01 Charlotte",
    src: "music1.mp3",
    link: "https://25mxfu.bandcamp.com/track/charlotte-9",
  },
  {
    title: "25mxfu - After the Magic - 02 Promise",
    src: "music2.mp3",
    link: "https://25mxfu.bandcamp.com/track/promise",
  },
  {
    title: "25mxfu - After the Magic - 03 After the Magic",
    src: "music3.mp3",
    link: "https://25mxfu.bandcamp.com/track/after-the-magic",
  },
  {
    title: "25mxfu - After the Magic - 04 Tempest",
    src: "music4.mp3",
    link: "https://25mxfu.bandcamp.com/track/tempest",
  },
  {
    title: "25mxfu - After the Magic - 05 After the Storm",
    src: "music5.mp3",
    link: "https://25mxfu.bandcamp.com/track/after-the-storm",
  },
  {
    title: "25mxfu - Petals of Iridescence - 01 Iridescence",
    src: "music6.mp3",
    link: "https://25mxfu.bandcamp.com/track/iridescence",
  },
  {
    title: "25mxfu - Petals of Iridescence - 02 Vanish",
    src: "music7.mp3",
    link: "https://25mxfu.bandcamp.com/track/vanish",
  },
  {
    title: "25mxfu - Petals of Iridescence - 03 Disillusioned",
    src: "music8.mp3",
    link: "https://25mxfu.bandcamp.com/track/disillusioned",
  },
  {
    title: "25mxfu - Petals of Iridescence - 04 Sacrifice",
    src: "music9.mp3",
    link: "https://25mxfu.bandcamp.com/track/sacrifice",
  },
  {
    title: "25mxfu - Petals of Iridescence - 05 Tunnel Vision",
    src: "music10.mp3",
    link: "https://25mxfu.bandcamp.com/track/tunnel-vision",
  },
  {
    title: "25mxfu - Petals of Iridescence - 06 Invisible Strings",
    src: "music11.mp3",
    link: "https://25mxfu.bandcamp.com/track/invisible-strings",
  },
  {
    title: "25mxfu - Petals of Iridescence - 07 House of Cards",
    src: "music12.mp3",
    link: "https://25mxfu.bandcamp.com/track/house-of-cards-2",
  },
  {
    title: "25mxfu - Petals of Iridescence - 08 Purity",
    src: "music13.mp3",
    link: "https://25mxfu.bandcamp.com/track/purity-2",
  },
  {
    title: "25mxfu - Petals of Iridescence - 09 Heart of Glass",
    src: "music14.mp3",
    link: "https://25mxfu.bandcamp.com/track/heart-of-glass",
  },
  {
    title: "25mxfu - Petals of Iridescence - 10 The Sanctuary",
    src: "music15.mp3",
    link: "https://25mxfu.bandcamp.com/track/the-sanctuary-2",
  },
];

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(() =>
    Math.floor(Math.random() * songs.length),
  );
  const [isInitialized, setIsInitialized] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const endTimeRef = useRef<number | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.1;
    }
  }, []);

  useEffect(() => {
    if (isInitialized && audioRef.current) {
      endTimeRef.current = null;
      audioRef.current.src = `/music/${songs[currentSongIndex].src}`;
      audioRef.current.load();
    }
  }, [currentSongIndex, isInitialized]);

  useEffect(() => {
    if (isInitialized && audioRef.current) {
      if (isPlaying) {
        audioRef.current
          .play()
          .catch((e) => console.error("Playback failed:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, isInitialized]);

  const togglePlay = () => {
    if (!isInitialized) {
      setIsInitialized(true);
      setIsPlaying(true);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const skipSong = () => {
    setCurrentSongIndex(Math.floor(Math.random() * songs.length));
    if (!isInitialized) setIsInitialized(true);
    setIsPlaying(true);
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      const duration = audioRef.current.duration;
      if (duration > 60) {
        const randomStart = Math.floor(Math.random() * (duration - 60));
        audioRef.current.currentTime = randomStart;
        endTimeRef.current = randomStart + 60;
      } else {
        audioRef.current.currentTime = 0;
        endTimeRef.current = duration;
      }
      audioRef.current.volume = 0;
      const fadeIn = setInterval(() => {
        if (audioRef.current && audioRef.current.volume < 0.1) {
          audioRef.current.volume = Math.min(
            0.1,
            audioRef.current.volume + 0.01,
          );
        } else {
          clearInterval(fadeIn);
        }
      }, 200);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current && endTimeRef.current !== null) {
      const timeLeft = endTimeRef.current - audioRef.current.currentTime;
      if (timeLeft <= 2 && timeLeft > 0) {
        if (audioRef.current.volume > 0) {
          audioRef.current.volume = Math.max(0, audioRef.current.volume - 0.01);
        }
      }
      if (audioRef.current.currentTime >= endTimeRef.current) {
        endTimeRef.current = null;
        skipSong();
      }
    }
  };

  const currentSong = songs[currentSongIndex];

  return (
    <div
      id="music-box"
      className="fixed bottom-0 right-0 w-auto bg-[#121b20]/92 border border-white/15 backdrop-blur-md flex justify-between items-center p-2.5 m-2.5 rounded-[10px] z-10 max-[600px]:w-full max-[600px]:m-0 max-[600px]:rounded-none max-[600px]:left-0 max-[600px]:right-0"
    >
      {isPlaying && (
        <Image
          id="music-cover"
          src={`/img/${currentSong.src
            .replace("music", "cover")
            .replace(".mp3", ".png")}`}
          alt="Cover Art"
          width={32}
          height={32}
          className="w-8 h-8 rounded-[5px] mr-2.5 block"
        />
      )}
      <div className="flex flex-col grow text-left justify-center">
        <p
          id="music-info"
          className="text-base text-white m-0 p-0 max-[600px]:text-sm leading-tight"
        >
          {isPlaying ? (
            <a
              href={currentSong.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              {currentSong.title}
            </a>
          ) : (
            ""
          )}
        </p>
        {isPlaying && currentSong.title.includes("25mxfu") && (
          <a
            href="https://25mxfu.bandcamp.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[10px] text-slate-100/90 hover:text-white m-0 p-0 leading-tight transition-colors"
          >
            support my friend&apos;s music
          </a>
        )}
      </div>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            id="music"
            className="flex items-center justify-center w-8 h-8 border-none cursor-pointer rounded-full ml-0 max-[600px]:w-6 max-[600px]:h-6 max-[600px]:ml-1.25 hover:bg-gray-700 transition-colors"
            onClick={togglePlay}
            aria-label="Play or pause music"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 text-white" />
            ) : (
              <Play className="w-5 h-5 text-white" />
            )}
          </button>
        </TooltipTrigger>
        <TooltipContent>{isPlaying ? "Pause" : "Play"}</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            id="music-skip"
            className={`flex items-center justify-center w-8 h-8 border-none cursor-pointer rounded-full max-[600px]:w-6 max-[600px]:h-6 max-[600px]:ml-1.25 hover:bg-gray-700 transition-colors ${
              isPlaying ? "block" : "hidden"
            }`}
            onClick={skipSong}
            aria-label="Skip current song"
          >
            <SkipForward className="w-5 h-5 text-white" />
          </button>
        </TooltipTrigger>
        <TooltipContent>Skip</TooltipContent>
      </Tooltip>
      <audio
        ref={audioRef}
        id="music-src"
        hidden
        onEnded={skipSong}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
      ></audio>
    </div>
  );
}
