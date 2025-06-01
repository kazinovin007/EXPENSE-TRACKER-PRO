import { ExpenseCategory, IncomeCategory, CurrencyCode } from './types';

export const APP_NAME = "Expense Tracker Pro";
export const LOCAL_STORAGE_USERS_KEY = 'expenseTrackerAppUsers';
export const LOCAL_STORAGE_TRANSACTIONS_KEY = 'expenseTrackerAppTransactions';
export const LOCAL_STORAGE_LOGGED_IN_USER_KEY = 'expenseTrackerLoggedInUser';

export const DEFAULT_EXPENSE_CATEGORIES: ExpenseCategory[] = Object.values(ExpenseCategory);
export const DEFAULT_INCOME_CATEGORIES: IncomeCategory[] = Object.values(IncomeCategory);

export const SUPPORTED_CURRENCIES: { code: CurrencyCode, name: string }[] = [
  { code: 'USD', name: 'US Dollar' },
  { code: 'EUR', name: 'Euro' },
  { code: 'GBP', name: 'British Pound' },
  { code: 'JPY', name: 'Japanese Yen' },
  { code: 'CAD', name: 'Canadian Dollar' },
  { code: 'AUD', name: 'Australian Dollar' },
  { code: 'CHF', name: 'Swiss Franc' },
  { code: 'CNY', name: 'Chinese Yuan' },
  { code: 'INR', name: 'Indian Rupee' },
  { code: 'NPR', name: 'Nepali Rupee' }, // Added NPR
];

export const DEFAULT_CURRENCY: CurrencyCode = 'USD';

export const GEMINI_MODEL_TEXT = 'gemini-2.5-flash-preview-04-17';