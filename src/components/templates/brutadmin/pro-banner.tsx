import React from "react"
import { ArrowRight } from "lucide-react"

export function BrutAdminProBanner() {
  return (
    <>
      {/* Spacer for bottom banner */}
      <div aria-hidden="true" className="h-16" />

      {/* Floating Sticky Pro Banner */}
      <div
        data-pro-banner="true"
        className="fixed inset-x-0 bottom-0 z-40 border-t-2 border-black bg-[#ffdb33] text-black"
      >
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-4 gap-y-2 px-4 py-3 text-center text-sm">
          <span className="font-heading font-medium">
            This template is built with{" "}
            <strong className="font-bold">Neobrutalism Design System</strong>
          </span>
          <a
            href="/docs"
            className="inline-flex items-center gap-1.5 border-2 border-black bg-white px-4 py-1.5 font-heading text-sm font-bold text-black shadow-[3px_3px_0_0_#000] transition hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none"
          >
            Explore Components <ArrowRight className="size-4 stroke-[2.5]" />
          </a>
        </div>
      </div>
    </>
  )
}
