import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { tooltips } from "@/types/tooltips";
import FieldError from "../FieldError";

export default function RS485ConfigSection({ rs485Config, update }: any) {
  const baudRates = [1200, 2400, 4800, 9600, 19200, 38400, 57600, 115200];
  const dataBits = [5, 6, 7, 8];
  const stopBits = [1, 1.5, 2];
  const parityOptions = ["None", "Even", "Odd"];

  return (
    <TooltipProvider>
      <Separator />
      <h3 className="text-lg font-semibold">RS-485 Configuration</h3>

      {/* Baud Rate */}
      <div className="space-y-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Label htmlFor="baudRate" className="text-sm font-medium text-left">Baud Rate</Label>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>{tooltips.connection.rs485Config.baudRate}</p>
          </TooltipContent>
        </Tooltip>
        <Select
          value={String(rs485Config.baudRate)}
          onValueChange={(val) => update({ baudRate: Number(val) })}
        >
          <SelectTrigger id="baudRate">
            <SelectValue placeholder="Select Baud Rate" />
          </SelectTrigger>
          <SelectContent>
            {baudRates.map((rate) => (
              <SelectItem key={rate} value={String(rate)}>
                {rate}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FieldError section="serial" keyword="baud" />
      </div>

      {/* Data Bits */}
      <div className="space-y-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Label htmlFor="dataBits">Data Bits</Label>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>{tooltips.connection.rs485Config.dataBits}</p>
          </TooltipContent>
        </Tooltip>
        <Select
          value={String(rs485Config.dataBits)}
          onValueChange={(val) => update({ dataBits: Number(val) })}
        >
          <SelectTrigger id="dataBits">
            <SelectValue placeholder="Select Data Bits" />
          </SelectTrigger>
          <SelectContent>
            {dataBits.map((bits) => (
              <SelectItem key={bits} value={String(bits)}>
                {bits}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FieldError section="serial" keyword="bits" />
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="advanced">
          <AccordionTrigger>Advanced Settings</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {/* Parity */}
              <div className="space-y-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Label htmlFor="parity">Parity</Label>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>{tooltips.connection.rs485Config.parity}</p>
                  </TooltipContent>
                </Tooltip>
                <Select
                  value={rs485Config.parity}
                  onValueChange={(val) => update({ parity: val })}
                >
                  <SelectTrigger id="parity">
                    <SelectValue placeholder="Select Parity" />
                  </SelectTrigger>
                  <SelectContent>
                    {parityOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Stop Bits */}
              <div className="space-y-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Label htmlFor="stopBits">Stop Bits</Label>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>{tooltips.connection.rs485Config.stopBits}</p>
                  </TooltipContent>
                </Tooltip>
                <Select
                  value={String(rs485Config.stopBits)}
                  onValueChange={(val) => update({ stopBits: Number(val) })}
                >
                  <SelectTrigger id="stopBits">
                    <SelectValue placeholder="Select Stop Bits" />
                  </SelectTrigger>
                  <SelectContent>
                    {stopBits.map((bits) => (
                      <SelectItem key={bits} value={String(bits)}>
                        {bits}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </TooltipProvider>
  );
}
// This component provides a section for configuring RS-485 communication settings.
