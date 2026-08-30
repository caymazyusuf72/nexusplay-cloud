"use client"

import React, { useState } from "react"

interface SalesDataPoint {
  month: string
  value: number // in thousands ($K)
  maxScale?: number
}

export function BrutAdminSalesChart() {
  const [activeFilter, setActiveFilter] = useState<"12M" | "30D" | "7D">("12M")

  const data12M: SalesDataPoint[] = [
    { month: "Jan", value: 25 },
    { month: "Feb", value: 10 },
    { month: "Mar", value: 45 },
    { month: "Apr", value: 25 },
    { month: "May", value: 65 },
    { month: "Jun", value: 45 },
    { month: "Jul", value: 10 },
    { month: "Aug", value: 15 },
    { month: "Sep", value: 45 },
    { month: "Oct", value: 25 },
    { month: "Nov", value: 65 },
    { month: "Dec", value: 10 },
  ]

  const data30D: SalesDataPoint[] = [
    { month: "W1", value: 18 },
    { month: "W2", value: 42 },
    { month: "W3", value: 30 },
    { month: "W4", value: 55 },
  ]

  const data7D: SalesDataPoint[] = [
    { month: "Mon", value: 12 },
    { month: "Tue", value: 24 },
    { month: "Wed", value: 18 },
    { month: "Thu", value: 35 },
    { month: "Fri", value: 48 },
    { month: "Sat", value: 30 },
    { month: "Sun", value: 15 },
  ]

  const currentData =
    activeFilter === "12M" ? data12M : activeFilter === "30D" ? data30D : data7D

  const maxY = 80

  return (
    <div className="border-2 border-black bg-white p-5 lg:p-6 ba-shadow">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h4 className="font-heading text-lg font-bold text-black">Monthly Sales</h4>
          <p className="font-sans text-sm text-neutral-500">
            Revenue in thousands ($K)
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex border-2 border-black ba-shadow-sm">
          {(["12M", "30D", "7D"] as const).map((filter, index) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1.5 text-xs font-bold transition-colors cursor-pointer ${
                index > 0 ? "border-l-2 border-black" : ""
              } ${
                activeFilter === filter
                  ? "bg-[#ffdb33] text-black"
                  : "bg-white text-neutral-500 hover:bg-[#fae583] hover:text-black"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="flex gap-3">
        {/* Y-Axis Labels */}
        <div className="flex h-56 flex-col justify-between py-1 text-right text-[11px] font-medium text-neutral-400 select-none">
          <span>80</span>
          <span>60</span>
          <span>40</span>
          <span>20</span>
          <span>0</span>
        </div>

        {/* Bars Container */}
        <div className="min-w-0 flex-1">
          <div className="relative h-56">
            {/* Horizontal Dashed Gridlines */}
            <div className="absolute inset-x-0 border-t border-dashed border-black/15 bottom-[100%]" />
            <div className="absolute inset-x-0 border-t border-dashed border-black/15 bottom-[75%]" />
            <div className="absolute inset-x-0 border-t border-dashed border-black/15 bottom-[50%]" />
            <div className="absolute inset-x-0 border-t border-dashed border-black/15 bottom-[25%]" />
            <div className="absolute inset-x-0 border-t border-dashed border-black/15 bottom-0" />

            {/* Bars */}
            <div className="absolute inset-0 flex items-end justify-between gap-1.5 sm:gap-2.5">
              {currentData.map((d, idx) => {
                const heightPct = Math.min((d.value / maxY) * 100, 100)
                const delay = idx * 55

                return (
                  <div
                    key={`${d.month}-${activeFilter}`}
                    className="group relative flex h-full flex-1 items-end cursor-pointer"
                  >
                    {/* Hover Tooltip */}
                    <div className="pointer-events-none absolute inset-x-0 -top-1 z-10 mx-auto flex -translate-y-full justify-center opacity-0 transition-opacity duration-150 group-hover:opacity-100">
                      <span className="whitespace-nowrap border-2 border-black bg-black px-2 py-1 text-[11px] font-bold text-white shadow-xs">
                        ${d.value}K
                      </span>
                    </div>

                    {/* Bar */}
                    <div
                      className="ba-bar w-full border-2 border-black bg-[#ffdb33] transition-colors group-hover:bg-[#ffcc00]"
                      style={{
                        height: `${heightPct}%`,
                        animationDelay: `${delay}ms`,
                      }}
                    />
                  </div>
                )
              })}
            </div>
          </div>

          {/* X-Axis Month Labels */}
          <div className="mt-2 flex justify-between gap-1.5 sm:gap-2.5 select-none">
            {currentData.map((d) => (
              <span
                key={d.month}
                className="flex-1 text-center text-[10px] font-medium text-neutral-500"
              >
                {d.month}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
