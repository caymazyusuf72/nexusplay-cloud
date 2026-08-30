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
    <div className="min-h-[100dvh] bg-background text-foreground overflow-x-hidden pt-36 pb-32">
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
            className="border-[3px] border-border bg-secondary-background rounded-none overflow-hidden relative shadow-[8px_8px_0px_0px_var(--border)] group flex flex-col min-h-[580px]"
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
                  <Badge className="bg-accent-muted text-white border-2 border-border rounded-none font-bold uppercase py-1 px-3 text-xs shadow-[2px_2px_0px_0px_var(--border)]">
                    HAFTANIN ÖNE ÇIKAN BULUT OYUNU
                  </Badge>
                  {heroSection.tags.map((tag, i) => (
                    <Badge key={i} className="bg-white text-black border border-border rounded-none font-bold uppercase py-1 px-3 text-xs shadow-[2px_2px_0px_0px_var(--border)]">
                      {tag}
                    </Badge>
                  ))}
                </div>

                <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-black uppercase tracking-tight text-white mb-4 leading-none drop-shadow-[3px_3px_0px_rgba(0,0,0,1)]">
                  {heroSection.title}
                </h1>
                
                <p className="text-base sm:text-lg text-gray-200 mb-8 max-w-2xl font-medium leading-relaxed drop-shadow-[1px_1px_0px_rgba(0,0,0,1)]">
                  {heroSection.description}
                </p>

                <div className="flex flex-wrap gap-4">
                  <Button 
                    onClick={() => setSelectedGameToPlay({
                      id: heroSection.id,
                      title: heroSection.title,
                      developer: heroSection.developer,
                      genre: "Aksiyon",
                      thumbnail: heroSection.coverImage
                    })}
                    className="bg-accent-muted text-white border-[3px] border-border rounded-none font-heading font-black text-sm uppercase px-8 py-7 shadow-[4px_4px_0px_0px_var(--border)] hover:bg-black dark:hover:bg-white dark:hover:text-black hover:text-white transition-all transform hover:-translate-y-1 active:translate-y-0"
                  >
                    <Play size={20} className="mr-2 fill-current" />
                    HEMEN OYNA (4K 120FPS)
                  </Button>
                  <Button 
                    onClick={() => setSelectedGameForDetail({
                      id: heroSection.id,
                      title: heroSection.title,
                      developer: heroSection.developer,
                      genre: "Aksiyon",
                      thumbnail: heroSection.coverImage,
                      coverImage: heroSection.coverImage,
                      rating: heroSection.rating,
                      tags: heroSection.tags,
                      estimatedLoadTime: "2 saniye"
                    })}
                    className="bg-secondary-background text-foreground border-[3px] border-border rounded-none font-heading font-black text-sm uppercase px-6 py-7 shadow-[4px_4px_0px_0px_var(--border)] hover:bg-black dark:hover:bg-white dark:hover:text-black hover:text-white transition-all transform hover:-translate-y-1 active:translate-y-0"
                  >
                    <Info size={18} className="mr-2" />
                    DETAYLAR & AYARLAR
                  </Button>
                </div>
              </div>

              {/* Specs Badge */}
              <div className="mt-8 md:mt-0 flex flex-col gap-3 bg-secondary-background/95 border-[3px] border-border p-4 shadow-[4px_4px_0px_0px_var(--border)] min-w-[240px] text-foreground">
                <div className="flex items-center justify-between border-b border-border/20 pb-2">
                  <span className="text-xs font-bold uppercase text-muted-foreground">Aktif Oyuncu</span>
                  <span className="font-heading font-bold text-sm flex items-center gap-1.5">
                    <Users size={14} className="text-accent-muted" />
                    {heroSection.activePlayers}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-border/20 pb-2">
                  <span className="text-xs font-bold uppercase text-muted-foreground">Değerlendirme</span>
                  <span className="font-heading font-bold text-sm flex items-center gap-1.5">
                    <Star size={14} className="text-accent-muted fill-current" />
                    {heroSection.rating} / 5.0
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase text-muted-foreground">Depolama</span>
                  <span className="font-heading font-bold text-xs text-accent-muted uppercase">
                    0 GB Gerekli
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* CONNECTED STORES SYNC BAR */}
        <section className="mb-24">
          <div className="border-[3px] border-border bg-secondary-background p-6 shadow-[6px_6px_0px_0px_var(--border)]">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <span className="text-xs font-heading font-black uppercase tracking-wider text-accent-muted block mb-1">
                  KÜTÜPHANENİ BAĞLA
                </span>
                <h3 className="text-xl md:text-2xl font-heading font-black uppercase text-foreground">
                  Sahip Olduğun Oyunları Doğrudan Bulutta Oyna
                </h3>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {connectedStores.map((store: any) => (
                  <div 
                    key={store.id} 
                    className="flex items-center gap-2 border-2 border-border bg-background px-3 py-2 shadow-[2px_2px_0px_0px_var(--border)] text-foreground font-bold text-xs uppercase hover:bg-accent-muted hover:text-white transition-colors cursor-pointer"
                  >
                    <span>{store.name}</span>
                    <span className="text-[10px] bg-secondary-background text-foreground border border-border px-1">
                      {store.count || store.gamesCount}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CATEGORIES SECTION */}
        <section className="mb-24">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-heading font-black uppercase tracking-tight text-foreground flex items-center gap-3">
              <span className="size-4 bg-accent-muted border-2 border-border inline-block"></span>
              KATEGORİLER
            </h2>
            <Link 
              href="/games" 
              className="text-xs font-heading font-bold uppercase hover:underline flex items-center gap-1 text-foreground"
            >
              Tümünü Gör <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {categories.map((cat) => (
              <motion.div
                key={cat.id}
                variants={fadeUp}
                whileHover={{ y: shouldReduceMotion ? 0 : -4 }}
                transition={{ duration: 0.15 }}
              >
                <Card className="h-full border-[3px] border-border rounded-none p-5 bg-secondary-background shadow-[4px_4px_0px_0px_var(--border)] hover:shadow-[6px_6px_0px_0px_var(--accent-muted)] hover:border-accent-muted transition-all cursor-pointer flex flex-col justify-between">
                  <div className="mb-4 text-foreground">
                    {IconMap[cat.icon] || <Gamepad2 size={30} />}
                  </div>
                  <div>
                    <h3 className="font-heading font-black text-lg uppercase tracking-tight text-foreground mb-1">
                      {cat.name}
                    </h3>
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      {cat.gameCount} Oyun Hazır
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* TOP CLOUD GAMES LIBRARY */}
        <section className="mb-24">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-heading font-black uppercase tracking-tight text-foreground flex items-center gap-3">
                <span className="size-4 bg-accent-muted border-2 border-border inline-block"></span>
                POPÜLER BULUT OYUNLARI
              </h2>
              <p className="text-xs text-muted-foreground font-medium uppercase mt-1">
                İndirme yok • Sıfır bekleme • 4K 120 FPS
              </p>
            </div>
            <Link 
              href="/games" 
              className="text-xs font-heading font-bold uppercase hover:underline flex items-center gap-1 text-foreground"
            >
              Kütüphaneye Git <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {gameLibrary.slice(0, 6).map((game) => (
              <motion.div
                key={game.id}
                variants={fadeUp}
                whileHover={{ y: shouldReduceMotion ? 0 : -6 }}
                transition={{ duration: 0.15 }}
              >
                <div className="border-[3px] border-border bg-secondary-background rounded-none overflow-hidden shadow-[6px_6px_0px_0px_var(--border)] flex flex-col h-full group hover:shadow-[8px_8px_0px_0px_var(--accent-muted)] transition-all">
                  {/* Thumbnail Banner */}
                  <div className="relative h-48 overflow-hidden border-b-[3px] border-border bg-black">
                     {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={game.thumbnail} 
                      alt={game.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-black text-white text-xs font-bold px-2 py-1 border border-white">
                      <Star size={12} className="text-accent-muted fill-current" />
                      {game.rating}
                    </div>
                    {game.isNew && (
                      <div className="absolute top-3 left-3 bg-accent-muted text-white text-[10px] font-heading font-black px-2 py-1 border border-black uppercase">
                        YENİ
                      </div>
                    )}
                    {game.storageSaved && (
                      <div className="absolute bottom-2 left-2 bg-black/80 text-white text-[10px] font-mono px-2 py-0.5 border border-white">
                        {game.storageSaved}
                      </div>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                          {game.developer}
                        </span>
                        <span className="text-[11px] font-bold text-accent-muted uppercase">
                          {game.genre}
                        </span>
                      </div>
                      <h3 className="font-heading font-black text-xl uppercase tracking-tight text-foreground mb-3 line-clamp-1">
                        {game.title}
                      </h3>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {game.tags.slice(0, 3).map((tag, idx) => (
                          <span 
                            key={idx} 
                            className="text-[10px] font-bold uppercase bg-background px-2 py-0.5 border border-border text-foreground"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t-2 border-border/30 flex items-center justify-between gap-3">
                      <Button
                        onClick={() => setSelectedGameForDetail(game)}
                        className="flex-1 bg-background text-foreground border-2 border-border rounded-none font-heading font-bold text-xs uppercase py-2 hover:bg-black dark:hover:bg-white dark:hover:text-black hover:text-white transition-all shadow-[2px_2px_0px_0px_var(--border)]"
                      >
                        Detaylar
                      </Button>
                      <Button 
                        onClick={() => setSelectedGameToPlay(game)}
                        className="flex-1 bg-accent-muted text-white border-2 border-border rounded-none font-heading font-black text-xs uppercase py-2 hover:bg-black dark:hover:bg-white dark:hover:text-black hover:text-white transition-all shadow-[2px_2px_0px_0px_var(--border)] flex items-center justify-center gap-1.5"
                      >
                        <Play size={13} fill="currentColor" /> Oyna
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* HARDWARE COMPARISON MATRIX */}
        <section className="mb-24">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-heading font-black uppercase tracking-tight text-foreground flex items-center gap-3">
              <span className="size-4 bg-accent-muted border-2 border-border inline-block"></span>
              DONANIM KARŞILAŞTIRMASI: YEREL PC vs NEXUSPLAY
            </h2>
            <p className="text-xs text-muted-foreground font-medium uppercase mt-1">
              Binlerce dolarlık donanım maliyetine ve depolama derdine son.
            </p>
          </div>

          <div className="border-[3px] border-border bg-secondary-background p-6 shadow-[6px_6px_0px_0px_var(--border)] overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b-[3px] border-border text-xs font-heading font-black uppercase text-foreground">
                  <th className="py-3 px-4">Özellik / Kriter</th>
                  <th className="py-3 px-4 bg-background border-l-2 border-r-2 border-border text-muted-foreground">Geleneksel Yerel PC</th>
                  <th className="py-3 px-4 bg-accent-muted text-white">NexusPlay Cloud RTX 4080</th>
                </tr>
              </thead>
              <tbody className="text-xs font-bold divide-y divide-border/20 text-foreground">
                {hardwareComparison.map((row: any, idx: number) => (
                  <tr key={idx} className="hover:bg-background/50">
                    <td className="py-3.5 px-4 font-heading font-black uppercase">{row.feature}</td>
                    <td className="py-3.5 px-4 bg-background border-l-2 border-r-2 border-border text-muted-foreground">{row.localPc}</td>
                    <td className="py-3.5 px-4 font-bold text-accent-muted">{row.nexusPlay || row.nexusCloud}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* MEMBERSHIP PLANS PREVIEW */}
        <section className="mb-24">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-heading font-black uppercase tracking-tight text-foreground flex items-center gap-3">
                <span className="size-4 bg-accent-muted border-2 border-border inline-block"></span>
                ÜYELİK PAKETLERİ
              </h2>
              <p className="text-xs text-muted-foreground font-medium uppercase mt-1">
                İhtiyacınıza göre esnek, taahhütsüz bulut oyun paketleri
              </p>
            </div>
            <Link 
              href="/pricing" 
              className="text-xs font-heading font-bold uppercase hover:underline flex items-center gap-1 text-foreground"
            >
              Fiyatlandırma Detayları <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {membershipPlans.map((plan: any) => (
              <div 
                key={plan.id}
                className={`border-[3px] border-border bg-secondary-background p-6 rounded-none shadow-[6px_6px_0px_0px_var(--border)] flex flex-col justify-between relative ${
                  plan.isPopular || plan.popular ? "ring-2 ring-accent-muted shadow-[8px_8px_0px_0px_var(--accent-muted)]" : ""
                }`}
              >
                {(plan.isPopular || plan.popular) && (
                  <div className="absolute -top-3.5 right-4 bg-accent-muted text-white font-heading font-black text-[10px] uppercase py-1 px-3 border-2 border-border">
                    EN ÇOK TERCİH EDİLEN
                  </div>
                )}
                <div>
                  <h3 className="font-heading font-black text-2xl uppercase text-foreground mb-1">{plan.name}</h3>
                  <p className="text-xs text-muted-foreground font-medium mb-4">{plan.description}</p>
                  <div className="text-3xl font-heading font-black text-accent-muted mb-6">
                    {plan.priceMonthly === 0 ? "Ücretsiz" : `₺${plan.priceMonthly}`}
                    <span className="text-xs font-bold text-muted-foreground">/ay</span>
                  </div>
                  <ul className="space-y-2.5 text-xs font-bold text-foreground mb-6">
                    {plan.features.slice(0, 4).map((feat, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-accent-muted shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <Link href="/pricing">
                  <Button className="w-full bg-accent-muted text-white border-2 border-border rounded-none font-heading font-black text-xs uppercase py-5 shadow-[3px_3px_0px_0px_var(--border)] hover:bg-black dark:hover:bg-white dark:hover:text-black hover:text-white">
                    Paketi İncele
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* COMMUNITY REVIEWS */}
        <section className="mb-24">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-heading font-black uppercase tracking-tight text-foreground flex items-center gap-3">
              <span className="size-4 bg-accent-muted border-2 border-border inline-block"></span>
              TOPLULUK DEĞERLENDİRMELERİ
            </h2>
            <p className="text-xs text-muted-foreground font-medium uppercase mt-1">
              Oyuncuların NexusPlay bulut deneyimi hakkındaki görüşleri
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((rev) => (
              <div 
                key={rev.id} 
                className="border-[3px] border-border bg-secondary-background p-6 rounded-none shadow-[5px_5px_0px_0px_var(--border)] flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 text-accent-muted mb-3">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-xs font-bold text-foreground leading-relaxed italic mb-4">
                    &quot;{rev.comment}&quot;
                  </p>
                </div>
                <div className="pt-3 border-t-2 border-border/20 flex items-center justify-between">
                  <div>
                    <h4 className="font-heading font-black text-xs uppercase text-foreground">{rev.name}</h4>
                    <p className="text-[10px] text-muted-foreground">{rev.role}</p>
                  </div>
                  <Badge className="bg-background text-foreground border border-border text-[9px] rounded-none">
                    {rev.tier}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FREQUENTLY ASKED QUESTIONS */}
        <section className="mb-12">
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-heading font-black uppercase tracking-tight text-foreground flex items-center gap-3">
              <span className="size-4 bg-accent-muted border-2 border-border inline-block"></span>
              SIKÇA SORULAN SORULAR
            </h2>
            <p className="text-xs text-muted-foreground font-medium uppercase mt-1">
              Bulut oyunculuğu hakkında aklınıza takılan soruların cevapları
            </p>
          </div>

          <div className="border-[3px] border-border bg-secondary-background p-6 shadow-[6px_6px_0px_0px_var(--border)]">
            <Accordion type="single" collapsible className="w-full space-y-3">
              {faqs.map((faq) => (
                <AccordionItem 
                  key={faq.id} 
                  value={faq.id} 
                  className="border-2 border-border bg-background p-3 shadow-[2px_2px_0px_0px_var(--border)]"
                >
                  <AccordionTrigger className="font-heading font-black text-sm uppercase text-foreground hover:no-underline py-1 text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs text-muted-foreground font-medium pt-2 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </motion.main>

      {/* Interactive Cloud Modals */}
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
