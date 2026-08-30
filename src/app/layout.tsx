import "@/styling/globals.css"

import type { Metadata } from "next"
import { Outfit } from "next/font/google"

import Navbar from "@/components/app/navbar"
import NavbarWrapper from "@/components/app/navbar-wrapper"
import ScrollToTop from "@/components/app/scroll-to-top"
import SetStylingPref from "@/components/app/set-styling-pref"
import { ThemeProvider } from "@/components/app/theme-provider"
import { Toaster } from "@/components/ui/sonner"

const fontSans = Outfit({
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
})

export const metadata: Metadata = {
  title: {
    default: "NexusPlay Cloud - RTX 4080 Bulut Oyun Platformu",
    template: `%s - NexusPlay Cloud`,
  },
  description:
    "Yüksek donanımlı RTX 4080 bulut sunucularda 4K 120 FPS ultra düşük gecikmeli WebRTC akışı ile indirme yapmadan anında oyun oyna.",
  keywords: [
    "bulut oyun",
    "cloud gaming",
    "nexusplay",
    "rtx 4080 cloud",
    "webrtc gaming",
    "steam cloud",
    "game pass cloud"
  ],
  authors: [{ name: "NexusPlay Cloud Team" }],
  openGraph: {
    type: "website",
    description:
      "4K 120 FPS sıfır indirme süresiyle yeni nesil bulut oyunculuk deneyimi.",
    url: "https://nexusplay-cloud.vercel.app",
    title: "NexusPlay Cloud Gaming",
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className="scroll-smooth" suppressHydrationWarning lang="tr">
      <body className={fontSans.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <NavbarWrapper>
            <Navbar />
          </NavbarWrapper>
          {children}
          <SetStylingPref />
          <ScrollToTop />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}