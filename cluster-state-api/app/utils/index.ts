import { DateTime } from 'luxon'
import { v4 as uuidv4 } from 'uuid'

export function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function generateDummyData(clusterId: string) {
  const isSpike = Math.random() > 0.9 // 10% chance to generate a spike
  const spikeMultiplier = isSpike ? getRandomInt(5, 10) : 1

  return {
    iopsRead: getRandomInt(100, 2000) * spikeMultiplier,
    iopsWrite: getRandomInt(100, 2000) * spikeMultiplier,
    throughputRead: getRandomInt(500, 10000) * spikeMultiplier,
    throughputWrite: getRandomInt(500, 10000) * spikeMultiplier,
    eventGeneratedAt: DateTime.now(),
    eventId: uuidv4(),
    iopsUnit: 'IOPS',
    throughputUnit: 'MB/s',
    clusterId: clusterId,
  }
}
