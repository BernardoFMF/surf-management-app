import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSports, deleteSport, createSport } from '../../store/actions/sportActions'

import { useTranslation } from 'react-i18next'
import { DataGrid, GridActionsCellItem } from '@mui/x-data-grid'
import DeleteIcon from '@mui/icons-material/Delete'
import SurfingIcon from '@mui/icons-material/Surfing'
import MainCard from '../../components/cards/MainCard'
import { Stack, CircularProgress, Grid} from '@mui/material'
import { useNavigate } from 'react-router'
import AnimateButton from '../../components/extended/AnimateButton'
import LoadingButton from '@mui/lab/LoadingButton'
import Typography from '@mui/material/Typography';
import InputField from '../../components/multiStepForm/InputField';
import { Formik, Form } from 'formik';
import SubCard from '../../components/cards/SubCard'
import * as Yup from 'yup';

const AllSportsPage = () => {
    const {t} = useTranslation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const sportsFetch = useSelector((state) => state.sportsFetch)
    const { loading, error, sportsGet } = sportsFetch
    const [rows, setRows] = useState([]);
    
    useEffect(() => {
      dispatch(getSports())
    },[])

    useEffect(() => {
        if(sportsGet){
            setRows(sportsGet.map(sport => {
                let x = {
                    ...sport, id: sport.id_
                }
                return x
            }))
        }
    },[sportsGet])

    
    const deleteSportHandle = React.useCallback(
      (id) => () => {
        setTimeout(() => {
            dispatch(deleteSport(id))
            setRows((prevRows) => prevRows.filter(row => row.id !== id))
        });
      },
      [],
    )

    const handleSubmitCreate = async (values) => {
      dispatch(createSport(values.name))
      dispatch(getSports())
    }
const columns = [
    { field: 'name_', headerName: t('name'), width: 150 },
    { field: 'is_deleted_', type: 'boolean', headerName: t('is_deleted'), width: 130 },
    { field: 'practitioners_', headerName: t('practitioners'), width: 170 },
    {
        field: 'actions',
        type: 'actions',
        width: 110,
        getActions: (params) => [
            <GridActionsCellItem
            icon={<SurfingIcon />}
            label="Show Sport"
            onClick={() => navigate(`/application/sports/${params.id}`)}
            />,
            <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete Sport"
            onClick={deleteSportHandle(params.id)}
            disabled={params.row.is_deleted_}
            />
        ],
    },
];


  return (
    <>
      
      <MainCard title='Sports'sx={{height: '100%'}}>
      { loading ? 
        <Stack alignItems="center">
            <CircularProgress size='4rem'/>
        </Stack> : (
          <Grid container>
              <Grid item sx={{ width: {md: 1/2, sm: '100%', xs: '100%'} }}>
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
              <Grid item style={{ display: 'flex',alignItems: 'center'}} sx={{ ml: {md: 22, lg: 45},maxWidth:'100%'}} >
              <SubCard elevation={4} title={ <Grid><Typography sx={{ fontSize: 22, minWidth: 370 }} color="primary" gutterBottom> {t('all_sports_create_sport')} </Typography> </Grid>}   >
                    <Formik
                        initialValues={{
                            name: '',
                        }}
                        validationSchema={Yup.object().shape({
                            name: Yup.string().required(t('all_sports_name_mandatory')),
                        })}
                        onSubmit={handleSubmitCreate}
                    >
                    {formik => (
                        <Grid item sx={{ ml: { md: 4, lg: 4 }}} maxWidth={300} >
                            <Form  >
                                <InputField name='name' label={t('all_sports_name')} type='text'>
                                </InputField>
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

export default AllSportsPage