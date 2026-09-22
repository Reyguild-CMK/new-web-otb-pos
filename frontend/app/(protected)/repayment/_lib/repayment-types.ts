import { PawnStatusNotification } from "../../_data/data-pawn";
import { PaymentMethod } from "../_component/_modal/payment-method-modal";

export interface PaymentSubmission{
    status: PawnStatusNotification;
    paymentMethod: PaymentMethod;
    nominal: number;
    buktiTransaksi: File | null;
    formApplication: File | null;
    submitted: boolean;
    uploadedFormApplication: boolean;
}