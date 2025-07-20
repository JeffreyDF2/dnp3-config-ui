import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import FieldError from "../FieldError";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { tooltips } from "@/types/tooltips";

export default function TCPConfigSection({ tcpipConfig, update }: any) {
  return (
    <TooltipProvider>
      <Separator />
      <h3 className="text-lg font-semibold">TCP/IP Configuration</h3>

      {/* IP Address */}
      <div className="space-y-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Label
              htmlFor="ipAddress"
              className="text-sm font-medium text-left"
            >
              IP Address
            </Label>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>{tooltips.connection.tcpipConfig.ipAddress}</p>
          </TooltipContent>
        </Tooltip>
        <Input
          id="ipAddress"
          value={tcpipConfig.ipAddress}
          onChange={(e) => update({ ipAddress: e.target.value })}
          placeholder="Enter IP Address"
        />
      </div>
      <FieldError section="tcpip" keyword="ip" />

      {/* Port */}
      <div className="space-y-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Label htmlFor="port" className="text-sm font-medium text-left">
              Port
            </Label>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>{tooltips.connection.tcpipConfig.port}</p>
          </TooltipContent>
        </Tooltip>
        <Input
          id="port"
          value={tcpipConfig.port}
          onChange={(e) => update({ port: e.target.value })}
          placeholder="e.g., 8080"
        />
      </div>
      <FieldError section="tcpip" keyword="port" />

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="advanced">
          <AccordionTrigger className="text-lg">
            Advanced Settings
          </AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {/* Local Address */}
              <div className="space-y-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Label
                      htmlFor="localAddress"
                      className="text-sm font-medium text-left"
                    >
                      Local Address
                    </Label>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>{tooltips.connection.tcpipConfig.localAddress}</p>
                  </TooltipContent>
                </Tooltip>
                <Input
                  id="localAddress"
                  value={tcpipConfig.localAddress}
                  onChange={(e) => update({ localAddress: e.target.value })}
                  placeholder="Enter Local Address"
                />
                <FieldError section="tcpip" keyword="local" />
              </div>
              {/* Remote Address */}
              <div className="space-y-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Label
                      htmlFor="remoteAddress"
                      className="text-sm font-medium text-left"
                    >
                      Remote Address
                    </Label>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>{tooltips.connection.tcpipConfig.remoteAddress}</p>
                  </TooltipContent>
                </Tooltip>
                <Input
                  id="remoteAddress"
                  value={tcpipConfig.remoteAddress}
                  onChange={(e) => update({ remoteAddress: e.target.value })}
                  placeholder="Enter Remote Address"
                />
                <FieldError section="tcpip" keyword="remote" />
              </div>
              {/* Period */}
              <div className="space-y-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Label
                      htmlFor="period"
                      className="text-sm font-medium text-left"
                    >
                      Period
                    </Label>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>{tooltips.connection.tcpipConfig.period}</p>
                  </TooltipContent>
                </Tooltip>
                <Input
                  id="period"
                  value={tcpipConfig.period}
                  onChange={(e) => update({ period: e.target.value })}
                  placeholder="Enter Polling Period"
                />
                <FieldError section="tcpip" keyword="period" />
              </div>

              {/* Timeout */}
              <div className="space-y-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Label
                      htmlFor="timeout"
                      className="text-sm font-medium text-left"
                    >
                      Timeout
                    </Label>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    <p>{tooltips.connection.tcpipConfig.timeout}</p>
                  </TooltipContent>
                </Tooltip>
                <Input
                  id="timeout"
                  value={tcpipConfig.timeout}
                  onChange={(e) => update({ timeout: e.target.value })}
                  placeholder="Enter Timeout"
                />
                <FieldError section="tcpip" keyword="timeout" />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </TooltipProvider>
  );
}
