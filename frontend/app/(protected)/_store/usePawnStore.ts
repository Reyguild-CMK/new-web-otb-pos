import { create } from 'zustand'
import { PawnItemSummary } from '../_data/data-summary'

interface PawnStore {
  pawnItems: PawnItemSummary[]
  loanDetails: any | null
  customerData: any | null
  searchQuery: string
  selectedCustomer: string
  addPawnItem: (item: PawnItemSummary) => void
  removePawnItem: (id: number) => void
  clearPawnItems: () => void
  setLoanDetails: (details: any) => void
  setCustomerData: (data: any) => void
  setSearchQuery: (query: string) => void
  setSelectedCustomer: (id: string) => void
}

export const usePawnStore = create<PawnStore>((set) => ({
  pawnItems: [],
  loanDetails: null,
  customerData: null,
  searchQuery: "",
  selectedCustomer: "",
  addPawnItem: (item) => set((state) => ({ pawnItems: [...state.pawnItems, item] })),
  removePawnItem: (id) => set((state) => ({ pawnItems: state.pawnItems.filter(i => i.id !== id) })),
  clearPawnItems: () => set({ pawnItems: [] }),
  setLoanDetails: (details) => set({ loanDetails: details }),
  setCustomerData: (data) => set({ customerData: data }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCustomer: (id) => set({ selectedCustomer: id }),
}))
