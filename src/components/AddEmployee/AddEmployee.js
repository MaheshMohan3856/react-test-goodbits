import React,{useState,useEffect} from "react";
import {Button} from "react-bootstrap";
import Dialog from "@material-ui/core/Dialog";
import DialogActions  from "@material-ui/core/DialogActions";
import DialogContent  from "@material-ui/core/DialogContent";
import TextField  from "@material-ui/core/TextField";
import "./AddEmployee.css";
import { CancelOutlined } from "@material-ui/icons";
import { useSelector,useDispatch } from "react-redux";
import {addEmployee,list} from '../../actions/listing/listingActions'


const AddEmployee = ({open,closeDialog}) =>{

    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [age,setAge] = useState("");
    const [address,setAddress] = useState("");
    const [mobile,setMobile] = useState("");

    const dispatch = useDispatch()

    const handleSubmit = () =>{
        let data = {
            name:name,
            email:email,
            age:age,
            address:address,
            mobile:mobile
        }
        dispatch(addEmployee(data));

    }

    const addedEmp = useSelector((state)=>state.listing_r._addEmp);

    useEffect(()=>{
        if(addedEmp != undefined){
            if(addedEmp.status == true){
                dispatch(list({search:""}))
                closeDialog();

            }else{
                alert(addedEmp?.message);
            }
        }
    })

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
             Add New Employee
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
                    
                    label="Email"
                    variant="filled"
                    type="email"
                    required
                    value={email}
                    onChange={e => setEmail(e.target.value)}
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
                    Add
                    </Button>
                </div>
            </form>
            </DialogContent> 
        </Dialog>
    )
}

export default AddEmployee