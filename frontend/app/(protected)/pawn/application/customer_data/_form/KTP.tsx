import { Field, FieldLabel } from "@/components/ui/field-application";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export function FieldKTP() {
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
                    required>
                </Input>
            </Field>

            {/* Foto KTP */}
            <div className="sm:mt-0 mt-4 w-full sm:grid sm:grid-cols-2 text-center">
                <div></div>
                <div className="relative h-64 pt-4">
                    <Image 
                        src="/image/image_placeholder.png"
                        className="object-contain"
                        alt="Preview KTP"
                        fill
                    />
                </div>
            </div>
        </div>
    </>
)}