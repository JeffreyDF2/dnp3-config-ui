import { useState } from "react";
import { useConfig } from "@/context/ConfigContext";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { format } from "date-fns";

const InfoRow = ({ label, value }: { label: string; value: string | number | boolean }) => (
  <div className="flex gap-2 text-sm">
    <span className="font-medium w-48">{label}:</span>
    <span className="text-muted-foreground">{String(value)}</span>
  </div>
);

const ConfigSummary = () => {
  const { state } = useConfig();
  const [showRaw, setShowRaw] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Label className="text-2xl font-medium">Configuration Summary</Label>
        <div className="flex items-center gap-2">
          <Label className="text-sm">Show Raw</Label>
          <Switch checked={showRaw} onCheckedChange={setShowRaw} />
        </div>
      </div>

      {showRaw ? (
        <Textarea
          className="font-mono h-96"
          readOnly
          value={JSON.stringify(state, null, 2)}
        />
      ) : (
        <Accordion type="multiple" className="w-full space-y-2">
          <AccordionItem value="address">
            <AccordionTrigger className="text-xl">Device Info</AccordionTrigger>
            <AccordionContent className="space-y-2">
              <InfoRow label="Device Address" value={state.address || "Not set"} />
              <InfoRow
                label="Scheduled Time"
                value={
                  state.scheduledApplyTime
                    ? format(new Date(state.scheduledApplyTime), "PPPp")
                    : "Not scheduled"
                }
              />
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="connection">
            <AccordionTrigger className="text-xl">Connection</AccordionTrigger>
            <AccordionContent className="space-y-2">
              <InfoRow label="Connection Type" value={state.connection.connectionType} />
              {state.connection.connectionType === "TCP/IP" && (
                <>
                  <InfoRow label="IP Address" value={state.connection.tcpipConfig.ipAddress} />
                  <InfoRow label="Port" value={state.connection.tcpipConfig.port} />
                  <InfoRow label="Local Address" value={state.connection.tcpipConfig.localAddress} />
                  <InfoRow label="Remote Address" value={state.connection.tcpipConfig.remoteAddress} />
                  <InfoRow label="Period" value={state.connection.tcpipConfig.period} />
                  <InfoRow label="Timeout" value={state.connection.tcpipConfig.timeout} />
                </>
              )}
              {state.connection.connectionType === "RS-485" && (
                <>
                  <InfoRow label="Baud Rate" value={state.connection.rs485Config.baudRate} />
                  <InfoRow label="Data Bits" value={state.connection.rs485Config.dataBits} />
                  <InfoRow label="Parity" value={state.connection.rs485Config.parity} />
                  <InfoRow label="Stop Bits" value={state.connection.rs485Config.stopBits} />
                </>
              )}
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="mapping">
            <AccordionTrigger className="text-xl">Mapping</AccordionTrigger>
            <AccordionContent className="space-y-6">
              <div>
                <h4 className="font-medium mb-1 text-left text-lg">Binary Inputs</h4>
                {state.mapping.binaryInputs.length > 0 ? (
                  <ul className="space-y-1">
                    {state.mapping.binaryInputs.map((entry, idx) => (
                      <li key={idx} className="text-sm">
                        <InfoRow label="Point Name" value={entry.pointName} />
                        <InfoRow label="Group" value={entry.group} />
                        <InfoRow label="Variation" value={entry.variation} />
                        <InfoRow label="Index" value={entry.index} />
                        <hr className="my-1 border-muted" />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">No Binary Inputs mapped.</p>
                )}
              </div>

              <div>
                <h4 className="font-medium mb-1 text-left text-lg">Analog Inputs</h4>
                {state.mapping.analogInputs.length > 0 ? (
                  <ul className="space-y-1">
                    {state.mapping.analogInputs.map((entry, idx) => (
                      <li key={idx} className="text-sm">
                        <InfoRow label="Point Name" value={entry.pointName} />
                        <InfoRow label="Group" value={entry.group} />
                        <InfoRow label="Variation" value={entry.variation} />
                        <InfoRow label="Index" value={entry.index} />
                        <hr className="my-1 border-muted" />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">No Analog Inputs mapped.</p>
                )}
              </div>

              <div>
                <h4 className="font-medium mb-1 text-left text-lg">Command Outputs</h4>
                {state.mapping.commandOutputs.length > 0 ? (
                  <ul className="space-y-1">
                    {state.mapping.commandOutputs.map((entry, idx) => (
                      <li key={idx} className="text-sm">
                        <InfoRow label="Point Name" value={entry.pointName} />
                        <InfoRow label="Group" value={entry.group} />
                        <InfoRow label="Variation" value={entry.variation} />
                        <InfoRow label="Index" value={entry.index} />
                        <hr className="my-1 border-muted" />
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground">No Command Outputs mapped.</p>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="fsi">
            <AccordionTrigger className="text-xl">FSI</AccordionTrigger>
            <AccordionContent className="space-y-2">
              <InfoRow label="Enabled" value={state.fsi.isEnabled ? "Yes" : "No"} />
              <InfoRow label="Polling Frequency" value={state.fsi.pollingFrequency} />
              <InfoRow label="Unsolicited Response" value={state.fsi.unsolicitedResponseEnabled ? "Yes" : "No"} />
              <InfoRow label="Class 1 Min" value={state.fsi.class1.minimumValue} />
              <InfoRow label="Class 1 Max" value={state.fsi.class1.maximumValue} />
              <InfoRow label="Class 2 Min" value={state.fsi.class2.minimumValue} />
              <InfoRow label="Class 2 Max" value={state.fsi.class2.maximumValue} />
              <InfoRow label="Class 3 Min" value={state.fsi.class3.minimumValue} />
              <InfoRow label="Class 3 Max" value={state.fsi.class3.maximumValue} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
};

export default ConfigSummary;
