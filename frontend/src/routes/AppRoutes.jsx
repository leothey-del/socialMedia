import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Contact from '../pages/Contact'
import Project from '../pages/Project'
import About from '../pages/About'

const AppRoutes = () => {
  return (
   <Routes>
    <Route path={"/"} element={<Home/>} />
    <Route path={"/contact"} element={<Contact/>} />
    <Route path={"/project"} element={<Project/>} />
    <Route path={"/about"} element={<About/>} />
   </Routes>
  )
}

export default AppRoutes