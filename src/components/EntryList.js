import React from 'react';
import { Edit3, Trash2, Calendar } from 'lucide-react';

const EntryList = ({ filteredEntries, handleEdit, handleDelete, darkMode }) => (
  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Entries</h3>
    </div>
    <div className="p-6">
      {filteredEntries.length === 0 ? (
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 dark:text-gray-400">No entries found for the selected date range.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredEntries.slice(0, 10).map((entry) => (
            <div key={entry.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-2">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{entry.date}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    entry.mood === 'Happy' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' :
                    entry.mood === 'Neutral' ? 'bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-300' :
                    entry.mood === 'Tired' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' :
                    'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                  }`}>
                    {entry.mood}
                  </span>
                </div>
                <div className="flex items-center space-x-6 text-sm text-gray-600 dark:text-gray-400">
                  <span>👟 {entry.steps.toLocaleString()} steps</span>
                  <span>😴 {entry.sleep}h sleep</span>
                  {entry.notes && <span>📝 {entry.notes}</span>}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleEdit(entry)}
                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                >
                  <Edit3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleDelete(entry.id)}
                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

export default EntryList;