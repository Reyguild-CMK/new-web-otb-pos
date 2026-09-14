// Global
import { useState, useEffect } from "react";

// Data & Fetching Function
import { fetchJawsReference, JawsMasterItem } from "@/app/(protected)/_data/jaws-dummy";

// Components - label & field input
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export function DJDesign() {
  const [processFinishing, setProcessFinishing] = useState<JawsMasterItem[]>([]);

  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div className="flex flex-col gap-4">
      <h2>Finishing</h2>
      {isLoading ? <span className="text-gray-500">Memuat data...</span> : (
        
        <div className="grid grid-flow-col gap-x-4 gap-y-3" 
          // Otomatis membagi 2
          style={{ 
            gridTemplateRows: `repeat(${Math.ceil(processFinishing.length / 2)}, minmax(0, auto))` 
          }}
        >
          {processFinishing.map((item) => (
            <div className="flex gap-2 items-center" key={item.id}>
              <Checkbox id={`finish-${item.id}`} name="processFinishing[]" value={item.id.toString()} />
              <Label htmlFor={`finish-${item.id}`}>{item.nama}</Label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
