type EditTextareaProps = {
  labelName: string;
  name: string;
  defaultValue: string | null;
};

export default function EditTextarea({
  labelName,
  name,
  defaultValue,
}: EditTextareaProps) {
  return (
    <div>
      <label htmlFor={name} className="flex w-full flex-col gap-1">
        {labelName}
      </label>
      <textarea
        className="w-full flex-1 rounded-md border-2 border-blue-500 py-2 px-3 text-lg leading-6"
        rows={6}
        name={name}
        defaultValue={defaultValue ?? ""}
        id={name}
        aria-label={`${name}-input`}
      />
    </div>
  );
}
