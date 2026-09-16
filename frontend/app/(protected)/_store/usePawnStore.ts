import { create } from 'zustand'
import { PawnItemSummary } from '../_data/data-summary'

interface PawnStore {
  pawnItems: PawnItemSummary[]
  addPawnItem: (item: PawnItemSummary) => void
  removePawnItem: (id: number) => void
  clearPawnItems: () => void
}

export const usePawnStore = create<PawnStore>((set) => ({
  pawnItems: [],
  addPawnItem: (item) => set((state) => ({ pawnItems: [...state.pawnItems, item] })),
  removePawnItem: (id) => set((state) => ({ pawnItems: state.pawnItems.filter(i => i.id !== id) })),
  clearPawnItems: () => set({ pawnItems: [] }),
}))
