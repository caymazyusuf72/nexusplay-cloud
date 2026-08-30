"use client";

import React, { useState } from "react";
import { cloudGamingData } from "@/data/cloudGamingData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  Accordion, 
  AccordionItem, 
  AccordionTrigger, 
  AccordionContent 
} from "@/components/ui/accordion";
import { 
  HelpCircle, 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  Search,
  Wifi,
  Headphones,
  FileQuestion
} from "lucide-react";

export default function SupportPage() {
  const { faqs } = cloudGamingData;
  const [searchQuery, setSearchQuery] = useState("");
  const [ticketSubmitted, setTicketSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const filteredFaqs = faqs.filter(
    (f: any) =>
      (f.q || f.question || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (f.a || f.answer || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    setTicketSubmitted(true);
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  };

  return (
    <div className="min-h-[100dvh] bg-background text-foreground pt-36 pb-32">
      <div className="container mx-auto px-4 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-accent-muted text-white border-2 border-border rounded-none font-bold uppercase py-1 px-4 text-xs mb-3 shadow-[2px_2px_0px_0px_var(--border)]">
            YARDIM VE BİLGİ MERKEZİ
          </Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-black uppercase tracking-tight text-foreground mb-4">
            Destek ve Sıkça Sorulanlar
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground font-medium max-w-2xl mx-auto">
            Ağ optimizasyonu, gamepad eşleme, abonelik yönetimi ve bulut akış kalitesi hakkında tüm yanıtlar.
          </p>

          {/* FAQ Search */}
          <div className="max-w-xl mx-auto mt-8 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              placeholder="Sorunuzu arayın... (Örn: Gecikme, Gamepad, FPS, İade)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-6 text-sm font-bold border-[3px] border-border rounded-none shadow-[4px_4px_0px_0px_var(--border)] bg-secondary-background text-foreground focus-visible:ring-0"
            />
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="border-[3px] border-border bg-secondary-background p-6 md:p-8 rounded-none shadow-[8px_8px_0px_0px_var(--border)] mb-16">
          <h3 className="font-heading font-black text-2xl uppercase text-foreground mb-6 flex items-center gap-2">
            <FileQuestion className="text-accent-muted" /> Merak Edilen Sorular ({filteredFaqs.length})
          </h3>

          <Accordion type="single" collapsible className="space-y-4">
            {filteredFaqs.map((faq: any, idx: number) => (
              <AccordionItem
                key={idx}
                value={`faq-${idx}`}
                className="border-2 border-border bg-background p-4 shadow-[3px_3px_0px_0px_var(--border)]"
              >
                <AccordionTrigger className="font-heading font-black text-base uppercase text-foreground hover:no-underline py-1 text-left">
                  {faq.q || faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground font-medium pt-3 leading-relaxed border-t border-border/20 mt-2">
                  {faq.a || faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Support Ticket Submission Form */}
        <div className="border-[3px] border-border bg-secondary-background p-6 md:p-8 rounded-none shadow-[8px_8px_0px_0px_var(--border)]">
          <div className="flex items-center gap-3 mb-6 border-b-[3px] border-border/30 pb-4">
            <Headphones className="text-accent-muted" size={28} />
            <div>
              <h3 className="font-heading font-black text-2xl uppercase text-foreground">
                Destek Talebi Oluştur
              </h3>
              <p className="text-xs text-muted-foreground font-medium">
                Uzman bulut destek mühendislerimiz ortalama 15 dakika içinde geri dönüş yapar.
              </p>
            </div>
          </div>

          {ticketSubmitted ? (
            <div className="py-12 text-center bg-background border-2 border-border p-6 shadow-[3px_3px_0px_0px_var(--border)]">
              <CheckCircle2 size={48} className="text-green-500 mx-auto mb-3" />
              <h4 className="font-heading font-black text-2xl uppercase text-foreground mb-2">
                Talebiniz Alındı!
              </h4>
              <p className="text-xs text-muted-foreground font-medium max-w-md mx-auto mb-4">
                Destek biletiniz #NX-{Math.floor(100000 + Math.random() * 900000)} koduyla sisteme kaydedildi. E-posta adresinize bilgilendirme gönderildi.
              </p>
              <Button
                onClick={() => setTicketSubmitted(false)}
                className="bg-accent-muted text-white border-2 border-border rounded-none font-heading font-bold text-xs uppercase px-6 py-2 shadow-[2px_2px_0px_0px_var(--border)]"
              >
                Yeni Talep Aç
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmitTicket} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-heading font-black uppercase mb-1.5 text-foreground">
                    Adınız Soyadınız
                  </label>
                  <Input
                    required
                    placeholder="Ad Soyad"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border-2 border-border rounded-none h-11 font-bold text-xs bg-background text-foreground shadow-[2px_2px_0px_0px_var(--border)]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-heading font-black uppercase mb-1.5 text-foreground">
                    E-Posta Adresiniz
                  </label>
                  <Input
                    required
                    type="email"
                    placeholder="ornek@nexusplay.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border-2 border-border rounded-none h-11 font-bold text-xs bg-background text-foreground shadow-[2px_2px_0px_0px_var(--border)]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-heading font-black uppercase mb-1.5 text-foreground">
                  Konu
                </label>
                <Input
                  required
                  placeholder="Örn: Frankfurt sunucusunda dalgalanma (Jitter)"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="border-2 border-border rounded-none h-11 font-bold text-xs bg-background text-foreground shadow-[2px_2px_0px_0px_var(--border)]"
                />
              </div>

              <div>
                <label className="block text-xs font-heading font-black uppercase mb-1.5 text-foreground">
                  Mesajınız & Hata Detayları
                </label>
                <Textarea
                  required
                  rows={4}
                  placeholder="Karşılaştığınız sorunu ve cihaz modelinizi belirtin..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="border-2 border-border rounded-none font-bold text-xs bg-background text-foreground shadow-[2px_2px_0px_0px_var(--border)]"
                />
              </div>

              <Button
                type="submit"
                className="w-full sm:w-auto bg-accent-muted text-white border-2 border-border rounded-none font-heading font-black text-sm uppercase px-8 py-6 shadow-[4px_4px_0px_0px_var(--border)] hover:bg-black dark:hover:bg-white dark:hover:text-black hover:text-white flex items-center justify-center gap-2"
              >
                <Send size={16} /> Talebi Gönder
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
