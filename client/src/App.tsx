import { Component } from "react"
import { Routes, Route} from "react-router-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import './App.css'
import Login from "./components/login.component"
import Register from "./components/register.component"
import Home from "./components/home.component"
type Props = {};

type State = {
  showModeratorBoard: boolean,
  showAdminBoard: boolean,
  //currentUser: IUser | undefined
}
class App extends Component<Props, State> {
  render() {
    return (
      <div >       
         
    <div className="container mt-3">
          
          <Routes>
            <Route path="/" element={<Login />}/>
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </div>
      </div>
 
    );
  }

}

/* 
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}
 */
export default App
