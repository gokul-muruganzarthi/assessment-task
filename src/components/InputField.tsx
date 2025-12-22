type Props = {
  label: string;
  type?: string;
  value: string | number;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder?: string;
  isTextArea?: boolean;
};

export default function InputField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  isTextArea = false,
}: Props) {
  return (
    <div className="field">
      <label>{label}</label>
      {isTextArea ? (
        <textarea value={value} onChange={onChange} placeholder={placeholder} />
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      )}
    </div>
  );
}
