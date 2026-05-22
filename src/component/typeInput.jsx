const CheckBox = ({ label, value, checked, onChange }) => (
  <label className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 cursor-pointer transition-all duration-200 select-none
    ${checked
      ? "border-blue-500 bg-blue-50 text-blue-700 font-semibold shadow-sm"
      : "border-blue-100 bg-white text-slate-600 hover:border-blue-300 hover:bg-blue-50/50"}`}>
    <span className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200
      ${checked ? "bg-blue-500 border-blue-500" : "border-blue-300 bg-white"}`}>
      {checked && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
    </span>
    <span className="text-sm">{label}</span>
    <input type="checkbox" className="sr-only" value={value} checked={checked} onChange={onChange} />
  </label>
);

const RadioBtn = ({ label, value, checked, onChange, name }) => (
  <label className={`flex items-center gap-3 px-4 py-3 rounded-xl border-2 cursor-pointer transition-all duration-200 select-none
    ${checked
      ? "border-blue-500 bg-blue-50 text-blue-700 font-semibold shadow-sm"
      : "border-blue-100 bg-white text-slate-600 hover:border-blue-300 hover:bg-blue-50/50"}`}>
    <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200
      ${checked ? "border-blue-500" : "border-blue-300 bg-white"}`}>
      {checked && <span className="w-2.5 h-2.5 rounded-full bg-blue-500 block" />}
    </span>
    <span className="text-sm">{label}</span>
    <input type="radio" className="sr-only" name={name} value={value} checked={checked} onChange={onChange} />
  </label>
);

const InputField = ({ label, type = "text", value, onChange, placeholder, required }) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-sm font-semibold text-blue-900 tracking-wide">
      {label}{required && <span className="text-blue-500 ml-1">*</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-3 rounded-xl border-2 border-blue-100 bg-white text-slate-700 text-sm
        placeholder:text-slate-400 focus:outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-100
        transition-all duration-200"
    />
  </div>
);

export { CheckBox, RadioBtn, InputField };