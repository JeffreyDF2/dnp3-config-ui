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
import { analogMappingOptions } from "@/constants/analogMappingOptions";
import { tooltips } from "@/types/tooltips";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function BasicAnalogInput({ value, onChange }: Props) {
  return (
    <TooltipProvider>
      <div className="space-y-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Label htmlFor="analogInputMapping">Analog Input Mapping</Label>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>{tooltips.mapping.analogInputs}</p>
          </TooltipContent>
        </Tooltip>
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select Analog Mapping" />
          </SelectTrigger>
          <SelectContent>
            {analogMappingOptions.map((option) => (
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
// This component provides a simple dropdown for selecting analog input mappings.
