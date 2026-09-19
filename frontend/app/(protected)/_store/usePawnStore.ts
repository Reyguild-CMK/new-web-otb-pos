import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { PawnItemSummary } from '../_data/data-summary'
import { Pawn, PawnStatus } from '../_data/data-pawn'
import { pawnData } from '../_data/data-pawn-dummy'

interface PawnStore {
  // Current active session state
  pawnItems: PawnItemSummary[]
  loanDetails: any | null
  customerData: any | null
  searchQuery: string
  selectedCustomer: string
  
  // Transaction list state
  transactionList: Pawn[]
  activeTransactionId: number | null

  // Session actions
  addPawnItem: (item: PawnItemSummary) => void
  removePawnItem: (id: number) => void
  clearPawnItems: () => void
  setLoanDetails: (details: any) => void
  setCustomerData: (data: any) => void
  setSearchQuery: (query: string) => void
  setSelectedCustomer: (id: string) => void

  // Transaction list actions
  createNewTransaction: () => number
  loadTransaction: (id: number) => void
  syncActiveTransaction: (status?: PawnStatus) => void
  updateTransactionStatus: (id: number, status: PawnStatus) => void
  clearTransactions: () => void
}

export const usePawnStore = create<PawnStore>()(
  persist(
    (set, get) => ({
      pawnItems: [],
      loanDetails: null,
      customerData: null,
      searchQuery: "",
      selectedCustomer: "",
      
      transactionList: pawnData, // Initialize with mock data
      activeTransactionId: null,

      addPawnItem: (item) => { set((state) => ({ pawnItems: [...state.pawnItems, item] })); get().syncActiveTransaction(); },
      removePawnItem: (id) => { set((state) => ({ pawnItems: state.pawnItems.filter(i => i.id !== id) })); get().syncActiveTransaction(); },
      clearPawnItems: () => { set({ pawnItems: [] }); get().syncActiveTransaction(); },
      setLoanDetails: (details) => { set({ loanDetails: details }); get().syncActiveTransaction(); },
      setCustomerData: (data) => { set({ customerData: data }); get().syncActiveTransaction(); },
      setSearchQuery: (query) => set({ searchQuery: query }),
      setSelectedCustomer: (id) => set({ selectedCustomer: id }),

      createNewTransaction: () => {
        const txDate = new Date();
        const yy = String(txDate.getFullYear()).slice(-2);
        const mm = String(txDate.getMonth() + 1).padStart(2, '0');
        const dd = String(txDate.getDate()).padStart(2, '0');
        
        const state = get();
        // Determine the next sequence number for today
        const todaysTransactions = state.transactionList.filter(tx => 
          tx.applicationNumber.startsWith(`J2CE34${yy}${mm}${dd}`)
        );
        const seq = String(todaysTransactions.length + 1).padStart(4, '0');
        const newAppNumber = `J2CE34${yy}${mm}${dd}${seq}`;

        const newId = Math.max(0, ...state.transactionList.map(t => t.id)) + 1;
        
        const newTransaction = {
          id: newId,
          type: "J2C",
          applicationNumber: newAppNumber,
          pawnNumber: `PWN-${yy}${mm}${dd}-${seq}`,
          dibuatOleh: "JR CMK",
          status: "created" as PawnStatus,
          createdAt: new Date(),
          createdBy: "JR CMK Simulator",
          tanggalTransaksi: new Date(),
          // Default required fields
          oldApplication: "-",
          brand: "J2C",
          paymentMethod: "Transfer",
          disbursementType: "Transfer",
          storeId: "STORE-C",
          usersId: "JR-C",
          customerId: 0,
          customerData: null,
          newPawnId: null,
          isNewJ2c: false,
          isRestock: false,
          isTakeOver: false,
          isGadaiResell: false,
          totalAppraisalPrice: 0,
          totalMaximumLoan: 0,
          nilaiPinjaman: 0,
          disburseNominal: 0,
          interestPercentage: 0,
          interestNominal: 0,
          repaymentNominal: 0,
          interestRepaymentPercentage: null,
          interestRepaymentNominal: null,
          penaltyNominal: 0,
          storageInsuranceFeeNominal: 0,
          persentaseBiayaPerawatan: 0,
          goldRate: null,
          dueDate: null,
          lastSaleDate: null,
          topupDate: null,
          pawnDoneDate: null,
          pawnDoneBy: null,
          draftName: null,
          customerCurrentId: null,
          customerSgkId: null,
          requestDiscountId: null,
          document: null,
          approveNote: null,
          rejectedAt: null,
          rejectedBy: null,
          completedDocumentAt: null,
          completedDocumentBy: null,
          reviewedFinanceAt: null,
          reviewedFinanceBy: null,
          disbursedBy: null,
          disbursedAt: null,
          resellAt: null,
          resellBy: null,
          reason: null,
          updatedStatusAt: null,
          bankId: 0,
          bankBranch: "-",
          metodePencairan: "Transfer",
          nomorRekening: "",
          namaPemilikRekening: "",
          applicationFormPhoto: null,
          pawnFormPhoto: null,
          sbgFormPhoto: null,
          suratKuasaPhoto: null,
          sealFormPhoto: null,
          sealedProductPhoto: null,
          invoice: null,
          suratsegel: null,
          irisReferenceNumber: null,
          jsonRequestPaid: null,
          jsonResponsePaid: null,
          nominalPelunasan: null,
          buktiTransferPelunasan: null,
          generateCode: null,
          noReferensi: null,
          referenceById: null,
          responseStatus: null,
          responseCmkapi: null,
          updatedAt: null,
          deletedAt: null,
          stampsCustomerId: null,
          idPawnTenor: "",
          tenor: 0,
          biayaAdmin: 0,
          storageInsuranceFeePercentage: 0,
          statusNotification: null,
          remark: null,
          appraisal: null,
          approvedAt: null,
          approvedBy: null,
          barangCodes: []
        };

        set((state) => ({
          transactionList: [newTransaction, ...state.transactionList],
          activeTransactionId: newId,
          // Reset form state for new transaction
          pawnItems: [],
          loanDetails: {
            applicationNumber: newAppNumber,
            tanggalTransaksi: new Date().toISOString()
          },
          customerData: null,
          searchQuery: "",
          selectedCustomer: ""
        }));

        return newId;
      },

      loadTransaction: (id: number) => {
        const state = get();
        const tx = state.transactionList.find(t => t.id === id) as any;
        if (tx) {
          set({
            activeTransactionId: id,
            // Restore draft data if exists, otherwise load defaults
            pawnItems: tx.draftData?.pawnItems || [],
            loanDetails: tx.draftData?.loanDetails || {
              ...state.loanDetails,
              applicationNumber: tx.applicationNumber,
              tanggalTransaksi: tx.tanggalTransaksi,
              nilaiPinjaman: tx.nilaiPinjaman,
              bankId: tx.bankId,
              nomorRekening: tx.nomorRekening,
              namaPemilikRekening: tx.namaPemilikRekening
            },
            customerData: tx.draftData?.customerData || null
          });
        }
      },

      syncActiveTransaction: (status?: PawnStatus) => {
        set((state) => {
          if (state.activeTransactionId === null) return state;

          const updatedList = state.transactionList.map(tx => {
            if (tx.id === state.activeTransactionId) {
              return {
                ...tx,
                ...(status ? { status } : {}),
                nilaiPinjaman: state.loanDetails?.nilaiPinjaman || tx.nilaiPinjaman,
                customerId: state.customerData?.id || tx.customerId,
                tanggalTransaksi: state.loanDetails?.tanggalTransaksi ? new Date(state.loanDetails.tanggalTransaksi) : tx.tanggalTransaksi,
                bankId: state.loanDetails?.bankId ? Number(state.loanDetails.bankId) : tx.bankId,
                idPawnTenor: state.loanDetails?.tenor || tx.idPawnTenor,
                draftData: {
                  pawnItems: state.pawnItems,
                  loanDetails: state.loanDetails,
                  customerData: state.customerData
                }
              };
            }
            return tx;
          });

          return { transactionList: updatedList };
        });
      },

      updateTransactionStatus: (id: number, status: PawnStatus) => {
        set((state) => ({
          transactionList: state.transactionList.map(tx => 
            tx.id === id ? { ...tx, status, approvedAt: status === 'approved' ? new Date() : tx.approvedAt } : tx
          )
        }));
      },
      
      clearTransactions: () => set({ transactionList: pawnData })
    }),
    {
      name: 'pawn-storage',
    }
  )
)
