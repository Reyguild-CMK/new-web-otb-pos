// Global
import { useState, useEffect } from "react";

// Data & Fetching Function
import { fetchJawsReference, JawsMasterItem } from "@/app/(protected)/_data/jaws-dummy";

// Components - label & field input
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "@/components/ui/combobox";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field-application";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/components/ui/input-group";

export function DJProductChar() {
  const [productItems, setProductItems] = useState<JawsMasterItem[]>([]);
  const [categories, setCategories] = useState<JawsMasterItem[]>([]);
  const [productLevel, setProductLevel] = useState<JawsMasterItem[]>([]);
  const [stoneDist, setStoneDist] = useState<JawsMasterItem[]>([]);
  const [frameMaterial, setFrameMaterial] = useState<JawsMasterItem[]>([]);
  const [frameFinishing, setFrameFinishing] = useState<JawsMasterItem[]>([]);
  const [frameColor, setFrameColor] = useState<JawsMasterItem[]>([]);
  const [processCons, setProcessCons] = useState<JawsMasterItem[]>([]);

  // State untuk combobox
  const [selectedProductItem, setSelectedProductItem] = useState<string | null>(null);
  const [selectedProductCategory, setSelectedProductCategory] = useState<string | null>(null);
  const [selectedProductLevel, setSelectedProductLevel] = useState<string | null>(null);
  const [selectedStoneDist, setSelectedStoneDist] = useState<string | null>(null);
  const [selectedFrameMaterial, setSelectedFrameMaterial] = useState<string | null>(null);
  const [selectedFrameFinishing, setSelectedFrameFinishing] = useState<string | null>(null);
  const [selectedFrameColor, setSelectedFrameColor] = useState<string | null>(null);
  const [selectedProcessCons, setSelectedProcessCons] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadPawnManualJAWS() {
      setIsLoading(true);
      const [
        resProductItems,
        resCategories,
        resProductLevel,
        resStoneDist,
        resFrameMaterial,
        resFrameFinishing,
        resFrameColor,
        resProcessCons
      ] = await Promise.all([
        fetchJawsReference('ProductItem'),
        fetchJawsReference('ProductCategory'),
        fetchJawsReference('ProductLevel'),
        fetchJawsReference('StoneDist'),
        fetchJawsReference('FrameMaterial'),
        fetchJawsReference('FrameFinishing'),
        fetchJawsReference('FrameColor'),
        fetchJawsReference('ProcessCons')
      ]);

      setProductItems(resProductItems);
      setCategories(resCategories);
      setProductLevel(resProductLevel);
      setStoneDist(resStoneDist);
      setFrameMaterial(resFrameMaterial);
      setFrameFinishing(resFrameFinishing);
      setFrameColor(resFrameColor);
      setProcessCons(resProcessCons);

      setIsLoading(false);
    }
    loadPawnManualJAWS();
  }, []);

  return (
    <div className="md:flex gap-6">
      {/* Kolom Kiri */}
      <FieldGroup>
        {/* 1. PLU */}
        <Field>
          <FieldLabel htmlFor="manualPlu">PLU</FieldLabel>
          <Input type="text" id="manualPlu" name="manualPlu" />
        </Field>

        {/* 2. Product Item */}
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

        {/* 3. Product Category */}
        <Field>
          <FieldLabel htmlFor="manualProductCategory">Product Category</FieldLabel>
          <Combobox name="manualProductCategory" value={selectedProductCategory} onValueChange={setSelectedProductCategory} items={categories}>
            <ComboboxInput placeholder="Choose Product Category"></ComboboxInput>
            <ComboboxContent>
              {isLoading ? <span className="block p-2 text-sm text-muted-foreground text-center">Memuat data...</span> : (
                <>
                  <ComboboxEmpty>No product category found.</ComboboxEmpty>
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

        {/* 4. Product Level */}
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

        {/* 5. Stone Distribution */}
        <Field>
          <FieldLabel htmlFor="manualStoneDist">Stone Distribution</FieldLabel>
          <Combobox name="manualStoneDist" value={selectedStoneDist} onValueChange={setSelectedStoneDist} items={stoneDist}>
            <ComboboxInput placeholder="Choose Stone Distribution"></ComboboxInput>
            <ComboboxContent>
              {isLoading ? <span className="block p-2 text-sm text-muted-foreground text-center">Memuat data...</span> : (
                <>
                  <ComboboxEmpty>No stone distribution found.</ComboboxEmpty>
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
      </FieldGroup>


      {/* Kolom Kanan */}
      <FieldGroup className="mt-4 md:mt-0">
        {/* 1. Gross Weight */}
        <Field>
          <FieldLabel htmlFor="manualGrossWeight">
            Gross Weight
          </FieldLabel>
          <InputGroup>
            <InputGroupInput type="number" id="manualGrossWeight" name="manualGrossWeight" step="0.001" placeholder="e.g. 3.33" />
            <InputGroupAddon align="inline-end">
              <InputGroupText>Gram</InputGroupText>
            </InputGroupAddon>
          </InputGroup>
        </Field>

        {/* 2. Frame Material */}
        <Field>
          <FieldLabel htmlFor="manualFrameMaterial">Frame Material</FieldLabel>
          <Combobox name="manualFrameMaterial" value={selectedFrameMaterial} onValueChange={setSelectedFrameMaterial} items={frameMaterial}>
            <ComboboxInput placeholder="Choose Frame Material"></ComboboxInput>
            <ComboboxContent>
              {isLoading ? <span className="block p-2 text-sm text-muted-foreground text-center">Memuat data...</span> : (
                <>
                  <ComboboxEmpty>No frame material found.</ComboboxEmpty>
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

        {/* 3. Frame Finishing */}
        <Field>
          <FieldLabel htmlFor="manualFrameFinishing">Frame Finishing</FieldLabel>
          <Combobox name="manualFrameFinishing" value={selectedFrameFinishing} onValueChange={setSelectedFrameFinishing} items={frameFinishing}>
            <ComboboxInput placeholder="Choose Frame Finishing"></ComboboxInput>
            <ComboboxContent>
              {isLoading ? <span className="block p-2 text-sm text-muted-foreground text-center">Memuat data...</span> : (
                <>
                  <ComboboxEmpty>No frame finishing found.</ComboboxEmpty>
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

        {/* 4. Frame Color */}
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

        {/* 5. Construction Process */}
        <Field>
          <FieldLabel htmlFor="manualConstructionProcess">Construction Process</FieldLabel>
          <Combobox name="manualConstructionProcess" value={selectedProcessCons} onValueChange={setSelectedProcessCons} items={processCons}>
            <ComboboxInput placeholder="Choose Construction Process"></ComboboxInput>
            <ComboboxContent>
              {isLoading ? <span className="block p-2 text-sm text-muted-foreground text-center">Memuat data...</span> : (
                <>
                  <ComboboxEmpty>No construction process found.</ComboboxEmpty>
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
      </FieldGroup>

    </div>
  );
}
