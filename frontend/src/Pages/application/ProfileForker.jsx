import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CompanyProfile from './CompanyProfile';
import UserProfile from './UserProfile';
import { getMemberById } from '../../store/actions/memberActions';
import MainCard from '../../components/cards/MainCard'
import { Stack, CircularProgress, Box, Alert } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Meta from '../../components/Meta';

const ProfileForker = () => {
    let { id } = useParams()
    const { t } = useTranslation()

    const dispatch = useDispatch()
    const memberFetch = useSelector((state) => state.memberFetch)
    const { loading, error, memberGet } = memberFetch

    useEffect(() => {
        dispatch(getMemberById(id))
    },[dispatch, id])

    return (
        <>
            <Meta title={t('profile_page_title')}/>
            <MainCard title={t('profile')}>
                { loading ? 
                    <Stack alignItems="center">
                        <CircularProgress size='4rem'/>
                    </Stack>
                : (
                    <>
                    {
                        error ? <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="error">{t(error)}</Alert></Box> : memberGet.category_ === 'company' ? <CompanyProfile/> : <UserProfile/>
                    }
                    </>
                )
                }
            </MainCard>
        </>
    )
}

export default ProfileForker