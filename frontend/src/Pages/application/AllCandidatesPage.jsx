import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCandidate, getCandidates, approveCandidate } from '../../store/actions/candidateActions'
import { getTypes } from '../../store/actions/typeActions'
import InputField from '../../components/multiStepForm/InputField';

import * as Yup from 'yup';

import { Grid,Stack, CircularProgress, FormControlLabel, Alert, Pagination} from '@mui/material'
import { useTranslation } from 'react-i18next'
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MainCard from '../../components/cards/MainCard';
import AnimateButton from '../../components/extended/AnimateButton'
import LoadingButton from '@mui/lab/LoadingButton'
import { Form, Formik } from 'formik';
import SwitchButton from '../../components/SwitchButton';
import DropdownInputField from '../../components/multiStepForm/DropdownInputField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import SearchIcon from '@mui/icons-material/Search';

import Button from '@mui/material/Button';
import CandidateApproveDialog from '../../components/dialogs/CandidateApproveDialog'

const AllCandidatesPage = () => {
    const {t} = useTranslation()
    const dispatch = useDispatch()

    const [rows, setRows] = useState([]);
    const [id, setId] = React.useState();
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false)
        dispatch(getCandidates(searchState.username_filter,searchState.name_filter,searchState.email_filter,0,limit))
    };
    const handleOpen = (id) => {
        setId(id)
        setOpen(true);
    }

    const candidatesFetch = useSelector((state) => state.candidatesFetch)
    const { loading, error, candidatesGet } = candidatesFetch


    const [ searchState, setSearchState ] = useState({
        username_filter: "",
        name_filter: "",
        email_filter: ""
    })

    const [page, setPage] = useState(1);
    const limit = 5


    useEffect(() => {
        dispatch(getCandidates(searchState.username_filter, searchState.name_filter, searchState.email_filter, 0, limit))
        dispatch(getTypes('user'))
    }, [])

    useEffect(() => {
        if(candidatesGet){
            setRows(candidatesGet.candidates.map(candidate => {
                let x = {
                    ...candidate, id: candidate.id_
                }
                return x
            }))
        }
    },[candidatesGet])
    
    const deleteCandidateHandle = React.useCallback(
      (id) => () => {
        setTimeout(() => {
            dispatch(deleteCandidate(id))
            setRows((prevRows) => prevRows.filter(row => row.id !== id))
        });
      },
      [],
    );

    const searchHandler = async(values) => {
        setSearchState(values)
        setPage(1)
        setRows([])
        dispatch(getCandidates(values.username_filter,values.name_filter,values.email_filter,0,limit))
    }

    const columns = [
        { field: 'id_', headerName: 'ID', width: 70 ,headerAlign: "center",align:'center',},
        { field: 'username_', headerName: t('candidates_username'), width: 140 ,headerAlign: "center",align:'center'},
        { field: 'full_name_', headerName: t('candidates_full_name'), width: 250 ,headerAlign: "center",align:'center'},
        { field: 'email_', headerName: 'Email', width: 170,headerAlign: "center",align:'center'},
        { field: 'iban_', headerName: 'IBAN', width: 220,headerAlign: "center",align:'center'},
        { field: 'phone_number_', headerName: t('candidates_phone_number'), width: 150,headerAlign: "center",align:'center'},
        { field: 'gender_', headerName: t('candidates_gender'), width: 130 ,headerAlign: "center",align:'center'},
        { field: 'birth_date_', headerName: t('candidates_birth_date'), width: 160, type: 'date' ,headerAlign: "center",align:'center'},
        { field: 'location_', headerName: t('candidates_location'), width: 100 ,headerAlign: "center",align:'center'},
        { field: 'address_', headerName: t('candidates_address'), width: 180 ,headerAlign: "center",align:'center'},
        { field: 'postal_code_', headerName: t('candidates_postal_code'), width: 110 ,headerAlign: "center",align:'center'},
        { field: 'cc_', headerName: 'CC', width: 110 ,headerAlign: "center",align:'center'},
        { field: 'nif_', headerName: 'NIF', width: 110 ,headerAlign: "center",align:'center'},
        {
            field: 'actions',
            type: 'actions',
            headerName: t('actions'),
            width: 110,
            getActions: (params) => [
                <GridActionsCellItem
                    icon={<HowToRegIcon />}
                    label="Approve Candidate"
                    onClick={() => {
                        handleOpen(params.id)
                    }}
                />,
                <GridActionsCellItem
                    icon={<DeleteIcon />}
                    label="Delete"
                    onClick={deleteCandidateHandle(params.id)}
                />
            ],
        },
    ];

    const changePageHandler = (event, value) => {
        setPage(value)
        dispatch(getCandidates(searchState.username_filter, searchState.name_filter, searchState.email_filter, (value-1)*limit, limit))
    }


  return (
    <>
        <CandidateApproveDialog 
            open={open}
            closeHandler={handleClose}
            id={id}
        />
        <MainCard title={t('all_candidates')} sx={{height: '100%'}}>
            { error && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="error">{t(error)}</Alert></Box> }
            <Formik
                    initialValues={searchState}
                    enableReinitialize={true}
                    onSubmit={values => searchHandler(values)}
                >
                {formik => (
                    <Form>
                        <Grid container spacing={2} direction="row" alignItems={'center'} sx={{ mb: 2}}>
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
                                        {t('search')}
                                    </LoadingButton>
                                </AnimateButton>
                            </Grid>    
                        </Grid>
                    </Form>
                )}
            </Formik>
            { loading ? 
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
                    <Pagination sx={{ mt: 2 }} variant="outlined" shape='rounded' color="primary" count={Math.ceil(candidatesGet.number_of_candidates / limit)} page={page} onChange={changePageHandler} showFirstButton showLastButton/>
                </>
            )}
        </MainCard> 
    </>
  )
}

export default AllCandidatesPage