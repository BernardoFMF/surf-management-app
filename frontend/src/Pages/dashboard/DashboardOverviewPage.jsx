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
    dispatch(logout())
    await logoutHook()
   // history('/sign')
  }
  return (
    <div><button onClick={func}>logout</button></div>
  )
}

export default DashboardOverviewPage