import { Table } from "@/components/ui/Table/Table";
import { InputSearch } from "@/components/ui/InputSearch/InputSearch";
import { useMemo, useState } from "react";
import { tableMockData } from "@/data/TableMockData";
import { Button } from "@/components/ui/Button/Button";
import { createColumnHelper, getCoreRowModel, getPaginationRowModel, SortingState } from "@tanstack/react-table";
import { RowData } from "@/types/home";

export const HomePage = () => {
  const [data, setData] = useState<RowData[]>(tableMockData);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [search, setSearch] = useState<string>('');
  const [rowSelection, setRowSelection] = useState({});

  const filteredData = useMemo(() => {
    const lowSearch = search.toLowerCase().trim();
    
    if (!lowSearch) return data;

    return data.filter((item) => {
      return (
        item.title.toLowerCase().includes(lowSearch) ||
        item.article.toLowerCase().includes(lowSearch)
      );
    });
  },[search, data])
  
  const handleSearch = (v:string) => {
    setSearch(v);

    if (search != search) {
      const result = data.filter((item:RowData) => item.title.toLowerCase().includes(v.toLowerCase()) ||
      item.article.toLowerCase().includes(v.toLowerCase()))

      setData(result)
    }
    
  }

  const handleResetTable = () => {
    console.log('reset');
  }

  const handleAddItem = () => {
    console.log('add');
  }

const columnHelper = createColumnHelper<RowData>()

const columns = [
  columnHelper.display({
    id: 'select',
    header: ({table}) => (
      <input type="checkbox" checked={table.getIsAllRowsSelected()} onChange={table.getToggleAllRowsSelectedHandler()}/>
    ),
    cell: ({row}) => (
      <input type="checkbox" checked={row.getIsSelected()} onChange={row.getToggleSelectedHandler()} />
    )
  }),
  columnHelper.accessor('title', {
    header: 'Наименование',
    cell: ({row}) => (
      <div>
        <div>{row.original.img ? <img src={row.original.img} alt={row.original.title} /> : null}</div>
        <div>
          <p>{row.original.title}</p>
          <span>{row.original.category}</span>
        </div>
      </div>
    )
  }),
  columnHelper.accessor('vendor', {
    header: 'Вендор',
    cell: data => data.getValue()
  }),
  columnHelper.accessor('article', {
    header: 'Артикул',
    cell: data => data.getValue()
  }),
  columnHelper.accessor('rating', {
    header: 'Оценка',
    cell: data => data.getValue()
  }),
  columnHelper.accessor('price', {
    header: 'Цена',
    cell: data => data.getValue()
  }),
  columnHelper.display({
    id: 'actions',
    cell: ({row}) => (
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button type="button" level="primary" size="large" icon="plusCircle" shape="rounded" onClick={() => console.log('Add', row.original)
        }></Button>
        <Button type="button" level="secondary" size="large" icon="dots" shape="rounded" onClick={() => console.log('Menu', row.original)
        }></Button>
        </div>
    )
  })
]

  return (
  <section>
    <div style={{display: 'flex', alignItems: 'center'}}>
      <h1>Товары</h1>
      <InputSearch onSearchChange={handleSearch} value={search}></InputSearch>
    </div>
    <div style={{display: 'flex', alignItems: 'baseline'}}>
      <h2>Все позиции</h2>
      <div style={{display: 'flex', alignItems: 'center', marginLeft: 'auto', gap: 8}}>
        <Button icon="arrowsClockwise" onClick={handleResetTable}></Button>
        <Button icon="plusCircle" text="Добавить" level="primary" onClick={handleAddItem}></Button>
      </div>
    </div>
    <div>
      <Table 
        data={filteredData} 
        columns={columns} 
        state={{
            sorting,
            rowSelection,
          }}
        onSortingChange={setSorting}
        onRowSelectionChange={setRowSelection}
        getCoreRowModel={getCoreRowModel()}
        getPaginationRowModel={getPaginationRowModel()} initialState={{
        pagination: {
          pageSize: 5
        },
      }}></Table>
    </div>
  </section>
  );
};