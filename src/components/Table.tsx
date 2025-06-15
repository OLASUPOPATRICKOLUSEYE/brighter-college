const Table = ({
  columns,
  renderRow,
  data,
}: {
  columns: { header: string; accessor: string; className?: string }[];
  renderRow: (item: any) => React.ReactNode;
  data: any[];
}) => {
  return (
    <table className="w-full table-fixed border-collapse mt-4 min-w-[1000px]">
      <thead>
        <tr className="text-left text-gray-500 text-sm">
          {columns.map((col) => (
            <th
              key={col.accessor}
              className={`p-4 ${col.className || ""} whitespace-nowrap`}
            >
              {col.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{data.map((item) => renderRow(item))}</tbody>
    </table>
  );
};

export default Table;
