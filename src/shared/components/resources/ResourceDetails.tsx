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
  Layers,
  FileType,
  FileCheck,
} from "lucide-react";

interface ResourceDetailsProps {
  resource: Resource;
  resourceId: number;
}

export default function ResourceDetails({
  resource,
  resourceId,
}: ResourceDetailsProps) {
  // Dynamically prepare non-null and non-empty metadata cards
  const metadataItems = [
    resource.program
      ? {
          icon: GraduationCap,
          label: "Program",
          value: resource.program,
        }
      : null,
    resource.subject
      ? {
          icon: BookOpen,
          label: "Subject",
          value: resource.subject,
        }
      : null,
    resource.semester
      ? {
          icon: Layers,
          label: "Semester",
          value: `Semester ${resource.semester}`,
        }
      : null,
    resource.course
      ? {
          icon: BookOpen,
          label: "Course",
          value: resource.course,
        }
      : null,
    resource.resourceType || resource.type
      ? {
          icon: FileText,
          label: "Resource Type",
          value: resource.resourceType || resource.type || "",
        }
      : null,
    resource.fileName
      ? {
          icon: FileCheck,
          label: "File Name",
          value: resource.fileName,
        }
      : null,
    resource.fileType
      ? {
          icon: FileType,
          label: "File Format",
          value: resource.fileType.toUpperCase(),
        }
      : null,
    resource.uploadedBy
      ? {
          icon: User,
          label: "Uploaded By",
          value: resource.uploadedBy,
        }
      : null,
  ].filter((item): item is NonNullable<typeof item> => item !== null);

  const displayType = resource.resourceType || resource.type || "Resource";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      {/* Left Column: Information Panel & Primary Actions */}
      <div className="lg:col-span-1 lg:sticky lg:top-24 h-fit rounded-[28px] border border-[#E2E0DB] bg-white p-6 sm:p-8 shadow-2xs space-y-6">
        {/* Title & Badge */}
        <div className="space-y-3">
          <Badge variant="accent" className="px-3.5 py-1 text-[10px] font-extrabold uppercase tracking-[0.15em] w-fit">
            <Sparkles className="h-3 w-3 mr-1 text-white inline" />
            {displayType}
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0A0A0A] tracking-tight leading-tight">
            {resource.title}
          </h1>
          {resource.subject && (
            <p className="text-sm font-semibold text-[#B15F2C]">
              {resource.subject}
            </p>
          )}
        </div>

        {/* Dynamic Metadata Grid */}
        {metadataItems.length > 0 && (
          <div className="grid grid-cols-2 gap-3">
            {metadataItems.map((item) => (
              <MetadataCard
                key={item.label}
                icon={item.icon}
                label={item.label}
                value={item.value}
              />
            ))}
          </div>
        )}

        {/* Primary Action Button */}
        <DownloadButton resourceId={resourceId} fileName={resource.fileName} />

        {/* Optional Description */}
        {resource.description && (
          <div className="border-t border-[#F1F0EE] pt-6 space-y-2">
            <h2 className="text-xs font-extrabold text-[#0A0A0A] uppercase tracking-[0.15em]">
              Description
            </h2>
            <p className="text-sm leading-relaxed text-[#666666] font-normal">
              {resource.description}
            </p>
          </div>
        )}

        {/* Platform Stats */}
        <ResourceStats downloads={124} pages={32} rating={4.9} />
      </div>

      {/* Right Column: Embedded PDF Viewer */}
      <div className="lg:col-span-2 space-y-6">
        <div className="flex items-center justify-between px-2">
          <h2 className="text-lg font-extrabold text-[#0A0A0A]">
            Document Viewer
          </h2>
          <span className="text-xs font-mono font-semibold text-[#666666] bg-[#F1F0EE] px-3 py-1 rounded-full border border-[#E2E0DB]">
            {resource.fileType || "PDF"}
          </span>
        </div>
        <PDFPreview resourceId={resourceId} fileName={resource.fileName} />
      </div>
    </div>
  );
}