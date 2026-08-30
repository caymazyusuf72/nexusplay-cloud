import React from "react"
import { ArrowUpRight, Footprints } from "lucide-react"

interface ProductItem {
  name: string
  sku: string
  category: string
  dateAdded: string
  price: string
  sales: string
  status: "In Stock" | "Out of Stock" | "Running Low"
  color: string
}

export function BrutAdminProductsTable() {
  const products: ProductItem[] = [
    {
      name: "Air Max 270",
      sku: "#NK001",
      category: "Sneakers",
      dateAdded: "23 Jun, 2025",
      price: "$150",
      sales: "3,000",
      status: "In Stock",
      color: "#ffbe00",
    },
    {
      name: "React Infinity Run",
      sku: "#NK002",
      category: "Running",
      dateAdded: "23 Jun, 2025",
      price: "$160",
      sales: "2,500",
      status: "Out of Stock",
      color: "#5093fe",
    },
    {
      name: "Dunk Low Retro",
      sku: "#NK003",
      category: "Sneakers",
      dateAdded: "19 Aug, 2025",
      price: "$100",
      sales: "1,500",
      status: "In Stock",
      color: "#c4ff83",
    },
    {
      name: "Air Force 1 '07",
      sku: "#NK004",
      category: "Lifestyle",
      dateAdded: "19 Aug, 2025",
      price: "$90",
      sales: "1,200",
      status: "Running Low",
      color: "#ff7b07",
    },
    {
      name: "Pegasus 40",
      sku: "#NK005",
      category: "Running",
      dateAdded: "02 Sep, 2025",
      price: "$130",
      sales: "980",
      status: "In Stock",
      color: "#7983ff",
    },
    {
      name: "Blazer Mid '77",
      sku: "#NK006",
      category: "Lifestyle",
      dateAdded: "02 Sep, 2025",
      price: "$110",
      sales: "760",
      status: "Out of Stock",
      color: "#ffd2d2",
    },
  ]

  const getStatusBadge = (status: ProductItem["status"]) => {
    switch (status) {
      case "In Stock":
        return (
          <span className="font-semibold inline-flex items-center px-2 py-1 border-2 border-black text-xs bg-[#c4ff83] text-black">
            In Stock
          </span>
        )
      case "Out of Stock":
        return (
          <span className="font-semibold inline-flex items-center px-2 py-1 border-2 border-black text-xs bg-[#e63946] text-white">
            Out of Stock
          </span>
        )
      case "Running Low":
        return (
          <span className="font-semibold inline-flex items-center px-2 py-1 border-2 border-black text-xs bg-[#ffdb33] text-black">
            Running Low
          </span>
        )
    }
  }

  return (
    <div className="border-2 border-black bg-white ba-shadow overflow-hidden">
      {/* Table Header Controls */}
      <div className="flex items-center justify-between border-b-2 border-black p-5 lg:px-6">
        <div>
          <h4 className="font-heading text-lg font-bold text-black">Popular Products</h4>
          <p className="font-sans text-sm text-neutral-500">Best sellers this month</p>
        </div>
        <button className="font-heading transition-all duration-150 font-bold flex items-center bg-transparent border-2 border-black px-3 py-1 shadow-[2px_2px_0_0_#000] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none gap-1.5 cursor-pointer text-xs text-black">
          View all <ArrowUpRight className="size-3.5 stroke-[2.5]" />
        </button>
      </div>

      {/* Table Content */}
      <div className="w-full overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-black font-heading text-sm font-semibold text-white [&>th]:px-4 [&>th]:py-3.5 lg:[&>th]:px-6">
              <th>Product</th>
              <th className="hidden lg:table-cell">Category</th>
              <th className="hidden md:table-cell">Date Added</th>
              <th className="hidden sm:table-cell">Price</th>
              <th>Sales</th>
              <th className="min-w-[110px]">Status</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, idx) => (
              <tr
                key={p.sku}
                className={`border-b-2 border-black transition-colors hover:bg-[#fffbe6] [&>td]:px-4 [&>td]:py-3 lg:[&>td]:px-6 ${
                  idx === products.length - 1 ? "border-b-0" : ""
                }`}
              >
                <td>
                  <div className="flex items-center gap-3">
                    <div
                      className="flex size-11 shrink-0 items-center justify-center overflow-hidden border-2 border-black"
                      style={{ backgroundColor: p.color }}
                    >
                      <Footprints className="size-6 text-black stroke-[2]" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-black font-sans">
                        {p.name}
                      </p>
                      <p className="text-xs text-neutral-500">{p.sku}</p>
                    </div>
                  </div>
                </td>
                <td className="hidden text-sm lg:table-cell text-neutral-800 font-medium">
                  {p.category}
                </td>
                <td className="hidden text-sm text-neutral-600 md:table-cell font-medium">
                  {p.dateAdded}
                </td>
                <td className="hidden font-heading text-sm font-bold sm:table-cell text-black">
                  {p.price}
                </td>
                <td className="font-heading text-sm font-bold text-black">
                  {p.sales}
                </td>
                <td>{getStatusBadge(p.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
