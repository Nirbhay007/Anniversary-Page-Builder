"use client";

import { motion } from "framer-motion";
import { Settings, Image as ImageIcon, Film } from "lucide-react";
import { useState } from "react";

export default function ThemeControlPanel({ currentTheme, onThemeChange }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <motion.div
                className="bg-black/80 backdrop-blur-md border border-amber-500/30 rounded-full p-2 flex items-center gap-2"
                initial={false}
                animate={{ width: isOpen ? "auto" : "48px" }}
            >
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-amber-600 text-white hover:bg-amber-700 transition-colors"
                >
                    <Settings className="w-5 h-5" />
                </button>

                {isOpen && (
                    <motion.div
                        className="flex items-center gap-2 pr-2 overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <button
                            onClick={() => onThemeChange("cinematic")}
                            className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 transition-colors ${currentTheme === "cinematic"
                                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/50"
                                    : "text-gray-400 hover:text-white"
                                }`}
                        >
                            <Film className="w-3 h-3" /> Cinematic
                        </button>
                        <button
                            onClick={() => onThemeChange("gallery")}
                            className={`px-3 py-1 rounded-full text-sm flex items-center gap-1 transition-colors ${currentTheme === "gallery"
                                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/50"
                                    : "text-gray-400 hover:text-white"
                                }`}
                        >
                            <ImageIcon className="w-3 h-3" /> Gallery
                        </button>
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}
