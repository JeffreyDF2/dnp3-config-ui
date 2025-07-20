import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { binaryMappingOptions } from "@/constants/binaryMappingOptions";
import { tooltips } from "@/types/tooltips";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function BasicBinaryInput({ value, onChange }: Props) {
  return (
    <TooltipProvider>
    <div className="space-y-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Label htmlFor="binaryInputMapping">Binary Input Mapping</Label>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p>{tooltips.mapping.binaryInputs}</p>
        </TooltipContent>
      </Tooltip>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select Binary Mapping" />
        </SelectTrigger>
        <SelectContent>
         {binaryMappingOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
    </TooltipProvider>
  );
}
// This component provides a simple dropdown for selecting binary input mappings.