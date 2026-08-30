"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cloudGamingData } from "@/data/cloudGamingData";
import { Search, Play, Star, ArrowRight, Gamepad2, X } from "lucide-react";

interface GameSearchDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectGameToPlay: (game: any) => void;
}

export default function GameSearchDialog({
  isOpen,
  onClose,
  onSelectGameToPlay,
}: GameSearchDialogProps) {
  const [query, setQuery] = useState("");
  const allGames = [
    {
      id: cloudGamingData.heroSection.id,
      title: cloudGamingData.heroSection.title,
      developer: cloudGamingData.heroSection.developer,
      genre: "Aksiyon",
      thumbnail: cloudGamingData.heroSection.coverImage,
      rating: cloudGamingData.heroSection.rating,
      tags: cloudGamingData.heroSection.tags,
      estimatedLoadTime: "2 saniye",
      isNew: true,
    },
    ...cloudGamingData.gameLibrary,
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const filtered = allGames.filter(
    (g) =>
      g.title.toLowerCase().includes(query.toLowerCase()) ||
      g.developer.toLowerCase().includes(query.toLowerCase()) ||
      g.genre.toLowerCase().includes(query.toLowerCase()) ||
      g.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl w-full p-0 overflow-hidden bg-background border-[3px] border-black rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <DialogTitle className="sr-only">Hızlı Oyun Arama</DialogTitle>
        <DialogDescription className="sr-only">Bulut kütüphanesindeki oyunları hızlıca arayın ve başlatın</DialogDescription>

        {/* Search Input Bar */}
        <div className="relative border-b-[3px] border-black bg-white p-4 flex items-center gap-3">
          <Search size={22} className="text-gray-500 shrink-0" />
          <Input
            autoFocus
            placeholder="Oyun, geliştirici veya etiket ara... (Örn: CyberStrike, Yarış, 4K)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-none shadow-none text-lg font-heading font-bold uppercase placeholder:normal-case placeholder:font-normal focus-visible:ring-0 px-0 h-10 bg-transparent text-black"
          />
          <div className="hidden sm:flex items-center gap-1 text-[11px] font-mono font-bold bg-gray-100 border border-black px-2 py-1">
            <span>ESC</span>
          </div>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-4 space-y-3 bg-background">
          {filtered.length === 0 ? (
            <div className="py-12 text-center border-2 border-dashed border-black/30 p-6">
              <Gamepad2 size={32} className="mx-auto text-gray-400 mb-2" />
              <p className="font-heading font-bold uppercase text-gray-700">Oyun Bulunamadı</p>
              <p className="text-xs text-gray-500 mt-1">Farklı bir anahtar kelime veya tür aramayı deneyin.</p>
            </div>
          ) : (
            filtered.map((game) => (
              <div
                key={game.id}
                className="border-2 border-black bg-white p-3 flex items-center justify-between gap-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(212,108,78,1)] hover:-translate-y-0.5 transition-all group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={game.thumbnail}
                    alt={game.title}
                    className="size-14 object-cover border border-black shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <h4 className="font-heading font-bold text-base uppercase text-black truncate">{game.title}</h4>
                      <span className="flex items-center gap-0.5 text-xs font-bold bg-black text-white px-1.5 py-0.5 border border-black shrink-0">
                        <Star size={10} fill="currentColor" /> {game.rating}
                      </span>
                    </div>
                    <p className="text-xs text-gray-600 font-medium truncate">{game.developer} • {game.genre}</p>
                    <div className="flex gap-1 mt-1">
                      {game.tags.slice(0, 2).map((t, idx) => (
                        <span key={idx} className="text-[9px] font-bold uppercase bg-background px-1.5 py-0.5 border border-black">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <Button
                  onClick={() => {
                    onClose();
                    onSelectGameToPlay(game);
                  }}
                  className="bg-accent-muted text-white border-2 border-black rounded-none font-heading font-bold text-xs uppercase py-2 px-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white shrink-0 flex items-center gap-1.5"
                >
                  <Play size={12} fill="currentColor" /> Oyna
                </Button>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="bg-white border-t-2 border-black p-3 px-4 flex items-center justify-between text-xs font-bold text-gray-600">
          <span>{filtered.length} oyun listeleniyor</span>
          <span className="hidden sm:inline">NexusPlay Cloud Ultra-Fast WebRTC Stream</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
