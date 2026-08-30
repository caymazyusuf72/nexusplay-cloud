"use client";

import React, { useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cloudGamingData } from "@/data/cloudGamingData";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Download, 
  Monitor, 
  Apple, 
  Smartphone, 
  Tv, 
  Gamepad2, 
  Laptop, 
  CheckCircle2, 
  HelpCircle,
  Wifi
} from "lucide-react";

export default function DownloadPage() {
  const { supportedDevices } = cloudGamingData;
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const handleDownload = (deviceName: string) => {
    setDownloadSuccess(deviceName);
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  const stagger: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const getDeviceIcon = (id: string) => {
    switch (id) {
      case "dev_pc": return <Laptop size={28} />;
      case "dev_mac": return <Apple size={28} />;
      case "dev_android": return <Smartphone size={28} />;
      case "dev_ios": return <Smartphone size={28} />;
      case "dev_tv": return <Tv size={28} />;
      case "dev_handheld": return <Gamepad2 size={28} />;
      default: return <Monitor size={28} />;
    }
  };

  return (
    <div className="min-h-[100dvh] bg-background pt-36 pb-32">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="bg-accent-muted text-white border-2 border-black rounded-none font-bold uppercase py-1 px-3 mb-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            İNDİRME VE CİHAZ EKOSİSTEMİ
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-black uppercase tracking-tight mb-4">
            Her Cihazda, Her Yerde Oyna
          </h1>
          <p className="text-sm md:text-base font-bold text-gray-600 uppercase max-w-2xl mx-auto">
            İster zayıf bir laptop, ister akıllı televizyon veya cep telefonu. NexusPlay uygulamasını indirin veya doğrudan tarayıcınızdan oynayın.
          </p>
        </div>

        {downloadSuccess && (
          <div className="mb-8 bg-green-500 text-white border-[3px] border-black p-4 font-heading font-bold text-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-bounce">
            ✓ {downloadSuccess} için indirme başlatıldı! Kurulum sihirbazını takip edin.
          </div>
        )}

        {/* Devices Grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {supportedDevices.map((dev) => (
            <motion.div key={dev.id} variants={fadeUp} className="flex">
              <Card className="border-[3px] border-black bg-white rounded-none p-6 flex flex-col justify-between w-full shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(212,108,78,1)] hover:-translate-y-1 transition-all">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="size-14 bg-background border-2 border-black flex items-center justify-center text-accent-muted shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      {getDeviceIcon(dev.id)}
                    </div>
                    <Badge className="bg-black text-white rounded-none border border-black text-[10px] font-bold uppercase">
                      {dev.badge}
                    </Badge>
                  </div>

                  <h3 className="text-2xl font-heading font-black uppercase text-black mb-2">
                    {dev.name}
                  </h3>
                  <p className="text-xs text-gray-600 font-semibold mb-6 leading-relaxed">
                    {dev.desc}
                  </p>
                </div>

                <div>
                  <div className="pt-4 border-t-2 border-black/10 mb-6 text-xs font-bold text-gray-700">
                    <span className="text-gray-500 uppercase block text-[10px]">Gereksinim:</span>
                    <span>{dev.requirements}</span>
                  </div>

                  <Button
                    onClick={() => handleDownload(dev.name)}
                    className="w-full bg-accent-muted text-white border-2 border-black rounded-none font-heading font-black text-xs uppercase py-6 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white flex items-center justify-center gap-2"
                  >
                    <Download size={16} /> Şimdi İndir
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* System & Network Requirements Box */}
        <div className="border-[3px] border-black bg-white p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex items-center gap-3 mb-6 border-b-2 border-black pb-4">
            <Wifi className="text-accent-muted" size={24} />
            <h3 className="text-2xl font-heading font-black uppercase">
              Önerilen Ağ ve Sistem Gereksinimleri
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs font-bold">
            <div className="space-y-3 bg-background p-4 border-2 border-black">
              <h4 className="font-heading font-black text-sm uppercase text-black">
                1080p 60 FPS Standart Akış
              </h4>
              <p className="text-gray-600 font-medium">Hafif dizüstü ve mobil cihazlar için idealdir.</p>
              <ul className="space-y-2 text-gray-800">
                <li>• İnternet Hızı: En az 15 Mbps stabil indirme</li>
                <li>• Ping: 40ms altı önerilir</li>
                <li>• Bağlantı: 5GHz Wi-Fi veya Ethernet kablosu</li>
              </ul>
            </div>

            <div className="space-y-3 bg-white p-4 border-2 border-black shadow-[3px_3px_0px_0px_rgba(212,108,78,1)]">
              <h4 className="font-heading font-black text-sm uppercase text-accent-muted">
                4K 120 FPS / 240 FPS Ultra Akış (Ultimate)
              </h4>
              <p className="text-gray-600 font-medium">En üst düzey grafik ve sıfıra yakın gecikme.</p>
              <ul className="space-y-2 text-gray-800">
                <li>• İnternet Hızı: En az 45-50 Mbps stabil indirme</li>
                <li>• Ping: 15ms altı önerilir</li>
                <li>• Monitör: 120Hz+ G-Sync / FreeSync uyumlu ekran</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
