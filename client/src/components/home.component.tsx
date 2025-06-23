import { Component, useEffect, useState } from "react"
import { Navigate, redirect, useNavigate } from "react-router-dom"
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
libraryService.getAll().then(response=>{
    console.log(response.length)
    setLibVolumes(response)
  })
},[])
  
  /* useEffect(() => {
    console.log("Current user: " + currentUser?.username)
  }) */


  return (
    <>
     <Appbar/>
      <Tabs defaultActiveKey="search"
        className="mb-3">
        <Tab eventKey="search" title="Search">
        <SearchTab setLibVolumes={setLibVolumes} />
          
        </Tab>
        <Tab eventKey="library" title="My Library">
          <LibraryTab setLibVolumes={setLibVolumes} volumes={libVolumes}/>
        </Tab>
      </Tabs>
     
    </>
  )
  
}

