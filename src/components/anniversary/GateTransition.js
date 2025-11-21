"use client";

import { motion } from "framer-motion";
import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function GateTransition({ onOpen, isOpen, audioRef }) {
    useEffect(() => {
        if (isOpen) {
            // Trigger canvas-confetti when gates open
            const duration = 3000;
            const animationEnd = Date.now() + duration;
            const defaults = {
                startVelocity: 30,
                spread: 360,
                ticks: 60,
                zIndex: 100,
                colors: ['#FFC0CB', '#FF69B4', '#FFD700', '#FFA500', '#FF1493', '#DA70D6']
            };

            function randomInRange(min, max) {
                return Math.random() * (max - min) + min;
            }

            // Create confetti burst
            const interval = setInterval(function () {
                const timeLeft = animationEnd - Date.now();

                if (timeLeft <= 0) {
                    return clearInterval(interval);
                }

                const particleCount = 50 * (timeLeft / duration);

                // Burst from center
                confetti({
                    ...defaults,
                    particleCount,
                    origin: { x: randomInRange(0.4, 0.6), y: 0.5 }
                });
            }, 250);

            // Hearts confetti
            const heartInterval = setInterval(function () {
                confetti({
                    particleCount: 2,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: ['#FF1493', '#FF69B4', '#FFB6C1'],
                    shapes: ['circle'],
                    scalar: 1.2
                });
                confetti({
                    particleCount: 2,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: ['#FF1493', '#FF69B4', '#FFB6C1'],
                    shapes: ['circle'],
                    scalar: 1.2
                });
            }, 200);

            setTimeout(() => {
                clearInterval(heartInterval);
            }, duration);

            return () => {
                clearInterval(interval);
                clearInterval(heartInterval);
            };
        }
    }, [isOpen]);

    return (
        <div className="fixed inset-0 z-40 pointer-events-none flex">
            {/* Left Gate */}
            <motion.div
                className="w-1/2 h-full bg-gradient-to-r from-[#1a1a1a] to-[#2d2d2d] border-r-4 border-amber-600/50 relative overflow-hidden flex items-center justify-end"
                initial={{ x: 0 }}
                animate={{ x: isOpen ? "-100%" : 0 }}
                transition={{ duration: 2.5, ease: "easeInOut", delay: 0.2 }}
            >
                {/* Ornate Pattern (CSS) */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')]" />
                <div className="w-full h-full border-8 border-double border-amber-700/30 m-4 rounded-l-lg" />

                {/* Handle */}
                <div className="w-4 h-32 bg-amber-600 rounded-l-full shadow-[0_0_20px_rgba(245,158,11,0.5)] mr-2" />
            </motion.div>

            {/* Right Gate */}
            <motion.div
                className="w-1/2 h-full bg-gradient-to-l from-[#1a1a1a] to-[#2d2d2d] border-l-4 border-amber-600/50 relative overflow-hidden flex items-center justify-start"
                initial={{ x: 0 }}
                animate={{ x: isOpen ? "100%" : 0 }}
                transition={{ duration: 2.5, ease: "easeInOut", delay: 0.2 }}
                onAnimationComplete={() => {
                    if (isOpen && onOpen) onOpen();
                }}
            >
                {/* Ornate Pattern (CSS) */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')]" />
                <div className="w-full h-full border-8 border-double border-amber-700/30 m-4 rounded-r-lg" />

                {/* Handle */}
                <div className="w-4 h-32 bg-amber-600 rounded-r-full shadow-[0_0_20px_rgba(245,158,11,0.5)] ml-2" />
            </motion.div>

            {/* Center Glow when closed */}
            {!isOpen && (
                <motion.div
                    className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-[80%] bg-amber-500/50 blur-xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                />
            )}
        </div>
    );
}
