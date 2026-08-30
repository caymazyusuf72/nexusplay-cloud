"use client";

import React, { useState } from "react";
import { cloudGamingData } from "@/data/cloudGamingData";
import { 
  Accordion, 
  AccordionItem, 
  AccordionTrigger, 
  AccordionContent 
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  HelpCircle, 
  Mail, 
  MessageSquare, 
  Wifi, 
  Zap,
  CheckCircle2
} from "lucide-react";

export default function SupportPage() {
  const { faqs } = cloudGamingData;
  const [searchFaq, setSearchFaq] = useState("");
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMsg, setContactMsg] = useState("");

  const filteredFaqs = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(searchFaq.toLowerCase()) ||
      f.a.toLowerCase().includes(searchFaq.toLowerCase())
  );

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTicketSubmitted(true);
    setTimeout(() => {
      setTicketSubmitted(false);
      setContactName("");
      setContactEmail("");
      setContactMsg("");
    }, 4000);
  };

  return (
    <div className="min-h-[100dvh] bg-background pt-36 pb-32">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="bg-accent-muted text-white border-2 border-black rounded-none font-bold uppercase py-1 px-3 mb-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            YARDIM VE DESTEK MERKEZİ
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-black uppercase tracking-tight mb-4">
            Nasıl Yardımcı Olabiliriz?
          </h1>
          <p className="text-sm md:text-base font-bold text-gray-600 uppercase max-w-2xl mx-auto mb-8">
            Bulut oyun kurulumu, ağ optimizasyonu ve sık sorulan soruların yanıtlarını bulun.
          </p>

          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <Input
              placeholder="Soru veya konu ara... (Örn: Kontrolcü, Hız, Kayıt)"
              value={searchFaq}
              onChange={(e) => setSearchFaq(e.target.value)}
              className="pl-10 py-6 text-base font-bold border-[3px] border-black rounded-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white focus-visible:ring-0"
            />
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="border-[3px] border-black bg-white p-6 sm:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-16">
          <h3 className="text-2xl font-heading font-black uppercase mb-6 flex items-center gap-2">
            <HelpCircle className="text-accent-muted" /> Sıkça Sorulan Sorular
          </h3>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {filteredFaqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-2 border-black rounded-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <AccordionTrigger className="font-heading font-bold text-sm uppercase p-4 text-black hover:no-underline bg-white">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="p-4 text-xs font-semibold text-gray-700 bg-background leading-relaxed border-t-2 border-black">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact Support Form */}
        <div className="border-[3px] border-black bg-white p-6 sm:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h3 className="text-2xl font-heading font-black uppercase mb-2 flex items-center gap-2">
            <Mail className="text-accent-muted" /> Destek Talebi Oluşturun
          </h3>
          <p className="text-xs text-gray-600 font-bold mb-6">
            Sorunuza yanıt bulamadıysanız mühendis ekibimize anında mesaj iletin.
          </p>

          {ticketSubmitted ? (
            <div className="bg-green-500 text-white border-2 border-black p-6 text-center font-heading font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center gap-3">
              <CheckCircle2 size={24} />
              <span>Talebiniz alındı! Destek ekibimiz 15 dakika içinde yanıt verecektir.</span>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-heading font-bold uppercase mb-1">Adınız Soyadınız</label>
                  <Input
                    required
                    placeholder="Ad Soyad"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="border-2 border-black rounded-none h-11 text-xs font-bold bg-background shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-heading font-bold uppercase mb-1">E-posta Adresiniz</label>
                  <Input
                    required
                    type="email"
                    placeholder="ornek@mail.com"
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    className="border-2 border-black rounded-none h-11 text-xs font-bold bg-background shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-heading font-bold uppercase mb-1">Sorununuz veya Mesajınız</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Yaşadığınız sorunu veya sorunuzu detaylandırın..."
                  value={contactMsg}
                  onChange={(e) => setContactMsg(e.target.value)}
                  className="w-full border-2 border-black rounded-none p-3 text-xs font-bold bg-background shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none"
                ></textarea>
              </div>

              <Button
                type="submit"
                className="bg-accent-muted text-white border-2 border-black rounded-none font-heading font-black text-sm uppercase py-6 px-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white"
              >
                Destek Talebini Gönder
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
