import { getAnniversaryPage } from "@/app/actions/anniversary";
import AnniversaryContainer from "@/components/anniversary/AnniversaryContainer";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
    const { id } = await params;
    const page = await getAnniversaryPage(id);

    if (!page) {
        return {
            title: "Page Not Found",
        };
    }

    return {
        title: `${page.title} - Invitation`,
        description: `You are invited to ${page.title}`,
    };
}

export default async function AnniversaryPage({ params }) {
    const { id } = await params;
    const page = await getAnniversaryPage(id);

    if (!page) {
        notFound();
    }

    return <AnniversaryContainer data={page} />;
}
