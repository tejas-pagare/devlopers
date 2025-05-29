import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

function Body() {
  return (
    <>
      <Navbar/>
      <Outlet/>
    </>
  )
}

export default Body
