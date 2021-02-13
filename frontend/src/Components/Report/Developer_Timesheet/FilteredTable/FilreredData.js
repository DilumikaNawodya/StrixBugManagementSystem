
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
import {MdTimer,MdQuestionAnswer} from 'react-icons/md';
import {FaFilePdf,FaFileExcel,FaFileCsv} from 'react-icons/fa';
import { Card ,Button, NavDropdown, Collapse,Badge,Modal} from 'react-bootstrap'
import DatePicker from 'react-datepicker';
import AsyncSelect from 'react-select/async';
import {IoMdArrowDropdown} from 'react-icons/io'

function FilreredData() {

    const [submittedData, setSubmittedData] = useState([]);
    const { handleSubmit, register, control, errors, watch } = useForm();
    const { startDate, endDate } = watch(["startDate", "endDate"]);
      
     
      
  // ---------------------This is for the Developer Dropdwon list----------------------------
    const [inputValue, setValue] = useState('');
    const [selectedValue, setSelectedValue] = useState([]);
    
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
        return fetch(`http://127.0.0.1:8000/api/Dev_Users?userId=${inputValue}`).then(res => res.json());
      };
    // set value for default selection
  
    const [devT, devTstate] = useState([])

    useEffect(() => {
      const getData = async () =>{
          const response = await fetch(
              "http://127.0.0.1:8000/api/Dev_Table/"
          );
          const res = await response.json();
          console.log(res)
            devTstate(res)
      }
    
        getData();
    }, []);
    
     
    // console.log('Form Values', formik.values)
    //===============================Filtering by date and Developer name===============================
    
    const [final, setFinal] = useState([])
    const [cn,setCn] = useState()
    const [hCon, setHcon] = useState()
    const [lCon, setLcon] = useState()
    const onSubmit = (data) => {
        setSubmittedData(data);
        console.log(data);
    

    let developers = data.devDropDown
    console.log(developers)

    const f = devT.map(e=>e.date)
    const d = devT.map(e=>e.username)
    const id = devT.map(e=> e.user_id)
    const e = devT.map(e=> e.email)
    const da = devT.map(e=> e.dailyeffort)
    const fn = devT.map(e=> e.firstname)
    const ti = devT.map(e=> e.ticket_id)
    const tn = devT.map(e=>e.issuename)
    console.log(f)
    console.log(d)
    console.log(id + " "+ e + " " +da)
    let count =0
    let countF =0
    let daDev=[null]
        if( developers == null){
                          if(data.startDate == undefined && data.endDate == undefined ){

                            alert("Add Required Filters");
                        
                          }
                        else if(data.startDate==undefined){
                          for(let i = 0 ; i<f.length ;i++) {
                      
                            if(f[i] <= data.endDate.toISOString()){
                                console.log(f[i]+ " " + d[i])
                            let obj = {id: i,user_id: id[i], username:d[i], firstname:fn[i], dailyeffort:da[i],ticket_id:ti[i],issuename:tn[i], date:f[i]}
                             let arr = final.push(obj)
                            setFinal([ ...final,{
                                id : final.length,
                                value: arr
                            }])
                            console.log(final)
                            count =  count + da[i]
                            daDev[i]= da[i];
                            let sortDev = daDev.sort((a,b)=>b-a);
                            let hCon= sortDev[0];
                            setHcon(hCon);
                            console.log(sortDev);
                            }
                            setCn(count)
                            }
                        }else if(data.endDate==undefined){
                          for(let i = 0 ; i<f.length ;i++) {
                            if(f[i] >= data.startDate.toISOString()){
                                console.log(f[i]+ " " + d[i])
                            let obj = {id: i,user_id: id[i], username:d[i], firstname:fn[i], dailyeffort:da[i],ticket_id:ti[i],issuename:tn[i], date:f[i]}
                            let arr = final.push(obj)
                            setFinal([ ...final,{
                                id : final.length,
                                value: arr
                            }])
                            console.log(final)
                            count =  count + da[i]
                            daDev[i]= da[i];
                            let sortDev = daDev.sort((a,b)=>b-a);
                            let hCon= sortDev[0];
                            setHcon(hCon);
                            console.log(sortDev);
                        }
                        setCn(count)
                        }
                        }else{
                          for(let i = 0 ; i<f.length ;i++) {
                      
                            if(f[i]>= data.startDate.toISOString()  && f[i] <= data.endDate.toISOString()){
                                console.log(f[i]+ " " + d[i])
                               let obj = {id: i,user_id: id[i], username:d[i], firstname:fn[i], dailyeffort:da[i],ticket_id:ti[i],issuename:tn[i], date:f[i]}
                               let arr = final.push(obj)
                            setFinal([ ...final,{
                                id : final.length,
                                value: arr
                            }])
                            console.log(final)
                            count =  count + da[i]
                            daDev[i]= da[i];
                            let sortDev = daDev.sort((a,b)=>b-a);
                            let hCon= sortDev[0];
                            setHcon(hCon);
                            console.log(sortDev);
                        }
                        setCn(count)
                      }
                }
      }else if(data.startDate == undefined && data.endDate == undefined){
        for(let j=0; j<developers.length; j++){
       
          for(let i = 0 ; i<f.length ;i++) {
              if( d[i]=== developers[j].username){
                  console.log(f[i]+ " " + d[i])
              let obj = {id: i,user_id: id[i], username:d[i], firstname:fn[i], email:e[i], dailyeffort:da[i], ticket_id:ti[i],issuename:tn[i],date:f[i]}
              let arr = final.push(obj)
              setFinal([ ...final,{
                  id : final.length,
                  value: arr
              }])
              console.log(final)
              count =  count + da[i]
              daDev[i]= da[i];
              let sortDev = daDev.sort((a,b)=>b-a);
              let hCon= sortDev[0];
               setHcon(hCon);
              console.log(sortDev);
           }
          console.log(count + " " + hCon)  
            setCn(count)

        }
        }
      }else if( data.endDate == undefined){
        for(let j=0; j<developers.length; j++){
       
          for(let i = 0 ; i<f.length ;i++) {
              if(f[i]>= data.startDate.toISOString() && d[i]=== developers[j].username){
                  console.log(f[i]+ " " + d[i])
              let obj = {id: i,user_id: id[i], username:d[i], firstname:fn[i], email:e[i], dailyeffort:da[i], ticket_id:ti[i],issuename:tn[i],date:f[i]}
              let arr = final.push(obj)
              setFinal([ ...final,{
                  id : final.length,
                  value: arr
              }])
              console.log(final)
              count =  count + da[i]
              countF= countF+ da[j]
              daDev[i]= da[i];
              let sortDev = daDev.sort((a,b)=>b-a);
              let hCon= sortDev[0];
              setHcon(hCon);
             console.log(sortDev);
           }
          console.log(count + " " + hCon)  
            setCn(count)
        }
     }
      }else if( data.startDate == undefined){
        for(let j=0; j<developers.length; j++){
       
          for(let i = 0 ; i<f.length ;i++) {
              if(f[i]<= data.endDate.toISOString() && d[i]=== developers[j].username){
                  console.log(f[i]+ " " + d[i])
                  let obj = {id: i,user_id: id[i], username:d[i], firstname:fn[i], email:e[i], dailyeffort:da[i], ticket_id:ti[i],issuename:tn[i],date:f[i]}
                  let arr = final.push(obj)
                  setFinal([ ...final,{
                      id : final.length,
                      value: arr
                  }])
                  console.log(final)
                  count =  count + da[i]
                  countF= countF+ da[j]
                  daDev[i]= da[i];
                  let sortDev = daDev.sort((a,b)=>b-a);
                  let hCon= sortDev[0];
                  setHcon(hCon);
                  console.log(sortDev);
           }

          console.log(count + " " + hCon)  
        
           
            setCn(count)

        } }
      }else{
        for(let j=0; j<developers.length; j++){
       
          for(let i = 0 ; i<f.length ;i++) {
              if(f[i]>= data.startDate.toISOString()  && f[i] <= data.endDate.toISOString() && d[i]=== developers[j].username){
                  console.log(f[i]+ " " + d[i])
                  let obj = {id: i,user_id: id[i], username:d[i], firstname:fn[i], email:e[i], dailyeffort:da[i], ticket_id:ti[i],issuename:tn[i],date:f[i]}
                  let arr = final.push(obj)
                  setFinal([ ...final,{
                      id : final.length,
                      value: arr
                  }]);
                  console.log(final)
                  count =  count + da[i]
                  //countF= countF+ da[j]
                  daDev[i]= da[i];
                  let sortDev = daDev.sort((a,b)=>b-a);   
                  let hCon= sortDev[0];
                  setHcon(hCon);
                  console.log(sortDev);
           }

          console.log(count + " " + hCon)  
          setCn(count)
            
        }
        }
    };
  }
    //-----------------For Collapse-------------------
   
  
    const [open, setOpen] = useState(false);
    
  
    
    const columns = React.useMemo(
        () => [
           
            {
                Header:'User Name',
                accessor: 'username'
            },
            {
                Header:'First Name',
                accessor: 'firstname'
            },
           
            {
                Header:'Daily Effort',
                accessor: 'dailyeffort',
                
            },
            {
                Header:'Ticket ID',
                accessor: 'ticket_id'
            },
            {
              Header:'Issue Title',
              accessor: 'issuename'
            },
            {
              Header:'Date',
              accessor: 'date'
            },
            {
              Header: '',
              id: 'delete',
           

            Cell: (tableProps) => (
              <Button className="btn-danger"
              onClick={() => {
                // ES6 Syntax use the rvalue if your data is an array.
                const dataCopy = [...final];
             
                dataCopy.splice(tableProps.row.index,1 );
                setFinal(dataCopy);
              }} > 
            <RiDeleteBin6Line />
           </Button>

            ),
            
        },
        ],
        [final]
      );
      const RemoveRows = ()=>{
              const dataCopy = [final];
            
              dataCopy.splice(final.original );
              setFinal(dataCopy);
              console.log(dataCopy)
              setShow(false);
              setCn(0);
              setHcon(0);
                  
      }
      //Modal for delete rows
    
      const [show, setShow] = useState(false);

      const handleClose = () => setShow(false);
      const handleShow = () => setShow(true);
    return (
        <div>
            
            <Card className="shadow p-3 mb-5 bg-white rounded" style={{marginTop:20}}>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row" >
                            
                       
                        <div className="col-md-3"> 
                                        <p><b>Developer</b></p>
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
                                            
                        </div>
                        <div className="col-md-2">
                            <div className="col">
                             
                                  <b>From</b><IoMdArrowDropdown/>
                                  <br/>
                                  <center>
                                      <div className="form-section" style={{marginTop: 20}}>
                                            <Controller
                                              as={
                                                  <DatePicker
                                                      id="startDate"
                                                      //onChange={(date) => setStartDate(date)}
                                                      selected={startDate}
                                                      //showTimeSelect
                                                      dateFormat='yyyy/MM//dd'
                                                      selectsStart
                                                      startDate={startDate}
                                                      endDate={endDate}
                                                      isClearable
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
                      
                            <b>To</b> <IoMdArrowDropdown/>
                            <center>
                            <div className="form-section" style={{marginTop: 20}}>
                        
                                    <Controller
                                    as={
                                        <DatePicker
                                            id="endDate"
                                            //onChange={(date) => setEndDate(date)}
                                            selected={endDate}
                                            //showTimeSelect
                                            dateFormat='yyyy/MM//dd'
                                            selectsEnd
                                            startDate={startDate}
                                            endDate={endDate}
                                            isClearable
                                            showYearDropdown
                                            scrollableMonthYearDropdown
                                        />
                                    }
                                    name="endDate"
                                    control={control}
                                    valueName="selected"
                                />
                            
                            </div>
                            </center>
                        </div>
                        <div className="col-md-3">
                                <Card className="shadow-sm p-3 mb-5 bg-white rounded">
                                <h5>Total Hours : {''}  
                               
                                <Badge pill variant="success">
                                  {cn}  {' '} hrs {' '}  <MdTimer/>
                                </Badge>{' '}
                                
                                </h5>
                              
                                <p>Highest Contribution : {''} 
                               
                                <Badge pill variant="warning">
                                  {hCon} {' '} hrs  {' '}  <MdTimer/>
                                </Badge>{' '} 
                                </p>
                                
                                {/* <p>Lowest Contribution : {''} 
                               
                                <Badge pill variant="primary">
                                  {lCon} {' '} hrs  {' '}  <MdTimer/>
                                  </Badge>
                                </p>
                                 */}
                                 <Button className="btn-danger"
                                 onClick={handleShow}
                                 >Delete All Rows{" "}  <RiDeleteBin6Line/></Button>
                                </Card>
                                <Modal
                                  show={show}
                                  onHide={handleClose}
                                  backdrop="static"
                                  keyboard={false}
                                >
                                  <Modal.Header closeButton>
                                    <Modal.Title className="text-white">Are You Sure{' '}<b>?</b> </Modal.Title>
                                  </Modal.Header>
                                  <Modal.Body>
                                  <MdQuestionAnswer/>{' '}<b>Developer Timesheet</b><br/>
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
                              </center>
                        </div>
                        
                    </div>
                  </form>
                  </Card>
                  <Card className="shadow-lg p-3 mb-5 bg-white rounded">
                  
                      <Table className="" columns={columns} data={final} />
                    <Collapse in={open}>

                    <div id="example-collapse-text" >
                    {/* Add form   */}
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
      selectedFlatRows,
      state: { selectedRowIds },
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
                      <Card className="rounded">    
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
                       
                          </Card>
         
        </div>
        
        
        <table className="table " {...getTableProps()}>
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
          <tbody {...getTableBodyProps()} className="bg-white">
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
       
      </>
    );
  }