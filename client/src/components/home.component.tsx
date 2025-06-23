import { Component, useEffect, useState } from "react"
import { Navigate, redirect, useNavigate } from "react-router-dom"
import AuthService from "../services/auth.service"
import type IUser from "../types/user.type"
import Tabs from "react-bootstrap/Tabs"
import Tab from "react-bootstrap/Tab"
import Search from "./searchTab.component"
import Library from "./libraryTab.component"
import { Appbar } from "./appbar.component"


export default function Home() {


  const [currentUser,] = useState<IUser>(AuthService.getCurrentUser())
 
  if (!currentUser) return (<Navigate to='/' />)

  useEffect(() => {
    console.log("Current user: " + currentUser?.username)
  })


  return (
    <>
     <Appbar/>
      <Tabs defaultActiveKey="search"
        className="mb-3">
        <Tab eventKey="search" title="Search">
        <Search>
          </Search>
        </Tab>
        <Tab eventKey="library" title="My Library">
          <Library>
          </Library>
        </Tab>
      </Tabs>

     
    </>
  )
  
}

