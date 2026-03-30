import { Table } from "@/components/ui/Table/Table";
import { InputSearch } from "@/components/ui/InputSearch/InputSearch";
import { useMemo, useState } from "react";
import { tableMockData } from "@/data/TableMockData";
import { Button } from "@/components/ui/Button/Button";
import { createColumnHelper, getCoreRowModel, getPaginationRowModel, SortingState } from "@tanstack/react-table";
import { RowData } from "@/types/home";
import Modal from "@/components/ui/Modal/Modal";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { FormControl } from "@/components/ui/FormControl/FormControl";
import InputText from "@/components/ui/InputText/InputText";
import styles from './HomePage.module.scss'
import { formatPrice } from "@/utils/formatPrice";
import Icon from "@/components/ui/Icon/Icon";
import { InputCheckbox } from "@/components/ui/InputCheckbox/InputCheckbox";

interface IFormInput {
  title: string
  price: number
  vendor: string
  article: string
}

export const HomePage = () => {
  const [data, setData] = useState<RowData[]>(tableMockData);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [search, setSearch] = useState<string>('');
  const [rowSelection, setRowSelection] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

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

    const { control, handleSubmit, reset } = useForm<IFormInput>({
      defaultValues: {
        title: '',
        price: 0,
        vendor: '',
        article: ''
      }
    })
  
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

  const handleOpenModal = () => {
    console.log('modal');
    
    setIsModalOpen(true)
  }

  const onSubmit: SubmitHandler<IFormInput> = (item) => {
      setData((prev) => [...prev, item])
      setIsModalOpen(false)
      reset()

      console.log(filteredData)
    }

const columnHelper = createColumnHelper<RowData>()

const columns = [
  columnHelper.display({
    id: 'select',
    header: ({table}) => (
      <InputCheckbox value={table.getIsAllRowsSelected()} onChange={table.getToggleAllRowsSelectedHandler()}></InputCheckbox>
    ),
    cell: ({row}) => (
      <InputCheckbox value={row.getIsSelected()} onChange={row.getToggleSelectedHandler()}></InputCheckbox>
    )
  }),
  columnHelper.accessor('title', {
    header: 'Наименование',
    cell: ({row}) => (
      <div className={styles.info}>
        <div className={styles.imgstub}>{row.original.img ? <img src={row.original.img} alt={row.original.title} /> : null}</div>
        <div>
          <p>{row.original.title}</p>
          <p>{row.original.category}</p>
        </div>
      </div>
    )
  }),
  columnHelper.accessor('vendor', {
  header: 'Вендор',
  cell: (data) => {
    const vendorName = data.getValue();
    
    return (
      <div className={styles.vendor}>
        <span>{vendorName}</span>
      </div>
    );
  },
}),
  columnHelper.accessor('article', {
    header: 'Артикул',
    cell: data => data.getValue()
  }),
  columnHelper.accessor('rating', {
  header: 'Оценка',
  cell: (data) => {
    const points = data.getValue();
    
    const statusClass = points && points < 3.5 ? styles.outsider : '';

    return (
      <div className={statusClass}>
        <span>{points}/5</span>
      </div>
    );
  },
}),
  columnHelper.accessor('price', {
    header: 'Цена, ₽',
    cell: (data) => {
      const price = data.getValue();
      const formatted = formatPrice(price);

      return (
        <p className={styles.price}>
          <span>{formatted.whole}</span>
          <span>,{formatted.rest}</span>
        </p>
      )
    }
  }),
  columnHelper.display({
    id: 'actions',
    cell: ({row}) => (
      <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
        <Button type="button" level="primary" size="large" icon="plus" shape="rounded" onClick={() => console.log('Add', row.original)}></Button>
        <Icon name="dots" className={styles.menuBtn} onClick={() => console.log('Menu', row.original)
        }></Icon>
        </div>
    )
  })
]

  return (
  <div>
    <section className={`${styles.section} ${styles.header}`}>
      <h1>Товары</h1>
      <InputSearch onSearchChange={handleSearch} value={search}></InputSearch>
    </section>
    <section className={`${styles.section} ${styles.title}`}>
      <h2>Все позиции</h2>
      <div style={{display: 'flex', alignItems: 'center', marginLeft: 'auto', gap: 8}}>
        <Button icon="arrowsClockwise" onClick={handleResetTable}></Button>
        <Button icon="plusCircle" text="Добавить" level="primary" onClick={() => handleOpenModal()}></Button>
      </div>
    </section>
    <section className={`${styles.section} ${styles.content}`}>
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
    </section>
    <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Настройки профиля"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.fields}>
          <Controller name="title" control={control} render={({field,fieldState}) => 
              <FormControl error={fieldState.error?.message}>
                <InputText type="text" label="Наименование" clearable {...field}></InputText>
              </FormControl>
            }></Controller>

                      <Controller name="price" control={control} render={({field,fieldState}) => 
              <FormControl error={fieldState.error?.message}>
                <InputText type="text" label="Цена" clearable {...field}></InputText>
              </FormControl>
            }></Controller>

                      <Controller name="vendor" control={control} render={({field,fieldState}) => 
              <FormControl error={fieldState.error?.message}>
                <InputText type="text" label="Вендор" clearable {...field}></InputText>
              </FormControl>
            }></Controller>

                      <Controller name="article" control={control} render={({field,fieldState}) => 
              <FormControl error={fieldState.error?.message}>
                <InputText type="text" label="Артикул" clearable {...field}></InputText>
              </FormControl>
            }></Controller>
            </div>

            <Button size="large" type="submit" level="primary" onClick={handleSubmit} text="Добавить" styleProps={{marginLeft: 'auto', marginRight: 'auto', marginTop: 20, width: '100%', justifyContent: 'center'}}></Button>
        </form>
      </Modal>
  </div>
  );
};