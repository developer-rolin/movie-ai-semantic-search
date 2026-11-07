import type { SearchInputProps } from "./SearchInput.types";

export function SearchInput({
  onChange,
  placeholder = "Pesquisar",
  value,
}: SearchInputProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition shadow-inner"
    />
  );
}
