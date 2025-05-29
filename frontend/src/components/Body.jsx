import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import axios from 'axios';
import { BACKEND_BASE_URL } from '../utils/constant';
import { useDispatch } from 'react-redux';
import { addUser } from '../store/slices/user';

function Body() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = dispatch((store)=>store.user);
  const fetchUser = async()=>{
    if(user) return;
    try {
      const response = await axios.get(`${BACKEND_BASE_URL}/profile/view`,{withCredentials:true});
      dispatch(addUser(response.data.user));

    } catch (error) {
      if(error.status===401){
        navigate("/login");
        return ;
      }
      console.error(error.message);
    }
  }
  useEffect(()=>{
   fetchUser()
    
  },[])
  return (
    <>
      <Navbar/>
      <Outlet/>
    </>
  )
}

export default Body
