import { Card } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field-application";
import { Input } from "@/components/ui/input";
import { FileIcon } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, ChangeEvent } from "react";

export interface FileFieldProps {
  id: string;
  name: string;
  label: string;
  imageAlt?: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileChange?: (file: File | null) => void;
  error?: string;
  accept?: string;
  fileHint?: string;
}

export default function FileInput({
  id,
  name,
  label,
  imageAlt,
  required = false,
  onChange,
  onFileChange,
  error,
  accept = ".jpg, .jpeg, .png, .pdf",
  fileHint = "*PNG, JPG, JPEG, or PDF.",
}: FileFieldProps) {
  // Input
  const [selectedItem, setSelectedItem] = useState<File | null>(null);
  // Preview
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file){
      setSelectedItem(file); //set file yang dipilih
      const objectUrl = URL.createObjectURL(file); //membuat url sementara
      setPreviewUrl(objectUrl);
    } else {
      setSelectedItem(null);
      setPreviewUrl(null);
    }

    if (onFileChange) onFileChange(file || null);
    if (onChange) onChange(e);
  }

  // previewUrl berubah setiap nilai berubah
  useEffect(()=>{
    return() => {
      if(previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl]);

  // Function untuk buka file saat klik preview
  const handleOpenPreview = () => {
    if(previewUrl){
      window.open(previewUrl, '_blank');
    }
  }

  return(
    <Field orientation="vertical">
      <div className="flex justify-between items-center w-full">
        <FieldLabel htmlFor={id}>
          {label}
        </FieldLabel>
        <p className="text-xs text-alert-error-icon">{fileHint}</p>
      </div>
      
        {/* Input File */}
        <div className="w-full flex-1">
          <Input 
            id={id} 
            name={name} 
            type="file" 
            accept={accept}
            onChange={handleFileChange}
            className="w-full cursor-pointer file:hover:bg-gray-200"
            required={required}
          />
        {/* Preview */}
        <div 
          onClick={handleOpenPreview}
          className="relative lg:h-55 h-25 border border-dashed border-gray-300 rounded-lg bg-gray-50/50 w-full mt-2">
            
          {/* Jika belum ada Unggahan File */}
          {!selectedItem && (
            <Image 
              src="/image/image_placeholder.png"
              alt="Photo Preview"
              fill
              className="object-contain p-2"
            />
          )}

          {selectedItem?.type.startsWith('image/') && previewUrl && (
            <Image 
            src={previewUrl}
            alt={imageAlt || "Photo Preview"}
            fill
            className="object-contain p-2"
            unoptimized
          />
          )}
          {/* Jika PDF */}
          {selectedItem?.type === 'application/pdf' && (
            <div className="flex flex-col justify-center items-center h-full w-full p-2">
              <div className="bg-alert-info-bg p-2 lg:p-3 rounded-md mb-1 lg:mb-2 text-alert-info-icon">
                <FileIcon className="w-6 h-6 lg:w-10 lg:h-10" />
              </div>
              <p className="text-xs lg:text-sm line-clamp-1 lg:line-clamp-2 text-center font-medium px-2">
                {selectedItem.name}
              </p>
              <p className="text-[10px] lg:text-xs text-gray-500 mt-1">
                {(selectedItem.size / 1024 / 1024).toFixed(2)} MB • PDF Document
              </p>
            </div>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-1 w-full">
            <p className="text-red-500 text-xs">{error}</p>
          </div>
        )}
      </div>
    </Field>
)}
