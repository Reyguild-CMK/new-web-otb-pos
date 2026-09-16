export interface MidtransResponse{
    id : number;
    id_midtrans_request: string;
    id_pawn: number;
    id_customer: number;
    is_discount: boolean | null;
    interest_percentage: number;
    interest_nominal: number;
    pawn_number: string;
    status_code: number;
    status_message:	string;
    order_id: string;
    gross_amount: number;
    payment_type: string;
    bank: string;
    va_no:	string;
    transaction_status:	string;
    transaction_time: Date;
    valid_until: Date;
    respons: string;
    source: number;
    created_at: Date;
    updated_at: Date;
}

export const dataMidTransResponse : MidtransResponse[] =
[
    {
        id: 1,
        id_midtrans_request: "980",
        id_pawn: 4,
        id_customer: 4,
        is_discount: null,
        interest_percentage: 6.00,
        interest_nominal: 629528,
        pawn_number: "PN2604161475",
        status_code: 201,
        status_message: "Success, Bank Transfer transaction is created",
        order_id: "J2CE432604160002bca165051",
        gross_amount: 10492147,
        payment_type: "bank_transfer",
        bank: "bca",
        va_no: "61544057446593813795275",
        transaction_status: "settlement",
        transaction_time: new Date("2026-04-16T16:50:51"),
        valid_until: new Date("2026-04-16T17:50:51"),
        respons: JSON.stringify({
            status_code: "201",
            status_message: "Success, Bank Transfer transaction is created",
            transaction_id: "b549689d-07f6-4759-893b-075e9828ec84",
            order_id: "J2CE432604160002bca165051",
            merchant_id: "G259361544",
            gross_amount: "10492147.00",
            currency: "IDR",
            payment_type: "bank_transfer",
            transaction_time: "2026-04-16 16:50:51",
            transaction_status: "pending",
            fraud_status: "accept",
            va_numbers: [{ bank: "bca", va_number: "61544057446593813795275" }],
            expiry_time: "2026-04-16 17:50:51",
        }),
        source: 1,
        created_at: new Date("2026-04-16T09:50:51"),
        updated_at: new Date("2026-04-16T09:51:09"),
    },
];
