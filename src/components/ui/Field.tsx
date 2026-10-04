"use client";

import { ChevronDown, CircleAlert, Eye, EyeOff, Upload } from "lucide-react";
import { useId, useRef, useState, type ComponentProps, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/* ------------------------------- Field ------------------------------- */

interface FieldProps {
  label?: ReactNode;
  required?: boolean;
  optional?: boolean;
  error?: string;
  hint?: ReactNode;
  className?: string;
  /** Receives the generated id so the control can be linked to the label. */
  children: (ids: { id: string; describedBy?: string; invalid: boolean }) => ReactNode;
}

/** Label + control + error message, wired for accessibility. */
export function Field({ label, required, optional, error, hint, className, children }: FieldProps) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <label htmlFor={id} className="text-xs text-black">
          {label}
          {required && <span className="text-red"> *</span>}
          {optional && <span className="text-gray"> (Optional)</span>}
        </label>
      )}
      {children({ id, describedBy: error ? errorId : undefined, invalid: Boolean(error) })}
      {error ? (
        <p id={errorId} role="alert" className="flex items-center gap-1 text-xs text-red">
          <CircleAlert className="size-3.5 shrink-0" aria-hidden />
          {error}
        </p>
      ) : (
        hint
      )}
    </div>
  );
}

const controlBase =
  "w-full rounded-lg border bg-white text-[13px] text-black placeholder:text-gray outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15 disabled:bg-[#e9e9eb] disabled:text-gray read-only:bg-white";

const borderState = (invalid?: boolean) => (invalid ? "border-red" : "border-gray");

/* ----------------------------- TextInput ----------------------------- */

interface TextInputProps extends Omit<ComponentProps<"input">, "size"> {
  icon?: ReactNode;
  invalid?: boolean;
  /** Field height: "lg" is the 60px auth input, "md" the 40px form input. */
  inputSize?: "md" | "lg";
}

export function TextInput({ icon, invalid, inputSize = "md", className, type = "text", ...props }: TextInputProps) {
  const [reveal, setReveal] = useState(false);
  const isPassword = type === "password";
  return (
    <div className="relative">
      {icon && (
        <span aria-hidden className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-black [&_svg]:size-[18px]">
          {icon}
        </span>
      )}
      <input
        type={isPassword && reveal ? "text" : type}
        aria-invalid={invalid || undefined}
        className={cn(
          controlBase,
          borderState(invalid),
          inputSize === "lg" ? "h-10 text-[13px]" : "h-9",
          icon ? "pl-10" : "pl-3",
          isPassword ? "pr-10" : "pr-3",
          className,
        )}
        {...props}
      />
      {isPassword && (
        <button
          type="button"
          onClick={() => setReveal((v) => !v)}
          aria-label={reveal ? "Hide password" : "Show password"}
          className="absolute top-1/2 right-3 -translate-y-1/2 text-gray hover:text-black"
        >
          {reveal ? <Eye className="size-[18px]" /> : <EyeOff className="size-[18px]" />}
        </button>
      )}
    </div>
  );
}

/* ----------------------------- Textarea ------------------------------ */

export function Textarea({ invalid, className, ...props }: ComponentProps<"textarea"> & { invalid?: boolean }) {
  return (
    <textarea
      aria-invalid={invalid || undefined}
      className={cn(controlBase, borderState(invalid), "min-h-[88px] resize-y px-3 py-2.5", className)}
      {...props}
    />
  );
}

/* ------------------------------ Select ------------------------------- */

interface SelectProps extends ComponentProps<"select"> {
  invalid?: boolean;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export function Select({ invalid, options, placeholder, className, ...props }: SelectProps) {
  return (
    <div className="relative">
      <select
        aria-invalid={invalid || undefined}
        className={cn(controlBase, borderState(invalid), "h-9 appearance-none pr-10 pl-3", className)}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <ChevronDown aria-hidden className="pointer-events-none absolute top-1/2 right-3 size-5 -translate-y-1/2 text-black" />
    </div>
  );
}

/* ---------------------------- FileUpload ----------------------------- */

interface FileUploadProps {
  id?: string;
  value?: string;
  onChange: (fileName: string | undefined) => void;
  label?: string;
}

/** "Upload File" button from Figma; keeps only the file name in mock mode. */
export function FileUpload({ id, value, onChange, label = "Upload File" }: FileUploadProps) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div>
      <input
        id={id}
        ref={ref}
        type="file"
        className="sr-only"
        onChange={(e) => onChange(e.target.files?.[0]?.name)}
      />
      <button
        type="button"
        onClick={() => ref.current?.click()}
        className="flex h-9 w-full items-center justify-center gap-2 rounded-lg border border-gray bg-white text-[13px] text-black hover:bg-page"
      >
        <Upload className="size-4 text-primary" aria-hidden />
        {value ?? label}
      </button>
    </div>
  );
}
