"use client";

import React, { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Eye, 
  Send, 
  Heart, 
  Flame, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Minimize2, 
  X,
  MessageSquare,
  Users
} from "lucide-react";

interface StreamPlayerModalProps {
  isOpen: boolean;
  onClose: () => void;
  stream: {
    id: string;
    streamer: string;
    game: string;
    viewers: number;
    thumbnail: string;
  } | null;
}

export default function StreamPlayerModal({
  isOpen,
  onClose,
  stream,
}: StreamPlayerModalProps) {
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState<Array<{ id: number; user: string; text: string; color: string }>>([
    { id: 1, user: "CloudGamer99", text: "Bu grafikler gerçek mi ya RTX 4080 fena akıyor!", color: "#d46c4e" },
    { id: 2, user: "NeoZero", text: "Gecikme sıfır gibi görünüyor helal olsun", color: "#000000" },
    { id: 3, user: "Vortex_TR", text: "Frankfurt sunucusundan mı oynuyorsun?", color: "#d46c4e" },
    { id: 4, user: "PixelKnight", text: "Hadi o bossu tekte alırsın!", color: "#000000" },
  ]);
  const [inputMsg, setInputMsg] = useState("");
  const [likes, setLikes] = useState(842);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat and inject random mock chat messages periodically
  useEffect(() => {
    if (!isOpen) return;

    const mockPool = [
      "Vay be 120 FPS cam gibi!",
      "Hemen ben de deneyeceğim bu oyunu",
      "Bulut oyunculuk harbiden geleceğin kendisi",
      "Klavye tepki süresi efsane!",
      "Çözünürlük 4K mı şu an?",
      "NexusPlay sunucuları bayağı iyi çalışıyor",
    ];

    const interval = setInterval(() => {
      const randomText = mockPool[Math.floor(Math.random() * mockPool.length)];
      const randomUser = `User_${Math.floor(100 + Math.random() * 900)}`;
      setMessages((prev) => [
        ...prev.slice(-20),
        {
          id: Date.now(),
          user: randomUser,
          text: randomText,
          color: Math.random() > 0.5 ? "#d46c4e" : "#000000",
        },
      ]);
    }, 3500);

    return () => clearInterval(interval);
  }, [isOpen]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        user: "PixelHunter (Sen)",
        text: inputMsg,
        color: "#d46c4e",
      },
    ]);
    setInputMsg("");
  };

  if (!stream) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl w-full p-0 overflow-hidden bg-background border-[3px] border-black rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <DialogTitle className="sr-only">{stream.streamer} - Canlı Yayın</DialogTitle>
        <DialogDescription className="sr-only">{stream.streamer} tarafından oynanan {stream.game} canlı yayını</DialogDescription>

        {/* Header */}
        <div className="bg-black text-white px-4 py-3 border-b-[3px] border-black flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-red-600 text-white font-bold text-[10px] px-2 py-0.5 border border-white uppercase flex items-center gap-1">
              <span className="size-2 bg-white rounded-full animate-ping"></span> CANLI
            </div>
            <span className="font-heading font-bold text-sm uppercase tracking-wide">{stream.streamer}</span>
            <span className="text-xs text-gray-400 font-mono hidden sm:inline">Oynuyor: {stream.game}</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="flex items-center gap-1 text-white">
              <Eye size={14} className="text-red-500" /> {stream.viewers.toLocaleString()} İzleyici
            </span>

            <button 
              onClick={onClose}
              className="p-1 bg-accent-muted text-white hover:bg-white hover:text-black transition-colors border border-black font-bold ml-2"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Content Layout (Video + Live Chat) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 h-[520px]">
          {/* Main Video Viewport */}
          <div className="lg:col-span-2 relative bg-black flex flex-col justify-between overflow-hidden border-b-[3px] lg:border-b-0 lg:border-r-[3px] border-black">
            {/* Video mockup */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={stream.thumbnail}
              alt={stream.game}
              className="absolute inset-0 w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-black/20"></div>

            {/* Video HUD */}
            <div className="relative z-10 p-3 flex justify-between items-start">
              <Badge className="bg-black/80 text-white border border-white text-[10px] font-mono">
                1080p 60FPS • WebRTC Stream (Low Latency)
              </Badge>
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 bg-black/80 text-white border border-white hover:bg-white hover:text-black"
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
            </div>

            {/* Streamer Bottom Info Bar */}
            <div className="relative z-10 p-4 bg-gradient-to-t from-black via-black/80 to-transparent flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="size-10 bg-accent-muted border-2 border-white flex items-center justify-center font-bold text-white uppercase">
                  {stream.streamer.charAt(0)}
                </div>
                <div>
                  <h4 className="font-heading font-bold text-base uppercase leading-tight">{stream.streamer}</h4>
                  <p className="text-xs text-gray-300 font-medium">{stream.game}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  onClick={() => setLikes((l) => l + 1)}
                  className="bg-white text-black border-2 border-black rounded-none text-xs font-bold uppercase py-1 px-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-accent-muted hover:text-white flex items-center gap-1.5"
                >
                  <Flame size={14} className="text-accent-muted" /> {likes} Beğeni
                </Button>
              </div>
            </div>
          </div>

          {/* Interactive Live Chat */}
          <div className="flex flex-col bg-white h-full overflow-hidden">
            <div className="p-3 border-b-2 border-black flex items-center justify-between bg-background">
              <span className="font-heading font-bold text-xs uppercase flex items-center gap-1.5">
                <MessageSquare size={14} className="text-accent-muted" /> Canlı Sohbet
              </span>
              <span className="text-[10px] font-mono text-gray-600">Oda: {stream.game}</span>
            </div>

            {/* Chat message flow */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2.5 text-xs">
              {messages.map((m) => (
                <div key={m.id} className="leading-relaxed break-words">
                  <span 
                    className="font-heading font-bold uppercase mr-1.5"
                    style={{ color: m.color }}
                  >
                    {m.user}:
                  </span>
                  <span className="text-gray-800 font-medium">{m.text}</span>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Chat message input */}
            <form onSubmit={handleSendMessage} className="p-2 border-t-2 border-black flex gap-1.5 bg-background">
              <Input
                placeholder="Sohbete yaz..."
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                className="border-2 border-black rounded-none text-xs h-9 bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus-visible:ring-0"
              />
              <Button
                type="submit"
                className="bg-accent-muted text-white border-2 border-black rounded-none text-xs h-9 px-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-black"
              >
                <Send size={14} />
              </Button>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
