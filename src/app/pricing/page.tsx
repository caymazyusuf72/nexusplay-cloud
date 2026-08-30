"use client";

import React, { useState } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cloudGamingData } from "@/data/cloudGamingData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle2, 
  XCircle, 
  Zap, 
  Cpu, 
  ShieldCheck, 
  HelpCircle,
  CreditCard,
  Layers,
  Sparkles
} from "lucide-react";
import MembershipCheckoutModal from "@/components/cloud/membership-checkout-modal";

export default function PricingPage() {
  const { membershipPlans } = cloudGamingData;
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly");
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<any>(null);
  const shouldReduceMotion = useReducedMotion();

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.4, ease: "easeOut" } 
    }
  };

  return (
    <div className="min-h-[100dvh] bg-background text-foreground pt-36 pb-32">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <Badge className="bg-accent-muted text-white border-2 border-border rounded-none font-bold uppercase py-1 px-4 text-xs mb-3 shadow-[2px_2px_0px_0px_var(--border)]">
            ŞEFFAF VE TAAHHÜTSÜZ FİYATLANDIRMA
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-black uppercase tracking-tight text-foreground mb-4">
            Bulut Oyun Üyelik Paketleri
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground font-medium">
            İster sıfır maliyetle hemen başla, ister RTX 4080 Rig gücüyle 4K 120 FPS sinematik akışın kilidini aç.
          </p>

          {/* Billing Switcher */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <div className="border-[3px] border-border bg-secondary-background p-1 flex items-center shadow-[4px_4px_0px_0px_var(--border)]">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`font-heading font-black text-xs uppercase px-5 py-2.5 transition-all ${
                  billingCycle === "monthly"
                    ? "bg-accent-muted text-white shadow-[2px_2px_0px_0px_var(--border)]"
                    : "text-foreground hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                Aylık Ödeme
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`font-heading font-black text-xs uppercase px-5 py-2.5 transition-all flex items-center gap-1.5 ${
                  billingCycle === "yearly"
                    ? "bg-accent-muted text-white shadow-[2px_2px_0px_0px_var(--border)]"
                    : "text-foreground hover:bg-black/5 dark:hover:bg-white/5"
                }`}
              >
                <span>Yıllık Ödeme</span>
                <span className="bg-background text-foreground text-[10px] px-1.5 py-0.5 border border-border">
                  %17 İndirim
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 max-w-6xl mx-auto">
          {membershipPlans.map((plan: any) => {
            const price = billingCycle === "yearly" ? plan.priceYearly : plan.priceMonthly;
            return (
              <motion.div
                key={plan.id}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className={`border-[3px] border-border bg-secondary-background p-8 rounded-none shadow-[8px_8px_0px_0px_var(--border)] flex flex-col justify-between relative transition-all ${
                  plan.isPopular || plan.popular ? "ring-2 ring-accent-muted shadow-[10px_10px_0px_0px_var(--accent-muted)]" : ""
                }`}
              >
                {(plan.isPopular || plan.popular) && (
                  <div className="absolute -top-4 right-6 bg-accent-muted text-white font-heading font-black text-xs uppercase py-1.5 px-4 border-2 border-border shadow-[2px_2px_0px_0px_var(--border)]">
                    EN ÇOK TERCİH EDİLEN
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-heading font-black text-2xl uppercase text-foreground">{plan.name}</h3>
                    <Badge className="bg-background text-foreground border border-border text-[10px] font-mono">
                      {plan.rigType}
                    </Badge>
                  </div>

                  <p className="text-xs text-muted-foreground font-medium mb-6">{plan.description}</p>

                  <div className="border-b-[3px] border-border/30 pb-6 mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl sm:text-5xl font-heading font-black text-accent-muted">
                        {price === 0 ? "Ücretsiz" : `₺${price}`}
                      </span>
                      {price > 0 && (
                        <span className="text-xs font-bold text-muted-foreground uppercase">
                          {billingCycle === "yearly" ? "/yıl" : "/ay"}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-muted-foreground font-bold mt-1">
                      {plan.sessionLength || plan.sessionDuration} kesintisiz oturum süresi
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 mb-8">
                    <p className="text-xs font-heading font-black uppercase text-foreground">Paket Özellikleri:</p>
                    {plan.features.map((feat: string, i: number) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs font-bold text-foreground">
                        <CheckCircle2 size={16} className="text-accent-muted shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={() => setSelectedPlanForCheckout(plan)}
                  className="w-full bg-accent-muted text-white border-2 border-border rounded-none font-heading font-black text-sm uppercase py-6 shadow-[4px_4px_0px_0px_var(--border)] hover:bg-black dark:hover:bg-white dark:hover:text-black hover:text-white transition-all transform hover:-translate-y-0.5"
                >
                  {plan.priceMonthly === 0 ? "Ücretsiz Başla" : `${plan.name} Paketini Seç`}
                </Button>
              </motion.div>
            );
          })}
        </div>

        {/* Feature Comparison Matrix Table */}
        <div className="max-w-6xl mx-auto border-[3px] border-border bg-secondary-background p-6 md:p-8 shadow-[8px_8px_0px_0px_var(--border)]">
          <h3 className="font-heading font-black text-2xl uppercase text-foreground mb-6 flex items-center gap-2">
            <Layers className="text-accent-muted" /> Detaylı Paket Karşılaştırma Matrisi
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b-[3px] border-border text-xs font-heading font-black uppercase text-foreground">
                  <th className="py-3 px-4">Özellik</th>
                  <th className="py-3 px-4 bg-background border-l-2 border-r-2 border-border">Free</th>
                  <th className="py-3 px-4 bg-background border-r-2 border-border">Priority</th>
                  <th className="py-3 px-4 bg-accent-muted text-white">Ultimate</th>
                </tr>
              </thead>
              <tbody className="text-xs font-bold divide-y divide-border/20 text-foreground">
                <tr>
                  <td className="py-3.5 px-4">Maksimum Çözünürlük</td>
                  <td className="py-3.5 px-4 bg-background border-l-2 border-r-2 border-border text-muted-foreground">1080p</td>
                  <td className="py-3.5 px-4 bg-background border-r-2 border-border">1440p (2K)</td>
                  <td className="py-3.5 px-4 font-bold text-accent-muted">4K UHD HDR</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4">Maksimum Kare Hızı (FPS)</td>
                  <td className="py-3.5 px-4 bg-background border-l-2 border-r-2 border-border text-muted-foreground">60 FPS</td>
                  <td className="py-3.5 px-4 bg-background border-r-2 border-border">60 FPS</td>
                  <td className="py-3.5 px-4 font-bold text-accent-muted">120 - 240 FPS</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4">Bulut Rig GPU Donanımı</td>
                  <td className="py-3.5 px-4 bg-background border-l-2 border-r-2 border-border text-muted-foreground">Standart Rig</td>
                  <td className="py-3.5 px-4 bg-background border-r-2 border-border">RTX 3080 Sınıfı</td>
                  <td className="py-3.5 px-4 font-bold text-accent-muted">NVIDIA RTX 4080 (Ada)</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4">Ray Tracing & DLSS 3.5</td>
                  <td className="py-3.5 px-4 bg-background border-l-2 border-r-2 border-border text-muted-foreground">Kapalı</td>
                  <td className="py-3.5 px-4 bg-background border-r-2 border-border">DLSS 2 / RT Açık</td>
                  <td className="py-3.5 px-4 font-bold text-accent-muted">DLSS 3.5 Full Frame Gen</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4">Kuyruk Önceliği</td>
                  <td className="py-3.5 px-4 bg-background border-l-2 border-r-2 border-border text-muted-foreground">Standart Kuyruk</td>
                  <td className="py-3.5 px-4 bg-background border-r-2 border-border">Öncelikli Giriş</td>
                  <td className="py-3.5 px-4 font-bold text-accent-muted">Sıfır Bekleme (VIP Slot)</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4">Tek Oturum Süresi</td>
                  <td className="py-3.5 px-4 bg-background border-l-2 border-r-2 border-border text-muted-foreground">1 Saat</td>
                  <td className="py-3.5 px-4 bg-background border-r-2 border-border">6 Saat</td>
                  <td className="py-3.5 px-4 font-bold text-accent-muted">8 Saat (Sınırsız Yenileme)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      <MembershipCheckoutModal
        isOpen={Boolean(selectedPlanForCheckout)}
        onClose={() => setSelectedPlanForCheckout(null)}
        plan={selectedPlanForCheckout}
        billingCycle={billingCycle}
      />
    </div>
  );
}
