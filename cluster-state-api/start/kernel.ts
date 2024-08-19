/*
|--------------------------------------------------------------------------
| HTTP kernel file
|--------------------------------------------------------------------------
|
| The HTTP kernel file is used to register the middleware with the server
| or the router.
|
*/

import router from '@adonisjs/core/services/router'
import server from '@adonisjs/core/services/server'

import { startGenerateDummyDataCron, stopGenerateDummyDataCron } from "#tasks/ingest_cluster_state";

if (process.env.MIGRATION_RUN) {
  stopGenerateDummyDataCron()
} else {
  startGenerateDummyDataCron()
}

server.errorHandler(() => import('#exceptions/handler'))

server.use([
  () => import('#middleware/container_bindings_middleware'),
  () => import('#middleware/force_json_response_middleware'),
  () => import('@adonisjs/cors/cors_middleware'),
])

router.use([() => import('@adonisjs/core/bodyparser_middleware')])

export const middleware = router.named({})
