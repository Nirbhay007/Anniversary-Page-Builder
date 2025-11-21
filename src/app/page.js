"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createAnniversaryPage } from "@/app/actions/anniversary";
import { Loader2, Upload, Image as ImageIcon } from "lucide-react";
import PhotoUploader from "@/components/PhotoUploader";

function SinglePhotoUploader({ label, value, onChange }) {
    const [uploading, setUploading] = useState(false);

    const handleFileChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            if (data.success) {
                onChange(data.url);
            } else {
                alert("Upload failed");
            }
        } catch (error) {
            console.error("Upload error", error);
            alert("Upload error");
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-300">{label}</label>
            <div className="relative border-2 border-dashed border-gray-600 rounded-lg p-4 hover:border-amber-500 transition-colors">
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={uploading}
                />
                <div className="flex flex-col items-center justify-center text-center">
                    {value ? (
                        <div className="relative w-32 h-32 mb-2">
                            <img src={value} alt="Preview" className="w-full h-full object-cover rounded-md" />
                        </div>
                    ) : (
                        <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mb-2">
                            {uploading ? <Loader2 className="w-6 h-6 animate-spin text-amber-500" /> : <ImageIcon className="w-6 h-6 text-gray-400" />}
                        </div>
                    )}
                    <p className="text-sm text-gray-400">
                        {uploading ? "Uploading..." : value ? "Click to change" : "Click to upload"}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function CreateAnniversaryPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: "Our Anniversary",
        date: "",
        venue: "",
        venueMapUrl: "",
        hosts: "",
        message: "",
        malePhotoUrl: "",
        femalePhotoUrl: "",
        galleryPhotos: [],
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            if (key === 'galleryPhotos') {
                data.append(key, JSON.stringify(value));
            } else {
                data.append(key, value);
            }
        });

        try {
            const result = await createAnniversaryPage(data);
            if (result.success) {
                router.push(`/a/${result.id}`);
            } else {
                alert("Failed to create page: " + result.error);
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white p-6 md:p-12 font-sans">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl md:text-5xl font-playfair text-amber-500 mb-8 text-center">
                    Create Anniversary Page
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6 bg-gray-900/50 p-8 rounded-2xl border border-gray-800">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Event Title</label>
                        <input
                            type="text"
                            required
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-amber-500 outline-none"
                            placeholder="e.g., 25th Wedding Anniversary"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Date</label>
                            <input
                                type="date"
                                required
                                value={formData.date}
                                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-amber-500 outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Venue</label>
                            <input
                                type="text"
                                required
                                value={formData.venue}
                                onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-amber-500 outline-none"
                                placeholder="e.g., The Grand Palace"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Venue Map URL (Optional)</label>
                        <input
                            type="url"
                            value={formData.venueMapUrl}
                            onChange={(e) => setFormData({ ...formData, venueMapUrl: e.target.value })}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-amber-500 outline-none"
                            placeholder="e.g., https://maps.google.com/..."
                        />
                        <p className="text-xs text-gray-400 mt-1">Add a Google Maps link or any map service URL to help guests find the venue</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Hosted By</label>
                        <input
                            type="text"
                            required
                            value={formData.hosts}
                            onChange={(e) => setFormData({ ...formData, hosts: e.target.value })}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-amber-500 outline-none"
                            placeholder="e.g., The Sharma Family"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <SinglePhotoUploader
                            label="Male Photo"
                            value={formData.malePhotoUrl}
                            onChange={(url) => setFormData({ ...formData, malePhotoUrl: url })}
                        />
                        <SinglePhotoUploader
                            label="Female Photo"
                            value={formData.femalePhotoUrl}
                            onChange={(url) => setFormData({ ...formData, femalePhotoUrl: url })}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Gallery Photos (Optional)</label>
                        <p className="text-xs text-gray-400 mb-2">Upload up to 8 photos for the Gallery Theme</p>
                        <PhotoUploader
                            photos={formData.galleryPhotos}
                            setPhotos={(newPhotos) => {
                                // Handle both functional updates and direct values
                                const updated = typeof newPhotos === 'function'
                                    ? newPhotos(formData.galleryPhotos)
                                    : newPhotos;
                                setFormData({ ...formData, galleryPhotos: updated });
                            }}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Special Message</label>
                        <textarea
                            rows={4}
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-amber-500 outline-none"
                            placeholder="Write a heartfelt message..."
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold py-3 rounded-lg hover:from-amber-700 hover:to-orange-700 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? (
                            <span className="flex items-center justify-center gap-2">
                                <Loader2 className="w-5 h-5 animate-spin" /> Creating Magic...
                            </span>
                        ) : (
                            "Create Invitation"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
