type Props = {
  label: string;
  type?: string;
  value: string | number;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder?: string;
  isTextArea?: boolean;
  error?: string;
};

export default function InputField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  isTextArea = false,
  error,
}: Props) {
  return (
    <div className="field">
      <label>{label}</label>

      {isTextArea ? (
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      )}

      {error && <span className="field-error">{error}</span>}
    </div>
  );
}
