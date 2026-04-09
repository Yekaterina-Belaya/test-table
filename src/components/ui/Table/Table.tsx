import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  TableOptions,
  useReactTable,
} from '@tanstack/react-table';
import styles from './Table.module.scss';
import Icon from '../Icon/Icon';

type TProps<T> = Omit<TableOptions<T>, 'getCoreRowModel' | 'getSortedRowModel'> & {};

export const Table = <T extends object>({
  columns,
  data: externalData,
  ...tableOptions
}: TProps<T>) => {
  const table = useReactTable({
    data: externalData ?? [],
    columns,
    ...tableOptions,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableSortingRemoval: true,
  });

  const headers = table.getHeaderGroups();
  const { rows } = table.getRowModel();

  const { pageIndex, pageSize } = table.getState().pagination;
  const totalRows = table.getFilteredRowModel().rows.length;

  const firstIndex = pageIndex * pageSize + 1;

  const lastIndex = Math.min(firstIndex + pageSize - 1, totalRows);

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead className={styles.header}>
          {headers.map((headerGroup) => (
            <tr key={headerGroup.id} className={styles.row}>
              {headerGroup.headers.map((header) => (
                <th
                  onClick={header.column.getToggleSortingHandler()}
                  key={header.id}
                >
                  <div
                    className={`${styles.headerContent} ${styles.cell} ${styles.sort}`}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}

                    <span className={styles.sortIcon}>
                      {{
                        asc: <Icon name="sortAsc" />,
                        desc: <Icon name="sortDesc" />,
                      }[header.column.getIsSorted() as 'asc' | 'desc'] ??
                        (header.column.getCanSort() ? (
                          <Icon name="sortDefault" />
                        ) : null)}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.id}
              className={`${row.getIsSelected() ? styles.selectedRow : ''} ${styles.row}`}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  <div className={styles.cell}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.pagesWrapper}>
        {(() => {
          if (totalRows === 0)
            return <p className={styles.pagesInfo}>Нет данных</p>;

          return (
            <p className={styles.pagesInfo}>
              Показано <span>{firstIndex}</span>—<span>{lastIndex}</span> из{' '}
              <span>{totalRows}</span>
            </p>
          );
        })()}

        <div className={styles.paginationWrapper}>
          <button
            className={styles.chevron}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <Icon name="caretLeft"></Icon>
          </button>
          <div className={styles.pagesWrappper}>
            {Array.from({ length: table.getPageCount() }, (_, i) => i).map(
              (pageIndex) => (
                <span
                  key={pageIndex}
                  className={`${styles.pageBtn} ${
                    table.getState().pagination.pageIndex === pageIndex
                      ? styles.pageBtnActive
                      : ''
                  }`}
                  onClick={() => table.setPageIndex(pageIndex)}
                >
                  {pageIndex + 1}
                </span>
              )
            )}
          </div>
          <button
            className={styles.chevron}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <Icon name="caretRight"></Icon>
          </button>
        </div>
      </div>
    </div>
  );
};
