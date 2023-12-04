import { RowData, TableOptions } from "@tanstack/react-table"
import { ClassValue } from "clsx"

export type TableProps<T> = Partial<TableOptions<T>> &
  Required<Pick<TableOptions<T>, "columns" | "data">> & {
    customClassName?: ClassValue[] | ClassValue
  }

export type TableComponent = <T extends RowData>(props: TableProps<T>) => JSX.Element
