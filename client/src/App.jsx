import React from "react"
import {BrowserRouter,Routes , Route} from "react-router-dom"
import Home from "./pages/Home"
import Result from "./pages/Result"
import Buycredit from "./pages/BuyCredit"
import Footer from "./components/Footer"
import Login from "./components/Login"
import { useContext } from "react"
import { AppContext } from "./context/AppContext"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import Navbar from "./components/Navbar"


function App() {
   
  const {showLogin} = useContext(AppContext)
  
  return (
    <>
      <div className="px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-100 to-pink-100">
      
      <ToastContainer/>
      <Navbar/>
      {showLogin && <Login/>}
      <Login/>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/Result" element={<Result/>} />
        <Route path="/Buy" element={<Buycredit/>} />

      </Routes>
       <Footer />
     </div>
     
    </>
  )
}

export default App
