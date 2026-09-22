import { Card } from "@/components/ui/card";
import { Field, FieldLabel } from "@/components/ui/field-application";
import { Input } from "@/components/ui/input";
import { FileIcon } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, ChangeEvent } from "react";
import { cn } from "@/lib/utils";

interface PreviewImageProps {
  src: string;
  fileName?: string;
  alt: string;
  className?: string;
}

export default function PreviewImage({
  src,
  fileName,
  alt,
  className,
}: PreviewImageProps) {
  
  // Function untuk buka file saat klik preview
  const handleOpenPreview = () => {
    if(src){
      window.open(src, '_blank');
    }
  }

  const isPdf = src?.toLowerCase().endsWith(".pdf");

  return (
      <div
        onClick={handleOpenPreview}
        className={cn("relative h-20 w-full cursor-pointer", className)}
      >

        {/* Jika file berupa Image */}
        {src && !isPdf && (
          <Image
            src={src}
            alt={alt || "Photo Preview"}
            fill
            className="object-contain"
            unoptimized
          />
        )}

        {/* Jika file berupa PDF */}
        {src && isPdf && (
          <Card className="flex h-full flex-col items-center justify-center p-4 text-center">
            <div className="bg-alert-info-bg p-3 rounded-md mb-3 text-alert-info-icon">
              <FileIcon size={48} />
            </div>

            <p className="text-sm line-clamp-2">
              {fileName || "PDF Document"}
            </p>

            <p className="text-gray-500 mt-1">
              PDF Document
            </p>
          </Card>
        )}
      </div>
  );
}
