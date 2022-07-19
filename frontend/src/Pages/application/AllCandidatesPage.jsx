import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCandidate, getCandidates } from '../../store/actions/candidateActions'
import { getTypes } from '../../store/actions/typeActions'
import InputField from '../../components/multiStepForm/InputField';
import Meta from '../../components/Meta';
import { Grid,Stack, CircularProgress, Alert, Pagination} from '@mui/material'
import { useTranslation } from 'react-i18next'
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import MainCard from '../../components/cards/MainCard';
import AnimateButton from '../../components/extended/AnimateButton'
import LoadingButton from '@mui/lab/LoadingButton'
import { Form, Formik } from 'formik';
import SearchIcon from '@mui/icons-material/Search';
import DropdownInputField from '../../components/multiStepForm/DropdownInputField';
import CandidateApproveDialog from '../../components/dialogs/CandidateApproveDialog'
import ExportCSV from '../../components/ExportCSV'
import { exportCandidatesCSV } from '../../store/actions/exportActions'
import { CANDIDATES_FETCH_RESET, CANDIDATE_DELETE_RESET, APPROVE_CANDIDATE_RESET } from '../../store/constants/candidateConstants';
import { TYPES_FETCH_RESET } from '../../store/constants/typeConstants';
import { EXPORT_CANDIDATE_FETCH_RESET } from '../../store/constants/exportConstants';
import useLang from '../../hooks/useLang'

const AllCandidatesPage = () => {
    const {t} = useTranslation()
    const dispatch = useDispatch()
    const { lang } = useLang()
    const exportC = useSelector((state) => state.exportCandidatesCSV)
    const { exportCandidates } = exportC
    const [data, setData] = useState([]);

    const [ searchState, setSearchState ] = useState({
        username_filter: "",
        name_filter: "",
        email_filter: "",
        limit: 10
    })
    const [rows, setRows] = useState([]);
    const [id, setId] = useState();
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false)
        dispatch({ type: APPROVE_CANDIDATE_RESET })
        dispatch(getCandidates(searchState.username_filter,searchState.name_filter,searchState.email_filter,0,searchState.limit))
    };

    const handleOpen = (id) => {
        setId(id)
        setOpen(true);
    }

    const candidatesFetch = useSelector((state) => state.candidatesFetch)
    const { loading, error, candidatesGet } = candidatesFetch

    const [page, setPage] = useState(1);

    useEffect(() => {
        dispatch(getCandidates(searchState.username_filter, searchState.name_filter, searchState.email_filter, 0, searchState.limit))
        dispatch(getTypes('user'))
        dispatch(exportCandidatesCSV())
        return () => {
            dispatch({ type: CANDIDATES_FETCH_RESET })
            dispatch({ type: CANDIDATE_DELETE_RESET })
            dispatch({ type: TYPES_FETCH_RESET })
            dispatch({ type: EXPORT_CANDIDATE_FETCH_RESET })
        }
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

    useEffect(() => {
        if(exportCandidates){
            setData(exportCandidates)
        }
    }, [exportCandidates])

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
        dispatch(getCandidates(values.username_filter,values.name_filter,values.email_filter,0,values.limit))
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

    
    const headers = [
        { key: 'id_', label: 'ID'},
        { key: 'username_', label: t('candidates_username')},
        { key: 'full_name_', label: t('candidates_full_name')},
        { key: 'email_', label: 'Email'},
        { key: 'iban_', label: 'IBAN'},
        { key: 'phone_number_', label: t('candidates_phone_number')},
        { key: 'gender_', label: t('candidates_gender')},
        { key: 'birth_date_', label: t('candidates_birth_date')},
        { key: 'location_', label: t('candidates_location')},
        { key: 'address_', label: t('candidates_address')},
        { key: 'postal_code_', label: t('candidates_postal_code')},
        { key: 'cc_', label: 'CC', width: 110 ,headerAlign: "center",align:'center'},
        { key: 'nif_', label: 'NIF'}
    ];
    
    const csvreport = {
        data: data,
        headers: headers,
        filename: 'club_candidates.csv'
    };

    const changePageHandler = (event, value) => {
        setPage(value)
        dispatch(getCandidates(searchState.username_filter, searchState.name_filter, searchState.email_filter, (value-1)*searchState.limit, searchState.limit))
    }


  return (
    <>
        <Meta title={t('all_candidates_page_title')}/>
        <CandidateApproveDialog 
            open={open}
            closeHandler={handleClose}
            id={id}
        />
        <MainCard title={t('all_candidates')} sx={{height: '100%'}}>
            { error && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="error" onClose={() => dispatch({ type: CANDIDATES_FETCH_RESET })}>{t(error)}</Alert></Box> }
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
                                <DropdownInputField name='limit' label={t('rows')} options={[10, 15, 20]} ></DropdownInputField>
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
                        pageSize={searchState.limit}
                        hideFooter={true}
                        localeText={lang}
                        onPageChange={changePageHandler}
                        sx={{
                            "& .MuiDataGrid-columnHeaders": {
                                backgroundColor: "rgba(219, 219, 219, 0.5)"
                            }
                        }}
                    />
                    <Pagination sx={{ mt: 2 }} variant="outlined" shape='rounded' color="primary" count={Math.ceil(candidatesGet.number_of_candidates / searchState.limit)} page={page} onChange={changePageHandler} showFirstButton showLastButton/>
                    <Grid container sx={{ mt: 2 }} >
                        <Grid item>
                            <ExportCSV csvreport={csvreport} exportText={t('export_candidates')} ></ExportCSV>
                        </Grid>
                    </Grid>
                </>
            )}
        </MainCard> 
    </>
  )
}

export default AllCandidatesPage