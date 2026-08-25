"use client";

import { useState } from "react";

interface ImageUploadFieldProps {
  value: string;
  onChange: (url: string) => void;
  label: string;
  folder?: string;
}

function ImageUploadField({ value, onChange, label, folder }: ImageUploadFieldProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append("file", file);
    if (folder) formData.append("folder", folder);

    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Upload failed");
        return;
      }

      onChange(data.url);
    } catch {
      setError("Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 text-sm">
      <span>{label}</span>
      {value && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={value}
          alt=""
          className="h-24 w-auto rounded-lg bg-surface-bg object-contain"
        />
      )}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        disabled={isUploading}
        className="text-xs"
      />
      {isUploading && <span className="text-xs text-body-txt/60">Uploading...</span>}
      {error && <span className="text-xs text-destructive">{error}</span>}
    </div>
  );
}

export default ImageUploadField;
