// Global
import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";

// Data & Fetching Function
import { fetchJawsReference, JawsMasterItem } from "@/app/(protected)/_data/jaws-dummy";

// Components - label & field input
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "@/components/ui/combobox";
import { Field, FieldGroup, FieldLabel, FieldContent } from "@/components/ui/field-application";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@/components/ui/input-group";
import { RequiredDot } from "@/components/ui/required-dot";

export function DJProductChar() {
  const { register, setValue, watch, formState: { errors } } = useFormContext();
  const [productItems, setProductItems] = useState<JawsMasterItem[]>([]);
  const [categories, setCategories] = useState<JawsMasterItem[]>([]);
  const [productLevel, setProductLevel] = useState<JawsMasterItem[]>([]);
  const [stoneDist, setStoneDist] = useState<JawsMasterItem[]>([]);
  const [frameMaterial, setFrameMaterial] = useState<JawsMasterItem[]>([]);
  const [frameFinishing, setFrameFinishing] = useState<JawsMasterItem[]>([]);
  const [frameColor, setFrameColor] = useState<JawsMasterItem[]>([]);
  const [processCons, setProcessCons] = useState<JawsMasterItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Use watch to keep track of values for Combobox
  const manualProductItem = watch("manualProductItem");
  const manualProductCategory = watch("manualProductCategory");
  const manualProductLevel = watch("manualProductLevel");
  const manualStoneDist = watch("manualStoneDist");
  const manualFrameMaterial = watch("manualFrameMaterial");
  const manualFrameFinishing = watch("manualFrameFinishing");
  const manualFrameColor = watch("manualFrameColor");
  const manualConstructionProcess = watch("manualConstructionProcess");

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
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="manualPlu">PLU<RequiredDot /></FieldLabel>
          <FieldContent>
            <Input type="text" id="manualPlu" {...register("manualPlu")} />
            {errors.manualPlu && <p className="text-red-500 text-xs mt-1">{String(errors.manualPlu.message)}</p>}
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="manualProductItem">Product Item<RequiredDot /></FieldLabel>
          <FieldContent>
            <Combobox name="manualProductItem" value={manualProductItem || null} onValueChange={(val) => { setValue("manualProductItem", val, { shouldValidate: !!val }); }} items={productItems}>
              <ComboboxInput placeholder="Choose Product Item"></ComboboxInput>
              <ComboboxContent>
                {isLoading ? <span className="block p-2 text-sm text-muted-foreground text-center">Memuat data...</span> : (
                  <>
                    <ComboboxEmpty>No product item found.</ComboboxEmpty>
                    <ComboboxList>
                      {(item: any) => (
                        <ComboboxItem key={item.id} value={item.nama}>{item.nama}</ComboboxItem>
                      )}
                    </ComboboxList>
                  </>
                )}
              </ComboboxContent>
            </Combobox>
            {errors.manualProductItem && <p className="text-red-500 text-xs mt-1">{String(errors.manualProductItem.message)}</p>}
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="manualProductCategory">Product Category<RequiredDot /></FieldLabel>
          <FieldContent>
            <Combobox name="manualProductCategory" value={manualProductCategory || null} onValueChange={(val) => { setValue("manualProductCategory", val, { shouldValidate: !!val }); }} items={categories}>
              <ComboboxInput placeholder="Choose Product Category"></ComboboxInput>
              <ComboboxContent>
                {isLoading ? <span className="block p-2 text-sm text-muted-foreground text-center">Memuat data...</span> : (
                  <>
                    <ComboboxEmpty>No product category found.</ComboboxEmpty>
                    <ComboboxList>
                      {(item: any) => (
                        <ComboboxItem key={item.id} value={item.nama}>{item.nama}</ComboboxItem>
                      )}
                    </ComboboxList>
                  </>
                )}
              </ComboboxContent>
            </Combobox>
            {errors.manualProductCategory && <p className="text-red-500 text-xs mt-1">{String(errors.manualProductCategory.message)}</p>}
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="manualProductLevel">Product Level<RequiredDot /></FieldLabel>
          <FieldContent>
            <Combobox name="manualProductLevel" value={manualProductLevel || null} onValueChange={(val) => { setValue("manualProductLevel", val, { shouldValidate: !!val }); }} items={productLevel}>
              <ComboboxInput placeholder="Choose Product Level"></ComboboxInput>
              <ComboboxContent>
                {isLoading ? <span className="block p-2 text-sm text-muted-foreground text-center">Memuat data...</span> : (
                  <>
                    <ComboboxEmpty>No product level found.</ComboboxEmpty>
                    <ComboboxList>
                      {(item: any) => (
                        <ComboboxItem key={item.id} value={item.nama}>{item.nama}</ComboboxItem>
                      )}
                    </ComboboxList>
                  </>
                )}
              </ComboboxContent>
            </Combobox>
            {errors.manualProductLevel && <p className="text-red-500 text-xs mt-1">{String(errors.manualProductLevel.message)}</p>}
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="manualStoneDist">Stone Distribution<RequiredDot /></FieldLabel>
          <FieldContent>
            <Combobox name="manualStoneDist" value={manualStoneDist || null} onValueChange={(val) => { setValue("manualStoneDist", val, { shouldValidate: !!val }); }} items={stoneDist}>
              <ComboboxInput placeholder="Choose Stone Distribution"></ComboboxInput>
              <ComboboxContent>
                {isLoading ? <span className="block p-2 text-sm text-muted-foreground text-center">Memuat data...</span> : (
                  <>
                    <ComboboxEmpty>No stone distribution found.</ComboboxEmpty>
                    <ComboboxList>
                      {(item: any) => (
                        <ComboboxItem key={item.id} value={item.nama}>{item.nama}</ComboboxItem>
                      )}
                    </ComboboxList>
                  </>
                )}
              </ComboboxContent>
            </Combobox>
            {errors.manualStoneDist && <p className="text-red-500 text-xs mt-1">{String(errors.manualStoneDist.message)}</p>}
          </FieldContent>
        </Field>
      </FieldGroup>

      <FieldGroup className="mt-4 md:mt-0">
        <Field className="items-baseline">
          <FieldLabel htmlFor="manualGrossWeight">
            Gross Weight<span className="text-red-500">*</span>
          </FieldLabel>
          <div className="flex flex-col gap-1 w-full">
            <InputGroup>
              <InputGroupInput id="manualGrossWeight" step="0.001" placeholder="e.g. 3.33" {...register("manualGrossWeight")} />
              <InputGroupAddon align="inline-end">
                <InputGroupText>Gram</InputGroupText>
              </InputGroupAddon>
            </InputGroup>
            {errors.manualGrossWeight && <p className="text-red-500 text-xs">{String(errors.manualGrossWeight.message)}</p>}
          </div>
        </Field>

        <Field>
          <FieldLabel htmlFor="manualFrameMaterial">Frame Material<RequiredDot /></FieldLabel>
          <FieldContent>
            <Combobox name="manualFrameMaterial" value={manualFrameMaterial || null} onValueChange={(val) => { setValue("manualFrameMaterial", val, { shouldValidate: !!val }); }} items={frameMaterial}>
              <ComboboxInput placeholder="Choose Frame Material"></ComboboxInput>
              <ComboboxContent>
                {isLoading ? <span className="block p-2 text-sm text-muted-foreground text-center">Memuat data...</span> : (
                  <>
                    <ComboboxEmpty>No frame material found.</ComboboxEmpty>
                    <ComboboxList>
                      {(item: any) => (
                        <ComboboxItem key={item.id} value={item.nama}>{item.nama}</ComboboxItem>
                      )}
                    </ComboboxList>
                  </>
                )}
              </ComboboxContent>
            </Combobox>
            {errors.manualFrameMaterial && <p className="text-red-500 text-xs mt-1">{String(errors.manualFrameMaterial.message)}</p>}
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="manualFrameFinishing">Frame Finishing<RequiredDot /></FieldLabel>
          <FieldContent>
            <Combobox name="manualFrameFinishing" value={manualFrameFinishing || null} onValueChange={(val) => { setValue("manualFrameFinishing", val, { shouldValidate: !!val }); }} items={frameFinishing}>
              <ComboboxInput placeholder="Choose Frame Finishing"></ComboboxInput>
              <ComboboxContent>
                {isLoading ? <span className="block p-2 text-sm text-muted-foreground text-center">Memuat data...</span> : (
                  <>
                    <ComboboxEmpty>No frame finishing found.</ComboboxEmpty>
                    <ComboboxList>
                      {(item: any) => (
                        <ComboboxItem key={item.id} value={item.nama}>{item.nama}</ComboboxItem>
                      )}
                    </ComboboxList>
                  </>
                )}
              </ComboboxContent>
            </Combobox>
            {errors.manualFrameFinishing && <p className="text-red-500 text-xs mt-1">{String(errors.manualFrameFinishing.message)}</p>}
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="manualFrameColor">Frame Color<RequiredDot /></FieldLabel>
          <FieldContent>
            <Combobox name="manualFrameColor" value={manualFrameColor || null} onValueChange={(val) => { setValue("manualFrameColor", val, { shouldValidate: !!val }); }} items={frameColor}>
              <ComboboxInput placeholder="Choose Frame Color"></ComboboxInput>
              <ComboboxContent>
                {isLoading ? <span className="block p-2 text-sm text-muted-foreground text-center">Memuat data...</span> : (
                  <>
                    <ComboboxEmpty>No frame color found.</ComboboxEmpty>
                    <ComboboxList>
                      {(item: any) => (
                        <ComboboxItem key={item.id} value={item.nama}>{item.nama}</ComboboxItem>
                      )}
                    </ComboboxList>
                  </>
                )}
              </ComboboxContent>
            </Combobox>
            {errors.manualFrameColor && <p className="text-red-500 text-xs mt-1">{String(errors.manualFrameColor.message)}</p>}
          </FieldContent>
        </Field>

        <Field>
          <FieldLabel htmlFor="manualConstructionProcess">Construction Process<RequiredDot /></FieldLabel>
          <FieldContent>
            <Combobox name="manualConstructionProcess" value={manualConstructionProcess || null} onValueChange={(val) => { setValue("manualConstructionProcess", val, { shouldValidate: !!val }); }} items={processCons}>
              <ComboboxInput placeholder="Choose Construction Process"></ComboboxInput>
              <ComboboxContent>
                {isLoading ? <span className="block p-2 text-sm text-muted-foreground text-center">Memuat data...</span> : (
                  <>
                    <ComboboxEmpty>No construction process found.</ComboboxEmpty>
                    <ComboboxList>
                      {(item: any) => (
                        <ComboboxItem key={item.id} value={item.nama}>{item.nama}</ComboboxItem>
                      )}
                    </ComboboxList>
                  </>
                )}
              </ComboboxContent>
            </Combobox>
            {errors.manualConstructionProcess && <p className="text-red-500 text-xs mt-1">{String(errors.manualConstructionProcess.message)}</p>}
          </FieldContent>
        </Field>
      </FieldGroup>
    </div>
  );
}
