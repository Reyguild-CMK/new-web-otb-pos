// Components - label & field input
import FileInput from "@/components/shared/FileInput/FileInput";
import { FieldGroup } from "@/components/ui/field-application";

// Interface data
import { FileFieldProps } from "@/components/shared/FileInput/FileInput";

// Data File Input Field
const dataInputField: FileFieldProps[] =[
  { 
    id: "formPerjanjian", 
    name:"formPerjanjian", 
    label:"Form Perjanjian", 
    imageAlt:"Form Perjanjian",
    required: true,
  },
  { 
    id: "suratKepemilikanBarang", 
    name:"suratKepemilikanBarang", 
    label:"Surat Kepemilikan Barang", 
    imageAlt:"Surat Kepemilikan Barang",
    required: true,
  },
  { 
    id:"suratSegelBarang",
    name:"suratSegelBarang",
    label:"Surat Segel Barang",
    imageAlt:"Surat Segel Barang",
    required: true,
  },
  { 
    id:"sertifikatInHouse",
    name:"sertifikatInHouse",
    label:"Sertifikat in House",
    imageAlt:"Sertifikat in House",
    required: true,
  },
  { 
    id:"sertifikatGIA",
    name:"sertifikatGIA",
    label:"Sertifikat GIA/Setara",
    imageAlt:"Sertifikat GIA/Setara",
    required: true,
  },
  {
    id:"buyingPrice",
    name:"buyingPrice",
    label:"Buying Price",
    imageAlt:"Buying Price",
    required: true,
  },
  {
    id:"lainnya",
    name:"lainnya",
    label:"Lainnya",
    imageAlt:"Lainnya",
  }
]

export function InputFile(){
  return(
    <FieldGroup className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {dataInputField.map((data) => (
        <FileInput key={data.id}
          id={data.id}
          name={data.name}
          label={data.label}
          imageAlt={data.imageAlt}
          required={data.required}
        />
      ))
      }
    </FieldGroup>
  )
}