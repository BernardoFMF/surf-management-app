import React, { useEffect } from 'react'
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
import SubCard from '../../components/cards/SubCard'
import DropdownInputField from '../../components/multiStepForm/DropdownInputField';


const QuotasManagementPage = () => {
    const {t, i18n} = useTranslation()
    const dispatch = useDispatch()
    const typesFetch = useSelector((state) => state.typesFetch)
    const { loading, error: errorTypes, typesGet } = typesFetch
    const update = useSelector((state) => state.typesUpdate)
    const { typesUpdate } = update
    const create = useSelector((state) => state.createType)
    const { createT } = create

    const [type, setType] = React.useState();
    
    useEffect(() => {
        dispatch(getTypes())
    },[])

    const handleSubmitUpdate = async (values) => {
        dispatch(updateTypes(type, values.quota_value))
    }

    const handleSubmitCreate = async (values) => {
        dispatch(createType(values.type, values.quota_value, values.category))
        dispatch(getTypes())
    }
    return (
    <>
        <MainCard title={t('management_title')} sx={{height: '100%'}}>
            { typesUpdate && <Box sx={{ pl: { md: 2 }, pb: 2 }}><Alert variant="outlined" severity="success">{t('updated_sucessfully')}</Alert></Box> }
            { createT && <Box sx={{ pl: { md: 2 }, pb: 2 }}><Alert variant="outlined" severity="success">{t('management_create_alert')}</Alert></Box> }
            { loading ? 
                <Stack alignItems="center">
                    <CircularProgress size='4rem'/>
                </Stack> : (
                    <>
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
                        <br />
                        <br />
                        <Divider></Divider>
                        <br />
                        <br />
                        <Grid style={{ display: 'flex',alignItems: 'center',justifyContent: 'center'}} sx={{ maxWidth: '100%' }}>
                            <SubCard elevation={2} title={ <Typography sx={{ fontSize: 22, minWidth: 370 }} color="primary" gutterBottom> {t('management_create')} </Typography>}   >
                                <Formik
                                    initialValues={{
                                        type: '',
                                        quota_value: '', 
                                        category: ''
                                    }}
                                    validationSchema={Yup.object().shape({
                                        type: Yup.string().required(t('management_type_mandatory')),
                                        quota_value: Yup.string().required(t('management_quota_value_mandatory')),
                                        category: Yup.string().required(t('category_mandatory'))
                                    })}
                                    onSubmit={handleSubmitCreate}
                                >
                                {formik => (
                                    <Grid item sx={{ ml: { md: 4, lg: 4 }}} maxWidth={300} >
                                        <Form  >
                                            <InputField name='type' label={t('management_quota_type')} type='text'>
                                            </InputField>
                                            <InputField name='quota_value' label={t('management_quota_value')} type='text'>
                                            </InputField>
                                            <DropdownInputField name='category' label={t('category')} options={['user', 'company']}></DropdownInputField>
                                            <br/>
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
                        </>                   
                )
            }
        </MainCard> 
    </>
  )
}

export default QuotasManagementPage