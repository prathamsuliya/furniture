'use client'

import { useState, useCallback, useMemo } from 'react'
import { rooms } from '@/data/rooms'
import { Phase, Hotspot } from '@/types'
import WindowView from './WindowView'
import ImageLoader from './ImageLoader'

export default function Hero() {
  const [phase, setPhase] = useState<Phase>('window')
  const [roomIndex, setRoomIndex] = useState(0)
  const [direction, setDirection] = useState<number>(1) // 1 = next (slide left), -1 = prev (slide right)
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null)

  const currentRoom = rooms[roomIndex]

  // Preload all images eagerly
  const allImageUrls = useMemo(
    () => [...rooms.map((r) => r.roomImg), ...rooms.map((r) => r.windowImg)],
    []
  )

  const handleEnter = useCallback(() => {
    if (phase === 'window') setPhase('entering')
  }, [phase])

  const handleAnimationComplete = useCallback(() => {
    if (phase === 'entering') {
      setPhase('room')
    } else if (phase === 'exiting') {
      setPhase('window')
    }
  }, [phase])

  const handleBackToWindow = useCallback(() => {
    setActiveHotspot(null)
    if (phase === 'room') setPhase('exiting')
  }, [phase])

  // Next room navigation (Slide left with motion blur)
  const handleNextRoom = useCallback(() => {
    setActiveHotspot(null)
    setDirection(1)
    setRoomIndex((prev) => (prev + 1) % rooms.length)
  }, [])

  // Previous room navigation (Slide right with motion blur)
  const handlePrevRoom = useCallback(() => {
    setActiveHotspot(null)
    setDirection(-1)
    setRoomIndex((prev) => (prev - 1 + rooms.length) % rooms.length)
  }, [])

  const handleHotspotSelect = useCallback((hotspot: Hotspot) => {
    setActiveHotspot(hotspot)
  }, [])

  const handleHotspotClose = useCallback(() => {
    setActiveHotspot(null)
  }, [])

  return (
    <>
      {/* Preload all assets silently */}
      <ImageLoader urls={allImageUrls} />

      <div className="relative w-full h-full overflow-hidden bg-[#F5F0EB]">
        {/* Unified Single-Image Showroom View */}
        <WindowView
          key="unified-view"
          room={currentRoom}
          roomIndex={roomIndex}
          totalRooms={rooms.length}
          phase={phase}
          direction={direction}
          activeHotspot={activeHotspot}
          onEnter={handleEnter}
          onNextRoom={handleNextRoom}
          onPrevRoom={handlePrevRoom}
          onBackToWindow={handleBackToWindow}
          onHotspotSelect={handleHotspotSelect}
          onHotspotClose={handleHotspotClose}
          onAnimationComplete={handleAnimationComplete}
        />
      </div>
    </>
  )
}
