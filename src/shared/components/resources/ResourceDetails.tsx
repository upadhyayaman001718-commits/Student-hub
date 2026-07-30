import { Resource } from "@/shared/data/resources";
import DownloadButton from "./DownloadButton";
import PDFPreview from "./PDFPreview";
import MetadataCard from "./MetadataCard";
import ResourceStats from "./ResourceStats";
import {
    BookOpen,
    GraduationCap,
    User,
    FileText,
} from "lucide-react";

interface ResourceDetailsProps {
    resource: Resource;
}

export default function ResourceDetails({
    resource,
}: ResourceDetailsProps) {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left Panel */}
            <div className="lg:col-span-1 lg:sticky lg:top-24 h-fit rounded-2xl border border-white/10 bg-[#18181B] p-8">

                <h1 className="text-3xl font-bold">
                    {resource.title}
                </h1>

                <div className="mt-8 grid grid-cols-2 gap-4">

                    <MetadataCard
                        icon={BookOpen}
                        label="Subject"
                        value={resource.subject}
                    />

                    <MetadataCard
                        icon={GraduationCap}
                        label="Semester"
                        value={`Semester ${resource.semester}`}
                    />

                    <MetadataCard
                        icon={User}
                        label="Uploaded By"
                        value={resource.uploadedBy}
                    />

                    <MetadataCard
                        icon={FileText}
                        label="Type"
                        value={resource.type}
                    />

                </div>


                <DownloadButton />
                <div className="mt-8 border-t border-white/10 pt-6">
                    <h2 className="text-lg font-semibold text-white">
                        Description
                    </h2>

                    <p className="mt-3 text-sm leading-7 text-zinc-400">
                        {resource.description}
                    </p>
                </div>


                <ResourceStats
                    downloads={124}
                    pages={32}
                    rating={4.9}
                />

            </div>

            <DownloadButton />

            {/* Right Panel */}

            <div className="lg:col-span-2">

                <PDFPreview />

            </div>

        </div>
    );
}