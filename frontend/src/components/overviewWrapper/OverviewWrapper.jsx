import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

import OverviewSkeleton from '../skeletons/OverviewSkeleton'
import Overview from '../Overview'
const QuotasChartWrapper = ({ loading}) => {
    const member = useSelector((state) => state.memberLogin)
    const { error, memberInfo } = member

    return (
        <>
            {loading ? (
                <OverviewSkeleton memberInfo={memberInfo}/>
            ) : (
                <Overview memberInfo={memberInfo} error={error}/>
            )}
        </>
    )
}

export default QuotasChartWrapper