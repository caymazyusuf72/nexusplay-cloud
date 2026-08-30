"use client";

import React, { useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cloudGamingData } from "@/data/cloudGamingData";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Users, 
  Star, 
  Activity, 
  ArrowRight, 
  Gamepad2, 
  Swords, 
  CarFront, 
  Globe, 
  Map, 
  Crosshair,
  Flame,
  Shield,
  Info,
  Cpu,
  HardDrive,
  Zap,
  CheckCircle2,
  HelpCircle,
  Quote
} from "lucide-react";
import Link from "next/link";
import GameStreamModal from "@/components/cloud/game-stream-modal";
import GameDetailModal from "@/components/cloud/game-detail-modal";
import { 
  Accordion, 
  AccordionItem, 
  AccordionTrigger, 
  AccordionContent 
} from "@/components/ui/accordion";

const IconMap: Record<string, React.ReactNode> = {
  Gamepad2: <Gamepad2 size={30} />,
  Swords: <Swords size={30} />,
  CarFront: <CarFront size={30} />,
  Globe: <Globe size={30} />,
  Map: <Map size={30} />,
  Crosshair: <Crosshair size={30} />,
  Flame: <Flame size={30} />,
  Shield: <Shield size={30} />,
};

export default function Home() {
  const { 
    heroSection, 
    categories, 
    gameLibrary, 
    connectedStores, 
    hardwareComparison, 
    reviews, 
    faqs,
    membershipPlans
  } = cloudGamingData;

  const shouldReduceMotion = useReducedMotion();
  const [selectedGameToPlay, setSelectedGameToPlay] = useState<any>(null);
  const [selectedGameForDetail, setSelectedGameForDetail] = useState<any>(null);

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.4, ease: "easeOut" } 
    }
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  return (
    <div className="min-h-[100dvh] bg-background overflow-x-hidden pt-36 pb-32">
      <motion.main 
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="container mx-auto px-4 relative z-10"
      >
        {/* HERO SECTION */}
        <section className="mb-24 relative">
          <motion.div 
            variants={fadeUp}
            className="border-[3px] border-black bg-white rounded-none overflow-hidden relative shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] group flex flex-col min-h-[580px]"
          >
            {/* Clean Background Image */}
            <div className="absolute inset-0">
               {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={heroSection.coverImage} 
                alt={heroSection.title}
                className="w-full h-full object-cover opacity-85 transition-transform duration-700 ease-in-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-black/30"></div>
            </div>

            <div className="relative z-10 p-6 md:p-14 flex flex-col md:flex-row items-end justify-between flex-1">
              <div className="max-w-3xl text-white">
                <div className="mb-4 flex flex-wrap gap-2">
                  <Badge className="bg-accent-muted text-white border-2 border-black rounded-none font-bold uppercase py-1 px-3 text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    HAFTANIN ÖNE ÇIKAN BULUT OYUNU
                  </Badge>
                  {heroSection.tags.map((tag, i) => (
                    <Badge key={i} className="bg-white text-black border border-black rounded-none font-bold uppercase py-1 px-3 text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      {tag}
                    </Badge>
                  ))}
                </div>
                
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-black uppercase tracking-tight mb-4 text-white drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                  {heroSection.title}
                </h1>
                
                <p className="text-base md:text-lg font-medium mb-8 max-w-2xl leading-relaxed text-gray-200 bg-black/60 p-4 border-l-4 border-accent-muted backdrop-blur-xs">
                  {heroSection.description}
                </p>
                
                <div className="flex flex-wrap items-center gap-4">
                  <Button 
                    onClick={() => setSelectedGameToPlay({
                      title: heroSection.title,
                      developer: heroSection.developer,
                      coverImage: heroSection.coverImage,
                      rating: heroSection.rating,
                    })}
                    className="bg-accent-muted text-white border-2 border-black rounded-none text-xl font-heading font-black uppercase py-7 px-10 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white hover:-translate-y-0.5 transition-all flex items-center gap-3"
                  >
                    <Play fill="currentColor" size={24} />
                    {heroSection.ctaText}
                  </Button>

                  <Button
                    onClick={() => setSelectedGameForDetail({
                      id: heroSection.id,
                      title: heroSection.title,
                      developer: heroSection.developer,
                      coverImage: heroSection.coverImage,
                      rating: heroSection.rating,
                      tags: heroSection.tags,
                      estimatedLoadTime: heroSection.loadTime,
                    })}
                    className="bg-white text-black border-2 border-black rounded-none text-base font-heading font-bold uppercase py-7 px-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-all flex items-center gap-2"
                  >
                    <Info size={20} /> Detaylar & Ayarlar
                  </Button>
                </div>
              </div>

              <div className="hidden md:flex flex-col items-end gap-3 bg-white p-5 border-2 border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-black mt-8 md:mt-0">
                <div className="flex items-center gap-2 font-heading font-bold text-lg uppercase">
                  <Star fill="currentColor" size={18} className="text-black" />
                  {heroSection.rating} Puan
                </div>
                <div className="flex items-center gap-2 font-heading font-bold text-sm uppercase">
                  <Users size={16} className="text-black" />
                  {heroSection.activePlayers.toLocaleString()} Aktif Oyuncu
                </div>
                <div className="text-[11px] font-mono font-bold text-accent-muted uppercase pt-2 border-t border-black w-full text-right">
                  RTX 4080 • {heroSection.storageSaved} TASARRUF
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* CONNECTED STORE ECOSYSTEM */}
        <section className="mb-24 border-[3px] border-black bg-white p-6 sm:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b-2 border-black pb-4">
            <div>
              <h3 className="text-2xl font-heading font-black uppercase">
                Mevcut Kütüphanenizi Bağlayın
              </h3>
              <p className="text-xs font-bold text-gray-600 uppercase mt-0.5">
                Sahip olduğunuz oyunları tekrar satın almadan doğrudan bulutta oynayın
              </p>
            </div>
            <Badge className="bg-background text-black border border-black font-mono text-xs uppercase px-3 py-1 self-start">
              3,000+ Uyumlu Başlık
            </Badge>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {connectedStores.map((st) => (
              <div 
                key={st.id} 
                className="border-2 border-black bg-background p-4 flex flex-col items-center text-center justify-center gap-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-white transition-colors"
              >
                <span className="font-heading font-black text-sm uppercase text-black">{st.name}</span>
                <span className="text-[10px] font-bold text-gray-600">{st.count}</span>
                <span className="text-[9px] font-mono font-bold bg-green-200 text-green-900 border border-green-800 px-1.5 py-0.5">
                  ✓ {st.status}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* CATEGORIES GRID */}
        <section className="mb-24">
          <div className="mb-6 flex items-center justify-between border-b-2 border-black pb-3">
            <h2 className="text-2xl font-heading font-bold uppercase">Kategoriler</h2>
            <span className="text-xs font-mono text-gray-600 uppercase">Hızlı Filtrele</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {categories.map((cat, i) => (
              <motion.div key={i} variants={fadeUp}>
                <Link href={`/games?category=${encodeURIComponent(cat.name)}`}>
                  <Card className="border-[3px] border-black rounded-none bg-white p-4 flex flex-col items-center justify-center gap-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[5px_5px_0px_0px_rgba(212,108,78,1)] hover:-translate-y-1 transition-all cursor-pointer group">
                    <div className="text-accent-muted group-hover:scale-110 transition-transform">
                      {IconMap[cat.icon as string] || <Gamepad2 size={26} />}
                    </div>
                    <span className="font-heading font-bold uppercase text-xs text-center text-black">
                      {cat.name}
                    </span>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* TRENDING GAMES SECTION */}
        <section className="mb-24">
          <div className="flex items-center justify-between mb-8 border-b-[3px] border-black pb-4">
            <div>
              <motion.h2 
                variants={fadeUp}
                className="text-3xl md:text-4xl font-heading font-black uppercase tracking-tight text-foreground"
              >
                Trend Bulut Oyunları
              </motion.h2>
              <p className="text-xs text-gray-600 uppercase font-bold mt-1">İndirmeden saniyeler içinde oyna</p>
            </div>

            <Link href="/games">
              <Button className="bg-white text-black border-2 border-black rounded-none font-heading font-bold px-5 py-4 hover:bg-accent-muted hover:text-white transition-colors flex items-center gap-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-xs uppercase">
                Tümünü Gör ({gameLibrary.length}) <ArrowRight size={16} />
              </Button>
            </Link>
          </div>

          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {gameLibrary.slice(0, 6).map((game) => (
              <motion.div key={game.id} variants={fadeUp}>
                <Card className="border-[3px] border-black rounded-none overflow-hidden bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(212,108,78,1)] hover:-translate-y-1 transition-all group flex flex-col h-full relative">
                  {game.isNew && (
                    <div className="absolute top-3 right-3 z-20 bg-accent-muted text-white border-2 border-black font-bold uppercase px-2.5 py-0.5 text-[11px] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      YENİ
                    </div>
                  )}

                  <div className="relative h-56 overflow-hidden border-b-[3px] border-black bg-black">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={game.thumbnail} 
                      alt={game.title}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    />

                    {/* Quick Play Hover Action */}
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button 
                        onClick={() => setSelectedGameToPlay(game)}
                        className="bg-accent-muted text-white border-2 border-black rounded-none font-heading font-bold uppercase text-xs py-2 px-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-white hover:text-black flex items-center gap-1.5"
                      >
                        <Play size={14} fill="currentColor" /> Hemen Oyna
                      </Button>
                      <Button
                        onClick={() => setSelectedGameForDetail(game)}
                        className="bg-white text-black border-2 border-black rounded-none font-heading font-bold uppercase text-xs py-2 px-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white"
                      >
                        Detaylar
                      </Button>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-grow bg-white">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-heading font-bold uppercase text-black line-clamp-1">{game.title}</h3>
                      <div className="flex items-center gap-1 bg-black text-white px-2 py-0.5 font-bold text-xs border border-black shrink-0">
                        <Star size={11} fill="currentColor" />
                        {game.rating}
                      </div>
                    </div>
                    <p className="text-gray-600 font-semibold mb-3 uppercase text-xs tracking-wide">
                      {game.developer} • {game.store}
                    </p>
                    
                    <div className="flex flex-wrap gap-1.5 mt-auto">
                      {game.tags.slice(0, 3).map((tag, idx) => (
                        <span key={idx} className="bg-background text-foreground px-2 py-0.5 text-[10px] font-bold uppercase border border-black">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 pt-3 border-t-2 border-black/10 flex justify-between items-center text-xs font-bold uppercase text-gray-700">
                       <span className="flex items-center gap-1"><Activity size={13} className="text-accent-muted" /> {game.currentPlayers.toLocaleString()} Oynuyor</span>
                       <span className="flex items-center gap-1 font-mono text-[11px]"><HardDrive size={13} /> {game.storageSaved}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* HARDWARE COMPARISON MATRIX (Local PC vs RTX 4080 Rig) */}
        <section className="mb-24 border-[3px] border-black bg-white p-6 sm:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <Badge className="bg-black text-white border border-black font-bold uppercase mb-2">
              DONANIM KARŞILAŞTIRMASI
            </Badge>
            <h2 className="text-3xl md:text-4xl font-heading font-black uppercase">
              Pahalı Donanımlara Elveda Deyin
            </h2>
            <p className="text-xs md:text-sm font-bold text-gray-600 uppercase mt-1">
              Geleneksel oyun bilgisayarı ile NexusPlay Bulut Rig arasındaki farkı inceleyin
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-bold border-collapse">
              <thead>
                <tr className="border-b-[3px] border-black bg-background">
                  <th className="p-3 uppercase">Kriter</th>
                  <th className="p-3 uppercase text-gray-600">Geleneksel Yerel PC</th>
                  <th className="p-3 uppercase text-accent-muted">NexusPlay Cloud RTX 4080</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-black/10 font-medium">
                {hardwareComparison.map((row, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition-colors">
                    <td className="p-3.5 font-heading font-black uppercase text-black">{row.feature}</td>
                    <td className="p-3.5 text-gray-600">{row.localPc}</td>
                    <td className="p-3.5 font-bold text-accent-muted flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-accent-muted shrink-0" />
                      <span>{row.nexusPlay}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* REVIEWS SECTION */}
        <section className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge className="bg-accent-muted text-white border-2 border-black rounded-none font-bold uppercase py-1 px-3 mb-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              TOPLULUK YORUMLARI
            </Badge>
            <h2 className="text-3xl md:text-4xl font-heading font-black uppercase">
              Oyuncular Ne Diyor?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((rev) => (
              <Card key={rev.id} className="border-[3px] border-black bg-white rounded-none p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 mb-4 text-accent-muted">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-xs md:text-sm font-semibold text-gray-800 leading-relaxed italic mb-6">
                    &quot;{rev.comment}&quot;
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t-2 border-black/10">
                  <div className="size-10 bg-black text-white font-heading font-black flex items-center justify-center text-sm border border-black">
                    {rev.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-heading font-black text-xs uppercase text-black">{rev.name}</h4>
                    <p className="text-[10px] text-gray-500 font-bold uppercase">{rev.tag}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* QUICK FAQ SECTION */}
        <section className="mb-16 border-[3px] border-black bg-white p-6 sm:p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 border-b-2 border-black pb-4">
            <div>
              <h2 className="text-3xl font-heading font-black uppercase">Sıkça Sorulan Sorular</h2>
              <p className="text-xs font-bold text-gray-600 uppercase mt-1">Bulut oyunculuk hakkında merak edilenler</p>
            </div>
            <Link href="/support">
              <Button className="bg-background text-black border-2 border-black rounded-none font-bold uppercase text-xs px-4 py-2 hover:bg-black hover:text-white">
                Tüm Yardım Merkezini Gör <ArrowRight size={14} className="ml-1" />
              </Button>
            </Link>
          </div>

          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqs.slice(0, 3).map((faq, i) => (
              <AccordionItem key={i} value={`home-faq-${i}`} className="border-2 border-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <AccordionTrigger className="font-heading font-bold text-xs md:text-sm uppercase p-4 text-black hover:no-underline bg-white">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="p-4 text-xs font-semibold text-gray-700 bg-background leading-relaxed border-t-2 border-black">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

      </motion.main>

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
