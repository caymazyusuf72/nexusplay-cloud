"use client";

import React from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cloudGamingData } from "@/data/cloudGamingData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  Monitor, 
  Apple, 
  Smartphone, 
  Tv, 
  Gamepad2, 
  Laptop, 
  Wifi,
} from "lucide-react";
import TextLoop from "@/components/ui/text-loop";

export default function DownloadPage() {
  const { supportedDevices } = cloudGamingData;
  const shouldReduceMotion = useReducedMotion();

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.4, ease: "easeOut" } 
    }
  };

  const getIcon = (id: string) => {
    if (id.includes("pc")) return <Monitor size={36} />;
    if (id.includes("mac") || id.includes("ios")) return <Apple size={36} />;
    if (id.includes("android")) return <Smartphone size={36} />;
    if (id.includes("tv")) return <Tv size={36} />;
    return <Gamepad2 size={36} />;
  };

  return (
    <div className="min-h-[100dvh] bg-background text-foreground pt-36 pb-32">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="bg-accent-muted text-white border-2 border-border rounded-none font-bold uppercase py-1 px-4 text-xs mb-3 shadow-[2px_2px_0px_0px_var(--border)]">
            ÇOKLU CİHAZ EKOSİSTEMİ
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-black uppercase tracking-tight text-foreground mb-4">
            Her Ekranda NexusPlay Gücü
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground font-medium">
            PC, Mac, Akıllı TV veya telefonun... Bulut istemcimizi indir veya doğrudan tarayıcı üzerinden sıfır gecikmeyle oyna.
          </p>
        </div>

        {/* Devices Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20 max-w-6xl mx-auto">
          {supportedDevices.map((dev) => (
            <motion.div
              key={dev.id}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              whileHover={{ y: shouldReduceMotion ? 0 : -4 }}
              className="border-[3px] border-border bg-secondary-background p-6 rounded-none shadow-[6px_6px_0px_0px_var(--border)] flex flex-col justify-between group hover:shadow-[8px_8px_0px_0px_var(--accent-muted)] transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="size-14 bg-background border-2 border-border flex items-center justify-center text-foreground group-hover:bg-accent-muted group-hover:text-white transition-colors shadow-[2px_2px_0px_0px_var(--border)]">
                    {getIcon(dev.id)}
                  </div>
                  <Badge className="bg-background text-foreground border border-border text-[10px] font-mono">
                    {dev.badge}
                  </Badge>
                </div>

                <h3 className="font-heading font-black text-2xl uppercase text-foreground mb-1">
                  {dev.name}
                </h3>
                <p className="text-xs text-muted-foreground font-medium mb-4">
                  {dev.desc}
                </p>

                <div className="bg-background border-2 border-border p-3 mb-6 space-y-1 text-xs font-mono">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Gereksinim:</span>
                    <span className="font-bold text-foreground">{dev.requirements}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Kurulum:</span>
                    <span className="font-bold text-accent-muted">Tek Tıkla Hazır</span>
                  </div>
                </div>
              </div>

              <Button
                className="w-full bg-accent-muted text-white border-2 border-border rounded-none font-heading font-black text-xs uppercase py-5 shadow-[3px_3px_0px_0px_var(--border)] hover:bg-black dark:hover:bg-white dark:hover:text-black hover:text-white flex items-center justify-center gap-2"
                onClick={() => alert(`${dev.name} için NexusPlay İstemcisi başlatılıyor...`)}
              >
                <Download size={14} /> İstemciyi Başlat
              </Button>
            </motion.div>
          ))}
        </div>

        {/* ECOSYSTEM TEXT LOOP */}
        <div className="max-w-6xl mx-auto mb-16 overflow-hidden border-[3px] border-border bg-secondary-background shadow-[6px_6px_0px_0px_var(--border)] py-4">
          <TextLoop
            text="HER CİHAZDA ✦ WINDOWS ✦ MACOS ✦ ANDROID ✦ IOS SAFARI PWA ✦ SMART TV ✦ STEAM DECK"
            shape="wave"
            speed={80}
            direction="forward"
            separator="✦"
            curviness={45}
            fontSize={30}
            fontWeight={900}
            letterSpacing={2}
            uppercase
            color="#ffffff"
            ribbon
            ribbonColor="var(--main)"
            ribbonWidth={68}
            pauseOnHover
          />
        </div>

        {/* System & Bandwidth Requirements Banner */}
        <div className="max-w-6xl mx-auto border-[3px] border-border bg-secondary-background p-6 md:p-8 shadow-[8px_8px_0px_0px_var(--border)]">
          <h3 className="font-heading font-black text-2xl uppercase text-foreground mb-4 flex items-center gap-2">
            <Wifi className="text-accent-muted" /> Önerilen Ağ ve İnternet Gereksinimleri
          </h3>
          <p className="text-xs text-muted-foreground font-bold uppercase mb-6">
            NexusPlay ultra düşük gecikmeli WebRTC protokolü ile optimize edilmiştir.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="border-2 border-border bg-background p-4 shadow-[3px_3px_0px_0px_var(--border)]">
              <h4 className="font-heading font-black text-sm uppercase text-foreground mb-1">720p 60 FPS</h4>
              <p className="text-2xl font-heading font-black text-accent-muted mb-2">15 Mbps</p>
              <p className="text-xs text-muted-foreground font-medium">Mobil ve hücresel 4.5G/5G bağlantılar için ideal temel paket.</p>
            </div>

            <div className="border-2 border-border bg-background p-4 shadow-[3px_3px_0px_0px_var(--border)]">
              <h4 className="font-heading font-black text-sm uppercase text-foreground mb-1">1080p 60 FPS</h4>
              <p className="text-2xl font-heading font-black text-accent-muted mb-2">25 Mbps</p>
              <p className="text-xs text-muted-foreground font-medium">Full HD sinematik ve dengeli oyun için önerilen bant genişliği.</p>
            </div>

            <div className="border-2 border-border bg-background p-4 shadow-[3px_3px_0px_0px_var(--border)]">
              <h4 className="font-heading font-black text-sm uppercase text-foreground mb-1">4K 120 FPS HDR</h4>
              <p className="text-2xl font-heading font-black text-accent-muted mb-2">50+ Mbps</p>
              <p className="text-xs text-muted-foreground font-medium">RTX 4080 Rig gücünü eksiksiz yaşamak için 5GHz Wi-Fi veya Ethernet.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
