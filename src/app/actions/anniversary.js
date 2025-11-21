"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createAnniversaryPage(formData) {
    const title = formData.get("title");
    const date = new Date(formData.get("date"));
    const venue = formData.get("venue");
    const venueMapUrl = formData.get("venueMapUrl");
    const hosts = formData.get("hosts");
    const message = formData.get("message");
    const malePhotoUrl = formData.get("malePhotoUrl");
    const femalePhotoUrl = formData.get("femalePhotoUrl");
    const theme = formData.get("theme") || "cinematic";
    const galleryPhotos = JSON.parse(formData.get("galleryPhotos") || "[]");

    // Validate required fields
    if (!title || !date || !venue || !hosts || !malePhotoUrl || !femalePhotoUrl) {
        throw new Error("Missing required fields");
    }

    try {
        const page = await prisma.anniversaryPage.create({
            data: {
                title,
                date,
                venue,
                venueMapUrl: venueMapUrl || null,
                hosts,
                message,
                malePhotoUrl,
                femalePhotoUrl,
                theme,
                photos: {
                    create: galleryPhotos.map((url, index) => ({
                        url,
                        order: index,
                    })),
                },
            },
        });

        return { success: true, id: page.id };
    } catch (error) {
        console.error("Error creating anniversary page:", error);
        return { success: false, error: "Failed to create page" };
    }
}

export async function getAnniversaryPage(id) {
    try {
        const page = await prisma.anniversaryPage.findUnique({
            where: { id },
            include: {
                photos: true,
            },
        });
        return page;
    } catch (error) {
        console.error("Error fetching anniversary page:", error);
        return null;
    }
}
