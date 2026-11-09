import type { FilterOption } from "../../types";

interface FilterGroupProps {
  title: string;
  inputType: "checkbox" | "radio";
  options: FilterOption[];
  /** Valores marcados no momento (controlado pela página). */
  selected?: string[];
  onChange?: (value: string, checked: boolean) => void;
}

export default function FilterGroup({ title, inputType, options, selected = [], onChange }: FilterGroupProps) {
  const groupName = title.toLowerCase().replace(/\s+/g, "-");

  return (
    <fieldset className="mb-5">
      <legend className="mb-3 text-sm font-bold text-dark-gray-2">{title}</legend>
      <div className="flex flex-col gap-2.5">
        {options.map((option) => {
          // "value" é opcional na documentação; sem ele, o texto vira o valor
          const value = option.value ?? option.text;
          const id = `${groupName}-${value}`;
          return (
            <label key={id} htmlFor={id} className="flex cursor-pointer items-center gap-3 text-sm text-dark-gray-2">
              <input
                id={id}
                type={inputType}
                name={groupName}
                value={value}
                checked={selected.includes(value)}
                onChange={(e) => onChange?.(value, e.target.checked)}
                className="filter-input"
              />
              {option.text}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
