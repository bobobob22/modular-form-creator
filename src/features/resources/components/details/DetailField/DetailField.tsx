import { EMPTY_FIELD_PLACEHOLDER } from '@/shared/constants/resourceForm'
import { Input } from '@/design-system'

interface DetailFieldProps {
  label: string
  value: string
}

export function DetailField({ label, value }: DetailFieldProps) {
  const displayValue = value.trim() ? value : EMPTY_FIELD_PLACEHOLDER

  return (
    <Input label={label} value={displayValue} state="locked" readOnly />
  )
}
