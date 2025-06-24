import { Routes, Route} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'
import Login from "./components/login.component"
import Register from "./components/register.component"
import Home from "./components/home.component"

export default function App () {
  

    return (
      <div >       
            
    <div className="container mt-3">
          
          <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home  />} />
          </Routes>
        </div>
      </div>
 
    );
  }

