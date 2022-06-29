import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next'
import { styled, useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux';

// material-ui

// project imports
import OverviewWrapper from '../../components/overviewWrapper/OverviewWrapper'

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 300)
    }, [])

    return (
        <OverviewWrapper loading={loading}/>
    );
};

export default Dashboard;