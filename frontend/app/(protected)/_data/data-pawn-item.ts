export interface PawnItem{
    id: number,
    pawn_id: number,
    pawn_item_code: string,
    pawn_item_type_id: number,
    item_name: string,
    status: string,
    withdrawal_date: Date | null,
    location_store_id: number,
    plu: string,
    carat_id: number,
    carat: number,
    weight: number,
    carat_current: number,
    weight_current: number,
    photo: string | null,
    invoice_photo: string | null,
    app_form_photo: string | null,
    seal_form_photo: string | null,
    agreement_form_photo: string | null,
    quantity: number,
    condition: string,
    ltv: string | null,
    estimated_unit_appraisal_price: number, // itungan
    estimated_total_appraisal_price: number, // itungan juga gatau bedanya apa
    appraisal: number, // display setelah estimated appraisal akhirnya dah diitung
    invoice_value: number,
    max_loan_price: number // itungan
    remark: string,
    created_at: Date,
    updated_at: Date
}

export const dataPawnItems : PawnItem[]=[
    {
        id: 1,
        pawn_id: 4,
        pawn_item_code: "ITEM-210901-0001",
        pawn_item_type_id: 9,
        item_name: "",
        status: "stored",
        withdrawal_date: null,
        location_store_id: 85,
        plu: "d20015227",
        carat_id: 8,
        carat: 75.50,
        weight: 2.61,
        carat_current: 75.50,
        weight_current: 2.61,
        photo: "/image/jewelry.jpg",
        invoice_photo: "/image/bg-login.jpg",
        app_form_photo: null,
        seal_form_photo: "/image/jewelry.jpg",
        agreement_form_photo: null,
        quantity: 1,
        condition: "excellent",
        ltv: null,
        estimated_unit_appraisal_price: 0,
        estimated_total_appraisal_price: 0,
        appraisal: 2420931,
        invoice_value: 2420931,
        max_loan_price: 2420931,
        remark: "LR PLU ABA004314\r\nKADAR 75% 18KARAT\r\nBERLIAN 1 BUTIR 0,148CT BL.F.VVS\r\nBERAT EMAS: 3,33GRA",
        created_at: new Date('2024-09-02T10:30:00'),
        updated_at: new Date('2024-09-02T10:30:00')
    }
]

	// estimated_unit_appraisal_price: 2420931	
    // estimated_total_appraisal_price: 2420931	
    // appraisal: 2420931