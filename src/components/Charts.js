import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const Charts = ({ chartData, moodChartData, moodColors, darkMode }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Steps & Sleep Trend</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#e5e7eb'} />
          <XAxis dataKey="date" stroke={darkMode ? '#9ca3af' : '#6b7280'} />
          <YAxis stroke={darkMode ? '#9ca3af' : '#6b7280'} />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: darkMode ? '#1f2937' : '#ffffff',
              border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
              borderRadius: '0.5rem'
            }}
          />
          <Legend verticalAlign="top" height={36} />
          <Line type="monotone" dataKey="steps" stroke="#3b82f6" strokeWidth={2} name="Steps" />
          <Line type="monotone" dataKey="sleep" stroke="#10b981" strokeWidth={2} name="Sleep" />
        </LineChart>
      </ResponsiveContainer>
    </div>

    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Mood Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={moodChartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
          >
            {moodChartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={moodColors[entry.name]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: darkMode ? '#1f2937' : '#ffffff',
              border: `1px solid ${darkMode ? '#374151' : '#e5e7eb'}`,
              borderRadius: '0.5rem'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex flex-wrap justify-center gap-4 mt-4">
        {Object.entries(moodColors).map(([mood, color]) => (
          <div key={mood} className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }}></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">{mood}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default Charts;