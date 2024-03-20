interface TotalResultsProps {
  resultsShown: number;
  itemCount: number;
}

export default function TotalResults({
  resultsShown,
  itemCount,
}: TotalResultsProps) {
  return (
    <div className="">
      Showing {resultsShown} of {itemCount} results
    </div>
  );
}
