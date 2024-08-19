/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const ClusterStateController = () => import('#controllers/cluster_states_controller')
const SnapshotPolicyController = () => import('#controllers/snapshot_policies_controller')

import router from '@adonisjs/core/services/router'

router.get('/', async () => {
  return {
    'Hi there...': 'Whaaaat? Space in key? Not sdf!',
  }
})

router.get('/health', async () => {

  return {
    message: 'cluster-states api service is running phneeee!!!',
  }
})

router.group(() => {

  router.post('/cluster-states', [ClusterStateController, 'store'])
  router.get('/cluster-states', [ClusterStateController, 'index'])

  router.get('/snapshot-policy', [SnapshotPolicyController, 'show'])
  router.post('/snapshot-policy', [SnapshotPolicyController, 'update'])

}).prefix('api/v1')

