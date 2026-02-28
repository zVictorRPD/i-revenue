import type { Revenue } from '@/types/revenue';
import { create } from 'zustand'

type RevenueStore = {
  revenues: Revenue[];
  addRevenueModalOpen: boolean;
  setAddRevenueModalOpen: (open: boolean) => void;
  editRevenueModalData: {
    open: boolean;
    revenue: Revenue | null;
  };
  setEditRevenueModalData: (open: boolean, revenue: Revenue | null) => void;
  deleteRevenueAlertData: {
    open: boolean;
    revenue: Revenue | null;
  };
  setDeleteRevenueAlertData: (open: boolean, revenue: Revenue | null) => void;
}

const useRevenueStore = create<RevenueStore>((set) => ({
  revenues: [],
  addRevenueModalOpen: false,
  setAddRevenueModalOpen: (open: boolean) => set({ addRevenueModalOpen: open }),
  editRevenueModalData: {
    revenue: null,
    open: false,
  },
  setEditRevenueModalData: (open: boolean, revenue: Revenue | null) => set(() => ({
    editRevenueModalData: {
      open,
      revenue,
    }
  })),
  deleteRevenueAlertData: {
    revenue: null,
    open: false,
  },
  setDeleteRevenueAlertData: (open: boolean, revenue: Revenue | null) => set(() => ({
    deleteRevenueAlertData: {
      open,
      revenue,
    }
  })),
}))

export default useRevenueStore