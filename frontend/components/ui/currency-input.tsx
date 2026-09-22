import { Input } from "@/components/ui/input";
import { formatCurrency, parseCurrency } from "@/lib/currency";

// Interface mewakili seluruh props komponen Input
interface CurrencyInputProps extends React.ComponentProps<typeof Input>{
  value: string;
  onValueChange:(value:string) => void;
}

export function CurrencyInput({
  value,
  onValueChange,
  ...props
}: CurrencyInputProps) {
  return (
    <Input
      {...props}
      value={value ? formatCurrency(Number(value)) : ""}
      onChange={(e) => onValueChange(parseCurrency(e.target.value))}
    />
  );
}

