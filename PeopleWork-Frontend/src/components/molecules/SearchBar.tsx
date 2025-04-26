"use client";

import { Input } from "@/components/ui/input";
import { InputHTMLAttributes } from "react";

interface SearchBarProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function SearchBar({
  value,
  onChange,
  className,
  placeholder,
  ...props
}: SearchBarProps) {
  return (
    <div className="w-full">
      <Input
        placeholder={placeholder || "Search for electricians, plumbers..."}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`bg-background text-foreground border-muted ${
          className || ""
        }`}
        {...props}
      />
    </div>
  );
}
