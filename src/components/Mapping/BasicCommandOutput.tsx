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
import { tooltips } from "@/types/tooltips";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function BasicCommandOutput({ value, onChange }: Props) {
  return (
    <TooltipProvider>
      <div className="space-y-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Label htmlFor="commandOutputMapping">Command Output Mapping</Label>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>{tooltips.mapping.commandOutputs}</p>
          </TooltipContent>
        </Tooltip>
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select Command Mapping" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Trip Breaker (Group 12, Var 1)">
              Trip Breaker (Group 12, Var 1)
            </SelectItem>
            <SelectItem value="Close Breaker (Group 12, Var 1)">
              Close Breaker (Group 12, Var 1)
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </TooltipProvider>
  );
}
