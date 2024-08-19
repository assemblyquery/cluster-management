import type { HttpContext } from '@adonisjs/core/http'
import ClusterState from '#models/cluster_state'

export default class ClusterStatesController {

  public async store({ request, response }: HttpContext) {
    const clusterStates = request.input('clusterStates')
    await ClusterState.createMany(clusterStates)
    return response.created({ message: 'Cluster states added successfully' })
  }

  public async index({ request }: HttpContext) {
    const page = request.input('page', 1)
    const perPage = request.input('perPage', 10000)
    const startTime = request.input('startTime')
    const endTime = request.input('endTime')
    const minThroughput = request.input('minThroughput')
    const maxThroughput = request.input('maxThroughput')
    const minIops = request.input('minIops')
    const maxIops = request.input('maxIops')
    const clusterId = request.input('clusterId')

    const query = ClusterState.query()

    if (startTime && endTime) {
      query.whereBetween('eventGeneratedAt', [startTime, endTime])
    }

    if (minThroughput && maxThroughput) {
      query.whereBetween('throughputRead', [minThroughput, maxThroughput])
    } else if (minThroughput) {
      query.where('throughputRead', '>=', minThroughput)
    } else if (maxThroughput) {
      query.where('throughputRead', '<=', maxThroughput)
    }

    if (minIops && maxIops) {
      query.whereBetween('iopsRead', [minIops, maxIops])
    } else if (minIops) {
      query.where('iopsRead', '>=', minIops)
    } else if (maxIops) {
      query.where('iopsRead', '<=', maxIops)
    }

    if (clusterId) {
      query.where('clusterId', clusterId)
    }

    return query.paginate(page, perPage)
  }

}
