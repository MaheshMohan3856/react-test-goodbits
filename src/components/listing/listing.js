import React,{useState, useEffect} from "react";
import Grid from "@material-ui/core/Grid";
import MuiTableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import TextField from '@material-ui/core/TextField';
import {makeStyles,withStyles} from "@material-ui/core/styles";
import { useSelector,useDispatch } from "react-redux";
import {list,deleteEmployee} from '../../actions/listing/listingActions';
import {_login} from "../../actions/login/loginActions";
import AddEmployee from '../AddEmployee/AddEmployee';
import {Button} from 'react-bootstrap';
import UpdateEmployee from '../UpdateEmployee/UpdateEmployee';
import {useNavigate} from "react-router-dom"


const Listing = () =>{

    const TableCell = withStyles({
        root:{
            borderBottom:"none"
        }
    })(MuiTableCell);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [search,setSearch] = useState("");
    const [addEmp,setAddEmp] = useState(false);

    const [updateEmp,setUpdateEmp] = useState(false)
    const [editObject,setEditOject] = useState({})
    const [empArray,setEmpArray] = useState([])


    const closeAddEmp = () =>{
        setAddEmp(false)
    }

    const closeUpdateEmp = () =>{
        setUpdateEmp(false)
    }

    useEffect(()=>{
       dispatch(list({search:""}))
    },[])

    const empList = useSelector((state)=>state.listing_r._list);
    useEffect(()=>{
      if(empList != undefined){
          if(empList.status == true){
              console.log(empList?.data);
              setEmpArray(empList?.data)
          }else{
              alert(empList.message);
          }
      }
    },[empList])

    const listHeader=[
        {label:"Employee Id"},
        {label:"Name"},
        {label:"Email"},
        {label:"Age"},
        {label:"Mobile"},
        {label:"Address"},
        {label:"Actions"}
    ]

    const setSearchValue = (val) =>{
       setSearch(val);
       dispatch(list({search:val}));
    }

    const selectIndex = (index) =>{
        console.log("index",empArray[index]);
       setEditOject(empArray[index]);
       setUpdateEmp(true);
    }
   
    const deleteIndex = (index) => {
        let data = {
            empId : empArray[index].employeeId
        }
        dispatch(deleteEmployee(data))
    }

    const deletedEmp = useSelector((state)=>state.listing_r._deleteEmp)
    useEffect(()=>{
         if(deletedEmp != undefined){
             if(deletedEmp.status == true){
                 dispatch(list({search:""}))
             }else{
                 alert(deletedEmp?.message);
             }
         }
    },[deletedEmp])

    const logout = () =>{
       localStorage.removeItem("@authorised")
       dispatch(_login(undefined))
        navigate("/login");
    }

    return(
        <React.Fragment>
            <div style={{backgroundColor:"#102961",height:window.innerHeight}}>
             <div style={{color:"#fff",height:"3rem",display:"flex",justifyContent:"center",paddingTop:"3rem"}}>
                 <span>Employee Listing</span>
             </div>
             <div style={{display:"flex",justifyContent:"space-between"}}>
                <div>
                    
                    <TextField
        
                    label="Search"
                    onChange={(e)=>setSearchValue(e.target.value)}
                    value={search}
                    
                />
                </div>

                <div style={{marginRight:10,cursor:"pointer"}}>
                    <Button onClick={()=>setAddEmp(true)}>Add Employee</Button>
                    <Button onClick={()=>logout()} >Logout</Button>
                </div>
             </div>
            
            
            <Grid className={"adminDataItem"}>
               <Table>
                   <TableHead>
                       <TableRow>
                           {
                               listHeader?.map((item,index)=>(
                                <TableCell style={{color:"#fff"}} className={"headerList"}>
                                   {item.label}
                                </TableCell>
                               ))
                           }
                           
                       </TableRow>
                   </TableHead>
                   <TableBody>
                       {
                           empArray?.length>0 && empArray?.map((item,index)=>(
                            <TableRow>
                                {
                                    Object.keys(item)?.slice(0,6).map((val,newIndex)=>(
                                        <TableCell>
                                          {item[val] || "-"}
                                        </TableCell>
                                    ))

                                }
                                <TableCell>
                                    <span onClick={()=>selectIndex(index)}><EditIcon  /></span>
                                    <span onClick={()=>deleteIndex(index)}><DeleteIcon /></span>
                                </TableCell>
                            </TableRow>
                           ))
                       }
                      
                     
                   </TableBody>
               </Table>
               {
                           empArray?.length == 0
                           &&
                         
                           <div style={{height:60,width:window.innerWidth,marginTop:20,backgroundColor:"grey",color:"#fff",textAlign:"center"}}>No Record Found</div>
                          
                       }
            </Grid>
            <AddEmployee open={addEmp} closeDialog={closeAddEmp}/>
            <UpdateEmployee open={updateEmp} closeDialog={closeUpdateEmp} editValue={editObject}/>
            </div>
            
        </React.Fragment>
    )
}

export default Listing