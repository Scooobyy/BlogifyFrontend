import { createContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
 
  const [authToken, setAuthToken ] = useState(localStorage.getItem('auth-token') || null);
  
  const [isAuthenticated, setIsAuthenticated] = useState(!!authToken);


  const login = async (email, password) => {
    try {
      const response = await fetch('https://blogifybackend-ti05.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const json = await response.json();

      if (response.ok && json.token) {
        localStorage.setItem('auth-token', json.token); // use 'token' not 'authtoken'
        setAuthToken(json.token);
        setIsAuthenticated(true);
        return { success: true };
      } else {
        return { success: false, error: json.error || "Login failed" };
      }
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('auth-token');
    setAuthToken(null);
 
    setIsAuthenticated(false);
  };



   // FORGOT PASSWORD FUNCTION
  const forgotPassword = async (email) => {
    try {
      const response = await fetch('https://blogifybackend-ti05.onrender.com/api/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const json = await response.json();
      if (response.ok) {
        return { success: true, message: json.message };
      } else {
        return { success: false, error: json.error || "Failed to send OTP" };
      }
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // RESET PASSWORD FUNCTION
  const resetPassword = async (email, otp, newPassword) => {
    try {
      const response = await fetch('https://blogifybackend-ti05.onrender.com/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp, newPassword }),
      });

      const json = await response.json();
      if (response.ok) {
        return { success: true, message: json.message };
      } else {
        return { success: false, error: json.error || "Failed to reset password" };
      }
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  return (
    <AuthContext.Provider value={{ authToken, isAuthenticated, login, logout,forgotPassword,resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
