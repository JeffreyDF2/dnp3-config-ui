import { useErrorContext } from "@/context/ErrorContext";
import type { ErrorMap } from "@/types/errorMap";

function FieldError({ section, keyword }: { section: keyof ErrorMap; keyword: string }) {
    const { state: errorMap } = useErrorContext();
    const messages = errorMap[section].filter((err) =>
      err.toLowerCase().includes(keyword.toLowerCase())
    );
  
    return (
      <>
        {messages.map((msg, idx) => (
          <p key={idx} className="text-sm text-red-500 mt-1">{msg}</p>
        ))}
      </>
    );
  }
export default FieldError;  