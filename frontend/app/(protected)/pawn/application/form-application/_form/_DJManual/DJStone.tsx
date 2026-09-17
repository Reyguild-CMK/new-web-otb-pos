// Global
import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Trash2 } from "lucide-react";

// Style Card
import { style_card } from "@/components/shared/Stepper/Stepper";

// Data & Fetching Function
import { stone_type_options, stone_shape_options, stone_size_options, stone_color_options, stone_clarity_options } from "@/app/(protected)/_data/data-stone-parcel";
import { calculateCaratPerButir, calculateTotalStones } from "@/lib/math-formulas";

// Components - label & field input
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field-application";
import { RequiredDot } from "@/components/ui/required-dot";
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "@/components/ui/combobox";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableFooter } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface AddedStone {
  id: string;
  stoneDesc: string;
  stoneType: string;
  p: string;
  l: string;
  t: string;
  caratPerButir: string;
  totalButir: string;
  totalCarat: string;
}

export function DJStone() {
  const { setValue, watch, formState: { errors } } = useFormContext();
  const [selectedStoneValue, setSelectedStoneValue] = useState<string | null>(null);
  const [filters, setFilters] = useState<Record<string, string | null>>({});

  const [isChecking, setIsChecking] = useState(false);
  const [isNoData, setIsNoData] = useState(false);
  
  const addedStones: AddedStone[] = watch("manualAddedStones") || [];

  const fields = ["shape", "size", "color", "clarity"];
  
  const hasExtraFields = selectedStoneValue === "1B" || selectedStoneValue === "5";
  if (hasExtraFields) {
      fields.push("cutting", "brand", "category");
  }

  const isComplete = selectedStoneValue && fields.every(f => filters[f]);

  useEffect(() => {
    async function doCheckCombination() {
      if (!isComplete || !selectedStoneValue) {
        setIsNoData(false);
        return;
      }
      setIsChecking(true);
      await new Promise(r => setTimeout(r, 600));
      setIsNoData(false); 
      setIsChecking(false);
    }
    doCheckCombination();
  }, [isComplete, selectedStoneValue, filters]);

  const handleStoneSelect = (val: string) => {
    setSelectedStoneValue(val);
    setFilters({});
  };

  const handleFilterChange = (field: string, val: string | null) => {
    setFilters(prev => ({ ...prev, [field]: val }));
  };

  const handleAddStone = () => {
    if (!selectedStoneValue) return;

    const details = fields.map(f => filters[f]).filter(Boolean).join(" | ");
    
    const newStones = [
      ...addedStones,
      {
        id: Math.random().toString(),
        stoneDesc: details,
        stoneType: selectedStoneValue,
        p: "",
        l: "",
        t: "",
        caratPerButir: "",
        totalButir: "",
        totalCarat: ""
      }
    ];
    setValue("manualAddedStones", newStones);
  };

  const handleUpdateStone = (id: string, field: keyof AddedStone, value: string) => {
    const newStones = addedStones.map(stone => {
      if (stone.id !== id) return stone;
      
      const updated = { ...stone, [field]: value };
      
      // Auto calculate caratPerButir
      if (field === "totalButir" || field === "totalCarat") {
         const tb = parseFloat(updated.totalButir) || 0;
         const tc = parseFloat(updated.totalCarat) || 0;
         if (tb > 0 && tc > 0 && !stone.caratPerButir) {
             updated.caratPerButir = calculateCaratPerButir(tc, tb);
         }
      }
      return updated;
    });
    setValue("manualAddedStones", newStones);
  };

  const handleRemoveStone = (id: string) => {
    const newStones = addedStones.filter(s => s.id !== id);
    setValue("manualAddedStones", newStones);
  };

  const { grandTotalButir, grandTotalCaratFormatted } = calculateTotalStones(addedStones as any[]);

  const getOptions = (field: string) => {
    switch (field) {
        case "shape": return stone_shape_options;
        case "size": return stone_size_options;
        case "color": return stone_color_options;
        case "clarity": return stone_clarity_options;
        default: return [{value: "default", label: "Default"}];
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div className={`${style_card} w-full flex flex-col gap-8`}>
        <FieldGroup>
          <h2 className="text-lg font-semibold">Tipe Stone</h2>
          <div className="grid grid-flow-col gap-x-4 gap-y-3"
            style={{ gridTemplateRows: `repeat(${Math.ceil(stone_type_options.length / 2)}, minmax(0, auto))` }}
          >
            {stone_type_options.map((item) => (
              <div className="flex gap-2 items-center" key={item.value}>
                <input
                  type="radio"
                  name="stoneType"
                  id={`stone-${item.value}`}
                  value={item.value}
                  onChange={() => handleStoneSelect(item.value)}
                  checked={selectedStoneValue === item.value}
                  className="w-4 h-4 cursor-pointer text-primary focus:ring-primary border-gray-300"
                />
                <FieldLabel htmlFor={`stone-${item.value}`} className="cursor-pointer font-medium">
                  {item.label}
                </FieldLabel>
              </div>
            ))}
          </div>
        </FieldGroup>

        {selectedStoneValue && (
          <FieldGroup>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fields.map((configField: string) => {
                const options = getOptions(configField);

                return (
                  <Field key={configField}>
                    <FieldLabel className="capitalize">{configField}<RequiredDot /></FieldLabel>
                    <Combobox
                      name={`stone-${configField}`}
                      value={filters[configField] || null}
                      onValueChange={(val) => handleFilterChange(configField, val)}
                      items={options.map(o => ({id: o.value, nama: o.label}))}
                    >
                      <ComboboxInput placeholder={`Choose ${configField}`} />
                      <ComboboxContent>
                        <ComboboxEmpty>No option found.</ComboboxEmpty>
                        <ComboboxList>
                          {(optionItem: any) => (
                            <ComboboxItem key={optionItem.id} value={optionItem.nama}>
                              {optionItem.nama}
                            </ComboboxItem>
                          )}
                        </ComboboxList>
                      </ComboboxContent>
                    </Combobox>
                  </Field>
                );
              })}
            </div>
          </FieldGroup>
        )}

        {selectedStoneValue && (
          <FieldGroup>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-20">No</TableHead>
                  <TableHead>Stone</TableHead>
                  <TableHead className="w-25"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {!isComplete ? (
                  <TableRow>
                    <TableCell colSpan={3} className="py-8 text-center text-muted-foreground italic">
                      Please select all parcel option first
                    </TableCell>
                  </TableRow>
                ) : isChecking ? (
                  <TableRow>
                    <TableCell colSpan={3} className="py-8 text-center text-muted-foreground italic">
                      Memeriksa kombinasi...
                    </TableCell>
                  </TableRow>
                ) : isNoData ? (
                  <TableRow>
                    <TableCell colSpan={3} className="py-8 text-center text-muted-foreground italic">
                      No Data
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow>
                    <TableCell>1</TableCell>
                    <TableCell>
                      {fields.map(f => filters[f]).filter(Boolean).join(" | ")}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button type="button" onClick={handleAddStone} size="sm" className="bg-btn-action-bg text-btn-action-text">
                        Add
                      </Button>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </FieldGroup>
        )}
      </div>

      <div className={`${style_card} w-full flex flex-col gap-8`}>
        <FieldGroup>
          <h2 className="text-lg font-semibold mb-2">Added Stones</h2>
          <div className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12.5 whitespace-nowrap">No</TableHead>
                  <TableHead className="min-w-50">Stone</TableHead>
                  <TableHead className="w-20">P</TableHead>
                  <TableHead className="w-20">L</TableHead>
                  <TableHead className="w-20">T</TableHead>
                  <TableHead className="w-30 whitespace-nowrap">Carat/Butir</TableHead>
                  <TableHead className="w-30 whitespace-nowrap">Total Butir</TableHead>
                  <TableHead className="w-30 whitespace-nowrap">Total Carat</TableHead>
                  <TableHead className="w-15"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {addedStones.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="py-8 text-center text-muted-foreground italic">
                      No Stone Added
                    </TableCell>
                  </TableRow>
                ) : (
                  addedStones.map((addedStone, index) => (
                    <TableRow key={addedStone.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell className="text-xs font-semibold">{addedStone.stoneDesc}</TableCell>
                      <TableCell><Input className="h-8 px-2 text-xs" value={addedStone.p} onChange={(e) => handleUpdateStone(addedStone.id, 'p', e.target.value)} /></TableCell>
                      <TableCell><Input className="h-8 px-2 text-xs" value={addedStone.l} onChange={(e) => handleUpdateStone(addedStone.id, 'l', e.target.value)} /></TableCell>
                      <TableCell><Input className="h-8 px-2 text-xs" value={addedStone.t} onChange={(e) => handleUpdateStone(addedStone.id, 't', e.target.value)} /></TableCell>
                      <TableCell><Input type="number" step="0.001" className="h-8 px-2 text-xs" value={addedStone.caratPerButir} onChange={(e) => handleUpdateStone(addedStone.id, 'caratPerButir', e.target.value)} /></TableCell>
                      <TableCell><Input type="number" className="h-8 px-2 text-xs" value={addedStone.totalButir} onChange={(e) => handleUpdateStone(addedStone.id, 'totalButir', e.target.value)} /></TableCell>
                      <TableCell><Input type="number" step="0.001" className="h-8 px-2 text-xs" value={addedStone.totalCarat} onChange={(e) => handleUpdateStone(addedStone.id, 'totalCarat', e.target.value)} /></TableCell>
                      <TableCell className="text-right">
                        <Button type="button" variant="destructive" size="icon" className="h-8 w-8" onClick={() => handleRemoveStone(addedStone.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
              {addedStones.length > 0 && (
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={6} className="text-right font-semibold pr-4">Grand Total</TableCell>
                    <TableCell className="font-semibold px-4">{grandTotalButir}</TableCell>
                    <TableCell className="font-semibold px-4">{grandTotalCaratFormatted}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableFooter>
              )}
            </Table>
            {errors.manualAddedStones && <p className="text-red-500 text-sm mt-2 font-medium">{String(errors.manualAddedStones.message)}</p>}
          </div>
        </FieldGroup>
      </div>
    </div>
  );
}
