import React, { useState } from "react";
import InputField from "./InputField";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { sav5keyOptions } from "@/constants/sav5KeyOptions";
import FieldError from "../FieldError";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { tooltips } from "@/types/tooltips";

type Props = {
  value: string;
  onChange: (val: string) => void;
};

export const Sav5KeyInput: React.FC<Props> = ({ value, onChange }) => {
  const [mode, setMode] = useState<"simple" | "advanced">("simple");

  return (
    <TooltipProvider>
      <div className="space-y-2">
        <Label className="text-base">Secure Authentication Key Mode</Label>
        <ToggleGroup
          type="single"
          value={mode}
          onValueChange={(val) => setMode(val as "simple" | "advanced")}
          className="flex gap-2"
        >
          <ToggleGroupItem value="simple">Simple</ToggleGroupItem>
          <ToggleGroupItem value="advanced">Advanced</ToggleGroupItem>
        </ToggleGroup>

        {mode === "simple" ? (
          <div className="space-y-1">
            <Tooltip>
              <TooltipTrigger asChild>
                <Label>Select Pre-Shared Key</Label>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>{tooltips.connection.sav5Config.sav5Key}</p>
              </TooltipContent>
            </Tooltip>
            <Select value={value} onValueChange={onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a key" />
              </SelectTrigger>
              <SelectContent>
                {sav5keyOptions.map((key) => (
                  <SelectItem key={key.value} value={key.value}>
                    {key.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ) : (
          <InputField
            id="sav5Key"
            label="Custom Secure Authentication Key"
            value={value}
            onChange={onChange}
            placeholder="Enter custom key"
          />
        )}
        <FieldError section="auth" keyword="SAv5" />
      </div>
    </TooltipProvider>
  );
};
