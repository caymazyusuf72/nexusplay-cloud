"use client";

import React, { useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cloudGamingData } from "@/data/cloudGamingData";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Check, 
  X, 
  Zap, 
  ShieldCheck, 
  Sparkles, 
  Cpu, 
  Clock, 
  Layers,
  ArrowRight
} from "lucide-react";
import MembershipCheckoutModal from "@/components/cloud/membership-checkout-modal";

export default function PricingPage() {
  const { membershipPlans } = cloudGamingData;
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<any>(null);
  const shouldReduceMotion = useReducedMotion();

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  const stagger: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="min-h-[100dvh] bg-background pt-36 pb-32">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge className="bg-accent-muted text-white border-2 border-black rounded-none font-bold uppercase py-1 px-3 mb-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            ÜYELİK PAKETLERİ
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-black uppercase tracking-tight mb-4">
            Oyun Deneyiminizi Yükseltin
          </h1>
          <p className="text-sm md:text-base font-bold text-gray-600 uppercase max-w-2xl mx-auto">
            İster ücretsiz başlayın, ister RTX 4080 gücünde 4K 120FPS kesintisiz bulut oyun deneyimine geçin.
          </p>

          {/* Billing Switcher */}
          <div className="mt-8 inline-flex items-center gap-3 bg-white p-2 border-[3px] border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-5 py-2 font-heading font-bold text-xs uppercase transition-all ${
                billingCycle === "monthly"
                  ? "bg-accent-muted text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  : "bg-transparent text-black hover:text-accent-muted"
              }`}
            >
              Aylık Ödeme
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-5 py-2 font-heading font-bold text-xs uppercase transition-all flex items-center gap-2 ${
                billingCycle === "yearly"
                  ? "bg-accent-muted text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  : "bg-transparent text-black hover:text-accent-muted"
              }`}
            >
              Yıllık Ödeme
              <span className="bg-black text-white text-[10px] px-2 py-0.5 border border-white font-bold">
                %17 Tasarruf
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 items-stretch"
        >
          {membershipPlans.map((plan) => {
            const price = billingCycle === "yearly" ? plan.priceYearly : plan.priceMonthly;

            return (
              <motion.div key={plan.id} variants={fadeUp} className="flex">
                <Card
                  className={`border-[3px] border-black rounded-none p-6 flex flex-col justify-between w-full relative transition-all ${
                    plan.isPopular
                      ? "bg-white shadow-[8px_8px_0px_0px_rgba(212,108,78,1)] border-accent-muted md:-translate-y-2"
                      : "bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                  }`}
                >
                  {plan.isPopular && (
                    <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-accent-muted text-white border-2 border-black font-heading font-black text-[11px] uppercase py-0.5 px-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      {plan.badge}
                    </div>
                  )}

                  <div>
                    <div className="border-b-2 border-black/10 pb-4 mb-4">
                      <h3 className="text-2xl font-heading font-black uppercase text-black mb-1">
                        {plan.name}
                      </h3>
                      <div className="flex items-baseline gap-1 mt-3">
                        <span className="text-4xl font-heading font-black text-black">
                          {price === 0 ? "Ücretsiz" : `₺${price}`}
                        </span>
                        <span className="text-xs font-bold text-gray-500 uppercase">
                          {price === 0 ? "" : billingCycle === "yearly" ? "/ yıl" : "/ ay"}
                        </span>
                      </div>
                    </div>

                    {/* Hardware badges */}
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2 text-xs font-bold text-black bg-background p-2 border border-black">
                        <Cpu size={14} className="text-accent-muted shrink-0" />
                        <span>{plan.rigType}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-bold text-black bg-background p-2 border border-black">
                        <Layers size={14} className="text-accent-muted shrink-0" />
                        <span>{plan.resolution}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-bold text-black bg-background p-2 border border-black">
                        <Clock size={14} className="text-accent-muted shrink-0" />
                        <span>{plan.sessionLength}</span>
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="space-y-2.5 mb-8">
                      {plan.features.map((feat: string, i: number) => (
                        <div key={i} className="flex items-start gap-2 text-xs font-bold text-gray-700">
                          <Check size={14} className="text-accent-muted shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    onClick={() => setSelectedPlanForCheckout(plan)}
                    className={`w-full border-2 border-black rounded-none font-heading font-black text-sm uppercase py-6 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all ${
                      plan.isPopular
                        ? "bg-accent-muted text-white hover:bg-black"
                        : "bg-background text-black hover:bg-black hover:text-white"
                    }`}
                  >
                    {plan.ctaText}
                  </Button>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Feature Comparison Matrix Table */}
        <div className="border-[3px] border-black bg-white p-6 sm:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="text-2xl font-heading font-black uppercase mb-6 text-center">
            Detaylı Paket Karşılaştırma Matrisi
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-bold border-collapse">
              <thead>
                <tr className="border-b-[3px] border-black bg-background">
                  <th className="p-3 uppercase">Özellik</th>
                  <th className="p-3 uppercase">Free</th>
                  <th className="p-3 uppercase">Priority</th>
                  <th className="p-3 uppercase text-accent-muted">Ultimate</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-black/10 font-medium">
                <tr>
                  <td className="p-3 font-bold uppercase">Maksimum Çözünürlük</td>
                  <td className="p-3">1080p</td>
                  <td className="p-3">1440p (2K)</td>
                  <td className="p-3 font-bold text-accent-muted">4K UHD (3840x2160)</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold uppercase">Maksimum Kare Hızı (FPS)</td>
                  <td className="p-3">60 FPS</td>
                  <td className="p-3">120 FPS</td>
                  <td className="p-3 font-bold text-accent-muted">240 FPS&apos;e kadar</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold uppercase">Işın İzleme (Ray Tracing)</td>
                  <td className="p-3"><X size={16} className="text-gray-400" /></td>
                  <td className="p-3"><Check size={16} className="text-black" /></td>
                  <td className="p-3"><Check size={16} className="text-accent-muted" /></td>
                </tr>
                <tr>
                  <td className="p-3 font-bold uppercase">DLSS 3.5 Frame Generation</td>
                  <td className="p-3"><X size={16} className="text-gray-400" /></td>
                  <td className="p-3">DLSS 2.0</td>
                  <td className="p-3 font-bold text-accent-muted">DLSS 3.5 Tam Destek</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold uppercase">Oturum Başına Süre</td>
                  <td className="p-3">1 Saat</td>
                  <td className="p-3">6 Saat</td>
                  <td className="p-3 font-bold text-accent-muted">8 Saat</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold uppercase">Sunucu Kuyruk Önceliği</td>
                  <td className="p-3">Standart Sıra</td>
                  <td className="p-3">Öncelikli Erişim</td>
                  <td className="p-3 font-bold text-accent-muted">VIP Sıfır Sıra</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Interactive Checkout Modal */}
      <MembershipCheckoutModal
        isOpen={Boolean(selectedPlanForCheckout)}
        onClose={() => setSelectedPlanForCheckout(null)}
        plan={selectedPlanForCheckout}
        billingCycle={billingCycle}
      />
    </div>
  );
}
