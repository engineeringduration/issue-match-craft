
/**
 * API Configuration
 * 
 * This file contains all API endpoints and configuration settings.
 * Replace these placeholder values with your actual backend URLs and API keys when connecting to your backend.
 */

// Base API URL - replace with your actual backend URL when deploying
export const API_BASE_URL = "http://localhost:4000";

// GitHub OAuth endpoints
export const GITHUB_AUTH_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/auth/github`,
  LOGOUT: `${API_BASE_URL}/auth/logout`,
  CALLBACK: `${API_BASE_URL}/auth/github/callback`,
};

// User and profile endpoints
export const USER_ENDPOINTS = {
  PROFILE: `${API_BASE_URL}/api/profile`,
  LANGUAGES: `${API_BASE_URL}/api/user-languages`,
  REPOSITORIES: `${API_BASE_URL}/api/repos`,
  COMMITS: `${API_BASE_URL}/api/recent-commits`,
};

// Issues endpoints
export const ISSUE_ENDPOINTS = {
  LIST: `${API_BASE_URL}/api/issues`,
  MATCH: `${API_BASE_URL}/api/match`,
  DETAIL: (id) => `${API_BASE_URL}/api/issues/${id}`,
  SAVE: `${API_BASE_URL}/api/saved-issues`,
};

// Notification endpoints
export const NOTIFICATION_ENDPOINTS = {
  LIST: `${API_BASE_URL}/api/notifications`,
  READ: (id) => `${API_BASE_URL}/api/notifications/${id}/read`,
};

// AI Assistant configuration
export const AI_CONFIG = {
  // Replace with your actual Gemini API endpoint when connecting to your backend
  GEMINI_API_URL: "http://127.0.0.1:5000/api/gemini",
  
  // Placeholder for Gemini API key - IMPORTANT: Don't store actual API keys in frontend code
  // This should be handled by your backend service
  GEMINI_API_KEY: import.meta.env.VITE_GEMINI_API_KEY || "PLACEHOLDER_API_KEY",
};

/**
 * API Request Helper
 * 
 * Wraps fetch with common options for API requests
 */
export const apiRequest = async (url, options = {}) => {
  const defaultOptions = {
    credentials: "include", // Include cookies for session-based auth
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, { ...defaultOptions, ...options });
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error("API request error:", error);
    throw error;
  }
};
