"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  CreditCard, 
  ShieldCheck, 
  Zap, 
  CheckCircle2, 
  X, 
  Sparkles,
  Lock
} from "lucide-react";

interface MembershipCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: any;
  billingCycle: "monthly" | "yearly";
}

export default function MembershipCheckoutModal({
  isOpen,
  onClose,
  plan,
  billingCycle,
}: MembershipCheckoutModalProps) {
  const [step, setStep] = useState<"form" | "processing" | "success">("form");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardHolder, setCardHolder] = useState("");

  if (!plan) return null;

  const price = billingCycle === "yearly" ? plan.priceYearly : plan.priceMonthly;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("processing");
    setTimeout(() => {
      setStep("success");
    }, 1800);
  };

  const handleClose = () => {
    setStep("form");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="max-w-lg w-full p-0 overflow-hidden bg-background border-[3px] border-black rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <DialogTitle className="sr-only">Abonelik Yükseltme</DialogTitle>
        <DialogDescription className="sr-only">{plan.name} paketine geçiş ve ödeme simülasyonu</DialogDescription>

        {/* Header */}
        <div className="bg-black text-white p-4 border-b-[3px] border-black flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="text-accent-muted" size={18} />
            <span className="font-heading font-black text-sm uppercase tracking-wide">
              {plan.name} Yükseltme
            </span>
          </div>
          <button onClick={handleClose} className="text-white hover:text-accent-muted font-bold">
            <X size={18} />
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6">
          {step === "form" && (
            <form onSubmit={handleSubscribe} className="space-y-4">
              {/* Plan Summary */}
              <div className="border-2 border-black bg-white p-4 flex items-center justify-between shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <div>
                  <h4 className="font-heading font-black text-lg uppercase text-black">{plan.name}</h4>
                  <p className="text-xs text-gray-600 font-bold">
                    {billingCycle === "yearly" ? "Yıllık Faturalandırma (%17 İndirim)" : "Aylık Faturalandırma"}
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-heading font-black text-2xl text-accent-muted">
                    {price === 0 ? "Ücretsiz" : `₺${price}`}
                  </span>
                  <span className="text-xs font-bold text-gray-500 block">
                    {price === 0 ? "" : billingCycle === "yearly" ? "/yıl" : "/ay"}
                  </span>
                </div>
              </div>

              {price > 0 ? (
                <>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-heading font-bold uppercase mb-1">
                        Kart Üzerindeki İsim
                      </label>
                      <Input
                        required
                        placeholder="Ad Soyad"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value)}
                        className="border-2 border-black rounded-none h-10 font-bold text-xs bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-heading font-bold uppercase mb-1">
                        Kart Numarası
                      </label>
                      <div className="relative">
                        <Input
                          required
                          placeholder="4543 •••• •••• ••••"
                          maxLength={19}
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="border-2 border-black rounded-none h-10 font-mono font-bold text-xs bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] pr-10"
                        />
                        <CreditCard size={16} className="absolute right-3 top-3 text-gray-400" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-heading font-bold uppercase mb-1">
                          Son Kullanma
                        </label>
                        <Input
                          required
                          placeholder="AA/YY"
                          maxLength={5}
                          value={expiry}
                          onChange={(e) => setExpiry(e.target.value)}
                          className="border-2 border-black rounded-none h-10 font-mono font-bold text-xs bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-heading font-bold uppercase mb-1">
                          CVV
                        </label>
                        <Input
                          required
                          placeholder="123"
                          maxLength={3}
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                          className="border-2 border-black rounded-none h-10 font-mono font-bold text-xs bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-gray-600 font-bold pt-2">
                    <Lock size={13} className="text-black" />
                    <span>256-bit SSL şifreleme ile güvenli bulut ödeme simülasyonu.</span>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-accent-muted text-white border-2 border-black rounded-none font-heading font-black text-sm uppercase py-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white"
                  >
                    Ödemeyi Tamamla (₺{price})
                  </Button>
                </>
              ) : (
                <div className="py-4 text-center">
                  <p className="text-sm font-bold text-gray-700 mb-4">
                    Ücretsiz paket için kredi kartı gerekmez. Anında oynamaya başlayabilirsiniz.
                  </p>
                  <Button
                    type="submit"
                    className="w-full bg-black text-white border-2 border-black rounded-none font-heading font-black text-sm uppercase py-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-accent-muted"
                  >
                    Ücretsiz Hesabı Başlat
                  </Button>
                </div>
              )}
            </form>
          )}

          {step === "processing" && (
            <div className="py-16 text-center">
              <div className="size-16 bg-accent-muted border-2 border-black mx-auto mb-4 flex items-center justify-center text-white animate-spin">
                <Zap size={32} />
              </div>
              <h4 className="font-heading font-black text-xl uppercase mb-1">Abonelik Tanımlanıyor...</h4>
              <p className="text-xs text-gray-600 font-bold">RTX 4080 Rig slotunuz ayrılıyor.</p>
            </div>
          )}

          {step === "success" && (
            <div className="py-8 text-center space-y-4">
              <div className="size-16 bg-green-500 text-white border-2 border-black mx-auto flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <CheckCircle2 size={36} />
              </div>
              <h4 className="font-heading font-black text-2xl uppercase text-black">
                {plan.name} Aktif Edildi!
              </h4>
              <p className="text-xs text-gray-600 font-medium max-w-sm mx-auto">
                Aboneliğiniz başarıyla güncellendi. Artık VIP kuyruk ve ultra düşük gecikmeli 4K akışın tadını çıkarabilirsiniz.
              </p>
              <Button
                onClick={handleClose}
                className="bg-accent-muted text-white border-2 border-black rounded-none font-heading font-bold text-xs uppercase px-8 py-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-black"
              >
                Oyunlara Göz At
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
