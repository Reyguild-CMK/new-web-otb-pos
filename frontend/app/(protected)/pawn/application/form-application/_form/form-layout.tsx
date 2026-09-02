// components
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Dialog, DialogTrigger, DialogTitle, DialogContent, DialogHeader, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

// components - label & field input
import { FieldLabel } from "@/components/ui/field-application";
import { Combobox, ComboboxInput, ComboboxEmpty, ComboboxList, ComboboxItem, ComboboxContent } from "@/components/ui/combobox";
import { Checkbox } from "@/components/ui/checkbox";

// icon
import { Plus } from "lucide-react";

// data dummy
import { itemType } from "../_data/other-data";

// modal auto & manual
import { DJModalAuto } from "./DJAutoForm";
import { DJModalManual } from "./DJManualForm";
import { PGModalAuto } from "./PGAutoForm";
import { PGModalManual } from "./PGManualForm";

import { useState } from "react";


export function ModalLayout() {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  return (
    <Dialog>
      <form>
        {/* Button Add Item */}
        <DialogTrigger render={<Button className="bg-btn-primary-bg text-btn-primary-text flex" />}>
          <Plus /><span className="text-xs">Add Item</span>
        </DialogTrigger>

        {/* Isi content */}
        <DialogContent className="max-h-[85vh] overflow-y-auto fixed">
          <DialogHeader>
            <DialogTitle>Form Item</DialogTitle>
          </DialogHeader>

          {/* Pilih Item Type (DJ atau PG) */}
          <Combobox items={itemType} value={selectedItem} onValueChange={setSelectedItem}>
            <FieldLabel htmlFor="itemType">Item Type</FieldLabel>
            <ComboboxInput placeholder="Item Type">
              <ComboboxContent>
                <ComboboxEmpty>No items found.</ComboboxEmpty>
                <ComboboxList>
                  {(item) => (
                    <ComboboxItem key={item.id} value={item.value}>
                      {item.value}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </ComboboxInput>
          </Combobox>

          <Separator />

          {/*Tabs auto & manual */}
          <Tabs defaultValue="auto">
            <TabsList>
              <TabsTrigger value="auto">Auto</TabsTrigger>
              <TabsTrigger value="manual">Manual</TabsTrigger>
            </TabsList>
            
            {selectedItem === "CMK Diamond Jewelry" && (
              <>
                <TabsContent value="auto"><DJModalAuto /></TabsContent>
                <TabsContent value="manual"><DJModalManual /></TabsContent>
              </>
            )}

            {selectedItem === "CMK Plain Gold" && (
              <>
                <TabsContent value="auto"><PGModalAuto /></TabsContent>
                <TabsContent value="manual"><PGModalManual /></TabsContent>
              </>
            )}
          </Tabs>

          {/* Footer */}
          <DialogFooter className="flex-col justify-between sm:flex-row gap-4">
            <div className="flex flex-row gap-2 items-center">
              <Checkbox id="toggle-checkbox" name="toggle-checkbox" required />
              <FieldLabel htmlFor="toggle-checkbox">Saya telah memastikan bahwa harga sudah sesuai!</FieldLabel>
            </div>
            <div className="flex flex-row gap-2">
              <Button className="bg-btn-primary-bg text-btn-primary-text">Add</Button>
              <Button variant="outline" render={<DialogClose />}>Close</Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}