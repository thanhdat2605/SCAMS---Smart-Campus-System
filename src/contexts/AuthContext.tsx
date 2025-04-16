import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

// Define user roles
export type UserRole = 'student' | 'lecturer' | 'staff' | 'security' | 'admin' | 'guest';

// Define user interface
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

// Mock users for demo purposes
const mockUsers: User[] = [
  { id: '1', email: 'admin@university.edu', name: 'Admin User', role: 'admin' },
  { id: '2', email: 'lecturer@university.edu', name: 'Jane Smith', role: 'lecturer' },
  { id: '3', email: 'student@university.edu', name: 'John Doe', role: 'student' },
  { id: '4', email: 'security@university.edu', name: 'Mike Johnson', role: 'security' },
  { id: '5', email: 'staff@university.edu', name: 'Sarah Williams', role: 'staff' },
];

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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('scamsUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user', error);
        localStorage.removeItem('scamsUser');
      }
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user by email (in a real app, this would be a server call)
      const foundUser = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (!foundUser || password !== 'password') { // In a real app, you'd verify the password properly
        throw new Error('Invalid email or password');
      }
      
      // Set user in state and localStorage
      setUser(foundUser);
      localStorage.setItem('scamsUser', JSON.stringify(foundUser));
      
      toast({
        title: 'Login successful',
        description: `Welcome back, ${foundUser.name}!`,
      });
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: 'Login failed',
        description: error instanceof Error ? error.message : 'An error occurred during login',
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if email already exists
      if (mockUsers.some(u => u.email.toLowerCase() === email.toLowerCase())) {
        throw new Error('Email already in use');
      }
      
      // Create new user (in a real app, this would be a server call)
      const newUser: User = {
        id: String(mockUsers.length + 1),
        email,
        name,
        role,
      };
      
      // Add to mock users (in a real app, this would be saved to the database)
      mockUsers.push(newUser);
      
      toast({
        title: 'Registration successful',
        description: 'You can now login with your new account',
      });
      
      // Redirect to login
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error);
      toast({
        title: 'Registration failed',
        description: error instanceof Error ? error.message : 'An error occurred during registration',
        variant: 'destructive',
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('scamsUser');
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if email exists
      if (!mockUsers.some(u => u.email.toLowerCase() === email.toLowerCase())) {
        throw new Error('Email not found');
      }
      
      toast({
        title: 'Password reset email sent',
        description: 'Please check your email for a link to reset your password',
      });
      
      // In a real app, this would send an email with a reset link
    } catch (error) {
      console.error('Forgot password error:', error);
      toast({
        title: 'Password reset failed',
        description: error instanceof Error ? error.message : 'An error occurred',
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would validate the token and update the password
      
      toast({
        title: 'Password reset successful',
        description: 'Your password has been updated. You can now login with your new password',
      });
      
      navigate('/login');
    } catch (error) {
      console.error('Reset password error:', error);
      toast({
        title: 'Password reset failed',
        description: error instanceof Error ? error.message : 'An error occurred',
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would verify the current password and update with the new one
      if (currentPassword !== 'password') {
        throw new Error('Current password is incorrect');
      }
      
      toast({
        title: 'Password changed',
        description: 'Your password has been successfully updated',
      });
    } catch (error) {
      console.error('Change password error:', error);
      toast({
        title: 'Password change failed',
        description: error instanceof Error ? error.message : 'An error occurred',
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
