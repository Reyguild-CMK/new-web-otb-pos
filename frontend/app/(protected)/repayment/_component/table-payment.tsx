"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PawnSummary } from "@/app/(protected)/_data/data-summary";
import { useState } from "react";
import { PawnStatusNotification } from "../../_data/data-pawn";
import { DropDownStatus } from "../../pawn/due_date_list/_components/dropdown-due-date";
import { Card } from "@/components/ui/card";
import { getRepaymentAction } from "../_lib/repayment-action";
import { canChangeStatus, getRepaymentStatus, isPawnDone } from "../_lib/repayment-logic";
import { Button } from "@/components/ui/button";
import { formatCurrency, formatRupiah } from "@/lib/currency";

import { PaymentMethodModal, PaymentMethod } from "./_modal/payment-method-modal";
import { RepawnModal } from "./_modal/repawn-modal";
import { ViewDocsModal } from "./_modal/view-document-modal";
import { UploadDocsModal } from "./_modal/upload-document-modal";
import { PaymentSubmission } from "../_lib/repayment-types";

interface PaymentDataProps {
  data?: PawnSummary[];
}

type ActiveModal = 
    | "payment-method"
    | "repayment"
    | "cash"
    | "manual-transfer"
    | "upload-docs"
    | "view-docs"
    | null;

export function PaymentTable({ data }: PaymentDataProps) {
    // flow
    const [activeModal, setActiveModal] = useState<ActiveModal>(null)
    const [selectedPawn, setSelectedPawn] = useState<PawnSummary | null>(null)
    const [paymentDate, setPaymentDate] = useState("");
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null);
    const [paymentState, setPaymentState] = useState<Record<number, PaymentSubmission>>({})

    const [statusMap, setStatusMap] = useState<Record<string, PawnStatusNotification>>({});    
    const [selectedStatus, setSelectedStatus] = useState<PawnStatusNotification | null>(null)
    
    const openPaymentMethod = (pawn: PawnSummary) => {
        setSelectedPawn(pawn)
        setSelectedStatus(statusMap[pawn.id] ?? pawn.statusNotification ?? "tanpa_status")
        setPaymentDate(new Date().toISOString().slice(0, 10));
        setActiveModal("payment-method")
    }

    const selectPaymentMethod = (method: PaymentMethod) => {
        setSelectedPaymentMethod(method)
        if(method === "cash"){
            setActiveModal("cash")
        } else if (method === "manual-transfer"){
            setActiveModal("manual-transfer")
        } else {
            setActiveModal("repayment")
        }
    }

    const handleStatusChange = (pawnId: string, status: PawnStatusNotification) => {
        setStatusMap((prev) => ({
        ...prev,
        [pawnId]: status,
        }));
    };

    //handler view document
    const handleViewDocs = (pawn: PawnSummary) => {
        setSelectedPawn(pawn)
        setActiveModal("view-docs")
    }

    //handler upload docs
    const handleOpenUploadDocs = (
        pawn: PawnSummary,
        currentStatus: PawnStatusNotification
    ) => {
        setSelectedPawn(pawn)
        setSelectedStatus(currentStatus)
        setActiveModal("upload-docs")
    }

    return (
        <>
       <Card className="rounded-none p-4">
             <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Application Number</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Loan</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Repayment Status</TableHead>
                    </TableRow>
                </TableHeader>

                {!data ? (
                    <TableBody>
                    <TableRow>
                        <TableCell className="text-center bg-muted" colSpan={8}>
                        No Data
                        </TableCell>
                    </TableRow>
                    </TableBody>
                ) : (
                    <TableBody>
                    {data.map((pawn) => {
                        const currentStatus = statusMap[pawn.id] ?? pawn.statusNotification;
                        const currentPayment = paymentState[pawn.id];
                        const action = getRepaymentAction(pawn, currentStatus, currentPayment);
                        const repaymentStatus = getRepaymentStatus(pawn, currentPayment);

                        return (
                        <TableRow key={pawn.id}>
                            <TableCell>{pawn.applicationNumber}</TableCell>
                            <TableCell>{pawn.customer.name}</TableCell>
                            <TableCell>{formatRupiah(pawn.nilaiPinjaman)}</TableCell>
                            <TableCell>{pawn.tanggalTransaksi.toLocaleDateString("id-ID")}</TableCell>
                            <TableCell>{pawn.jatuhTempo?.toLocaleDateString("id-ID")}</TableCell>
                            <TableCell>
                                {isPawnDone(pawn) || !canChangeStatus(pawn) ? ("~") : (
                                    <DropDownStatus 
                                        value={currentStatus}
                                        onChange={(value) => handleStatusChange(String(pawn.id), value)}></DropDownStatus>
                                )}
                            </TableCell>
                            <TableCell>
                                {action === "view-docs" && (
                                    <Button type="button" onClick={() => {
                                        setSelectedPawn(pawn);
                                        setActiveModal("view-docs");
                                    }}>View Docs</Button>
                                )}
                                {action === "upload-docs" && (
                                    <div>
                                        <Button type="button" onClick={() => {
                                            handleOpenUploadDocs(
                                                pawn,
                                                statusMap[pawn.id] ??
                                                    pawn.statusNotification ?? "tanpa_status"
                                            )
                                        }}>Upload Docs</Button>
                                        <small className="block text-muted-foreground">Anda belum upload dokumen</small>
                                    </div>
                                )}
                                {action === "payment-method" && (
                                    <Button type="button" onClick={() => openPaymentMethod(pawn)}>Virtual Account</Button>
                                )}
                                {action === "Unpaid" && "~"}
                            </TableCell>
                            <TableCell>{repaymentStatus}</TableCell>
                        </TableRow>
                        );
                    })}
                    </TableBody>
                )}
            </Table>
       </Card>
       <PaymentMethodModal
            open={activeModal === "payment-method"}
            paymentDate={paymentDate}
            onPaymentDateChange={setPaymentDate}
            onClose={() => setActiveModal(null)}
            onSelectMethod={selectPaymentMethod}>
        </PaymentMethodModal>
       <RepawnModal
            open={activeModal === "repayment"}
            pawn={selectedPawn}
            status={selectedStatus ?? "tanpa_status"}
            paymentMethod={selectedPaymentMethod}
            onClose={() => setActiveModal(null)}
            onSubmit={({nominal, buktiTransaksi}) => {
                if (!selectedPawn || !selectedStatus || !selectedPaymentMethod){
                    return;
                }
                setPaymentState((previous) => ({
                    ...previous,
                    [selectedPawn.id]: {
                        status: selectedStatus,
                        paymentMethod: selectedPaymentMethod,
                        nominal,
                        buktiTransaksi,
                        submitted: true,
                        uploadedFormApplication: false,
                        formApplication: null,
                    },
                }));
                setActiveModal(null)
            }}></RepawnModal>
        <ViewDocsModal
            open={activeModal === "view-docs"}
            documents={selectedPawn ? { data: selectedPawn } : null}
            formApplication={selectedPawn ? paymentState[selectedPawn.id]?.formApplication : null}
            onClose={() => setActiveModal(null)}
            />
        <UploadDocsModal
            open={activeModal === "upload-docs"}
            status={selectedStatus}
            documents={selectedPawn? {data: selectedPawn} : null}
            onClose={() => setActiveModal(null)}
            onUpload={(type, file) => {
                if (!selectedPawn || type !== "form_application") {
                    return;
                }

                setPaymentState((previous) => ({
                    ...previous,
                    [selectedPawn.id]: {
                        ...previous[selectedPawn.id],
                        uploadedFormApplication: true,
                        formApplication: file,
                    },
                }));
                setActiveModal(null);
            }}></UploadDocsModal>
        
        {/* <CashPaymentModal
            open={activeModal === "cash"}
            amountPayment={selectedPawn?.nilaiPinjaman ?? 0}
            paymentDate={paymentDate}
            onClose={() => setActiveModal(null)}
            onSubmit={(result) => {
                console.log(result);
                setActiveModal(null);
            }}
            />

            <ManualTransferModal
            open={activeModal === "manual-transfer"}
            onClose={() => setActiveModal(null)}
            onSubmit={(result) => {
                console.log(result);
                setActiveModal(null);
            }}
            />

            />

             */}
        </>
    );
}

