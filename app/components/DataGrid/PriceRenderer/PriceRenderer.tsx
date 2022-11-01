export default function PriceRenderer(params: any) {
  return (
    <div>
      <span className="font-medium">${params.value}</span>
    </div>
  );
}
