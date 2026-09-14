export interface PawnItemType{
    id: number;
    type: string;
    butik_item_brand_id: number,
    text: string,
    appraisal_excellent: number,
    appraisal_good: number,
    appraisal_fair: number,
    max_loan_excellent: number,
    max_loan_good: number,
    max_loan_fair: number,
    storage_insurance_fee: number,
    admin_fee: number,
    interest_rate: number,
    status: number
}

export const dataPawnItemType: PawnItemType[]=[
    {id: 9,	
    type: "cmk_dj",
    butik_item_brand_id: 2,
    text:"CMK Diamond Jewelry",	
    appraisal_excellent:95.00,
    appraisal_good: 92.00,
    appraisal_fair: 92.00,
    max_loan_excellent:	85.00,
    max_loan_good:80.00,
    max_loan_fair:75.00,
    storage_insurance_fee: 0.00,
    admin_fee: 1,
    interest_rate:	1,
    status:	1
    }
]