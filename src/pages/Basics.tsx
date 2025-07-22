import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import AdvancedMapping from "../components/mapping/AdvancedMapping";
import BasicBinaryInput from "@/components/mapping/BasicBinaryInput";
import BasicAnalogInput from "@/components/mapping/BasicAnalogInput";
import BasicCommandOutput from "@/components/mapping/BasicCommandOutput";
import { useConfig } from "@/context/ConfigContext";
import FieldError from "@/components/FieldError";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { tooltips } from "@/types/tooltips";
export default function Basic() {
  const { state, dispatch } = useConfig();
  const [advancedMode, setAdvancedMode] = useState(false);

  const handleChange = (
    key: "binaryInputs" | "analogInputs" | "commandOutputs",
    value: string
  ) => {
    const defaultEntry = {
      pointName: value,
      group: 1,
      variation: 1,
      index: 0,
      class: 1,
      unsolicitedEnabled: false,
    };

    dispatch({
      type: "SET_BASIC_MAPPING",
      payload: {
        [key]: [defaultEntry],
      },
    });
  };
  return (
    <TooltipProvider>
      <Card className="max-w-3xl mb-4 mx-auto">
        <CardHeader>
          <CardTitle className="text-xl">Set Device Address</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Device Address */}
          <div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Label htmlFor="deviceAddress">Device Address</Label>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>{tooltips.address}</p>
              </TooltipContent>
            </Tooltip>
            <input
              type="number"
              value={state.address || ""}
              onChange={(e) =>
                dispatch({
                  type: "SET_ADDRESS",
                  payload: e.target.value,
                })
              }
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter device address (0–65519)"
            />
            <FieldError section="basic" keyword="Address" />
          </div>
        </CardContent>
      </Card>
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-xl">Data Point Mapping</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <Label className="text-lg">Advanced Mapping</Label>
            <Switch checked={advancedMode} onCheckedChange={setAdvancedMode} />
          </div>

          <Separator />

          {!advancedMode ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <BasicBinaryInput
                value={state.mapping.binaryInputs[0]?.pointName || ""}
                onChange={(val) => handleChange("binaryInputs", val)}
              />

              <BasicAnalogInput
                value={state.mapping.analogInputs[0]?.pointName || ""}
                onChange={(val) => handleChange("analogInputs", val)}
              />

              <BasicCommandOutput
                value={state.mapping.commandOutputs[0]?.pointName || ""}
                onChange={(val) => handleChange("commandOutputs", val)}
              />
            </div>
          ) : (
            <AdvancedMapping />
          )}
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}
