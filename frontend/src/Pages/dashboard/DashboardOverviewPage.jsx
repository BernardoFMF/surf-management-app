import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next'
import { styled, useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux';
import OverviewWrapper from '../../components/overviewWrapper/OverviewWrapper'
import Meta from '../../components/Meta';

const Dashboard = () => {
    const { t } = useTranslation()
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false)
        }, 300)
    }, [])

    return (
        <>
            <Meta title={t('overview_page_title')}/>
            <OverviewWrapper loading={loading}/>
        </>
    );
};

export default Dashboard;