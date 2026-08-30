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
      <DialogContent className={`max-w-5xl w-full p-0 overflow-hidden bg-background border-[3px] border-black rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] ${isFullscreen ? "fixed inset-0 max-w-none w-screen h-screen z-[100]" : ""}`}>
        <DialogTitle className="sr-only">{game.title} - Cloud Gaming Session</DialogTitle>
        <DialogDescription className="sr-only">Live interactive cloud gaming session for {game.title}</DialogDescription>

        {/* Top Control Header */}
        <div className="bg-black text-white px-4 py-3 border-b-[3px] border-black flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="size-3 bg-accent-muted rounded-full animate-pulse"></span>
            <span className="font-heading font-bold text-sm tracking-wider uppercase">{game.title}</span>
            <Badge className="bg-white/20 text-white rounded-none border border-white/30 text-[10px] font-bold">
              RTX 4080 RIG
            </Badge>
          </div>

          <div className="flex items-center gap-2">
            {stage === "streaming" && (
              <>
                <div className="hidden sm:flex items-center gap-4 text-xs font-mono text-gray-300 mr-4">
                  <span className="flex items-center gap-1 text-white font-bold">
                    <Activity size={13} className="text-accent-muted" /> {fps} FPS
                  </span>
                  <span className="flex items-center gap-1">
                    <Wifi size={13} /> {ping}ms
                  </span>
                  <span>{bitrate} Mbps</span>
                </div>

                <button 
                  onClick={() => setIsMuted(!isMuted)} 
                  className="p-1.5 hover:bg-white/20 transition-colors border border-white/30 text-white"
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>

                <button 
                  onClick={() => setIsFullscreen(!isFullscreen)} 
                  className="p-1.5 hover:bg-white/20 transition-colors border border-white/30 text-white"
                  title="Toggle Fullscreen"
                >
                  {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                </button>
              </>
            )}

            <button 
              onClick={onClose}
              className="p-1.5 bg-accent-muted text-white hover:bg-white hover:text-black transition-colors border border-black font-bold"
              title="Exit Game Session"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Main Interactive Screen Area */}
        <div className="relative bg-black min-h-[420px] md:min-h-[540px] flex items-center justify-center overflow-hidden">
          {stage !== "streaming" ? (
            /* Loading & Allocation Screen */
            <div className="flex flex-col items-center justify-center p-8 text-center max-w-md w-full">
              <div className="size-20 bg-white border-[3px] border-black flex items-center justify-center mb-6 shadow-[4px_4px_0px_0px_rgba(212,108,78,1)] animate-bounce">
                <Cpu size={36} className="text-black" />
              </div>

              <h3 className="font-heading font-black text-2xl uppercase tracking-tight text-white mb-2">
                {stage === "allocating" ? "Rig Tahsis Ediliyor..." : "WebRTC Bağlantısı Kuruluyor..."}
              </h3>
              <p className="text-gray-400 text-sm mb-6">
                {stage === "allocating" ? "Frankfurt TR-1 veri merkezinde RTX 4080 slotu rezerve ediliyor." : "Ultra düşük gecikmeli 4K 120FPS video akışı başlatılıyor."}
              </p>

              {/* Brutalist Progress Bar */}
              <div className="w-full bg-gray-800 border-2 border-white/50 h-5 p-0.5 shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
                <div 
                  className="bg-accent-muted h-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

              <div className="mt-4 flex items-center justify-between w-full text-xs font-mono text-gray-400">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} className={progress >= 25 ? "text-accent-muted" : "text-gray-600"} /> Rig Ayrıldı
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} className={progress >= 65 ? "text-accent-muted" : "text-gray-600"} /> Ağ Doğrulandı
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} className={progress >= 100 ? "text-accent-muted" : "text-gray-600"} /> Akış Hazır
                </span>
              </div>
            </div>
          ) : (
            /* Active Game Stream Viewport */
            <div className="relative w-full h-full flex flex-col items-center justify-center group">
              {/* Simulated Game Video Background */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={game.coverImage || game.thumbnail} 
                alt={game.title}
                className="w-full h-full object-cover opacity-90 transition-all duration-700"
              />

              {/* In-Game Brutalist Stream Overlay (HUD) */}
              <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm border-2 border-white text-white p-3 shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] pointer-events-none">
                <div className="flex items-center gap-3 text-xs font-mono">
                  <span className="font-bold text-accent-muted uppercase">Nexus Stream</span>
                  <span>4K UHD (3840x2160)</span>
                  <span>HDR: ON</span>
                  <span>DLSS 3.5 Frame Gen</span>
                </div>
              </div>

              {/* Interactive Virtual Controls Overlay */}
              <div className="absolute bottom-6 left-6 bg-black/85 backdrop-blur-md border-2 border-white p-4 shadow-[4px_4px_0px_0px_rgba(212,108,78,1)] text-white max-w-sm hidden sm:block">
                <div className="flex items-center gap-2 mb-2 font-heading font-bold text-xs uppercase tracking-wider text-accent-muted">
                  <Gamepad2 size={16} /> Giriş Testi (Klavye / Gamepad)
                </div>
                <div className="flex gap-2 text-xs font-mono">
                  {["W", "A", "S", "D", "SPACE", "SHIFT"].map((k) => (
                    <div 
                      key={k}
                      className={`px-2 py-1 border border-white text-center font-bold transition-all ${pressedKey === k ? "bg-accent-muted text-white translate-y-0.5" : "bg-black/50 text-gray-300"}`}
                    >
                      {k}
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-gray-400 mt-2">
                  Klavyenizdeki tuşlara basarak bulut tepki süresini test edebilirsiniz.
                </p>
              </div>

              {/* Game Pause / Resume Menu trigger */}
              <div className="absolute bottom-6 right-6 flex items-center gap-3">
                <Button 
                  onClick={onClose}
                  className="bg-accent-muted text-white border-2 border-black rounded-none font-heading font-bold uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-white hover:text-black text-xs py-2 px-4"
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
