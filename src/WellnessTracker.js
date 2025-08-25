import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import Header from './components/Header';
import AuthForm from './components/AuthForm';
import ActionBar from './components/ActionBar';
import SummaryCards from './components/SummaryCards';
import Charts from './components/Charts';
import EntryList from './components/EntryList';
import EntryFormModal from './components/EntryFormModal';
import ConfirmModal from './components/ConfirmModal';

// Mock data and utilities
const generateMockData = () => {
  const moods = ['Happy', 'Neutral', 'Tired', 'Stressed'];
  const data = [];
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    data.push({
      id: `entry-${i}`,
      date: date.toISOString().split('T')[0],
      steps: Math.floor(Math.random() * 5000) + 3000,
      sleep: Math.floor(Math.random() * 4) + 6,
      mood: moods[Math.floor(Math.random() * moods.length)],
      notes: i % 3 === 0 ? 'Had a great workout today!' : ''
    });
  }
  console.log('Generated mock data:', data); // Debug
  return data;
};

const exportToCSV = (data) => {
  const headers = ['Date', 'Steps', 'Sleep (hours)', 'Mood', 'Notes'];
  const csvContent = [
    headers.join(','),
    ...data.map(row => [
      new Date(row.date).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' }), // Format as MM/DD/YYYY
      row.steps,
      row.sleep,
      row.mood,
      `"${row.notes.replace(/"/g, '""')}"` // Escape quotes in notes
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' }); // Ensure UTF-8 encoding
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'wellness-data.csv';
  a.click();
  window.URL.revokeObjectURL(url);
};

const exportToPDF = (data) => {
  const doc = new jsPDF();
  doc.setFontSize(12);
  doc.text('Wellness Tracker Entries', 10, 10);

  const startY = 20;
  const lineHeight = 8;
  const columns = ['Date', 'Steps', 'Sleep (hours)', 'Mood', 'Notes'];

  // Add headers
  columns.forEach((col, index) => {
    doc.text(col, 10 + index * 40, startY);
  });

  // Add data rows
  data.forEach((row, rowIndex) => {
    const formattedDate = new Date(row.date).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
    doc.text(formattedDate, 10, startY + lineHeight + rowIndex * lineHeight);
    doc.text(row.steps.toString(), 50, startY + lineHeight + rowIndex * lineHeight);
    doc.text(row.sleep.toString(), 90, startY + lineHeight + rowIndex * lineHeight);
    doc.text(row.mood, 130, startY + lineHeight + rowIndex * lineHeight);
    doc.text(row.notes || 'N/A', 170, startY + lineHeight + rowIndex * lineHeight);
  });

  doc.save('wellness-data.pdf');
};

const WellnessTracker = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [authMode, setAuthMode] = useState('login');
  const [entries, setEntries] = useState([]);
  const [showEntryForm, setShowEntryForm] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [dateFilter, setDateFilter] = useState({ start: '', end: '' });
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [entryToDelete, setEntryToDelete] = useState(null);
  
  const [formData, setFormData] = useState({
    steps: '',
    sleep: '',
    mood: 'Happy',
    notes: ''
  });

  const [authData, setAuthData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Load data from localStorage on mount
  useEffect(() => {
    const savedEntries = localStorage.getItem('wellnessEntries');
    const savedAuth = localStorage.getItem('wellnessAuth');
    const savedTheme = localStorage.getItem('wellnessTheme');
    
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    } else {
      const mockData = generateMockData();
      setEntries(mockData);
      localStorage.setItem('wellnessEntries', JSON.stringify(mockData));
    }
    
    if (savedAuth) {
      const authInfo = JSON.parse(savedAuth);
      setIsAuthenticated(true);
      setCurrentUser(authInfo);
    }
    
    if (savedTheme === 'dark') {
      setDarkMode(true);
    }
  }, []);

  // Save to localStorage whenever entries change
  useEffect(() => {
    localStorage.setItem('wellnessEntries', JSON.stringify(entries));
  }, [entries]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('wellnessTheme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const handleAuth = (e) => {
    e.preventDefault();
    const user = { email: authData.email, name: authData.email.split('@')[0] };
    setCurrentUser(user);
    setIsAuthenticated(true);
    localStorage.setItem('wellnessAuth', JSON.stringify(user));
    setAuthData({ email: '', password: '', confirmPassword: '' });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem('wellnessAuth');
  };

  const handleEntrySubmit = (e) => {
    e.preventDefault();
    const today = new Date().toISOString().split('T')[0];
    
    if (formData.steps < 0 || formData.sleep < 0 || formData.sleep > 24) {
      return; // Error handled in EntryFormModal
    }

    if (editingEntry) {
      setEntries(prev => prev.map(entry => 
        entry.id === editingEntry.id 
          ? { ...entry, ...formData }
          : entry
      ));
      setEditingEntry(null);
    } else {
      const newEntry = {
        id: `entry-${Date.now()}`,
        date: today,
        ...formData,
        steps: parseInt(formData.steps),
        sleep: parseFloat(formData.sleep)
      };
      setEntries(prev => [newEntry, ...prev]);
    }
    
    setFormData({ steps: '', sleep: '', mood: 'Happy', notes: '' });
    setShowEntryForm(false);
  };

  const handleEdit = (entry) => {
    setEditingEntry(entry);
    setFormData({
      steps: entry.steps.toString(),
      sleep: entry.sleep.toString(),
      mood: entry.mood,
      notes: entry.notes
    });
    setShowEntryForm(true);
  };

  const handleDelete = (id) => {
    setEntryToDelete(id);
    setShowConfirmModal(true);
  };

  const confirmDelete = () => {
    setEntries(prev => prev.filter(entry => entry.id !== entryToDelete));
    setShowConfirmModal(false);
    setEntryToDelete(null);
  };

  const resetMockData = () => {
    const mockData = generateMockData();
    setEntries(mockData);
    localStorage.setItem('wellnessEntries', JSON.stringify(mockData));
    setDateFilter({ start: '', end: '' }); // Reset date filter
    console.log('Reset entries:', mockData); // Debug
  };

  const filteredEntries = entries.filter(entry => {
    if (!dateFilter.start && !dateFilter.end) return true;
    const entryDate = new Date(entry.date);
    const startDate = dateFilter.start ? new Date(dateFilter.start) : new Date('1900-01-01');
    const endDate = dateFilter.end ? new Date(dateFilter.end) : new Date('2100-12-31');
    return entryDate >= startDate && entryDate <= endDate;
  });

  console.log('Filtered entries:', filteredEntries, 'Date filter:', dateFilter); // Debug

  // Analytics calculations
  const avgSteps = Math.round(filteredEntries.reduce((sum, entry) => sum + entry.steps, 0) / filteredEntries.length) || 0;
  const avgSleep = (filteredEntries.reduce((sum, entry) => sum + entry.sleep, 0) / filteredEntries.length).toFixed(1) || 0;
  const moodCounts = filteredEntries.reduce((acc, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    return acc;
  }, {});
  const mostCommonMood = Object.entries(moodCounts).sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A';

  // Chart data
  const chartData = filteredEntries.slice(0, 14).reverse().map(entry => ({
    date: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    steps: entry.steps,
    sleep: entry.sleep
  }));

  const moodChartData = Object.entries(moodCounts).map(([mood, count]) => ({
    name: mood,
    value: count
  }));

  const moodColors = {
    Happy: '#22c55e',
    Neutral: '#6b7280',
    Tired: '#f59e0b',
    Stressed: '#ef4444'
  };

  if (!isAuthenticated) {
    return (
      <div className={`min-h-screen flex items-center justify-center p-4 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
        <AuthForm 
          authMode={authMode}
          setAuthMode={setAuthMode}
          authData={authData}
          setAuthData={setAuthData}
          handleAuth={handleAuth}
          darkMode={darkMode}
        />
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <Header 
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        currentUser={currentUser}
        handleLogout={handleLogout}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ActionBar 
          setShowEntryForm={setShowEntryForm}
          setEditingEntry={setEditingEntry}
          setFormData={setFormData}
          exportToCSV={() => exportToCSV(filteredEntries)}
          exportToPDF={() => exportToPDF(filteredEntries)}
          resetMockData={resetMockData}
          dateFilter={dateFilter}
          setDateFilter={setDateFilter}
        />
        <SummaryCards 
          avgSteps={avgSteps}
          avgSleep={avgSleep}
          mostCommonMood={mostCommonMood}
          totalEntries={filteredEntries.length}
        />
        <Charts 
          chartData={chartData}
          moodChartData={moodChartData}
          moodColors={moodColors}
          darkMode={darkMode}
        />
        <EntryList 
          filteredEntries={filteredEntries}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          darkMode={darkMode}
        />
      </main>
      <EntryFormModal 
        showEntryForm={showEntryForm}
        setShowEntryForm={setShowEntryForm}
        editingEntry={editingEntry}
        formData={formData}
        setFormData={setFormData}
        handleEntrySubmit={handleEntrySubmit}
        setEditingEntry={setEditingEntry}
        darkMode={darkMode}
      />
      <ConfirmModal 
        showConfirmModal={showConfirmModal}
        setShowConfirmModal={setShowConfirmModal}
        confirmDelete={confirmDelete}
        darkMode={darkMode}
      />
    </div>
  );
};

export default WellnessTracker;