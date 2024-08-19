import { BaseSchema } from '@adonisjs/lucid/schema'
import ClusterState from '#models/cluster_state'
import { DateTime } from 'luxon'
import { generateDummyData } from '../../app/utils/index.js'

export default class PopulateClusterStates extends BaseSchema {
  protected tableName = 'cluster_states'

  public async up() {
    const clusters = ['cluster1', 'cluster2', 'cluster3']
    const currentTime = DateTime.now()
    const entries: Partial<ClusterState>[] = []

    const avgEntriesPerMinute = 20
    const totalMinutes = 30 * 24 * 60
    const batchSize = 1000

    for (let i = 0; i < totalMinutes; i++) {
      const eventTime = currentTime.minus({ minutes: i })

      for (let j = 0; j < avgEntriesPerMinute; j++) {
        const randomClusterId = clusters[Math.floor(Math.random() * clusters.length)]
        const dummyData = generateDummyData(randomClusterId)
        dummyData.eventGeneratedAt = eventTime

        entries.push(dummyData)

        if (entries.length === batchSize) {
          await ClusterState.createMany(entries)
          entries.length = 0
        }
      }
    }

    if (entries.length > 0) {
      await ClusterState.createMany(entries)
    }
  }

  public async down() {
    await ClusterState.query().delete()
  }
}
