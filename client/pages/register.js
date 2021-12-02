import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import { Form } from 'react-bootstrap'
import { GlobalState } from '../components/GlobalState'
import Router from 'next/router';
import swal from 'sweetalert'
import axios from 'axios';

const initialState={
    name:'',
    email:'',
    password:'',
    repeat:'',
    lastname:'',
    ocupation:''
}

function Register() {
    const [register,setRegister] = useState(initialState)
    const state = useContext(GlobalState);
    const [islogged]= state.User.isLogged
    
    const handleChangeInput=e=>{
        const {name,value}=e.target
        setRegister({...register,[name]:value})
    }  

    const handleSubmit=async e=>{
        e.preventDefault()
        try{
             await axios.post('/api/register',{...register})
             localStorage.setItem('firstLogin',true) 
             swal({icon:"success",text:"GOOD!!",timer:"2000"}).then(function(){
                 window.location.href="/";
             },2000)
             
        }catch(err){
         swal({
             title:"ERROR",
             text:err.response.data.msg,
             icon:"error",
             button:"OK"
         })
        }
        
     }
    if(islogged) { Router.push('/') }
    return (
        <div className="limiter" >
            <div className="container-register100">
                <div className="wrap-register100">
            <form className="register100-form "   method="POST"  onSubmit={handleSubmit}>
                 <span className="register100-form-title p-b-43">Registro</span>
                <Form.Group className="mb-3" >
                    <Form.Label className="ubuntu">Email</Form.Label>
                    <Form.Control  onChange={handleChangeInput}  name ="email"   className="form-control-lg ubuntu" type="email" placeholder=" Email" />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label className="ubuntu">Nombre</Form.Label>
                    <Form.Control  onChange={handleChangeInput} name="name"  className="form-control-lg ubuntu" type="text" placeholder=" Nombre" />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label className="ubuntu">Apellido</Form.Label>
                    <Form.Control  onChange={handleChangeInput} name="lastname"  className="form-control-lg ubuntu" type="text" placeholder="Apellido" />
                </Form.Group>
                
                <Form.Group className="mb-3" >
                    <Form.Label className="ubuntu">Ocupacion</Form.Label>
                    <Form.Control  onChange={handleChangeInput} name="ocupation"  className="form-control-lg ubuntu" type="text" placeholder=" Ocupacion" />
                </Form.Group>


                <Form.Group className="mb-3 ">
                    <Form.Label className="ubuntu">Password</Form.Label>
                    <Form.Control  onChange={handleChangeInput} name="password"  className="form-control-lg ubuntu" type="password" placeholder="Password" autoComplete="on"/>
                </Form.Group>

                <Form.Group className="mb-3 ">
                    <Form.Label className="ubuntu">Repite el Password</Form.Label>
                    <Form.Control  onChange={handleChangeInput} name="repeat"  className="form-control-lg ubuntu" type="password" placeholder="Repite el Password" autoComplete="on"/>
                </Form.Group>


                <div className="container-register100-form-btn">
                    <button className="register100-form-btn ubuntu">
                    Register
                    </button>
                </div>

            <div className="text-center p-t-46 ">
                <Link href="/login">  
                    <a className="txt2">or Login</a>
                </Link>
            </div> 
            
            </form> 
            <div className="register100-more" />
                </div>
            </div>
        </div>
    )
}

export default Register
