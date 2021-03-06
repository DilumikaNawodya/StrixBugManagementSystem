
import React, { useState, useEffect } from 'react'
import { useTable, useSortBy, useFilters } from "react-table";
import { useExportData } from "react-table-plugins";
import JsPDF from "jspdf";
import "jspdf-autotable";
import Papa from "papaparse";
import XLSX from "xlsx";
import { BsDownload } from 'react-icons/bs';
import { Card, NavDropdown, Badge } from 'react-bootstrap'
import { FaFilePdf, FaFileExcel, FaFileCsv } from 'react-icons/fa';
import API from '../../../../Services/Base';

function AlldataTable(props) {
  const [devT, devTstate] = useState([])
  

  async function getData() {
    try {
      const response = await API.get("/Dev_timesheet/")
      const res = response.data;
      devTstate(res)
      props.loading()
    } catch (error) {
      props.loading()
      props.error()
      props.message(error.response.data.detail)    
    }
  }

  useEffect(() => {
    getData()
  }, []);


  const columns = React.useMemo(
    () => [

      {
        Header: 'Project',
        accessor: 'project_name'
      },
      {
        Header: 'Date',
        accessor: 'date'
      },

      {
        Header: 'User Name',
        accessor: 'developer_name'
      },
      {
        Header: 'Ticket ID',
        accessor: 'ticket'
      },
      {
        Header: 'Issue Title',
        accessor: 'issue_title'
      },
      {
        Header: 'Daily Effort',
        accessor: 'dailyeffort',
      },
    ],[]
  );

  return (
    <div>
      <Card>
        <Table className="" columns={columns} data={devT} />
      </Card>
    </div>
  )
}

export default AlldataTable

function getExportFileBlob({ columns, data, fileType, fileName }) {
  if (fileType === "csv") {
    // CSV example
    const headerNames = columns.map((col) => col.exportValue);
    const csvString = Papa.unparse({ fields: headerNames, data });
    return new Blob([csvString], { type: "text/csv" });
  } else if (fileType === "xlsx") {
    // XLSX example

    const header = columns.map((c) => c.exportValue);
    const compatibleData = data.map((row) => {
      const obj = {};
      header.forEach((col, index) => {
        obj[col] = row[index];
      });
      return obj;
    });

    let wb = XLSX.utils.book_new();
    let ws1 = XLSX.utils.json_to_sheet(compatibleData, {
      header,
    });
    XLSX.utils.book_append_sheet(wb, ws1, "React Table Data");
    XLSX.writeFile(wb, `${fileName}.xlsx`);

    // Returning false as downloading of file is already taken care of
    return false;
  }
  //PDF example
  if (fileType === "pdf") {
    const headerNames = columns.map((column) => column.exportValue);
    const doc = new JsPDF();
    doc.autoTable({
      head: [headerNames],
      body: data,
      margin: { top: 20 },
      styles: {
        minCellHeight: 9,
        halign: "left",
        valign: "center",
        fontSize: 11,
      },
    });
    doc.save(`${fileName}.pdf`);

    return false;
  }

  // Other formats goes here
  return false;
}

function Table({ columns, data }) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    exportData,

  } = useTable(
    {
      columns,
      data,
      getExportFileBlob,

    },
    useFilters,
    useSortBy,
    useExportData
  );

  return (
    <>

      <div className="col-md-2 " style={{ float: 'right', marginTop: 10 }}>
        <NavDropdown title="Export" className="" id="basic-nav-dropdown">
          <NavDropdown.Item href="#"><BsDownload /> {' '}
            <span
              onClick={() => {
                exportData("pdf", true);
              }}
            >
              Export All as PDF
                                </span>{'  '}
            <FaFilePdf />
          </NavDropdown.Item>
          <NavDropdown.Item href="#"><BsDownload /> {' '}
            <span
              onClick={() => {
                exportData("csv", false);
              }}
            >
              Export All as CSV
                                </span>{'  '}
            <FaFileCsv />
          </NavDropdown.Item>
          <NavDropdown.Item href="#"><BsDownload />{' '}
            <span
              onClick={() => {
                exportData("xlsx", true);
              }}
            >
              Export All as xlsx
                                  </span>{'  '}
            <FaFileExcel />
          </NavDropdown.Item>

        </NavDropdown>

      </div>

      <table className="table" {...getTableProps()}>
        <thead className="thead-dark">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>
                  <span {...column.getSortByToggleProps()}>
                    {column.render("Header")}
                  </span>
                  <div>
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="shadow rounded" style={{ backgroundColor: "rgb(240, 240, 240)" }}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <br />
      <div style={{ margin: 20 }}>Showing the  results of {rows.length} rows</div>
    </>
  );
}

