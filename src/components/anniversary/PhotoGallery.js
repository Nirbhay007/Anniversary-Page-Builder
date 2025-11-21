"use client";

import { motion } from "framer-motion";

export default function PhotoGallery({ photos = [] }) {
    // If no photos provided, show a message or placeholders
    const displayPhotos = photos.length > 0 ? photos : [
        "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1511285560982-1351cdeb9821?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop",
    ];

    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-12">
            <motion.h2
                className="text-3xl md:text-5xl font-playfair text-center text-amber-200 mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                Our Memories
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {displayPhotos.map((photo, index) => (
                    <motion.div
                        key={index}
                        className="relative aspect-[3/4] overflow-hidden rounded-lg shadow-lg group"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        whileHover={{ scale: 1.05, rotate: Math.random() * 4 - 2 }}
                    >
                        <img
                            src={typeof photo === 'string' ? photo : photo.url}
                            alt={`Memory ${index + 1}`}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
