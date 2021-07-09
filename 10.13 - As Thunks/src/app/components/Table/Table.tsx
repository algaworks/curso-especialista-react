import { transparentize } from 'polished'
import { TableInstance } from 'react-table'
import NoData from '../NoData/NoData'
import * as T from './Table.styles'
import { useEffect } from 'react'
import ReactPaginate from 'react-paginate'
import Icon from '@mdi/react'
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js'

interface TableProps<T extends object> {
  instance: TableInstance<T>
  onPaginate?: (newPage: number) => any
}

export default function Table<T extends object> ({
  instance,
  onPaginate
}: TableProps<T>) {
  const {
    getTableProps,
    getTableBodyProps,
    prepareRow,
    headerGroups,
    rows,
    pageCount,
    gotoPage,
    state: {
      pageIndex,
    }
  } = instance

  useEffect(() => {
    onPaginate &&
      onPaginate(pageIndex)
  }, [pageIndex, onPaginate])

  return (
    <>
    <T.Wrapper cellPadding={0} cellSpacing={0} {...getTableProps()}>
      <T.Heading>
        {
          headerGroups.map(headerGroup => (
            <T.HeadingRow {...headerGroup.getHeaderGroupProps()}>
              {
                headerGroup.headers.map(column => (
                  <T.HeadingCell {...column.getHeaderProps()}>
                    {column.render('Header')}
                  </T.HeadingCell>
                ))
              }
            </T.HeadingRow>
          ))
        }
      </T.Heading>
      <T.Body {...getTableBodyProps()}>
        {
          rows.map(row => {
            prepareRow(row)
            return <T.BodyRow {...row.getRowProps()}>
              {
                row.cells.map(cell => {
                  return <T.BodyCell {...cell.getCellProps()}>
                    { cell.render('Cell') }
                  </T.BodyCell>
                })
              }
            </T.BodyRow>
          })
        }
      </T.Body>
    </T.Wrapper>
    {
      !rows.length && <div style={{ backgroundColor: transparentize(0.95, '#274060') }}>
        <NoData height={360} />
      </div>
    }

    <T.TablePagination>
      <ReactPaginate
        pageCount={pageCount}
        onPageChange={page => gotoPage(page.selected)}
        marginPagesDisplayed={1}
        pageRangeDisplayed={4}
        nextLabel={<Icon path={mdiChevronRight} size={'16px'} />}
        previousLabel={<Icon path={mdiChevronLeft} size={'16px'} />}
      />
    </T.TablePagination>
    </>
  )
}