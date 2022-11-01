interface NoteGroupProps {
  labelName: string;
  children: React.ReactNode;
}

export default function NoteGroup({ labelName, children }: NoteGroupProps) {
  return (
    <div className="m-2 border-2 p-2">
      <h4 className="underline">{labelName}</h4>
      <ul>{children}</ul>
    </div>
  );
}
