import React, { useState, useEffect, useCallback  } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSports, deleteSport, createSport, updateSport } from '../../store/actions/sportActions'
import { useTheme } from '@mui/material/styles'

import { useTranslation } from 'react-i18next'
import DeleteIcon from '@mui/icons-material/Delete'
import SurfingIcon from '@mui/icons-material/Surfing'
import MainCard from '../../components/cards/MainCard'
import { Stack, CircularProgress, Grid, Divider, ButtonBase} from '@mui/material'
import { useNavigate } from 'react-router'
import AnimateButton from '../../components/extended/AnimateButton'
import LoadingButton from '@mui/lab/LoadingButton'
import Typography from '@mui/material/Typography';
import InputField from '../../components/multiStepForm/InputField';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Formik, Form } from 'formik';
import SubCard from '../../components/cards/SubCard'
import * as Yup from 'yup';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ForwardIcon from '@mui/icons-material/Forward';
import UserSportApplyDialog from '../../components/dialogs/UserSportApplyDialog';

const AllSportsPage = () => {
    const {t, i18n} = useTranslation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [openDialog, setOpenDialog] = useState(false);
    const closeDialogHandler = useCallback(function _handleClose() {
      setOpenDialog(false);
      dispatch(getSports())
    }, []);
    const [sid, setSid] = useState(0);

    const [sports, setSports] = useState([])

    const memberLogin = useSelector((state) => state.memberLogin)
    const { memberInfo } = memberLogin

    const sportsFetch = useSelector((state) => state.sportsFetch)
    const { loading, error, sportsGet } = sportsFetch

    const sportUpdate = useSelector((state) => state.updateSport)
    const { loading: loadingUpdate, updateSport: update } = sportUpdate

    const sportDelete = useSelector((state) => state.sportDeletion)
    const { sportsDeletion } = sportDelete
    
    useEffect(() => {
      dispatch(getSports())
    },[update, sportsDeletion])

    useEffect(() => {
      dispatch(getSports())
    },[])


    useEffect(() => {
      if(sportsGet) setSports(sportsGet)
    },[sportsGet])

    const deleteSportHandle = async (id) => {
      dispatch(deleteSport(id))
    }

    const handleSubmitUpdateByPlus = async (id, name, is_deleted) => {
      dispatch(updateSport(id, name, !is_deleted))
    }

    const handleSubmitCreate = async (values) => {
      dispatch(createSport(values.name))
      dispatch(getSports())
    }

    function userSportApplyHandler(sid) {
      setSid(sid)
      setOpenDialog(true)
  }

  return (
    <>
      <UserSportApplyDialog
        open={openDialog}
        closeHandler={closeDialogHandler}
        sid={sid}
        byAdmin={false}
      />
      <MainCard title={t('all_sports')} sx={{height: '100%'}}>
            { loading || loadingUpdate ? 
                <Stack alignItems="center">
                    <CircularProgress size='4rem'/>
                </Stack> : (
                    <>
                        <Grid container justifyContent={'center'} spacing={5} >
                            {
                                sports.map(sport => 
                                    (
                                      <Grid key={sport.id_} item maxWidth={300}>
                                        <Card key={6} elevation={6} sx={{ minWidth: 275 }}>
                                            <CardContent>
                                                <Grid container>
                                                  <SurfingIcon sx={{mr: 2}}></SurfingIcon>
                                                  <Typography sx={{ fontSize: 22 }} color="primary" gutterBottom>
                                                      {sport.name_}
                                                  </Typography>
                                                </Grid>
                                                
                                                <br />
                                                <Grid container>
                                                  <Typography sx={{ fontSize: 18 }} >
                                                    {t('all_sports_pratitioners')}:
                                                  </Typography>
                                                  <Typography sx={{ ml: 2, mt: 0.4, fontSize: 17 }}  gutterBottom>
                                                    {sport.practitioners_}
                                                  </Typography>
                                                </Grid>                        
                                            </CardContent>
                                            <CardActions>
                                                {!memberInfo.is_admin_ && !sport.is_deleted_ && <Button size="small" type="submit"  onClick={() => userSportApplyHandler(sport.id_)}>{t('apply')}</Button>}
                                                {memberInfo.is_admin_ && !sport.is_deleted_ && <Button size="small" type="submit"  onClick={() => navigate(`/application/sports/${sport.id_}`)}>{t('view_sport')}</Button>}
                                                {!sport.is_deleted_ ? memberInfo.is_admin_ && <ButtonBase style={{maxWidth: '10px' }} color={'secondary'} onClick={() => deleteSportHandle(sport.id_)}> <DeleteIcon  sx={{ ml: 28}}  /></ButtonBase> 
                                                : memberInfo.is_admin_ && <ButtonBase style={{maxWidth: '10px'}} color={'secondary'} onClick={() => handleSubmitUpdateByPlus(sport.id_, sport.name_, sport.is_deleted_)}><AddBoxIcon  sx={{ ml: 28}} /></ButtonBase>}
                                            </CardActions>
                                        </Card>
                                      </Grid>
                                    )
                                ) 
                            }
                        </Grid>
                        {
                          memberInfo.is_admin_ && (
                            <>
                                <br />
                                <br />
                                <Divider></Divider>
                                <br />
                                <br />
                                <Grid item style={{ display: 'flex',alignItems: 'center', justifyContent: 'center'}} sx={{maxWidth:'100%'}} >
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
                            </>
                          )
                        }
                        
                      </>                   
                )
            }
        </MainCard> 
    </>
  )
}

export default AllSportsPage