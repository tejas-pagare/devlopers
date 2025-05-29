import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

function Body() {
  return (
    <>
      <Navbar/>
      <h1>Hello world</h1>
      <Outlet/>
    </>
  )
}

export default Body
