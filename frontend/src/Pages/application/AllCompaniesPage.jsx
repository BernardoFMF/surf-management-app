import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCompany, getCompanies, postCompany } from '../../store/actions/companyActions'
import BusinessIcon from '@mui/icons-material/Business';
import { Stack, CircularProgress, Dialog, DialogActions, DialogContent, Typography, Button, useMediaQuery, InputAdornment, IconButton } from '@mui/material'
import { getTypes } from '../../store/actions/typeActions'
import { useTranslation } from 'react-i18next'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import MainCard from '../../components/cards/MainCard';
import { Form, Formik } from 'formik';
import InputField from '../../components/multiStepForm/InputField';
import Box from '@mui/material/Box';
import { Grid, Alert} from '@mui/material'
import AnimateButton from '../../components/extended/AnimateButton'
import LoadingButton from '@mui/lab/LoadingButton'
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router';
import { Pagination } from '@mui/material';
import CheckInputField from '../../components/multiStepForm/CheckInputField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PasswordInputField from '../../components/multiStepForm/PasswordInputField'
import DateInputField from '../../components/multiStepForm/DateInputField';
import DropdownInputField from '../../components/multiStepForm/DropdownInputField';
import ImageInputField from '../../components/multiStepForm/ImageInputField';
import MultiStepForm, { FormStep } from '../../components/multiStepForm/MultiStepForm';
import * as Yup from 'yup';
import { useTheme } from '@mui/material/styles';

const AllCompaniesPage = () => {
    const theme = useTheme()
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'))
    const {t} = useTranslation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const companiesFetch = useSelector((state) => state.companiesFetch)
    const { loading, error, companiesGet } = companiesFetch

    const [rows, setRows] = useState([]);

    const [ searchState, setSearchState ] = useState({
      username_filter: "",
      name_filter: "",
      email_filter: ""
    })

    const typesFetch = useSelector((state) => state.typesFetch)
    const { loading: loadingTypes, error: errorTypes, typesGet } = typesFetch

    const companyPost = useSelector((state) => state.companyPost)
    const { loading: loadingPost, error: errorPost, posted } = companyPost
    
    const [page, setPage] = useState(1);
    const limit = 5

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

    useEffect(() => {
        if (posted) {
            setOpen(false)
            setSearchState({
                username_filter: "",
                name_filter: "",
                email_filter: ""
            })
            dispatch(getCompanies(searchState.username_filter, searchState.name_filter, searchState.email_filter, 0, limit))
        }
    }, [posted])

    useEffect(() => {
        dispatch(getCompanies(searchState.username_filter, searchState.name_filter, searchState.email_filter, 0, limit))
        dispatch(getTypes())
    }, [])

    const changePageHandler = (event, value) => {
        setPage(value)
        dispatch(getCompanies(searchState.username_filter, searchState.name_filter, searchState.email_filter, (value-1)*limit, limit))
    }

    const handleSubmit = async (values) => {
        let img = null
        if (values.image) {
            const buffer = await values.image.arrayBuffer()
            img = new Int8Array(buffer)
            var reader = new FileReader();
            reader.onload = function () {
                const base64String = reader.result.replace("data:", "")
                    .replace(/^.+,/, "");

                dispatch(postCompany({name: values.fullName, nif: values.nif, username: values.username, email: values.email, password: values.password, location: values.location, address: values.address, phone_number: values.phoneNumber, postal_code: values.postalCode, img: base64String, type: values.memberType}))
            }
            reader.readAsDataURL(values.image);
        } else {
            dispatch(postCompany({name: values.fullName, nif: values.nif, username: values.username, email: values.email, password: values.password, location: values.location, address: values.address, phone_number: values.phoneNumber, postal_code: values.postalCode, type: values.memberType}))
        }
    }

    useEffect(() => {
        if(companiesGet){
            setRows(companiesGet.companies.map(company => {
                let x = {
                    ...company, id: company.member_id_
                }
                return x
            }))
        }
    },[companiesGet])

    
    const deleteCompanyHandle = React.useCallback(
      (id) => () => {
        setTimeout(() => {
            dispatch(deleteCompany(id))
            setRows((prevRows) => prevRows.filter(row => row.id !== id))
        });
      },
      [],
    );
  
    const searchHandler = async(values) => {
        setSearchState(values)
        setPage(1)
        setRows([])
        dispatch(getCompanies(values.username_filter,values.name_filter,values.email_filter,0,limit))
    }

const columns = [
    { field: 'member_id_', headerName: 'ID', width: 40 },
    { field: 'username_', headerName: t('username'), width: 140 },
    { field: 'name_', headerName: t('name'), width: 150 },
    { field: 'email_', headerName: 'Email', width: 170 },    
    { field: 'nif_', headerName: 'NIF', width: 110 },
    { field: 'has_debt_', headerName: t('has_debt_'), type: 'boolean', width: 130 },
    { field: 'is_deleted_', headerName: t('is_deleted_'), type: 'boolean', width: 130 },
    {
        field: 'actions',
        type: 'actions',
        width: 110,
        getActions: (params) => [
          <GridActionsCellItem
          icon={<BusinessIcon />}
          label="Show Profile"
          onClick={() => navigate(`/application/members/${params.id}`)}
          />,
            <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={deleteCompanyHandle(params.id)}
            disabled={params.row.is_deleted_}
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
                {t('candidates_modal_title')}
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
                    <MultiStepForm initialValues={{ username: '', email: '', password: '', fullName: '', cc: '', nif: '', gender: '', nationality: '', birthDate: '', location: '', address: '', phoneNumber: '', postalCode: '', image: null, memberType: '', paidEnrollment: false }}
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
                        })}>
                            <InputField name='fullName' label={t('sign_up_full_name')} type='text'></InputField>
                            <InputField name='nif' label={t('sign_up_nif')} type='text'></InputField>
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
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
        <MainCard title={t('companies')}sx={{height: '100%'}}>
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
                        sx={{
                            "& .MuiDataGrid-columnHeaders": {
                                backgroundColor: "rgba(219, 219, 219, 0.5)"
                            }
                        }}
                    />
                    <Pagination sx={{ mt: 2 }} variant="outlined" shape='rounded' color="primary" count={Math.ceil(companiesGet.number_of_companies / limit)} page={page} onChange={changePageHandler} showFirstButton showLastButton/>
                </>
            )}
        </MainCard> 
    </>
  )
}

export default AllCompaniesPage