import DataRow from "../Common/DataRow";
import Head from "../Common/Head";

type ReviewTableProps = {
  columns: Columns[];
  items: GridReview[] | [];
};

export default function ReviewTable({ columns, items }: ReviewTableProps) {
  return (
    <div className="m-4 overflow-x-scroll">
      <table
        className="border-1 my-[25px] mx-auto border-collapse border-solid border-gray-200 font-sans shadow-table"
        style={{ borderBottom: "2px solid rgb(59,130,246)" }}
      >
        <Head columns={columns} />
        <tbody>
          {items.map((review) => (
            <DataRow key={review.id} item={review} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
