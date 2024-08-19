import { useEffect, useState, useContext } from 'react'
import { fetchClusterStates } from '@/app/services/api'
import { IOPSChart, ThroughputChart } from './Dashboard'
import { ClusterState } from '@/app/types'
import { getDateRange } from '@/app/utils'
import { DateRangeContext } from '@/app/components/header'

export default function Dashboard() {
  const [data, setData] = useState<ClusterState[]>([])
  const { selectedRange } = useContext(DateRangeContext)

  useEffect(() => {
    // @ts-ignore
    const { startTime, endTime } = getDateRange(selectedRange)
    fetchClusterStates(startTime, endTime).then(setData)
  }, [selectedRange])

  return (
    <div className="space-y-6">
      <div className="bg-gray-900 p-6 rounded-lg shadow-md">
        <IOPSChart data={data} dateRange={selectedRange} />
      </div>

      <div className="bg-gray-900 p-6 rounded-lg shadow-md">
        <ThroughputChart data={data} dateRange={selectedRange} />
      </div>
    </div>
  )
}
