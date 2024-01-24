import React from 'react'
import { Navigate, Outlet } from 'react-router'

const Protected = ({children}) => {
  const token = localStorage.getItem("accessToken")
  if(!token){
    return <Navigate to="/" />
  }
  return (
    <div>{children || <Outlet />}</div>
  )
}

export default Protected