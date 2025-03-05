// app/roadmap/page.js
import RoadmapComponent from "@/components/roadmap/RoadmapComponent";
import QueryProvider from "@/components/providers/QueryProvider";

export default function RoadmapPage() {
    return (
        <QueryProvider>
            <RoadmapComponent />
        </QueryProvider>
    );
}