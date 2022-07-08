import React, { useState, useEffect, useCallback  } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSports, deleteSport, updateSport } from '../../store/actions/sportActions'
import Meta from '../../components/Meta';
import { useTranslation } from 'react-i18next'
import DeleteIcon from '@mui/icons-material/Delete'
import SurfingIcon from '@mui/icons-material/Surfing'
import MainCard from '../../components/cards/MainCard'
import { Stack, CircularProgress, Grid, Alert, ButtonBase} from '@mui/material'
import { useNavigate } from 'react-router'
import AnimateButton from '../../components/extended/AnimateButton'
import LoadingButton from '@mui/lab/LoadingButton'
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AddBoxIcon from '@mui/icons-material/AddBox';
import SportCreateDialog from '../../components/dialogs/SportCreateDialog'
import UserSportApplyDialog from '../../components/dialogs/UserSportApplyDialog';
import { SPORT_UPDATE_RESET, SPORT_DELETE_RESET, SPORT_CREATE_RESET, SPORTS_FETCH_RESET, USER_SPORT_TYPES_FETCH_RESET } from '../../store/constants/sportConstants';
import { USERS_SPORTS_CREATE_RESET } from '../../store/constants/userConstants';

const AllSportsPage = () => {
    const {t, i18n} = useTranslation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [openDialog, setOpenDialog] = useState(false);
    
    const [sid, setSid] = useState(0);

    const [sports, setSports] = useState([])

    const memberLogin = useSelector((state) => state.memberLogin)
    const { memberInfo } = memberLogin

    const sportsFetch = useSelector((state) => state.sportsFetch)
    const { loading, error, sportsGet } = sportsFetch

    const sportUpdate = useSelector((state) => state.updateSport)
    const { loading: loadingUpdate, error: errorUpdate, updateSport: update } = sportUpdate

    const sportDelete = useSelector((state) => state.sportDeletion)
    const { error: errorDelete, sportsDeletion } = sportDelete
    
    useEffect(() => {
      dispatch(getSports())
    },[update, sportsDeletion])

    useEffect(() => {
      dispatch(getSports())
      return () => {
        dispatch({ type: SPORTS_FETCH_RESET })
        dispatch({ type: SPORT_UPDATE_RESET })
        dispatch({ type: SPORT_DELETE_RESET })
        dispatch({ type: SPORT_CREATE_RESET })
        dispatch({ type: USERS_SPORTS_CREATE_RESET })
        dispatch({ type: USER_SPORT_TYPES_FETCH_RESET })
      }
    },[])

    useEffect(() => {
      if(sportsGet) {
        setSports(sportsGet)
      }
    },[sportsGet])

    const deleteSportHandle = async (id) => {
      dispatch(deleteSport(id))
    }

    const handleSubmitUpdateByPlus = async (id, name, is_deleted) => {
      dispatch(updateSport(id, name, !is_deleted))
    }

    function userSportApplyHandler(sid) {
      setSid(sid)
      setOpenDialog(true)
    }

    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false)
        dispatch({ type: SPORT_CREATE_RESET })
        dispatch(getSports())
    };
    const handleOpen = () => setOpen(true);

    const closeDialogHandler = useCallback(function _handleClose() {
      setOpenDialog(false);
      dispatch({ type: SPORT_CREATE_RESET })
      dispatch(getSports())
    }, []);

  return (
    <>
      <Meta title={t('all_sports_page_title')}/>
      <UserSportApplyDialog
        open={openDialog}
        closeHandler={closeDialogHandler}
        sid={sid}
        byAdmin={false}
      />
      <SportCreateDialog
        open={open}
        closeHandler={handleClose}
      />
      <MainCard title={t('all_sports')} sx={{height: '100%'}}>
            { loading ? 
                <Stack alignItems="center">
                    <CircularProgress size='4rem'/>
                </Stack> : (
                    <>
                      { error && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="error" onClose={() => dispatch({ type: SPORTS_FETCH_RESET })}>{t(error)}</Alert></Box> }
                      { errorUpdate && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="error" onClose={() => dispatch({ type: SPORT_UPDATE_RESET })}>{t(errorUpdate)}</Alert></Box> }
                      { errorDelete && <Box sx={{ pl: { md: 2 }, pt: 2 }}><Alert severity="error" onClose={() => dispatch({ type: SPORT_DELETE_RESET })}>{t(errorDelete)}</Alert></Box> }
                      {
                        memberInfo.is_admin_ && <Box sx={{mb : 5}} gridArea={'create'} alignItems={'center'} display='flex' justifyContent={{md : 'flex-end', lg : 'flex-end', xs: 'center'}}>
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
                      }
                        <Grid container justifyContent={'center'} spacing={5} >
                            {
                                sports.map(sport => 
                                    (
                                      ((!memberInfo.is_admin_ && !sport.is_deleted_) || memberInfo.is_admin_) && <Grid key={sport.id_} item maxWidth={300}>
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
                                                : memberInfo.is_admin_ && <ButtonBase style={{maxWidth: '10px'}} color={'secondary'} onClick={() => handleSubmitUpdateByPlus(sport.id_, sport.name_, sport.is_deleted_)}><AddBoxIcon  sx={{  mt: 0.7, ml: !sport.is_deleted_ ? 28 : 50 }} /></ButtonBase>}
                                            </CardActions>
                                        </Card>
                                      </Grid>
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

export default AllSportsPage