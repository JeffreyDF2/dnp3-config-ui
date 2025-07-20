import { useConfig } from "@/context/ConfigContext";
import type { MappingEntry } from "@/types/config";
import { Button } from "@/components/ui/button";
import AdvancedBinaryInput from "./AdvancedBinaryInput";
import AdvancedAnalogInput from "./AdvancedAnalogInput";
import AdvancedCommandOutput from "./AdvancedCommandOutput";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function AdvancedMapping() {
  const { state, dispatch } = useConfig();
  const binaryInputs = state.mapping?.binaryInputs ?? [];
  const analogInputs = state.mapping?.analogInputs ?? [];
  const commandOutputs = state.mapping?.commandOutputs ?? [];

  const makeNewEntry = (index: number): MappingEntry => ({
    pointName: "",
    group: 1,
    variation: 1,
    index,
    class: 1,
    unsolicitedEnabled: false,
  });

  // --- Handlers ---
  const updateMapping = (
    key: keyof typeof state.mapping,
    index: number,
    updated: Partial<MappingEntry>
  ) => {
    const entries = [...(state.mapping?.[key] ?? [])];
    entries[index] = { ...entries[index], ...updated };
    dispatch({ type: "UPDATE_MAPPING", payload: { [key]: entries } });
  };

  const addMapping = (key: keyof typeof state.mapping) => {
    const entries = [...(state.mapping?.[key] ?? [])];
    entries.push(makeNewEntry(entries.length));
    dispatch({ type: "UPDATE_MAPPING", payload: { [key]: entries } });
  };

  const removeMapping = (key: keyof typeof state.mapping, index: number) => {
    const entries = [...(state.mapping?.[key] ?? [])];
    entries.splice(index, 1);
    dispatch({ type: "UPDATE_MAPPING", payload: { [key]: entries } });
  };

  return (
    <div className="space-y-10">
      {/* === Binary Inputs === */}
      <section>
        <h2 className="text-xl font-semibold mb-4">
          Advanced Binary Input Mapping
        </h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="advanced-binary-inputs">
            <AccordionTrigger className="text-xl">Show Binary Inputs</AccordionTrigger>
            <AccordionContent>
              {binaryInputs.map((mapping, i) => (
                <div key={i} className="relative mb-6">
                  <AdvancedBinaryInput
                    index={i}
                    mapping={mapping}
                    onChange={(i, u) => updateMapping("binaryInputs", i, u)}
                  />
                  <div className="absolute right-0 top-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeMapping("binaryInputs", i)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}

              {binaryInputs.length < 10 && (
                <Button onClick={() => addMapping("binaryInputs")}>
                  + Add Binary Input
                </Button>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* === Analog Inputs === */}
      <section>
        <h2 className="text-xl font-semibold mb-4">
          Advanced Analog Input Mapping
        </h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="advanced-Analog-inputs">
            <AccordionTrigger className="text-xl">Show Analog Inputs</AccordionTrigger>
            <AccordionContent>
              {analogInputs.map((mapping, i) => (
                <div key={i} className="relative mb-6">
                  <AdvancedAnalogInput
                    index={i}
                    mapping={mapping}
                    onChange={(i, u) => updateMapping("analogInputs", i, u)}
                  />
                  <div className="absolute right-0 top-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeMapping("analogInputs", i)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}

              {analogInputs.length < 10 && (
                <Button onClick={() => addMapping("analogInputs")}>
                  + Add Analog Input
                </Button>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>

      {/* === Command Outputs === */}
      <section>
        <h2 className="text-xl font-semibold mb-4">
          Advanced Command Output Mapping
        </h2>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="advanced-command-ouputs">
            <AccordionTrigger className="text-xl">Show Command Outputs</AccordionTrigger>
            <AccordionContent>
              {commandOutputs.map((mapping, i) => (
                <div key={i} className="relative mb-6">
                  <AdvancedCommandOutput
                    index={i}
                    mapping={mapping}
                    onChange={(i, u) => updateMapping("commandOutputs", i, u)}
                  />
                  <div className="absolute right-0 top-0">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeMapping("commandOutputs", i)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              ))}

              {commandOutputs.length < 10 && (
                <Button onClick={() => addMapping("commandOutputs")}>
                  + Add Command Output
                </Button>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </div>
  );
}
// This component provides an advanced interface for managing binary input mappings.
// It allows users to add, remove, and edit multiple binary input mappings with detailed configuration options
