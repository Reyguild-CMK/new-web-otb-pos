export interface Docs{
    id: number,
    pawn_id : number,
    form_perjanjian:string, // wajib
    application_form:string, 
    sbg_form:string, 
    bukti_kepemilikan:string,
    pawn_form:string,
    surat_kuasa_form:string,
    titip_jual_form: string,
    bukti_transaksi:string, 
    nota_pembayaran:string,
    nota_tanda_terima:string,
    perjanjian_take_over:string,
    permintaan_dana_take_over:string,   
}

export const dataDocs: Docs[]=[
    {
        id: 1,
        pawn_id : 4,
        form_perjanjian: "/image/document/sgk_jabar.png",
        application_form: "/image/document/sgk_jabar.png",
        sbg_form: "/image/document/sgk_jabar.png",
        bukti_kepemilikan: "/image/document/sgk_jabar.png",
        pawn_form: "/image/document/sgk_jabar.png",
        surat_kuasa_form: "/image/document/sgk_jabar.png",
        titip_jual_form: "/image/document/sgk_jabar.png",
        bukti_transaksi: "/image/document/sgk_jabar.png", 
        nota_pembayaran: "/image/document/sgk_jabar.png",
        nota_tanda_terima: "/image/document/sgk_jabar.png",
        perjanjian_take_over: "/image/document/sgk_jabar.png",
        permintaan_dana_take_over: "/image/document/sgk_jabar.png"
    }
]