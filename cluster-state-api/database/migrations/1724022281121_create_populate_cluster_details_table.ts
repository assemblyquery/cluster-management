
import { BaseSchema } from '@adonisjs/lucid/schema'
import ClusterDetail from '#models/cluster_detail'

export default class PopulateClusterDetails extends BaseSchema {
  protected tableName = 'cluster_details'

  public async up() {
    await ClusterDetail.createMany([
      {
        clusterId: 'cluster1',
        name: 'Alpha Cluster',
        location: 'New York, USA',
        description: 'Primary data center cluster in NY.',
      },
      {
        clusterId: 'cluster2',
        name: 'Beta Cluster',
        location: 'San Francisco, USA',
        description: 'Secondary data center cluster in SF.',
      },
      {
        clusterId: 'cluster3',
        name: 'Gamma Cluster',
        location: 'London, UK',
        description: 'Tertiary data center cluster in London.',
      },
    ])
  }

  public async down() {
    await ClusterDetail.query().delete()
  }
}
