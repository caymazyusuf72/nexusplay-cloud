"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cloudGamingData } from "@/data/cloudGamingData";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Star, Activity, Gamepad2, Filter, Play, Info } from "lucide-react";
import GameStreamModal from "@/components/cloud/game-stream-modal";
import GameDetailModal from "@/components/cloud/game-detail-modal";

function GamesContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "Tümü";

  const { gameLibrary, categories, heroSection } = cloudGamingData;
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const shouldReduceMotion = useReducedMotion();

  // Modals
  const [selectedGameToPlay, setSelectedGameToPlay] = useState<any>(null);
  const [selectedGameForDetail, setSelectedGameForDetail] = useState<any>(null);

  const allGames: any[] = [
    {
      id: heroSection.id,
      title: heroSection.title,
      developer: heroSection.developer,
      genre: "Aksiyon",
      thumbnail: heroSection.coverImage,
      coverImage: heroSection.coverImage,
      rating: heroSection.rating,
      tags: heroSection.tags,
      currentPlayers: heroSection.activePlayers,
      estimatedLoadTime: "2 saniye",
      storageSaved: "140 GB",
      isNew: true,
    },
    ...gameLibrary,
  ];

  const filteredGames = allGames.filter((game) => {
    const matchesSearch =
      game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.developer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === "Tümü" || game.genre === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.35, ease: "easeOut" } 
    },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.06 } 
    },
  };

  return (
    <div className="min-h-[100dvh] bg-background text-foreground pt-36 pb-32">
      <div className="container mx-auto px-4">
        {/* Header and Search Filters */}
        <div className="mb-12 border-b-[3px] border-border pb-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-black uppercase tracking-tight text-foreground mb-2">
              Bulut Oyun Kütüphanesi
            </h1>
            <p className="text-sm font-bold text-muted-foreground uppercase mb-6">
              RTX 4080 sunucularda anında oynamaya hazır {allGames.length} oyun
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-1/2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Oyun veya geliştirici ara..."
                className="pl-10 py-6 text-base font-bold border-[3px] border-border rounded-none shadow-[4px_4px_0px_0px_var(--border)] focus-visible:ring-0 focus-visible:shadow-[6px_6px_0px_0px_var(--accent-muted)] transition-all bg-secondary-background text-foreground"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex w-full md:w-auto overflow-x-auto pb-2 gap-2 scrollbar-hide">
              {categories.map((cat, i) => (
                <Button
                  key={i}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`rounded-none font-heading font-black text-xs uppercase px-4 py-5 border-2 border-border transition-all shadow-[2px_2px_0px_0px_var(--border)] ${
                    activeCategory === cat.name
                      ? "bg-accent-muted text-white"
                      : "bg-secondary-background text-foreground hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
                >
                  {cat.name}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Games Grid */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {filteredGames.map((game) => (
            <motion.div 
              key={game.id} 
              variants={fadeUp}
              whileHover={{ y: shouldReduceMotion ? 0 : -6 }}
              transition={{ duration: 0.15 }}
            >
              <Card className="rounded-none border-[3px] border-border bg-secondary-background overflow-hidden shadow-[5px_5px_0px_0px_var(--border)] hover:shadow-[8px_8px_0px_0px_var(--accent-muted)] transition-all flex flex-col h-full group">
                <div className="relative h-48 overflow-hidden border-b-[3px] border-border bg-black">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={game.thumbnail}
                    alt={game.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2 right-2 bg-black text-white px-2 py-0.5 border border-white text-xs font-bold flex items-center gap-1">
                    <Star size={12} className="text-accent-muted fill-current" />
                    {game.rating}
                  </div>
                  {game.isNew && (
                    <div className="absolute top-2 left-2 bg-accent-muted text-white px-2 py-0.5 border border-border text-[10px] font-heading font-black uppercase">
                      YENİ
                    </div>
                  )}
                  {game.storageSaved && (
                    <div className="absolute bottom-2 left-2 bg-black/80 text-white text-[10px] font-mono px-2 py-0.5 border border-white">
                      {game.storageSaved}
                    </div>
                  )}
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold uppercase mb-1">
                      <span className="text-muted-foreground truncate">{game.developer}</span>
                      <span className="text-accent-muted shrink-0">{game.genre}</span>
                    </div>
                    <h3 className="text-lg font-heading font-black uppercase tracking-tight text-foreground mb-3 line-clamp-1">
                      {game.title}
                    </h3>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {game.tags?.slice(0, 3).map((tag: string, idx: number) => (
                        <span
                          key={idx}
                          className="bg-background text-foreground text-[9px] font-bold uppercase px-1.5 py-0.5 border border-border"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-[11px] font-bold text-muted-foreground border-t border-border/20 pt-2 mb-3">
                      <span>Yükleme: {game.estimatedLoadTime || "3 sn"}</span>
                      <span>{game.currentPlayers || "2.1K"} Oyuncu</span>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        onClick={() => setSelectedGameForDetail(game)}
                        className="flex-1 bg-background text-foreground border-2 border-border rounded-none font-heading font-bold text-xs uppercase py-2 hover:bg-black dark:hover:bg-white dark:hover:text-black hover:text-white transition-all shadow-[2px_2px_0px_0px_var(--border)]"
                      >
                        Detay
                      </Button>
                      <Button
                        onClick={() => setSelectedGameToPlay(game)}
                        className="flex-1 bg-accent-muted text-white border-2 border-border rounded-none font-heading font-black text-xs uppercase py-2 hover:bg-black dark:hover:bg-white dark:hover:text-black hover:text-white transition-all shadow-[2px_2px_0px_0px_var(--border)] flex items-center justify-center gap-1"
                      >
                        <Play size={12} fill="currentColor" /> Oyna
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Modals */}
      <GameStreamModal
        isOpen={Boolean(selectedGameToPlay)}
        onClose={() => setSelectedGameToPlay(null)}
        game={selectedGameToPlay}
      />

      <GameDetailModal
        isOpen={Boolean(selectedGameForDetail)}
        onClose={() => setSelectedGameForDetail(null)}
        game={selectedGameForDetail}
        onPlay={(game) => {
          setSelectedGameForDetail(null);
          setSelectedGameToPlay(game);
        }}
      />
    </div>
  );
}

export default function GamesPage() {
  return (
    <Suspense fallback={<div className="min-h-[100dvh] pt-36 pb-32 text-center font-heading font-black text-xl uppercase">Yükleniyor...</div>}>
      <GamesContent />
    </Suspense>
  );
}
