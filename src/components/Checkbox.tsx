import type { PasswordSettings } from "../types";

interface CheckboxProps {
  label: string,
  name: keyof PasswordSettings,
  checked: boolean,
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox = ({ label, name, checked, onChange }: CheckboxProps) => {
  return (
    <div className="flex items-center gap-4">
      <input
        type="checkbox"
        id={name}
        className="custom-checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={name} className="cursor-pointer select-none text-preset-4 text-grey-200 md:text-preset-3">
        {label}
      </label>
    </div>
  )
}

export default Checkbox