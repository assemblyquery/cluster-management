
export interface ClusterState {
  iopsRead: number
  iopsWrite: number
  throughputRead: number
  throughputWrite: number
  eventGeneratedAt: string
  eventId: string
  iopsUnit: string
  throughputUnit: string
  clusterId: string
}

export interface StateQueryParams {
  startTime?: string
  endTime?: string
}

export interface SnapshotPolicy {
  policyName: string;
  directoryPath: string;
  scheduleType: string;
  timeZone: string;
  snapshotTime: {
    hour: string;
    minute: string;
  };
  days: string[];
  deleteAfter: string;
  autoDeleteDays?: number | null;
  isPolicyEnabled: boolean;
  isSnapshotLocked: boolean;
}