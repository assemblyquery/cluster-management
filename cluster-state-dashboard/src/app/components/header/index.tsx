import { useState, createContext, useContext } from 'react'
import { LAST_15_MINUTES, LAST_HOUR, LAST_ONE_DAY, LAST_7_DAYS } from '@/app/constants'

export const DateRangeContext = createContext({
  selectedRange: LAST_ONE_DAY,
  setSelectedRange: (range: string) => {},
})

export function Header() {
  const { selectedRange, setSelectedRange } = useContext(DateRangeContext)

  return (
    <header className="bg-gray-800 shadow-md p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Performance Metrics</h1>
        <div className="text-sm">
          <select
            value={selectedRange}
            onChange={(e) => setSelectedRange(e.target.value)}
            className="bg-gray-700 px-4 py-2 rounded text-gray-200"
          >
            <option value={LAST_15_MINUTES}>Last 15 minutes</option>
            <option value={LAST_HOUR}>Last hour</option>
            <option value={LAST_ONE_DAY}>Last one day</option>
            <option value={LAST_7_DAYS}>Last 7 days</option>
          </select>
        </div>
      </div>
    </header>
  )
}
