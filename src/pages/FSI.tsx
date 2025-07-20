import { useConfig } from "@/context/ConfigContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import type { SeverityClassSettings } from "@/types/config";
import FieldError from "@/components/FieldError";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { tooltips } from "@/types/tooltips";

function FSI() {
  const { state, dispatch } = useConfig();
  const fsi = state.fsi;

  const handleClassChange = (
    classKey: "class1" | "class2" | "class3",
    field: "maximumValue" | "minimumValue" | "defaultValue",
    value: number
  ) => {
    dispatch({
      type: "UPDATE_FSI",
      payload: {
        [classKey]: {
          ...fsi[classKey],
          [field]: value,
        },
      },
    });
  };

  return (
    <TooltipProvider>
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Fault Severity Index Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Toggles */}
          <div className="flex items-center gap-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Label htmlFor="fsi-toggle">Enable FSI: </Label>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p>{tooltips.fsi.isEnabled}</p>
              </TooltipContent>
            </Tooltip>
            <Switch
              id="fsi-toggle"
              checked={fsi.isEnabled}
              onCheckedChange={(checked) =>
                dispatch({
                  type: "UPDATE_FSI",
                  payload: { isEnabled: checked },
                })
              }
            />
          </div>
          {fsi.isEnabled && (
            <>
              <div className="flex items-center gap-4">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Label>Enable Unsolicited Response: </Label>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>{tooltips.fsi.unsolicitedResponseEnabled}</p>
                  </TooltipContent>
                </Tooltip>
                <Switch
                  checked={fsi.unsolicitedResponseEnabled}
                  onCheckedChange={(checked) =>
                    dispatch({
                      type: "UPDATE_FSI",
                      payload: { unsolicitedResponseEnabled: checked },
                    })
                  }
                />
              </div>

              {/* Polling Frequency */}
              <div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Label className="mb-3" htmlFor="polling">
                      Polling Frequency (seconds)
                    </Label>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>{tooltips.fsi.pollingFrequency}</p>
                  </TooltipContent>
                </Tooltip>
                <Input
                  id="polling"
                  type="number"
                  min={0}
                  value={fsi.pollingFrequency}
                  onChange={(e) => {
                    const num = Number(e.target.value);
                    if (!isNaN(num) && num >= 0) {
                      dispatch({
                        type: "UPDATE_FSI",
                        payload: { pollingFrequency: num },
                      });
                    }
                  }}
                />
                <FieldError section="fsi" keyword="polling" />
              </div>

              <Separator />

              {/* Class Configs */}
              {["class1", "class2", "class3"].map((cls) => (
                <div key={cls}>
                  <h3 className="text-lg font-medium mb-2 text-left">
                    {cls.replace("class", "Class ")}
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    {["minimumValue", "maximumValue"].map((field) => (
                      <div key={field}>
                        <Label className="mb-3" htmlFor={`${cls}-${field}`}>
                          {field
                            .replace("maximumValue", "Maximum Value")
                            .replace("minimumValue", "Minimum Value")}
                        </Label>
                        <Input
                          id={`${cls}-${field}`}
                          type="number"
                          min={0}
                          max={100}
                          value={
                            (
                              fsi[
                                cls as "class1" | "class2" | "class3"
                              ] as SeverityClassSettings
                            )[field as keyof SeverityClassSettings]
                          }
                          onChange={(e) => {
                            const number = Number(e.target.value);
                            if (number >= 0 && number <= 100) {
                              handleClassChange(
                                cls as "class1" | "class2" | "class3",
                                field as "minimumValue" | "maximumValue",
                                number
                              );
                            }
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <FieldError section="fsi" keyword="class" />
            </>
          )}
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}

export default FSI;
