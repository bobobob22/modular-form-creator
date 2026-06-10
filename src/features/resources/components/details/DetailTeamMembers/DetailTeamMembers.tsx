import { Checkbox } from '@/design-system'
import { EMPTY_FIELD_PLACEHOLDER, TEAM_MEMBER_OPTIONS } from '@/shared/constants/resourceForm'
import { MutedMessage } from '@/shared/styles/common.styles'
import { CheckboxList, Field, Label } from './DetailTeamMembers.styles'

interface DetailTeamMembersProps {
  label: string
  members: string[]
}

export function DetailTeamMembers({ label, members }: DetailTeamMembersProps) {
  const hasMembers = members.length > 0

  return (
    <Field>
      <Label>{label}</Label>
      {hasMembers ? (
        <CheckboxList>
          {TEAM_MEMBER_OPTIONS.map((option) => (
            <Checkbox
              key={option}
              label={option}
              checked={members.includes(option)}
              disabled
              readOnly
            />
          ))}
        </CheckboxList>
      ) : (
        <MutedMessage>{EMPTY_FIELD_PLACEHOLDER}</MutedMessage>
      )}
    </Field>
  )
}
