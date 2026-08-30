"use client";

import React, { useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cloudGamingData } from "@/data/cloudGamingData";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Eye, Tv, Users } from "lucide-react";
import StreamPlayerModal from "@/components/cloud/stream-player-modal";

export default function Streams() {
  const { liveStreams } = cloudGamingData;
  const shouldReduceMotion = useReducedMotion();
  const [activeStream, setActiveStream] = useState<any>(null);

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.4, ease: "easeOut" } 
    },
  };

  const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1 } 
    },
  };

  const totalViewers = liveStreams.reduce((acc, curr) => acc + curr.viewers, 0);

  return (
    <div className="min-h-[100dvh] bg-background text-foreground pt-36 pb-32">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12 border-b-[3px] border-border pb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-black uppercase tracking-tight text-foreground mb-2">
              Canlı Bulut Yayınları
            </h1>
            <p className="text-sm font-bold text-muted-foreground uppercase">
              Topluluk yayıncılarını doğrudan tarayıcınızdan izleyin ve sohbete katılın
            </p>
          </motion.div>

          <div className="flex gap-4">
            <div className="flex items-center gap-2 bg-secondary-background text-foreground border-2 border-border px-4 py-2 font-heading font-bold uppercase text-xs shadow-[3px_3px_0px_0px_var(--border)]">
              <span className="size-2.5 bg-red-600 rounded-full animate-pulse"></span>
              {totalViewers.toLocaleString()} Canlı İzleyici
            </div>
          </div>
        </div>

        {/* Streams Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {liveStreams.map((stream) => (
            <motion.div key={stream.id} variants={fadeUp}>
              <Card 
                onClick={() => setActiveStream(stream)}
                className="border-[3px] border-border rounded-none overflow-hidden bg-secondary-background text-foreground shadow-[6px_6px_0px_0px_var(--border)] hover:shadow-[10px_10px_0px_0px_var(--accent-muted)] hover:-translate-y-1 transition-all group flex flex-col h-full relative p-0 cursor-pointer"
              >
                <div className="absolute top-4 left-4 z-20 bg-red-600 text-white border-2 border-border font-bold uppercase px-3 py-1 text-xs shadow-[2px_2px_0px_0px_var(--border)] flex items-center gap-1.5">
                  <span className="size-2 bg-white rounded-full animate-ping"></span> CANLI
                </div>
                <div className="absolute top-4 right-4 z-20 bg-black text-white border-2 border-white font-bold uppercase px-3 py-1 text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1.5 font-mono">
                  <Eye size={14} /> {stream.viewers.toLocaleString()}
                </div>

                <div className="relative h-64 md:h-80 overflow-hidden border-b-[3px] border-border bg-black">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={stream.thumbnail}
                    alt={stream.game}
                    className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                    <Button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveStream(stream);
                      }}
                      className="bg-accent-muted text-white border-2 border-border shadow-[4px_4px_0px_0px_var(--border)] rounded-none font-heading font-black uppercase text-sm px-8 py-5 hover:bg-black dark:hover:bg-white dark:hover:text-black hover:text-white"
                    >
                      Yayına Katıl <Play className="ml-2" size={16} fill="currentColor" />
                    </Button>
                  </div>
                </div>

                <div className="p-5 flex items-center justify-between bg-secondary-background text-foreground">
                  <div className="flex items-center gap-4">
                    <div className="size-12 bg-accent-muted border-2 border-border rounded-none flex items-center justify-center text-white font-heading font-black text-xl shadow-[2px_2px_0px_0px_var(--border)]">
                      {stream.streamer.charAt(0)}
                    </div>
                    <div>
                      <h3 className="font-heading font-black text-lg uppercase tracking-tight text-foreground">
                        {(stream as any).title || `${stream.streamer} ile ${stream.game}`}
                      </h3>
                      <p className="text-xs font-bold text-muted-foreground uppercase">
                        {stream.streamer} • <span className="text-accent-muted">{stream.game}</span>
                      </p>
                    </div>
                  </div>

                  <Button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveStream(stream);
                    }}
                    className="rounded-none bg-accent-muted text-white border-2 border-border shadow-[3px_3px_0px_0px_var(--border)] font-heading font-black uppercase text-xs px-4 py-2 hover:bg-black dark:hover:bg-white dark:hover:text-black hover:text-white"
                  >
                    İzle
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <StreamPlayerModal
        isOpen={Boolean(activeStream)}
        onClose={() => setActiveStream(null)}
        stream={activeStream}
      />
    </div>
  );
}
