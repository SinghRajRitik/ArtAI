import React from "react"
import {BrowserRouter,Routes , Route} from "react-router-dom"
import Home from "./pages/Home"
import Result from "./pages/Result"
import Buycredit from "./pages/Buycredit"
import Footer from "./components/Footer"
function App() {
  
  return (
    <>
      <div className="px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-100 to-pink-100">
      
      
      
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
