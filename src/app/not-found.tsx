"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Gamepad2, Home, HelpCircle, Zap, Radio, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import FuzzyText from "@/components/ui/fuzzy-text";

export default function NotFound() {
  return (
    <div className="min-h-[100dvh] bg-background text-foreground flex flex-col items-center justify-center px-4 py-16 selection:bg-accent-muted selection:text-white">
      {/* Background Ambience / Grid Overlay */}
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Status Header Badge */}
        <div className="inline-flex items-center gap-2 border-2 border-border bg-secondary-background px-4 py-1.5 shadow-[3px_3px_0px_0px_var(--border)] mb-8">
          <Radio size={16} className="text-accent-muted animate-pulse" />
          <span className="text-xs font-heading font-black uppercase tracking-wider text-foreground">
            SİNYAL KESİNTİSİ // PROTOKOL: 404_DESYNC
          </span>
        </div>

        {/* Big Fuzzy 404 Header */}
        <div className="my-2 flex justify-center items-center overflow-hidden max-w-full">
          <FuzzyText
            baseIntensity={0.25}
            hoverIntensity={0.65}
            enableHover={true}
            glitchMode={true}
            glitchInterval={2500}
            glitchDuration={250}
            color="var(--main)"
            fontSize="clamp(5rem, 18vw, 12rem)"
            fontWeight={900}
            direction="both"
            fuzzRange={24}
            className="cursor-pointer"
          >
            404
          </FuzzyText>
        </div>

        {/* Fuzzy Subtitle */}
        <div className="my-2 overflow-hidden max-w-full">
          <FuzzyText
            baseIntensity={0.12}
            hoverIntensity={0.4}
            enableHover={true}
            color="var(--foreground)"
            fontSize="clamp(1.2rem, 3.5vw, 2rem)"
            fontWeight={900}
            direction="horizontal"
            fuzzRange={14}
            className="cursor-pointer"
          >
            BULUT AKIŞI BULUNAMADI
          </FuzzyText>
        </div>

        {/* Descriptive Text Card */}
        <div className="border-[3px] border-border bg-secondary-background p-6 md:p-8 max-w-2xl mt-6 mb-8 shadow-[6px_6px_0px_0px_var(--border)]">
          <p className="text-sm sm:text-base font-bold text-foreground leading-relaxed mb-4">
            Aradığınız sayfa, oyun oturumu veya kaynak NexusPlay sunucu kümesinde mevcut değil. 
            URL adresini kontrol edebilir veya doğrudan oyun merkezine dönebilirsiniz.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 pt-3 border-t-2 border-border/20 text-xs font-heading font-bold text-muted-foreground uppercase">
            <span>Bölge: TR-1 Frankfurt</span>
            <span>•</span>
            <span>Gecikme: 11ms</span>
            <span>•</span>
            <span>Durum: Çevrimdışı Oturum</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 w-full max-w-xl">
          <Link href="/" className="w-full sm:w-auto flex-1">
            <Button className="w-full bg-accent-muted text-white border-2 border-border rounded-none font-heading font-black text-sm uppercase py-6 shadow-[4px_4px_0px_0px_var(--border)] hover:bg-black dark:hover:bg-white dark:hover:text-black hover:text-white transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
              <Home size={18} />
              Ana Sayfaya Dön
            </Button>
          </Link>

          <Link href="/games" className="w-full sm:w-auto flex-1">
            <Button className="w-full bg-secondary-background text-foreground border-2 border-border rounded-none font-heading font-black text-sm uppercase py-6 shadow-[4px_4px_0px_0px_var(--border)] hover:bg-accent-muted hover:text-white transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
              <Gamepad2 size={18} />
              Oyun Kütüphanesi
            </Button>
          </Link>

          <Link href="/support" className="w-full sm:w-auto">
            <Button className="w-full bg-secondary-background text-foreground border-2 border-border rounded-none font-heading font-black text-sm uppercase py-6 shadow-[4px_4px_0px_0px_var(--border)] hover:bg-accent-muted hover:text-white transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2">
              <HelpCircle size={18} />
              Destek Al
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
