
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { ClusterState } from '@/app/types'
import { format, parseISO } from 'date-fns'
import numbro from 'numbro'

interface IOPSChartProps {
  data: ClusterState[]
  dateRange: string
}

interface ThroughputChartProps {
  data: ClusterState[]
  dateRange: string
}

function downsampleData(data: ClusterState[], maxPoints: number) {
  const downsampleRate = Math.max(Math.floor(data.length / maxPoints), 1)
  return data.filter((_, index) => index % downsampleRate === 0)
}

function getTickFormatter(dateRange: string) {
  switch (dateRange) {
    case 'last15Minutes':
    case 'lastHour':
      return (value: string) => format(parseISO(value), 'HH:mm')
    case 'lastDay':
      return (value: string) => format(parseISO(value), 'HH:mm')
    case 'last7Days':
      return (value: string) => format(parseISO(value), 'MMM d')
    default:
      return (value: string) => format(parseISO(value), 'MMM d')
  }
}

export function IOPSChart({ data, dateRange }: IOPSChartProps) {
  const downsampledData = downsampleData(data, 500)

  const totalRead = downsampledData.reduce((sum, item) => sum + item.iopsRead, 0)
  const totalWrite = downsampledData.reduce((sum, item) => sum + item.iopsWrite, 0)

  const formattedTotalRead = numbro(totalRead).format({
    output: 'number',
    average: true,
    mantissa: 2,
  })
  const formattedTotalWrite = numbro(totalWrite).format({
    output: 'number',
    average: true,
    mantissa: 2,
  })

  const maxYValue = Math.floor(Math.max(totalRead / downsampledData.length, totalWrite / downsampledData.length) * 20)

  return (
    <div className="flex items-start">
      <ResponsiveContainer width="80%" height={200}>
        <LineChart data={downsampledData}>
          <Line type="monotone" dataKey="iopsRead" stroke="#a78bfa" dot={false} />
          <Line type="monotone" dataKey="iopsWrite" stroke="#38bdf8" dot={false} />
          <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
          <XAxis
            dataKey="eventGeneratedAt"
            stroke="#cbd5e1"
            tickFormatter={getTickFormatter(dateRange)}
            interval="preserveStartEnd"
            minTickGap={50}
          />
          <YAxis stroke="#cbd5e1" domain={[0, maxYValue]} />
          <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155' }} />
        </LineChart>
      </ResponsiveContainer>

      <div className="w-1/4 ml-4 bg-gray-800 p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-200">IOPS</h3>
        <div className="mt-4 text-sm text-gray-400">Read</div>
        <div className="text-xl font-bold text-purple-400">{formattedTotalRead} IOPS</div>
        <div className="mt-2 text-sm text-gray-400">Write</div>
        <div className="text-xl font-bold text-blue-400">{formattedTotalWrite} IOPS</div>
      </div>
    </div>
  )
}

export function ThroughputChart({ data, dateRange }: ThroughputChartProps) {
  const downsampledData = downsampleData(data, 500)

  const totalRead = downsampledData.reduce((sum, item) => sum + item.throughputRead, 0)
  const totalWrite = downsampledData.reduce((sum, item) => sum + item.throughputWrite, 0)

  const formattedTotalRead = numbro(totalRead).format({
    output: 'byte',
    base: 'binary',
    mantissa: 1,
    spaceSeparated: true,
  })
  const formattedTotalWrite = numbro(totalWrite).format({
    output: 'byte',
    base: 'binary',
    mantissa: 1,
    spaceSeparated: true,
  })

  const maxYValue = Math.floor(Math.max(totalRead / downsampledData.length, totalWrite / downsampledData.length) * 15)

  return (
    <div className="flex items-start">
      <ResponsiveContainer width="80%" height={200}>
        <LineChart data={downsampledData}>
          <Line type="monotone" dataKey="throughputRead" stroke="#a78bfa" dot={false} />
          <Line type="monotone" dataKey="throughputWrite" stroke="#38bdf8" dot={false} />
          <CartesianGrid stroke="#334155" strokeDasharray="3 3" />
          <XAxis
            dataKey="eventGeneratedAt"
            stroke="#cbd5e1"
            tickFormatter={getTickFormatter(dateRange)}
            interval="preserveStartEnd"
            minTickGap={50}
          />
          <YAxis stroke="#cbd5e1" domain={[0, maxYValue]} />
          <Tooltip contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155' }} />
        </LineChart>
      </ResponsiveContainer>

      <div className="w-1/4 ml-4 bg-gray-800 p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-200">Throughput</h3>
        <div className="mt-4 text-sm text-gray-400">Read</div>
        <div className="text-xl font-bold text-purple-400">{formattedTotalRead}/s</div>
        <div className="mt-2 text-sm text-gray-400">Write</div>
        <div className="text-xl font-bold text-blue-400">{formattedTotalWrite}/s</div>
      </div>
    </div>
  )
}
