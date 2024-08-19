// TODO DEFINE ENV
export const API_BASE_URL = 'http://localhost:3333/api/v1';

import { subMinutes, subHours, subDays } from 'date-fns'

export const LAST_15_MINUTES = 'LAST_15_MINUTES'
export const LAST_HOUR = 'LAST_HOUR'
export const LAST_ONE_DAY = 'LAST_ONE_DAY'
export const LAST_7_DAYS = 'LAST_7_DAYS'

export const timeRanges = {
  [LAST_15_MINUTES]: subMinutes(new Date(), 15),
  [LAST_HOUR]: subHours(new Date(), 1),
  [LAST_ONE_DAY]: subDays(new Date(), 1),
  [LAST_7_DAYS]: subDays(new Date(), 7),
}

export type TimeRange = typeof LAST_15_MINUTES | typeof LAST_HOUR | typeof LAST_ONE_DAY | typeof LAST_7_DAYS
