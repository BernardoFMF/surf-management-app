import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Typography, Dialog, DialogActions, DialogContent, Button, Box, Alert,  InputAdornment, IconButton } from '@mui/material'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import InputField from '../../components/multiStepForm/InputField';
import { Form, Formik } from 'formik';
import AnimateButton from '../extended/AnimateButton'
import LoadingButton from '@mui/lab/LoadingButton'
import RadioGroupInputField from '../multiStepForm/RadioGroupInputField'
import CheckGroupInputField from '../multiStepForm/CheckGroupInputField'
import { postGroup } from '../../store/actions/groupActions'

const GroupCreateDialog = ({open, closeHandler}) => {
    const { t } = useTranslation()
    const dispatch = useDispatch()

    const typesFetch = useSelector((state) => state.typesFetch)
    const { typesGet } = typesFetch

    const userSportsTypesFetch = useSelector((state) => state.userSportsTypesFetch)
    const { userSportsTypesGet } = userSportsTypesFetch

    const sportsFetch = useSelector((state) => state.sportsFetch)
    const { sportsGet } = sportsFetch

    const groupPost = useSelector((state) => state.groupPost)
    const { loading: loadingPost, error: errorPost, createdGroup } = groupPost

    const handleSubmit = async (values) => {
        dispatch(postGroup(values))
    }

    return (
        <Dialog
                PaperProps={{
                    sx: {
                      width: 500,
                      height: 600
                    }
                }}
                open={open}
                onClose={closeHandler}
        >
            <Typography sx={{pl: 3, pt: 5, mb: 1}} id="modal-modal-title" variant="h2" component="h2">
                {t('create_group')}
            </Typography>
            <DialogContent>
                <Box
                    sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    m: 'auto',
                    width: 'fit-content',
                    }}
                >
                    { errorPost && <Box sx={{ pt: 2 }}><Alert severity="error">{t(errorPost)}</Alert></Box> }
                    { createdGroup && <Box sx={{ pt: 2 }}><Alert severity="success">{t('group_created_successfully')}</Alert></Box> }
                    <Formik
                        enableReinitialize={true}
                        initialValues={{
                            name: '',
                            description: '',
                            group_type: 'member_type',
                            types: [],
                            sports: []
                        }}
                        validationSchema={Yup.object().shape({
                            name: Yup.string().required(t('group_name_mandatory')),
                            description: Yup.string().required(t('group_description_mandatory')),
                            group_type: Yup.string().required(t('group_type_mandatory')),
                            types: Yup.array().of(Yup.string()).test({ message: t('group_types_mandatory'), test: arr => arr.length > 0 }),
                            sports: Yup.array().of(Yup.number())
                        })}
                        onSubmit={handleSubmit}
                    >
                    {formik => (
                        <Form>
                            <InputField name='name' label={t('group_name')} type='text'></InputField>
                            <InputField name='description' label={t('group_description')} type='text'></InputField>
                            <RadioGroupInputField
                                label={t("types")}
                                name="group_type"
                                dependent="types"
                                options={[{label: "member_type", value: t("member_type")}, {label: "member_sport_type", value: t("member_sport_type")}]}
                            />
                            <Box marginBottom={2}>
                            {
                                formik.values.group_type == "member_type" ? (
                                    <CheckGroupInputField
                                        name="types"
                                        label={t("types")}
                                        options={
                                            typesGet.map(type => { let obj = {name: type.type_, label: type.type_}; return obj})
                                        }
                                    />
                                ) : (
                                    <>
                                        <CheckGroupInputField
                                            name="types"
                                            label={t("types")}
                                            options={
                                                userSportsTypesGet
                                            }
                                        />
                                        <CheckGroupInputField
                                            name="sports"
                                            label={t("sports")}
                                            options={
                                                sportsGet.map(sport => { let obj = {name: sport.id_, label: sport.name_}; return obj})
                                            }
                                        />
                                    </>
                                    
                                )
                            }
                            </Box>
                            <AnimateButton>
                                <LoadingButton
                                    disableElevation
                                    fullWidth
                                    size="normal"
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    loading={loadingPost}
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
                <Button onClick={closeHandler}>{t('close')}</Button>
            </DialogActions>
        </Dialog>
    )
}

export default GroupCreateDialog