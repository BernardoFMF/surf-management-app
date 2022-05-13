import React from 'react'
import MembershipCard from '../MembershipCard'
import { useSelector } from 'react-redux'

const MembershipCardTab = ({ user }) => {
  const memberFetch = useSelector((state) => state.memberFetch)
  const { memberGet } = memberFetch

  return (
    <MembershipCard user={ memberGet }/>
  )
}

export default MembershipCardTab