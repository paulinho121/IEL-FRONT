import type { InputHTMLAttributes } from "react";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

/** Campo de formulário com rótulo, no padrão visual da loja. */
export default function FormField({ label, id, className = "", ...input }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-bold text-dark-gray-2">
        {label}
      </label>
      <input
        id={id}
        className={`h-[60px] rounded-lg bg-light-gray-3 px-5 text-base text-dark-gray-2 outline-none placeholder:text-light-gray focus:ring-2 focus:ring-primary ${className}`}
        {...input}
      />
    </div>
  );
}
