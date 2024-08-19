
import type { HttpContext } from '@adonisjs/core/http'
import SnapshotPolicy from '#models/snapshot_policy'

export default class SnapshotPolicyController {
  public async show({ response }: HttpContext) {
    const policy = await SnapshotPolicy.first()
    return response.json(policy)
  }

  public async update({ request, response }: HttpContext) {
    const data = request.only([
      'policyName',
      'directoryPath',
      'scheduleType',
      'timeZone',
      'snapshotTime',
      'days',
      'deleteAfter',
      'autoDeleteDays',
      'isPolicyEnabled',
      'isSnapshotLocked',
    ])

    if (data.days && Array.isArray(data.days)) {
      data.days = JSON.stringify(data.days)
    }

    let policy = await SnapshotPolicy.first()
    if (policy) {
      policy.merge(data)
    } else {
      policy = new SnapshotPolicy()
      policy.fill(data)
    }
    await policy.save()

    return response.json({ message: 'Policy saved successfully', policy })
  }
}

