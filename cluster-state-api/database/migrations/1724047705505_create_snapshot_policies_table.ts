import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'snapshot_policies'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())

      table.string('policy_name').notNullable()
      table.string('directory_path').notNullable()
      table.string('schedule_type').notNullable()
      table.string('time_zone').notNullable()
      table.string('snapshot_time').notNullable()
      table.json('days').notNullable()
      table.string('delete_after').notNullable()
      table.integer('auto_delete_days').nullable()
      table.boolean('is_policy_enabled').defaultTo(true)
      table.boolean('is_snapshot_locked').defaultTo(false)
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
