"use client";

import { useState } from "react";
import { coursesByProgram } from "@/features/upload/data/courses";
import { semestersByCourse } from "@/features/upload/data/semester";
import { subjectsByCourseSemester } from "@/features/upload/data/subjects";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import { UploadCloud, FileCheck, Send } from "lucide-react";

export default function UploadForm() {
  const [program, setProgram] = useState("");
  const [course, setCourse] = useState("");
  const [semester, setSemester] = useState("");
  const [subject, setSubject] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [resourceType, setResourceType] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const isFormValid = program && course && semester && subject && title && resourceType && file;

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        console.log({
          program,
          course,
          semester,
          subject,
          title,
          description,
          resourceType,
          file,
        });
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
        placeholder="Enter resource title"
        required
      />

      {/* Description Textarea */}
      <div className="w-full space-y-2">
        <label className="block text-sm font-semibold text-zinc-300 transition-colors duration-200">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Write a short description about the resource..."
          rows={4}
          className="w-full bg-[#18181B]/80 text-white placeholder-zinc-500 border border-white/8 rounded-[16px] px-5 py-4 text-base transition-all duration-300 focus:outline-none focus:border-[#0EA5E9] focus:ring-4 focus:ring-[#0EA5E9]/10 shadow-[inset_0_2px_4px_rgba(0,0,0,0.3)] resize-none"
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

      {/* Modern Drag and Drop Area */}
      <div className="w-full space-y-2">
        <label className="block text-sm font-semibold text-zinc-300">
          Upload File <span className="text-red-500 ml-0.5">*</span>
        </label>
        <label className="relative flex flex-col items-center justify-center w-full h-44 border border-dashed border-white/8 rounded-[16px] bg-[#18181B]/40 hover:bg-[#18181B] hover:border-[#0EA5E9]/30 transition-all duration-300 cursor-pointer group">
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
                <div className="h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3 shadow-md">
                  <FileCheck className="h-6 w-6" />
                </div>
                <p className="text-sm font-bold text-white mb-1 truncate max-w-xs">{file.name}</p>
                <p className="text-xs text-zinc-400">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB • Click to replace
                </p>
              </>
            ) : (
              <>
                <div className="h-12 w-12 rounded-xl bg-[#0EA5E9]/10 border border-[#0EA5E9]/20 flex items-center justify-center text-[#0EA5E9] mb-3 group-hover:scale-110 transition-transform duration-300 shadow-md">
                  <UploadCloud className="h-6 w-6" />
                </div>
                <p className="text-sm font-bold text-white mb-1">Click to select file</p>
                <p className="text-xs text-zinc-500">PDF, DOC, DOCX, PPT, PPTX up to 50MB</p>
              </>
            )}
          </div>
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!isFormValid}
        className="w-full h-12 flex items-center justify-center gap-2 mt-8 bg-[#0EA5E9] hover:bg-[#0EA5E9]/90 disabled:opacity-40 disabled:hover:bg-[#0EA5E9] disabled:cursor-not-allowed text-white rounded-[12px] px-6 text-base font-bold transition-all duration-250 shadow-lg shadow-[#0EA5E9]/15 hover:shadow-xl hover:shadow-[#0EA5E9]/25 hover:scale-[1.02] disabled:hover:scale-100 disabled:hover:shadow-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/20"
      >
        <Send className="h-4.5 w-4.5" />
        Upload Resource
      </button>
    </form>
  );
}