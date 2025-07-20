import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

type InputFieldProps = {
  id: string
  label: string
  type?: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export default function InputField({ id, label, type = "text", value, onChange, placeholder }: InputFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder} 
      />
    </div>
  )
} 