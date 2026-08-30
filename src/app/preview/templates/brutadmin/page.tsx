"use client"

import React, { useState } from "react"
import { Download, Plus } from "lucide-react"

import { BrutAdminSidebar } from "@/components/templates/brutadmin/sidebar"
import { BrutAdminHeader } from "@/components/templates/brutadmin/header"
import { BrutAdminStatCards } from "@/components/templates/brutadmin/stat-cards"
import { BrutAdminSalesChart } from "@/components/templates/brutadmin/sales-chart"
import { BrutAdminMonthlyTarget } from "@/components/templates/brutadmin/monthly-target"
import { BrutAdminProductsTable } from "@/components/templates/brutadmin/products-table"
import { BrutAdminProBanner } from "@/components/templates/brutadmin/pro-banner"

export default function BrutAdminPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeNav, setActiveNav] = useState("Dashboard")

  return (
    <div className="flex min-h-screen bg-[#fbfaf5] font-sans text-black antialiased selection:bg-[#ffdb33] selection:text-black">
      {/* Sidebar Navigation */}
      <BrutAdminSidebar
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        activeItem={activeNav}
        setActiveItem={setActiveNav}
      />

      {/* Main Dashboard Canvas */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top Header Bar */}
        <BrutAdminHeader onOpenMobileMenu={() => setMobileMenuOpen(true)} />

        {/* Dashboard Content */}
        <main className="mx-auto w-full max-w-[1500px] flex-1 space-y-6 p-4 lg:p-8">
          {/* Page Heading & Action Buttons */}
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h1 className="font-heading font-bold text-2xl lg:text-3xl text-black tracking-tight">
                Commerce Dashboard
              </h1>
              <p className="font-sans text-base mt-1 text-neutral-500">
                Hello 👋 — welcome back to BrutAdmin!
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button className="font-heading transition-all duration-150 font-bold flex items-center bg-white text-black border-2 border-black px-3.5 py-1.5 text-sm shadow-[2px_2px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none gap-1.5 cursor-pointer">
                <Download className="size-4 stroke-[2.5]" /> Export
              </button>
              <button className="font-heading transition-all duration-150 font-bold flex items-center bg-[#ffdb33] text-black border-2 border-black px-3.5 py-1.5 text-sm shadow-[2px_2px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none gap-1.5 cursor-pointer">
                <Plus className="size-4 stroke-[2.5]" /> Add Product
              </button>
            </div>
          </div>

          {/* 4 KPI / Stat Metric Cards */}
          <BrutAdminStatCards />

          {/* Charts & Target Section */}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <BrutAdminSalesChart />
            </div>
            <div className="lg:col-span-2">
              <BrutAdminMonthlyTarget />
            </div>
          </div>

          {/* Popular Products Data Table */}
          <BrutAdminProductsTable />
        </main>

        {/* Pro Banner */}
        <BrutAdminProBanner />
      </div>
    </div>
  )
}
