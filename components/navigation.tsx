"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { Car } from "lucide-react"

export function Navigation() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true
    if (path !== "/" && pathname.startsWith(path)) return true
    return false
  }

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <Car className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">RentKaro</span>
          </Link>
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`${
                isActive("/")
                  ? "text-blue-600 font-medium border-b-2 border-blue-600 pb-4"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Home
            </Link>
            <Link
              href="/cars"
              className={`${
                isActive("/cars")
                  ? "text-blue-600 font-medium border-b-2 border-blue-600 pb-4"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Cars
            </Link>
            <Link
              href="/booking"
              className={`${
                isActive("/booking")
                  ? "text-blue-600 font-medium border-b-2 border-blue-600 pb-4"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Book Now
            </Link>
            <Link
              href="/contact"
              className={`${
                isActive("/contact")
                  ? "text-blue-600 font-medium border-b-2 border-blue-600 pb-4"
                  : "text-gray-700 hover:text-blue-600"
              }`}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
