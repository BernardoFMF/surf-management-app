import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCandidate, getCandidates, approveCandidate } from '../../store/actions/candidateActions'
import { getTypes } from '../../store/actions/typeActions'

import * as Yup from 'yup';

import { Grid, useMediaQuery, Stack, CircularProgress, FormControlLabel, Alert} from '@mui/material'
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next'
import HowToRegIcon from '@mui/icons-material/HowToReg';
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import MainCard from '../../components/cards/MainCard';
import AnimateButton from '../../components/extended/AnimateButton'
import LoadingButton from '@mui/lab/LoadingButton'
import { Form, Formik } from 'formik';
import SwitchButton from '../../components/SwitchButton';
import DropdownInputField from '../../components/multiStepForm/DropdownInputField';



const AllCandidatesPage = () => {
    const theme = useTheme();
    const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

    const {t, i18n} = useTranslation()
    const dispatch = useDispatch()

    const [rows, setRows] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [id, setId] = React.useState();
    const handleClose = () => setOpen(false);

    const candidatesFetch = useSelector((state) => state.candidatesFetch)
    const { loading, error, candidatesGet } = candidatesFetch

    const typesFetch = useSelector((state) => state.typesFetch)
    const { error: errorTypes, typesGet } = typesFetch

    const handleOpen = (id) => {
        setId(id)
        setOpen(true);
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    useEffect(() => {
        dispatch(getCandidates())
        dispatch(getTypes())
    },[])

    useEffect(() => {
        if(candidatesGet){
            setRows(candidatesGet.map(candidate => {
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

    const approveCandidateHandle = async(values) => {
        dispatch(approveCandidate(id, values.member_type, values.paid_enrollment))
        dispatch(getCandidates()) //TODO toBe changed
        handleClose()
    }

const columns = [
    { field: 'id_', headerName: 'ID', width: 70 },
    { field: 'username_', headerName: t('candidates_username'), width: 140 },
    { field: 'full_name_', headerName: t('candidates_full_name'), width: 250, headerAlign: 'center' },
    { field: 'email_', headerName: 'Email', width: 170 , headerAlign: 'center' },
    { field: 'phone_number_', headerName: t('candidates_phone_number'), width: 150},
    { field: 'gender_', headerName: t('candidates_gender'), width: 130 },
    { field: 'birth_date_', headerName: t('candidates_birth_date'), width: 160, type: 'date' },
    { field: 'location_', headerName: t('candidates_location'), width: 100 },
    { field: 'address_', headerName: t('candidates_address'), width: 180, headerAlign: 'center'  },
    { field: 'postal_code_', headerName: t('candidates_postal_code'), width: 110 },
    { field: 'cc_', headerName: 'CC', width: 110 },
    { field: 'nif_', headerName: 'NIF', width: 110 },
    {
        field: 'actions',
        type: 'actions',
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


  return (
    <>
        { error && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="error">{t(error)}</Alert></Box> }
        { errorTypes && !error && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="error">{t(errorTypes)}</Alert></Box> }
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h2" component="h2">
                    {t('candidates_modal_title')}
                </Typography>
                <Formik
                    initialValues={{
                        member_type: '',
                        paid_enrollment: false
                    }}
                    validationSchema={Yup.object().shape({
                        member_type: Yup.string().required(t('candidates_modal_member_type_mandatory')),
                    })}
                    onSubmit={approveCandidateHandle}
                >
                {formik => (
                    <Form>
                        <Grid item xs={12} sm={6} paddingY={2}>
                            <DropdownInputField name='member_type' label={t('candidates_modal_member_type')} options={typesGet.map(type => type.type_).reduce((o, key) => Object.assign(o, {[key]: key}), {})}></DropdownInputField>
                        </Grid>
                        <Grid item xs={12} sm={6} paddingY={1} >
                            <FormControlLabel onChange={formik.handleChange} control={<SwitchButton sx={{ m: 1 }} checked={formik.values.paid_enrollment} />}
                                label={t('candidates_modal_paid_enrollment')} name='paid_enrollment' labelPlacement='start'
                            />
                        </Grid>
                        <AnimateButton>
                            <LoadingButton
                                disableElevation
                                fullWidth
                                size="large"
                                type="submit"
                                variant="contained"
                                color="primary"
                                loading = {loading}
                            >
                                {t('confirm')}
                            </LoadingButton>
                        </AnimateButton>
                    </Form>
                )}
                </Formik>
            </Box>
        </Modal>
      <MainCard title='Candidates'sx={{height: '100%'}}>
      { loading ? 
        <Stack alignItems="center">
            <CircularProgress size='4rem'/>
        </Stack> :
        <DataGrid
          autoHeight
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          experimentalFeatures={{ newEditingApi: true }}
        /> 
      }
      </MainCard> 
    </>
  )
}

export default AllCandidatesPage