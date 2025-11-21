"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

export default function InvitationText({ title, date, venue, venueMapUrl, hosts }) {
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

                {/* Map Link with Catchy Line */}
                {venueMapUrl && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 3.5, duration: 0.8 }}
                        className="mt-4"
                    >
                        <a
                            href={venueMapUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
                        >
                            <MapPin className="w-5 h-5 group-hover:animate-bounce" />
                            <span className="text-sm md:text-base">Find Your Way to Celebrate With Us</span>
                        </a>
                        <p className="text-xs md:text-sm text-amber-200 mt-2 font-light italic">
                            Let the journey to joy begin here ✨
                        </p>
                    </motion.div>
                )}

                <div className="mt-10 pt-6 border-t border-amber-400/30">
                    <p className="text-sm text-amber-300 uppercase tracking-[0.3em] mb-3 font-semibold">Hosted By</p>
                    <p className="text-2xl md:text-3xl font-playfair text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">{hosts || "Loving Family"}</p>
                </div>
            </motion.div>
        </div>
    );
}
