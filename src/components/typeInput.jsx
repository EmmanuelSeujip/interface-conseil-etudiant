const CheckBox = ({ label, value, checked, onChange }) => (
  <label className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 cursor-pointer transition-all duration-200 select-none
    ${checked
      ? "border-picton-blue-500 bg-picton-blue-50 dark:bg-picton-blue-900/40 text-picton-blue-700 dark:text-picton-blue-200 font-semibold shadow-sm"
      : "border-picton-blue-100 dark:border-picton-blue-800 bg-white dark:bg-picton-blue-950/60 text-slate-600 dark:text-slate-300 hover:border-picton-blue-300 dark:hover:border-picton-blue-600 hover:bg-picton-blue-50/50 dark:hover:bg-picton-blue-900/30"}`}>
    <span className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200
      ${checked ? "bg-picton-blue-500 border-picton-blue-500" : "border-picton-blue-300 dark:border-picton-blue-600 bg-white dark:bg-picton-blue-950"}`}>
      {checked && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
    </span>
    <span className="text-sm">{label}</span>
    <input type="checkbox" className="sr-only" value={value} checked={checked} onChange={onChange} />
  </label>
);

const RadioBtn = ({ label, value, checked, onChange, name }) => (
  <label className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 cursor-pointer transition-all duration-200 select-none
    ${checked
      ? "border-picton-blue-500 bg-picton-blue-50 dark:bg-picton-blue-900/40 text-picton-blue-700 dark:text-picton-blue-200 font-semibold shadow-sm"
      : "border-picton-blue-100 dark:border-picton-blue-800 bg-white dark:bg-picton-blue-950/60 text-slate-600 dark:text-slate-300 hover:border-picton-blue-300 dark:hover:border-picton-blue-600 hover:bg-picton-blue-50/50 dark:hover:bg-picton-blue-900/30"}`}>
    <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200
      ${checked ? "border-picton-blue-500" : "border-picton-blue-300 dark:border-picton-blue-600 bg-white dark:bg-picton-blue-950"}`}>
      {checked && <span className="w-2.5 h-2.5 rounded-full bg-picton-blue-500 block" />}
    </span>
    <span className="text-sm">{label}</span>
    <input type="radio" className="sr-only" name={name} value={value} checked={checked} onChange={onChange} />
  </label>
);

const InputField = ({ label, type = "text", value, onChange, placeholder, required }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-semibold text-picton-blue-900 dark:text-picton-blue-200 tracking-wide">
      {label}{required && <span className="text-picton-blue-500 ml-1">*</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-3 rounded-xl border-2 border-picton-blue-100 dark:border-picton-blue-800 bg-white dark:bg-picton-blue-950/60 text-slate-700 dark:text-slate-200 text-sm
        placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-picton-blue-400 focus:ring-4 focus:ring-picton-blue-100 dark:focus:ring-picton-blue-900
        transition-all duration-200"
    />
  </div>
);

export { CheckBox, RadioBtn, InputField };