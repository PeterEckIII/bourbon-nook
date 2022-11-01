interface NoteFieldProps {
  labelName: string;
  value: number;
}

export default function NoteField({ labelName, value }: NoteFieldProps) {
  return (
    <li className="my-2 py-2" aria-label={`${labelName.toLowerCase()}-field`}>
      {labelName}: {value}
    </li>
  );
}
