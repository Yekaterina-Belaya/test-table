import { Table } from "@/components/ui/Table/Table";
import { InputSearch } from "@/components/ui/InputSearch/InputSearch";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button/Button";
import { createColumnHelper, getCoreRowModel, getPaginationRowModel, SortingState } from "@tanstack/react-table";
import Modal from "@/components/ui/Modal/Modal";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { FormControl } from "@/components/ui/FormControl/FormControl";
import InputText from "@/components/ui/InputText/InputText";
import styles from './HomePage.module.scss'
import { formatPrice } from "@/utils/formatPrice";
import Icon from "@/components/ui/Icon/Icon";
import { InputCheckbox } from "@/components/ui/InputCheckbox/InputCheckbox";
import { toast } from "sonner";
import { ProgressBar } from "@/components/ui/ProgressBar/ProgressBar";
import { useProducts } from "@/hooks/useProducts";
import { TProduct } from "@/types/home";
import { useAddProduct } from "@/hooks/useAddProduct";

type TFormInput = {
  title: string
  price: number
  brand: string
  sku: string
}

export const HomePage = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [search, setSearch] = useState<string>('');
  const [rowSelection, setRowSelection] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const apiSort = useMemo(() => ({
  sortBy: sorting[0]?.id || 'title',
  order: (sorting[0]?.desc ? 'desc' : 'asc') as 'asc' | 'desc'
}), [sorting]);

  const { data, isLoading,  } = useProducts({
    search: search,
    sort: apiSort
  });

  const { mutate } = useAddProduct();

  const { control, handleSubmit, reset } = useForm<TFormInput>({
    defaultValues: {
      title: '',
      price: 0,
      brand: '',
      sku: ''
    }
  })
  
  const handleSearch = (v:string) => {
    setSearch(v);
  }

  const handleResetTable = () => {
    setSearch('');
    setSorting([]);
    setRowSelection({});
  }

  const handleOpenModal = () => {    
    setIsModalOpen(true)
  }

    const handleCloseModal = () => {    
    setIsModalOpen(false)
    reset()
  }

  const onSubmit: SubmitHandler<TFormInput> = (item) => {
      mutate(item as TProduct, {
      onSuccess: () => {
        reset();
        setIsModalOpen(false);
        toast.success('Успешно', {
          description: 'Товар добавлен в систему',
        });
      },
      onError: () => {
        toast.error('Ошибка', {
          description: ' не удалось добавить товар',
        });
      }
    })
  }

const columnHelper = createColumnHelper<TProduct>()

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
        <div className={styles.imgstub}>{row.original.images?.length ? <img src={row.original.images[0]} alt={row.original.title} /> : null}</div>
        <div>
          <p>{row.original.title}</p>
          <p>{row.original.category}</p>
        </div>
      </div>
    )
  }),
  columnHelper.accessor('brand', {
  header: 'Вендор',
  cell: (products) => {
    const vendorName = products.getValue();
    
    return (
      <div className={styles.brand}>
        <span>{vendorName}</span>
      </div>
    );
  },
}),
  columnHelper.accessor('sku', {
    header: 'Артикул',
    cell: products => products.getValue()
  }),
  columnHelper.accessor('rating', {
  header: 'Оценка',
  cell: (products) => {
    const points = products.getValue();
    
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
    cell: (products) => {
      const price = products.getValue();
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
    cell: () => (
      <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
        <Button type="button" level="primary" size="large" icon="plus" shape="rounded"></Button>
        <Icon name="dots" className={styles.menuBtn}></Icon>
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
    <ProgressBar isFetching={isLoading}></ProgressBar>
    <section className={`${styles.section} ${styles.content}`}>
      <Table
        data={data?.products ?? []} 
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
        onClose={() => handleCloseModal()} 
        title="Настройки профиля"
      >
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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

                      <Controller name="brand" control={control} render={({field,fieldState}) => 
              <FormControl error={fieldState.error?.message}>
                <InputText type="text" label="Вендор" clearable {...field}></InputText>
              </FormControl>
            }></Controller>

                      <Controller name="sku" control={control} render={({field,fieldState}) => 
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