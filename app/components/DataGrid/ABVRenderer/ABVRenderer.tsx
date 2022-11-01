export default function ABVRenderer(params: any) {
  return (
    <div>
      <span className="font-medium">{params.value}%</span>
    </div>
  );
}
