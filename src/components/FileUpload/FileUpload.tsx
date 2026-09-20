'use client';

import { useId, useRef, type ChangeEvent, type DragEvent, type KeyboardEvent } from "react";
import { Upload, X } from "lucide-react";
import { cn } from "../../utils/cn";
import { Button } from "../../primitives/button";
import { useControllableState } from "../../hooks/useControllableState";

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
}

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

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
  ...aria
}: FileUploadProps) {
  const generatedId = useId();
  const inputId = providedId ?? generatedId;
  const inputRef = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useControllableState(value, defaultValue, onChange);
  const isDisabled = disabled || loading;

  const addFiles = (incoming: File[]) => {
    setFiles((current) => {
      const merged = multiple ? [...current, ...incoming] : incoming.slice(0, 1);
      const limited = maxFiles ? merged.slice(0, maxFiles) : merged;
      return maxSize ? limited.filter((file) => file.size <= maxSize) : limited;
    });
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

  return (
    <div className={cn("space-y-3", className)}>
      <div
        role="button"
        tabIndex={isDisabled ? -1 : 0}
        aria-label={aria["aria-label"] ?? label}
        aria-disabled={isDisabled}
        aria-busy={loading || undefined}
        aria-invalid={!!error}
        onClick={() => !isDisabled && inputRef.current?.click()}
        onKeyDown={onKeyDown}
        onDragOver={(event) => event.preventDefault()}
        onDrop={onDrop}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center rounded-md border border-dashed px-6 py-8 text-center text-sm",
          isDisabled && "cursor-not-allowed opacity-50",
          error && "border-destructive text-destructive"
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

      {error ? <p className="text-sm text-destructive" role="alert">{error}</p> : null}

      {files.length === 0 ? (
        <p className="text-sm text-muted-foreground">{emptyText}</p>
      ) : (
        <ul className="space-y-2">
          {files.map((file, index) => (
            <li key={`${file.name}-${file.size}-${index}`} className="flex items-center justify-between rounded-md border px-3 py-2 text-sm">
              <span className="truncate">
                {file.name} <span className="text-muted-foreground">({formatSize(file.size)})</span>
              </span>
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

FileUpload.displayName = "FileUpload";
export { FileUpload as Dropzone };
