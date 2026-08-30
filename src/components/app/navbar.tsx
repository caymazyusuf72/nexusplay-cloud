"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ThemeSwitcher } from "@/components/app/theme-switcher";
import { 
  Gamepad2, 
  Tv, 
  LayoutGrid, 
  Search, 
  User, 
  Menu, 
  Server, 
  CreditCard,
  Download,
  HelpCircle
} from "lucide-react";
import GameSearchDialog from "@/components/cloud/game-search-dialog";
import SystemStatusDrawer from "@/components/cloud/system-status-drawer";
import GameStreamModal from "@/components/cloud/game-stream-modal";
import ThemePalettePicker from "@/components/cloud/theme-palette-picker";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isStatusOpen, setIsStatusOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeGameToPlay, setActiveGameToPlay] = useState<any>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <div className="fixed left-0 top-0 w-full z-40">
        {/* Interactive System Status Ticker */}
        <div 
          onClick={() => setIsStatusOpen(true)}
          className="bg-accent-muted text-accent-foreground font-semibold text-xs md:text-sm py-1.5 px-4 flex justify-between items-center border-b-[3px] border-black tracking-wide overflow-hidden cursor-pointer hover:bg-black hover:text-white transition-colors select-none"
          title="Sunucu Tanı ve Hız Merkezini Aç"
        >
          <div className="flex items-center gap-4 shrink-0">
            <span className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-white animate-pulse"></span>
              Frankfurt TR-1
            </span>
            <span className="hidden sm:inline font-mono">12ms • RTX 4080 RIG</span>
          </div>

          <div className="animate-marquee whitespace-nowrap text-xs">
            <span>⚡ TIKLA: SUNUCU VE HIZ TESTİ MERKEZİ ⚡ 4K 120FPS GAMING ⚡ SIFIR İNDİRME ⚡</span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 font-bold text-xs uppercase shrink-0">
            <Server size={14} /> Tanı Merkezi
          </div>
        </div>

        {/* Main Navbar */}
        <nav className="flex h-[70px] w-full items-center border-b-[3px] border-black bg-white px-4 md:px-8 shadow-[0px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="mx-auto flex w-full max-w-7xl text-foreground items-center justify-between">
            <div className="flex items-center gap-6 lg:gap-8">
              <Link
                className="flex items-center gap-3 font-heading font-black text-2xl uppercase tracking-tighter hover:scale-105 transition-transform"
                href={"/"}
              >
                <div className="size-10 rounded-none flex bg-accent-muted text-white border-[3px] border-black items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-heading font-black">
                  N
                </div>
                NexusPlay
              </Link>

              {/* Desktop Nav links */}
              <div className="items-center text-xs lg:text-sm font-heading font-bold uppercase tracking-wider gap-5 lg:gap-7 hidden md:flex">
                <Link href="/" className="hover:text-accent-muted transition-colors">
                  Ana Sayfa
                </Link>
                <Link href="/games" className="hover:text-accent-muted transition-colors flex items-center gap-1.5">
                  <Gamepad2 size={16} /> Oyunlar
                </Link>
                <Link href="/pricing" className="hover:text-accent-muted transition-colors flex items-center gap-1.5">
                  <CreditCard size={16} /> Paketler
                </Link>
                <Link href="/download" className="hover:text-accent-muted transition-colors flex items-center gap-1.5">
                  <Download size={16} /> İndir
                </Link>
                <Link href="/streams" className="hover:text-accent-muted transition-colors flex items-center gap-1.5">
                  <Tv size={16} /> Yayın
                </Link>
                <Link href="/support" className="hover:text-accent-muted transition-colors flex items-center gap-1.5">
                  <HelpCircle size={16} /> Destek
                </Link>
              </div>
            </div>

            {/* Actions: Search, Theme Palette Picker, Dark/Light Switcher, Profile, Mobile Menu */}
            <div className="flex items-center gap-2.5 md:gap-4">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="flex items-center gap-2 text-xs font-bold uppercase hover:text-accent-muted transition-colors border-2 border-black bg-background py-2 px-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white"
              >
                <Search size={15} />
                <span className="hidden sm:inline">Ara</span>
                <kbd className="hidden lg:inline bg-white text-black text-[9px] px-1 py-0.5 border border-black font-mono">
                  Ctrl K
                </kbd>
              </button>

              <div className="flex items-center gap-2 border-l-[3px] border-black pl-3 md:pl-4">
                {/* Theme Palette Picker (Terracotta, Cobalt, Forest, Monochrome) */}
                <ThemePalettePicker />

                <ThemeSwitcher />

                <button
                  onClick={() => setIsStatusOpen(true)}
                  className="flex items-center justify-center size-10 bg-white border-[3px] border-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-accent-muted hover:text-white transition-all hover:-translate-y-0.5"
                  title="Kullanıcı & Sunucu Profili"
                >
                  <User size={18} />
                </button>

                {/* Mobile Menu Trigger */}
                <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                  <SheetTrigger asChild>
                    <button className="md:hidden flex items-center justify-center size-10 bg-background border-[3px] border-black rounded-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      <Menu size={20} />
                    </button>
                  </SheetTrigger>
                  <SheetContent side="right" className="bg-background border-l-[3px] border-black p-6">
                    <SheetHeader className="mb-6 border-b-2 border-black pb-4 text-left">
                      <SheetTitle className="font-heading font-black text-xl uppercase">NexusPlay Menü</SheetTitle>
                    </SheetHeader>
                    <div className="flex flex-col gap-3 font-heading font-bold text-base uppercase">
                      <Link 
                        href="/" 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="p-3 border-2 border-black bg-white hover:bg-accent-muted hover:text-white flex items-center gap-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                      >
                        <LayoutGrid size={18} /> Ana Sayfa
                      </Link>
                      <Link 
                        href="/games" 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="p-3 border-2 border-black bg-white hover:bg-accent-muted hover:text-white flex items-center gap-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                      >
                        <Gamepad2 size={18} /> Oyun Kütüphanesi
                      </Link>
                      <Link 
                        href="/pricing" 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="p-3 border-2 border-black bg-white hover:bg-accent-muted hover:text-white flex items-center gap-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                      >
                        <CreditCard size={18} /> Üyelik Paketleri
                      </Link>
                      <Link 
                        href="/download" 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="p-3 border-2 border-black bg-white hover:bg-accent-muted hover:text-white flex items-center gap-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                      >
                        <Download size={18} /> Cihazlar & İndir
                      </Link>
                      <Link 
                        href="/streams" 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="p-3 border-2 border-black bg-white hover:bg-accent-muted hover:text-white flex items-center gap-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                      >
                        <Tv size={18} /> Canlı Yayınlar
                      </Link>
                      <Link 
                        href="/support" 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="p-3 border-2 border-black bg-white hover:bg-accent-muted hover:text-white flex items-center gap-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                      >
                        <HelpCircle size={18} /> Sıkça Sorulan Sorular
                      </Link>
                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          setIsStatusOpen(true);
                        }}
                        className="p-3 border-2 border-black bg-accent-muted text-white flex items-center gap-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-left mt-2"
                      >
                        <Server size={18} /> Tanı & Rig Durumu
                      </button>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </nav>
      </div>

      {/* Global Modals */}
      <GameSearchDialog
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectGameToPlay={(game) => setActiveGameToPlay(game)}
      />

      <SystemStatusDrawer
        isOpen={isStatusOpen}
        onClose={() => setIsStatusOpen(false)}
      />

      <GameStreamModal
        isOpen={Boolean(activeGameToPlay)}
        onClose={() => setActiveGameToPlay(null)}
        game={activeGameToPlay}
      />
    </>
  );
}
