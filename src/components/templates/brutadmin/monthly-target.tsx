import React from "react"
import { MoreHorizontal, TrendingUp } from "lucide-react"

export function BrutAdminMonthlyTarget() {
  return (
    <div className="border-2 border-black bg-white p-5 lg:p-6 ba-shadow flex h-full flex-col">
      {/* Header */}
      <div className="mb-2 flex items-start justify-between">
        <div>
          <h4 className="font-heading text-lg font-bold text-black">Monthly Target</h4>
          <p className="font-sans text-sm text-neutral-500">
            Target you set for this month
          </p>
        </div>
        <button
          className="border-2 border-black p-1.5 ba-shadow-sm ba-press hover:bg-[#fae583] cursor-pointer"
          aria-label="More"
        >
          <MoreHorizontal className="size-4 text-black stroke-[2]" />
        </button>
      </div>

      {/* SVG Semi-Circular Gauge Meter */}
      <div className="relative mx-auto w-full max-w-[280px]">
        <svg viewBox="0 0 200 118" className="w-full">
          {/* Black Outer Contour */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="#0a0a0a"
            strokeWidth="24"
            strokeLinecap="butt"
          />
          {/* Neutral Inactive Arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="#efefef"
            strokeWidth="18"
            strokeLinecap="butt"
          />
          {/* Yellow Active Progress Arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="#ffdb33"
            strokeWidth="18"
            strokeLinecap="butt"
            className="ba-gauge"
            style={{
              strokeDasharray: "251.3px",
              strokeDashoffset: "61.44px",
            }}
          />
        </svg>

        {/* Center Percentage and Trend Badge */}
        <div className="absolute inset-x-0 bottom-1 flex flex-col items-center">
          <span className="font-heading text-3xl font-bold leading-none text-black">
            75.55%
          </span>
          <span className="mt-1.5 inline-flex items-center gap-1 border-2 border-black bg-[#c4ff83] px-2 py-0.5 text-[11px] font-bold text-black">
            <TrendingUp className="size-3 stroke-[2.5]" /> +11.01%
          </span>
        </div>
      </div>

      {/* Motivational Caption */}
      <p className="font-sans mx-auto mb-4 max-w-[16rem] text-center text-sm text-neutral-600">
        You earned <span className="font-bold text-black">$3,367</span> today — higher
        than last month. Keep it up!
      </p>

      {/* Goal Progress Bar */}
      <div className="mb-5">
        <div className="mb-1.5 flex items-center justify-between text-xs font-medium">
          <span className="text-neutral-500">Goal completion</span>
          <span className="font-bold text-black">75.55%</span>
        </div>
        <div className="relative flex w-full items-center overflow-hidden border-2 h-3.5 border-black bg-white">
          <div
            className="h-full bg-[#ffdb33] border-r-2 border-black transition-all"
            style={{ width: "75.55%" }}
          />
        </div>
      </div>

      {/* 3 Summary Stat Boxes */}
      <div className="mt-auto grid grid-cols-3 gap-2.5">
        <div className="border-2 border-black bg-black px-2 py-2.5 text-center text-white">
          <div className="font-heading text-base font-bold leading-none">$50K</div>
          <div className="mt-1 text-[11px] text-neutral-300">Target</div>
        </div>
        <div className="border-2 border-black bg-black px-2 py-2.5 text-center text-white">
          <div className="font-heading text-base font-bold leading-none">$28.5K</div>
          <div className="mt-1 text-[11px] text-neutral-300">Revenue</div>
        </div>
        <div className="border-2 border-black bg-black px-2 py-2.5 text-center text-white">
          <div className="font-heading text-base font-bold leading-none">$3.4K</div>
          <div className="mt-1 text-[11px] text-neutral-300">Today</div>
        </div>
      </div>
    </div>
  )
}
