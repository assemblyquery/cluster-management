'use client'

import { ReactNode, useState } from 'react'
import './globals.css'
import { DateRangeContext, Header } from '@/app/components/header'
import { LAST_ONE_DAY } from '@/app/constants'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FaUserCircle } from 'react-icons/fa'

export default function RootLayout({ children }: { children: ReactNode }) {
  const [selectedRange, setSelectedRange] = useState(LAST_ONE_DAY)

  return (
    <html lang="en">
    <body className="bg-gray-900 text-gray-300">
    <DateRangeContext.Provider value={{ selectedRange, setSelectedRange }}>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-y-auto">
          <Header />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </DateRangeContext.Provider>
    </body>
    </html>
  )
}

function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="bg-gray-800 text-white w-64 flex-shrink-0">
      <div className="p-4 text-xl font-bold">[Cluster Name]</div>
      <nav className="space-y-2">
        <Link
          href="/performance-metrics"
          className={`block px-4 py-2 hover:bg-gray-700 rounded ${
            pathname === '/performance-metrics' ? 'bg-gray-700' : ''
          }`}
        >
          Performance Metrics
        </Link>
        <Link
          href="/edit-snapshot-policy"
          className={`block px-4 py-2 hover:bg-gray-700 rounded ${
            pathname === '/edit-snapshot-policy' ? 'bg-gray-700' : ''
          }`}
        >
          Edit Snapshot Policy
        </Link>
      </nav>
      <div className="absolute bottom-0 p-4 text-sm">
        <div className="flex items-center space-x-2">
          <FaUserCircle className="h-8 w-8 text-gray-300"/>
        </div>
      </div>
    </div>
  )
}

