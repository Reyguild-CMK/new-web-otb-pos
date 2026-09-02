import { Field, FieldLabel } from "@/components/ui/field-application";
import { Input } from "@/components/ui/input";
import Image from "next/image";

interface PhotoFieldProps {
  id: string;
  name: string;
  label: string;
  imageSrc: string;
  imageAlt: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputImage({
  id,
  name,
  label,
  imageSrc,
  imageAlt = "Preview",
  onChange,
}: PhotoFieldProps) {
  return(
    <Field orientation="vertical">
      <FieldLabel htmlFor={id}>
        {label}
      </FieldLabel>
      
        {/* Input File */}
        <div className="w-full flex-1">
          <Input 
            id={id} 
            name={name} 
            type="file" 
            accept="image/*"
            onChange={onChange}
            className="w-full cursor-pointer file:hover:bg-gray-200"
          />
          <p className="text-xs text-alert-error-icon text-right">*PNG, JPG, or WEBP.</p>

        {/* Preview Gambar */}
        <div className="relative h-55 border border-dashed border-gray-300 rounded-lg bg-gray-50/50 w-full">
          <Image 
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-contain p-2"
          />
        </div>
        </div>
    </Field>
)}
