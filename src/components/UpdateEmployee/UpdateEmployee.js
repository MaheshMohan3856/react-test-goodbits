import React,{useState,useEffect} from "react";
import {Button} from "react-bootstrap";
import Dialog from "@material-ui/core/Dialog";
import DialogActions  from "@material-ui/core/DialogActions";
import DialogContent  from "@material-ui/core/DialogContent";
import TextField  from "@material-ui/core/TextField";
import "./UpdateEmployee.css";
import { CancelOutlined } from "@material-ui/icons";
import {useSelector,useDispatch} from "react-redux";
import {updateEmployee,list} from '../../actions/listing/listingActions';


const UpdateEmployee = ({open,closeDialog,editValue}) =>{

    const [name,setName] = useState(editValue.name);
    const [age,setAge] = useState(editValue.age);
    const [address,setAddress] = useState(editValue.address);
    const [mobile,setMobile] = useState(editValue.mobile);
    const [empId,setEmpId] = useState(editValue.employeeId)

    const dispatch = useDispatch();

    useEffect(()=>{
      if(open==true){
          setName(editValue.name);
          setAge(editValue.age);
          setAddress(editValue.address);
          setMobile(editValue.mobile)
          setEmpId(editValue.employeeId);
      }
    },[open])

    const handleSubmit = () =>{
        let data = {
            name:name,
            age:age,
            address:address,
            mobile:mobile,
            empId:empId
        }
        dispatch(updateEmployee(data))
    }

    const updatedEmp = useSelector((state)=>state.listing_r._updateEmp)
    
    useEffect(()=>{
      if(updatedEmp != undefined){
          if(updatedEmp.status == true){
              dispatch(list({search:""}));
              closeDialog();
          }
      }
    },[updatedEmp])

    return(
        <Dialog
          PaperProps={{
              style:{
                  width:"90%",
                  height:"600px",
                  backgroundColor:"#2B324B",
                  color:"white",
                  marginTop:"70px",
                  marginRight:"10px"
              }
          }}
          fullScreen={true}
          open={open}
          onClose={closeDialog}
          aria-labelledby="form-dialog-title"
        >

        <div style={{alignSelf:"flex-end",cursor:"pointer"}}>
              <span onClick={closeDialog}><CancelOutlined /></span>
        </div>
        <div style={{textAlign:"center",fontWeight:"bold", fontSize:24}}>
             Update Employee
        </div>
           <DialogContent>
           <form className={"root"} onSubmit={handleSubmit}>
                <TextField
                className={"MuiTextField"}
                    label="Name"
                    variant="filled"
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                

               <TextField
                
                    label="Age"
                    variant="filled"
                    type="number"
                    required
                    value={age}
                    onChange={e => setAge(e.target.value)}
                />
               <TextField
                
                label="Mobile"
                variant="filled"
                type="number"
                required
                value={mobile}
                onChange={e => setMobile(e.target.value)}
            />
            <TextField
                
                label="Address"
                variant="filled"
                required
                value={address}
                onChange={e => setAddress(e.target.value)}
            />
               
                <div className={"buttonMargin"}>
                    
                    <Button type="submit" className={"MuiButtonBase"} variant="contained" color="primary" >
                    Update
                    </Button>
                </div>
            </form>
            </DialogContent> 
        </Dialog>
    )
}

export default UpdateEmployee