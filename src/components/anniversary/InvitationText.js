"use client";

import { motion } from "framer-motion";

export default function InvitationText({ title, date, venue, hosts }) {
    const text = "You are invited...";


    return (
        <div className="text-center z-30 px-4 py-8 backdrop-blur-sm bg-black/20 rounded-3xl max-w-3xl mx-auto">
            {/* Typewriter Effect */}
            <motion.h2
                className="text-3xl md:text-5xl font-great-vibes text-amber-300 mb-8 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
                initial={{ opacity: 1 }}
            >
                {text.split("").map((char, index) => (
                    <motion.span
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.1, delay: index * 0.1 }}
                    >
                        {char}
                    </motion.span>
                ))}
            </motion.h2>

            {/* Event Details Fade In */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.5, delay: 2.5, ease: "easeOut" }}
                className="space-y-6"
            >
                <h1 className="text-4xl md:text-6xl font-playfair text-white tracking-wider uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)] font-bold leading-tight">
                    {title || "Wedding Anniversary"}
                </h1>

                <div className="w-32 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto my-6" />

                <p className="text-xl md:text-2xl font-lato text-amber-100 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
                    {date ? new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : "Date TBD"}
                </p>

                <p className="text-xl md:text-2xl font-playfair text-rose-200 italic drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
                    {venue || "Venue TBD"}
                </p>

                <div className="mt-10 pt-6 border-t border-amber-400/30">
                    <p className="text-sm text-amber-300 uppercase tracking-[0.3em] mb-3 font-semibold">Hosted By</p>
                    <p className="text-2xl md:text-3xl font-playfair text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">{hosts || "Loving Family"}</p>
                </div>
            </motion.div>
        </div>
    );
}
