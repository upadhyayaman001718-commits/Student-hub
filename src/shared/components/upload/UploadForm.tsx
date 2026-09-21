"use client";

import React, { useState, DragEvent } from "react";
import Link from "next/link";
import { coursesByProgram } from "@/features/upload/data/courses";
import { semestersByCourse } from "@/features/upload/data/semester";
import { subjectsByCourseSemester } from "@/features/upload/data/subjects";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import {
  UploadCloud,
  FileCheck,
  Send,
  Loader2,
  AlertCircle,
  CheckCircle2,
  X,
  ExternalLink,
  RotateCcw,
  LogIn,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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

  // Form State
  const [program, setProgram] = useState("");
  const [course, setCourse] = useState("");
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [resourceType, setResourceType] = useState("");
  const [file, setFile] = useState<File | null>(null);

  // UI / Action State
  const [dragActive, setDragActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [uploadedResource, setUploadedResource] = useState<Resource | null>(null);

  // Validate File Helper
  const validateAndSetFile = (selectedFile: File) => {
    setFileError(null);
    setSubmitError(null);

    const ext = "." + selectedFile.name.split(".").pop()?.toLowerCase();
    const isValidExt = ALLOWED_EXTENSIONS.includes(ext);
    const isValidMime = ALLOWED_MIME_TYPES.includes(selectedFile.type);

    if (!isValidExt && !isValidMime) {
      setFileError(`Invalid file format. Please upload a PDF, DOC, DOCX, PPT, or PPTX file.`);
      setFile(null);
      return false;
    }

    if (selectedFile.size > MAX_FILE_SIZE_BYTES) {
      const sizeMB = (selectedFile.size / (1024 * 1024)).toFixed(1);
      setFileError(`File size (${sizeMB}MB) exceeds maximum limit of 50MB.`);
      setFile(null);
      return false;
    }

    setFile(selectedFile);
    return true;
  };

  // Drag and Drop Handlers
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

  // Reset Form for Uploading Another Resource
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

  // Form Validation Check
  const isFormValid = Boolean(
    program &&
    course &&
    semester &&
    subject &&
    title.trim() &&
    resourceType &&
    file &&
    !fileError
  );

  // Success Screen
  if (uploadedResource) {
    return (
      <div className="flex flex-col items-center justify-center p-8 sm:p-12 text-center space-y-6 animate-in fade-in duration-300">
        <div className="h-16 w-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-inner">
          <CheckCircle2 className="h-8 w-8 text-emerald-400" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono uppercase font-bold tracking-widest text-indigo-400">
            Upload Successful
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Resource Shared with Community!
          </h2>
          <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
            &quot;<span className="font-bold text-white">{uploadedResource.title}</span>&quot; has been processed and is now live in the repository.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md pt-4">
          <Link href={`/resources/${uploadedResource.id}`} className="w-full">
            <Button className="w-full h-12 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 hover:from-indigo-500 hover:to-purple-500 text-white rounded-full font-extrabold text-xs uppercase tracking-wider gap-2 shadow-lg shadow-indigo-500/25 border border-indigo-400/30">
              <ExternalLink className="h-4 w-4" />
              View Uploaded Resource
            </Button>
          </Link>
          <Button
            variant="outline"
            onClick={handleResetForm}
            className="w-full h-12 border-white/10 bg-[#161A29] hover:bg-[#1E2235] text-slate-200 rounded-full font-extrabold text-xs uppercase tracking-wider gap-2 cursor-pointer transition-colors"
          >
            <RotateCcw className="h-4 w-4 text-indigo-400" />
            Upload Another Resource
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Authentication Alert if user is not logged in */}
      {!isAuthenticated && (
        <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs font-semibold backdrop-blur-md">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="h-4 w-4 text-amber-400 shrink-0" />
            <span>You must be logged in to share study resources.</span>
          </div>
          <Link href="/login">
            <Button size="sm" variant="outline" className="h-8 rounded-full border-amber-500/30 bg-amber-500/10 hover:bg-amber-500/20 text-amber-200 font-bold gap-1 text-[11px] cursor-pointer">
              <LogIn className="h-3.5 w-3.5 text-amber-300" />
              Log In
            </Button>
          </Link>
        </div>
      )}

      {/* Submit Error Banner */}
      {submitError && (
        <div className="flex items-center justify-between gap-3 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-200 text-xs font-semibold backdrop-blur-md">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-rose-400 shrink-0" />
            <span>{submitError}</span>
          </div>
          <button
            onClick={() => setSubmitError(null)}
            className="text-rose-400 hover:text-white p-1 cursor-pointer transition-colors"
            aria-label="Dismiss error"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      <form
        className="space-y-6"
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

            if (description.trim()) {
              formData.append("description", description.trim());
            }

            formData.append("file", file);

            const result = await uploadResource(formData);

            if (result.success && result.data) {
              setUploadedResource(result.data);
            } else {
              throw new Error(result.message || "Failed to upload resource.");
            }
          } catch (error: any) {
            console.error("Upload Error:", error);
            const message = error?.message || "Failed to upload resource. Please check network connection and try again.";
            setSubmitError(message);
          } finally {
            setUploading(false);
          }
        }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Program Selection */}
          <FormSelect
            label="Program"
            value={program}
            onChange={(e) => {
              setProgram(e.target.value);
              setCourse("");
              setSemester("");
              setSubject("");
            }}
            placeholder="Select Program"
            disabled={uploading}
            required
          >
            {Object.keys(coursesByProgram).map((programName) => (
              <option key={programName} value={programName}>
                {programName}
              </option>
            ))}
          </FormSelect>

          {/* Course Selection */}
          <FormSelect
            label="Course / Branch"
            value={course}
            onChange={(e) => {
              setCourse(e.target.value);
              setSemester("");
              setSubject("");
            }}
            disabled={!program || uploading}
            placeholder={program ? "Select Course" : "Select Program First"}
            required
          >
            {(coursesByProgram[program] || []).map((courseName) => (
              <option key={courseName} value={courseName}>
                {courseName}
              </option>
            ))}
          </FormSelect>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Semester Selection */}
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

          {/* Subject Selection */}
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

        {/* Resource Title */}
        <FormInput
          label="Resource Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Operating Systems Unit 1 Notes"
          disabled={uploading}
          required
        />

        {/* Description Textarea */}
        <div className="w-full space-y-2">
          <label className="block text-xs font-mono font-extrabold uppercase tracking-[0.12em] text-slate-300">
            Description <span className="text-slate-500 text-[10px] font-normal lowercase">(optional)</span>
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={uploading}
            placeholder="Write a short description about topics covered in this file..."
            rows={3}
            className="w-full bg-[#161A29] text-slate-100 placeholder:text-slate-500 border border-white/10 rounded-2xl px-5 py-3.5 text-sm transition-all duration-300 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 resize-none disabled:opacity-40"
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
          <option value="Notes" className="bg-[#0F121E] text-slate-100">Notes (Classroom & Handwritten)</option>
          <option value="PYQ" className="bg-[#0F121E] text-slate-100">Previous Year Question Paper (PYQ)</option>
          <option value="Lab Manual" className="bg-[#0F121E] text-slate-100">Lab Manual & Code Reference</option>
          <option value="Study Material" className="bg-[#0F121E] text-slate-100">Study Guide & Syllabus Roadmap</option>
        </FormSelect>

        {/* Drag and Drop File Upload Area */}
        <div className="w-full space-y-2">
          <label className="block text-xs font-mono font-extrabold uppercase tracking-[0.12em] text-slate-300">
            Upload Document File <span className="text-indigo-400 ml-0.5">*</span>
          </label>

          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            className={`relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-3xl transition-all duration-300 cursor-pointer overflow-hidden ${
              dragActive
                ? "border-indigo-500 bg-indigo-500/10 shadow-lg shadow-indigo-500/10"
                : fileError
                ? "border-rose-500/50 bg-rose-500/10"
                : "border-white/10 bg-[#161A29]/50 hover:bg-[#161A29] hover:border-indigo-500/40"
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
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10"
              required
            />
            <div className="flex flex-col items-center justify-center text-center px-4 pointer-events-none">
              {file ? (
                <>
                  <div className="h-12 w-12 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-2 shadow-inner">
                    <FileCheck className="h-6 w-6" />
                  </div>
                  <p className="text-sm font-extrabold text-white mb-1 truncate max-w-xs">{file.name}</p>
                  <p className="text-xs text-slate-400 font-mono">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB • Click or drag to replace
                  </p>
                </>
              ) : (
                <>
                  <div className="h-12 w-12 rounded-full bg-[#161A29] border border-white/10 flex items-center justify-center text-indigo-400 mb-2 shadow-md">
                    <UploadCloud className="h-6 w-6 text-indigo-400" />
                  </div>
                  <p className="text-sm font-extrabold text-white mb-1">
                    Click to browse or drag file here
                  </p>
                  <p className="text-xs text-slate-400">
                    Supports PDF, DOC, DOCX, PPT, PPTX (Up to 50MB)
                  </p>
                </>
              )}
            </div>
          </div>

          {fileError && (
            <p className="text-xs font-semibold text-rose-400 mt-1 flex items-center gap-1">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              {fileError}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={!isFormValid || uploading || !isAuthenticated}
          aria-label="Submit and Share Resource"
          className="w-full h-14 flex items-center justify-center gap-2.5 mt-8 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-500 hover:from-indigo-500 hover:via-purple-500 hover:to-indigo-400 disabled:opacity-40 text-white rounded-full px-8 text-xs font-extrabold uppercase tracking-wider transition-all duration-300 shadow-lg shadow-indigo-500/25 border border-indigo-400/30 cursor-pointer disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99]"
        >
          {uploading ? (
            <>
              <Loader2 className="h-4.5 w-4.5 animate-spin" />
              Uploading & Processing File...
            </>
          ) : (
            <>
              <Send className="h-4.5 w-4.5" />
              Submit & Share Resource
            </>
          )}
        </Button>
      </form>
    </div>
  );
}