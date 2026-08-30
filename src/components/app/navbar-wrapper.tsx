"use client"

import { usePathname } from "next/navigation"
import React from "react"

export default function NavbarWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  if (pathname?.startsWith("/preview")) {
    return null
  }

  return <>{children}</>
}
