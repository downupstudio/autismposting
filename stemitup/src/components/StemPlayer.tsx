import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

interface StemPlayerProps {
  stems: {
    vocals: string;
    bass: string;
    drums: string;
    other: string;
  };
  songName?: string;
}

export const StemPlayer = ({ stems, songName }: StemPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [enabledStems, setEnabledStems] = useState({
    vocals: true,
    bass: true,
    drums: true,
    other: true,
  });
  const [volumes, setVolumes] = useState({
    vocals: 100,
    bass: 100,
    drums: 100,
    other: 100,
  });

  const audioRefs = useRef<{ [key: string]: HTMLAudioElement }>({});

  useEffect(() => {
    // Initialize audio elements
    Object.keys(stems).forEach((stem) => {
      const audio = new Audio(stems[stem as keyof typeof stems]);
      audio.addEventListener("loadedmetadata", () => {
        setDuration(audio.duration);
      });
      audio.addEventListener("timeupdate", () => {
        setCurrentTime(audio.currentTime);
      });
      audioRefs.current[stem] = audio;
    });

    return () => {
      Object.values(audioRefs.current).forEach((audio) => {
        audio.pause();
        audio.src = "";
      });
    };
  }, [stems]);

  const togglePlayPause = () => {
    Object.entries(audioRefs.current).forEach(([stem, audio]) => {
      if (isPlaying) {
        audio.pause();
      } else {
        if (enabledStems[stem as keyof typeof enabledStems]) {
          audio.play();
        }
      }
    });
    setIsPlaying(!isPlaying);
  };

  const handleStemToggle = (stem: keyof typeof enabledStems) => {
    const newState = !enabledStems[stem];
    setEnabledStems({ ...enabledStems, [stem]: newState });
    
    const audio = audioRefs.current[stem];
    if (audio) {
      if (newState && isPlaying) {
        audio.currentTime = currentTime;
        audio.play();
      } else {
        audio.pause();
      }
    }
  };

  const handleAllToggle = () => {
    const allEnabled = Object.values(enabledStems).every((v) => v);
    const newState = !allEnabled;
    const newEnabledStems = {
      vocals: newState,
      bass: newState,
      drums: newState,
      other: newState,
    };
    setEnabledStems(newEnabledStems);

    if (isPlaying) {
      Object.entries(audioRefs.current).forEach(([stem, audio]) => {
        if (newState) {
          audio.currentTime = currentTime;
          audio.play();
        } else {
          audio.pause();
        }
      });
    }
  };

  const handleTimeChange = (value: number[]) => {
    const newTime = value[0];
    setCurrentTime(newTime);
    Object.values(audioRefs.current).forEach((audio) => {
      audio.currentTime = newTime;
    });
  };

  const handleVolumeChange = (stem: keyof typeof volumes, value: number[]) => {
    const newVolume = value[0];
    setVolumes({ ...volumes, [stem]: newVolume });
    const audio = audioRefs.current[stem];
    if (audio) {
      audio.volume = newVolume / 100;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const stemLabels = {
    vocals: "Vocals",
    bass: "Bass",
    drums: "Drums",
    other: "Other Instruments",
  };

  return (
    <div className="bg-card rounded-xl p-8 shadow-elevated border border-border">
      {songName && (
        <h3 className="text-xl font-semibold mb-6 text-foreground">{songName}</h3>
      )}

      {/* Main Controls */}
      <div className="flex items-center gap-6 mb-8">
        <Button
          onClick={togglePlayPause}
          size="lg"
          className="w-16 h-16 rounded-full bg-primary hover:bg-primary/90 shadow-glow"
        >
          {isPlaying ? (
            <Pause className="w-6 h-6" />
          ) : (
            <Play className="w-6 h-6 ml-1" />
          )}
        </Button>

        <div className="flex-1">
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={0.1}
            onValueChange={handleTimeChange}
            className="mb-2"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>
      </div>

      {/* Stem Toggles */}
      <div className="grid grid-cols-5 gap-4 mb-8">
        <div className="flex items-center gap-3 p-4 bg-audio-control rounded-lg hover:bg-audio-hover transition-colors">
          <Checkbox
            id="all"
            checked={Object.values(enabledStems).every((v) => v)}
            onCheckedChange={handleAllToggle}
          />
          <label
            htmlFor="all"
            className="text-sm font-medium cursor-pointer"
          >
            All
          </label>
        </div>

        {Object.entries(stemLabels).map(([key, label]) => (
          <div
            key={key}
            className="flex items-center gap-3 p-4 bg-audio-control rounded-lg hover:bg-audio-hover transition-colors"
          >
            <Checkbox
              id={key}
              checked={enabledStems[key as keyof typeof enabledStems]}
              onCheckedChange={() => handleStemToggle(key as keyof typeof enabledStems)}
            />
            <label
              htmlFor={key}
              className="text-sm font-medium cursor-pointer"
            >
              {label}
            </label>
          </div>
        ))}
      </div>

      {/* Volume Sliders */}
      <div className="space-y-4">
        {Object.entries(stemLabels).map(([key, label]) => (
          <div key={key} className="flex items-center gap-4">
            <Volume2 className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            <span className="text-sm font-medium w-32">{label}</span>
            <Slider
              value={[volumes[key as keyof typeof volumes]]}
              max={100}
              step={1}
              onValueChange={(value) =>
                handleVolumeChange(key as keyof typeof volumes, value)
              }
              className="flex-1"
            />
            <span className="text-sm text-muted-foreground w-12 text-right">
              {volumes[key as keyof typeof volumes]}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
