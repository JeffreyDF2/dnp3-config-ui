import { useConfig } from "@/context/ConfigContext";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import ConfigSummary from "@/components/review/ConfigSummary";
import { Separator } from "@/components/ui/separator";
import { useErrorContext } from "@/context/ErrorContext";

function Reviews() {
  const { dispatch } = useConfig();
  const { state: errorMap } = useErrorContext();
  const allErrors = Object.values(errorMap).flat();
  const [date, setDate] = useState<Date | null>(null);

  const handleScheduleChange = (selected: Date | undefined) => {
    if (selected) {
      setDate(selected);
      dispatch({
        type: "UPDATE_SCHEDULE",
        payload: selected.toISOString(),
      });
    }
  };

  return (
    <Card className="max-w-5xl mx-auto p-4">
      <CardHeader>
        <CardTitle>Review & Schedule Configuration</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Config Summary */}
        <ConfigSummary />

        <Separator />

        {/* Errors */}
        {allErrors.length > 0 && (
          <Alert variant="destructive">
            <AlertTitle>Configuration Issues</AlertTitle>
            <AlertDescription className="space-y-1 mt-2">
              {allErrors.map((err, idx) => (
                <p key={idx} className="text-sm">
                  {err}
                </p>
              ))}
            </AlertDescription>
          </Alert>
        )}
        
        <Separator />

        {/* Schedule Picker */}
        <div>
          <Label>Schedule Apply Time</Label>
          <Calendar
            mode="single"
            selected={date ?? undefined}
            onSelect={handleScheduleChange}
          />
          {date && (
            <p className="text-sm text-muted-foreground mt-1">
              Selected: {format(date, "PPPp")}
            </p>
          )}
        </div>

        {/* Submit */}
        <Button disabled={allErrors.length > 0}>Apply Configuration</Button>
      </CardContent>
    </Card>
  );
}

export default Reviews;
