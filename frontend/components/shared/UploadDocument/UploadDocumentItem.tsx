import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

interface UploadDocumentItemProps {
  title: string
  required?: boolean
  existingFile?: string | null
  onUpload: (file: File) => void
}

export default function UploadDocumentItem({
  title,
  required = false,
  existingFile,
  onUpload,
}: UploadDocumentItemProps) {
  const [file, setFile] =
    useState<File | null>(null)

  const [preview, setPreview] =
    useState<string | null>(null)

  useEffect(() => {
    if (!file) {
      setPreview(null)
      return
    }

    const objectUrl =
      URL.createObjectURL(file)

    setPreview(objectUrl)

    return () => {
      URL.revokeObjectURL(objectUrl)
    }
  }, [file])

  const handleUpload = () => {
    if (!file) return

    onUpload(file)
  }

  return (
    <div className="grid gap-4 rounded-lg border p-4 md:grid-cols-[180px_1fr]">
      <div>
        <Label className="font-medium">
          {title}
          {required && (
            <span className="ml-1 text-destructive">
              *
            </span>
          )}
        </Label>
      </div>

      <div className="space-y-4">
        <Input
          type="file"
          accept="image/*"
          onChange={(event) => {
            const selectedFile =
              event.target.files?.[0] ??
              null

            setFile(selectedFile)
          }}
        />

        {existingFile && !preview && (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">
              Existing document
            </p>

            <a
              href={existingFile}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <img
                src={existingFile}
                alt={`${title} existing`}
                className="h-40 w-40 rounded-md border object-cover p-1"
              />
            </a>
          </div>
        )}

        {preview && (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">
              New document preview
            </p>

            <img
              src={preview}
              alt={`${title} preview`}
              className="h-40 w-40 rounded-md border object-cover p-1"
            />
          </div>
        )}

        {file && (
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">
              {file.name}
            </p>

            <Button
              type="button"
              onClick={handleUpload}
            >
              Upload
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}