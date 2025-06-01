export interface UserCredentials {
  email: string;
  password?: string; // Required for signup/login, optional for display
}

export interface StoredUser extends UserCredentials {
  id: string;
}

export enum TransactionType {
  INCOME = 'income',
  EXPENSE = 'expense',
}

export enum ExpenseCategory {
  FOOD = 'Food & Dining',
  TRANSPORTATION = 'Transportation',
  HOUSING = 'Housing',
  UTILITIES = 'Utilities',
  ENTERTAINMENT = 'Entertainment',
  HEALTHCARE = 'Healthcare',
  EDUCATION = 'Education',
  SHOPPING = 'Shopping',
  PERSONAL_CARE = 'Personal Care',
  GIFTS_DONATIONS = 'Gifts & Donations',
  OTHER = 'Other',
}

export enum IncomeCategory {
  SALARY = 'Salary',
  BUSINESS = 'Business Income',
  INVESTMENTS = 'Investments',
  GIFTS = 'Gifts Received',
  FREELANCE = 'Freelance',
  OTHER = 'Other',
}

export type Category = ExpenseCategory | IncomeCategory;

// Supported currency codes (ISO 4217)
export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'JPY' | 'CAD' | 'AUD' | 'CHF' | 'CNY' | 'INR' | 'NPR'; // Added NPR

export interface Transaction {
  id: string;
  userId: string;
  type: TransactionType;
  amount: number;
  currency: CurrencyCode; // Added currency field
  category: Category;
  description: string;
  date: string; // ISO string date
}

export interface ChartDataPoint {
  name: string;
  value: number;
}