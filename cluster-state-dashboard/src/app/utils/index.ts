import { formatISO } from 'date-fns'
import { timeRanges, TimeRange } from '@/app/constants'

export function getDateRange(timeRange: TimeRange): { startTime: string, endTime: string } {
  const endTime = new Date()
  const startTime = timeRanges[timeRange]

  return {
    startTime: formatISO(startTime),
    endTime: formatISO(endTime),
  }
}
