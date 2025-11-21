"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import confetti from "canvas-confetti";
import OpeningScene from "./OpeningScene";
import GateTransition from "./GateTransition";
import CoupleEntrance from "./CoupleEntrance";
import InvitationText from "./InvitationText";
import ThemeControlPanel from "./ThemeControlPanel";
import PhotoGallery from "./PhotoGallery";

export default function AnniversaryContainer({ data }) {
    const [scene, setScene] = useState("loading"); // loading, gate, entrance, content
    const [isGateOpen, setIsGateOpen] = useState(false);
    const [theme, setTheme] = useState(data?.theme || "cinematic");
    const [isMuted, setIsMuted] = useState(false);
    const audioRef = useRef(null);
    const confettiIntervalRef = useRef(null);

    const handleLoadingComplete = () => {
        setScene("gate");
        setTimeout(() => {
            setIsGateOpen(true);
        }, 500);
    };

    const handleGateOpen = () => {
        // Try to play audio when gate opens
        if (audioRef.current && !isMuted) {
            audioRef.current.play().catch(err => {
                console.log("Audio autoplay prevented:", err);
                // If autoplay fails, we'll wait for user interaction
            });
        }

        setTimeout(() => {
            setScene("entrance");
        }, 1000);
    };

    const handleEntranceComplete = () => {
        setScene("content");
    };

    const toggleMute = () => {
        if (audioRef.current) {
            if (isMuted) {
                audioRef.current.play().catch(err => console.log("Audio play error:", err));
                setIsMuted(false);
            } else {
                audioRef.current.pause();
                setIsMuted(true);
            }
        }
    };

    // Handle continuous confetti rain with canvas-confetti
    useEffect(() => {
        if (scene === "content") {
            // Clear any existing interval
            if (confettiIntervalRef.current) {
                clearInterval(confettiIntervalRef.current);
            }

            // Create continuous confetti rain
            confettiIntervalRef.current = setInterval(() => {
                const particleCount = 3;
                const defaults = {
                    spread: 360,
                    ticks: 100,
                    gravity: 0.8,
                    decay: 0.94,
                    startVelocity: 20,
                    colors: ['#FFD700', '#FFC0CB', '#FF69B4', '#FFB6C1', '#DA70D6', '#FFA500']
                };

                confetti({
                    ...defaults,
                    particleCount,
                    scalar: 0.8,
                    shapes: ['circle', 'square'],
                    origin: { x: Math.random(), y: -0.1 }
                });
            }, 400);

            return () => {
                if (confettiIntervalRef.current) {
                    clearInterval(confettiIntervalRef.current);
                }
            };
        }
    }, [scene]);

    // Combine all photos for gallery
    const allPhotos = [
        ...(data?.malePhotoUrl ? [data.malePhotoUrl] : []),
        ...(data?.femalePhotoUrl ? [data.femalePhotoUrl] : []),
        ...(data?.photos?.map(p => p.url) || [])
    ];

    return (
        <div className="relative w-full min-h-screen bg-black text-white overflow-hidden font-sans">
            {/* Background Music */}
            <audio
                ref={audioRef}
                loop
                preload="auto"
                className="hidden"
            >
                <source src="/wedding-music.mp3" type="audio/mp3" />
            </audio>

            {/* Audio Control Button */}
            {scene === "content" && (
                <motion.button
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1, duration: 0.5 }}
                    onClick={toggleMute}
                    className="fixed top-6 right-6 z-50 bg-amber-600/80 hover:bg-amber-500 backdrop-blur-sm p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 group"
                    aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                >
                    {isMuted ? (
                        <VolumeX className="w-6 h-6 text-white" />
                    ) : (
                        <Volume2 className="w-6 h-6 text-white" />
                    )}
                    <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-black/80 text-white text-sm px-3 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        {isMuted ? "Unmute" : "Mute"}
                    </span>
                </motion.button>
            )}

            {/* Background */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/80 z-10" />
                {/* Scenic Background */}
                <img
                    src="https://images.unsplash.com/photo-1464047736614-af63643285bf?q=80&w=2000&auto=format&fit=crop"
                    alt="Background"
                    className="w-full h-full object-cover opacity-70"
                    onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentElement.style.background = 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)';
                    }}
                />
            </div>

            <AnimatePresence mode="wait">
                {scene === "loading" && (
                    <OpeningScene onComplete={handleLoadingComplete} />
                )}
            </AnimatePresence>

            <GateTransition isOpen={isGateOpen} onOpen={handleGateOpen} audioRef={audioRef} />

            <div className="relative z-20 w-full min-h-screen flex flex-col items-center justify-start">
                {/* Cinematic Theme Content - Photos Layer */}
                {theme === "cinematic" && (scene === "entrance" || scene === "content") && (
                    <div className="absolute inset-0 w-full h-screen z-5">
                        <CoupleEntrance
                            malePhoto={data?.malePhotoUrl}
                            femalePhoto={data?.femalePhotoUrl}
                            onComplete={handleEntranceComplete}
                        />
                    </div>
                )}

                {/* Content Layer - Above Photos */}
                {scene === "content" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        className="relative z-30 w-full max-w-4xl mx-auto pb-20 pt-20 md:pt-32"
                    >
                        <InvitationText
                            title={data?.title}
                            date={data?.date}
                            venue={data?.venue}
                            venueMapUrl={data?.venueMapUrl}
                            hosts={data?.hosts}
                        />

                        {/* Message Section */}
                        {data?.message && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 4, duration: 1 }}
                                className="mt-12 px-6 text-center"
                            >
                                <p className="text-lg md:text-2xl font-great-vibes text-amber-100 leading-relaxed max-w-2xl mx-auto">
                                    "{data.message}"
                                </p>
                            </motion.div>
                        )}

                        {/* Gallery Theme Content */}
                        {theme === "gallery" && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                                className="mt-12"
                            >
                                <PhotoGallery photos={allPhotos} />
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </div>

            {/* Theme Control Panel */}
            {scene === "content" && <ThemeControlPanel currentTheme={theme} onThemeChange={setTheme} />}
        </div>
    );
}
