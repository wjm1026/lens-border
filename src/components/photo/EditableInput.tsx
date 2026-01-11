interface EditableInputProps {
  value: string;
  placeholder: string;
  onChange: (val: string) => void;
  className?: string;
}

export default function EditableInput({
  value,
  placeholder,
  onChange,
  className,
}: EditableInputProps) {
  const isCenter = className?.includes("text-center");
  const isRight = className?.includes("text-right");
  const textAlign = isCenter ? "center" : isRight ? "right" : "left";

  return (
    <div
      className={`relative ${className || ""}`}
      style={{
        display: "flex",
        justifyContent: isCenter ? "center" : isRight ? "flex-end" : "flex-start",
      }}
    >
      <div className="relative">
        <span
          className="invisible whitespace-pre px-1"
          style={{ fontFamily: "inherit", display: "block" }}
          aria-hidden="true"
        >
          {value || placeholder}
        </span>
        <input
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 w-full bg-transparent border border-transparent hover:border-white/20 focus:border-blue-500/50 rounded  outline-none transition-colors cursor-text"
          style={{
            color: "inherit",
            fontFamily: "inherit",
            textAlign: textAlign,
          }}
          onMouseDown={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
}
