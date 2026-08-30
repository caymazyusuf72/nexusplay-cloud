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
      <SheetContent className="w-full sm:max-w-md bg-background border-l-[3px] border-black p-6 overflow-y-auto rounded-none shadow-[-8px_0px_0px_0px_rgba(0,0,0,1)]">
        <SheetHeader className="p-0 mb-6 border-b-[3px] border-black pb-4">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-2xl font-heading font-black uppercase tracking-tight flex items-center gap-2">
              <Server className="text-accent-muted" /> Tanı & Rig Merkezi
            </SheetTitle>
          </div>
          <SheetDescription className="text-xs text-gray-600 font-medium">
            Gerçek zamanlı sunucu gecikmesi, ağ testi ve kullanıcı donanım durumu.
          </SheetDescription>
        </SheetHeader>

        {/* User Profile Card */}
        <div className="border-[3px] border-black bg-white p-4 mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center gap-4 mb-3">
            <div className="size-12 bg-accent-muted border-2 border-black flex items-center justify-center text-white font-black text-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              {currentUser.username.charAt(0)}
            </div>
            <div>
              <h4 className="font-heading font-bold text-lg uppercase text-black">{currentUser.username}</h4>
              <p className="text-xs text-gray-600 font-mono">ID: {currentUser.id}</p>
            </div>
          </div>
          <div className="flex items-center justify-between pt-3 border-t-2 border-black text-xs font-bold">
            <span className="text-gray-600 uppercase">Abonelik</span>
            <Badge className="bg-black text-white rounded-none border border-black text-[11px] font-bold">
              {currentUser.subscriptionTier}
            </Badge>
          </div>
        </div>

        {/* Live Network Benchmark */}
        <div className="border-[3px] border-black bg-white p-4 mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center justify-between mb-4">
            <span className="font-heading font-bold text-sm uppercase flex items-center gap-2">
              <Wifi size={16} className="text-accent-muted" /> Ağ Analizi (WebRTC)
            </span>
            <Button
              onClick={handleRunSpeedTest}
              disabled={isTesting}
              className="bg-accent-muted text-white border-2 border-black rounded-none text-xs font-bold uppercase py-1 px-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white"
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
            <div className="border-2 border-black p-2.5 bg-background">
              <p className="text-[10px] uppercase font-bold text-gray-600">Gecikme (Ping)</p>
              <p className="text-xl font-heading font-black text-accent-muted">{testResults.ping}</p>
            </div>
            <div className="border-2 border-black p-2.5 bg-background">
              <p className="text-[10px] uppercase font-bold text-gray-600">Jitter (Dalgalanma)</p>
              <p className="text-xl font-heading font-black text-black">{testResults.jitter}</p>
            </div>
            <div className="border-2 border-black p-2.5 bg-background">
              <p className="text-[10px] uppercase font-bold text-gray-600">İndirme Hızı</p>
              <p className="text-xl font-heading font-black text-black">{testResults.download}</p>
            </div>
            <div className="border-2 border-black p-2.5 bg-background">
              <p className="text-[10px] uppercase font-bold text-gray-600">Paket Kaybı</p>
              <p className="text-xl font-heading font-black text-green-700">{testResults.packetLoss}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-bold text-gray-700 bg-green-100 border border-green-800 p-2">
            <CheckCircle2 size={14} className="text-green-800 shrink-0" />
            <span>4K 120FPS HDR akış için ağ bağlantınız mükemmel durumda.</span>
          </div>
        </div>

        {/* Server Selection */}
        <div className="border-[3px] border-black bg-white p-4 mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <h4 className="font-heading font-bold text-sm uppercase mb-3 flex items-center gap-2">
            <Globe size={16} className="text-accent-muted" /> Sunucu Veri Merkezi
          </h4>
          <div className="space-y-2">
            {servers.map((srv) => (
              <div
                key={srv.id}
                onClick={() => setSelectedServer(srv.name)}
                className={`p-3 border-2 border-black cursor-pointer transition-all flex items-center justify-between text-xs font-bold ${
                  selectedServer === srv.name
                    ? "bg-accent-muted text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                    : "bg-background text-black hover:bg-gray-100"
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
        <div className="border-[3px] border-black bg-black text-white p-4 shadow-[4px_4px_0px_0px_rgba(212,108,78,1)]">
          <h4 className="font-heading font-bold text-sm uppercase mb-3 flex items-center gap-2 text-accent-muted">
            <Cpu size={16} /> Bulut Rig Donanımı
          </h4>
          <div className="space-y-2 text-xs font-mono text-gray-300">
            <div className="flex justify-between border-b border-gray-800 pb-1">
              <span>GPU:</span>
              <span className="text-white font-bold">NVIDIA RTX 4080 (Ada Lovelace)</span>
            </div>
            <div className="flex justify-between border-b border-gray-800 pb-1">
              <span>VRAM:</span>
              <span className="text-white font-bold">24 GB GDDR6X</span>
            </div>
            <div className="flex justify-between border-b border-gray-800 pb-1">
              <span>DLSS Desteği:</span>
              <span className="text-accent-muted font-bold">DLSS 3.5 Frame Gen</span>
            </div>
            <div className="flex justify-between">
              <span>Video Kodlayıcı:</span>
              <span className="text-white font-bold">AV1 / NVENC 8th Gen</span>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
