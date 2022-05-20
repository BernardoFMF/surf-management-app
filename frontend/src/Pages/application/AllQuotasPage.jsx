import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getQuotas, updateQuota, createQuota} from '../../store/actions/quotaActions'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import * as Yup from 'yup';
import { parse, isDate } from "date-fns";

import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import MainCard from '../../components/cards/MainCard';
import DateInputField from '../../components/multiStepForm/DateInputField';
import AnimateButton from '../../components/extended/AnimateButton'
import LoadingButton from '@mui/lab/LoadingButton'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import { Stack, CircularProgress, Grid, Divider} from '@mui/material'
import InputField from '../../components/multiStepForm/InputField';
import { Formik, Form } from 'formik';
import SubCard from '../../components/cards/SubCard'

const AllQuotasPage = () => {
    const theme = useTheme();
    const {t, i18n} = useTranslation()
    const dispatch = useDispatch()
    const quotasFetch = useSelector((state) => state.quotasFetch)
    const { loading, error, quotasGet } = quotasFetch
    const [rows, setRows] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [id, setId] = React.useState();
    const handleClose = () => setOpen(false);

    const handleOpen = (id) => {
        setId(id)
        setOpen(true);
    }

    
    useEffect(() => {
            dispatch(getQuotas())
    },[])

    useEffect(() => {
        if(quotasGet){
            setRows(quotasGet.map(quota => {
                let x = {
                    ...quota, id: quota.id_
                }
                x.date_ = x.date_.split('T')[0]
                if(x.payment_date_)x.payment_date_= x.payment_date_.split('T')[0]
                return x
            }))
        }
    },[quotasGet])

    const updateQuotaHandle = async(values) => {
        let date = values.payment_date.toLocaleString().split(',')[0]
        date = date.split('/')
        const p_date = `${date[2]}-${date[0]}-${date[1]}`
        dispatch(updateQuota(p_date, id))
        dispatch(getQuotas()) //TODO toBe changed
        handleClose()
    }

    const handleSubmitCreate = async (values) => {
        let date = values.date.toLocaleString().split(',')[0]
        date = date.split('/')
        const p_date = `${date[2]}-${date[0]}-${date[1]}`
        dispatch(createQuota(p_date))
        dispatch(getQuotas())
      }

    const parseDate = (originalValue) => {
        let parsedDate = isDate(originalValue)
            ? originalValue
            : parse(originalValue, "yyyy-MM-dd", new Date())

        return parsedDate
    }

const columns = [
    { field: 'member_id_', headerName: t('member_id'), width: 120 },
    { field: 'username_', headerName: t('username'), width: 140 },
    { field: 'email_', headerName: "Email", width: 170 },
    { field: 'phone_number_', headerName: t('candidates_phone_number'), width: 150 },
    { field: 'date_', headerName: t('date'), width: 170 },
    { field: 'payment_date_', headerName: t('payment_date'), width: 170 },
    {
        field: 'actions',
        type: 'actions',
        width: 110,
        getActions: (params) => [
            <GridActionsCellItem
            icon={<CreditScoreIcon />}
            label="Show Quota"
            onClick={() => handleOpen(params.id)}
            disabled={params.row.payment_date_ !== null}
            />
        ],
    },
];


  return (
    <>
    <Dialog
            fullWidth={true}
            open={open}
            onClose={handleClose}
        >
            <Typography sx={{pl: 5, pt: 5}}  variant="h2" component="h2">
                {t('payment_date')}
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
                    <Formik
                        initialValues={{
                            payment_date: ''
                        }}
                        validationSchema={Yup.object().shape({
                            payment_date: Yup.date().transform(parseDate).typeError(t('sign_up_valid_date')).required(t('sign_up_birth_date_mandatory')),
                        })}
                        onSubmit={updateQuotaHandle}
                    >
                    {Formik => (
                        <Form>
                            <DateInputField name='payment_date' label={t('payment_date')}></DateInputField>
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
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
      <MainCard title={t('all_quotas')} sx={{height: '100%'}}>
      { loading ? 
        <Stack alignItems="center">
            <CircularProgress size='4rem'/>
        </Stack> : (
          <Grid  >
            <Grid  >
                <DataGrid
                    autoHeight
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[10]}
                    checkboxSelection
                    experimentalFeatures={{ newEditingApi: true }}
                /> 
            </Grid>
            <br />
            <br />
            <Divider></Divider>
            <br />
            <br />
            <Grid style={{ display: 'flex',alignItems: 'center', justifyContent: 'center'}} sx={{maxWidth:'100%'}} >
                <SubCard elevation={4} title={ <Grid><Typography sx={{ fontSize: 22, minWidth: 370 }} color="primary" gutterBottom> {t('all_quotas_create_quota')} </Typography> </Grid>}   >
                    <Formik
                        initialValues={{
                            date: ''
                        }}
                        validationSchema={Yup.object().shape({
                            date: Yup.date().transform(parseDate).typeError(t('sign_up_valid_date')).required(t('sign_up_birth_date_mandatory')),
                        })}
                        onSubmit={handleSubmitCreate}
                    >
                    {formik => (
                        <Grid item sx={{ ml: { md: 4, lg: 4 }}} maxWidth={300} >
                            <Form  >
                                <DateInputField name='date' label={t('all_quotas_date')}> </DateInputField>
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
                                        {t('management_submit')}
                                    </LoadingButton>
                                </AnimateButton>
                            </Form>
                        </Grid>
                    )}
                    </Formik>
                </SubCard>
            </Grid>
          </Grid>
        )}
      </MainCard> 
    </>
  )
}

export default AllQuotasPage