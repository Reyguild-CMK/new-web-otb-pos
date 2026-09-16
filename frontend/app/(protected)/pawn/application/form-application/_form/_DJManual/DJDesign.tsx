// Global
import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";

// Data & Fetching Function
import { fetchJawsReference, JawsMasterItem } from "@/app/(protected)/_data/jaws-dummy";

// Components - label & field input
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export function DJDesign() {
  const { setValue, watch } = useFormContext();
  const [processFinishing, setProcessFinishing] = useState<JawsMasterItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);


  const selectedFinishing: string[] = watch("manualProcessFinishing") || [];

  useEffect(() => {
    async function loadPawnManualJAWS() {
      setIsLoading(true);
      const [resProcessFinishing] = await Promise.all([
        fetchJawsReference('ProcessFinishing'),
      ]);

      setProcessFinishing(resProcessFinishing);
      setIsLoading(false);
    }
    loadPawnManualJAWS();
  }, []);

  const handleCheckboxChange = (id: string, checked: boolean) => {
    let newSelected = [...selectedFinishing];
    if (checked) {
      newSelected.push(id);
    } else {
      newSelected = newSelected.filter(item => item !== id);
    }
    setValue("manualProcessFinishing", newSelected);
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">Finishing</h2>
      {isLoading ? <span className="text-gray-500">Memuat data...</span> : (
        <div className="grid grid-flow-col gap-x-4 gap-y-3"
          // Otomatis membagi 2
          style={{
            gridTemplateRows: `repeat(${Math.ceil(processFinishing.length / 2)}, minmax(0, auto))`
          }}
        >
          {processFinishing.map((item) => (
            <div className="flex gap-2 items-center" key={item.id}>
              <Checkbox
                id={`finish-${item.id}`}
                name="processFinishing[]"
                value={item.id.toString()}
                checked={selectedFinishing.includes(item.id.toString())}
                onCheckedChange={(checked) => handleCheckboxChange(item.id.toString(), checked as boolean)}
              />
              <Label htmlFor={`finish-${item.id}`} className="cursor-pointer font-medium">{item.nama}</Label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
