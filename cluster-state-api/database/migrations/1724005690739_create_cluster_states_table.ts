import { BaseSchema } from '@adonisjs/lucid/schema'

export default class ClusterStates extends BaseSchema {
  protected tableName = 'cluster_states'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.integer('iops_read').notNullable()
      table.integer('iops_write').notNullable()
      table.integer('throughput_read').notNullable()
      table.integer('throughput_write').notNullable()
      table.timestamp('event_generated_at', { useTz: true }).notNullable()
      table.string('event_id').notNullable()
      table.string('iops_unit').notNullable()
      table.string('throughput_unit').notNullable()
      table.string('cluster_id').notNullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
