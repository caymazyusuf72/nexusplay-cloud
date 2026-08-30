"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Play, 
  Star, 
  Users, 
  Activity, 
  Gamepad2, 
  Cpu, 
  Layers, 
  ShieldCheck,
  Check
} from "lucide-react";

interface GameDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  game: any;
  onPlay: (game: any) => void;
}

export default function GameDetailModal({
  isOpen,
  onClose,
  game,
  onPlay,
}: GameDetailModalProps) {
  const [qualityPreset, setQualityPreset] = useState<"balanced" | "competitive" | "ultra">("ultra");
  const [rayTracing, setRayTracing] = useState(true);
  const [dlss, setDlss] = useState(true);

  if (!game) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl w-full p-0 overflow-hidden bg-background border-[3px] border-border rounded-none shadow-[8px_8px_0px_0px_var(--border)] text-foreground">
        <DialogTitle className="sr-only">{game.title} - Detaylar ve Bulut Ayarları</DialogTitle>
        <DialogDescription className="sr-only">Oyun detayları, Ray Tracing ayarları ve bulut önayarları</DialogDescription>

        {/* Hero Header Banner */}
        <div className="relative h-60 overflow-hidden border-b-[3px] border-border bg-black">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={game.coverImage || game.thumbnail}
            alt={game.title}
            className="w-full h-full object-cover opacity-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
            <div>
              <div className="flex gap-2 mb-2">
                {game.tags?.map((t: string, i: number) => (
                  <Badge key={i} className="bg-white text-black border border-black rounded-none font-bold text-[10px] uppercase">
                    {t}
                  </Badge>
                ))}
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-black uppercase text-white drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
                {game.title}
              </h2>
              <p className="text-xs text-gray-300 font-bold uppercase">{game.developer}</p>
            </div>

            <div className="flex items-center gap-2 bg-black text-white px-3 py-1.5 border-2 border-white text-sm font-bold">
              <Star size={14} fill="currentColor" className="text-accent-muted" />
              {game.rating} / 5.0
            </div>
          </div>
        </div>

        {/* Configuration Body */}
        <div className="p-6 space-y-6 max-h-[400px] overflow-y-auto bg-background">
          {/* Cloud Stream Quality Presets */}
          <div>
            <h4 className="font-heading font-bold text-sm uppercase mb-3 flex items-center gap-2 text-foreground">
              <Layers size={16} className="text-accent-muted" /> Bulut Akış Profili (Stream Profile)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: "balanced", name: "Dengeli", res: "1080p 60 FPS", bitrate: "25 Mbps" },
                { id: "competitive", name: "Rekabetçi", res: "1080p 240 FPS", bitrate: "35 Mbps" },
                { id: "ultra", name: "Sinematik Ultra", res: "4K 120 FPS HDR", bitrate: "50 Mbps" },
              ].map((preset) => (
                <div
                  key={preset.id}
                  onClick={() => setQualityPreset(preset.id as any)}
                  className={`p-3 border-2 border-border cursor-pointer transition-all ${
                    qualityPreset === preset.id
                      ? "bg-accent-muted text-white shadow-[3px_3px_0px_0px_var(--border)]"
                      : "bg-secondary-background text-foreground hover:bg-black/5 dark:hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-heading font-bold text-sm uppercase">{preset.name}</p>
                    {qualityPreset === preset.id && <Check size={14} />}
                  </div>
                  <p className="text-xs font-mono font-bold">{preset.res}</p>
                  <p className="text-[10px] opacity-80 mt-0.5">{preset.bitrate}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Graphics Rig Switches */}
          <div className="border-2 border-border bg-secondary-background p-4">
            <h4 className="font-heading font-bold text-sm uppercase mb-3 flex items-center gap-2 text-foreground">
              <Cpu size={16} className="text-accent-muted" /> Donanım Optimizasyonu (RTX 4080)
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div 
                onClick={() => setRayTracing(!rayTracing)}
                className="flex items-center justify-between p-3 border border-border bg-background cursor-pointer hover:bg-black/5 dark:hover:bg-white/5"
              >
                <div>
                  <p className="font-bold text-xs uppercase text-foreground">Ray Tracing (Işın İzleme)</p>
                  <p className="text-[10px] text-muted-foreground">Ultra gerçekçi yansıma & gölgeler</p>
                </div>
                <div className={`size-5 border-2 border-border flex items-center justify-center font-bold text-xs ${rayTracing ? "bg-accent-muted text-white" : "bg-secondary-background text-foreground"}`}>
                  {rayTracing && "✓"}
                </div>
              </div>

              <div 
                onClick={() => setDlss(!dlss)}
                className="flex items-center justify-between p-3 border border-border bg-background cursor-pointer hover:bg-black/5 dark:hover:bg-white/5"
              >
                <div>
                  <p className="font-bold text-xs uppercase text-foreground">DLSS 3.5 Frame Gen</p>
                  <p className="text-[10px] text-muted-foreground">Yapay zeka kare üretimi & düşük gecikme</p>
                </div>
                <div className={`size-5 border-2 border-border flex items-center justify-center font-bold text-xs ${dlss ? "bg-accent-muted text-white" : "bg-secondary-background text-foreground"}`}>
                  {dlss && "✓"}
                </div>
              </div>
            </div>
          </div>

          {/* Cloud Requirements info */}
          <div className="flex flex-wrap gap-4 text-xs font-bold text-foreground bg-secondary-background border-2 border-border p-3 justify-between">
            <span className="flex items-center gap-1.5"><Activity size={14} className="text-accent-muted" /> Tahmini Yükleme: {game.estimatedLoadTime || "3 saniye"}</span>
            <span className="flex items-center gap-1.5"><ShieldCheck size={14} className="text-accent-muted" /> Bulut Kaydı (Cloud Save): Aktif</span>
            <span className="flex items-center gap-1.5"><Gamepad2 size={14} className="text-accent-muted" /> Gamepad Desteği: Tam Uyumlu</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-secondary-background border-t-[3px] border-border p-4 flex items-center justify-between">
          <Button
            onClick={onClose}
            className="border-2 border-border bg-background text-foreground hover:bg-black dark:hover:bg-white dark:hover:text-black hover:text-white rounded-none font-bold uppercase text-xs px-5 py-2 shadow-[2px_2px_0px_0px_var(--border)]"
          >
            Kapat
          </Button>

          <Button
            onClick={() => {
              onClose();
              onPlay(game);
            }}
            className="bg-accent-muted text-white border-2 border-border rounded-none font-heading font-black text-sm uppercase px-8 py-3 shadow-[4px_4px_0px_0px_var(--border)] hover:bg-black dark:hover:bg-white dark:hover:text-black hover:text-white flex items-center gap-2"
          >
            <Play size={16} fill="currentColor" /> Bulutta Başlat
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
