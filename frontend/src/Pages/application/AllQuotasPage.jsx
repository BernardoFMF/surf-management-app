import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getQuotas, updateQuota} from '../../store/actions/quotaActions'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
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
import { Form, Formik } from 'formik';

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
        console.log("abre")
        console.log(id)
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
            dispatch(getQuotas())
    },[])

    useEffect(() => {
        if(quotasGet){
            console.log(quotasGet)
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
        console.log(date)
        const p_date = `${date[2]}-${date[0]}-${date[1]}`
        console.log(p_date)
        dispatch(updateQuota(p_date, id))
        dispatch(getQuotas()) //TODO toBe changed
        handleClose()
    }

    const parseDate = (originalValue) => {
        let parsedDate = isDate(originalValue)
            ? originalValue
            : parse(originalValue, "yyyy-MM-dd", new Date())

        return parsedDate
    }

const columns = [
    { field: 'member_id_', headerName: t('member_id'), width: 100 },
    { field: 'username_', headerName: "Username", width: 130 },
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
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
        Data de pagamento
        </Typography>
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
</Modal>
      <MainCard title='Quotas'sx={{height: '100%'}}>
        <DataGrid
          autoHeight
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          experimentalFeatures={{ newEditingApi: true }}
        /> 
      </MainCard> 
    </>
  )
}

export default AllQuotasPage