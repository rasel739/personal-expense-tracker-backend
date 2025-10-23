export interface ICreateExpense {
  title: string;
  amount: number;
  category: string;
  type: 'INCOME' | 'EXPENSE';
  note?: string;
}

export interface ICreateExpenseResonse {
  title: string;
  amount: number;
  category: string;
  type: 'INCOME' | 'EXPENSE';
  note?: string | null;
  isLarge: boolean;
  userId: string;
}

export interface IUpdateExpense {
  amount?: number;
  type?: 'INCOME' | 'EXPENSE';
  note?: string;
}

export interface IExpenseSummary {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  balanceStatus: 'Positive' | 'Negative';
}
