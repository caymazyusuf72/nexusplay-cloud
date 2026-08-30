"use client"

import React from "react"
import { Menu, Search, Bell } from "lucide-react"

interface HeaderProps {
  onOpenMobileMenu: () => void
}

export function BrutAdminHeader({ onOpenMobileMenu }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b-2 border-black bg-white px-4 lg:px-6">
      {/* Mobile Hamburger Button */}
      <button
        onClick={onOpenMobileMenu}
        className="border-2 border-black p-2 ba-shadow-sm lg:hidden hover:bg-[#fae583] transition-colors cursor-pointer"
        aria-label="Open menu"
      >
        <Menu className="size-[18px] text-black stroke-[2.5]" />
      </button>

      {/* Search Bar */}
      <div className="relative hidden max-w-sm flex-1 sm:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-[17px] text-neutral-500 stroke-[2]" />
        <input
          type="text"
          placeholder="Search orders, products…"
          className="w-full border-2 border-black bg-white py-2 pl-9 pr-4 text-sm font-medium placeholder:text-neutral-400 focus:outline-none focus:bg-[#fffdf0]"
        />
      </div>

      {/* Right Side Actions */}
      <div className="flex flex-1 items-center justify-end gap-2 sm:gap-3">
        {/* Notification Bell */}
        <button
          className="relative border-2 border-black bg-white p-2 ba-shadow-sm ba-press cursor-pointer hover:bg-[#fae583]"
          aria-label="Notifications"
        >
          <Bell className="size-[18px] text-black stroke-[2.5]" />
          <span className="absolute -right-1.5 -top-1.5 flex size-4 items-center justify-center border-2 border-black bg-[#e63946] text-[9px] font-bold text-white">
            3
          </span>
        </button>

        {/* User Profile Pill */}
        <a
          href="#"
          className="flex items-center gap-2.5 border-2 border-black bg-white py-1 pl-1 pr-3 ba-shadow-sm ba-press hover:bg-[#fae583]"
        >
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full border-2 border-black bg-[#ffdb33] font-heading text-xs font-bold text-black">
            ZS
          </div>
          <div className="hidden text-left leading-tight sm:block">
            <span className="block text-sm font-bold text-black">Zara Smith</span>
            <span className="block text-[11px] font-medium text-neutral-500">Admin</span>
          </div>
        </a>
      </div>
    </header>
  )
}
