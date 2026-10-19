'use client';

import { useId, useRef, useState, type ChangeEvent, type DragEvent, type KeyboardEvent } from "react";
import { Upload, X } from "lucide-react";
import { cn } from "../../utils/cn";
import { Button } from "../../primitives/button";
import { useControllableState } from "../../hooks/useControllableState";

export type FileUploadStatus = "queued" | "uploading" | "done" | "error";

export interface FileUploadItemStatus {
  status: FileUploadStatus;
  percent?: number;
  error?: string;
}

export interface FileUploadRejectReason {
  file: File;
  reason: "accept" | "maxSize" | "maxFiles";
}

export interface FileUploadProps {
  value?: File[];
  defaultValue?: File[];
  onChange?: (files: File[]) => void;
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  maxSize?: number;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  id?: string;
  label?: string;
  emptyText?: string;
  error?: string;
  "aria-label"?: string;
  /**
   * Per-file upload status keyed by a stable file id (`name:size:lastModified` by default).
   */
  fileStatuses?: Record<string, FileUploadItemStatus>;
  /** Called when a consumer wants to report progress for a file id. */
  onFileProgress?: (fileId: string, percent: number) => void;
  /** Override how file ids are derived for status maps. */
  getFileId?: (file: File, index: number) => string;
  /** Called when files are rejected by accept / maxSize / maxFiles rules. */
  onReject?: (rejections: FileUploadRejectReason[]) => void;
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/** Stable id — do not include list index (removal would renumber later keys). */
// eslint-disable-next-line react-refresh/only-export-components -- shared id helper for FileUpload consumers
export function defaultFileId(file: File, index?: number): string {
  void index
  return `${file.name}:${file.size}:${file.lastModified}`;
}

function fileMatchesAccept(file: File, accept?: string): boolean {
  if (!accept || accept.trim() === "" || accept.trim() === "*") return true;

  const tokens = accept
    .split(",")
    .map((token) => token.trim().toLowerCase())
    .filter(Boolean);
  if (tokens.length === 0) return true;

  const fileName = file.name.toLowerCase();
  const mime = (file.type || "").toLowerCase();

  return tokens.some((token) => {
    if (token.startsWith(".")) {
      return fileName.endsWith(token);
    }
    if (token.endsWith("/*")) {
      const prefix = token.slice(0, -1);
      return mime.startsWith(prefix);
    }
    return mime === token;
  });
}

const statusLabel: Record<FileUploadStatus, string> = {
  queued: "Queued",
  uploading: "Uploading",
  done: "Done",
  error: "Error",
};

export function FileUpload({
  value,
  defaultValue = [],
  onChange,
  accept,
  multiple = true,
  maxFiles,
  maxSize,
  disabled = false,
  loading = false,
  className,
  id: providedId,
  label = "Drop files here or click to browse",
  emptyText = "No files selected",
  error,
  fileStatuses,
  onFileProgress: _onFileProgress,
  getFileId = defaultFileId,
  onReject,
  ...aria
}: FileUploadProps) {
  const generatedId = useId();
  const inputId = providedId ?? generatedId;
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useControllableState(value, defaultValue, onChange);
  const [rejectionMessage, setRejectionMessage] = useState<string | null>(null);
  const isDisabled = disabled || loading;

  // Keep the callback in the public API for consumers driving uploads externally.
  void _onFileProgress;

  const addFiles = (incoming: File[]) => {
    const rejections: FileUploadRejectReason[] = [];
    const accepted: File[] = [];

    for (const file of incoming) {
      if (!fileMatchesAccept(file, accept)) {
        rejections.push({ file, reason: "accept" });
        continue;
      }
      if (maxSize !== undefined && file.size > maxSize) {
        rejections.push({ file, reason: "maxSize" });
        continue;
      }
      accepted.push(file);
    }

    setFiles((current) => {
      const room =
        maxFiles !== undefined ? Math.max(0, maxFiles - current.length) : accepted.length;
      const kept = multiple ? accepted.slice(0, room) : accepted.slice(0, 1);
      const overflow = multiple ? accepted.slice(room) : accepted.slice(1);
      for (const file of overflow) {
        rejections.push({ file, reason: "maxFiles" });
      }
      const merged = multiple ? [...current, ...kept] : kept;
      return merged;
    });

    if (rejections.length > 0) {
      onReject?.(rejections);
      const parts: string[] = [];
      if (rejections.some((item) => item.reason === "accept")) {
        parts.push("Some files do not match the accepted types");
      }
      if (rejections.some((item) => item.reason === "maxSize")) {
        parts.push(
          maxSize !== undefined
            ? `Some files exceed the ${formatSize(maxSize)} limit`
            : "Some files are too large"
        );
      }
      if (rejections.some((item) => item.reason === "maxFiles")) {
        parts.push(
          maxFiles !== undefined
            ? `Only ${maxFiles} file${maxFiles === 1 ? "" : "s"} allowed`
            : "Too many files"
        );
      }
      setRejectionMessage(parts.join(". "));
    } else {
      setRejectionMessage(null);
    }
  };

  const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    addFiles(Array.from(event.target.files ?? []));
    event.target.value = "";
  };

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (isDisabled) return;
    addFiles(Array.from(event.dataTransfer.files));
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      inputRef.current?.click();
    }
  };

  const alertMessage = error ?? rejectionMessage;

  return (
    <div className={cn("space-y-3", className)}>
      <div
        role="button"
        tabIndex={isDisabled ? -1 : 0}
        aria-label={aria["aria-label"] ?? label}
        aria-disabled={isDisabled}
        aria-busy={loading || undefined}
        aria-invalid={!!alertMessage}
        onClick={() => !isDisabled && inputRef.current?.click()}
        onKeyDown={onKeyDown}
        onDragOver={(event) => event.preventDefault()}
        onDrop={onDrop}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center rounded-md border border-dashed px-6 py-8 text-center text-sm",
          isDisabled && "cursor-not-allowed opacity-50",
          alertMessage && "border-destructive text-destructive"
        )}
      >
        <Upload className="mb-2 h-5 w-5" />
        <p>{loading ? "Uploading…" : label}</p>
        {maxSize ? <p className="mt-1 text-xs text-muted-foreground">Max {formatSize(maxSize)} per file</p> : null}
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          className="sr-only"
          accept={accept}
          multiple={multiple}
          disabled={isDisabled}
          onChange={onInputChange}
        />
      </div>

      {alertMessage ? <p className="text-sm text-destructive" role="alert">{alertMessage}</p> : null}

      {files.length === 0 ? (
        <p className="text-sm text-muted-foreground">{emptyText}</p>
      ) : (
        <ul className="space-y-2">
          {files.map((file, index) => {
            const fileId = getFileId(file, index);
            const status = fileStatuses?.[fileId];
            return (
              <li key={fileId} className="rounded-md border px-3 py-2 text-sm">
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate">
                    {file.name}{" "}
                    <span className="text-muted-foreground">({formatSize(file.size)})</span>
                  </span>
                  <div className="flex shrink-0 items-center gap-2">
                    {status ? (
                      <span
                        className={cn(
                          "text-xs text-muted-foreground",
                          status.status === "error" && "text-destructive",
                          status.status === "done" && "text-emerald-600"
                        )}
                      >
                        {statusLabel[status.status]}
                        {status.status === "uploading" && typeof status.percent === "number"
                          ? ` ${Math.round(status.percent)}%`
                          : null}
                      </span>
                    ) : null}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      disabled={isDisabled}
                      aria-label={`Remove ${file.name}`}
                      onClick={() => setFiles((current) => current.filter((_, itemIndex) => itemIndex !== index))}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                {status?.status === "uploading" && typeof status.percent === "number" ? (
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{ width: `${Math.max(0, Math.min(100, status.percent))}%` }}
                    />
                  </div>
                ) : null}
                {status?.status === "error" && status.error ? (
                  <p className="mt-1 text-xs text-destructive">{status.error}</p>
                ) : null}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

FileUpload.displayName = "FileUpload";
export { FileUpload as Dropzone };
