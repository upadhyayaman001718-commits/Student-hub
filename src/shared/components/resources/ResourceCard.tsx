import { Resource } from "@/shared/data/resources";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  FileText,
  BookOpen,
  GraduationCap,
  User,
  Download,
  FileCode,
  HelpCircle,
  ArrowRight,
} from "lucide-react";

interface ResourceCardProps {
  resource: Resource;
}

export default function ResourceCard({ resource }: ResourceCardProps) {
  const getTypeConfig = (type: Resource["type"]) => {
    switch (type) {
      case "Notes":
        return {
          variant: "accent" as const,
          icon: FileText,
          iconBg: "bg-[#B15F2C]/10 text-[#B15F2C] border-[#B15F2C]/20",
          label: "Notes",
        };
      case "PYQ":
        return {
          variant: "default" as const,
          icon: HelpCircle,
          iconBg: "bg-[#0A0A0A] text-white border-black/10",
          label: "PYQ",
        };
      case "Lab Manual":
        return {
          variant: "orange" as const,
          icon: FileCode,
          iconBg: "bg-[#B15F2C]/10 text-[#B15F2C] border-[#B15F2C]/20",
          label: "Lab Manual",
        };
      default:
        return {
          variant: "secondary" as const,
          icon: FileText,
          iconBg: "bg-[#F1F0EE] text-[#0A0A0A] border-[#E2E0DB]",
          label: "Resource",
        };
    }
  };

  const config = getTypeConfig(resource.resourceType || resource.type);
  const Icon = config.icon;

  return (
    <Link href={`/resources/${resource.id}`} className="block group h-full">
      <Card className="relative flex flex-col justify-between h-full min-h-[280px] bg-white border border-[#E2E0DB] p-7 rounded-[28px] shadow-2xs transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:border-[#B15F2C]/40 overflow-hidden">
        <div className="space-y-5">
          {/* Top Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className={`rounded-2xl p-3 border ${config.iconBg} shadow-2xs group-hover:scale-105 transition-transform duration-300`}>
                <Icon className="h-5 w-5" />
              </div>

              <div>
                <h3 className="text-base font-bold text-[#0A0A0A] line-clamp-1 leading-snug group-hover:text-[#B15F2C] transition-colors duration-300">
                  {resource.title}
                </h3>
                <p className="text-xs font-medium text-[#666666] mt-0.5">
                  {resource.subject}
                </p>
              </div>
            </div>

            <Badge variant={config.variant} className="shrink-0 font-extrabold uppercase text-[10px] px-3 py-1">
              {config.label}
            </Badge>
          </div>

          {/* Details List */}
          <div className="space-y-2.5 border-t border-[#F1F0EE] pt-4 text-xs font-medium text-[#666666]">
            <div className="flex justify-between items-center">
              <span className="flex items-center gap-1.5 text-[#666666]">
                <GraduationCap className="h-3.5 w-3.5 text-[#B15F2C]" />
                Semester
              </span>
              <span className="text-[#0A0A0A] font-bold">Semester {resource.semester}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="flex items-center gap-1.5 text-[#666666]">
                <BookOpen className="h-3.5 w-3.5 text-[#0A0A0A]" />
                Subject
              </span>
              <span className="text-[#0A0A0A] font-bold truncate max-w-[150px]">{resource.subject}</span>
            </div>

            <div className="flex justify-between items-center">
              <span className="flex items-center gap-1.5 text-[#666666]">
                <User className="h-3.5 w-3.5 text-[#666666]/70" />
                Uploaded By
              </span>
              <span className="text-[#0A0A0A] font-bold truncate max-w-[150px]">{resource.uploadedBy || "Student"}</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <Button variant="accent" className="mt-6 w-full h-11 bg-[#B15F2C] hover:bg-[#9E5324] text-white font-extrabold tracking-wide uppercase text-xs rounded-full shadow-2xs transition-all duration-300 gap-2 cursor-pointer">
          <Download className="h-4 w-4" />
          View & Download
          <ArrowRight className="h-3.5 w-3.5 opacity-80 group-hover:translate-x-1 transition-transform ml-auto" />
        </Button>
      </Card>
    </Link>
  );
}