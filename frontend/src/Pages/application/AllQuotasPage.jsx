import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getQuotas, updateQuota} from '../../store/actions/quotaActions'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import * as Yup from 'yup';
import { parse, isDate } from "date-fns";
import useScriptRef from '../../hooks/useScriptRef'

import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid';
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import MainCard from '../../components/cards/MainCard';
import DateInputField from '../../components/multiStepForm/DateInputField';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import TextField from '@mui/material/TextField';
import { Form, Formik } from 'formik';

const AllQuotasPage = () => {
    const theme = useTheme();
    const {t, i18n} = useTranslation()
    const dispatch = useDispatch()
    const quotasFetch = useSelector((state) => state.quotasFetch)
    const { loading, error, quotasGet } = quotasFetch
    const [rows, setRows] = useState([]);
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [value, setValue] = React.useState(new Date('2021-05-06'));
    const scriptedRef = useScriptRef()

    const handleChange = (newValue) => {
        setValue(newValue);
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

    const updateQuotaHandle = React.useCallback(
      (id) => () => {
        setRows((prevRows) =>
          prevRows.map((row) =>
            row.id === id ? { ...row, isAdmin: !row.isAdmin } : row,
          ),
        );
        console.log(id)
      },
      [],
    );

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
            onClick={handleOpen}
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
        Text in a modal
        </Typography>
        <Formik
            initialValues={{
                date: '2021-01-01'
            }}
            validationSchema={Yup.object().shape({
                date: Yup.date().transform(parseDate).typeError(t('sign_up_valid_date')).max(new Date(), t('sign_up_max_date')).required(t('sign_up_birth_date_mandatory')),
            })}
            onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                try {
                    if (scriptedRef.current) {
                        setStatus({ success: true })
                        setSubmitting(false)
                    }
                } catch (err) {
                    if (scriptedRef.current) {
                        setStatus({ success: false })
                        setErrors({ submit: err.message })
                        setSubmitting(false)
                    }
                }
            }}
        >
        {formik => (
            <Form>
                <DateInputField name='birth_date' label={t('sign_up_birth_date')}></DateInputField>
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