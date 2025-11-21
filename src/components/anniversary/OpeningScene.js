"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function OpeningScene({ onComplete }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(onComplete, 1000); // Wait a bit before finishing
                    return 100;
                }
                return prev + 1;
            });
        }, 40); // 4 seconds total

        return () => clearInterval(timer);
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
        >
            {/* Ambient Background - Soft Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-black via-[#1a0505] to-black opacity-80" />

            {/* Light Leaks */}
            <motion.div
                className="absolute top-[-50%] left-[-20%] w-[800px] h-[800px] rounded-full bg-orange-500/20 blur-[120px]"
                animate={{
                    x: [0, 100, 0],
                    y: [0, 50, 0],
                    scale: [1, 1.2, 1],
                    opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-[-20%] right-[-20%] w-[600px] h-[600px] rounded-full bg-rose-500/10 blur-[100px]"
                animate={{
                    x: [0, -50, 0],
                    y: [0, -50, 0],
                    scale: [1, 1.1, 1],
                    opacity: [0.1, 0.3, 0.1]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />

            {/* Floral Particles (Simple CSS/Framer representation) */}
            {[...Array(15)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-white/30 rounded-full blur-[1px]"
                    initial={{
                        x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                        y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
                        opacity: 0
                    }}
                    animate={{
                        y: [null, Math.random() * -100],
                        opacity: [0, 0.5, 0]
                    }}
                    transition={{
                        duration: 3 + Math.random() * 4,
                        repeat: Infinity,
                        ease: "linear",
                        delay: Math.random() * 2
                    }}
                />
            ))}

            {/* Text Content */}
            <div className="relative z-10 text-center">
                <motion.h1
                    className="text-4xl md:text-6xl font-great-vibes text-amber-100/90 mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                >
                    Preparing a special moment...
                </motion.h1>

                {/* Loading Bar */}
                <div className="w-64 h-[2px] bg-white/10 rounded-full overflow-hidden mx-auto">
                    <motion.div
                        className="h-full bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-200"
                        initial={{ width: "0%" }}
                        animate={{ width: `${progress}%` }}
                        transition={{ ease: "linear" }}
                    />
                </div>
            </div>
        </motion.div>
    );
}
