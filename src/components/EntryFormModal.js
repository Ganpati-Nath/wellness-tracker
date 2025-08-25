import React, { useState } from 'react';

const EntryFormModal = ({ showEntryForm, setShowEntryForm, editingEntry, formData, setFormData, handleEntrySubmit, setEditingEntry, darkMode }) => {
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.steps < 0 || formData.sleep < 0 || formData.sleep > 24) {
      setError('Steps must be non-negative and sleep must be between 0 and 24 hours.');
      return;
    }
    setError('');
    handleEntrySubmit(e);
  };

  if (!showEntryForm) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            {editingEntry ? 'Edit Entry' : 'Add New Entry'}
          </h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Steps
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.steps}
                onChange={(e) => setFormData(prev => ({ ...prev, steps: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="e.g., 8000"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Sleep Hours
              </label>
              <input
                type="number"
                required
                min="0"
                max="24"
                step="0.1"
                value={formData.sleep}
                onChange={(e) => setFormData(prev => ({ ...prev, sleep: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="e.g., 7.5"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Mood
              </label>
              <select
                value={formData.mood}
                onChange={(e) => setFormData(prev => ({ ...prev, mood: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="Happy">😊 Happy</option>
                <option value="Neutral">😐 Neutral</option>
                <option value="Tired">😴 Tired</option>
                <option value="Stressed">😰 Stressed</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Notes (Optional)
              </label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
                placeholder="How was your day?"
              />
            </div>
            
            <div className="flex space-x-4 pt-4">
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                {editingEntry ? 'Update Entry' : 'Add Entry'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowEntryForm(false);
                  setEditingEntry(null);
                  setFormData({ steps: '', sleep: '', mood: 'Happy', notes: '' });
                }}
                className="flex-1 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-300 font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EntryFormModal;