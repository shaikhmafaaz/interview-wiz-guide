
interface ApiResponse {
  success: boolean;
  message: string;
  data?: any;
}

// Replace this with your Python backend URL when deployed
const API_URL = 'http://localhost:5000';

export const apiService = {
  // Example function to test connection
  async checkHealth(): Promise<ApiResponse> {
    try {
      const response = await fetch(`${API_URL}/health`);
      const data = await response.json();
      return { success: true, message: 'Backend is healthy', data };
    } catch (error) {
      return { success: false, message: 'Failed to connect to backend' };
    }
  },

  // Example function to make authenticated requests
  async makeAuthenticatedRequest(endpoint: string, method: string = 'GET', body?: any): Promise<ApiResponse> {
    try {
      const response = await fetch(`${API_URL}${endpoint}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined,
      });
      const data = await response.json();
      return { success: true, message: 'Request successful', data };
    } catch (error) {
      return { success: false, message: 'Request failed' };
    }
  }
};
