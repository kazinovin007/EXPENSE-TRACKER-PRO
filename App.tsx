
import React, { useState, useEffect, useCallback } from 'react';
import { UserCredentials, StoredUser, Transaction } from './types';
import LoginForm from './components/auth/LoginForm';
import SignupForm from './components/auth/SignupForm';
import Dashboard from './components/dashboard/Dashboard';
import Navbar from './components/layout/Navbar';
import { LOCAL_STORAGE_USERS_KEY, LOCAL_STORAGE_TRANSACTIONS_KEY, LOCAL_STORAGE_LOGGED_IN_USER_KEY } from './constants';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<StoredUser | null>(null);
  const [showLogin, setShowLogin] = useState<boolean>(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem(LOCAL_STORAGE_LOGGED_IN_USER_KEY);
    if (storedUser) {
      const user = JSON.parse(storedUser) as StoredUser;
      setCurrentUser(user);
      setIsAuthenticated(true);
      loadUserTransactions(user.id);
    }
  }, []);

  const loadUserTransactions = useCallback((userId: string) => {
    const storedTransactions = localStorage.getItem(LOCAL_STORAGE_TRANSACTIONS_KEY);
    if (storedTransactions) {
      const allTransactions = JSON.parse(storedTransactions) as Transaction[];
      setTransactions(allTransactions.filter(t => t.userId === userId));
    }
  }, []);

  const handleLogin = (user: StoredUser) => {
    localStorage.setItem(LOCAL_STORAGE_LOGGED_IN_USER_KEY, JSON.stringify(user));
    setCurrentUser(user);
    setIsAuthenticated(true);
    loadUserTransactions(user.id);
    setShowLogin(true); 
  };

  const handleSignup = (credentials: UserCredentials) => {
    const storedUsers = localStorage.getItem(LOCAL_STORAGE_USERS_KEY);
    const users: StoredUser[] = storedUsers ? JSON.parse(storedUsers) : [];
    
    if (users.find(u => u.email === credentials.email)) {
      alert("User already exists with this email.");
      return false;
    }

    const newUser: StoredUser = { 
      id: Date.now().toString(), 
      email: credentials.email,
      password: credentials.password // In a real app, hash this password
    };
    users.push(newUser);
    localStorage.setItem(LOCAL_STORAGE_USERS_KEY, JSON.stringify(users));
    alert("Signup successful! Please log in.");
    setShowLogin(true);
    return true;
  };

  const handleLogout = () => {
    localStorage.removeItem(LOCAL_STORAGE_LOGGED_IN_USER_KEY);
    setCurrentUser(null);
    setIsAuthenticated(false);
    setTransactions([]);
    setShowLogin(true);
  };

  const addTransaction = (transaction: Transaction) => {
    const newTransactions = [...transactions, transaction];
    setTransactions(newTransactions);
    
    const allStoredTransactions = localStorage.getItem(LOCAL_STORAGE_TRANSACTIONS_KEY);
    let allTransactions: Transaction[] = allStoredTransactions ? JSON.parse(allStoredTransactions) : [];
    // Remove old transactions of the current user to avoid duplicates if logic is simple append
    allTransactions = allTransactions.filter(t => t.userId !== currentUser?.id);
    allTransactions = [...allTransactions, ...newTransactions]; // Add updated transactions for current user
    localStorage.setItem(LOCAL_STORAGE_TRANSACTIONS_KEY, JSON.stringify(allTransactions));
  };

  const deleteTransaction = (transactionId: string) => {
    const updatedTransactions = transactions.filter(t => t.id !== transactionId);
    setTransactions(updatedTransactions);

    const allStoredTransactions = localStorage.getItem(LOCAL_STORAGE_TRANSACTIONS_KEY);
    let allTransactions: Transaction[] = allStoredTransactions ? JSON.parse(allStoredTransactions) : [];
    allTransactions = allTransactions.filter(t => t.id !== transactionId || t.userId !== currentUser?.id);
    localStorage.setItem(LOCAL_STORAGE_TRANSACTIONS_KEY, JSON.stringify(allTransactions));
  };


  if (!isAuthenticated || !currentUser) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-4"> {/* Changed background to white */}
        <div className="w-full max-w-md bg-white/70 backdrop-blur-lg border border-gray-200/80 shadow-2xl rounded-xl p-8"> {/* Light glassmorphism */}
          <h1 className="text-4xl font-bold text-center text-slate-800 mb-2">Expense Tracker Pro</h1> {/* Text color updated */}
          <p className="text-center text-slate-600 mb-8">Manage your finances with ease.</p> {/* Text color updated */}
          {showLogin ? (
            <>
              <LoginForm onLogin={handleLogin} />
              <p className="mt-6 text-center text-sm text-slate-500"> {/* Text color updated */}
                Don't have an account?{' '}
                <button onClick={() => setShowLogin(false)} className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"> {/* Link color updated */}
                  Sign up
                </button>
              </p>
            </>
          ) : (
            <>
              <SignupForm onSignup={handleSignup} />
              <p className="mt-6 text-center text-sm text-slate-500"> {/* Text color updated */}
                Already have an account?{' '}
                <button onClick={() => setShowLogin(true)} className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"> {/* Link color updated */}
                  Log in
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar userEmail={currentUser.email} onLogout={handleLogout} />
      <Dashboard 
        transactions={transactions} 
        addTransaction={addTransaction}
        deleteTransaction={deleteTransaction}
        userId={currentUser.id}
      />
    </div>
  );
};

export default App;