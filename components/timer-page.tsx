"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, Settings, Volume2, VolumeX, RotateCcw } from "lucide-react"
import { useState, useEffect, useRef } from "react"

const musicOptions = [
  {
    id: 1,
    name: "Rain Sounds",
    description: "Gentle rainfall for deep focus",
    icon: "🌧️",
    color: "from-blue-500 to-cyan-500",
    duration: "∞",
  },
  {
    id: 2,
    name: "Forest Ambience",
    description: "Birds chirping and rustling leaves",
    icon: "🌲",
    color: "from-green-500 to-emerald-500",
    duration: "∞",
  },
  {
    id: 3,
    name: "Meditative Tones",
    description: "Calming meditation sounds",
    icon: "🧘",
    color: "from-purple-500 to-pink-500",
    duration: "∞",
  },
  {
    id: 4,
    name: "Ocean Waves",
    description: "Peaceful ocean sounds",
    icon: "🌊",
    color: "from-cyan-500 to-blue-500",
    duration: "∞",
  },
  {
    id: 5,
    name: "White Noise",
    description: "Pure focus enhancement",
    icon: "⚪",
    color: "from-slate-500 to-slate-600",
    duration: "∞",
  },
  {
    id: 6,
    name: "Coffee Shop",
    description: "Ambient cafe atmosphere",
    icon: "☕",
    color: "from-orange-500 to-red-500",
    duration: "∞",
  },
]

export function TimerPage() {
  const [isRunning, setIsRunning] = useState(false)
  const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes in seconds
  const [selectedTime, setSelectedTime] = useState(25)
  const [isBreak, setIsBreak] = useState(false)
  const [selectedMusic, setSelectedMusic] = useState<number | null>(null)
  const [volume, setVolume] = useState([50])
  const [isMuted, setIsMuted] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isRunning && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1)
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning, timeLeft])

  useEffect(() => {
    if (timeLeft === 0) {
      setIsRunning(false)
      // Switch between work and break
      if (isBreak) {
        setTimeLeft(selectedTime * 60)
        setIsBreak(false)
      } else {
        setTimeLeft(5 * 60) // 5 minute break
        setIsBreak(true)
      }
    }
  }, [timeLeft, isBreak, selectedTime])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleStart = () => {
    setIsRunning(true)
  }

  const handlePause = () => {
    setIsRunning(false)
  }

  const handleReset = () => {
    setIsRunning(false)
    setTimeLeft(selectedTime * 60)
    setIsBreak(false)
  }

  const handleTimeChange = (value: number[]) => {
    if (!isRunning) {
      setSelectedTime(value[0])
      setTimeLeft(value[0] * 60)
    }
  }

  const progress = ((selectedTime * 60 - timeLeft) / (selectedTime * 60)) * 100

  return (
    <div className="flex-1 p-6 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white transition-colors duration-300">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Focus Timer</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Stay focused with the Pomodoro technique and ambient sounds
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Timer Section */}
          <div className="space-y-6">
            {/* Main Timer */}
            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:shadow-2xl transition-all duration-500">
              <CardContent className="p-8">
                <div className="text-center space-y-6">
                  {/* Timer Display */}
                  <div className="relative">
                    <div
                      className={`w-64 h-64 mx-auto rounded-full border-8 ${
                        isBreak
                          ? "border-blue-500 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20"
                          : "border-orange-500 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20"
                      } flex items-center justify-center relative overflow-hidden transition-all duration-500`}
                    >
                      {/* Progress ring */}
                      <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className="text-slate-200 dark:text-slate-700"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="none"
                          stroke={isBreak ? "#3b82f6" : "#f97316"}
                          strokeWidth="2"
                          strokeDasharray={`${progress * 2.827} 282.7`}
                          className="transition-all duration-1000 ease-out"
                        />
                      </svg>

                      <div className="text-center z-10">
                        <div className="text-5xl font-bold text-slate-900 dark:text-white mb-2">
                          {formatTime(timeLeft)}
                        </div>
                        <Badge
                          className={`${
                            isBreak
                              ? "bg-gradient-to-r from-blue-500 to-cyan-500"
                              : "bg-gradient-to-r from-orange-500 to-red-500"
                          } text-white px-4 py-1`}
                        >
                          {isBreak ? "BREAK" : "FOCUS"}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex justify-center gap-4">
                    {!isRunning ? (
                      <Button
                        onClick={handleStart}
                        size="lg"
                        className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 hover:scale-105 transition-all duration-200 px-8"
                      >
                        <Play className="h-5 w-5 mr-2" />
                        Start
                      </Button>
                    ) : (
                      <Button
                        onClick={handlePause}
                        size="lg"
                        className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 hover:scale-105 transition-all duration-200 px-8"
                      >
                        <Pause className="h-5 w-5 mr-2" />
                        Pause
                      </Button>
                    )}

                    <Button
                      onClick={handleReset}
                      size="lg"
                      variant="outline"
                      className="hover:scale-105 transition-all duration-200 px-8 bg-transparent"
                    >
                      <RotateCcw className="h-5 w-5 mr-2" />
                      Reset
                    </Button>
                  </div>

                  {/* Time Selector */}
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                      <span>Focus Duration</span>
                      <span>{selectedTime} minutes</span>
                    </div>
                    <Slider
                      value={[selectedTime]}
                      onValueChange={handleTimeChange}
                      max={60}
                      min={5}
                      step={5}
                      disabled={isRunning}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span>5m</span>
                      <span>25m</span>
                      <span>45m</span>
                      <span>60m</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Session Stats */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-slate-800 dark:to-slate-700 border-blue-200 dark:border-slate-600 hover:scale-105 transition-all duration-300">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">4</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Sessions Today</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-slate-800 dark:to-slate-700 border-green-200 dark:border-slate-600 hover:scale-105 transition-all duration-300">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">2h 15m</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Focus Time</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-800 dark:to-slate-700 border-purple-200 dark:border-slate-600 hover:scale-105 transition-all duration-300">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">3</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">Streak Days</div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Music Section */}
          <div className="space-y-6">
            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Volume2 className="h-5 w-5" />
                  Focus Music
                </CardTitle>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Choose ambient sounds to enhance your productivity
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Volume Control */}
                <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMuted(!isMuted)}
                    className="hover:scale-110 transition-transform duration-200"
                  >
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                  <Slider
                    value={volume}
                    onValueChange={setVolume}
                    max={100}
                    step={1}
                    className="flex-1"
                    disabled={isMuted}
                  />
                  <span className="text-sm text-slate-600 dark:text-slate-400 w-12">
                    {isMuted ? "0%" : `${volume[0]}%`}
                  </span>
                </div>

                {/* Music Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {musicOptions.map((music) => (
                    <Card
                      key={music.id}
                      className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                        selectedMusic === music.id
                          ? `bg-gradient-to-br ${music.color} text-white border-transparent`
                          : "bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 border-slate-200 dark:border-slate-600"
                      }`}
                      onClick={() => setSelectedMusic(selectedMusic === music.id ? null : music.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{music.icon}</div>
                          <div className="flex-1 min-w-0">
                            <h3
                              className={`font-medium truncate ${
                                selectedMusic === music.id ? "text-white" : "text-slate-900 dark:text-white"
                              }`}
                            >
                              {music.name}
                            </h3>
                            <p
                              className={`text-xs truncate ${
                                selectedMusic === music.id ? "text-white/80" : "text-slate-500 dark:text-slate-400"
                              }`}
                            >
                              {music.description}
                            </p>
                          </div>
                          <Badge
                            variant="outline"
                            className={`text-xs ${selectedMusic === music.id ? "border-white/30 text-white" : ""}`}
                          >
                            {music.duration}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {selectedMusic && (
                  <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                    <div className="flex items-center gap-2 text-sm text-purple-700 dark:text-purple-300">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                      Now playing: {musicOptions.find((m) => m.id === selectedMusic)?.name}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Settings */}
            <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Quick Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="justify-start hover:scale-105 transition-all duration-200 bg-transparent"
                  >
                    🍅 Pomodoro (25m)
                  </Button>
                  <Button
                    variant="outline"
                    className="justify-start hover:scale-105 transition-all duration-200 bg-transparent"
                  >
                    ☕ Short Break (5m)
                  </Button>
                  <Button
                    variant="outline"
                    className="justify-start hover:scale-105 transition-all duration-200 bg-transparent"
                  >
                    🌙 Long Break (15m)
                  </Button>
                  <Button
                    variant="outline"
                    className="justify-start hover:scale-105 transition-all duration-200 bg-transparent"
                  >
                    🎯 Deep Work (45m)
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
