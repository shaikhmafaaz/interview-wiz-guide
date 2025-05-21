interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterCredentials extends LoginCredentials {}

interface UserData {
  id: number;
  email: string;
}

// API URL for local development
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const REQUEST_TIMEOUT = 10000; // 10 seconds

export const apiService = {
  // Check if backend is healthy
  async checkHealth(): Promise<ApiResponse> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);
      
      const response = await fetch(`${API_URL}/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        signal: controller.signal,
        mode: 'cors',
        credentials: 'omit'
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        return { 
          success: false, 
          message: `Server returned status: ${response.status}` 
        };
      }
      
      const data = await response.json();
      return { success: true, message: 'Backend is healthy', data };
    } catch (error) {
      return { 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to connect to backend' 
      };
    }
  },

  // Send message to chatbot
  async sendChatMessage(message: string): Promise<ApiResponse> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);
      
      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ message }),
        signal: controller.signal,
        mode: 'cors',
        credentials: 'omit'
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        return { 
          success: false, 
          message: `Server returned status: ${response.status}` 
        };
      }
      
      const data = await response.json();
      return { 
        success: true, 
        message: data.message,
        data 
      };
    } catch (error) {
      return { 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to send message' 
      };
    }
  },

  // Register a new user
  async register(credentials: RegisterCredentials): Promise<ApiResponse> {
    try {
      const response = await fetch(`${API_URL}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      
      if (!response.ok) {
        return { success: false, message: data.message || 'Registration failed' };
      }
      
      return { success: true, message: 'Registration successful', data };
    } catch (error) {
      return { success: false, message: 'Registration failed' };
    }
  },

  // Login user
  async login(credentials: LoginCredentials): Promise<ApiResponse> {
    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      
      if (!response.ok) {
        return { success: false, message: data.message || 'Login failed' };
      }
      
      // Store user data in localStorage for persistence
      localStorage.setItem('user', JSON.stringify(data.user));
      
      return { 
        success: true, 
        message: 'Login successful', 
        data: data.user 
      };
    } catch (error) {
      return { success: false, message: 'Login failed' };
    }
  },

  // Log out user
  logout(): void {
    localStorage.removeItem('user');
  },

  // Get current user from localStorage
  getCurrentUser(): UserData | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Save user answer
  async saveAnswer(question: string, answer: string): Promise<ApiResponse> {
    try {
      const user = this.getCurrentUser();
      const userId = user?.id;
      
      const response = await fetch(`${API_URL}/api/save-answer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
          question,
          answer,
        }),
      });
      const data = await response.json();
      
      if (!response.ok) {
        return { success: false, message: data.message || 'Failed to save answer' };
      }
      
      return { success: true, message: 'Answer saved successfully' };
    } catch (error) {
      return { success: false, message: 'Failed to save answer' };
    }
  },

  // Get user answers
  async getUserAnswers(): Promise<ApiResponse> {
    try {
      const user = this.getCurrentUser();
      if (!user) {
        return { success: false, message: 'User not logged in' };
      }
      
      const response = await fetch(`${API_URL}/api/get-user-answers/${user.id}`);
      const data = await response.json();
      
      if (!response.ok) {
        return { success: false, message: data.message || 'Failed to get answers' };
      }
      
      return { success: true, message: 'Answers retrieved successfully', data: data.answers };
    } catch (error) {
      return { success: false, message: 'Failed to get answers' };
    }
  }
};
