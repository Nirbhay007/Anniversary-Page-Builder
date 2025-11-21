"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function CoupleEntrance({ malePhoto, femalePhoto, onComplete }) {
    const [showFlowers, setShowFlowers] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check if mobile
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);

        const timer = setTimeout(() => {
            setShowFlowers(true);
        }, 1500);

        const completeTimer = setTimeout(() => {
            if (onComplete) onComplete();
        }, 4500);

        return () => {
            window.removeEventListener('resize', checkMobile);
            clearTimeout(timer);
            clearTimeout(completeTimer);
        };
    }, [onComplete]);

    return (
        <div className="relative w-full h-full flex items-center justify-center overflow-visible">
            {/* Male Photo - Enters from Left - LARGER SIZE */}
            <motion.div
                className="absolute w-48 h-60 md:w-80 md:h-[400px] bg-gradient-to-br from-amber-50 to-white p-3 shadow-[0_0_50px_rgba(245,158,11,0.4)] z-10 border-4 border-amber-400/60"
                style={{
                    left: isMobile ? '6%' : '30%',
                    top: isMobile ? '68%' : '50%',
                    transform: isMobile ? 'translate(-50%, -50%)' : 'translate(calc(-50% - 180px), -50%)'
                }}
                initial={{ x: -1000, opacity: 0, rotate: -8 }}
                animate={{
                    x: 0,
                    opacity: 1,
                    rotate: -5
                }}
                transition={{
                    type: "spring",
                    stiffness: 35,
                    damping: 12,
                    mass: 1.5,
                    delay: 0.5
                }}
            >
                {/* Decorative corner ornaments */}
                <div className="absolute -top-2 -left-2 w-6 h-6 border-t-4 border-l-4 border-amber-500" />
                <div className="absolute -top-2 -right-2 w-6 h-6 border-t-4 border-r-4 border-amber-500" />
                <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-4 border-l-4 border-amber-500" />
                <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-4 border-r-4 border-amber-500" />

                <div className="w-full h-full overflow-hidden relative shadow-inner">
                    {malePhoto ? (
                        <img src={malePhoto} alt="Male" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-500 font-serif text-lg">Photo</div>
                    )}
                </div>

                {/* Golden glow effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-amber-400/20 via-transparent to-transparent pointer-events-none" />
            </motion.div>

            {/* Female Photo - Enters from Right - LARGER SIZE */}
            <motion.div
                className="absolute w-48 h-60 md:w-80 md:h-[400px] bg-gradient-to-bl from-rose-50 to-white p-3 shadow-[0_0_50px_rgba(244,63,94,0.3)] z-10 border-4 border-rose-400/60"
                style={{
                    left: isMobile ? '48%' : '50%',
                    top: isMobile ? '68%' : '50%',
                    transform: isMobile ? 'translate(-50%, -50%)' : 'translate(calc(-50% + 180px), -50%)'
                }}
                initial={{ x: 1000, opacity: 0, rotate: 8 }}
                animate={{
                    x: 0,
                    opacity: 1,
                    rotate: 5
                }}
                transition={{
                    type: "spring",
                    stiffness: 35,
                    damping: 12,
                    mass: 1.5,
                    delay: 0.5
                }}
            >
                {/* Decorative corner ornaments */}
                <div className="absolute -top-2 -left-2 w-6 h-6 border-t-4 border-l-4 border-rose-500" />
                <div className="absolute -top-2 -right-2 w-6 h-6 border-t-4 border-r-4 border-rose-500" />
                <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-4 border-l-4 border-rose-500" />
                <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-4 border-r-4 border-rose-500" />

                <div className="w-full h-full overflow-hidden relative shadow-inner">
                    {femalePhoto ? (
                        <img src={femalePhoto} alt="Female" className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-bl from-gray-200 to-gray-300 flex items-center justify-center text-gray-500 font-serif text-lg">Photo</div>
                    )}
                </div>

                {/* Rose glow effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-rose-400/20 via-transparent to-transparent pointer-events-none" />
            </motion.div>

            {/* Enhanced Falling Flowers Animation */}
            {showFlowers && (
                <div className="absolute inset-0 pointer-events-none z-20">
                    {/* Main flower confetti */}
                    {[...Array(40)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute text-3xl md:text-4xl drop-shadow-lg"
                            initial={{
                                y: -50,
                                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                                rotate: 0,
                                opacity: 1,
                                scale: 0.5
                            }}
                            animate={{
                                y: typeof window !== 'undefined' ? window.innerHeight + 100 : 1000,
                                rotate: [0, 180, 360],
                                x: `calc(${Math.random() * 100}vw + ${Math.random() * 100 - 50}px)`,
                                scale: [0.5, 1.2, 0.8]
                            }}
                            transition={{
                                duration: 4 + Math.random() * 3,
                                ease: "linear",
                                delay: Math.random() * 2.5
                            }}
                        >
                            {['🌸', '🌹', '🌺', '🌷', '🏵️', '💐'][Math.floor(Math.random() * 6)]}
                        </motion.div>
                    ))}

                    {/* Sparkle effects */}
                    {[...Array(25)].map((_, i) => (
                        <motion.div
                            key={`sparkle-${i}`}
                            className="absolute text-xl md:text-2xl"
                            initial={{
                                y: Math.random() * 200,
                                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                                opacity: 0,
                                scale: 0
                            }}
                            animate={{
                                y: [null, Math.random() * 400 + 200],
                                opacity: [0, 1, 1, 0],
                                scale: [0, 1.5, 1, 0],
                                rotate: [0, 180]
                            }}
                            transition={{
                                duration: 2 + Math.random() * 2,
                                ease: "easeOut",
                                delay: Math.random() * 3
                            }}
                        >
                            ✨
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
