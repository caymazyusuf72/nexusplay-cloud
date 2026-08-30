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

  const allGames = [
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
    <div className="min-h-[100dvh] bg-background pt-36 pb-32">
      <div className="container mx-auto px-4">
        {/* Header and Search Filters */}
        <div className="mb-12 border-b-[3px] border-black pb-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-black uppercase tracking-tight mb-2">
              Bulut Oyun Kütüphanesi
            </h1>
            <p className="text-sm font-bold text-gray-600 uppercase mb-6">
              RTX 4080 sunucularda anında oynamaya hazır {allGames.length} oyun
            </p>
          </motion.div>

          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-1/2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <Input
                placeholder="Oyun veya geliştirici ara..."
                className="pl-10 py-6 text-base font-bold border-[3px] border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus-visible:ring-0 focus-visible:shadow-[6px_6px_0px_0px_rgba(212,108,78,1)] transition-all bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex w-full md:w-auto overflow-x-auto pb-2 gap-2 scrollbar-hide">
              {categories.map((cat, i) => (
                <Button
                  key={i}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`border-2 border-black rounded-none shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-heading font-bold text-xs uppercase px-4 py-2 transition-all ${
                    activeCategory === cat.name
                      ? "bg-accent-muted text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                      : "bg-white text-black hover:bg-gray-100"
                  }`}
                >
                  {cat.name}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Games Grid */}
        {filteredGames.length === 0 ? (
          <div className="text-center py-20 border-[3px] border-black bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-8">
            <Gamepad2 size={48} className="mx-auto text-accent-muted mb-3" />
            <h2 className="text-2xl font-heading font-black uppercase mb-2">Oyun Bulunamadı</h2>
            <p className="text-sm text-gray-600 font-medium">Arama kriterlerinizi değiştirerek tekrar deneyin.</p>
          </div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {filteredGames.map((game) => (
              <motion.div key={game.id} variants={fadeUp}>
                <Card className="border-[3px] border-black rounded-none overflow-hidden bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(212,108,78,1)] hover:-translate-y-1 transition-all group flex flex-col h-full relative">
                  {game.isNew && (
                    <div className="absolute top-3 right-3 z-20 bg-accent-muted text-white border-2 border-black font-bold uppercase px-2 py-0.5 text-[10px] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      YENİ
                    </div>
                  )}

                  <div className="relative h-48 overflow-hidden border-b-[3px] border-black bg-black">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={game.thumbnail}
                      alt={game.title}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    />

                    {/* Action Overlay */}
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        onClick={() => setSelectedGameToPlay(game)}
                        className="bg-accent-muted text-white border-2 border-black rounded-none font-heading font-bold text-xs uppercase py-1.5 px-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-white hover:text-black flex items-center gap-1"
                      >
                        <Play size={12} fill="currentColor" /> Oyna
                      </Button>
                      <Button
                        onClick={() => setSelectedGameForDetail(game)}
                        className="bg-white text-black border-2 border-black rounded-none font-heading font-bold text-xs uppercase py-1.5 px-2.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white"
                      >
                        <Info size={14} />
                      </Button>
                    </div>
                  </div>

                  <div className="p-4 flex flex-col flex-grow bg-white">
                    <div className="flex justify-between items-start mb-1.5">
                      <h3 className="text-lg font-heading font-black uppercase text-black line-clamp-1">
                        {game.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 font-semibold mb-3 uppercase text-xs tracking-wide">
                      {game.developer}
                    </p>

                    <div className="flex flex-wrap gap-1 mt-auto">
                      {game.tags?.slice(0, 2).map((tag: string, idx: number) => (
                        <span
                          key={idx}
                          className="bg-background text-foreground px-1.5 py-0.5 text-[9px] font-bold uppercase border border-black"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 pt-3 border-t-2 border-black/10 flex justify-between items-center text-[11px] font-bold uppercase text-gray-700">
                      <span className="flex items-center gap-1">
                        <Activity size={12} className="text-accent-muted" /> {game.currentPlayers?.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star size={11} fill="currentColor" className="text-black" /> {game.rating}
                      </span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Global Cloud Gaming Modals */}
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

export default function GamesLibrary() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background pt-36 text-center font-bold">Yükleniyor...</div>}>
      <GamesContent />
    </Suspense>
  );
}
