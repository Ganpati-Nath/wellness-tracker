import React from 'react';
import { Plus, Download, RefreshCw, FileText } from 'lucide-react';

const ActionBar = ({ setShowEntryForm, setEditingEntry, setFormData, exportToCSV, exportToPDF, resetMockData, dateFilter, setDateFilter }) => (
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 space-y-4 sm:space-y-0">
    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
      <button
        onClick={() => {
          setShowEntryForm(true);
          setEditingEntry(null);
          setFormData({ steps: '', sleep: '', mood: 'Happy', notes: '' });
        }}
        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
      >
        <Plus className="h-4 w-4" />
        <span>Add Entry</span>
      </button>
      <button
        onClick={exportToCSV}
        className="flex items-center space-x-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
      >
        <Download className="h-4 w-4" />
        <span>Export CSV</span>
      </button>
      <button
        onClick={exportToPDF}
        className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
      >
        <FileText className="h-4 w-4" />
        <span>Export PDF</span>
      </button>
      <button
        onClick={resetMockData}
        className="flex items-center space-x-2 px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors"
      >
        <RefreshCw className="h-4 w-4" />
        <span>Reset Mock Data</span>
      </button>
    </div>
    
    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
      <input
        type="date"
        value={dateFilter.start}
        onChange={(e) => setDateFilter(prev => ({ ...prev, start: e.target.value }))}
        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
      />
      <input
        type="date"
        value={dateFilter.end}
        onChange={(e) => setDateFilter(prev => ({ ...prev, end: e.target.value }))}
        className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
      />
      <button
        onClick={() => setDateFilter({ start: '', end: '' })}
        className="px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
      >
        Clear
      </button>
    </div>
  </div>
);

export default ActionBar;