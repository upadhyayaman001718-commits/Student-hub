"use client";

import { useState } from "react";
import { coursesByProgram } from "@/features/upload/data/courses";
import { semestersByCourse } from "@/features/upload/data/semester";
import { subjectsByCourseSemester } from "@/features/upload/data/subjects";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import { UploadCloud, FileCheck, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { uploadResource } from "@/lib/api";

export default function UploadForm() {
  const [program, setProgram] = useState("");
  const [course, setCourse] = useState("");
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [resourceType, setResourceType] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const isFormValid = program && course && semester && subject && title && resourceType && file;

  return (
    <form
      className="space-y-6"
      onSubmit={async (e) => {
        e.preventDefault();
        if (!file) return;

        try {
          setUploading(true);

          const formData = new FormData();

          formData.append("title", title);
          formData.append("subject", subject);
          formData.append("semester", semester.replace("Semester ", ""));
          formData.append("program", program);
          formData.append("course", course);
          formData.append("resourceType", resourceType);

          formData.append("file", file);

          const result = await uploadResource(formData);

          console.log("🔥 UPLOAD RESPONSE:", result);

          alert("Resource uploaded successfully!");
        } catch (error: unknown) {
          console.error("🔥 UPLOAD ERROR:", error);
          const message = error instanceof Error ? error.message : "Failed to upload resource.";
          alert(message);
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
          label="Course"
          value={course}
          onChange={(e) => {
            setCourse(e.target.value);
            setSemester("");
            setSubject("");
          }}
          disabled={!program}
          placeholder="Select Course"
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
          disabled={!course}
          placeholder="Select Semester"
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
          onChange={(e) => {
            setSubject(e.target.value);
          }}
          disabled={!semester}
          placeholder="Select Subject"
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
        required
      />

      {/* Description Textarea */}
      <div className="w-full space-y-2">
        <label className="block text-xs font-extrabold uppercase tracking-wider text-[#0A0A0A]">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write a short description about what this resource covers..."
          rows={4}
          className="w-full bg-white text-[#0A0A0A] placeholder:text-[#666666]/60 border border-[#E2E0DB] rounded-[24px] px-5 py-4 text-sm transition-all duration-300 focus:outline-none focus:border-[#B15F2C] focus:ring-4 focus:ring-[#B15F2C]/15 shadow-2xs resize-none"
        />
      </div>

      {/* Resource Type */}
      <FormSelect
        label="Resource Type"
        value={resourceType}
        onChange={(e) => setResourceType(e.target.value)}
        placeholder="Select Resource Type"
        required
      >
        <option value="Notes">Notes</option>
        <option value="PYQ">Previous Year Questions</option>
        <option value="Lab Manual">Lab Manual</option>
      </FormSelect>

      {/* Drag and Drop Area */}
      <div className="w-full space-y-2">
        <label className="block text-xs font-extrabold uppercase tracking-wider text-[#0A0A0A]">
          Upload File <span className="text-[#B15F2C] ml-0.5">*</span>
        </label>
        <label className="relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-[#E2E0DB] rounded-[28px] bg-[#F1F0EE]/60 hover:bg-[#F1F0EE] hover:border-[#B15F2C] transition-all duration-300 cursor-pointer group">
          <input
            type="file"
            accept=".pdf,.doc,.docx,.ppt,.pptx"
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                setFile(e.target.files[0]);
              }
            }}
            className="sr-only"
            required
          />
          <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
            {file ? (
              <>
                <div className="h-12 w-12 rounded-full bg-[#B15F2C]/10 border border-[#B15F2C]/20 flex items-center justify-center text-[#B15F2C] mb-3 shadow-2xs">
                  <FileCheck className="h-6 w-6" />
                </div>
                <p className="text-sm font-extrabold text-[#0A0A0A] mb-1 truncate max-w-xs">{file.name}</p>
                <p className="text-xs text-[#666666]">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB • Click to replace
                </p>
              </>
            ) : (
              <>
                <div className="h-12 w-12 rounded-full bg-[#0A0A0A] flex items-center justify-center text-white mb-3 group-hover:scale-105 transition-transform duration-300 shadow-2xs">
                  <UploadCloud className="h-6 w-6 text-[#B15F2C]" />
                </div>
                <p className="text-sm font-extrabold text-[#0A0A0A] mb-1">Click or drag file to select</p>
                <p className="text-xs text-[#666666]">PDF, DOC, DOCX, PPT, PPTX up to 50MB</p>
              </>
            )}
          </div>
        </label>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={!isFormValid || uploading}
        variant="accent"
        className="w-full h-14 flex items-center justify-center gap-2.5 mt-8 bg-[#B15F2C] hover:bg-[#9E5324] disabled:opacity-40 text-white rounded-full px-8 text-xs font-extrabold uppercase tracking-wider transition-all duration-300 shadow-md cursor-pointer"
      >
        <Send className="h-4.5 w-4.5" />
        {uploading ? "Uploading..." : "Submit & Share Resource"}
      </Button>
    </form>
  );
}