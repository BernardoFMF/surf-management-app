import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, getUsers, postUser } from '../../store/actions/userActions'
import { Form, Formik } from 'formik';
import { Grid, Stack, Pagination, InputAdornment, IconButton, CircularProgress, useMediaQuery, Alert, Box, Dialog, Typography, DialogContent, DialogActions, Button } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { DataGrid, GridActionsCellItem, ptBR } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MainCard from '../../components/cards/MainCard';
import { useNavigate } from 'react-router';
import SearchIcon from '@mui/icons-material/Search';
import InputField from '../../components/multiStepForm/InputField';
import AnimateButton from '../../components/extended/AnimateButton'
import LoadingButton from '@mui/lab/LoadingButton'
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
import { getTypes } from '../../store/actions/typeActions'
import CheckInputField from '../../components/multiStepForm/CheckInputField';

const AllMembersPage = () => {
    const theme = useTheme()
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'))
    const navigate = useNavigate()
    const { t } = useTranslation()
    const dispatch = useDispatch()
    const userFetch = useSelector((state) => state.usersFetch)
    const { loading, error, usersGet } = userFetch

    const userPost = useSelector((state) => state.userPost)
    const { loading: loadingPost, error: errorPost, posted } = userPost

    const typesFetch = useSelector((state) => state.typesFetch)
    const { loading: loadingTypes, error: errorTypes, typesGet } = typesFetch

    const [rows, setRows] = useState([]);

    const [showPassword, setShowPassword] = useState(false)

    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    }

    const [ searchState, setSearchState ] = useState({
      username_filter: "",
      name_filter: "",
      email_filter: ""
  })

    const [page, setPage] = useState(1);
    const limit = 5

    useEffect(() => {
        if (posted) {
            setOpen(false)
            setSearchState({
                username_filter: "",
                name_filter: "",
                email_filter: ""
            })
            dispatch(getUsers(searchState.username_filter, searchState.name_filter, searchState.email_filter, 0, limit))
        }
    }, [posted])
    
    useEffect(() => {
        dispatch(getUsers(searchState.username_filter, searchState.name_filter, searchState.email_filter, 0, limit))
        dispatch(getTypes())
    }, [])

    useEffect(() => {
        if(usersGet){
            setRows(usersGet.users.map(user => {
                let x = {
                    ...user, id: user.member_id_
                }
                return x
            }))
        }
    },[usersGet])

    const parseDate = (originalValue) => {
        let parsedDate = isDate(originalValue)
            ? originalValue
            : parse(originalValue, "yyyy-MM-dd", new Date())

        return parsedDate
    }

    const deleteUserHandle = React.useCallback(
      (id) => () => {
        setTimeout(() => {
            dispatch(deleteUser(id))
            setRows((prevRows) => prevRows.filter(row => row.id !== id))
        });
      },
      [],
    )

    const searchHandler = async(values) => {
        setSearchState(values)
        setPage(1)
        setRows([])
        dispatch(getUsers(values.username_filter,values.name_filter,values.email_filter,0,limit))
    }

    const changePageHandler = (event, value) => {
        setPage(value)
        dispatch(getUsers(searchState.username_filter, searchState.name_filter, searchState.email_filter, (value-1)*limit, limit))
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

                dispatch(postUser({full_name: values.fullName,birth_date: date, gender: values.gender, cc: values.cc, nif: values.nif, username: values.username, email: values.email, password: values.password, nationality: values.nationality, location: values.location, address: values.address, phone_number: values.phoneNumber, postal_code: values.postalCode, img : base64String, type: values.memberType, paid_enrollment: values.paidEnrollment, iban: values.iban  }))
            }
            reader.readAsDataURL(values.image);
        } else {
            dispatch(postUser({full_name: values.fullName,birth_date: date, gender: values.gender, cc: values.cc, nif: values.nif, username: values.username, email: values.email, password: values.password, nationality: values.nationality, location: values.location, address: values.address, phone_number: values.phoneNumber, postal_code: values.postalCode, img, type: values.memberType, paid_enrollment: values.paidEnrollment, iban: values.iban }))
        }
    }

    const columns = [
        { field: 'member_id_', headerName: 'ID', width: 40 },
        { field: 'username_', headerName: t('candidates_username'), width: 200 },
        { field: 'full_name_', headerName: t('full_name'), width: 180 },
        { field: 'email_', headerName: 'Email', width: 170},
        { field: 'iban_', headerName: 'IBAN', width: 220},
        { field: 'gender_', headerName: t('gender'), width: 110 },    
        { field: 'nationality_', headerName: t('nationality'), width: 130 },
        { field: 'birth_date_', headerName: t('birth_date'), width: 150 },
        { field: 'member_type_', headerName: t('member_type'), width: 130 },
        { field: 'has_debt_', headerName: t('has_debt_'), width: 110 , type: 'boolean'},
        { field: 'paid_enrollment_', headerName: t('paid_enrollment_'), width: 120, type: 'boolean' },
        { field: 'is_admin_', headerName: t('is_admin_'), width: 120 , type: 'boolean'},
        { field: 'is_deleted_', headerName: t('is_deleted_'), width: 120, type: 'boolean'},
        {
            field: 'actions',
            type: 'actions',
            headerName: t('actions'),
            width: 110,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<AccountCircleIcon />}
                    label="Show Profile"
                    onClick={() => navigate(`/application/members/${params.id}`)}
                />,
                <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Delete"
                    onClick={deleteUserHandle(params.id)}
                    disabled={params.row.is_deleted_ || params.row.member_id_ === params.id}
                />
            ],
        },
    ];

    return (
        <>
            <Dialog
                PaperProps={{
                    sx: {
                      width: 500,
                      height: 600
                    }
                }}
                open={open}
                onClose={handleClose}
            >
                <Typography sx={{pl: 5, pt: 5, mb: 1}} id="modal-modal-title" variant="h2" component="h2">
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
                        { errorPost && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="error">{t(errorPost)}</Alert></Box> }
                        <MultiStepForm initialValues={{ username: '', email: '', password: '', fullName: '', iban: '', cc: '', nif: '', gender: '', nationality: '', birthDate: '', location: '', address: '', phoneNumber: '', postalCode: '', image: null, memberType: '', paidEnrollment: false }}
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
                                paidEnrollment: Yup.bool().required('é obrigatório')
                            })}>
                                <DropdownInputField name='memberType' label={t('candidates_modal_member_type')} options={typesGet && typesGet.map(type => type.type_).reduce((o, key) => Object.assign(o, {[key]: key}), {})}></DropdownInputField>
                                <CheckInputField name='paidEnrollment' label='paid enrollment'/>
                            </FormStep>
                        </MultiStepForm>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
            <MainCard title={t('all_users')} direction='ltr' sx={{height: '100%'}}>
                { error && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="error">{t(error)}</Alert></Box> }
                { errorTypes && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="error">{t(errorTypes)}</Alert></Box> }
                <Box
                    sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: 1,
                    gridTemplateRows: 'auto',
                    gridTemplateAreas: `". . . ."
                    "search search . create"
                    ". . . ."`,
                    }}
                >
                    <Box gridArea={'search'}>
                        <Formik
                            initialValues={searchState}
                            enableReinitialize={true}
                            onSubmit={values => searchHandler(values)}
                        >
                            {formik => (
                                <Form>
                                    <Grid container spacing={2} direction="row" alignItems={'center'}>
                                        <Grid item>
                                            <InputField name='username_filter' label={t('sign_up_username')} type='text'></InputField>
                                        </Grid>
                                        <Grid item>
                                            <InputField name='name_filter' label={t('sign_up_full_name')} type='text' ></InputField>
                                        </Grid>
                                        <Grid item>
                                            <InputField name='email_filter' label={t('sign_up_email')} type='text' ></InputField>
                                        </Grid>
                                        <Grid item>
                                            <AnimateButton>
                                                <LoadingButton
                                                    disableElevation
                                                    size="large"
                                                    type="submit"
                                                    variant="contained"
                                                    color="primary"
                                                    loading = {loading}
                                                    startIcon={<SearchIcon></SearchIcon>}
                                                >
                                                    {t('Search')}
                                                </LoadingButton>
                                            </AnimateButton>
                                        </Grid>     
                                    </Grid>
                                </Form>
                            )}
                        </Formik>
                    </Box>
                    <Box gridArea={'create'} alignItems={'center'} display='flex' justifyContent='flex-end'>
                        <AnimateButton>
                            <LoadingButton
                                disableElevation
                                size="large"
                                variant="outlined"
                                color="secondary"
                                onClick={() => {
                                    handleOpen()
                                }}
                            >
                                {t('create')}
                            </LoadingButton>
                        </AnimateButton>
                    </Box> 
                </Box>
                
                
                { loading || loadingTypes ? 
                    <Stack alignItems="center">
                        <CircularProgress size='4rem'/>
                    </Stack> : (
                    <>
                        <DataGrid
                            autoHeight
                            rows={rows}
                            columns={columns}
                            pageSize={limit}
                            hideFooter={true}
                            onPageChange={changePageHandler}
                            scrollbarSize={20}
                            sx={{
                                "& .MuiDataGrid-columnHeaders": {
                                    backgroundColor: "rgba(219, 219, 219, 0.5)"
                                }
                            }}
                        />
                        <Pagination sx={{ mt: 2 }} variant="outlined" shape='rounded' color="primary" count={Math.ceil(usersGet.number_of_users / limit)} page={page} onChange={changePageHandler} showFirstButton showLastButton/>
                    </>
                )}
            </MainCard> 
        </>
    )
}

export default AllMembersPage