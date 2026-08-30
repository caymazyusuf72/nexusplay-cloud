"use client";

import React, { useState, useEffect } from "react";
import { Palette, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const themes = [
  { id: "terracotta", name: "Kiremit", color: "#d46c4e", bgClass: "bg-[#d46c4e]" },
  { id: "cobalt", name: "Kobalt Mavi", color: "#2e5b88", bgClass: "bg-[#2e5b88]" },
  { id: "forest", name: "Orman Yeşili", color: "#2a6f4e", bgClass: "bg-[#2a6f4e]" },
  { id: "monochrome", name: "Cyber Kömür", color: "#333333", bgClass: "bg-[#333333]" },
];

export default function ThemePalettePicker() {
  const [currentTheme, setCurrentTheme] = useState("terracotta");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("nexusplay-theme") || "terracotta";
    setCurrentTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  const handleSelectTheme = (themeId: string) => {
    setCurrentTheme(themeId);
    localStorage.setItem("nexusplay-theme", themeId);
    document.documentElement.setAttribute("data-theme", themeId);
  };

  if (!mounted) {
    return (
      <div className="size-10 bg-secondary-background border-[3px] border-border rounded-none shadow-[2px_2px_0px_0px_var(--border)]"></div>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center justify-center size-10 bg-secondary-background border-[3px] border-border text-foreground rounded-none shadow-[2px_2px_0px_0px_var(--border)] hover:bg-accent-muted hover:text-white transition-all"
          title="Renk Paletini Değiştir"
        >
          <Palette size={18} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-48 bg-secondary-background border-[3px] border-border rounded-none p-2 shadow-[4px_4px_0px_0px_var(--border)] space-y-1 text-foreground"
      >
        <div className="text-[11px] font-heading font-bold uppercase text-muted-foreground px-2 py-1 border-b border-border/30 mb-1">
          Vurgu Rengi
        </div>
        {themes.map((t) => (
          <DropdownMenuItem
            key={t.id}
            onClick={() => handleSelectTheme(t.id)}
            className="flex items-center justify-between p-2 font-heading font-bold text-xs uppercase cursor-pointer hover:bg-accent-muted hover:text-white rounded-none border border-transparent hover:border-border text-foreground"
          >
            <div className="flex items-center gap-2.5">
              <span className={`size-3.5 border border-border ${t.bgClass}`}></span>
              <span>{t.name}</span>
            </div>
            {currentTheme === t.id && <Check size={14} className="text-accent-muted" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
