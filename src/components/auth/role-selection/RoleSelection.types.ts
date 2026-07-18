export interface RoleSelectionProps {
  selectedRole: string | null;
  onRoleSelect: (role: string) => void;
  onContinue: () => void;
}
