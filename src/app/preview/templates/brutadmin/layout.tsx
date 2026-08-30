import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "BrutAdmin - Neobrutalism Dashboard Template",
  description:
    "A bold, high-contrast commerce dashboard template built with the Neobrutalism design system.",
}

export default function BrutAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
