import type { Column, SortFields } from "~/utils/types";
import HeaderCell from "../NewHeaderCell";
import NameHeader from "../NameHeader/NameHeader";

type HeaderRowProps = {
  columns: Column[];
  handleSortingChange: (field: SortFields) => void;
};

export default function HeaderRow({
  columns,
  handleSortingChange,
}: HeaderRowProps) {
  return (
    <tr>
      <NameHeader
        column={columns[0]}
        handleSortingChange={handleSortingChange}
      />
      <HeaderCell
        column={columns[1]}
        index={1}
        // minWidth={185}
        classes=""
        handleSortingChange={handleSortingChange}
      />
      <HeaderCell
        column={columns[2]}
        index={2}
        // minWidth={160}
        classes=""
        handleSortingChange={handleSortingChange}
      />
      <HeaderCell
        column={columns[3]}
        index={3}
        // minWidth={225}
        classes=""
        handleSortingChange={handleSortingChange}
      />
      <HeaderCell
        column={columns[4]}
        index={4}
        // minWidth={240}
        classes=""
        handleSortingChange={handleSortingChange}
      />
      <HeaderCell
        column={columns[5]}
        index={5}
        // minWidth={125}
        classes=""
        handleSortingChange={handleSortingChange}
      />
      <HeaderCell
        column={columns[6]}
        index={6}
        // minWidth={110}
        classes=""
        handleSortingChange={handleSortingChange}
      />
      <HeaderCell
        column={columns[7]}
        index={7}
        // minWidth={110}
        classes=""
        handleSortingChange={handleSortingChange}
      />
      <HeaderCell
        column={columns[8]}
        index={8}
        // minWidth={110}
        classes=""
        handleSortingChange={handleSortingChange}
      />
      <HeaderCell
        column={columns[9]}
        index={9}
        // minWidth={110}
        classes=""
        handleSortingChange={handleSortingChange}
      />
      <HeaderCell
        column={columns[10]}
        index={10}
        // minWidth={110}
        classes=""
        handleSortingChange={handleSortingChange}
      />
      <HeaderCell
        column={columns[11]}
        index={11}
        // minWidth={110}
        classes=""
        handleSortingChange={handleSortingChange}
      />
      <HeaderCell
        column={columns[12]}
        index={12}
        // minWidth={110}
        classes=""
        handleSortingChange={handleSortingChange}
      />
      <HeaderCell
        column={columns[13]}
        index={13}
        // minWidth={110}
        classes=""
        handleSortingChange={handleSortingChange}
      />
      <HeaderCell
        column={columns[14]}
        index={14}
        // minWidth={110}
        classes=""
        handleSortingChange={handleSortingChange}
      />
    </tr>
  );
}
