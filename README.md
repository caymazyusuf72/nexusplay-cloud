# NexusPlay Cloud

NexusPlay Cloud, modern web teknolojileri ve Neo-Brutalist tasarım prensipleri kullanılarak geliştirilmiş, yüksek performanslı ve düşük gecikmeli bir bulut oyun (cloud gaming) platformu arayüzüdür.

Platform; indirme ve yerel depolama gereksinimini ortadan kaldırarak kullanıcıların doğrudan tarayıcı üzerinden 4K 120 FPS kalitesinde oyun oturumları başlatabilmesini simüle eder.

---

## Temel Özellikler

1. Bulut Oyun Akış Simülatörü (Cloud Stream Engine)
- 3 aşamalı rig tahsisi (RTX 4080 donanım rezervasyonu, WebRTC el sıkışması, canlı oturum başlatma).
- Gerçek zamanlı oyun içi HUD (FPS sayacı, gecikme/ping, bitrate, paket kaybı göstergesi).
- Tam ekran modu, ses kontrolleri ve sanal klavye/gamepad giriş geri bildirimi.

2. Tanı ve Donanım Merkezi (System Diagnostic Drawer)
- Gerçek zamanlı ağ analiz motoru (WebRTC ping, jitter ve indirme hızı testi).
- Veri merkezi bölge seçimi (Frankfurt TR-1, İstanbul TR-2, Amsterdam EU-1, Londra UK-1).
- Kullanıcı abonelik ve donanım rig özellikleri dökümü.

3. Hızlı Komut ve Oyun Arama Paleti (Command Palette)
- Ctrl + K klavye kısayolu ile açılan hızlı arama modülü.
- Başlık, geliştirici, tür ve etiket bazlı anlık filtreleme ve doğrudan oynatma aksiyonu.

4. Çoklu Renk ve Tema Sistemi (Anti-Slop Color Engine)
- Yüksek kontrastlı ve doygunluğu sınırlandırılmış dört ana vurgu paleti:
  - Terracotta (Kiremit - Varsayılan)
  - Cobalt (Kobalt Mavi)
  - Forest (Orman Yeşili)
  - Monochrome (Cyber Kömür)
- Açık ve koyu mod desteği.

5. Üyelik ve Fiyatlandırma Modülü (Pricing & Checkout)
- Free, Priority ve Ultimate paket seçenekleri.
- Aylık ve yıllık faturalandırma seçicisi ve interaktif ödeme simülatörü.
- Detaylı donanım ve özellik karşılaştırma matrisi.

6. Çoklu Cihaz Ekosistemi (Download Hub)
- Windows, macOS, Android, iOS PWA, Smart TV ve taşınabilir konsol (Steam Deck, ROG Ally) rehberleri.
- Önerilen ağ ve bant genişliği gereksinimleri tablosu.

7. Canlı Yayın Odaları (Live Stream Simulator)
- Aktif topluluk yayınları ve simüle edilmiş akan canlı sohbet akışı.
- İzleyici sayaçları ve etkileşimli beğeni sistemi.

8. Destek ve SSS Merkezi (Knowledge Base)
- Akordeon mimarisinde sıkça sorulan sorular arşivi.
- Destek talebi oluşturma formu ve ağ optimizasyon ipuçları.

---

## Mimari ve Teknoloji Yığını

- Çatı: Next.js 15 (App Router, Server & Client Components)
- Dil: TypeScript / React 19
- Stil: Tailwind CSS v4, Neo-Brutalism Design System
- Animasyon: Framer Motion (Erişilebilirlik ve prefers-reduced-motion uyumlu)
- İkonografi: Lucide React
- Durum Yönetimi: React State & LocalStorage

---

## Kurulum ve Yerel Çalıştırma

Gereksinimler:
- Node.js 20 veya üzeri
- npm, pnpm veya yarn

Adımlar:

1. Bağımlılıkları yükleyin:
```bash
npm install --legacy-peer-deps
```

2. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

3. Tarayıcınızda açın:
```
http://localhost:3000
```

4. Üretim (Production) derlemesi oluşturun:
```bash
npm run build
npm run start
```

---

## Proje Dizin Yapısı

```
src/
├── app/
│   ├── download/       # Cihaz indirme merkezi sayfası
│   ├── games/          # Oyun kütüphanesi ve filtreleme
│   ├── pricing/        # Üyelik paketleri ve ödeme sayfası
│   ├── streams/        # Canlı yayın odaları
│   ├── support/        # SSS ve yardım merkezi
│   ├── layout.tsx      # Global layout, navbar ve durum şeridi
│   └── page.tsx        # Ana sayfa ve vitrin bölümleri
├── components/
│   ├── app/            # Navbar ve global UI bileşenleri
│   ├── cloud/          # Bulut oyun modalları (Stream, Search, Status, Theme, Checkout)
│   └── ui/             # Radix ve Tailwind tabanlı brutalist atomik bileşenler
├── data/
│   └── cloudGamingData.js  # Oyun, yayın, paket ve sunucu veri modelleri
└── styling/
    └── globals.css     # CSS değişkenleri, temalar ve global stiller
```

---

## Lisans

Bu proje özel bir lisans altında geliştirilmiştir. Tüm hakları saklıdır.
