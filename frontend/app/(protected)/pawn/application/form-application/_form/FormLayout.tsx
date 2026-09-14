// Global
import { useState } from "react";

// Components
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsTrigger, TabsList, TabsContent } from "@/components/ui/tabs";

// Icon
import { Plus } from "lucide-react";

// Data
import { item_type } from "@/app/(protected)/_data/item_type";
import { form_type } from "@/app/(protected)/_data/form_type";

// Components - label & field input
import { Field, FieldLabel, FieldSeparator } from "@/components/ui/field-application";
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "@/components/ui/combobox";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const store_brand = [
  { 
    id: 1,
    name: "FRANK & CO",
  },
  { 
    id: 2,
    name: "MONDIAL",
  },
  { 
    id: 4,
    name: "THE PALACE",
  }
]

export function ModalLayout() {
  // State
  const [inputMode, setInputMode] = useState<"normal" | "manual">("normal");
  const [selectedItemType, setSelectedItemType] = useState<string | null>(null);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const filteredItemType = item_type.filter((item) =>
  inputMode === "normal"
    ? !item.type.startsWith("cmk_manual")
    : item.type.startsWith("cmk_manual")
);

  const selectedItem = item_type.find(
    (item) => item.text === selectedItemType
  );

  const itemCategory =
    selectedItem?.type.includes("_dj")
      ? "DJ"
      : selectedItem?.type.includes("_pg")
        ? "PG"
        : null;

const FormComponent =
  itemCategory
    ? form_type[inputMode][itemCategory]
    : null;

  return(
    <Dialog>
      <form>
        <DialogTrigger render={<Button className="bg-btn-primary-bg text-btn-primary-text flex" />}>
          <Plus /><span className="text-xs">Add Item</span>
        </DialogTrigger>

        {/* Isi Konten */}
        <DialogContent className="max-h-[85vh] overflow-y-auto fixed">
          <DialogHeader>
            <DialogTitle>Form Item</DialogTitle>
          </DialogHeader>

          <Tabs
            value={inputMode}
            onValueChange={(value) => {
              setInputMode(value as "normal" | "manual");
              setSelectedItemType(null);
            }}
          >
            <Field>
              <Label>Input Mode</Label>
              <TabsList>
                <TabsTrigger value="normal">Normal</TabsTrigger>
                <TabsTrigger value="manual">Manual</TabsTrigger>
              </TabsList>
            </Field>

            {/* Combobox Item Type */}
            <Field>
              <FieldLabel>Item Type</FieldLabel>
              <Combobox items={filteredItemType} value={selectedItemType} onValueChange={setSelectedItemType}>
                <ComboboxInput placeholder="Item Type" />
                <ComboboxContent>
                  <ComboboxEmpty>
                    No items found.
                  </ComboboxEmpty>

                  <ComboboxList>
                    {(item: any) => (
                      <ComboboxItem key={item.id} value={item.text}>
                        {item.text}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            </Field>

            {/* Brand */}
            <Field>
              <FieldLabel>Brand</FieldLabel>
              <Combobox items={store_brand} value={selectedBrand} onValueChange={setSelectedBrand}>
                <ComboboxInput placeholder="Select Brand" />
                <ComboboxContent>
                  <ComboboxEmpty>
                    No brands found.
                  </ComboboxEmpty>

                  <ComboboxList>
                    {(item: any) => (
                      <ComboboxItem key={item.id} value={item.name}>
                        {item.name}
                      </ComboboxItem>
                    )}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
            </Field>

            <FieldSeparator/>

            {/* Menampilkan form sesuai pilihan */}
            {FormComponent && <FormComponent />}

          </Tabs>

          {/* Footer */}
          <DialogFooter className="flex-col justify-between sm:flex-row gap-4">
            <div className="flex flex-row gap-2 items-center">
              <Checkbox id="toggle-checkbox" name="toggle-checkbox" required />
              <FieldLabel htmlFor="toggle-checkbox">Saya telah memastikan bahwa harga sudah sesuai!</FieldLabel>
            </div>
            <div className="flex flex-row gap-2">
              <Button className="bg-btn-primary-bg text-btn-primary-text">Add</Button>
              <Button variant="outline" render={<DialogClose/>}>Close</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}