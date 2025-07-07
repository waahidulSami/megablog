export default function Button({
  children,
  className = '',
  onClick = () => {},
 
}) {
  return (
    <button
      onClick={onClick} // ✅ FIXED: bind the click handler
      className={`btn-primary h-8 rounded-xl bg-[#4F39F6]
        text-white font-semibold text-base
        mb-2 hover:shadow-2xl hover:shadow-blue-500/25 transform
        hover:scale-[1.02] hover:-translate-y-1
        active:scale-[0.98] transition-all
        duration-300 ease-out relative overflow-hidden group ${className}`}
       // 👈 Optional: allows you to pass other props like `type="submit"`
    >
      <span className="relative z-10">{children}</span>
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </button>
  );
}
