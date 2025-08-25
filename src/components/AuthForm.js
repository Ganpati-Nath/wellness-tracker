import React, { useState } from 'react';
import { Heart, LogIn, UserPlus } from 'lucide-react';

const AuthForm = ({ authMode, setAuthMode, authData, setAuthData, handleAuth, darkMode }) => {
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (authMode === 'signup' && authData.password !== authData.confirmPassword) {
      setError('Passwords do not match!');
      return;
    }
    setError('');
    handleAuth(e);
  };

  return (
    <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
      <div className="text-center mb-8">
        <Heart className="mx-auto h-12 w-12 text-blue-600 dark:text-blue-400 mb-4" />
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Wellness Tracker</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Track your daily wellness metrics</p>
      </div>

      <div className="flex mb-6 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
        <button
          onClick={() => setAuthMode('login')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            authMode === 'login' 
              ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm' 
              : 'text-gray-600 dark:text-gray-400'
          }`}
        >
          <LogIn className="w-4 h-4 inline mr-2" />
          Login
        </button>
        <button
          onClick={() => setAuthMode('signup')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
            authMode === 'signup' 
              ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm' 
              : 'text-gray-600 dark:text-gray-400'
          }`}
        >
          <UserPlus className="w-4 h-4 inline mr-2" />
          Sign Up
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email
          </label>
          <input
            type="email"
            required
            value={authData.email}
            onChange={(e) => setAuthData(prev => ({ ...prev, email: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Password
          </label>
          <input
            type="password"
            required
            value={authData.password}
            onChange={(e) => setAuthData(prev => ({ ...prev, password: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="Enter your password"
          />
        </div>
        {authMode === 'signup' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              required
              value={authData.confirmPassword}
              onChange={(e) => setAuthData(prev => ({ ...prev, confirmPassword: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="Confirm your password"
            />
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          {authMode === 'login' ? 'Sign In' : 'Create Account'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Demo credentials: any email/password combination
        </p>
      </div>
    </div>
  );
};

export default AuthForm;