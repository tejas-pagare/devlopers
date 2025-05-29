import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Body from "./components/Body"
import Login from "./components/Login"


function App() {
  
  return (
    <>
    <BrowserRouter basename="/">
    <Routes >
    <Route path="/" element={<Body/>}>
    <Route path="/login" element={<Login/>}/>
    <Route path="/signup" element={<h1>Signup</h1>}/>
    <Route path="/feed" element={<h1>Feed</h1>}/>

    </Route>

    </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App
