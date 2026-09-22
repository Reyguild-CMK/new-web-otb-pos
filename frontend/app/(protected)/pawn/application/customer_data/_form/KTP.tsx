// Components - label & field input
import { Field, FieldLabel } from "@/components/ui/field-application";
import { Input } from "@/components/ui/input";

// Image
import PreviewImage from "@/components/shared/ImagePreview/ImagePreview";

export function FieldKTP({ customer, formData, setFormData }: { customer?: any, formData: any, setFormData: any }) {
    return (
        <>
        {/* KTP */}
        <div className="w-full">
            {/* Input No KTP */}
            <Field>
                <FieldLabel htmlFor="ktpNumber">No KTP</FieldLabel>
                <Input
                    id="ktpNumber"
                    name="ktpNumber"
                    type="text"
                    placeholder="No KTP"
                    value={formData.ktpNumber}
                    onChange={(e) => setFormData({...formData, ktpNumber: e.target.value})}
                    required>
                </Input>
            </Field>

            {/* Foto KTP & Selfie */}
            <div className="mt-6 w-full flex flex-row gap-4">
                <div className="flex-1 text-center">
                    <p className="font-semibold text-sm mb-2 text-gray-600">Customer</p>
                    <PreviewImage 
                        src={customer?.image_selfie || "/image/image_placeholder.png"}
                        alt="Preview Customer"
                        className="h-48 border border-gray-300 rounded-lg overflow-hidden bg-gray-50 hover:opacity-80 transition-opacity"
                    />
                </div>
                <div className="flex-1 text-center">
                    <p className="font-semibold text-sm mb-2 text-gray-600">KTP</p>
                    <PreviewImage 
                        src={customer?.image_tanda_pengenal || "/image/image_placeholder.png"}
                        alt="Preview KTP"
                        className="h-48 border border-gray-300 rounded-lg overflow-hidden bg-gray-50 hover:opacity-80 transition-opacity"
                    />
                </div>
            </div>
        </div>
    </>
)}