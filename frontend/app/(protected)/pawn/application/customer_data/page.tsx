"use client"

// Style Card
import { style_card } from "@/components/shared/Stepper/Stepper";

// Component
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/toast";

// Data
import { dataCustomer } from "@/app/(protected)/_data/data-customer";

// Schema
import { customerDataSchema } from "./_schema/customer-data-schema";

// Components - label & field input
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field-application";

// Icon
import { Search } from "lucide-react";

// Form
import { FieldIdentity } from "./_form/Indentity";
import { FieldKTP } from "./_form/KTP";

import { StepNavigation } from "@/components/shared/Stepper/StepNavigation";
import { useRouter } from "next/navigation";
import { usePawnStore } from "@/app/(protected)/_store/usePawnStore";

export default function CustomerApplication() {
    const router = useRouter();
    
    const storeSelectedCustomer = usePawnStore((state) => state.selectedCustomer);
    const storeSearchQuery = usePawnStore((state) => state.searchQuery);
    const storeCustomerData = usePawnStore((state) => state.customerData);
    
    const setStoreSelectedCustomer = usePawnStore((state) => state.setSelectedCustomer);
    const setStoreSearchQuery = usePawnStore((state) => state.setSearchQuery);
    const setStoreCustomerData = usePawnStore((state) => state.setCustomerData);

    const [selectedCustomer, setSelectedCustomer] = useState(storeSelectedCustomer || "");
    const [searchQuery, setSearchQuery] = useState(storeSearchQuery || "");

    const handleSearch = () => {
        if (!searchQuery.trim()) {
            toast.add({ title: "Peringatan", description: "Silakan masukkan nomor telepon atau No Customer", type: "warning" });
            return;
        }

        const found = dataCustomer.find(c => 
            c.handphone === searchQuery || 
            c.NoCustomer === searchQuery
        );

        if (found) {
            setSelectedCustomer(found.id.toString());
            const getFormattedDate = (c: any) => c?.tanggal_lahir ? new Date(c.tanggal_lahir).toISOString().split('T')[0] : "";
            setCustomerData({
                name: found.name || "",
                birthDate: getFormattedDate(found),
                address: found.address || "",
                handphone: found.handphone || "",
                email: found.email || "",
                occupation: found.profesi || "",
                ktpNumber: found.tanda_pengenal || ""
            });
            toast.add({ title: "Berhasil", description: `Data pelanggan ${found.name} ditemukan!`, type: "success" });
        } else {
            setSelectedCustomer("");
            setCustomerData({
                name: "",
                birthDate: "",
                address: "",
                handphone: "",
                email: "",
                occupation: "",
                ktpNumber: ""
            });
            toast.add({ title: "Tidak Ditemukan", description: "Pelanggan dengan nomor tersebut tidak ada di database.", type: "error" });
        }
    };

    const customerObj = dataCustomer.find(c => c.id.toString() === selectedCustomer);

    const [customerData, setCustomerData] = useState(storeCustomerData || {
        name: "",
        birthDate: "",
        address: "",
        handphone: "",
        email: "",
        occupation: "",
        ktpNumber: ""
    });

    const handleNext = () => {
        const validation = customerDataSchema.safeParse(customerData);
        if (!validation.success) {
            const firstError = validation.error.issues[0].message;
            toast.add({ title: "Validasi Gagal", description: firstError, type: "error" });
            return;
        }

        setStoreCustomerData(customerData);
        setStoreSelectedCustomer(selectedCustomer);
        setStoreSearchQuery(searchQuery);
        router.push("/pawn/application/document");
    };

    const handleBack = () => {
        setStoreCustomerData(customerData);
        setStoreSelectedCustomer(selectedCustomer);
        setStoreSearchQuery(searchQuery);
        router.push("/pawn/application/loan");
    };
    return (
        <>
        {/* Card */}
            <div className={`${style_card} w-full`}>
                {/* Judul */}
                <h1 className="font-bold">Data Pelanggan</h1>

                {/* Cari Pelanggan */}
                <FieldGroup className="gap-2">
                    <Field orientation="responsive">
                        <FieldLabel htmlFor="customerName">Cari Pelanggan</FieldLabel>
                        <div className="flex md:flex-row flex-col gap-2 w-full">
                            <Input 
                                id="customerSearch"
                                placeholder="Masukan No. Customer atau No. Telepon" 
                                className="w-full flex-1 min-w-[300px]" 
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            />
                            <Button type="button" onClick={handleSearch} className="bg-btn-primary-bg text-btn-primary-text">
                                <Search className="w-4 h-4 mr-2"/>Find
                            </Button>
                        </div>
                    </Field>
                    <p className="text-alert-error-icon">* Masukan No HP, No KTP atau email customer yang pernah melakukan transaksi atau No HP customer Lakuemas</p>
                </FieldGroup>

                {/* Form Data Diri*/}
                <div className="flex flex-col md:flex-row gap-6">
                    <FieldIdentity formData={customerData} setFormData={setCustomerData} />
                    {/* Form KTP */}
                    <FieldKTP customer={customerObj} formData={customerData} setFormData={setCustomerData} />
                </div>

                <StepNavigation 
                    currentStep={3} 
                    totalSteps={5} 
                    onNext={handleNext}
                    onBack={handleBack}
                />
            </div>
        </>
    )
}
