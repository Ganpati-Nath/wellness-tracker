import React from 'react';

const ConfirmModal = ({ showConfirmModal, setShowConfirmModal, confirmDelete, darkMode }) => {
  if (!showConfirmModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-md w-full p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Confirm Deletion
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Are you sure you want to delete this entry? This action cannot be undone.
        </p>
        <div className="flex space-x-4">
          <button
            onClick={confirmDelete}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Delete
          </button>
          <button
            onClick={() => setShowConfirmModal(false)}
            className="flex-1 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-300 font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;