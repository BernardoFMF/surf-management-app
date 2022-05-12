import React from 'react'
import MembershipCard from '../MembershipCard'
import { useSelector } from 'react-redux'

const MembershipCardTab = ({ user }) => {
  const userFetch = useSelector((state) => state.userFetch)
  const { userGet } = userFetch
  return (
    <MembershipCard user={ userGet }/>
  )
}

export default MembershipCardTab