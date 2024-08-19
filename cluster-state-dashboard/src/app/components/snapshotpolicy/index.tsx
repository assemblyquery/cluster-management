import React, { useState, useEffect } from 'react';
import { fetchSnapshotPolicy, saveSnapshotPolicy } from '@/app/services/api'
import { SnapshotPolicy } from '@/app/types';

export default function SnapshotPolicyForm() {
  const [policyName, setPolicyName] = useState('');
  const [directoryPath, setDirectoryPath] = useState('');
  const [scheduleType, setScheduleType] = useState('Daily or Weekly');
  const [timeZone, setTimeZone] = useState('America/Los Angeles');
  const [snapshotTime, setSnapshotTime] = useState({ hour: '07', minute: '00' });
  const [days, setDays] = useState(['Mon', 'Tue', 'Wed', 'Thu', 'Fri']);
  const [deleteAfter, setDeleteAfter] = useState('Never');
  const [autoDeleteDays, setAutoDeleteDays] = useState(99);
  const [isPolicyEnabled, setIsPolicyEnabled] = useState(true);
  const [isSnapshotLocked, setIsSnapshotLocked] = useState(false);

  useEffect(() => {
    const fetchPolicy = async () => {
      const policy = await fetchSnapshotPolicy()
      if (policy) {
        setPolicyData(policy)
      }
    }
    fetchPolicy()
  }, [])

  const setPolicyData = (data: SnapshotPolicy) => {
    setPolicyName(data.policyName || '');
    setDirectoryPath(data.directoryPath || '');
    setScheduleType(data.scheduleType || 'Daily or Weekly');
    setTimeZone(data.timeZone || 'America/Los Angeles');
    setSnapshotTime(data.snapshotTime || { hour: '07', minute: '00' });
    setDays(data.days || ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']);
    setDeleteAfter(data.deleteAfter || 'Never');
    setAutoDeleteDays(data.autoDeleteDays || 99);
    setIsPolicyEnabled(data.isPolicyEnabled !== undefined ? data.isPolicyEnabled : true);
    setIsSnapshotLocked(data.isSnapshotLocked !== undefined ? data.isSnapshotLocked : false);
  };

  const handleSavePolicy = async () => {
    if (!policyName || !directoryPath) {
      alert('Please fill out all required fields.');
      return;
    }

    const policyData = {
      policyName,
      directoryPath,
      scheduleType,
      timeZone,
      snapshotTime,
      days,
      deleteAfter,
      autoDeleteDays: deleteAfter === 'Automatically after' ? autoDeleteDays : null,
      isPolicyEnabled,
      isSnapshotLocked,
    };

    try {
      await saveSnapshotPolicy(policyData)
      alert('Policy saved successfully.')
    } catch (error) {
      alert('Error saving policy.')
    }
  };

  return (
    <div className="p-6 rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-gray-300">Policy Name</label>
        <input
          type="text"
          className="w-full px-3 py-2 mt-2 bg-gray-700 text-gray-300 rounded-lg"
          value={policyName}
          onChange={(e) => setPolicyName(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-300">Apply to Directory</label>
        <input
          type="text"
          className="w-full px-3 py-2 mt-2 bg-gray-700 text-gray-300 rounded-lg"
          value={directoryPath}
          onChange={(e) => setDirectoryPath(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-300">Select Schedule Type</label>
        <select
          className="w-full px-3 py-2 mt-2 bg-gray-700 text-gray-300 rounded-lg"
          value={scheduleType}
          onChange={(e) => setScheduleType(e.target.value)}
        >
          <option value="Daily or Weekly">Daily or Weekly</option>
          {/* Add more options if necessary */}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-300">Set to Time Zone</label>
        <select
          className="w-full px-3 py-2 mt-2 bg-gray-700 text-gray-300 rounded-lg"
          value={timeZone}
          onChange={(e) => setTimeZone(e.target.value)}
        >
          <option value="America/Los Angeles">America/Los Angeles</option>
          <option value="UTC">UTC</option>
          <option value="Europe/London">Europe/London</option>
          {/* Add more options as needed */}
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-300">Take a Snapshot at</label>
        <div className="flex space-x-2">
          <input
            type="number"
            min="00"
            max="23"
            className="w-1/3 px-3 py-2 bg-gray-700 text-gray-300 rounded-lg"
            value={snapshotTime.hour}
            onChange={(e) => setSnapshotTime({ ...snapshotTime, hour: e.target.value })}
          />
          <span className="text-gray-300">:</span>
          <input
            type="number"
            min="00"
            max="59"
            className="w-1/3 px-3 py-2 bg-gray-700 text-gray-300 rounded-lg"
            value={snapshotTime.minute}
            onChange={(e) => setSnapshotTime({ ...snapshotTime, minute: e.target.value })}
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-300">On the Following Day(s)</label>
        <div className="flex space-x-2">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
            <label key={day} className="inline-flex items-center text-gray-300">
              <input
                type="checkbox"
                className="form-checkbox bg-gray-700 text-blue-600"
                checked={days.includes(day)}
                onChange={() =>
                  setDays((prevDays) =>
                    prevDays.includes(day) ? prevDays.filter((d) => d !== day) : [...prevDays, day]
                  )
                }
              />
              <span className="ml-2">{day}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-300">Delete Each Snapshot</label>
        <select
          className="w-full px-3 py-2 mt-2 bg-gray-700 text-gray-300 rounded-lg"
          value={deleteAfter}
          onChange={(e) => setDeleteAfter(e.target.value)}
        >
          <option value="Never">Never</option>
          <option value="Automatically after">Automatically after</option>
        </select>
        {deleteAfter === 'Automatically after' && (
          <input
            type="number"
            min="1"
            className="w-full px-3 py-2 mt-2 bg-gray-700 text-gray-300 rounded-lg"
            value={autoDeleteDays}
            onChange={(e) => setAutoDeleteDays(Number(e.target.value))}
          />
        )}
      </div>

      <div className="mb-4">
        <label className="inline-flex items-center text-gray-300">
          <input
            type="checkbox"
            className="form-checkbox bg-gray-700 text-blue-600"
            checked={isSnapshotLocked}
            onChange={(e) => setIsSnapshotLocked(e.target.checked)}
          />
          <span className="ml-2">Enable locked snapshots</span>
        </label>
      </div>

      <div className="mb-4">
        <label className="inline-flex items-center text-gray-300">
          <input
            type="checkbox"
            className="form-checkbox bg-gray-700 text-blue-600"
            checked={isPolicyEnabled}
            onChange={(e) => setIsPolicyEnabled(e.target.checked)}
          />
          <span className="ml-2">Enable policy</span>
        </label>
      </div>

      <div className="flex justify-end space-x-4">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg" onClick={handleSavePolicy}>
          Save Policy
        </button>
        <button className="px-4 py-2 bg-gray-600 text-white rounded-lg" onClick={() => {}}>
          Cancel
        </button>
      </div>
    </div>
  );
}
