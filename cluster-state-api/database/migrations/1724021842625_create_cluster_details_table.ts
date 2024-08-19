import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'cluster_details'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.timestamp('created_at', { useTz: true }).notNullable().defaultTo(this.now())
      table.timestamp('updated_at', { useTz: true }).notNullable().defaultTo(this.now())

      table.string('name').notNullable()
      table.string('cluster_id').notNullable()
      table.string('location').nullable()
      table.string('description').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
