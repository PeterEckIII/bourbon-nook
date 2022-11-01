interface ReviewFieldProps {
  labelName: string;
  value: string;
}

export default function ReviewField({ labelName, value }: ReviewFieldProps) {
  return (
    <div className="py-1">
      <span className="font-bold">{labelName}</span>:{" "}
      <span aria-label={`${labelName}-field`}>{value}</span>
    </div>
  );
}
