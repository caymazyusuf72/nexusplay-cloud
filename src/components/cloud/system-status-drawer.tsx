"use client";

import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cloudGamingData } from "@/data/cloudGamingData";
import { 
  Server, 
  Wifi, 
  Cpu, 
  Zap, 
  Activity, 
  ShieldCheck, 
  User, 
  Globe, 
  RotateCw, 
  CheckCircle2,
  HardDrive
} from "lucide-react";

interface SystemStatusDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SystemStatusDrawer({ isOpen, onClose }: SystemStatusDrawerProps) {
  const { currentUser, systemStatus } = cloudGamingData;
  const [selectedServer, setSelectedServer] = useState(systemStatus.serverLocation);
  const [isTesting, setIsTesting] = useState(false);
  const [testResults, setTestResults] = useState<{
    ping: string;
    jitter: string;
    download: string;
    packetLoss: string;
    ready: boolean;
  }>({
    ping: systemStatus.latency,
    jitter: "1.2ms",
    download: "148.4 Mbps",
    packetLoss: systemStatus.packetLoss,
    ready: true,
  });

  const servers = [
    { id: "s-1", name: "Frankfurt, TR-1", ping: "12ms", load: "%42", status: "Optimal" },
    { id: "s-2", name: "Istanbul, TR-2", ping: "7ms", load: "%78", status: "Yüksek Talep" },
    { id: "s-3", name: "Amsterdam, EU-1", ping: "18ms", load: "%29", status: "Optimal" },
    { id: "s-4", name: "London, UK-1", ping: "24ms", load: "%35", status: "Optimal" },
  ];

  const handleRunSpeedTest = () => {
    setIsTesting(true);
    setTimeout(() => {
      setTestResults({
        ping: `${Math.floor(8 + Math.random() * 6)}ms`,
        jitter: `${(0.8 + Math.random() * 0.8).toFixed(1)}ms`,
        download: `${Math.floor(140 + Math.random() * 40)}.${Math.floor(Math.random() * 9)} Mbps`,
        packetLoss: "%0.00",
        ready: true,
      });
      setIsTesting(false);
    }, 1800);
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full sm:max-w-md bg-secondary-background border-l-[3px] border-border p-6 overflow-y-auto rounded-none shadow-[-8px_0px_0px_0px_var(--border)] text-foreground">
        <SheetHeader className="p-0 mb-6 border-b-[3px] border-border pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-2xl font-heading font-black uppercase tracking-tight flex items-center gap-2 text-foreground">
              <Server className="text-accent-muted" /> Tanı & Rig Merkezi
            </SheetTitle>
          </div>
          <SheetDescription className="text-xs text-muted-foreground font-medium">
            Gerçek zamanlı sunucu gecikmesi, ağ testi ve kullanıcı donanım durumu.
          </SheetDescription>
        </SheetHeader>

        {/* User Profile Card */}
        <div className="border-[3px] border-border bg-background p-4 mb-6 shadow-[4px_4px_0px_0px_var(--border)]">
          <div className="flex items-center gap-4 mb-3">
            <div className="size-12 bg-accent-muted border-2 border-border flex items-center justify-center text-white font-black text-xl shadow-[2px_2px_0px_0px_var(--border)]">
              {currentUser.username.charAt(0)}
            </div>
            <div>
              <h4 className="font-heading font-bold text-lg uppercase text-foreground">{currentUser.username}</h4>
              <p className="text-xs text-muted-foreground font-mono">ID: {currentUser.id}</p>
            </div>
          </div>
          <div className="flex items-center justify-between pt-3 border-t-2 border-border text-xs font-bold">
            <span className="text-muted-foreground uppercase">Abonelik</span>
            <Badge className="bg-main text-main-foreground rounded-none border border-border text-[11px] font-bold">
              {currentUser.subscriptionTier}
            </Badge>
          </div>
        </div>

        {/* Live Network Benchmark */}
        <div className="border-[3px] border-border bg-background p-4 mb-6 shadow-[4px_4px_0px_0px_var(--border)]">
          <div className="flex items-center justify-between mb-4">
            <span className="font-heading font-bold text-sm uppercase flex items-center gap-2 text-foreground">
              <Wifi size={16} className="text-accent-muted" /> Ağ Analizi (WebRTC)
            </span>
            <Button
              onClick={handleRunSpeedTest}
              disabled={isTesting}
              className="bg-accent-muted text-white border-2 border-border rounded-none text-xs font-bold uppercase py-1 px-3 shadow-[2px_2px_0px_0px_var(--border)] hover:bg-black dark:hover:bg-white dark:hover:text-black hover:text-white"
            >
              {isTesting ? (
                <RotateCw size={12} className="animate-spin mr-1" />
              ) : (
                <Zap size={12} className="mr-1" />
              )}
              {isTesting ? "Ölçülüyor..." : "Test Et"}
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-3">
            <div className="border-2 border-border p-2.5 bg-secondary-background">
              <p className="text-[10px] uppercase font-bold text-muted-foreground">Gecikme (Ping)</p>
              <p className="text-xl font-heading font-black text-accent-muted">{testResults.ping}</p>
            </div>
            <div className="border-2 border-border p-2.5 bg-secondary-background">
              <p className="text-[10px] uppercase font-bold text-muted-foreground">Jitter (Dalgalanma)</p>
              <p className="text-xl font-heading font-black text-foreground">{testResults.jitter}</p>
            </div>
            <div className="border-2 border-border p-2.5 bg-secondary-background">
              <p className="text-[10px] uppercase font-bold text-muted-foreground">İndirme Hızı</p>
              <p className="text-xl font-heading font-black text-foreground">{testResults.download}</p>
            </div>
            <div className="border-2 border-border p-2.5 bg-secondary-background">
              <p className="text-[10px] uppercase font-bold text-muted-foreground">Paket Kaybı</p>
              <p className="text-xl font-heading font-black text-green-500">{testResults.packetLoss}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-bold text-foreground bg-green-500/10 border border-green-500/30 p-2">
            <CheckCircle2 size={14} className="text-green-500 shrink-0" />
            <span>4K 120FPS HDR akış için ağ bağlantınız mükemmel durumda.</span>
          </div>
        </div>

        {/* Server Selection */}
        <div className="border-[3px] border-border bg-background p-4 mb-6 shadow-[4px_4px_0px_0px_var(--border)]">
          <h4 className="font-heading font-bold text-sm uppercase mb-3 flex items-center gap-2 text-foreground">
            <Globe size={16} className="text-accent-muted" /> Sunucu Veri Merkezi
          </h4>
          <div className="space-y-2">
            {servers.map((srv) => (
              <div
                key={srv.id}
                onClick={() => setSelectedServer(srv.name)}
                className={`p-3 border-2 border-border cursor-pointer transition-all flex items-center justify-between text-xs font-bold ${
                  selectedServer === srv.name
                    ? "bg-accent-muted text-white shadow-[3px_3px_0px_0px_var(--border)]"
                    : "bg-secondary-background text-foreground hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                <div>
                  <p className="font-heading uppercase text-sm">{srv.name}</p>
                  <p className="text-[10px] opacity-80">Doluluk: {srv.load} • Durum: {srv.status}</p>
                </div>
                <div className="text-right">
                  <span className="font-mono">{srv.ping}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rig Hardware Specs */}
        <div className="border-[3px] border-border bg-secondary-background text-foreground p-4 shadow-[4px_4px_0px_0px_var(--border)]">
          <h4 className="font-heading font-bold text-sm uppercase mb-3 flex items-center gap-2 text-accent-muted">
            <Cpu size={16} /> Bulut Rig Donanımı
          </h4>
          <div className="space-y-2 text-xs font-mono text-muted-foreground">
            <div className="flex justify-between border-b border-border/20 pb-1">
              <span>GPU:</span>
              <span className="text-foreground font-bold">NVIDIA RTX 4080 (Ada Lovelace)</span>
            </div>
            <div className="flex justify-between border-b border-border/20 pb-1">
              <span>VRAM:</span>
              <span className="text-foreground font-bold">24 GB GDDR6X</span>
            </div>
            <div className="flex justify-between border-b border-border/20 pb-1">
              <span>DLSS Desteği:</span>
              <span className="text-accent-muted font-bold">DLSS 3.5 Frame Gen</span>
            </div>
            <div className="flex justify-between">
              <span>Video Kodlayıcı:</span>
              <span className="text-foreground font-bold">AV1 / NVENC 8th Gen</span>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
