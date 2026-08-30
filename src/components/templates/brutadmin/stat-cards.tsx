import React from "react"
import { Package, Truck, CircleX, DollarSign, TrendingUp, TrendingDown } from "lucide-react"

interface StatCardProps {
  label: string
  value: string
  change: string
  isPositive: boolean
  icon: React.ComponentType<{ className?: string }>
  cornerBg: string
}

export function BrutAdminStatCards() {
  const stats: StatCardProps[] = [
    {
      label: "Total Orders",
      value: "357",
      change: "12.5%",
      isPositive: true,
      icon: Package,
      cornerBg: "#fae583",
    },
    {
      label: "Delivered",
      value: "220",
      change: "23.0%",
      isPositive: true,
      icon: Truck,
      cornerBg: "#c4ff83",
    },
    {
      label: "Canceled",
      value: "65",
      change: "15.0%",
      isPositive: false,
      icon: CircleX,
      cornerBg: "#ffd2d2",
    },
    {
      label: "Total Revenue",
      value: "$28,567",
      change: "13.0%",
      isPositive: true,
      icon: DollarSign,
      cornerBg: "#ffdb33",
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat, i) => {
        const Icon = stat.icon
        return (
          <div
            key={i}
            className="relative overflow-hidden border-2 border-black bg-white p-5 ba-shadow ba-press"
          >
            {/* Top-Right Decorative Neo-Brutalist Icon Box */}
            <div
              className="absolute right-0 top-0 flex size-16 items-center justify-center border-b-2 border-l-2 border-black"
              style={{ backgroundColor: stat.cornerBg }}
            >
              <Icon className="size-[26px] text-black stroke-[2.5]" />
            </div>

            <p className="font-sans mb-1 pr-16 text-sm font-medium text-neutral-500">
              {stat.label}
            </p>
            <h2 className="font-heading font-bold mb-4 text-3xl text-black">
              {stat.value}
            </h2>

            <span
              className={`font-semibold inline-flex items-center px-2 py-1 text-xs gap-1 border-2 border-black ${
                stat.isPositive
                  ? "bg-[#c4ff83] text-black"
                  : "bg-[#e63946] text-white"
              }`}
            >
              {stat.isPositive ? (
                <TrendingUp className="size-3.5 stroke-[2.5]" />
              ) : (
                <TrendingDown className="size-3.5 stroke-[2.5]" />
              )}
              {stat.change}
            </span>
          </div>
        )
      })}
    </div>
  )
}
