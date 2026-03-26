export default function Input({
  type = "text",
  placeholder,
  className = "",
  ...props
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`w-full px-3 py-2 bg-white/60 text-black placeholder-black/60 border border-black rounded-lg outline-none focus:ring-2 focus:ring-black ${className}`}
      {...props}
    />
  );
}