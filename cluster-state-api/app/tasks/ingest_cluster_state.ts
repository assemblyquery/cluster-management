import cron, { ScheduledTask } from 'node-cron'
import ClusterState from '#models/cluster_state'
import { generateDummyData } from '../utils/index.js'

let generateDummyDataTask: ScheduledTask

export function executeGenerateDummyData() {
  console.log('Running GenerateDummyData task...')

  const clusterIds = ['cluster1', 'cluster2', 'cluster3']
  const numEntries = 3

  clusterIds.forEach(async (clusterId) => {
    for (let i = 0; i < numEntries; i++) {
      const dummyData = generateDummyData(clusterId)
      await ClusterState.create(dummyData)
      console.log('Dummy data inserted:', dummyData)
    }
  })
}

export function startGenerateDummyDataCron() {
  generateDummyDataTask = cron.schedule('*/2 * * * *', executeGenerateDummyData)
  generateDummyDataTask.start()
  console.log('GenerateDummyData cron job started.')
}

export function stopGenerateDummyDataCron() {
  if (generateDummyDataTask) {
    generateDummyDataTask.stop()
    console.log('GenerateDummyData cron job stopped.')
  }
}
