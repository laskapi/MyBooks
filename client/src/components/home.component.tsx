import { Component, useEffect, useState } from "react"
import { Navigate, redirect, useNavigate } from "react-router-dom"
import AuthService from "../services/auth.service"
import type IUser from "../types/user.type"
import Tabs from "react-bootstrap/Tabs"
import Tab from "react-bootstrap/Tab"
import Search from "./search.component"
import Library from "./library.component"
export default function Home() {


  const [currentUser, setCurrentUser] = useState<IUser>(AuthService.getCurrentUser())
  const navigate = useNavigate()

  if (!currentUser) return (<Navigate to='/' />)

  useEffect(() => {
    console.log("BBBBBBBBBBBBB " + currentUser?.username)
  })


  return (
    <>
      <Tabs defaultActiveKey="library"
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

      <div>
        <button onClick={logout}>
          Logout
        </button>
      </div>
    </>
  )
  {/* <div className="container">
      
      <div>
        <header className="jumbotron">
          <h3>
            <strong>User: {currentUser.username}</strong>
          </h3>
        </header>
        <p>
          <strong>Token:</strong>{" "}
          {currentUser.accessToken.substring(0, 20)} ...{" "}
          {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
        </p>
        <p>
          <strong>Id:</strong>{" "}
          {currentUser.id}
        </p>
        <p>
          <strong>Email:</strong>{" "}
          {currentUser.email}
        </p>
        <strong>Authorities:</strong>
        <ul>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </ul>

       

      </div> 
    </div> */}


  function logout() {
    AuthService.logout()
    navigate('/')
  }

}

