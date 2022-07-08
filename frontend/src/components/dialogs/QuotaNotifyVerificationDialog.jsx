import React from 'react'
import { useDispatch } from 'react-redux'
import { Typography, Dialog, DialogActions, DialogContent, Button } from '@mui/material'
import { useTranslation } from 'react-i18next'

import { sendEmailNotify } from '../../store/actions/emailActions'

const QuotaManagementCreateDialog = ({open, closeHandler}) => {
    const { t } = useTranslation()
    const dispatch = useDispatch()

    const handleNotify = async () => {
        dispatch(sendEmailNotify())
        closeHandler()
    }

    return (
        <Dialog
        PaperProps={{
            sx: {
            width: 400,
            height: 'fit-content'
            }
        }}
        open={open}
        onClose={closeHandler}
        >
            <Typography sx={{pl: 5, pt: 5}} id="modal-modal-title" variant="h2" component="h2">
                {t('Are you sure?')}
            </Typography>
            <DialogContent>
                <Typography sx={{pl: 3}} id="modal-modal-title" variant="p" component="p">
                    {t('Message for notify')}
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleNotify}>{t('Yes')}</Button>
                <Button onClick={closeHandler}>{t('No')}</Button>
            </DialogActions>
        </Dialog>
    )
}

export default QuotaManagementCreateDialog