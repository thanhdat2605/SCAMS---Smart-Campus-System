import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';

// Define the API base URL
const API_URL = 'http://localhost:5000/api';

// Define user roles
export type UserRole = 'student' | 'lecturer' | 'staff' | 'security' | 'admin' | 'guest';

// Define user interface
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, name: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Set auth token for all requests
const setAuthToken = (token: string | null) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check for existing session on mount
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('scamsToken');
      
      if (token) {
        setAuthToken(token);
        try {
          const res = await axios.get(`${API_URL}/auth/me`);
          setUser({
            id: res.data._id,
            email: res.data.email,
            name: res.data.name,
            role: res.data.role as UserRole
          });
        } catch (error) {
          console.error('Failed to load user', error);
          localStorage.removeItem('scamsToken');
          setAuthToken(null);
        }
      }
      
      setLoading(false);
    };

    loadUser();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    
    try {
      const res = await axios.post(`${API_URL}/auth/login`, { email, password });
      
      // Set token in localStorage
      localStorage.setItem('scamsToken', res.data.token);
      setAuthToken(res.data.token);
      
      // Set user from response
      const userData = res.data.user;
      const loggedInUser: User = {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        role: userData.role
      };
      
      setUser(loggedInUser);
      
      toast({
        title: 'Login successful',
        description: `Welcome back, ${loggedInUser.name}!`,
      });
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: 'Login failed',
        description: error.response?.data?.msg || 'An error occurred during login',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (email: string, name: string, password: string, role: UserRole) => {
    setLoading(true);
    
    try {
      await axios.post(`${API_URL}/auth/register`, { email, name, password, role });
      
      toast({
        title: 'Registration successful',
        description: 'You can now login with your new account',
      });
      
      // Redirect to login
      navigate('/login');
    } catch (error: any) {
      console.error('Registration error:', error);
      toast({
        title: 'Registration failed',
        description: error.response?.data?.msg || 'An error occurred during registration',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('scamsToken');
    setAuthToken(null);
    setUser(null);
    
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out',
    });
    
    navigate('/login');
  };

  // Forgot password function
  const forgotPassword = async (email: string) => {
    setLoading(true);
    
    try {
      await axios.post(`${API_URL}/auth/forgot-password`, { email });
      
      toast({
        title: 'Password reset email sent',
        description: 'Please check your email for a link to reset your password',
      });
    } catch (error: any) {
      console.error('Forgot password error:', error);
      toast({
        title: 'Password reset failed',
        description: error.response?.data?.msg || 'An error occurred',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Reset password function
  const resetPassword = async (token: string, newPassword: string) => {
    setLoading(true);
    
    try {
      await axios.post(`${API_URL}/auth/reset-password`, { token, password: newPassword });
      
      toast({
        title: 'Password reset successful',
        description: 'Your password has been updated. You can now login with your new password',
      });
      
      navigate('/login');
    } catch (error: any) {
      console.error('Reset password error:', error);
      toast({
        title: 'Password reset failed',
        description: error.response?.data?.msg || 'An error occurred',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Change password function
  const changePassword = async (currentPassword: string, newPassword: string) => {
    setLoading(true);
    
    try {
      await axios.post(`${API_URL}/auth/change-password`, { 
        currentPassword, 
        newPassword 
      });
      
      toast({
        title: 'Password changed',
        description: 'Your password has been successfully updated',
      });
    } catch (error: any) {
      console.error('Change password error:', error);
      toast({
        title: 'Password change failed',
        description: error.response?.data?.msg || 'An error occurred',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        forgotPassword,
        resetPassword,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};