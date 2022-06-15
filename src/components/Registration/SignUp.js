import * as React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import Popup from './PopUp';
import './SignUp.scss'

import { useNavigate } from "react-router-dom";

export default function SignupForm() {

  let flag = "y";


  
  const handleUserDetails = (e) => {

    console.log("entered");
    const {name, value} = e.target;
    const PersonalList = {...PersonalDetailsList};
    PersonalList[name] = value;
    console.log(PersonalList);
    UpdatePersonalDetailsList(PersonalList);
  }

  const [errorMessage,updateErrorMessage] = useState({
    email : "",
    userName:"",
    phoneNumber: "",
    firstName: "",
    lastName : "",
    DOB: "",
    password: "",
    confirmpassword: ""
  });

const emailpattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
const namepattern = /^[a-z]+$/i;

  const [PersonalDetailsList, UpdatePersonalDetailsList] = useState({
    UserID : "1",
    UserName:"",
    FirstName: "",
    LastName : "",
    Email : "",
    Password : "",
    ConfirmPassword : ""
  });

const [buttonPopup, setButtonPopup]=useState(false);

  const SaveUserDetails = () => {   
    const result = validationscheck();
    if(result !== "noerror"){
      updateErrorMessage(result);
    }else{
        navigate('/profile', {state:null})
    }   
  }

  const validationscheck = () => {

    console.log(PersonalDetailsList);
    const errorlist = {};

    
    if(PersonalDetailsList.FirstName===''){
      errorlist.firstName="First name is required!";
      flag = "n";
    }
    else if(!namepattern.test(PersonalDetailsList.FirstName))
    {
        errorlist.firstName = "Please enter first name correctly"
        flag = "n";
    }

    if(PersonalDetailsList.LastName===''){
      errorlist.lastName="Last name is required!";
      flag = "n";
    }
    else if(!namepattern.test(PersonalDetailsList.LastName))
    {
        errorlist.lastName = "Please enter last name correctly"
        flag = "n";
    }

    if(PersonalDetailsList.UserName===''){
      errorlist.userName="User name is required!";
      flag = "n";
    }
    


    if(PersonalDetailsList.Email===''){
      errorlist.email="Email is required!";
      flag = "n";
    }
    else if(!emailpattern.test(PersonalDetailsList.Email))
    {
        errorlist.email = "Incorrect Email entered"
        flag = "n"; 
    }


    if(PersonalDetailsList.Password===''){
      errorlist.password="Password is required!";
      flag = "n";
    }
    else if(PersonalDetailsList.Password.length<8){
      errorlist.password="Please enter a password having atleast 8 characters"
      flag = "n";
    }
    else if(PersonalDetailsList.Password.length>15){
      errorlist.password="Please enter a password having less than 15 characters"
      flag = "n";
    }


    if(PersonalDetailsList.ConfirmPassword===''){
        errorlist.confirmpassword="Confirm Password is required!";
        flag = "n";
      }
      else if(PersonalDetailsList.ConfirmPassword.length<8){
        errorlist.confirmpassword="Please enter a confirm password having atleast 8 characters"
        flag = "n";
      }
      else if(PersonalDetailsList.ConfirmPassword.length>15){
        errorlist.confirmpassword="Please enter a confirm password having less than 15 characters"
        flag = "n";
      }else if(PersonalDetailsList.ConfirmPassword!==PersonalDetailsList.Password){
        errorlist.confirmpassword="password and confirm password should match"
        flag = "n";
      }



    console.log(errorlist);
    if(flag === "n")
        return errorlist;
    else
        return "noerror";
  }

  const navigate = useNavigate();


  return (
    <div class="div-1">
          

          <form class="col-md-2 col-10" >

            <div class="mb-2 mt-3">
                <h2>
                    SignUp
                </h2>
                
            </div>
            
            

            <div class="row">
                <div class="mb-3 mt-3 col-12 col-md-6">
                    <TextField id="first-name" label="first name" name="FirstName" variant="outlined" onChange={(e) => handleUserDetails(e)} />
                    {errorMessage.firstName && <div> {errorMessage.firstName} </div>}
                </div>

                <div class="mb-3 mt-3 col-12 col-md-6">
                    <TextField id="last-name" label="last name" name="LastName" variant="outlined" onChange={(e) => handleUserDetails(e) }/>
                    {errorMessage.lastName && <div> {errorMessage.lastName} </div>}
                </div>  
            </div>
              

              <div class="mb-12 mt-12" >
              <TextField fullWidth='100%' id="user-name" label="user name" variant="outlined" name="UserName" onChange={(e) => handleUserDetails(e) }/>
              {errorMessage.userName && <div> {errorMessage.userName} </div>}
              </div>
                <br></br>
              <div class="mb-12 mt-12">
              <TextField fullWidth='100%' id="email" label="email" variant="outlined"  name="Email" type='email' onChange={(e) => handleUserDetails(e)}/>
              {errorMessage.email && <div> {errorMessage.email} </div>}
              </div>
              <br></br>
              <div class="mb-12 mt-12">
              <TextField fullWidth='100%' id="password" label="password" variant="outlined" name="Password" type='password' onChange={(e) => handleUserDetails(e) }/>
              {errorMessage.password && <div> {errorMessage.password} </div>}
              </div>
              <br></br>
              <div class="mb-12 mt-12">
              <TextField fullWidth='100%' id="confirmpassword" label="confirmpassword" variant="outlined" name="ConfirmPassword" type='password' onChange={(e) => handleUserDetails(e) }/>
              {errorMessage.con && <div> {errorMessage.password} </div>}
              </div>
              <br></br>

              <div class="mb-12 mt-12">
              <Button id="submit" variant="contained" className='submit' onClick={SaveUserDetails}>Submit</Button>
              </div>
          
          </form>

          <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
            <h3>Registration complete!</h3>
          </Popup>

    </div>
        
    
  );
}