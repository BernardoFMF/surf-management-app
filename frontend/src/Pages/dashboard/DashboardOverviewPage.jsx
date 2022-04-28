import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../src/store/actions/userActions'
import useAuth from '../../hooks/useAuth'

const DashboardOverviewPage = () => {
  let history = useNavigate()
  const dispatch = useDispatch()
  const {logoutHook} = useAuth()
  const func = async () => {
    //await func2()
    dispatch(logout())
    await logoutHook()
    //history('/sign-in')
  }
  const func2 = async () => {
    const response = await fetch('/api/users', {
      method: 'GET',
      body: null,
      headers: { "Content-Type": "application/json" }
    })
    const text = await response.text()
    console.log(text)
  }
  

  return (
    <div><button onClick={func}>logout</button></div>
  )
}

export default DashboardOverviewPage