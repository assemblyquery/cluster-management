import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class ClusterState extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  public iopsRead!: number

  @column()
  public iopsWrite!: number

  @column()
  public throughputRead!: number

  @column()
  public throughputWrite!: number

  @column.dateTime()
  public eventGeneratedAt!: DateTime

  @column()
  public eventId!: string

  @column()
  public iopsUnit!: string

  @column()
  public throughputUnit!: string

  @column()
  public clusterId!: string


}
