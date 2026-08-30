"use client"

import React from "react"
import {
  Zap,
  X,
  LayoutDashboard,
  ShoppingCart,
  Package,
  Users,
  BarChart3,
  ListTodo,
  CreditCard,
  Puzzle,
  Settings,
  Sparkles,
  LogOut,
} from "lucide-react"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  activeItem?: string
  setActiveItem?: (item: string) => void
}

export function BrutAdminSidebar({
  isOpen,
  onClose,
  activeItem = "Dashboard",
  setActiveItem,
}: SidebarProps) {
  const menuItems = [
    { name: "Dashboard", icon: LayoutDashboard, badge: null },
    { name: "Orders", icon: ShoppingCart, badge: "24" },
    { name: "Products", icon: Package, badge: null },
    { name: "Customers", icon: Users, badge: null },
    { name: "Analytics", icon: BarChart3, badge: null },
  ]

  const generalItems = [
    { name: "Tasks", icon: ListTodo, badge: "5" },
    { name: "Billing", icon: CreditCard, badge: null },
    { name: "Integrations", icon: Puzzle, badge: null },
    { name: "Settings", icon: Settings, badge: null },
  ]

  const handleItemClick = (name: string, e: React.MouseEvent) => {
    e.preventDefault()
    if (setActiveItem) {
      setActiveItem(name)
    }
    if (window.innerWidth < 1024) {
      onClose()
    }
  }

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs lg:hidden"
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r-2 border-black bg-white transition-transform duration-200 lg:sticky lg:top-0 lg:z-10 lg:h-screen lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="flex h-16 shrink-0 items-center justify-between gap-2 border-b-2 border-black px-4">
          <a className="flex items-center gap-2.5" href="#">
            <span className="flex size-9 items-center justify-center border-2 border-black bg-[#ffdb33] ba-shadow-sm">
              <Zap className="size-[18px] text-black stroke-[3]" />
            </span>
            <span className="font-heading text-xl font-bold tracking-tight text-black">
              BrutAdmin
            </span>
          </a>
          <button
            onClick={onClose}
            className="border-2 border-black p-1 lg:hidden hover:bg-[#fae583] transition-colors cursor-pointer"
            aria-label="Close menu"
          >
            <X className="size-4 text-black stroke-[2.5]" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-3 scrollbar">
          <p className="px-3 pb-2 pt-1 text-[11px] font-bold uppercase tracking-widest text-neutral-400">
            Menu
          </p>
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeItem === item.name
            return (
              <a
                key={item.name}
                href="#"
                onClick={(e) => handleItemClick(item.name, e)}
                className={`group flex items-center gap-3 border-2 px-3 py-2.5 text-sm transition-all ${
                  isActive
                    ? "border-black bg-[#ffdb33] font-bold text-black ba-shadow-sm"
                    : "border-transparent text-neutral-700 font-medium hover:border-black hover:bg-[#fae583] hover:text-black"
                }`}
              >
                <Icon className="size-[18px] shrink-0 stroke-[2.5]" />
                <span className="flex-1 truncate">{item.name}</span>
                {item.badge && (
                  <span className="flex h-5 min-w-5 items-center justify-center border-2 border-black bg-[#ffdb33] px-1 text-[11px] font-bold text-black">
                    {item.badge}
                  </span>
                )}
              </a>
            )
          })}

          <p className="px-3 pb-2 pt-4 text-[11px] font-bold uppercase tracking-widest text-neutral-400">
            General
          </p>
          {generalItems.map((item) => {
            const Icon = item.icon
            const isActive = activeItem === item.name
            return (
              <a
                key={item.name}
                href="#"
                onClick={(e) => handleItemClick(item.name, e)}
                className={`group flex items-center gap-3 border-2 px-3 py-2.5 text-sm transition-all ${
                  isActive
                    ? "border-black bg-[#ffdb33] font-bold text-black ba-shadow-sm"
                    : "border-transparent text-neutral-700 font-medium hover:border-black hover:bg-[#fae583] hover:text-black"
                }`}
              >
                <Icon className="size-[18px] shrink-0 stroke-[2.5]" />
                <span className="flex-1 truncate">{item.name}</span>
                {item.badge && (
                  <span className="flex h-5 min-w-5 items-center justify-center border-2 border-black bg-[#ffdb33] px-1 text-[11px] font-bold text-black">
                    {item.badge}
                  </span>
                )}
              </a>
            )
          })}
        </nav>

        {/* Footer Area with Go Pro and Logout */}
        <div className="shrink-0 space-y-3 border-t-2 border-black p-3">
          <div className="border-2 border-black bg-[#fae583] p-3 ba-shadow-sm">
            <div className="mb-1 flex items-center gap-1.5 text-black">
              <Sparkles className="size-[15px] stroke-[2.5]" />
              <span className="font-heading text-sm font-bold">Go Pro</span>
            </div>
            <p className="mb-2.5 text-xs leading-snug text-neutral-700">
              Unlock advanced analytics & unlimited exports.
            </p>
            <button className="font-heading transition-all duration-150 font-bold flex items-center bg-black text-white border-2 border-black px-3 py-1.5 text-xs w-full justify-center shadow-[2px_2px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none cursor-pointer">
              Upgrade
            </button>
          </div>

          <a
            href="#"
            className="flex items-center gap-3 border-2 border-transparent px-3 py-2 text-sm font-medium text-neutral-600 transition-colors hover:border-black hover:bg-[#ffd2d2] hover:text-black"
          >
            <LogOut className="size-[18px] stroke-[2.5]" />
            <span>Log out</span>
          </a>
        </div>
      </aside>
    </>
  )
}
