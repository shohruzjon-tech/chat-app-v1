/**
 * Authentication Service for Phone Number Authentication with SMS
 * 
 * IMPORTANT SECURITY NOTE:
 * This is a CLIENT-SIDE placeholder implementation.
 * In production, ALL authentication operations MUST be handled server-side.
 * 
 * NEVER expose Twilio credentials in client-side code.
 * The backend should handle:
 * - SMS sending via Twilio
 * - Code verification
 * - JWT token generation
 * - Token validation
 * 
 * This placeholder demonstrates the client-side flow only.
 */

class AuthService {
  private readonly apiUrl = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';

  /**
   * Send verification code to phone number
   * Makes an API call to the backend which handles Twilio integration
   */
  async sendVerificationCode(phoneNumber: string): Promise<boolean> {
    try {
      if (__DEV__) {
        console.log(`Sending verification code to: ${phoneNumber}`);
      }
      
      // TODO: Implement actual API call to backend
      // Backend endpoint will handle Twilio SMS sending
      // const response = await fetch(`${this.apiUrl}/auth/send-code`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ phoneNumber }),
      // });
      // return response.ok;

      // Simulated API call for demonstration
      const response = await this.mockApiCall('/auth/send-code', {
        phoneNumber,
      });

      return response.success;
    } catch (error) {
      console.error('Error sending verification code:', error);
      return false;
    }
  }

  /**
   * Verify the code sent to phone number
   * Makes an API call to the backend which validates with Twilio
   */
  async verifyCode(phoneNumber: string, code: string): Promise<{ success: boolean; token?: string }> {
    try {
      if (__DEV__) {
        console.log(`Verifying code for: ${phoneNumber}`);
      }
      
      // TODO: Implement actual API call to backend
      // Backend endpoint will validate the SMS code with Twilio
      // const response = await fetch(`${this.apiUrl}/auth/verify-code`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ phoneNumber, code }),
      // });
      // const data = await response.json();
      // return { success: response.ok, token: data.token };

      // Simulated API call for demonstration
      const response = await this.mockApiCall('/auth/verify-code', {
        phoneNumber,
        code,
      });

      return {
        success: response.success,
        token: response.token,
      };
    } catch (error) {
      console.error('Error verifying code:', error);
      return { success: false };
    }
  }

  /**
   * Mock API call for demonstration
   * Replace with actual fetch/axios calls to your backend
   */
  private async mockApiCall(endpoint: string, data: any): Promise<any> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Mock success response
    return {
      success: true,
      token: 'mock-jwt-token-' + Date.now(),
      ...data,
    };
  }

  /**
   * Get current user from token
   * Makes an API call to the backend to validate token and get user data
   */
  async getCurrentUser(token: string): Promise<any> {
    try {
      if (__DEV__) {
        console.log('Getting current user with token');
      }
      
      // TODO: Implement actual API call to backend
      // Backend endpoint will validate JWT and return user data
      // const response = await fetch(`${this.apiUrl}/users/me`, {
      //   headers: { 'Authorization': `Bearer ${token}` },
      // });
      // return response.json();

      // Simulated response for demonstration
      return {
        id: 'user-' + Date.now(),
        phoneNumber: '+998901234567',
        name: 'User Name',
      };
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    // Clear any stored tokens or user data
    if (__DEV__) {
      console.log('Logging out user');
    }
    
    // In production, you might want to:
    // - Invalidate the token on the backend
    // - Clear secure storage
    // - Reset app state
  }
}

export default new AuthService();
