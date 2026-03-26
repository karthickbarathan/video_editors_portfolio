export default function Card({ children, className = "", ...props  }) {
  return (
    <div
      className={`bg-white/10 backdrop-blur-md border border-white/20 rounded-xl overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}