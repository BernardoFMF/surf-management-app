import { useTranslation } from 'react-i18next'
import { useSelector, useDispatch } from 'react-redux'
import AnyError from '../Pages/error/AnyError';
import React from 'react'
import { logout } from '../store/actions/memberActions'

function RequireNotDeleted({ children }) {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const memberLogin = useSelector((state) => state.memberLogin)
    const { memberInfo } = memberLogin

    if ( memberInfo && memberInfo.is_deleted_ === true) {
        localStorage.removeItem('memberInfo')
        dispatch(logout())
    }

    return memberInfo && memberInfo.is_deleted_ === false ? children : <AnyError message={t('You are not longer part of the club')} extraMessage={`${t('Feel free to contact us via email')} - `}></AnyError>
}

export default RequireNotDeleted