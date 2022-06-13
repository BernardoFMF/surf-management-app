import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTypes, updateTypes, createType } from '../../store/actions/typeActions'
import * as Yup from 'yup';
import AnimateButton from '../../components/extended/AnimateButton'
import LoadingButton from '@mui/lab/LoadingButton'
import { Stack, CircularProgress, Grid, Alert, Divider} from '@mui/material'
import { useTranslation } from 'react-i18next'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MainCard from '../../components/cards/MainCard';
import InputField from '../../components/multiStepForm/InputField';
import { Formik, Form } from 'formik';
import QuotaManagementCreateDialog from '../../components/dialogs/QuotaManagementCreateDialog'



const QuotasManagementPage = () => {
    const {t, i18n} = useTranslation()
    const dispatch = useDispatch()
    const typesFetch = useSelector((state) => state.typesFetch)
    const { loading, error: errorTypes, typesGet } = typesFetch
    const update = useSelector((state) => state.typesUpdate)
    const { typesUpdate } = update


    const [type, setType] = React.useState();
    
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false)
        dispatch(getTypes())
    };
    const handleOpen = () => setOpen(true);

    useEffect(() => {
        dispatch(getTypes())
    },[])

    const handleSubmitUpdate = async (values) => {
        dispatch(updateTypes(type, values.quota_value))
    }


    return (
    <>
        <QuotaManagementCreateDialog
            open={open}
            closeHandler={handleClose}
        />
        <MainCard title={t('management_title')} sx={{height: '100%'}}>
            { typesUpdate && <Box sx={{ pl: { md: 2 }, pb: 2 }}><Alert variant="outlined" severity="success">{t('updated_sucessfully')}</Alert></Box> }
            { loading ? 
                <Stack alignItems="center">
                    <CircularProgress size='4rem'/>
                </Stack> : (
                    <>
                        <Box sx={{mb : 5}} gridArea={'create'} alignItems={'center'} display='flex' justifyContent={{md : 'flex-end', lg : 'flex-end', xs: 'center'}}> 
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
                        <Grid container justifyContent={'center'} spacing={5} >
                            {
                                typesGet.map(type => 
                                    (
                                        <Formik
                                            key={type.type_}
                                            initialValues={{
                                                quota_value: type.quota_value_, 
                                            }}
                                            validationSchema={Yup.object().shape({
                                                quota_value: Yup.string().required(t('management_quota_value_mandatory')),
                                            })}
                                            onSubmit={handleSubmitUpdate}
                                        >
                                        {formik => (
                                            <Grid item maxWidth={300}>
                                                <Form style={{maxWidth:300}}>
                                        
                                                    <Card key={12} elevation={6} sx={{ minWidth: 275 }}>
                                                        <CardContent>
                                                            <Typography sx={{ fontSize: 22 }} color="primary" gutterBottom>
                                                                {type.type_}
                                                            </Typography>
                                                            <Typography sx={{ fontSize: 16 }} color="secondary" gutterBottom>
                                                                {type.category_}
                                                            </Typography>
                                                            <br />
                                                            <InputField name='quota_value' label={t('management_quota_value')} type='text'>
                                                                {type.quota_value_}
                                                            </InputField>
                                                        </CardContent>
                                                        <CardActions>
                                                            <Button size="small" type="submit" onClick={() => setType(type.type_)}>{t('management_submit')}</Button>
                                                        </CardActions>
                                                    </Card>
                                                </Form>
                                            </Grid>
                                        )}
                                        </Formik>
                                    )
                                ) 
                            }
                        </Grid>
                    </>                   
                )
            }
        </MainCard> 
    </>
  )
}

export default QuotasManagementPage