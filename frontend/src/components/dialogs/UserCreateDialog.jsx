import React, { useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postUser } from '../../store/actions/userActions'
import { Grid, InputAdornment, IconButton,  useMediaQuery, Alert, Box, Dialog, Typography, DialogContent, DialogActions, Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import InputField from '../../components/multiStepForm/InputField';
import MultiStepForm, { FormStep } from '../../components/multiStepForm/MultiStepForm';
import * as Yup from 'yup';
import { parse, isDate } from "date-fns";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PasswordInputField from '../../components/multiStepForm/PasswordInputField'
import DateInputField from '../../components/multiStepForm/DateInputField';
import DropdownInputField from '../../components/multiStepForm/DropdownInputField';
import ImageInputField from '../../components/multiStepForm/ImageInputField';
import { useTheme } from '@mui/material/styles';
import countries from '../../assets/data/countries.json'
import CheckInputField from '../../components/multiStepForm/CheckInputField';

const UserCreateDialog = ({open, closeHandler}) => {
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const theme = useTheme()
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'))

    const typesFetch = useSelector((state) => state.typesFetch)
    const { typesGet } = typesFetch

    const userPost = useSelector((state) => state.userPost)
    const { error: errorPost, posted } = userPost

    const [showPassword, setShowPassword] = useState(false)

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }

    const parseDate = (originalValue) => {
        let parsedDate = isDate(originalValue)
            ? originalValue
            : parse(originalValue, "yyyy-MM-dd", new Date())

        return parsedDate
    }

    const handleSubmit = async (values) => {
        let img = null
        let day = values.birthDate.getDate()
        let month = values.birthDate.getMonth() + 1
        let year = values.birthDate.getFullYear()
        const date = `${year}-${month}-${day}`
        if (values.image) {
            const buffer = await values.image.arrayBuffer()
            img = new Int8Array(buffer)
            var reader = new FileReader();
            reader.onload = function () {
                let base64String = reader.result.replace("data:", "")
                    .replace(/^.+,/, "");
                base64String = 'data:image/jpeg;base64,' + base64String

                dispatch(postUser({full_name: values.fullName,birth_date: date, gender: values.gender, cc: values.cc, nif: values.nif, username: values.username, email: values.email, password: values.password, nationality: values.nationality, location: values.location, address: values.address, phone_number: values.phoneNumber, postal_code: values.postalCode, img : base64String, type: values.memberType, paid_enrollment: values.paidEnrollment, iban: values.iban, enrollment_date: values.enrollmentDate  }))
            }
            reader.readAsDataURL(values.image);
        } else {
            dispatch(postUser({full_name: values.fullName,birth_date: date, gender: values.gender, cc: values.cc, nif: values.nif, username: values.username, email: values.email, password: values.password, nationality: values.nationality, location: values.location, address: values.address, phone_number: values.phoneNumber, postal_code: values.postalCode, img, type: values.memberType, paid_enrollment: values.paidEnrollment, iban: values.iban,  enrollment_date: values.enrollmentDate }))
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
                    {t('create_user')}
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
                    { posted && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="success">{t('user_created_successfully')}</Alert></Box> }
                    { errorPost && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="error">{t(errorPost)}</Alert></Box> }
                        <MultiStepForm initialValues={{ username: '', email: '', password: '', fullName: '', iban: '', cc: '', nif: '', gender: '', nationality: '', birthDate: '', location: '', address: '', phoneNumber: '', postalCode: '', image: null, memberType: '', paidEnrollment: false, enrollmentDate: '' }}
                    onSubmit={handleSubmit}>
                            <FormStep stepName='User' validationSchema={Yup.object().shape({
                                username: Yup.string().required(t('sign_up_username_mandatory')),
                                email: Yup.string().email(t('sign_up_email_valid')).max(255).required(t('sign_up_email_mandatory')),
                                password: Yup.string().max(255).required(t('sign_up_password_mandatory')),
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
                                iban: Yup.string().required(t('sign_up_iban_mandatory')).test('len', t('sign_up_iban_mandatory'), val => val ? val.length === 25 : true),
                                cc: Yup.string().matches(/^[0-9]+$/, t('sign_up_only_digits')).min(9, t('sign_up_exact_nine')).max(9,  t('sign_up_exact_nine')).required( t('sign_up_cc_mandatory')),
                                nif: Yup.string().required(t('sign_up_nif_mandatory')).matches(/^[0-9]+$/, t('sign_up_only_digits')).min(9,  t('sign_up_exact_nine')).max(9,  t('sign_up_exact_nine')),
                                gender: Yup.string().required(t('sign_up_gender_mandatory')),
                                nationality: Yup.string().required(t('sign_up_nationality_mandatory')),
                                birthDate: Yup.date().transform(parseDate).typeError(t('sign_up_valid_date')).max(new Date(), t('sign_up_max_date')).required(t('sign_up_birth_date_mandatory'))
                            })}>
                                <InputField name='fullName' label={t('sign_up_full_name')} type='text'></InputField>
                                <InputField name='iban' label='IBAN' type='text'></InputField>
                                <Grid container spacing={matchDownSM ? 0 : 2}>
                                    <Grid item xs={12} sm={6}>
                                        <InputField name='cc' label={t('sign_up_cc')} type='text'></InputField>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <InputField name='nif' label={t('sign_up_nif')} type='text'></InputField>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={matchDownSM ? 0 : 2}>
                                    <Grid item xs={12} sm={6}>
                                        <DropdownInputField name='gender' label={t('sign_up_gender')} options={{ M: t('male'), F: t('female'), O: t('other') }}></DropdownInputField>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <DropdownInputField name='nationality' label={t('sign_up_nationality')} options={countries}></DropdownInputField>
                                    </Grid>
                                </Grid>
                                <DateInputField name='birthDate' label={t('sign_up_birth_date')}></DateInputField>
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
                                paidEnrollment: Yup.bool().required('é obrigatório'),
                                enrollmentDate: Yup.date().transform(parseDate).typeError(t('sign_up_valid_date')).required(t('enrollment_date_mandatory'))
                            })}>
                                <DropdownInputField name='memberType' label={t('candidates_modal_member_type')} options={typesGet && typesGet.map(type => type.type_).reduce((o, key) => Object.assign(o, {[key]: key}), {})}></DropdownInputField>
                                <CheckInputField name='paidEnrollment' label={t('paid_enrollment_')}/>
                                <DateInputField name='enrollmentDate' label={t('enrollment_date')}></DateInputField>
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

export default UserCreateDialog