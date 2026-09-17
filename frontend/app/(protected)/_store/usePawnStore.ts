import { create } from 'zustand'
import { PawnItemSummary } from '../_data/data-summary'

interface PawnStore {
  pawnItems: PawnItemSummary[]
  loanDetails: any | null
  addPawnItem: (item: PawnItemSummary) => void
  removePawnItem: (id: number) => void
  clearPawnItems: () => void
  setLoanDetails: (details: any) => void
}

export const usePawnStore = create<PawnStore>((set) => ({
  pawnItems: [],
  loanDetails: null,
  addPawnItem: (item) => set((state) => ({ pawnItems: [...state.pawnItems, item] })),
  removePawnItem: (id) => set((state) => ({ pawnItems: state.pawnItems.filter(i => i.id !== id) })),
  clearPawnItems: () => set({ pawnItems: [] }),
  setLoanDetails: (details) => set({ loanDetails: details }),
}))
