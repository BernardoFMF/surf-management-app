import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../../src/store/actions/userActions'

const DashboardOverviewPage = () => {
  const dispatch = useDispatch()
  const func = () => {
    dispatch(logout())
  }
  return (
    <div><button onClick={func}>logout</button></div>
  )
}

export default DashboardOverviewPage