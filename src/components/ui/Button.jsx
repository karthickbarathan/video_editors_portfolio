export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const base =
    "px-4 py-2 rounded-lg font-medium transition duration-200";

  const variants = {
    primary: "bg-black text-white hover:opacity-80",
    secondary: "bg-white/60 text-black border border-black hover:bg-white",
    danger: "bg-red-500 text-white hover:opacity-80",
    ghost: "text-black hover:bg-black/10",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}