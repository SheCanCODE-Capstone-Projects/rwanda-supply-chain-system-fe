"use client";

import { useRef, useState } from "react";
import { AlertCircle, CheckCircle2, FileText, RefreshCw, Trash2, UploadCloud } from "lucide-react";
import { Badge, Button, Card } from "@/components/ui";

const defaultAcceptedTypes = ["application/pdf", "image/jpeg", "image/png"];
const defaultAcceptedExtensions = [".pdf", ".jpg", ".jpeg", ".png"];

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getFileExtension(fileName) {
  const lower = fileName.toLowerCase();
  const lastDot = lower.lastIndexOf(".");
  return lastDot >= 0 ? lower.slice(lastDot) : "";
}

export default function KycUploadZone({
  title = "Upload your verification documents",
  description = "Share business registration paperwork, tax certificates, and supporting evidence.",
  acceptedTypes = defaultAcceptedTypes,
  acceptedExtensions = defaultAcceptedExtensions,
  maxFiles = 5,
  maxSizeMB = 5,
  initialFiles = [],
  onFilesChange,
  onSubmit,
}) {
  const [files, setFiles] = useState(
    initialFiles.map((file, index) => ({
      id: file.id || `${file.name}-${index}`,
      name: file.name,
      size: file.size || 0,
      type: file.type || "application/octet-stream",
      status: file.status || "ready",
    }))
  );
  const [dragActive, setDragActive] = useState(false);
  const [message, setMessage] = useState({
    type: "info",
    text: "Accepted formats: PDF, JPG, and PNG. Maximum 5 MB per file.",
  });
  const [pendingReplaceId, setPendingReplaceId] = useState(null);
  const inputRef = useRef(null);

  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  const addFiles = (incomingFiles) => {
    const nextFiles = [];
    const errors = [];
    const currentFiles = files;

    incomingFiles.forEach((file) => {
      const extension = getFileExtension(file.name);
      const isSupportedType = acceptedTypes.includes(file.type);
      const isSupportedExtension = acceptedExtensions.includes(extension);

      if (!isSupportedType && !isSupportedExtension) {
        errors.push(`${file.name} uses an unsupported file type.`);
        return;
      }

      if (file.size > maxSizeBytes) {
        errors.push(`${file.name} exceeds the ${maxSizeMB} MB limit.`);
        return;
      }

      const duplicate = currentFiles.some(
        (existing) =>
          existing.name.toLowerCase() === file.name.toLowerCase() && existing.size === file.size
      );

      if (duplicate) {
        errors.push(`${file.name} is already uploaded.`);
        return;
      }

      if (currentFiles.length + nextFiles.length >= maxFiles) {
        errors.push(`You can upload up to ${maxFiles} files.`);
        return;
      }

      nextFiles.push({
        id: `${file.name}-${file.size}-${Date.now()}`,
        name: file.name,
        size: file.size,
        type: file.type || "application/octet-stream",
        status: "ready",
      });
    });

    if (nextFiles.length > 0) {
      const mergedFiles = [...currentFiles, ...nextFiles];
      setFiles(mergedFiles);
      onFilesChange?.(mergedFiles);
      setMessage({
        type: "success",
        text: `${nextFiles.length} file${nextFiles.length > 1 ? "s" : ""} added to your upload list.`,
      });
    }

    if (errors.length > 0) {
      setMessage({ type: "error", text: errors[0] });
    }
  };

  const replaceFile = (incomingFile, targetId) => {
    const extension = getFileExtension(incomingFile.name);
    const isSupportedType = acceptedTypes.includes(incomingFile.type);
    const isSupportedExtension = acceptedExtensions.includes(extension);

    if (!isSupportedType && !isSupportedExtension) {
      setMessage({ type: "error", text: "Unsupported file type. Please use PDF, JPG, or PNG." });
      return;
    }

    if (incomingFile.size > maxSizeBytes) {
      setMessage({ type: "error", text: `This file exceeds the ${maxSizeMB} MB limit.` });
      return;
    }

    const replacedFiles = files.map((file) =>
      file.id === targetId
        ? {
            ...file,
            name: incomingFile.name,
            size: incomingFile.size,
            type: incomingFile.type || "application/octet-stream",
            status: "ready",
          }
        : file
    );

    setFiles(replacedFiles);
    onFilesChange?.(replacedFiles);
    setMessage({ type: "success", text: "The document was replaced successfully." });
  };

  const handleInputChange = (event) => {
    const selected = Array.from(event.target.files || []);
    if (!selected.length) return;

    if (pendingReplaceId) {
      replaceFile(selected[0], pendingReplaceId);
      setPendingReplaceId(null);
    } else {
      addFiles(selected);
    }

    event.target.value = "";
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragActive(false);
    const droppedFiles = Array.from(event.dataTransfer?.files || []);
    if (droppedFiles.length) {
      addFiles(droppedFiles);
    }
  };

  const handleSubmit = () => {
    if (files.length === 0) {
      setMessage({ type: "error", text: "Please add at least one document before submitting." });
      return;
    }

    onSubmit?.(files);
    setMessage({ type: "success", text: "Documents are ready for review." });
  };

  const openPicker = (replaceId = null) => {
    setPendingReplaceId(replaceId);
    inputRef.current?.click();
  };

  const removeFile = (targetId) => {
    const updatedFiles = files.filter((file) => file.id !== targetId);
    setFiles(updatedFiles);
    onFilesChange?.(updatedFiles);
    setMessage({ type: "info", text: "The document was removed from the list." });
  };

  return (
    <Card className="space-y-6">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-[#0B6B2E]" />
          <h3 className="text-xl font-semibold text-[#061226]">{title}</h3>
        </div>
        <p className="text-sm text-gray-600">{description}</p>
      </div>

      <div
        onDragOver={(event) => {
          event.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        className={`rounded-2xl border-2 border-dashed px-6 py-10 text-center transition ${
          dragActive ? "border-[#0B6B2E] bg-[#f2fbf5]" : "border-gray-300 bg-gray-50"
        }`}
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#eaf7ee] text-[#0B6B2E]">
          <UploadCloud className="h-7 w-7" />
        </div>
        <h4 className="mt-4 text-lg font-semibold text-[#061226]">Upload your verification documents</h4>
        <p className="mt-2 text-sm text-gray-600">Drag and drop files here or browse from your device.</p>
        <p className="mt-3 text-sm font-medium text-[#0B6B2E]">Supported formats: PDF, JPG, PNG</p>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <Button type="button" variant="primary" onClick={() => openPicker(null)}>
            Browse files
          </Button>
          <Button type="button" variant="secondary" onClick={handleSubmit}>
            Submit documents
          </Button>
        </div>

        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          onChange={handleInputChange}
        />
      </div>

      {files.length > 0 ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-700">Uploaded documents</h4>
            <Badge>{files.length} file{files.length > 1 ? "s" : ""}</Badge>
          </div>

          <ul className="space-y-2">
            {files.map((file) => (
              <li
                key={file.id}
                className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-[#eaf7ee] p-2 text-[#0B6B2E]">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-[#061226]">{file.name}</p>
                    <p className="text-sm text-gray-500">{formatBytes(file.size)} • {file.status}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button type="button" variant="secondary" size="sm" onClick={() => openPicker(file.id)}>
                    <RefreshCw className="mr-2 h-4 w-4" /> Replace
                  </Button>
                  <Button type="button" variant="danger" size="sm" onClick={() => removeFile(file.id)}>
                    <Trash2 className="mr-2 h-4 w-4" /> Remove
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div
        className={`rounded-xl border px-4 py-3 text-sm ${
          message.type === "error"
            ? "border-red-200 bg-red-50 text-red-700"
            : message.type === "success"
              ? "border-green-200 bg-green-50 text-green-700"
              : "border-blue-200 bg-blue-50 text-blue-700"
        }`}
      >
        {message.type === "error" ? <AlertCircle className="mr-2 inline h-4 w-4" /> : <CheckCircle2 className="mr-2 inline h-4 w-4" />}
        {message.text}
      </div>
    </Card>
  );
}
