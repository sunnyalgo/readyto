import { flexRender, getCoreRowModel as getRowModel, useReactTable } from "@tanstack/react-table"
import { TableComponent } from "./Table.types"

const Table: TableComponent = ({ getCoreRowModel = getRowModel(), customClassName, ...props }) => {
  const table = useReactTable({
    ...props,
    columns: props.columns,
    getCoreRowModel: getCoreRowModel,
  })

  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        {table.getHeaderGroups().map(headerGroup => (
          <tr className="" key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id} className="px-6 py-3">
                {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className="">
        {table.getRowModel().rows.map(row => {
          return (
            <tr key={row.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="p-4">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default Table
