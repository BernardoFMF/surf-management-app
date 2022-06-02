import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Typography, Dialog, DialogActions, DialogContent, Button, Box, Alert, Grid, FormControl } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { Form, Formik } from 'formik'
import LoadingButton from '@mui/lab/LoadingButton'
import AnimateButton from '../extended/AnimateButton';
import * as Yup from 'yup'
import InputField from '../multiStepForm/InputField'
import CheckGroupInputField from '../multiStepForm/CheckGroupInputField'
import CheckInputField from '../multiStepForm/CheckInputField'
import ChipInputField from '../multiStepForm/ChipInputField'
import { updateUserSports } from '../../store/actions/userActions'

const UserSportEditDialog = ({open, closeHandler, doWhenUnmount, userSport}) => {
    const { t } = useTranslation()

    const dispatch = useDispatch()
    const userSportUpdate = useSelector((state) => state.userSportUpdate)
    const { loading, error, updateResult } = userSportUpdate

    const editUserSportHandler = (values) => {
        dispatch(updateUserSports(userSport.user_id_, userSport.sport_id_, values))
    }

    useEffect(() => {
        return () => { 
            console.log("unmounted");
            doWhenUnmount() 
        }
    }, [])

    return (
        <>
            <Dialog
                PaperProps={{
                    sx: {
                        width: 500
                    }
                }}
                open={open}
                onClose={closeHandler}
            >
                <Typography sx={{pl: 5, pt: 5}} id="modal-modal-title" variant="h2" component="h2">
                    teste
                </Typography>
                <DialogContent>
                    { error && <Box sx={{ pt: 2 }}><Alert severity="error">{t(error)}</Alert></Box> }
                    { updateResult && <Box sx={{ pt: 2 }}><Alert severity="success">{t('updated_sucessfully')}</Alert></Box> }
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            m: 'auto',
                            width: 'fit-content',
                            mt: 1
                        }}
                    >
                        <Formik
                            enableReinitialize={true}
                            initialValues={{
                                type: userSport.type_,
                                fed_number: userSport.fed_number_,
                                fed_id: userSport.fed_id_,
                                fed_name: userSport.fed_name_,
                                years_federated: userSport.years_federated_,
                                is_absent: userSport.is_absent_
                            }}
                            validationSchema={Yup.object().shape({
                                type: Yup.array().of(Yup.string()).min(1, t('sport_type_mandatory')),
                                fed_number: Yup.string().required(t('fed_number_mandatory')),
                                fed_id: Yup.string().required(t('fed_id_mandatory')),
                                fed_name: Yup.string().required(t('fed_name_mandatory')),
                                years_federated: Yup.array().of(Yup.number()),
                                is_absent: Yup.bool()
                            })}
                            onSubmit={editUserSportHandler}
                        >
                        {formik => (
                            <Form>
                                <CheckGroupInputField
                                    name="type"
                                    label="Types"
                                    options={[
                                        {
                                            name: "practitioner",
                                            label: "Practitioner"
                                        },
                                        { 
                                            name: "coach", 
                                            label: "Coach" 
                                        },
                                        {
                                            name: "apprentice", 
                                            label: "Apprentice" 
                                        },
                                        {
                                            name: "jury", 
                                            label: "Jury" 
                                        },
                                    ]}
                                />
                                <InputField name='fed_number' label={t('fed_number')} type='text'></InputField>
                                <InputField name='fed_id' label={t('fed_id')} type='text'></InputField>
                                <InputField name='fed_name' label={t('fed_name')} type='text'></InputField>
                                <Box sx={{ pt: 2, pb: 2 }}>
                                    <ChipInputField name='years_federated' label={t('years_federated')} startingOptions={userSport.years_federated_} type='number' placeholder={t('year')}></ChipInputField>
                                </Box>
                                {userSport.is_absent_ && <CheckInputField name='is_absent' label={t('is_absent')}/>}
                                <AnimateButton>
                                    <LoadingButton
                                        disableElevation
                                        fullWidth
                                        size="normal"
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        loading={loading}
                                    >
                                        {t('sign_up_submit')}
                                    </LoadingButton>
                                </AnimateButton>
                            </Form>
                        )}
                        </Formik>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeHandler}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default UserSportEditDialog