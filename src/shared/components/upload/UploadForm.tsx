"use client";

import React, { useState, DragEvent } from "react";
import Link from "next/link";
import { coursesByProgram } from "@/features/upload/data/courses";
import { semestersByCourse } from "@/features/upload/data/semester";
import { subjectsByCourseSemester } from "@/features/upload/data/subjects";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import {
  UploadCloud, FileCheck, Send, Loader2, AlertCircle,
  CheckCircle2, X, ExternalLink, RotateCcw, LogIn,
} from "lucide-react";
import { uploadResource } from "@/lib/api";
import { useAuth } from "@/shared/context/AuthContext";
import { Resource } from "@/shared/data/resources";

const MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024; // 50MB
const ALLOWED_EXTENSIONS = [".pdf", ".doc", ".docx", ".ppt", ".pptx"];
const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
];

export default function UploadForm() {
  const { isAuthenticated } = useAuth();

  const [program, setProgram] = useState("");
  const [course, setCourse] = useState("");
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [resourceType, setResourceType] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [uploadedResource, setUploadedResource] = useState<Resource | null>(null);

  const validateAndSetFile = (selectedFile: File) => {
    setFileError(null);
    setSubmitError(null);

    const ext = "." + selectedFile.name.split(".").pop()?.toLowerCase();
    const isValidExt = ALLOWED_EXTENSIONS.includes(ext);
    const isValidMime = ALLOWED_MIME_TYPES.includes(selectedFile.type);

    if (!isValidExt && !isValidMime) {
      setFileError(`Invalid file format. Please upload PDF, DOC, DOCX, PPT, or PPTX.`);
      setFile(null);
      return false;
    }

    if (selectedFile.size > MAX_FILE_SIZE_BYTES) {
      const sizeMB = (selectedFile.size / (1024 * 1024)).toFixed(1);
      setFileError(`File size (${sizeMB}MB) exceeds 50MB limit.`);
      setFile(null);
      return false;
    }

    setFile(selectedFile);
    return true;
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      validateAndSetFile(e.dataTransfer.files[0]);
    }
  };

  const handleResetForm = () => {
    setProgram("");
    setCourse("");
    setSemester("");
    setSubject("");
    setTitle("");
    setDescription("");
    setResourceType("");
    setFile(null);
    setSubmitError(null);
    setFileError(null);
    setUploadedResource(null);
  };

  const isFormValid = Boolean(
    program && course && semester && subject && title.trim() &&
    resourceType && file && !fileError
  );

  // Success screen
  if (uploadedResource) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center space-y-5">
        <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20
                        flex items-center justify-center text-emerald-400">
          <CheckCircle2 className="h-6 w-6" />
        </div>

        <div className="space-y-1.5">
          <span className="label-mono text-emerald-400">Upload Successful</span>
          <h2 className="text-xl font-extrabold text-white tracking-tight">
            Resource Shared with Community!
          </h2>
          <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
            &ldquo;<span className="text-white font-semibold">{uploadedResource.title}</span>&rdquo; is now live.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-sm pt-2">
          <Link href={`/resources/${uploadedResource.id}`} className="w-full">
            <button className="w-full h-10 bg-gradient-to-r from-indigo-600 to-purple-600
                              text-white rounded-full font-bold text-xs
                              shadow-md shadow-indigo-500/20 border border-indigo-400/20
                              flex items-center justify-center gap-2">
              <ExternalLink className="h-3.5 w-3.5" />
              View Resource
            </button>
          </Link>
          <button
            onClick={handleResetForm}
            className="w-full h-10 glass border border-white/[0.08] text-slate-300
                       rounded-full font-semibold text-xs flex items-center justify-center gap-2
                       hover:text-white hover:bg-[#161B2E] transition-colors cursor-pointer"
          >
            <RotateCcw className="h-3.5 w-3.5 text-indigo-400" />
            Upload Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Auth warning */}
      {!isAuthenticated && (
        <div className="flex items-center justify-between gap-3 p-3 rounded-xl
                        bg-amber-500/8 border border-amber-500/20 text-amber-300 text-xs">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-amber-400 shrink-0" />
            <span>You must be logged in to upload resources.</span>
          </div>
          <Link href="/login" className="glass px-3 py-1 rounded-md border border-amber-500/20
                                         text-amber-200 font-semibold hover:bg-amber-500/10
                                         transition-colors flex items-center gap-1">
            <LogIn className="h-3 w-3" />
            Log In
          </Link>
        </div>
      )}

      {/* Submit error */}
      {submitError && (
        <div className="flex items-center justify-between gap-3 p-3 rounded-xl
                        bg-rose-500/8 border border-rose-500/20 text-rose-300 text-xs">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-rose-400 shrink-0" />
            <span>{submitError}</span>
          </div>
          <button
            onClick={() => setSubmitError(null)}
            className="text-rose-400 hover:text-white p-0.5 transition-colors cursor-pointer"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      <form
        className="space-y-4"
        onSubmit={async (e) => {
          e.preventDefault();
          if (!file || !isFormValid || uploading) return;

          try {
            setUploading(true);
            setSubmitError(null);

            const formData = new FormData();
            formData.append("title", title.trim());
            formData.append("subject", subject);
            formData.append("semester", semester.replace("Semester ", ""));
            formData.append("program", program);
            formData.append("course", course);
            formData.append("resourceType", resourceType);
            if (description.trim()) formData.append("description", description.trim());
            formData.append("file", file);

            const result = await uploadResource(formData);
            if (result.success && result.data) {
              setUploadedResource(result.data);
            } else {
              throw new Error(result.message || "Failed to upload resource.");
            }
          } catch (error: any) {
            console.error("Upload Error:", error);
            setSubmitError(error?.message || "Upload failed. Please try again.");
          } finally {
            setUploading(false);
          }
        }}
      >
        {/* Programme & Course */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormSelect
            label="Programme"
            value={program}
            onChange={(e) => {
              setProgram(e.target.value);
              setCourse("");
              setSemester("");
              setSubject("");
            }}
            placeholder="Select Programme"
            disabled={uploading}
            required
          >
            {Object.keys(coursesByProgram).map((programName) => (
              <option key={programName} value={programName}>
                {programName}
              </option>
            ))}
          </FormSelect>

          <FormSelect
            label="Course / Branch"
            value={course}
            onChange={(e) => {
              setCourse(e.target.value);
              setSemester("");
              setSubject("");
            }}
            disabled={!program || uploading}
            placeholder={program ? "Select Course" : "Select Programme First"}
            required
          >
            {(coursesByProgram[program] || []).map((courseName) => (
              <option key={courseName} value={courseName}>
                {courseName}
              </option>
            ))}
          </FormSelect>
        </div>

        {/* Semester & Subject */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormSelect
            label="Semester"
            value={semester}
            onChange={(e) => {
              setSemester(e.target.value);
              setSubject("");
            }}
            disabled={!course || uploading}
            placeholder={course ? "Select Semester" : "Select Course First"}
            required
          >
            {(semestersByCourse[course] || []).map((sem) => (
              <option key={sem} value={sem}>
                Sem {sem}
              </option>
            ))}
          </FormSelect>

          <FormSelect
            label="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            disabled={!semester || uploading}
            placeholder={semester ? "Select Subject" : "Select Semester First"}
            required
          >
            {(subjectsByCourseSemester[course]?.[semester] || []).map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </FormSelect>
        </div>

        {/* Title */}
        <FormInput
          label="Resource Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Operating Systems Unit 1 Notes"
          disabled={uploading}
          required
        />

        {/* Description */}
        <div className="space-y-1.5">
          <label className="block label-mono text-slate-400">
            Description <span className="text-slate-600">(optional)</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={uploading}
            placeholder="Brief description of topics covered…"
            rows={3}
            className="w-full bg-[#111525] text-white placeholder:text-slate-500
                       border border-white/[0.08] rounded-xl px-4 py-3 text-xs
                       transition-all duration-150 resize-none outline-none
                       focus:border-indigo-500/40 focus:ring-2 focus:ring-indigo-500/15
                       disabled:opacity-40"
          />
        </div>

        {/* Resource Type */}
        <FormSelect
          label="Resource Format / Type"
          value={resourceType}
          onChange={(e) => setResourceType(e.target.value)}
          disabled={uploading}
          placeholder="Select Resource Format"
          required
        >
          <option value="Notes">Notes (Classroom &amp; Handwritten)</option>
          <option value="PYQ">Previous Year Question Paper (PYQ)</option>
          <option value="Lab Manual">Lab Manual &amp; Code Reference</option>
          <option value="Study Material">Study Guide &amp; Syllabus Roadmap</option>
        </FormSelect>

        {/* File upload */}
        <div className="space-y-1.5">
          <label className="block label-mono text-slate-400">
            Upload Document File <span className="text-indigo-400">*</span>
          </label>

          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`relative flex flex-col items-center justify-center w-full h-40
                        border-2 border-dashed rounded-2xl transition-all duration-200 cursor-pointer
                        ${dragActive
                          ? "border-indigo-500/60 bg-indigo-500/5"
                          : fileError
                          ? "border-rose-500/40 bg-rose-500/5"
                          : "border-white/[0.08] bg-[#111525]/50 hover:bg-[#111525] hover:border-indigo-500/30"
                        }`}
          >
            <input
              type="file"
              accept=".pdf,.doc,.docx,.ppt,.pptx"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  validateAndSetFile(e.target.files[0]);
                }
              }}
              disabled={uploading}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
              required
            />
            <div className="flex flex-col items-center text-center px-4 pointer-events-none">
              {file ? (
                <>
                  <div className="h-10 w-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20
                                  flex items-center justify-center text-indigo-400 mb-2">
                    <FileCheck className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-semibold text-white mb-0.5 truncate max-w-xs">
                    {file.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB • Click to replace
                  </p>
                </>
              ) : (
                <>
                  <div className="h-10 w-10 rounded-2xl bg-[#111525] border border-white/[0.08]
                                  flex items-center justify-center text-indigo-400 mb-2">
                    <UploadCloud className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-semibold text-white mb-0.5">
                    Click to browse or drag file here
                  </p>
                  <p className="text-xs text-slate-500">
                    PDF, DOC, DOCX, PPT, PPTX (Up to 50MB)
                  </p>
                </>
              )}
            </div>
          </div>

          {fileError && (
            <p className="text-xs text-rose-400 flex items-center gap-1">
              <AlertCircle className="h-3 w-3 shrink-0" />
              {fileError}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={!isFormValid || uploading || !isAuthenticated}
          className="w-full h-12 flex items-center justify-center gap-2
                     bg-gradient-to-r from-indigo-600 to-purple-600
                     hover:from-indigo-500 hover:to-purple-500
                     disabled:opacity-40 text-white rounded-full text-xs font-bold
                     transition-all duration-200 shadow-md shadow-indigo-500/20
                     border border-indigo-400/20 cursor-pointer disabled:cursor-not-allowed
                     hover:scale-[1.01] active:scale-[0.99]"
        >
          {uploading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Uploading & Processing…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Submit &amp; Share Resource
            </>
          )}
        </button>
      </form>
    </div>
  );
}