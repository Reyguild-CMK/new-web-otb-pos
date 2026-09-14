// Global
import { useEffect, useState } from "react";

// Components
import { Combobox, ComboboxInput, ComboboxEmpty, ComboboxList, ComboboxItem, ComboboxContent } from "@/components/ui/combobox";
import { RequiredDot } from "@/components/ui/required-dot";

// Components - label & field input
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FieldGroup, FieldSeparator, Field, FieldLabel } from "@/components/ui/field-application";
import { UploadSection } from "../../_components/upload-section";
import { CurrencyInput } from "@/components/ui/currency-input";

// Data dummy
import { manualConditionType } from "../_data/other-data";
import { pgfineness } from "../_data/other-data";
import { fetchJawsReference, JawsMasterItem } from "@/app/(protected)/_data/jaws-dummy";

export function PGModalManual() {
  const [invoiceVal, setInvoiceVal] = useState("");
  const [appraisal, setAppraisal] = useState("");
  const [maxLoan, setMaxLoan] = useState("");

  const [productItems, setProductItems] = useState<JawsMasterItem[]>([]);
  const [productLevel, setProductLevel] = useState<JawsMasterItem[]>([]);
  const [targetAge, setTargetAge] = useState<JawsMasterItem[]>([]);
  const [goldModel, setGoldModel] = useState<JawsMasterItem[]>([]);
  const [frameColor, setFrameColor] = useState<JawsMasterItem[]>([]);

  const [selectedProductItem, setSelectedProductItem] = useState<string | null>(null);
  const [selectedProductLevel, setSelectedProductLevel] = useState<string | null>(null);
  const [selectedTargetAge, setSelectedTargetAge] = useState<string | null>(null);
  const [selectedGoldModel, setSelectedGoldModel] = useState<string | null>(null);
  const [selectedFrameColor, setSelectedFrameColor] = useState<string | null>(null);
  const [selectedFineness, setSelectedFineness] = useState<string | null>(null);
  const [selectedCondition, setSelectedCondition] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
      async function loadPawnManualJAWS() {
        setIsLoading(true);
        const [
          resProductItems,
          resProductLevel,
          resTargetAge,
          resGoldModel,
          resFrameColor,
        ] = await Promise.all([
          fetchJawsReference('ProductItem'),
          fetchJawsReference('ProductLevel'),
          fetchJawsReference('TargetAge'),
          fetchJawsReference('GoldModel'),
          fetchJawsReference('FrameColor'),
        ]);
  
        setProductItems(resProductItems);
        setProductLevel(resProductLevel);
        setTargetAge(resTargetAge);
        setGoldModel(resGoldModel);
        setFrameColor(resFrameColor);
  
        setIsLoading(false);
      }
      loadPawnManualJAWS();
    }, []);

  return (
    <>
      {/* Input item PLU & name */}
      <FieldGroup>
        {/* 1. PLU */}
        <Field>
          <FieldLabel htmlFor="itemPlu">PLU Code</FieldLabel>
          <Input id="itemPlu" name="itemPlu" required></Input>
        </Field>
        {/* 2. Item Name */}
        <Field>
          <FieldLabel htmlFor="itemName">Item Name</FieldLabel>
          <Input id="itemName" name="itemName"></Input>
        </Field>
      </FieldGroup>

      <FieldSeparator className="my-2" />

      {/* Detail Item & Value*/}
      <div className="md:flex gap-6">
        <FieldGroup>
          {/* 3. Product Level */}
          <Field>
            <FieldLabel htmlFor="manualProductLevel">Product Level</FieldLabel>
            <Combobox name="manualProductLevel" value={selectedProductLevel} onValueChange={setSelectedProductLevel} items={productLevel}>
              <ComboboxInput placeholder="Choose Product Level"></ComboboxInput>
              <ComboboxContent>
                {isLoading ? <span className="block p-2 text-sm text-muted-foreground text-center">Memuat data...</span> : (
                  <>
                    <ComboboxEmpty>No product level found.</ComboboxEmpty>
                    <ComboboxList>
                      {(item: any) => (
                        <ComboboxItem key={item.id} value={item.nama}>
                          {item.nama}
                        </ComboboxItem>
                      )}
                    </ComboboxList>
                  </>
                )}
              </ComboboxContent>
            </Combobox>
          </Field>
          {/* 4. Product Item */}
          <Field>
            <FieldLabel htmlFor="manualProductItem">Product Item</FieldLabel>
            <Combobox name="manualProductItem" value={selectedProductItem} onValueChange={setSelectedProductItem} items={productItems}>
              <ComboboxInput placeholder="Choose Product Item"></ComboboxInput>
              <ComboboxContent>
                {isLoading ? <span className="block p-2 text-sm text-muted-foreground text-center">Memuat data...</span> : (
                  <>
                    <ComboboxEmpty>No product item found.</ComboboxEmpty>
                    <ComboboxList>
                      {(item: any) => (
                        <ComboboxItem key={item.id} value={item.nama}>
                          {item.nama}
                        </ComboboxItem>
                      )}
                    </ComboboxList>
                  </>
                )}
              </ComboboxContent>
            </Combobox>
          </Field>
          {/* 5. Target Age */}
          <Field>
            <FieldLabel htmlFor="manualTargetAge">Target Age</FieldLabel>
            <Combobox name="manualTargetAge" value={selectedTargetAge} onValueChange={setSelectedTargetAge} items={targetAge}>
              <ComboboxInput placeholder="Choose Target Age"></ComboboxInput>
              <ComboboxContent>
                {isLoading ? <span className="block p-2 text-sm text-muted-foreground text-center">Memuat data...</span> : (
                  <>
                    <ComboboxEmpty>No target age found.</ComboboxEmpty>
                    <ComboboxList>
                      {(item: any) => (
                        <ComboboxItem key={item.id} value={item.nama}>
                          {item.nama}
                        </ComboboxItem>
                      )}
                    </ComboboxList>
                  </>
                )}
              </ComboboxContent>
            </Combobox>
          </Field>
          {/* 6. Gold Model */}
          <Field>
            <FieldLabel htmlFor="manualGoldModel">Gold Model</FieldLabel>
            <Combobox name="manualGoldModel" value={selectedGoldModel} onValueChange={setSelectedGoldModel} items={goldModel}>
              <ComboboxInput placeholder="Choose Gold Model"></ComboboxInput>
              <ComboboxContent>
                {isLoading ? <span className="block p-2 text-sm text-muted-foreground text-center">Memuat data...</span> : (
                  <>
                    <ComboboxEmpty>No gold model found.</ComboboxEmpty>
                    <ComboboxList>
                      {(item: any) => (
                        <ComboboxItem key={item.id} value={item.nama}>
                          {item.nama}
                        </ComboboxItem>
                      )}
                    </ComboboxList>
                  </>
                )}
              </ComboboxContent>
            </Combobox>
          </Field>
          {/* 7. Frame Color */}
          <Field>
            <FieldLabel htmlFor="manualFrameColor">Frame Color</FieldLabel>
            <Combobox name="manualFrameColor" value={selectedFrameColor} onValueChange={setSelectedFrameColor} items={frameColor}>
              <ComboboxInput placeholder="Choose Frame Color"></ComboboxInput>
              <ComboboxContent>
                {isLoading ? <span className="block p-2 text-sm text-muted-foreground text-center">Memuat data...</span> : (
                  <>
                    <ComboboxEmpty>No frame color found.</ComboboxEmpty>
                    <ComboboxList>
                      {(item: any) => (
                        <ComboboxItem key={item.id} value={item.nama}>
                          {item.nama}
                        </ComboboxItem>
                      )}
                    </ComboboxList>
                  </>
                )}
              </ComboboxContent>
            </Combobox>
          </Field>
          {/* 8. No Certificate */}
          <Field>
            <FieldLabel htmlFor="manualNoCertificate">No Certificate</FieldLabel>
            <Input type="text" id="manualNoCertificate" name="manualNoCertificate" placeholder="Certificate Number"/>
          </Field>

          <FieldSeparator/>
          {/* 9. Weight */}
          <Field>
            <FieldLabel htmlFor="manualWeight">Weight</FieldLabel>
            <Input
              id="manualWeight"
              name="manualWeight"
              type="number"
              placeholder="0"
              onWheel={(e) => e.currentTarget.blur()}>
            </Input>
          </Field>
          {/* 10. Fineness (%) */}
          <Field>
            <FieldLabel htmlFor="itemFineness">Fineness</FieldLabel>
            <Combobox name="manualFineness" value={selectedFineness} onValueChange={setSelectedFineness} items={pgfineness} defaultInputValue={pgfineness[0]}>
              <ComboboxInput placeholder="Choose Fineness"></ComboboxInput>
              <ComboboxContent>
                {isLoading ? <span className="block p-2 text-sm text-muted-foreground text-center">Memuat data...</span> : (
                  <>
                    <ComboboxEmpty>No fineness found.</ComboboxEmpty>
                    <ComboboxList>
                      {(item: any) => (
                        <ComboboxItem key={item} value={item}>
                          {item}
                        </ComboboxItem>
                      )}
                    </ComboboxList>
                  </>
                )}
              </ComboboxContent>
            </Combobox>
            {/* <Input
              id="manualFineness"
              name="manualFineness"
              type="number"
              placeholder="0"
              onWheel={(e) => e.currentTarget.blur()}>
            </Input> */}
          </Field>
          {/* 11. Invoice Value */}
          <Field>
            <FieldLabel htmlFor="manualinvoiceVal">Invoice Value</FieldLabel>
            <CurrencyInput
              id="manualinvoiceVal"
              name="manualinvoiceVal"
              value={invoiceVal}
              onValueChange={setInvoiceVal}
              placeholder="0"
            />
          </Field>
          {/* 12. Appraisal */}
          <Field>
            <FieldLabel htmlFor="manualAppraisal">Appraisal</FieldLabel>
            <CurrencyInput
              id="manualAppraisal"
              name="manualAppraisal"
              value={appraisal}
              onValueChange={setAppraisal}
              placeholder="0"
            />
          </Field>
          {/* 13. Condition */}
          <Field>
            <FieldLabel htmlFor="itemType">Condition</FieldLabel>
            <Combobox name="manualCondition" value={selectedCondition} onValueChange={setSelectedCondition} items={manualConditionType}>
              <ComboboxInput placeholder="Choose Condition" />
              <ComboboxContent>
                <ComboboxList>
                  {(item: any) => (
                    <ComboboxItem key={item.id} value={item.value}>
                      {item.value}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
          </Field>

          <FieldSeparator/>

          {/* 14. Max Loan */}
          <Field>
            <FieldLabel htmlFor="maxLoan">Max Loan</FieldLabel>
            <CurrencyInput
              id="maxLoan"
              name="maxLoan"
              value={maxLoan}
              onValueChange={setMaxLoan}
              disabled
              placeholder="0"
            />
          </Field>
          {/* 15. Remark */}
          <Field className="items-baseline">
            <FieldLabel htmlFor="remark">Remark<RequiredDot/></FieldLabel>
            <Textarea id="remark" name="remark" placeholder="Remark" className="lg:min-h-25 min-h-20.5" required></Textarea>
          </Field>
        </FieldGroup>

        <FieldSeparator />
        
        {/* Product & Invoice Photo */}
        <UploadSection/>
      </div>
    </>
  )
}