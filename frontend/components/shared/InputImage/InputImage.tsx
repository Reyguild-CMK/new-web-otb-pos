import { Card } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field-application";
import { Input } from "@/components/ui/input";
import { FileIcon } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, ChangeEvent } from "react";

interface PhotoFieldProps {
  id: string;
  name: string;
  label: string;
  imageAlt?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputImage({
  id,
  name,
  label,
  imageAlt,
}: PhotoFieldProps) {
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
      <FieldLabel htmlFor={id}>
        {label}
      </FieldLabel>
      
        {/* Input File */}
        <div className="w-full flex-1">
          <Input 
            id={id} 
            name={name} 
            type="file" 
            accept=".jpg, .jpeg, .png, .pdf"
            onChange={handleFileChange}
            className="w-full cursor-pointer file:hover:bg-gray-200"
          />
          <p className="text-xs text-alert-error-icon text-right">*PNG, JPG, JPEG, or PDF.</p>

        {/* Preview */}
        <div 
          onClick={handleOpenPreview}
          className="relative h-55 border border-dashed border-gray-300 rounded-lg bg-gray-50/50 w-full">
            
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
            <Card className="flex items-center p-4 text-center py-12">
              <div className="bg-alert-info-bg p-3 rounded-md mb-3 text-alert-info-icon">
                <FileIcon size={48} />
              </div>
              <p className="text-sm! line-clamp-2">
                {selectedItem.name}
              </p>
              <p className="text-gray-500 mt-1">
                {(selectedItem.size / 1024 / 1024).toFixed(2)} MB • PDF Document
              </p>
            </Card>
          )}
        </div>
      </div>
    </Field>
)}
