/**
 * Storybook stories for the RoleBadge component.
 *
 * @module components/react/RoleBadge.stories
 */

import type { Meta, StoryObj } from '@storybook/react-vite'

import RoleBadge from '#components/react/RoleBadge'
import { USER_ROLES } from '#types/generated-roles'

const meta = {
  title: 'React/RoleBadge',
  component: RoleBadge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Colour-coded indicator for a user role. Roles and their WCAG AA compliant colours are generated from `config/roles.config.ts` via `npm run setup:roles`, so this story list follows whatever roles the project has configured.',
      },
    },
  },
  argTypes: {
    role: {
      control: 'select',
      options: USER_ROLES,
      description: 'Configured user role from `#types/generated-roles`.',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes appended to the generated ones.',
    },
  },
  args: {
    role: 'member',
  },
} satisfies Meta<typeof RoleBadge>

export default meta

type Story = StoryObj<typeof meta>

export const Member: Story = {
  args: { role: 'member' },
}

export const Admin: Story = {
  args: { role: 'admin' },
}

export const SuperAdmin: Story = {
  args: { role: 'super_admin' },
}

/** Every configured role rendered together, to compare contrast and labels. */
export const AllRoles: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
      {USER_ROLES.map(role => (
        <RoleBadge key={role} role={role} />
      ))}
    </div>
  ),
}
