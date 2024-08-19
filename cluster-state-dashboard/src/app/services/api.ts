import axios from 'axios'
import { API_BASE_URL } from '@/app/constants'
import { StateQueryParams } from '@/app/types/'
import { SnapshotPolicy } from '@/app/types';

export async function fetchClusterStates(startTime?: string, endTime?: string) {
  try {
    const params: StateQueryParams = {}

    if (startTime) params['startTime'] = startTime
    if (endTime) params['endTime'] = endTime

    const response = await axios.get(`${API_BASE_URL}/cluster-states`, { params })
    return response.data.data
  } catch (error) {
    console.error('Error fetching data:', error)
    return []
  }
}

export async function fetchSnapshotPolicy() {
  try {
    const response = await axios.get(`${API_BASE_URL}/snapshot-policy`)
    return response.data
  } catch (error) {
    console.error('Error fetching snapshot policy:', error)
    return null
  }
}

export async function saveSnapshotPolicy(policy: SnapshotPolicy) {
  try {
    const response = await axios.post(`${API_BASE_URL}/snapshot-policy`, policy)
    return response.data
  } catch (error) {
    console.error('Error saving snapshot policy:', error)
    throw error
  }
}