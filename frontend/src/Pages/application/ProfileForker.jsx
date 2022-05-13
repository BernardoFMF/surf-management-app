import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CompanyProfile from './CompanyProfile';
import MemberProfile from './MemberProfile';
import { getMemberById } from '../../store/actions/memberActions';
import { getTypes } from '../../store/actions/typeActions'
import MainCard from '../../components/cards/MainCard'
import { Stack, CircularProgress, Box, Alert } from '@mui/material'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const ProfileForker = () => {
    let { id } = useParams()
    const { t } = useTranslation()    

    const dispatch = useDispatch()
    const memberFetch = useSelector((state) => state.memberFetch)
    const { loading, error, memberGet } = memberFetch

    const typesFetch = useSelector((state) => state.typesFetch)
    const { loading: loadingTypes } = typesFetch

    useEffect(() => {
        dispatch(getMemberById(id))
        dispatch(getTypes())
    },[dispatch, id])

    return (
        <MainCard title={t('profile')}>
            { loading || loadingTypes ? 
                <Stack alignItems="center">
                    <CircularProgress size='4rem'/>
                </Stack>
            : (
                <>
                {
                    error ? <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="error">{t(error)}</Alert></Box> : memberGet.member_type_ === 'corporate' ? <CompanyProfile/> : <MemberProfile/>
                }
                </>
            )
            }
        </MainCard>
    )
}

export default ProfileForker