// Global
import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";

// Style Card
import { style_card } from "@/components/shared/Stepper/Stepper";

// Data & Fetching Function
import { fetchJawsReference, JawsMasterItem, STONE_CONFIG, AddedStone, checkStoneCombination } from "@/app/(protected)/_data/jaws-dummy";

// Components - label & field input
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field-application";
import { RequiredDot } from "@/components/ui/required-dot";
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "@/components/ui/combobox";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableFooter } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function DJStone() {
  // Menyimpan data pada state
  const [stone, setStone] = useState<JawsMasterItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // State untuk form dinamis (Stone tab)
  const [selectedStone, setSelectedStone] = useState<JawsMasterItem | null>(null);
  const [filters, setFilters] = useState<Record<string, string | null>>({}); //menyimpan pilihan combobox

  // State untuk mengecek kombinasi tipe stone (Stone tab)
  const [isChecking, setIsChecking] = useState(false);
  const [isNoData, setIsNoData] = useState(false);

  // State untuk tabel stone yang ditambahkan
  const [addedStones, setAddedStones] = useState<AddedStone[]>([]);

  useEffect(() => {
    async function loadPawnManualJAWS() {
      setIsLoading(true);
      const [resStone] = await Promise.all([
        fetchJawsReference('Stone'),
      ]);

      setStone(resStone);
      setIsLoading(false);
    }
    loadPawnManualJAWS();
  }, []);

  // Konfigurasi field yang aktif
  const currentConfig = selectedStone ? (STONE_CONFIG[selectedStone.nama] || STONE_CONFIG["DEFAULT"]) : null;
  const fields = currentConfig?.fields || STONE_CONFIG["DEFAULT"].fields;
  const optionsMap = currentConfig?.options || STONE_CONFIG["DEFAULT"].options;

  // Validasi jika semua field sudah terisi
  const isComplete = selectedStone && fields.every((configField: string) => filters[configField]);

  // Simulasi hit API pengecekan kombinasi
  useEffect(() => {
    async function doCheckCombination() {
      if (!isComplete || !selectedStone) {
        setIsNoData(false);
        return;
      }
      setIsChecking(true);
      // Panggil fungsi dummy yang punya jeda waktu (simulasi fetch DB)
      const isFound = await checkStoneCombination(selectedStone.nama, filters);
      setIsNoData(!isFound);
      setIsChecking(false);
    }
    doCheckCombination();
  }, [isComplete, selectedStone, filters]);

  const handleStoneSelect = (item: JawsMasterItem) => {
    setSelectedStone(item);
    setFilters({}); // Reset filter setiap kali ganti tipe stone
  };

  const handleFilterChange = (field: string, val: string | null) => {
    setFilters(prev => ({ ...prev, [field]: val }));
  };

  const handleAddStone = () => {
    if (!selectedStone) return;

    // Gabungkan detail stone untuk ditampilkan tanpa nama tipe stone
    const details = fields.map((configField: string) => filters[configField]).filter(Boolean).join(" | ");
    const desc = details;

    setAddedStones(prev => [
      ...prev,
      {
        id: Math.random().toString(),
        stoneDesc: desc,
        p: "",
        l: "",
        t: "",
        caratPerButir: "",
        totalButir: "",
        totalCarat: ""
      }
    ]);
  };

  const handleUpdateStone = (id: string, field: keyof AddedStone, value: string) => {
    setAddedStones(prev => prev.map(addedStone => addedStone.id === id ? { ...addedStone, [field]: value } : addedStone));
  };

  const handleRemoveStone = (id: string) => {
    setAddedStones(prev => prev.filter(addedStone => addedStone.id !== id));
  };

  // Perhitungan Grand Total
  const grandTotalButir = addedStones.reduce((total, currentStone) => total + (parseFloat(currentStone.totalButir) || 0), 0);
  const grandTotalCarat = addedStones.reduce((total, currentStone) => total + (parseFloat(currentStone.totalCarat) || 0), 0);

  return (
    <div className="flex flex-col gap-8">
      <div className={`${style_card} w-full flex flex-col gap-8`}>
        <FieldGroup>
          <h2 className="text-lg font-semibold">Tipe Stone</h2>
          {isLoading ? <span className="text-gray-500 text-sm">Memuat data...</span> : (
            <div className="grid grid-flow-col gap-x-4 gap-y-3"
              style={{
                gridTemplateRows: `repeat(${Math.ceil(stone.length / 2)}, minmax(0, auto))`
              }}
            >
              {stone.map((item) => (
                <div className="flex gap-2 items-center" key={item.id}>
                  <input
                    type="radio"
                    name="stoneType"
                    id={`stone-${item.id}`}
                    value={item.id}
                    onChange={() => handleStoneSelect(item)}
                    checked={selectedStone?.id === item.id}
                    className="w-4 h-4 cursor-pointer text-primary focus:ring-primary border-gray-300"
                  />
                  <FieldLabel htmlFor={`stone-${item.id}`} className="cursor-pointer font-medium">
                    {item.nama}
                  </FieldLabel>
                </div>
              ))}
            </div>
          )}
        </FieldGroup>

        {/* Render Combobox Dinamis */}
        {selectedStone && (
          <FieldGroup>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fields.map((configField: string) => {
                const rawOptions = optionsMap[configField] || STONE_CONFIG["DEFAULT"].options[configField] || [];
                const formattedOptions = rawOptions.map((optionName: string) => ({ id: optionName, nama: optionName }));

                return (
                  <Field key={configField}>
                    <FieldLabel className="capitalize">{configField}<RequiredDot /></FieldLabel>
                    <Combobox
                      name={`stone-${configField}`}
                      value={filters[configField] || null}
                      onValueChange={(val) => handleFilterChange(configField, val)}
                      items={formattedOptions}
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

        {/* Render Tabel Parcel Selection */}
        {selectedStone && (
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
                      {fields.map((configField: string) => filters[configField]).filter(Boolean).join(" | ")}
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

      {/* Render Tabel Added Stones */}
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
                      <TableCell className="text-xs">{addedStone.stoneDesc}</TableCell>
                      <TableCell><Input className="h-8 px-2 text-xs" value={addedStone.p} onChange={(e) => handleUpdateStone(addedStone.id, 'p', e.target.value)} /></TableCell>
                      <TableCell><Input className="h-8 px-2 text-xs" value={addedStone.l} onChange={(e) => handleUpdateStone(addedStone.id, 'l', e.target.value)} /></TableCell>
                      <TableCell><Input className="h-8 px-2 text-xs" value={addedStone.t} onChange={(e) => handleUpdateStone(addedStone.id, 't', e.target.value)} /></TableCell>
                      <TableCell><Input className="h-8 px-2 text-xs" value={addedStone.caratPerButir} onChange={(e) => handleUpdateStone(addedStone.id, 'caratPerButir', e.target.value)} /></TableCell>
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
                    <TableCell className="font-semibold px-4">{grandTotalCarat.toFixed(3)}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableFooter>
              )}
            </Table>
          </div>
        </FieldGroup>
      </div>
    </div>
  );
}
