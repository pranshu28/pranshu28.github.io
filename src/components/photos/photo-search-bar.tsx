"use client";

import { Search } from "lucide-react";

type PhotoSearchBarProps = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder: string;
  statusText?: string;
  className?: string;
};

export function PhotoSearchBar({
  id,
  value,
  onChange,
  label,
  placeholder,
  statusText,
  className = "",
}: PhotoSearchBarProps) {
  return (
    <div
      role="search"
      className={`w-full min-w-0 ${className}`}
    >
      <label
        htmlFor={id}
        className="text-muted-foreground mb-1.5 block text-xs font-semibold tracking-wide uppercase"
      >
        {label}
      </label>
      <div className="relative">
        <Search
          className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 opacity-70"
          aria-hidden
          strokeWidth={2}
        />
        <input
          id={id}
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoComplete="off"
          spellCheck={false}
          className="border-border bg-background text-foreground placeholder:text-muted-foreground/70 focus-visible:ring-ring w-full rounded-md border py-2 pr-3 pl-10 text-sm outline-none focus-visible:ring-2"
        />
      </div>
      {statusText ? (
        <p
          className="text-muted-foreground mt-2 text-xs"
          aria-live="polite"
        >
          {statusText}
        </p>
      ) : null}
    </div>
  );
}
