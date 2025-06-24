import { useEffect, useState } from "react"
import { Navigate} from "react-router-dom"
import AuthService from "../services/auth.service"
import type IUser from "../types/user.type"
import Tabs from "react-bootstrap/Tabs"
import Tab from "react-bootstrap/Tab"
import SearchTab from "./searchTab.component"
import LibraryTab from "./libraryTab.component"
import { Appbar } from "./appbar.component"
import type { IVolume } from "../types/volume.type"
import libraryService from "../services/library.service"


export default function Home() {


const [currentUser,] = useState<IUser>(AuthService.getCurrentUser())
if (!currentUser) return (<Navigate to='/' />) 

  const[libVolumes,setLibVolumes]=useState<IVolume[]>(Array())
useEffect(()=>{
libraryService.getPage(0).then(response=>{
    console.log(response.length)
    setLibVolumes(response)
  })
},[])
  
  
  return (
    <>
     <Appbar/>
      <Tabs defaultActiveKey="search"
        className="mb-3">
        <Tab eventKey="search" title="Search">
        <SearchTab setLibVolumes={setLibVolumes} />
          
        </Tab>
        <Tab eventKey="library" title="My Library">
          <LibraryTab setLibVolumes={setLibVolumes} libVolumes={libVolumes}/>
        </Tab>
      </Tabs>
     
    </>
  )
  
}

