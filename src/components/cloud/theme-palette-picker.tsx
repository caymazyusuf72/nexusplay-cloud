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
  { id: "monochrome", name: "Cyber Kömür", color: "#222222", bgClass: "bg-[#222222]" },
];

export default function ThemePalettePicker() {
  const [currentTheme, setCurrentTheme] = useState("terracotta");

  useEffect(() => {
    const saved = localStorage.getItem("nexusplay-theme") || "terracotta";
    setCurrentTheme(saved);
    document.documentElement.setAttribute("data-theme", saved);
  }, []);

  const handleSelectTheme = (themeId: string) => {
    setCurrentTheme(themeId);
    localStorage.setItem("nexusplay-theme", themeId);
    document.documentElement.setAttribute("data-theme", themeId);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center justify-center size-10 bg-white border-[3px] border-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-all"
          title="Renk Paletini Değiştir"
        >
          <Palette size={18} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-48 bg-background border-[3px] border-black rounded-none p-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-1"
      >
        <div className="text-[11px] font-heading font-bold uppercase text-gray-600 px-2 py-1 border-b border-black/20 mb-1">
          Vurgu Rengi
        </div>
        {themes.map((t) => (
          <DropdownMenuItem
            key={t.id}
            onClick={() => handleSelectTheme(t.id)}
            className="flex items-center justify-between p-2 font-heading font-bold text-xs uppercase cursor-pointer hover:bg-black hover:text-white rounded-none border border-transparent hover:border-black"
          >
            <div className="flex items-center gap-2.5">
              <span className={`size-3.5 border border-black ${t.bgClass}`}></span>
              <span>{t.name}</span>
            </div>
            {currentTheme === t.id && <Check size={14} className="text-accent-muted" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
