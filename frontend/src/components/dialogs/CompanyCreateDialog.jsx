import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Typography, Dialog, DialogActions, DialogContent, Button, Box, Alert,  InputAdornment, IconButton } from '@mui/material'
import { useTranslation } from 'react-i18next'
import * as Yup from 'yup'
import { postCompany } from '../../store/actions/companyActions'
import DropdownInputField from '../../components/multiStepForm/DropdownInputField';
import InputField from '../../components/multiStepForm/InputField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PasswordInputField from '../../components/multiStepForm/PasswordInputField'
import ImageInputField from '../../components/multiStepForm/ImageInputField';
import MultiStepForm, { FormStep } from '../../components/multiStepForm/MultiStepForm';

const CompanyCreateDialog = ({open, closeHandler}) => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const [showPassword, setShowPassword] = useState(false)

    const typesFetch = useSelector((state) => state.typesFetch)
    const { error: errorTypes, typesGet } = typesFetch

    const companyPost = useSelector((state) => state.companyPost)
    const {error: errorPost, posted } = companyPost

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }

    const handleSubmit = async (values) => {
        let img = null
        if (values.image) {
            const buffer = await values.image.arrayBuffer()
            img = new Int8Array(buffer)
            var reader = new FileReader();
            reader.onload = function () {
                let base64String = reader.result.replace("data:", "")
                    .replace(/^.+,/, "");
                base64String = 'data:image/jpeg;base64,' + base64String

                dispatch(postCompany({name: values.fullName, nif: values.nif, username: values.username, email: values.email, password: values.password, location: values.location, address: values.address, phone_number: values.phoneNumber, postal_code: values.postalCode, img: base64String, type: values.memberType, iban: values.iban}))
            }
            reader.readAsDataURL(values.image);
        } else {
            dispatch(postCompany({name: values.fullName, nif: values.nif, username: values.username, email: values.email, password: values.password, location: values.location, address: values.address, phone_number: values.phoneNumber, postal_code: values.postalCode, img , type: values.memberType, iban: values.iban}))
        }
    }


    return (
        <Dialog
                PaperProps={{
                    sx: {
                      width: 500,
                      height: 'fit-content'
                    }
                }}
                open={open}
                onClose={closeHandler}
        >
            <Typography sx={{pl: 3, pt: 5, mb: 1}} id="modal-modal-title" variant="h2" component="h2">
                {t('create_company')}
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
                    { errorTypes && <Box sx={{ pt: 2 }}><Alert severity="error">{t(errorTypes)}</Alert></Box> }
                    { errorPost && <Box sx={{ pt: 2 }}><Alert severity="error">{t(errorPost)}</Alert></Box> }
                    { posted && <Box sx={{ pt: 2 }}><Alert severity="success">{t('company_created_successfully')}</Alert></Box> }
                    <MultiStepForm initialValues={{ username: '', email: '', password: '', fullName: '', iban: '', cc: '', nif: '', gender: '', nationality: '', birthDate: '', location: '', address: '', phoneNumber: '', postalCode: '', image: null, memberType: '', paidEnrollment: false }}
                onSubmit={handleSubmit}>
                        <FormStep stepName='User' validationSchema={Yup.object().shape({
                            username: Yup.string().required(t('sign_up_username_mandatory')),
                            email: Yup.string().email(t('sign_up_email_valid')).max(255).required(t('sign_up_email_mandatory')),
                            password: Yup.string().max(255).required(t('sign_up_password_mandatory'))
                        })}>
                            <InputField name='username' label={t('sign_up_username')} type='text'></InputField>
                            <InputField name='email' label={t('sign_up_email')} type='text'></InputField>
                            <PasswordInputField name='password' label={t('sign_up_password')}
                                showPassword={showPassword} endAdornment={<InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        size="large"
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>}>
                            </PasswordInputField>
                        </FormStep>
                        <FormStep stepName='Personal' validationSchema={Yup.object().shape({
                            fullName: Yup.string().required(t('sign_up_full_name_mandatory')),
                            nif: Yup.string().required(t('sign_up_nif_mandatory')).matches(/^[0-9]+$/, t('sign_up_only_digits')).min(9,  t('sign_up_exact_nine')).max(9,  t('sign_up_exact_nine')),
                            iban: Yup.string().required(t('sign_up_iban_mandatory')).test('len', t('sign_up_iban_mandatory'), val => val ? val.length === 25 : true)
                        })}>
                            <InputField name='fullName' label={t('sign_up_full_name')} type='text'></InputField>
                            <InputField name='nif' label={t('sign_up_nif')} type='text'></InputField>
                            <InputField name='iban' label='IBAN' type='text'></InputField>
                        </FormStep>
                        <FormStep stepName='Personal' validationSchema={Yup.object().shape({
                            location: Yup.string().required(t('sign_up_location_mandatory')),
                            address: Yup.string().required(t('sign_up_address_mandatory')),
                            postalCode: Yup.string().matches(/^\d{4}[-]\d{3}?$/, t('sign_up_postal_code_pattern')).required(t('sign_up_postal_code_mandatory')),
                            phoneNumber: Yup.string().matches(/^[0-9]+$/, t('sign_up_only_digits')).min(9, t('sign_up_exact_nine')).max(9, t('sign_up_exact_nine')).required(t('sign_up_phone_number_mandatory'))
                        })}>
                            <InputField name='location' label={t('sign_up_location')}></InputField>
                            <InputField name='address' label={t('sign_up_address')}></InputField>
                            <InputField name='postalCode' label={t('sign_up_postal_code')}></InputField>
                            <InputField name='phoneNumber' label={t('sign_up_phone_number')}></InputField>
                        </FormStep>
                        <FormStep stepName='Photo' validationSchema={Yup.object().shape({
                            image: Yup.mixed().test('FILE_SIZE', t('sign_up_image_too_big'), value => value == null ? true : (value.size / 1024 / 1024) <= 10).test('FILE_FORMAT', t('sign_up_image_format'), value => value == null ? true : ['image/jpeg', 'image/png'].includes(value.type)).typeError(t('sign_up_valid_image'))
                        })}>
                            <ImageInputField size={200} name='image' label={t('sign_up_image')}></ImageInputField>
                        </FormStep>
                        <FormStep stepName='Member' validationSchema={Yup.object().shape({
                            memberType: Yup.string().required(t('candidates_modal_member_type_mandatory')),
                        })}>
                            <DropdownInputField name='memberType' label={t('candidates_modal_member_type')} options={typesGet && typesGet.map(type => type.type_).reduce((o, key) => Object.assign(o, {[key]: key}), {})}></DropdownInputField>
                        </FormStep>
                    </MultiStepForm>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={closeHandler}>{t('close')}</Button>
            </DialogActions>
        </Dialog>
    )
}

export default CompanyCreateDialog