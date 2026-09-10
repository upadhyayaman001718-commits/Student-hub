import { Resource } from "@/shared/data/resources";
import DownloadButton from "./DownloadButton";
import PDFPreview from "./PDFPreview";
import MetadataCard from "./MetadataCard";
import ResourceStats from "./ResourceStats";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  GraduationCap,
  User,
  FileText,
  Sparkles,
} from "lucide-react";

interface ResourceDetailsProps {
  resource: Resource;
  resourceId: number;
}

export default function ResourceDetails({
  resource,
  resourceId,
}: ResourceDetailsProps) {

  console.log("🔥 FRONTEND RESOURCE:", resource);
  console.log("🔥 FRONTEND RESOURCE ID:", resourceId);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      {/* Left Panel */}
      <div className="lg:col-span-1 lg:sticky lg:top-24 h-fit rounded-[28px] border border-[#E2E0DB] bg-white p-6 sm:p-8 shadow-2xs space-y-6">
        <div className="space-y-3">
          <Badge variant="accent" className="px-3.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.15em]">
            <Sparkles className="h-3 w-3 mr-1 text-white" />
            {resource.resourceType || resource.type || "Resource"}
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0A] tracking-tight leading-tight">
            {resource.title}
          </h1>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <MetadataCard
            icon={BookOpen}
            label="Subject"
            value={resource.subject}
          />

          <MetadataCard
            icon={GraduationCap}
            label="Semester"
            value={`Sem ${resource.semester}`}
          />

          <MetadataCard
            icon={User}
            label="Uploaded By"
            value={resource.uploadedBy || "Student"}
          />

          <MetadataCard
            icon={FileText}
            label="Format"
            value={resource.resourceType || resource.type || "Resource"}
          />
        </div>

        <DownloadButton resourceId={resourceId} />

        <div className="border-t border-[#F1F0EE] pt-6">
          <h2 className="text-xs font-extrabold text-[#0A0A0A] uppercase tracking-[0.15em]">
            Description
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-[#666666] font-normal">
            {resource.description || "No description available."}
          </p>
        </div>

        <ResourceStats
          downloads={124}
          pages={32}
          rating={4.9}
        />
      </div>

      {/* Right Panel - PDF View */}
      <div className="lg:col-span-2 space-y-6">
        <PDFPreview resourceId={resourceId} />
      </div>
    </div>
  );
}