"use client";

import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Activity, 
  Maximize2, 
  Minimize2, 
  Volume2, 
  VolumeX, 
  Gamepad2, 
  Wifi, 
  X, 
  Cpu, 
  Settings2,
  CheckCircle2
} from "lucide-react";

interface GameStreamModalProps {
  isOpen: boolean;
  onClose: () => void;
  game: {
    title: string;
    developer: string;
    coverImage?: string;
    thumbnail?: string;
    rating?: number;
    genre?: string;
  } | null;
}

export default function GameStreamModal({ isOpen, onClose, game }: GameStreamModalProps) {
  const [stage, setStage] = useState<"allocating" | "connecting" | "streaming">("allocating");
  const [progress, setProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [fps, setFps] = useState(120);
  const [ping, setPing] = useState(12);
  const [bitrate, setBitrate] = useState(48.5);
  const [pressedKey, setPressedKey] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setStage("allocating");
      setProgress(0);
      return;
    }

    // Step 1: Allocating Rig
    setStage("allocating");
    setProgress(25);

    const t1 = setTimeout(() => {
      setProgress(65);
      setStage("connecting");
    }, 1200);

    const t2 = setTimeout(() => {
      setProgress(100);
      setStage("streaming");
    }, 2400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isOpen]);

  // Live stat fluctuation simulation for realistic Cloud Gaming feel
  useEffect(() => {
    if (stage !== "streaming") return;

    const interval = setInterval(() => {
      setFps(Math.floor(118 + Math.random() * 4));
      setPing(Math.floor(11 + Math.random() * 3));
      setBitrate(+(47.5 + Math.random() * 2).toFixed(1));
    }, 1500);

    const handleKeyDown = (e: KeyboardEvent) => {
      setPressedKey(e.key.toUpperCase());
      setTimeout(() => setPressedKey(null), 300);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [stage]);

  if (!game) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className={`max-w-5xl w-full p-0 overflow-hidden bg-background border-[3px] border-border rounded-none shadow-[8px_8px_0px_0px_var(--border)] text-foreground ${isFullscreen ? "fixed inset-0 max-w-none w-screen h-screen z-[100]" : ""}`}>
        <DialogTitle className="sr-only">{game.title} - Cloud Gaming Session</DialogTitle>
        <DialogDescription className="sr-only">Live interactive cloud gaming session for {game.title}</DialogDescription>

        {/* Modal Top Control Bar */}
        <div className="bg-secondary-background text-foreground px-4 py-3 border-b-[3px] border-border flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="size-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-heading font-black text-sm uppercase tracking-wide">{game.title}</span>
            <span className="text-xs text-muted-foreground font-mono hidden sm:inline">• Frankfurt TR-1 Rig</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-1.5 bg-background text-foreground hover:bg-black dark:hover:bg-white dark:hover:text-black hover:text-white transition-colors border border-border"
              title={isMuted ? "Sesi Aç" : "Sesi Kapat"}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>

            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 bg-background text-foreground hover:bg-black dark:hover:bg-white dark:hover:text-black hover:text-white transition-colors border border-border"
              title={isFullscreen ? "Küçült" : "Tam Ekran"}
            >
              {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 bg-accent-muted text-white hover:bg-black dark:hover:bg-white dark:hover:text-black transition-colors border border-border font-bold ml-2"
              title="Oturumu Sonlandır"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Stream Viewport & Stage Manager */}
        <div className={`relative bg-black flex flex-col items-center justify-center overflow-hidden ${isFullscreen ? "h-[calc(100vh-50px)]" : "h-[480px] md:h-[540px]"}`}>
          {stage !== "streaming" ? (
            /* Allocation & Handshake loader */
            <div className="text-center p-8 max-w-md w-full text-white z-10">
              <div className="size-20 border-[3px] border-white bg-accent-muted flex items-center justify-center mx-auto mb-6 shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                {stage === "allocating" ? (
                  <Cpu size={36} className="animate-pulse" />
                ) : (
                  <Wifi size={36} className="animate-bounce" />
                )}
              </div>

              <h3 className="text-2xl font-heading font-black uppercase mb-2">
                {stage === "allocating" ? "RTX 4080 Rig Tahsis Ediliyor" : "WebRTC Bağlantısı Kuruluyor"}
              </h3>
              <p className="text-xs text-gray-300 font-mono mb-6">
                {stage === "allocating"
                  ? "Bulut sunucusunda sanal bellek ve GPU çekirdekleri ayrılıyor..."
                  : "Ultra düşük gecikmeli görüntü akış protokolü başlatılıyor..."}
              </p>

              {/* Neobrutalist Progress Bar */}
              <div className="w-full h-5 border-2 border-white bg-neutral-900 p-0.5 mb-2">
                <div
                  className="h-full bg-accent-muted transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <span className="text-xs font-mono font-bold text-gray-400">%{progress} Tamamlandı</span>
            </div>
          ) : (
            /* Live Stream Active */
            <div className="relative w-full h-full">
              {/* Fake Interactive Game Canvas / Background Image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={game.coverImage || game.thumbnail}
                alt={game.title}
                className="w-full h-full object-cover select-none"
              />
              <div className="absolute inset-0 bg-black/10"></div>

              {/* Realtime Stream HUD Overlay (Top-Left) */}
              <div className="absolute top-4 left-4 z-20 flex flex-wrap gap-2">
                <div className="bg-black/90 text-white border-2 border-white px-2.5 py-1 text-xs font-mono flex items-center gap-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <span className="size-2 rounded-full bg-green-500 animate-pulse"></span>
                  <span className="font-bold text-green-400">{fps} FPS</span>
                </div>

                <div className="bg-black/90 text-white border-2 border-white px-2.5 py-1 text-xs font-mono flex items-center gap-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <span>PING:</span>
                  <span className="font-bold text-yellow-400">{ping} ms</span>
                </div>

                <div className="bg-black/90 text-white border-2 border-white px-2.5 py-1 text-xs font-mono flex items-center gap-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <span>BITRATE:</span>
                  <span className="font-bold">{bitrate} Mbps</span>
                </div>

                <div className="bg-black/90 text-white border-2 border-white px-2.5 py-1 text-xs font-mono flex items-center gap-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                  <span>4K 120Hz HDR</span>
                </div>
              </div>

              {/* Keyboard Reactivity Display (Bottom-Center) */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 bg-black/80 border-2 border-white px-4 py-2 flex items-center gap-3 text-white text-xs font-bold uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <Gamepad2 size={16} className="text-accent-muted" />
                <span>Giriş Testi: Klavye / Gamepad tuşlarına basın</span>
                {pressedKey && (
                  <span className="bg-accent-muted text-white px-2 py-0.5 border border-white font-mono text-xs animate-ping">
                    {pressedKey}
                  </span>
                )}
              </div>

              {/* End Session Button (Bottom-Right) */}
              <div className="absolute bottom-6 right-6 z-20">
                <Button
                  onClick={onClose}
                  className="bg-accent-muted text-white border-2 border-white rounded-none font-heading font-black text-xs uppercase px-4 py-2 shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] hover:bg-white hover:text-black"
                >
                  Oturumu Kapat
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
