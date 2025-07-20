import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { MappingEntry } from "@/types/config";
import { useState, useEffect } from "react";
import clsx from "clsx";
import { mappingEntryTooltips } from "@/types/tooltips";

interface Props {
  index: number;
  mapping: MappingEntry;
  onChange: (index: number, updated: Partial<MappingEntry>) => void;
}

export default function AdvancedBinaryInput({
  index,
  mapping,
  onChange,
}: Props) {
  const [errors, setErrors] = useState({
    group: "",
    variation: "",
    index: "",
  });

  // Re-validate on mapping change
  useEffect(() => {
    const newErrors = { group: "", variation: "", index: "" };
    if (mapping.group < 0) newErrors.group = "Group must be ≥ 0";
    if (mapping.variation < 0) newErrors.variation = "Variation must be ≥ 0";
    if (mapping.index < 0 || mapping.index > 9)
      newErrors.index = "Index must be between 0 and 9";
    setErrors(newErrors);
  }, [mapping.group, mapping.variation, mapping.index]);

  return (
    <TooltipProvider>
      <div className="grid grid-cols-2 gap-4 border p-4 rounded-md shadow-sm">
        {/* Point Name */}
        <div className="space-y-1.5">
          <Tooltip>
            <TooltipTrigger asChild>
              <Label>Point Name</Label>
            </TooltipTrigger>
            <TooltipContent>{mappingEntryTooltips.pointName}</TooltipContent>
          </Tooltip>
          <Select
            value={mapping.pointName}
            onValueChange={(value) => onChange(index, { pointName: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Signal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Breaker Status">Breaker Status</SelectItem>
              <SelectItem value="Alarm Condition">Alarm Condition</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Group */}
        <div className="space-y-1.5">
          <Tooltip>
            <TooltipTrigger asChild>
              <Label htmlFor={`group-${index}`}>Group</Label>
            </TooltipTrigger>
            <TooltipContent>{mappingEntryTooltips.group}</TooltipContent>
          </Tooltip>
          <Input
            id={`group-${index}`}
            type="number"
            min={0}
            value={mapping.group}
            onChange={(e) => onChange(index, { group: Number(e.target.value) })}
            className={clsx(errors.group && "border-red-500")}
          />
          {errors.group && (
            <p className="text-sm text-red-500">{errors.group}</p>
          )}
        </div>

        {/* Variation */}
        <div className="space-y-1.5">
          <Tooltip>
            <TooltipTrigger asChild>
              <Label htmlFor={`variation-${index}`}>Variation</Label>
            </TooltipTrigger>
            <TooltipContent>{mappingEntryTooltips.variation}</TooltipContent>
          </Tooltip>
          <Input
            id={`variation-${index}`}
            type="number"
            min={0}
            value={mapping.variation}
            onChange={(e) =>
              onChange(index, { variation: Number(e.target.value) })
            }
            className={clsx(errors.variation && "border-red-500")}
          />
          {errors.variation && (
            <p className="text-sm text-red-500">{errors.variation}</p>
          )}
        </div>

        {/* Index */}
        <div className="space-y-1.5">
          <Tooltip>
            <TooltipTrigger asChild>
              <Label htmlFor={`index-${index}`}>Index</Label>
            </TooltipTrigger>
            <TooltipContent>{mappingEntryTooltips.index}</TooltipContent>
          </Tooltip>
          <Input
            id={`index-${index}`}
            type="number"
            min={0}
            max={9}
            value={mapping.index}
            onChange={(e) => onChange(index, { index: Number(e.target.value) })}
            className={clsx(errors.index && "border-red-500")}
          />
          {errors.index && (
            <p className="text-sm text-red-500">{errors.index}</p>
          )}
        </div>

        {/* Class */}
        <div className="space-y-1.5">
          <Tooltip>
            <TooltipTrigger asChild>
              <Label>Event Class</Label>
            </TooltipTrigger>
            <TooltipContent>
              Class 1 = Critical
              <br />
              Class 2 = Important
              <br />
              Class 3 = Informational
            </TooltipContent>
          </Tooltip>
          <Select
            value={mapping.class.toString()}
            onValueChange={(value) =>
              onChange(index, { class: Number(value) as 1 | 2 | 3 })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Class" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Class 1</SelectItem>
              <SelectItem value="2">Class 2</SelectItem>
              <SelectItem value="3">Class 3</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Unsolicited */}
        <div className="space-y-1.5">
          <Tooltip>
            <TooltipTrigger asChild>
              <Label htmlFor={`unsolicited-${index}`}>Unsolicited</Label>
            </TooltipTrigger>
            <TooltipContent>
              {mappingEntryTooltips.unsolicitedEnabled}
            </TooltipContent>
          </Tooltip>
          <div className="flex items-center gap-2">
            <Switch
              id={`unsolicited-${index}`}
              checked={!!mapping.unsolicitedEnabled}
              onCheckedChange={(checked) =>
                onChange(index, { unsolicitedEnabled: checked })
              }
            />
            <span>{mapping.unsolicitedEnabled ? "Enabled" : "Disabled"}</span>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
// This component provides an advanced interface for configuring binary input mappings.
