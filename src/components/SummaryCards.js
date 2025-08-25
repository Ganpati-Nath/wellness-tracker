import React from 'react';
import { Footprints, Clock, Heart, TrendingUp } from 'lucide-react';

const SummaryCards = ({ avgSteps, avgSleep, mostCommonMood, totalEntries }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Steps</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{avgSteps.toLocaleString()}</p>
        </div>
        <Footprints className="h-12 w-12 text-blue-600 dark:text-blue-400" />
      </div>
    </div>
    
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg Sleep</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{avgSleep}h</p>
        </div>
        <Clock className="h-12 w-12 text-green-600 dark:text-green-400" />
      </div>
    </div>
    
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Common Mood</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{mostCommonMood}</p>
        </div>
        <Heart className="h-12 w-12 text-red-600 dark:text-red-400" />
      </div>
    </div>
    
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Entries</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{totalEntries}</p>
        </div>
        <TrendingUp className="h-12 w-12 text-purple-600 dark:text-purple-400" />
      </div>
    </div>
  </div>
);

export default SummaryCards;