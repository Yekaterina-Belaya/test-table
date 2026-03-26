import { flexRender, getSortedRowModel, TableOptions, useReactTable } from "@tanstack/react-table";
import styles from './Table.module.scss'

type Props<T> = {} & TableOptions<T>;

export const Table = <T extends object,>({...rest}:Props<T>) => {
    const table = useReactTable({
    ...rest,
    getSortedRowModel: getSortedRowModel(),
    enableSortingRemoval: true,
  });

  const headers = table.getHeaderGroups();
  const { rows } = table.getRowModel();

    return (
        <div className={styles.wrapper}>
            <table className={styles.table}>
                <thead className={styles.header}>
                    {headers.map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th className={styles.cell} key={header.id} onClick={header.column.getToggleSortingHandler()}>
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                    {{
                                      asc: ' 🔼',
                                      desc: ' 🔽',
                                    }[header.column.getIsSorted() as string] ?? null} 
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {
                      rows.map(row => (
                          <tr key={row.id} className={row.getIsSelected() ? 'selected' : ''}>
                              {row.getVisibleCells().map(cell => (
                                  <td className={styles.cell} key={cell.id}>
                                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                  </td>
                              ))}
                          </tr>
                      ))
                    }
                </tbody>
            </table>

            <div className="flex items-center gap-2 mt-4">
        <button
          className="border p-1 disabled:opacity-50"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className="border p-1 disabled:opacity-50"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Назад
        </button>
        <button
          className="border p-1 disabled:opacity-50"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Вперед
        </button>
        <button
          className="border p-1 disabled:opacity-50"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>

        <span className="flex items-center gap-1">
          <div>Страница</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} из{' '}
            {table.getPageCount()}
          </strong>
        </span>

        <select
          value={table.getState().pagination.pageSize}
          onChange={e => {
            table.setPageSize(Number(e.target.value))
          }}
        >
          {[5, 10, 20].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Показать {pageSize}
            </option>
          ))}
        </select>
        </div>
        </div>
    )
}