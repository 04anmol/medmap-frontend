import React, { createContext, useContext, useState, useEffect } from 'react';

interface UserData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  dateOfBirth: string;
  bloodType: string;
  allergies: string;
  medications: string;
  emergencyContact: string;
  emergencyPhone: string;
  medicalConditions: string;
  insuranceProvider: string;
  policyNumber: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

interface UserContextType {
  user: UserData | null;
  isLoggedIn: boolean;
  isFirstTime: boolean;
  login: (userData: UserData) => void;
  logout: () => void;
  updateUser: (userData: Partial<UserData>) => void;
  setFirstTime: (value: boolean) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [isFirstTime, setIsFirstTime] = useState(true);

  useEffect(() => {
    // Check if user exists in localStorage
    const savedUser = localStorage.getItem('medmap_user');
    const isFirstVisit = localStorage.getItem('medmap_first_time');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsFirstTime(false);
    } else if (isFirstVisit === null) {
      setIsFirstTime(true);
    }
  }, []);

  const login = (userData: UserData) => {
    setUser(userData);
    localStorage.setItem('medmap_user', JSON.stringify(userData));
    localStorage.setItem('medmap_first_time', 'false');
    setIsFirstTime(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('medmap_user');
  };

  const updateUser = (userData: Partial<UserData>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('medmap_user', JSON.stringify(updatedUser));
    }
  };

  const setFirstTime = (value: boolean) => {
    setIsFirstTime(value);
    localStorage.setItem('medmap_first_time', value ? 'true' : 'false');
  };

  return (
    <UserContext.Provider value={{
      user,
      isLoggedIn: !!user,
      isFirstTime,
      login,
      logout,
      updateUser,
      setFirstTime
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};