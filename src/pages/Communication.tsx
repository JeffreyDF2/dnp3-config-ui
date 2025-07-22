import { useConfig } from "@/context/ConfigContext";
import TCPConfigSection from "../components/communication/TCPConfigSection";
import RS485ConfigSection from "../components/communication/RS485ConfigSection";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Sav5KeyInput } from "@/components/communication/Sav5KeyInput";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default function Communication() {
  const { state, dispatch } = useConfig();
  const { connection } = state;

  const updateConnection = (data: Partial<typeof connection>) =>
    dispatch({ type: "UPDATE_CONNECTION", payload: data });

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl">Communication Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Sav5KeyInput
          value={connection.sav5Config.sav5Key}
          onChange={(val) => updateConnection({ sav5Config: { sav5Key: val } })}
        />

        <Separator />

        <div>
          <Label className="text-base mb-3 block text-left">
            Connection Type
          </Label>
          <ToggleGroup
            type="single"
            value={connection.connectionType}
            onValueChange={(value) =>
              updateConnection({ connectionType: value as "TCP/IP" | "RS-485" })
            }
            className="flex gap-2"
          >
            <ToggleGroupItem value="TCP/IP">TCP/IP</ToggleGroupItem>
            <ToggleGroupItem value="RS-485">RS-485</ToggleGroupItem>
          </ToggleGroup>
        </div>

        {connection.connectionType === "TCP/IP" && (
          <TCPConfigSection
            tcpipConfig={connection.tcpipConfig}
            update={(data: Partial<typeof connection.tcpipConfig>) =>
              updateConnection({
                tcpipConfig: { ...connection.tcpipConfig, ...data },
              })
            }
          />
        )}

        {connection.connectionType === "RS-485" && (
          <RS485ConfigSection
            rs485Config={connection.rs485Config}
            update={(data: Partial<typeof connection.rs485Config>) =>
              updateConnection({
                rs485Config: { ...connection.rs485Config, ...data },
              })
            }
          />
        )}
      </CardContent>
    </Card>
  );
}
