import React from 'react'
import { useTable, usePagination } from 'react-table'
import { Container, Row, Col, Table, Card, Button, Popover, OverlayTrigger } from 'react-bootstrap'



function IssueTable({ columns, data }, props) {
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, 
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 1 },
    },
    usePagination
  )

  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Go to page</Popover.Title>
      <Popover.Content>
        <input
          type="number"
          defaultValue={pageIndex + 1}
          max={pageCount}
          min="1"
          onChange={e => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0
            gotoPage(page)
          }}
          style={{ width: '100px' }}
        />
      </Popover.Content>
    </Popover>
  );

  // Render the UI for your table
  return (
    <>

      <Card  style={{ width: "100%" }}>
        <Card.Body>
          <Container>
            <Row>
              <Col>
                <Button size="sm" variant="dark" onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                  {'<<'}
                </Button>{' '}
                <Button size="sm" variant="dark" onClick={() => previousPage()} disabled={!canPreviousPage}>
                  {'PREV'}
                </Button>{' '}
                <Button size="sm" variant="dark" onClick={() => nextPage()} disabled={!canNextPage}>
                  {'NEXT'}
                </Button>{' '}
                <Button size="sm" variant="dark" onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                  {'>>'}
                </Button>{' '}
              </Col>
              <Col>
                <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                  <Button size="sm" variant="secondary">
                    Page{' '}
                    <strong>
                      {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                  </Button>
                </OverlayTrigger>

              </Col>
              <Col>
              </Col>
            </Row>
          </Container>
        </Card.Body>
      </Card>

      <Table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              <tr {...row.getRowProps()}onClick={()=>console.log()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </Table>
    </>


  )
}

export default IssueTable