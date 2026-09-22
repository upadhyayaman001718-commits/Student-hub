import { Resource } from "@/shared/data/resources";
import DownloadButton from "./DownloadButton";
import PDFPreview from "./PDFPreview";
import MetadataCard from "./MetadataCard";
import ResourceStats from "./ResourceStats";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen, GraduationCap, User, FileText,
  Sparkles, Layers, FileType, FileCheck,
} from "lucide-react";

interface ResourceDetailsProps {
  resource: Resource;
  resourceId: number;
}

export default function ResourceDetails({ resource, resourceId }: ResourceDetailsProps) {
  const metadataItems = [
    resource.program   && { icon: GraduationCap, label: "Programme",   value: resource.program },
    resource.subject   && { icon: BookOpen,      label: "Subject",     value: resource.subject },
    resource.semester  && { icon: Layers,        label: "Semester",    value: `Semester ${resource.semester}` },
    resource.course    && { icon: BookOpen,      label: "Course",      value: resource.course },
    (resource.resourceType || resource.type) && {
      icon: FileText, label: "Type", value: resource.resourceType || resource.type || "",
    },
    resource.fileName  && { icon: FileCheck, label: "File Name",   value: resource.fileName },
    resource.fileType  && { icon: FileType,  label: "Format",      value: resource.fileType.toUpperCase() },
    resource.uploadedBy && { icon: User,     label: "Uploaded By", value: resource.uploadedBy },
  ].filter((x): x is { icon: typeof FileText; label: string; value: string } => Boolean(x));

  const displayType = resource.resourceType || resource.type || "Resource";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start mt-6">

      {/* ── Left: Info panel ── */}
      <div className="lg:col-span-1 lg:sticky lg:top-20 h-fit glass-light rounded-2xl p-5 space-y-5">

        {/* Title + badge */}
        <div className="space-y-2.5">
          <Badge className="label-mono bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2.5 py-0.5 shadow-none">
            <Sparkles className="h-2.5 w-2.5 mr-1.5 inline" />
            {displayType}
          </Badge>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug">
            {resource.title}
          </h1>
          {resource.subject && (
            <p className="text-xs font-medium text-indigo-400 flex items-center gap-1.5">
              <BookOpen className="h-3 w-3" />
              {resource.subject}
            </p>
          )}
        </div>

        {/* Metadata grid */}
        {metadataItems.length > 0 && (
          <div className="grid grid-cols-2 gap-2">
            {metadataItems.map((item) => (
              <MetadataCard key={item.label} icon={item.icon} label={item.label} value={item.value} />
            ))}
          </div>
        )}

        {/* Download */}
        <DownloadButton resourceId={resourceId} fileName={resource.fileName} />

        {/* Description */}
        {resource.description && (
          <div className="border-t border-white/[0.06] pt-4 space-y-1.5">
            <h2 className="label-mono text-indigo-400">Description</h2>
            <p className="text-xs leading-relaxed text-slate-400 bg-[#111525]/50 border border-white/[0.05] p-3 rounded-xl">
              {resource.description}
            </p>
          </div>
        )}

        {/* Stats */}
        <ResourceStats downloads={124} pages={32} rating={4.9} />
      </div>

      {/* ── Right: PDF viewer ── */}
      <div className="lg:col-span-2 space-y-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <FileText className="h-4 w-4 text-indigo-400" />
            Document Viewer
          </h2>
          <span className="label-mono text-indigo-400 bg-[#111525] px-3 py-1 rounded-full border border-white/[0.07]">
            {(resource.fileType || "PDF").toUpperCase()}
          </span>
        </div>
        <PDFPreview resourceId={resourceId} fileName={resource.fileName} />
      </div>

    </div>
  );
}
