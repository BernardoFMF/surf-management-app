import React from 'react'
import '../../assets/scss/forbidden.scss'
import Meta from '../../components/Meta'
import { useTheme } from '@mui/material/styles'
import { Box } from '@mui/material'
import Logo from '../../components/Logo'
import { useTranslation } from 'react-i18next'
import AnyError from './AnyError'

const Unauthorized = () => {
    const theme = useTheme();
    const { t } = useTranslation()

    return (
      <>
        <Meta title={t('unauthorized_page_title')}/>
        {/* logo & toggler button */}
        <AnyError code={401} message={t('unauthorized')}></AnyError>
      </>
        
  )
}

export default Unauthorized