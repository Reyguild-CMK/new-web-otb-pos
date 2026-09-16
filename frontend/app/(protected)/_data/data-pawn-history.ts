// export interface History{
//     id: number,
//     midtrans_code: number | null,
//     pawn_id: number
//     pawn_number: string,
//     pawn_number_old: null,
//     extend_number: number, // repawn keberapa
//     payment_method:string // enum keknya
//     payment_date: 
//       ,[status]
//       ,[remark]
//       ,[date_transaction]
//       ,[due_date]
//       ,[interest_percentage]
//       ,[interest_nominal]
//       ,[admin_fee]
//       ,[storage_insurance_fee_percentage]
//       ,[storage_insurance_fee_nominal]
//       ,[is_discount_gadai]
//       ,[discount_percentage]
//       ,[discount_nominal]
//       ,[total_penalty_day]
//       ,[total_penalty_percentage]
//       ,[total_penalty_nominal]
//       ,[total_payment]
//       ,[bukti_transaksi]
//       ,[nota_pembayaran]
//       ,[nota_tanda_terima]
//       ,[form_application]
//       ,[response_status]
//       ,[response_cmkapi]
//       ,[created_at]
//       ,[updated_at]
//       ,[is_last_pawn_history]
// }

// export const dataHistory: History[]=[
//     {
//         id: 1,
//         pawn_id: 4,
//         pawnNumber: "PWN-260901-0004",
//     }
// ]

export interface PawnHistory {
    id: number;
    pawn_id: number;
    extend_number: number;
    due_date: string;
    storage_insurance_fee_nominal: number;
    admin_fee: number;
    total_payment: number;
    status: string;
    form_application: string | null;
    bukti_transaksi: string | null;
    remark: string;
    nota_tanda_terima: string | null;
}

export const dataPawnHistory: PawnHistory[] = [
    {
        id: 1,
        pawn_id: 4,
        extend_number: 0,
        due_date: "26 Feb 26",
        storage_insurance_fee_nominal: 258701,
        admin_fee: 0,
        total_payment: 258701,
        status: "completed",
        remark:"Pengajuan Gadai",
        form_application: "/image/document/sgk_jabar.png",
        bukti_transaksi: "/image/document/sgk_jabar.png",
        nota_tanda_terima: null
    },
    {
        id: 2,
        pawn_id: 4,
        extend_number: 1,
        due_date: "26 Feb 26",
        storage_insurance_fee_nominal: 258701,
        admin_fee: 0,
        total_payment: 258701,
        status: "completed",
        remark:"Perpanjangan Gadai 1",
        form_application: "/image/document/sgk_jabar.png",
        bukti_transaksi: "/image/document/sgk_jabar.png",
        nota_tanda_terima: null
    },
    {
        id: 3,
        pawn_id: 3,
        extend_number: 0,
        due_date: "26 Feb 26",
        storage_insurance_fee_nominal: 258701,
        admin_fee: 0,
        total_payment: 258701,
        status: "completed",
        remark:"Pengajuan Gadai",
        form_application: "/image/document/sgk_jabar.png",
        bukti_transaksi: "/image/document/sgk_jabar.png",
        nota_tanda_terima: null
    },
    {
        id: 4,
        pawn_id: 3,
        extend_number: 1,
        due_date: "26 Feb 26",
        storage_insurance_fee_nominal: 258701,
        admin_fee: 0,
        total_payment: 258701,
        status: "completed",
        remark:"Perpanjangan Gadai 1",
        form_application: "/image/document/sgk_jabar.png",
        bukti_transaksi: "/image/document/sgk_jabar.png",
        nota_tanda_terima: null
    },
];