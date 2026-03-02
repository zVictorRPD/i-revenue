import type { Expense } from '@/types/expense';
import { create } from 'zustand'

type ExpenseStore = {
  expenses: Expense[];
  addExpenseModalOpen: boolean;
  setAddExpenseModalOpen: (open: boolean) => void;
  editExpenseModalData: {
    open: boolean;
    expense: Expense | null;
  };
  setEditExpenseModalData: (open: boolean, expense: Expense | null) => void;
  deleteExpenseAlertData: {
    open: boolean;
    expense: Expense | null;
  };
  setDeleteExpenseAlertData: (open: boolean, expense: Expense | null) => void;
}

const useExpenseStore = create<ExpenseStore>((set) => ({
  expenses: [],
  addExpenseModalOpen: false,
  setAddExpenseModalOpen: (open: boolean) => set({ addExpenseModalOpen: open }),
  editExpenseModalData: {
    expense: null,
    open: false,
  },
  setEditExpenseModalData: (open: boolean, expense: Expense | null) => set(() => ({
    editExpenseModalData: {
      open,
      expense,
    }
  })),
  deleteExpenseAlertData: {
    expense: null,
    open: false,
  },
  setDeleteExpenseAlertData: (open: boolean, expense: Expense | null) => set(() => ({
    deleteExpenseAlertData: {
      open,
      expense,
    }
  })),
}))

export default useExpenseStore