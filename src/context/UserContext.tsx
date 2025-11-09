import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  username: string;
  points: number;
  solvedProblems: number[];
}

interface UserContextType {
  user: User | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  updatePoints: (points: number) => void;
  markProblemSolved: (problemId: number) => void;
  getAllUsers: () => User[];
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const USERS = [
  { username: 'Aditya', password: '1234' },
  { username: 'Yash', password: '1234' },
  { username: 'Sayali', password: '1234' },
  { username: 'Sneha', password: '1234' },
  { username: 'Raj', password: '1234' },
];

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    const foundUser = USERS.find(
      u => u.username === username && u.password === password
    );

    if (foundUser) {
      const allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
      let userData = allUsers.find((u: User) => u.username === username);

      if (!userData) {
        userData = {
          username,
          points: 0,
          solvedProblems: [],
        };
        allUsers.push(userData);
        localStorage.setItem('allUsers', JSON.stringify(allUsers));
      }

      setUser(userData);
      localStorage.setItem('currentUser', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const updatePoints = (points: number) => {
    if (!user) return;

    const updatedUser = { ...user, points: user.points + points };
    setUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));

    const allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
    const userIndex = allUsers.findIndex((u: User) => u.username === user.username);
    if (userIndex !== -1) {
      allUsers[userIndex] = updatedUser;
      localStorage.setItem('allUsers', JSON.stringify(allUsers));
    }
  };

  const markProblemSolved = (problemId: number) => {
    if (!user || user.solvedProblems.includes(problemId)) return;

    const updatedUser = {
      ...user,
      solvedProblems: [...user.solvedProblems, problemId],
    };
    setUser(updatedUser);
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));

    const allUsers = JSON.parse(localStorage.getItem('allUsers') || '[]');
    const userIndex = allUsers.findIndex((u: User) => u.username === user.username);
    if (userIndex !== -1) {
      allUsers[userIndex] = updatedUser;
      localStorage.setItem('allUsers', JSON.stringify(allUsers));
    }
  };

  const getAllUsers = (): User[] => {
    return JSON.parse(localStorage.getItem('allUsers') || '[]');
  };

  return (
    <UserContext.Provider
      value={{ user, login, logout, updatePoints, markProblemSolved, getAllUsers }}
    >
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
