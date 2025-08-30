

import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const ProtecetedRoute = ({children}) => {
    const {user} = useSelector(state=>state.auth)
    const nevigate = useNavigate()

    useEffect(() => {
      if(user == null || user.role !== "recruiter"){
        nevigate("/")
      }
    }, [])
    return <>{children}</>
    
}

export default ProtecetedRoute