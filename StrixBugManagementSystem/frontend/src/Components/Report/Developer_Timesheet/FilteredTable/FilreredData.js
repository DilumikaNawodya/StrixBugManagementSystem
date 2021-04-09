
import React, {useState,useEffect} from 'react'
import { useTable, useSortBy, useFilters, useRowSelect } from "react-table";
import { useExportData } from "react-table-plugins";
import Papa from "papaparse";
import XLSX from "xlsx";
import JsPDF from "jspdf";
import "jspdf-autotable";
import { useForm, Controller } from "react-hook-form";
import {BsDownload} from 'react-icons/bs';
import {RiDeleteBin6Line} from 'react-icons/ri';
import {GrProjects,GrFilter} from 'react-icons/gr';
import {MdTimer,MdQuestionAnswer,MdDeveloperBoard} from 'react-icons/md';
import {FaFilePdf,FaFileExcel,FaFileCsv} from 'react-icons/fa';
import {CgCalendarDates} from 'react-icons/cg'
import {FaBuromobelexperte} from 'react-icons/fa'
import { Card ,Button, NavDropdown, Collapse,Badge,Modal, Row} from 'react-bootstrap'
import DatePicker from 'react-datepicker';
import AsyncSelect from 'react-select/async';
import {IoMdArrowDropdown} from 'react-icons/io'
import API from '../../../../Services/Base';

function FilreredData() {

    const [submittedData, setSubmittedData] = useState([]);
    const { handleSubmit, register, control, errors, watch } = useForm();
    const { startDate, endDate } = watch(["startDate", "endDate"]);
      
    const [final, setFinal] = useState([])
  
    const [cn,setCn] = useState(0)
    const [hCon, setHcon] = useState(0)

  //--------------Data Not Avaliable Status --------------------------------
    const [nodata, setNodata] = useState(false)
    const noddataHandle = () => setNodata(false);
      
  // ---------------------Developer Dropdwon list----------------------------
    const [inputValue, setValue] = useState('');
    const [selectedValue, setSelectedValue] = useState([]);

  //------------------Modal for delete rows--------------------------------
    
     const [show, setShow] = useState(false);

     const handleClose = () => setShow(false);
     const handleShow = () => setShow(true);
  
  //------------------ useState for get Project for the dropdown-----------
    const [project, setProject] = useState([])

    const [devP, setdevP] = useState([])
    
      // handle input change event
      const handleInputChange = value => {
        setValue(value);
      };
    
      // handle selection
      const handleChange = value => {
        setSelectedValue(value);
      }
    
      // load options using API call
      const loadOptions = (inputValue) => {
        return fetch(`http://127.0.0.1:8000/Dev_Users?userId=${inputValue}`)
        .then(res => res.json());
      };
    // set value for default selection
  
//--------------------------------------------------------------------------------

    const [devT, devTstate] = useState([])

    useEffect(() => {
      const getData = async () =>{
          const response = await fetch(
              "http://127.0.0.1:8000/Dev_Table/"
          );
          const res = await response.json();
          console.log(res)
            devTstate(res)
      }
    
        getData();
    }, []);
    
    //===============================Filtering by date and Developer name and Project===============================
    //-------------------------------------Onsubmit function for get form data--------------------------------------

    const onSubmit = (data) => {
        setSubmittedData(data);

        const postdata = { 
          "projectid": data.projectid ,
          "devid" : data.devDropDown == null ? []: data.devDropDown.map(e=> e.id) ,
          "from": data.startDate == null ? null : data.startDate,
           "to": data.endDate == null ? null : data.endDate,
      };
      const headers = { 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
         
      };
      API.post('/Dev_timesheet/', postdata, { headers })
          .then(function(response){
            setFinal(response.data.data)
            if(response.data.data.length ==0){
                setNodata(true)
            }
          })
          .catch((error) => console.log(error));  
  }
  // let devDrop = submittedData["devDropDown"]
  
      let dailyEffort = final.map(e=> e.dailyeffort) 
      let totalHours_count =0;

          for(let i=0; i<dailyEffort.length; i++){
            totalHours_count = totalHours_count +dailyEffort[i];
          }

//----------Calculating highest and Lowest Contributions on Dailyeffort ----------
      let sortDev = dailyEffort.sort((a,b)=>b-a);
      let highestCon= sortDev[0];
      let lowestCon = sortDev[dailyEffort.length-1]
          
    const [open, setOpen] = useState(false);

//---------------Defining Columns in the timesheet table ------------------------
    const columns = React.useMemo(
        () => [
               
        {
            Header:'Project',
            accessor: 'project_name'
        },
        {
          Header:'Date',
          accessor: 'date'
        },
     
        {
            Header:'User Name',
            accessor: 'developer_name'
        },
        {
          Header:'Ticket ID',
          accessor: 'ticket'
        },
        {
          Header:'Issue Title',
          accessor: 'issue_title'
        },
        {
            Header:'Daily Effort',
            accessor: 'dailyeffort',
            
        },
        ],
        [final.data]
      );

      const RemoveRows = ()=>{
              const dataCopy = [final];
     //----------------- Deleting All the rows-----------------------------       
              dataCopy.splice(final.original );
              setFinal(dataCopy);
              console.log(dataCopy)
              setShow(false);
              setCn(0);
              setHcon(0);         
      }

      useEffect(() => {
        const getData = async () =>{
            const response = await fetch(
                " http://127.0.0.1:8000/Dev_Users/"
            );
            const res = await response.json();
            console.log(res)
            setdevP(res)   
        }
          getData();
      }, []);


      useEffect(() => {
        const getData = async () =>{
            const response = await fetch(
                "http://127.0.0.1:8000/Projects/"
            );
            const res = await response.json();
            console.log(res)
              setProject(res)    
        }
          getData();
      }, []);
     
    return (
        <div>
          <Card className="shadow p-3 mb-5  rounded" style={{marginTop:20,backgroundColor:"rgb(240, 240, 240)"}}>
            {/* ----------Form for collect the filter data-------------- */}
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row" >
                   <div className="col-md-3"> 
                      <p><MdDeveloperBoard/>{" "}<b>Developer</b></p> 
                          <Controller
                              as={
                              <AsyncSelect 
                              className="dropdown"
                              placeholder="Select DevID"
                              cacheOptions
                              defaultOptions
                              value={selectedValue}
                              getOptionLabel={e => e.username}
                              getOptionValue={e => e.id}
                              loadOptions={loadOptions}
                              onInputChange={handleInputChange}
                              onChange={handleChange}
                              isMulti
                              isClearable
                              />
                          }
                              name="devDropDown"
                              control={control}
                              valueName="selected"
                            />
                            <br/>
                            <p><GrProjects/>{ " "}<b>Select Project</b></p>
                            <select ref={register} name="projectid" placeholder="Select "  className=" shadow-sm rounded form-control" style={{width:200}}>
                                    <option value="None"></option>
                                    <option value="All">All</option>
                                    {project.map(e=> {
                                        return(
                                            <>
                                            <option value={e.id} style={{padding:10}}>{e.projectname}</option>
                                            </>
                                        )
                                    })}
                            </select>
                    </div>
                      <div className="col-md-2">
                        <div className="col">
                          <CgCalendarDates/> <b>From</b><IoMdArrowDropdown/> <br/>
                            <center>
                              <div className="form-section" style={{marginTop: 20}}>
                                <Controller
                                  as={
                                      <DatePicker
                                          id="startDate"
                                          selected={startDate}
                                          dateFormat='yyyy/MM//dd'
                                          selectsStart
                                          startDate={startDate}
                                          endDate={endDate}
                                          isClearable
                                          maxDate={ new Date()}
                                          showYearDropdown
                                          scrollableMonthYearDropdown
                                      />
                                  }
                                  name="startDate"
                                  control={control}
                                  valueName="selected"
                                  />
                              </div>    
                            </center>                    
                          </div>
                        </div>
                            <div className="col">
                              <CgCalendarDates/>  <b>To</b> <IoMdArrowDropdown/>
                                <center>
                                  <div className="form-section" style={{marginTop: 20}}>
                                      <Controller
                                      as={
                                          <DatePicker
                                              id="endDate"
                                              selected={endDate}
                                              dateFormat='yyyy/MM//dd'
                                              selectsEnd
                                              startDate={startDate}
                                              endDate={endDate}
                                              isClearable
                                              showYearDropdown
                                              scrollableMonthYearDropdown
                                              maxDate={ new Date()}
                                          />
                                      }
                                      name="endDate"
                                      control={control}
                                      valueName="selected"
                                      />
                                  </div>
                                </center>
                              </div>
                        <div className="col-md-3" style={{margin:20}}>
                            <Card className="shadow-sm p-3 mb-5 bg-white rounded">
                              <h5>Total Hours : {''}  
                                <Badge pill variant="success">
                                  {totalHours_count}  {' '} hrs {' '}  <MdTimer/>
                                </Badge>{' '}
                              </h5>
                              <p>Highest Contribution : {''} 
                                <Badge pill variant="warning">
                                  {highestCon} {' '} hrs  {' '}  <MdTimer/>
                                </Badge>{' '} 
                              </p>
                              <p>Lowest Contribution : {''} 
                                <Badge pill variant="primary">
                                  {lowestCon} {' '} hrs  {' '}  <MdTimer/>
                                  </Badge>
                              </p>
                              <Button className="btn-danger" onClick={handleShow} >Delete All Rows{" "}  <RiDeleteBin6Line/></Button>
                            </Card>
                                <Modal
                                    show={show}
                                    onHide={noddataHandle}
                                    backdrop="static"
                                    keyboard={false}
                                  >
                                  <Modal.Header closeButton>
                                      <Modal.Title className="text-white">Are You Sure{' '}<b>?</b> </Modal.Title>
                                  </Modal.Header>
                                  <Modal.Body>
                                    <MdQuestionAnswer/>{' '}<b>Developer Timesheet</b><br/>
                                      <center><h1><FaBuromobelexperte size={30}/></h1></center>
                                    This will remove all the filtered rows in the table. Do you want to continue?
                                  </Modal.Body>
                                  <Modal.Footer>
                                      <Button variant="danger" onClick={handleClose}>
                                        Close
                                      </Button>
                                      <Button variant="white" onClick={RemoveRows}>Confirm</Button>
                                  </Modal.Footer>
                                </Modal>
                        </div>
                        <div className="col-md-2"> 
                              <center>
                              <button type="submit"  className="btn btn-info " style={{float: 'right', marginTop:30}} style={{margin:3}} >
                               Filter
                              </button>
                                  <Modal
                                      show={nodata}
                                      onHide={noddataHandle}
                                      backdrop="static"
                                      keyboard={false}
                                      className="rounded"
                                    >
                                      <Modal.Body>
                                        <center> <h1>  Oops</h1><hr/><br/> <FaBuromobelexperte size={50}/>
                                            <h2><b>DATA NOT AVALIABLE</b></h2>
                                            <h3> for the requested filters</h3>
                                          </center>
                                      </Modal.Body>
                                        <center> <Button variant="dark" onClick={noddataHandle}>OK </Button></center>
                                  </Modal>
                              </center>
                        </div>
                    </div>
                  </form>

                </Card>
                      <Card className="shadow-lg p-3 mb-5 bg-white rounded">
                              <Table className="" columns={columns} data={final} />
                          <Collapse in={open}>
                            <div id="example-collapse-text" >
                              <Badge pill variant="primary">
                                  Add required filters       
                              </Badge>{' '}
                            </div>
                        </Collapse>
                      
                      </Card>
        </div>
    )
}

export default FilreredData;

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
        function DefaultColumnFilter({
          column: { filterValue, preFilteredRows, setFilter },
        }) {
          const count = preFilteredRows.length;
        
          return (
            <input
              value={filterValue || ""}
              onChange={(e) => {
                setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
              }}
              placeholder={`Search ${count} records...`}
            />
          );
        }
        
        const defaultColumn = {
          Filter: DefaultColumnFilter,
        };

        const Checkbox = React.forwardRef(
          ({ indeterminate, ...rest }, ref) => {
            const defaultRef = React.useRef()
            const resolvedRef = ref || defaultRef
        
            React.useEffect(() => {
              resolvedRef.current.indeterminate = indeterminate
            }, [resolvedRef, indeterminate])
        
            return (
              <>
                <input type="checkbox" ref={resolvedRef} {...rest} />
              </>
            )
          }
        )

        const Genres = ({ values }) => {
          // Loop through the array and create a badge-like component instead of a comma-separated string
          return (
            <>
              {values.map((genre, idx) => {
                return (
                  <span key={idx} className="badge">
                    {genre}
                  </span>
                );
              })}
            </>
          );
        };
        
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
        defaultColumn,
        getExportFileBlob,
        
      },
      useFilters,
      useSortBy,
      useExportData,
      useRowSelect,
    );

  
    return (
      <>
      
      <div className="col-md-2" style={{float: 'left', marginTop: 10}}>
                      
                          <NavDropdown title="Export"  className="" id="basic-nav-dropdown">
                         
                          <NavDropdown.Item href="#"><BsDownload />{' '}
                              <span
                               onClick={() => {
                                exportData("pdf", false);
                              }}
                            >
                              Export Current View as PDF 
                              </span>{'  '}
                              <FaFilePdf/>
                          </NavDropdown.Item>
                          <NavDropdown.Item href="#"><BsDownload />  { ' '}
                          <span
                            onClick={() => {
                              exportData("csv", false);
                            }}
                          >
                            Export Current View as CSV
                          </span>{'  '}
                         < FaFileCsv/>
                          </NavDropdown.Item>
                          
                          <NavDropdown.Item href="#"><BsDownload /> {' '}
                              <span
                               onClick={() => {
                                exportData("xlsx", false);
                              }}
                            >
                              Export Current View as xlsx
                              </span>{'  '}
                              <FaFileExcel/>
                          </NavDropdown.Item>
                          
                          </NavDropdown>
                          { ' ' }  
      </div>
        <table className="table " {...getTableProps()}>
              <thead className="thead-dark">
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()} >
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
              <tbody {...getTableBodyProps()} className="" style={{backgroundColor:"rgb(240, 240, 240)"}}>
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
      </>
    );
  }