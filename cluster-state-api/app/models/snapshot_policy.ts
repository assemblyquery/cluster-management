import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class SnapshotPolicy extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @column()
  public policyName!: string

  @column()
  public directoryPath!: string

  @column()
  public scheduleType!: string

  @column()
  public timeZone!: string

  @column()
  public snapshotTime!: string

  @column()
  public days!: string[]

  @column()
  public deleteAfter!: string

  @column()
  public autoDeleteDays!: number | null

  @column()
  public isPolicyEnabled!: boolean

  @column()
  public isSnapshotLocked!: boolean

}
