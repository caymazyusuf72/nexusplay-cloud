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
    default:
      "NexusPlay Cloud - Future of Cloud Gaming",
    template: `%s - NexusPlay`,
  },
  description:
    "A collection of neobrutalism-styled components based on shadcn/ui.",
  keywords: [
    "neobrutalism",
    "neobrutalism components",
    "neobrutalism tailwind",
    "react neobrutalism",
    "react tailwind components",
    "shadcn components",
    "shadcn neobrutalism",
  ],
  authors: [{ name: "Samuel Breznjak", url: "https://github.com/ekmas" }],
  openGraph: {
    type: "website",
    description:
      "Geleceğin acımasız sokaklarında hayatta kal. Işın izleme teknolojisiyle geliştirilmiş grafikleriyle şimdi bulutta oyna.",
    images: ["https://www.neobrutalism.dev/preview.png"],
    url: "https://www.nexusplay.cloud/",
    title: "NexusPlay Cloud Gaming",
  },
  metadataBase: new URL("https://www.neobrutalism.dev/"),
  twitter: {
    card: "summary_large_image",
    title: "Neobrutalism components - Start making neobrutalism layouts",
    description:
      "A collection of neobrutalism-styled components based on shadcn/ui.",
    images: ["https://www.neobrutalism.dev/preview.png"],
    creator: "@samuelbreznjak",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className="scroll-smooth" suppressHydrationWarning lang="en">
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